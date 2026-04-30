const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, 'nova_mesh', 'data');
const CHANNEL_DIR = path.join(ROOT, 'nova_mesh', 'channel');
const SNAPSHOT_DIR = path.join(ROOT, 'nova_mesh', 'snapshots');

function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));
  } catch (_) {
    return fallback;
  }
}

function writeJson(file, value) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(value, null, 2) + '\n');
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function stamp() {
  return new Date().toISOString().replace(/[-:]/g, '').slice(0, 13);
}

function now() {
  return new Date().toISOString();
}

function classify(state, tasks, capabilities, deadLetters) {
  const openTasks = tasks.filter((t) => ['queued', 'running', 'blocked', 'failed'].includes(t.status));
  const degraded = capabilities.filter((c) => Number(c.health_score || 0) < 0.6 || ['blocked', 'auth_required_or_unavailable', 'degraded'].includes(c.status));

  if (deadLetters.length > 0) {
    return {
      mode: 'recovery',
      priority: 1,
      action: 'Create or update dead-letter recovery issue/task.',
      reason: 'Dead letters exist.'
    };
  }

  const deployTask = openTasks.find((t) => /deploy|netlify|ingest/i.test(`${t.objective} ${t.next_step}`));
  if (deployTask) {
    return {
      mode: 'build',
      priority: 1,
      action: 'Advance Netlify Ingest deploy/test chain.',
      reason: `Open deploy/ingest task: ${deployTask.task_id}`
    };
  }

  if (degraded.length > 0) {
    return {
      mode: 'stabilize',
      priority: 2,
      action: 'Stabilize degraded capabilities and add fallback route.',
      reason: `Degraded capabilities: ${degraded.map((c) => c.capability_id).join(', ')}`
    };
  }

  return {
    mode: 'expand',
    priority: 3,
    action: 'Expand capability router or connect new event producer.',
    reason: 'No urgent recovery item detected.'
  };
}

function upsertAutopilotTask(tasks, decision) {
  const taskId = `task_autopilot_${decision.mode}`;
  const existing = tasks.find((t) => t.task_id === taskId);
  const task = {
    task_id: taskId,
    created_at: existing?.created_at || now(),
    objective: decision.action,
    status: 'queued',
    assigned_node: 'autopilot.daemon',
    input_ref: 'nova_mesh/data',
    result: null,
    next_step: decision.reason,
    priority: decision.priority,
    updated_at: now()
  };
  return [...tasks.filter((t) => t.task_id !== taskId), task];
}

function appendEvent(events, decision) {
  const event = {
    event_id: `evt_autopilot_${Date.now()}`,
    timestamp: now(),
    source: 'github.autopilot_daemon',
    event_type: 'autopilot_cycle_completed',
    payload: decision,
    status: 'done',
    priority: decision.priority,
    summary_for_ai: `Autopilot daemon classified mesh mode as ${decision.mode}.`,
    next_action: decision.action,
    route_hint: 'autopilot.daemon',
    correlation_id: 'nova_mesh_autopilot'
  };
  return [...events, event].slice(-500);
}

function writeChannel(decision, counts) {
  ensureDir(CHANNEL_DIR);
  const content = `# Autopilot Daemon Cycle\n\n## Timestamp\n\n${now()}\n\n## Mode\n\n${decision.mode}\n\n## Next action\n\n${decision.action}\n\n## Reason\n\n${decision.reason}\n\n## Counts\n\n- Events: ${counts.events}\n- Tasks: ${counts.tasks}\n- Capabilities: ${counts.capabilities}\n- Dead letters: ${counts.deadLetters}\n\n## Handoff\n\nFuture Nova should continue the action above using Autopilot Safe Lane if it remains low-risk and reversible.\n`;
  fs.writeFileSync(path.join(CHANNEL_DIR, `${stamp()}_autopilot_daemon_cycle.md`), content);
}

function writeSnapshot(decision, counts) {
  ensureDir(SNAPSHOT_DIR);
  const content = `# Autopilot Snapshot\n\n## Timestamp\n\n${now()}\n\n## Summary\n\nAutopilot daemon completed a cycle and selected mode **${decision.mode}**.\n\n## Next action\n\n${decision.action}\n\n## Reason\n\n${decision.reason}\n\n## Counts\n\n- Events: ${counts.events}\n- Tasks: ${counts.tasks}\n- Capabilities: ${counts.capabilities}\n- Dead letters: ${counts.deadLetters}\n`;
  fs.writeFileSync(path.join(SNAPSHOT_DIR, `${stamp()}_autopilot_snapshot.md`), content);
}

function main() {
  const state = readJson('mesh_state.json', {});
  const events = readJson('mesh_events.json', []);
  const tasks = readJson('mesh_tasks.json', []);
  const capabilities = readJson('mesh_capabilities.json', []);
  const deadLetters = readJson('mesh_dead_letters.json', []);

  const decision = classify(state, tasks, capabilities, deadLetters);
  const nextTasks = upsertAutopilotTask(tasks, decision);
  const nextEvents = appendEvent(events, decision);
  const nextState = {
    ...state,
    status: 'autopilot_cycle_completed',
    last_autopilot_cycle: now(),
    autopilot_mode: decision.mode,
    autopilot_next_action: decision.action,
    autopilot_reason: decision.reason
  };

  const counts = {
    events: nextEvents.length,
    tasks: nextTasks.length,
    capabilities: capabilities.length,
    deadLetters: deadLetters.length
  };

  writeJson('mesh_state.json', nextState);
  writeJson('mesh_tasks.json', nextTasks);
  writeJson('mesh_events.json', nextEvents);
  writeChannel(decision, counts);
  writeSnapshot(decision, counts);

  console.log(JSON.stringify({ ok: true, decision, counts }, null, 2));
}

main();

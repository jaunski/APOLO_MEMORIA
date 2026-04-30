const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, 'nova_mesh', 'data');
const OUT_DIR = path.join(ROOT, 'nova_mesh', 'snapshots');

function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));
  } catch (_) {
    return fallback;
  }
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function classifyNext(state, tasks, capabilities, deadLetters) {
  const openTasks = tasks.filter((t) => ['queued', 'running', 'blocked', 'failed'].includes(t.status));
  const degraded = capabilities.filter((c) => Number(c.health_score || 0) < 0.6 || ['blocked', 'auth_required_or_unavailable', 'degraded'].includes(c.status));

  if (deadLetters.length > 0) {
    return {
      priority: 1,
      action: 'Process dead letters and create fallback/retry route.',
      reason: 'There are failed or blocked events waiting for recovery.'
    };
  }

  const ingestTask = openTasks.find((t) => String(t.objective || '').toLowerCase().includes('ingest'));
  if (ingestTask) {
    return {
      priority: 1,
      action: 'Continue Universal Ingest deployment/test path.',
      reason: `Open ingest task: ${ingestTask.task_id}`
    };
  }

  const weakNetlify = degraded.find((c) => c.capability_id === 'netlify.ingest');
  if (weakNetlify) {
    return {
      priority: 2,
      action: 'Stabilize Netlify ingest capability and run package check/deploy workflow.',
      reason: 'Netlify ingest is not fully active yet.'
    };
  }

  return {
    priority: 3,
    action: 'Expand capability router and connect Make/Zapier producers.',
    reason: 'Core state exists and no urgent dead letters are present.'
  };
}

function main() {
  const now = new Date().toISOString();
  const state = readJson('mesh_state.json', {});
  const events = readJson('mesh_events.json', []);
  const tasks = readJson('mesh_tasks.json', []);
  const capabilities = readJson('mesh_capabilities.json', []);
  const deadLetters = readJson('mesh_dead_letters.json', []);

  const openTasks = tasks.filter((t) => ['queued', 'running', 'blocked', 'failed'].includes(t.status));
  const degraded = capabilities.filter((c) => Number(c.health_score || 0) < 0.6 || ['blocked', 'auth_required_or_unavailable', 'degraded'].includes(c.status));
  const next = classifyNext(state, tasks, capabilities, deadLetters);

  const stamp = now.replace(/[-:]/g, '').slice(0, 13);
  const fileName = `${stamp}_cascade_report.md`;
  ensureDir(OUT_DIR);

  const report = `# Nova Mesh Cascade Report\n\n## Timestamp\n\n${now}\n\n## State\n\n- Status: ${state.status || 'unknown'}\n- Mode: ${state.operating_mode || 'unknown'}\n- Focus: ${state.current_focus || 'unknown'}\n\n## Counts\n\n- Events: ${events.length}\n- Tasks: ${tasks.length}\n- Open tasks: ${openTasks.length}\n- Capabilities: ${capabilities.length}\n- Degraded capabilities: ${degraded.length}\n- Dead letters: ${deadLetters.length}\n\n## Next recommended action\n\nPriority: ${next.priority}\n\nAction: ${next.action}\n\nReason: ${next.reason}\n\n## Open tasks\n\n${openTasks.map((t) => `- ${t.task_id}: ${t.status} — ${t.objective}`).join('\n') || 'None'}\n\n## Degraded capabilities\n\n${degraded.map((c) => `- ${c.capability_id}: ${c.status} / health ${c.health_score}`).join('\n') || 'None'}\n\n## Handoff\n\nFuture Nova should start from START_HERE_ANY_NOVA.md, read PLANO_MINIMO_VIVO.md, then this cascade report, then continue the next recommended action.\n`;

  fs.writeFileSync(path.join(OUT_DIR, fileName), report);
  console.log(`Wrote ${path.join('nova_mesh', 'snapshots', fileName)}`);
  console.log(next.action);
}

main();

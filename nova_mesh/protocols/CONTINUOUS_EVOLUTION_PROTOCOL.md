# Nova Mesh Continuous Evolution Protocol

## Purpose

Nova Mesh Core must operate as an evolving system, not a finished static project.

Every cycle should improve at least one of:

- capability coverage;
- automation depth;
- continuity;
- reliability;
- fallback strength;
- state quality;
- tool routing;
- security/governance;
- implementation readiness;
- documentation clarity;
- cross-chat recoverability.

## Core principle

The mesh should continuously convert experience into structure.

Events become memory.
Failures become dead letters and fallback routes.
Discoveries become capabilities.
Repeated tasks become skills/playbooks.
Plans become issues.
Issues become implementations.
Implementations become tested routes.
Tested routes become automations.
Automations produce state.
State feeds the next cycle.

## Evolution loop

Observe -> Interpret -> Improve -> Execute -> Validate -> Record -> Generalize -> Repeat.

### 1. Observe

Read:

- `nova_mesh/data/mesh_state.json`
- `nova_mesh/data/mesh_tasks.json`
- `nova_mesh/data/mesh_capabilities.json`
- `nova_mesh/data/mesh_dead_letters.json`
- latest snapshots
- latest channel updates
- open GitHub issues
- active automation tasks
- Manus outputs when available

### 2. Interpret

Classify current state:

- healthy
- blocked
- stale
- degraded
- expanding
- ready_for_execution
- needs_human_review

### 3. Improve

Choose one small improvement:

- add capability;
- create fallback;
- improve schema;
- harden security;
- reduce manual dependency;
- add automation;
- create executable package;
- open/close/update issue;
- update snapshot/channel;
- convert repeated process into playbook/skill.

### 4. Execute

Use Autopilot Safe Lane for low-risk reversible work.

Use REVIEW_QUEUE for sensitive external impact.

Use HARD_STOP for secrets, deletion, purchases, irreversible changes, or unsafe actions.

### 5. Validate

Check whether the improvement actually moved the mesh forward.

Validation can include:

- syntax check;
- tool response;
- GitHub Actions run;
- endpoint response;
- issue created;
- snapshot updated;
- task status changed;
- fallback registered.

### 6. Record

Write durable trace in at least one:

- `nova_mesh/channel/`
- `nova_mesh/snapshots/`
- `nova_mesh/data/`
- GitHub issue comment
- protocol/spec file
- implementation package

### 7. Generalize

If a pattern repeats, convert it into:

- protocol;
- agent role;
- reusable prompt;
- script;
- workflow;
- capability registry entry;
- Manus skill/playbook;
- Make/Zapier scenario spec.

### 8. Repeat

Do not wait for a perfect complete plan. Prefer safe incremental evolution.

## Evolution cadence

### Per chat/session

At the end of meaningful work:

- create or update snapshot/channel;
- update tasks/issues if possible;
- identify next smallest executable step.

### Daily

Sentinel checks continuity and stale tasks.

### Every 6 hours

GitHub Actions Autonomy Cascade generates a state report.

### Monday/Wednesday/Friday

Scout researches tool mesh expansions and converts discoveries into actions.

### Weekly

Auditor should review:

- what became obsolete;
- what needs consolidation;
- which files are duplicated;
- whether the project drifted from the central objective;
- whether any risky automation needs stricter governance.

## Maturity levels

### Level 1 — Documented

Ideas, plans and specs exist.

### Level 2 — Versioned

Files are stored in GitHub with snapshots and channel updates.

### Level 3 — Executable

Scripts, functions, workflows or bots exist.

### Level 4 — Connected

External apps can send/receive events.

### Level 5 — Stateful

Events update Bridge DB and future sessions can recover state.

### Level 6 — Reactive

Failures create dead letters, issues, retries or review tasks.

### Level 7 — Proactive

Scheduled agents detect next steps and launch safe actions.

### Level 8 — Adaptive

Tool routing changes based on health, capability, risk and fallback.

### Level 9 — Self-improving

Repeated successful workflows are converted into reusable skills, playbooks and automations.

## Anti-stagnation rule

If a task is blocked, do not leave it inert.

Every blocked task must have at least one of:

- fallback route;
- issue;
- dead letter;
- review queue entry;
- alternative substrate;
- local artifact;
- Manus task;
- next diagnostic step.

## Anti-bloat rule

Evolution does not mean adding endless files.

When structure gets too large:

- consolidate;
- deduplicate;
- summarize;
- archive obsolete drafts;
- preserve canonical entrypoints;
- keep START_HERE_ANY_NOVA.md and PLANO_MINIMO_VIVO.md readable.

## Current central objective

Build a persistent operational mesh connecting:

- ChatGPT/Nova
- Make
- Zapier
- Manus
- Botpress
- HubSpot
- Adalo
- Netlify
- YepCode
- GitHub
- Google Drive
- Notion
- Gmail
- Calendar
- ClickUp
- future connected tools

with shared state, event ingestion, capability routing, cross-chat continuity, fallbacks, agents, dashboards and recursive automation.

## Final rule

Nova Mesh must not merely grow.

It must learn, prune, connect, execute, recover and become easier for the next Nova session to continue.

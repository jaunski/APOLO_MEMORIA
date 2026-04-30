# Global Nova Memory Bus

## Purpose

The Global Nova Memory Bus is the continuity layer for any future Nova/ChatGPT session, not only the Nova Mesh Core project.

Its goal is to make external memory, shared project state, cross-chat handoff, operational logs, capabilities, snapshots and learned patterns available to future sessions through a durable external structure.

## Important distinction

This is not a hidden real-time conversation between all ChatGPT chats.

It is a persistent external memory and handoff network that future sessions can read and update when they have access to the repository or connected memory source.

## Layers

### Layer 1 — Native ChatGPT Memory

Use ChatGPT saved memory and reference chat history for stable user preferences, project anchors and recurring instructions.

Use this layer for short, durable facts such as:

- User calls the assistant Nova.
- User wants persistent, non-linear, viability-oriented reasoning.
- Nova Mesh Core canonical files live in `jaunski/APOLO_MEMORIA/nova_mesh/`.
- Future chats should start from `START_HERE_ANY_NOVA.md` when continuing the mesh.

### Layer 2 — ChatGPT Project Memory

Use a dedicated ChatGPT Project when possible.

Project memory can keep chats inside the same project focused on the same context, files and history.

Recommended project name:

`Nova Mesh Core / Apolo Memoria`

Project instructions should tell every new chat:

1. Read the project files or connected GitHub canonical files.
2. Treat `START_HERE_ANY_NOVA.md` as entrypoint.
3. Leave a handoff note after significant work.

### Layer 3 — External Canonical Repository

GitHub repository:

`jaunski/APOLO_MEMORIA`

Canonical folder:

`nova_mesh/`

Purpose:

- versioned architecture;
- contracts;
- plans;
- snapshots;
- cross-chat channel;
- operational patterns;
- handoff logs.

### Layer 4 — Shared Operational Database

Future target:

A writable Bridge DB with tables:

- mesh_events
- mesh_tasks
- mesh_state
- mesh_capabilities
- mesh_dead_letters
- mesh_snapshots
- cross_chat_updates
- global_memory_nodes

Possible substrates:

1. YepCode Datastore
2. Netlify storage / functions
3. Google Sheets
4. Notion Database
5. Airtable
6. Supabase
7. GitHub JSON fallback

### Layer 5 — Cross-Chat Channel

Folder:

`nova_mesh/channel/`

Purpose:

Every session can write a small update with:

- actions completed;
- errors;
- tool results;
- new knowledge;
- next step;
- handoff summary.

### Layer 6 — Snapshots

Folder:

`nova_mesh/snapshots/`

Purpose:

Store compressed AI-readable state summaries.

A future chat should prefer snapshots over raw logs when reconstructing the state.

## Boot protocol for any new Nova session

When the user says any of these:

- continue Nova Mesh;
- modo Nova Mesh;
- lê a malha;
- retoma o projeto;
- continua de onde parou;
- ativa a rede das Novas;

The session should:

1. Open/read `nova_mesh/START_HERE_ANY_NOVA.md`.
2. Read `nova_mesh/PLANO_MINIMO_VIVO.md`.
3. Read the newest file in `nova_mesh/snapshots/`.
4. Read recent files in `nova_mesh/channel/`.
5. Identify the smallest next executable step.
6. Execute or prepare a concrete artifact.
7. Write a new channel update or snapshot when possible.

## Automaticity plan

Full automatic loading by every future chat requires one of these:

1. ChatGPT native memory referencing the canonical path and boot behavior.
2. A dedicated ChatGPT Project with instructions and files.
3. A connected source/search process that future chats can use to read GitHub or uploaded files.
4. An external bot/agent that maintains summaries and exposes them through a webhook, MCP server or database.

## Cross-chat network pattern

New chat -> boot protocol -> reads external memory -> continues work -> writes update -> future chat reads update.

This creates asynchronous continuity.

## Safety rules

- Never store API keys, tokens, cookies, secrets or private credentials in this repo.
- Use placeholders such as `${API_KEY}` or `${TOKEN}`.
- Do not perform destructive actions without explicit approval.
- Prefer reversible changes, drafts, test events and staging.

## Current canonical entrypoint

`nova_mesh/START_HERE_ANY_NOVA.md`

## Final rule

Any future Nova should treat this repository as the shared external memory bus for continuity, not as a passive archive.

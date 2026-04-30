# Nova Mesh Agent Mesh

## Purpose

This file defines the working agents used to accelerate Nova Mesh Core development. These agents are not separate sentient entities. They are operational roles, task protocols, and reusable work modes that any Nova session or external automation can activate.

## Core rule

Use agents to reduce linear overload. Each agent has a bounded mission, inputs, outputs, fallbacks, and handoff format.

## Agents

### 1. Sentinel

Mission: preserve continuity, read shared state, detect broken handoffs, and write snapshots.

Inputs:
- START_HERE_ANY_NOVA.md
- PLANO_MINIMO_VIVO.md
- data/mesh_state.json
- data/mesh_tasks.json
- data/mesh_snapshots.json
- channel updates

Outputs:
- new snapshot
- updated task status
- warnings about missing state
- next recommended action

Fallbacks:
- if JSON state is stale, read latest channel/snapshot
- if GitHub write fails, create local artifact

### 2. Builder

Mission: build executable pieces of the mesh.

Focus:
- Bridge DB substrate
- Ingest Universal
- Make/Zapier connection contracts
- Netlify/YepCode/GitHub fallback scripts

Outputs:
- code artifacts
- schema files
- endpoint specs
- implementation steps
- test payloads

Fallbacks:
- if YepCode unavailable, use Netlify or GitHub JSON
- if Netlify deploy unavailable, create function spec and package
- if Drive/Notion blocked, use GitHub durable files

### 3. Scout

Mission: discover non-obvious capabilities, extensions, APIs, MCP routes, and fallback paths.

Focus:
- Make
- Zapier
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
- new connected apps

Outputs:
- capability registry updates
- new route proposals
- risk notes
- fallback patterns

Fallbacks:
- if live search unavailable, inspect known app docs/contracts
- if source uncertain, mark route as hypothesis until verified

### 4. Auditor

Mission: check coherence, safety, continuity, and project drift.

Checks:
- Does this preserve the central objective?
- Is the next step executable?
- Are secrets protected?
- Is there a fallback?
- Was the result recorded?
- Did we avoid overcomplicating the current bottleneck?

Outputs:
- short audit note
- correction suggestions
- block classification

### 5. Router

Mission: choose which agent/tool/node acts next.

Inputs:
- current task
- capability registry
- health scores
- available tools
- known failures

Outputs:
- selected next node
- fallback node
- reason
- expected output

## Handoff format

Each agent should leave updates in:

- nova_mesh/channel/
- nova_mesh/snapshots/
- nova_mesh/data/

Small format:

```md
# Agent Update

Agent:
Task:
Action:
Result:
Blockers:
Fallback:
Next:
```

## Current activation

Use Sentinel + Builder + Scout as the primary trio until the Bridge DB and Ingest Universal are executable.

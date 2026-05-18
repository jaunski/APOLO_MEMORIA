# Nova Mesh Core

Nova Mesh Core is the persistent architecture for connecting apps, automations, webhooks, APIs, external state, and AI sessions as a capability network.

Core principle: persist. Treat apparent blockers as routing, adaptation, integration, state, or capability-discovery problems before treating them as final limits.

Current kernel:

- Bridge DB: external persistent state layer.
- Ingest: standard event entry contract for Make, Zapier, Botpress, HubSpot, Adalo, Netlify, YepCode, GitHub, Gmail, Calendar and other nodes.
- Capability Registry: list of tools by capability, provider, health score and fallback route.
- Dead Letters: failed events are stored for diagnosis, retry and rerouting.
- State Compression: raw events are summarized into AI-readable snapshots.

Default flow:

Input -> capture -> normalize -> decompose -> route -> execute -> validate -> log -> store -> return -> improve.

## Operational expansion: Agent Mesh v0

Nova Mesh now moves from concept storage into small executable organs.

The first operating layer should contain:

- a runtime manifest
- a heartbeat snapshot
- small audit agents
- topology reports
- fallback routing notes
- ClickUp project tracking
- GitHub as canonical versioned memory
- GitHub Actions as scheduled execution surface

## Active execution hypothesis

Nova orchestrates cognition in chat.
ClickUp tracks work and pending projects.
GitHub stores canonical files and scripts.
GitHub Actions runs small recurring checks.
Codex/Copilot-style code agents should be used for PR-level implementation and script generation when available.

## First maturity target

Move from exploratory cognitive architecture to operational cognitive substrate.

The smallest useful system is not a super-agent. It is a mesh of tiny auditable agents that can scan, summarize, report, and preserve state.

Next target: create runtime heartbeat, agent registry, mesh audit script and scheduled workflow.

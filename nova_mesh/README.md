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

Next target: implement the first writable Bridge DB and connect Make/Zapier as external event producers.

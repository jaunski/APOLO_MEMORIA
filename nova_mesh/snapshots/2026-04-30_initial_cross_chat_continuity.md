# Initial Cross-Chat Continuity Snapshot

## Date

2026-04-30

## Project

Nova Mesh Core

## Current direction

Create a persistent external capability network so that Make, Zapier, Botpress, HubSpot, Adalo, Netlify, YepCode, GitHub, Google Drive, Notion, Gmail, Calendar and other apps can act as connected nodes.

## Key architecture

Input -> Ingest -> Bridge DB -> Capability Router -> Executor -> Validation -> Log -> Snapshot -> Return.

## Created so far in GitHub

- `nova_mesh/README.md`
- `nova_mesh/START_HERE_ANY_NOVA.md`
- `nova_mesh/PLANO_MINIMO_VIVO.md`
- `nova_mesh/contracts/event_contract.json`
- `nova_mesh/contracts/bridge_db_schema.json`
- `nova_mesh/contracts/capabilities_make_zapier.json`
- `nova_mesh/channel/README.md`

## Earlier external attempts

- Adalo app `Nova Bridge Hub` build was started.
- Netlify project `nova-bridge-router` was created.
- YepCode Bridge DB attempt failed due to reauthentication requirement.
- Google Drive, Notion and some GitHub larger writes had intermittent connector/security blocks, so the project shifted to small GitHub files as durable foundation.

## Current next step

Continue building capability registry in small files and create a first executable Bridge DB substrate.

Preferred path:

1. Try YepCode again if authentication works.
2. Otherwise use Netlify/GitHub JSON/Sheets/Notion depending on available write path.
3. Connect Make and Zapier to `event_contract.json`.

## Handoff summary

Any future Nova should start by reading `nova_mesh/START_HERE_ANY_NOVA.md`, then `PLANO_MINIMO_VIVO.md`, then the contracts. Preserve the objective, classify failures, use fallbacks, and leave an update in `nova_mesh/channel/` or `nova_mesh/snapshots/`.

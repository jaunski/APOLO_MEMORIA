# START HERE — Any Nova / Any Chat

This file is the first entrypoint for any future ChatGPT/Nova session that needs to continue the Nova Mesh Core project.

## What this is

Nova Mesh Core is a persistent capability network architecture for connecting ChatGPT/Nova, Make, Zapier, Botpress, HubSpot, Adalo, Netlify, YepCode, GitHub, Google Drive, Notion, Gmail, Calendar and other connected apps.

The goal is not a single automation. The goal is a shared operational mesh with external state, event contracts, capability routing, fallbacks, logs, memory snapshots and continuity across sessions.

## Core principle

PERSISTIR.

Do not stop at the first apparent blocker. Treat blockers as routing, state, permission, format, adapter, capability, credential, schema, or architecture problems first.

Permanent question: da para ir alem?

## Current repository path

All canonical project files live under:

`nova_mesh/`

Important files:

- `nova_mesh/README.md`
- `nova_mesh/PLANO_MINIMO_VIVO.md`
- `nova_mesh/contracts/event_contract.json`
- `nova_mesh/contracts/bridge_db_schema.json`
- `nova_mesh/contracts/capabilities_make_zapier.json`

## Current built pieces

- GitHub folder `nova_mesh/` exists.
- Event contract exists.
- Bridge DB schema exists.
- Make/Zapier capability seed exists.
- Living minimal plan exists.
- Daily ChatGPT task `Expand Nova Mesh Core` was created.
- Netlify project `nova-bridge-router` was created earlier.
- Adalo app `Nova Bridge Hub` build was started earlier.
- YepCode was attempted as Bridge DB but required reauthentication at the time.

## What to do when opening this in a new chat

1. Read this file.
2. Read `PLANO_MINIMO_VIVO.md`.
3. Read the contracts in `nova_mesh/contracts/`.
4. Continue from the smallest next executable step.
5. If a tool fails, log the failure and choose the closest fallback while preserving the objective.
6. Add a short update to `nova_mesh/channel/` or `nova_mesh/snapshots/` when possible.

## Current strategic next step

Build one executable Bridge DB substrate and one Ingest Universal route.

Preferred order:

1. YepCode Datastore if available.
2. Netlify Functions + storage if deploy/write path is available.
3. Google Sheets if Drive write path works.
4. Notion Database if a valid parent exists.
5. Airtable if a base exists.
6. GitHub JSON files as slow but durable fallback.

## Safety and governance

Do not expose secrets, tokens, keys, cookies or private credentials.
Do not perform destructive actions without explicit approval.
Do not spend money or upgrade services without explicit approval.
Prefer drafts, staging, test payloads and reversible changes.

## Handoff sentence

If the user asks to continue Nova Mesh Core, continue from the GitHub canonical files under `nova_mesh/`, treating them as the shared external memory of the project.

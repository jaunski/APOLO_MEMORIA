# Netlify Scout Builder

## Purpose

Netlify Scout Builder is the tool-specific agent responsible for discovering and implementing ways Netlify can help Nova Mesh Core execute, automate, persist state, receive events, and recover from failures.

## Why Netlify matters

Netlify can act as more than hosting:

- public HTTP endpoint for Universal Ingest;
- scheduled heartbeat / watchdog;
- background worker for longer tasks;
- deploy target for dashboards and generated apps;
- backend for Botpress/Adalo frontends;
- bridge between Make/Zapier and GitHub/Bridge DB;
- storage/adapter layer when direct tools fail.

## Core routes

### 1. Universal Ingest Function

Purpose: receive POST events from Make, Zapier, Botpress, HubSpot, Adalo, Manus, GitHub or other tools.

Input follows `nova_mesh/contracts/event_contract.json`.

Output:

- validation result;
- event id;
- route hint;
- status.

### 2. Scheduled Heartbeat Function

Purpose: run on a schedule and keep the mesh alive logically.

Actions:

- check Bridge DB state;
- detect stale tasks;
- create heartbeat event;
- trigger Make/Zapier/Manus/GitHub if needed;
- create snapshot.

Important limitation: Scheduled Functions do not accept arbitrary POST payloads. Use them for polling/heartbeat, not ingestion.

### 3. Background Worker Function

Purpose: process longer-running work such as batch sync, dead-letter retries, report generation, scraping where allowed, and multi-step API flows.

### 4. Dead Letter Retry Worker

Purpose: read failed events and retry using fallback routes.

Fallback order:

1. Make
2. Zapier
3. YepCode/Netlify custom function
4. GitHub issue/action
5. Gmail/Calendar human recovery

### 5. Dashboard Host

Purpose: host a lightweight status page or cockpit reading Bridge DB/snapshots.

## First implementation package

Create a Netlify project with:

- `netlify/functions/ingest.mjs`
- `netlify/functions/heartbeat.mjs`
- `netlify/functions/retry-background.mjs`
- `netlify.toml`
- `README.md`

## Security

- use `NOVA_MESH_TOKEN` environment variable;
- reject requests without token;
- never log secrets;
- store raw payloads carefully;
- prefer references for large/sensitive payloads.

## Current status

Research automation created: `Research Netlify mesh routes`.

Next: generate and commit a minimal Netlify Universal Ingest package.

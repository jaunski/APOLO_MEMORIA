# Nova Mesh Event-Driven Continuity Protocol

## Purpose

Scheduled tasks are useful as heartbeat and fallback, but they are not enough for continuous autonomy.

Nova Mesh Core must prioritize event-driven execution: actions should happen when something changes, not only at fixed times.

## Core shift

Old model:

Schedule -> check -> maybe act.

Better model:

Event -> ingest -> classify -> route -> execute -> record -> trigger next event.

## Principle

Timers are fallback.
Events are the nervous system.

## Primary event sources

### 1. GitHub events

Triggers:

- push to `nova_mesh/**`
- issue opened/edited/labeled/commented
- workflow_dispatch
- pull_request
- workflow_run completed

Uses:

- run checks;
- generate cascade reports;
- update snapshots;
- create follow-up issues;
- validate implementations;
- detect completed work.

### 2. Netlify events

Triggers:

- POST to `/ingest`
- GET `/state` from dashboards/agents
- deploy complete/fail events
- function failure logs
- scheduled heartbeat only as fallback

Uses:

- receive Make/Zapier/Manus/Botpress/Adalo/HubSpot events;
- update Bridge DB;
- create dead letters;
- expose state to future sessions.

### 3. Make/Zapier events

Triggers:

- webhook catch;
- app event;
- form submission;
- email label;
- CRM change;
- calendar event;
- GitHub issue event;
- Botpress conversation event.

Uses:

- send standard payloads to Netlify Ingest;
- execute app actions;
- call fallbacks;
- update external systems.

### 4. Manus events

Triggers:

- research completed;
- website/app generated;
- report delivered;
- deployment runbook produced;
- browser operation completed;
- error encountered.

Uses:

- add result to Bridge DB;
- create implementation tasks;
- update capability registry;
- trigger Builder/Scout/Auditor.

### 5. Botpress/Adalo cockpit events

Triggers:

- user requests status;
- user creates task;
- user approves action;
- user reports blocker;
- user requests retry.

Uses:

- create event payload;
- send to Ingest;
- route to Builder/Sentinel/Scout/Manus.

### 6. Gmail/Calendar fallback events

Triggers:

- label applied;
- email command received;
- calendar retry time reached;
- human approval event.

Uses:

- fallback event bus;
- human-in-the-loop recovery;
- visible retry scheduler.

## Event contract

All event sources should normalize into:

```json
{
  "source": "string",
  "event_type": "string",
  "payload": {},
  "priority": 3,
  "summary_for_ai": "string",
  "next_action": "string",
  "correlation_id": "string"
}
```

Canonical file:

`nova_mesh/contracts/event_contract.json`

## Chain reaction design

Every event should be able to produce one or more next events.

Examples:

### Code changed

Push to Netlify package -> GitHub Actions syntax check -> if pass, create deploy-ready event -> if fail, create issue/dead letter.

### External app event

Make webhook -> Netlify ingest -> Bridge DB event -> Router selects action -> Zapier/Manus/GitHub issue.

### Manus completed research

Manus report completed -> event stored -> Scout extracts capabilities -> Builder creates implementation issue.

### Dead letter created

Failure event -> dead letter -> retry worker -> fallback route -> success/failure snapshot.

## Automation priority

1. Event-driven triggers.
2. Webhooks.
3. GitHub Actions on repository events.
4. Make/Zapier instant triggers.
5. Netlify ingest/state endpoints.
6. Scheduled checks only for stale/heartbeat/fallback.

## What scheduled tasks are still for

Scheduled tasks should only handle:

- stale state detection;
- periodic audit;
- backup summaries;
- missed event recovery;
- research cycles;
- heartbeat.

They should not be the main execution engine.

## Current implementation gaps

- Netlify Ingest deployment still pending.
- Make/Zapier are not yet connected to Ingest.
- Manus completion events are not yet automatically ingested.
- GitHub Actions do not yet create issues from dead letters.
- Botpress/Adalo cockpit is not yet live.

## Next build targets

1. Add GitHub Actions event router for issues and pushes.
2. Connect Make/Zapier to Netlify Ingest once deployed.
3. Add workflow_run trigger to react to package check/deploy outcomes.
4. Add dead-letter issue creator.
5. Add Manus completion ingestion playbook.
6. Add cockpit event contract for Botpress/Adalo.

## Final rule

Nova Mesh should not wait for clock time when an event already exists.

If something changes, the mesh should react.

If nothing changes, schedules act as heartbeat and stale-state recovery.

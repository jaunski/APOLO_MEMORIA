# Nova Mesh Gateway Bot — Botpress Spec

## Purpose

Create a Botpress bot named `Nova Mesh Gateway`.

The bot is a conversational gateway for Nova Mesh Core. It is not the main brain. It collects structured user input, explains current mesh state, and prepares event payloads for routing to Nova/ChatGPT, Manus, Make/Zapier, GitHub, ClickUp or future tools.

## Canonical memory path

`jaunski/APOLO_MEMORIA/nova_mesh/`

## Event contract

The bot should collect or produce payloads with:

```json
{
  "source": "botpress",
  "event_type": "string",
  "payload": {},
  "priority": 3,
  "summary_for_ai": "string",
  "next_action": "string",
  "correlation_id": "string"
}
```

## Initial intents

- check_status
- add_update
- create_task
- report_blocker
- request_research
- request_build
- route_to_manus
- route_to_builder
- route_to_sentinel
- route_to_scout

## Safety behavior

- Warn users not to paste secrets, API keys, tokens, cookies or passwords.
- For destructive actions, create a draft event requiring approval.
- Prefer staging/test payloads.

## Example user flow

User: "Nova Mesh status"

Bot:
1. explains that it is a gateway;
2. prepares a `check_status` event;
3. points to latest state source;
4. suggests next step.

User: "Cria uma tarefa para Manus pesquisar Make + Zapier"

Bot creates event:

```json
{
  "source": "botpress",
  "event_type": "request_research",
  "payload": {
    "target_executor": "manus",
    "topic": "Make and Zapier integration routes for Nova Mesh"
  },
  "priority": 2,
  "summary_for_ai": "User requested a Manus research task about Make/Zapier integration routes.",
  "next_action": "Route to Manus research node.",
  "correlation_id": "nova_mesh_gateway"
}
```

## Current connector status

Initial direct Botpress creation attempt failed with account connection error. Keep this spec ready for retry.

# Nova Mesh Netlify Ingest Package

## Purpose

Minimal Netlify package for Nova Mesh Core.

It provides:

- HTTP Universal Ingest endpoint;
- Scheduled Heartbeat function;
- Retry Background Worker stub.

## Files

- `netlify.toml`
- `netlify/functions/ingest.mjs`
- `netlify/functions/heartbeat.mjs`
- `netlify/functions/retry-background.mjs`

## Environment variables

Set:

`NOVA_MESH_TOKEN`

Requests to `ingest.mjs` should include header:

`x-nova-mesh-token: YOUR_TOKEN`

## Test payload

POST to:

`/.netlify/functions/ingest`

```json
{
  "source": "make",
  "event_type": "test_event",
  "payload": {
    "message": "Nova Mesh active"
  },
  "priority": 1,
  "summary_for_ai": "Make sent a test event to Nova Mesh.",
  "next_action": "Record event and route by capability registry.",
  "correlation_id": "test_make_to_nova_mesh"
}
```

Expected result:

- HTTP 200;
- normalized event;
- `bridge_write: not_configured_yet`.

## Current limitation

This package currently normalizes and returns events, but does not persist them yet.

Next adapter targets:

1. GitHub JSON Bridge DB;
2. Netlify Blobs;
3. Supabase;
4. Google Sheets;
5. Notion Database;
6. YepCode Datastore.

## Make/Zapier route

Make or Zapier can call the ingest endpoint by HTTP/Webhook module:

Headers:

```text
content-type: application/json
x-nova-mesh-token: ${NOVA_MESH_TOKEN}
```

Body: use `nova_mesh/contracts/event_contract.json`.

## Next step

Add a storage adapter so accepted events are appended to `mesh_events` and `mesh_state` is updated.

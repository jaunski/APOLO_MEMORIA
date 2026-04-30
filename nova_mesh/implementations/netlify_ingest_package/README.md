# Nova Mesh Netlify Ingest Package

## Purpose

Minimal Netlify package for Nova Mesh Core.

It provides:

- HTTP Universal Ingest endpoint;
- Scheduled Heartbeat function;
- Retry Background Worker stub;
- GitHub JSON Bridge DB storage adapter.

## Files

- `netlify.toml`
- `netlify/functions/ingest.mjs`
- `netlify/functions/heartbeat.mjs`
- `netlify/functions/retry-background.mjs`
- `netlify/functions/lib/github-storage.mjs`

## Environment variables

Set in Netlify:

```text
NOVA_MESH_TOKEN=your_ingest_shared_secret
NOVA_MESH_GITHUB_TOKEN=github_pat_or_fine_grained_token_with_repo_contents_write
NOVA_MESH_GITHUB_REPO=jaunski/APOLO_MEMORIA
NOVA_MESH_GITHUB_BRANCH=main
NOVA_MESH_MAX_EVENTS=500
NOVA_MESH_MAX_DEAD_LETTERS=200
```

Requests to `ingest.mjs` should include header:

```text
x-nova-mesh-token: YOUR_TOKEN
```

Never commit real tokens to GitHub.

## Test payload

POST to:

```text
/.netlify/functions/ingest
```

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

Expected result when GitHub token is configured:

- HTTP 200;
- normalized event;
- `bridge_write: github_json_bridge_written`;
- event appended to `nova_mesh/data/mesh_events.json`;
- `nova_mesh/data/mesh_state.json` updated.

Expected result without GitHub token:

- HTTP 200;
- normalized event;
- `bridge_write: github_json_bridge_skipped_or_failed`;
- storage reason: `missing_github_token`.

## Make/Zapier route

Make or Zapier can call the ingest endpoint by HTTP/Webhook module.

Headers:

```text
content-type: application/json
x-nova-mesh-token: ${NOVA_MESH_TOKEN}
```

Body: use `nova_mesh/contracts/event_contract.json`.

## Dead letters

If the event type/status indicates failure or blocked state, the GitHub storage adapter also appends a record to:

```text
nova_mesh/data/mesh_dead_letters.json
```

## Current limitation

GitHub JSON is durable but not ideal for high-frequency event writes because every write creates commits and can conflict under concurrency.

Use it as bootstrap/fallback.

Future storage upgrades:

1. Netlify Blobs;
2. Supabase;
3. Google Sheets;
4. Notion Database;
5. YepCode Datastore;
6. Airtable.

## Next step

Deploy this package to the existing Netlify project `nova-bridge-router`, set environment variables, then send a test event from Make or Zapier.

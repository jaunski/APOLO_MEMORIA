# Nova Mesh Netlify Ingest Package

## Purpose

Minimal Netlify package for Nova Mesh Core.

It provides:

- HTTP Universal Ingest endpoint;
- HTTP State endpoint;
- Scheduled Heartbeat function;
- Retry Background Worker stub;
- Netlify Blobs Bridge DB primary storage;
- GitHub JSON Bridge DB fallback storage.

## Files

- `package.json`
- `netlify.toml`
- `netlify/functions/ingest.mjs`
- `netlify/functions/state.mjs`
- `netlify/functions/heartbeat.mjs`
- `netlify/functions/retry-background.mjs`
- `netlify/functions/lib/blob-storage.mjs`
- `netlify/functions/lib/github-storage.mjs`

## Environment variables

Set in Netlify:

```text
NOVA_MESH_TOKEN=your_ingest_shared_secret
NOVA_MESH_STORAGE_MODE=auto
NOVA_MESH_BLOB_STORE=nova-mesh-bridge-db
NOVA_MESH_GITHUB_TOKEN=github_pat_or_fine_grained_token_with_repo_contents_write
NOVA_MESH_GITHUB_REPO=jaunski/APOLO_MEMORIA
NOVA_MESH_GITHUB_BRANCH=main
NOVA_MESH_MAX_EVENTS=500
NOVA_MESH_MAX_DEAD_LETTERS=200
```

Storage modes:

```text
auto        = try Netlify Blobs first, then GitHub JSON fallback
github_only = skip Blobs and write GitHub JSON only
blobs_only  = skip GitHub fallback and use Blobs only
```

Never commit real tokens to GitHub.

## Universal Ingest endpoint

POST to:

```text
/.netlify/functions/ingest
```

Headers:

```text
content-type: application/json
x-nova-mesh-token: YOUR_TOKEN
```

Test payload:

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

Expected result with Blobs available:

- HTTP 200;
- normalized event;
- `bridge_write: netlify_blobs_written`;
- event stored in Netlify Blobs key `mesh_events`;
- state stored in Netlify Blobs key `mesh_state`.

Expected result if Blobs fails but GitHub token is configured:

- HTTP 200;
- normalized event;
- `bridge_write: github_json_bridge_written`;
- event appended to `nova_mesh/data/mesh_events.json`;
- `nova_mesh/data/mesh_state.json` updated.

## State endpoint

GET:

```text
/.netlify/functions/state
```

Headers:

```text
x-nova-mesh-token: YOUR_TOKEN
```

Returns:

- current Blobs state;
- event counts;
- recent events;
- recent dead letters.

This endpoint is intended for future Nova sessions, Botpress, Adalo, Make, Zapier, Manus or dashboards to inspect mesh state.

## Make/Zapier route

Make or Zapier can call the ingest endpoint by HTTP/Webhook module.

Headers:

```text
content-type: application/json
x-nova-mesh-token: ${NOVA_MESH_TOKEN}
```

Body: use `nova_mesh/contracts/event_contract.json`.

## Dead letters

If the event type/status indicates failure or blocked state, storage also appends a record to dead letters.

Blobs key:

```text
mesh_dead_letters
```

GitHub fallback file:

```text
nova_mesh/data/mesh_dead_letters.json
```

## Known limitation

GitHub JSON is durable but not ideal for high-frequency event writes because every write creates commits and can conflict under concurrency.

Use GitHub JSON as bootstrap/fallback. Use Netlify Blobs as the preferred live Bridge DB for this package.

Future storage upgrades:

1. Supabase;
2. Google Sheets;
3. Notion Database;
4. YepCode Datastore;
5. Airtable.

## Next step

Deploy this package to the existing Netlify project `nova-bridge-router`, set environment variables, then send a test event from Make or Zapier.

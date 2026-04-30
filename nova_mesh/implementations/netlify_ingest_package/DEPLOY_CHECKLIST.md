# Nova Mesh Netlify Deploy Checklist

## Project

Netlify project:

`nova-bridge-router`

Known site ID:

`81982718-9a38-4962-b7cd-4110912ce4ae`

## Already configured by Nova

Non-sensitive env vars:

```text
NOVA_MESH_STORAGE_MODE=auto
NOVA_MESH_BLOB_STORE=nova-mesh-bridge-db
```

## Must be configured manually or through a secure secret flow

Do not paste real secrets into public files or chat logs.

```text
NOVA_MESH_TOKEN=<shared secret for ingest/state endpoints>
```

Optional GitHub fallback:

```text
NOVA_MESH_GITHUB_TOKEN=<fine-grained GitHub token with contents write permission only for jaunski/APOLO_MEMORIA>
NOVA_MESH_GITHUB_REPO=jaunski/APOLO_MEMORIA
NOVA_MESH_GITHUB_BRANCH=main
```

## Deploy target

Deploy folder:

```text
nova_mesh/implementations/netlify_ingest_package/
```

## Test after deploy

### POST ingest

Endpoint:

```text
https://nova-bridge-router.netlify.app/.netlify/functions/ingest
```

Headers:

```text
content-type: application/json
x-nova-mesh-token: <NOVA_MESH_TOKEN>
```

Body:

```json
{
  "source": "manual_test",
  "event_type": "test_event",
  "payload": {
    "message": "Nova Mesh Netlify ingest online"
  },
  "priority": 1,
  "summary_for_ai": "Manual test event for Netlify ingest.",
  "next_action": "Confirm storage and connect Make/Zapier.",
  "correlation_id": "netlify_deploy_test"
}
```

Expected:

- `bridge_write: netlify_blobs_written`

### GET state

Endpoint:

```text
https://nova-bridge-router.netlify.app/.netlify/functions/state
```

Headers:

```text
x-nova-mesh-token: <NOVA_MESH_TOKEN>
```

Expected:

- current state;
- event count;
- recent events.

## Next after test

1. Add Make HTTP module calling ingest.
2. Add Zapier Webhook action calling ingest.
3. Add Botpress/Adalo gateway later.
4. Add Sentinel scheduled check against state endpoint.

# Manus Output — Netlify Deploy Runbook Summary

## Manus task

- Title: Deploying Nova Mesh Core Netlify Package Step-by-Step
- Task ID: `3CMy9TcLWnHcMQXYn4CUC3`
- URL: https://manus.im/app/3CMy9TcLWnHcMQXYn4CUC3
- Status: completed

## Useful extracted guidance

The Nova Mesh Netlify package should be deployed from:

```text
nova_mesh/implementations/netlify_ingest_package/
```

Target Netlify project:

```text
nova-bridge-router
site_id: 81982718-9a38-4962-b7cd-4110912ce4ae
```

Required environment variables:

```text
NOVA_MESH_TOKEN=<secret ingest/state token>
NOVA_MESH_STORAGE_MODE=auto
NOVA_MESH_BLOB_STORE=nova-mesh-bridge-db
```

Optional GitHub fallback variables:

```text
NOVA_MESH_GITHUB_TOKEN=<fine-grained PAT with contents write>
NOVA_MESH_GITHUB_REPO=jaunski/APOLO_MEMORIA
NOVA_MESH_GITHUB_BRANCH=main
```

Already configured by Nova:

```text
NOVA_MESH_STORAGE_MODE=auto
NOVA_MESH_BLOB_STORE=nova-mesh-bridge-db
NOVA_MESH_TOKEN=<configured as Netlify secret, value not stored here>
```

## Recommended deploy routes

1. GitHub-linked Netlify deploy with base directory `nova_mesh/implementations/netlify_ingest_package/`.
2. Manual deploy through Netlify UI using that folder.
3. CLI deploy from the package folder.
4. GitHub Actions deploy workflow using secrets `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID`.

## Test endpoints after deploy

```text
POST https://nova-bridge-router.netlify.app/.netlify/functions/ingest
GET  https://nova-bridge-router.netlify.app/.netlify/functions/state
```

## Make/Zapier test event body

```json
{
  "source": "make",
  "event_type": "test_event",
  "payload": {
    "message": "Nova Mesh ingest test"
  },
  "priority": 1,
  "summary_for_ai": "Make sent a test event to Nova Mesh.",
  "next_action": "Confirm Bridge DB write and connect recurring route.",
  "correlation_id": "make_zapier_ingest_test"
}
```

## Handoff

Use this as the deploy support artifact for the Netlify Ingest package. Next step: configure GitHub-linked deploy or run GitHub Actions deploy with secrets.

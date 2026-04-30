# Zapier → Nova Mesh Netlify Ingest

## Purpose

Connect Zapier Zaps to Nova Mesh Core by sending standardized events to the Netlify Ingest endpoint.

## Endpoint

```text
POST https://nova-bridge-router.netlify.app/.netlify/functions/ingest
```

## Zapier action

Use one of:

```text
Webhooks by Zapier > POST
Webhooks by Zapier > Custom Request
```

## Headers

```text
content-type: application/json
x-nova-mesh-token: <NOVA_MESH_TOKEN>
```

## Test body

```json
{
  "source": "zapier",
  "event_type": "test_event",
  "payload": {
    "message": "Zapier to Nova Mesh ingest test",
    "zap": "manual_test"
  },
  "priority": 1,
  "summary_for_ai": "Zapier sent a test event to Nova Mesh Netlify Ingest.",
  "next_action": "Confirm Bridge DB write and create recurring Zap route.",
  "correlation_id": "zapier_to_nova_mesh_test"
}
```

## Event patterns

### Zap triggered

```json
{
  "source": "zapier",
  "event_type": "zap_triggered",
  "payload": {
    "zap_name": "<zap>",
    "trigger_app": "<app>",
    "trigger_type": "<trigger>"
  },
  "priority": 3,
  "summary_for_ai": "Zapier trigger fired.",
  "next_action": "Route by capability registry.",
  "correlation_id": "<zap_run_id>"
}
```

### Zap failed

```json
{
  "source": "zapier",
  "event_type": "zap_failed",
  "payload": {
    "zap_name": "<zap>",
    "error": "<error>",
    "step": "<step>"
  },
  "status": "failed",
  "priority": 1,
  "summary_for_ai": "Zapier failed and should be routed to dead-letter recovery.",
  "next_action": "Create dead letter and try Make/YepCode/GitHub fallback.",
  "correlation_id": "<zap_run_id>"
}
```

## Expected response

```json
{
  "ok": true,
  "message": "Nova Mesh event accepted",
  "bridge_write": "netlify_blobs_written"
}
```

Fallback response may show:

```text
github_json_bridge_written
```

## Next step after test

Create Zaps that report:

- zap trigger;
- zap success;
- zap failure;
- app event received;
- manual command received.

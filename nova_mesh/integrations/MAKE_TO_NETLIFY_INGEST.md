# Make → Nova Mesh Netlify Ingest

## Purpose

Connect Make scenarios to Nova Mesh Core by sending standardized events to the Netlify Ingest endpoint.

## Endpoint

```text
POST https://nova-bridge-router.netlify.app/.netlify/functions/ingest
```

## Headers

```text
content-type: application/json
x-nova-mesh-token: <NOVA_MESH_TOKEN>
```

## Make module

Use:

```text
HTTP > Make a request
```

Configuration:

```text
Method: POST
URL: https://nova-bridge-router.netlify.app/.netlify/functions/ingest
Headers:
  content-type = application/json
  x-nova-mesh-token = <NOVA_MESH_TOKEN>
Body type: Raw
Content type: JSON (application/json)
```

## Test body

```json
{
  "source": "make",
  "event_type": "test_event",
  "payload": {
    "message": "Make to Nova Mesh ingest test",
    "scenario": "manual_test"
  },
  "priority": 1,
  "summary_for_ai": "Make sent a test event to Nova Mesh Netlify Ingest.",
  "next_action": "Confirm Bridge DB write and create recurring Make scenario.",
  "correlation_id": "make_to_nova_mesh_test"
}
```

## Event patterns

### Scenario started

```json
{
  "source": "make",
  "event_type": "scenario_started",
  "payload": {
    "scenario_name": "<scenario>",
    "trigger": "<trigger>"
  },
  "priority": 3,
  "summary_for_ai": "Make scenario started.",
  "next_action": "Track scenario execution.",
  "correlation_id": "<execution_id>"
}
```

### Scenario failed

```json
{
  "source": "make",
  "event_type": "scenario_failed",
  "payload": {
    "scenario_name": "<scenario>",
    "error": "<error>",
    "module": "<module>"
  },
  "status": "failed",
  "priority": 1,
  "summary_for_ai": "Make scenario failed and should be routed to dead-letter recovery.",
  "next_action": "Create dead letter and try Zapier/YepCode/GitHub fallback.",
  "correlation_id": "<execution_id>"
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

Create Make scenarios that report:

- scenario start;
- scenario success;
- scenario failure;
- external app trigger received;
- manual command received.

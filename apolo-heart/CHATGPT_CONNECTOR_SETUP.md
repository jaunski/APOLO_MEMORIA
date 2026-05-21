# Apolo Heart as a ChatGPT Connector

This project cannot be installed into the hidden core of ChatGPT. The working route is to run Apolo Heart as an external MCP/Apps SDK server and connect it to ChatGPT as a connector.

## Verified architecture

ChatGPT conversation → Apolo MCP `/mcp` endpoint → Apolo Gateway → Apolo Python Runtime → SQLite persistent memory → optional GitHub dispatch/workflows.

## What must be true for ChatGPT to use it

1. The MCP endpoint must be reachable over public HTTPS.
2. ChatGPT developer mode must be enabled in Settings → Apps & Connectors → Advanced settings.
3. A connector must be created in ChatGPT with the public URL ending in `/mcp`.
4. In each new chat, the connector must be added from the + menu unless the user/app settings make it available by default.

## Local start

Terminal 1:

```bash
python3 -m runtime.api_server --host 127.0.0.1 --port 8765 --db state/apolo_memory.sqlite
```

Terminal 2:

```bash
APOLO_PYTHON_API=http://127.0.0.1:8765 PORT=8787 node gateway/server.mjs
```

Terminal 3:

```bash
APOLO_GATEWAY_URL=http://127.0.0.1:8787 MCP_PORT=8790 node mcp/server.mjs
```

Local connector URL:

```text
http://127.0.0.1:8790/mcp
```

For ChatGPT, expose it as HTTPS with Cloudflare Tunnel, ngrok, Render, Railway, Fly.io, Replit, or another host. Example URL format:

```text
https://YOUR_PUBLIC_HOST/mcp
```

## ChatGPT connector metadata

Connector name:

```text
Apolo Heart
```

Description:

```text
Shared runtime and persistent memory bridge for routing chat context, saving MemoryNodes, searching prior project memory, enqueuing bounded loop tasks, checking runtime health, and dispatching GitHub Heart workflows when configured.
```

Connector URL:

```text
https://YOUR_PUBLIC_HOST/mcp
```

## Golden prompts

- Use Apolo Heart to check runtime health.
- Use Apolo Heart to remember: GitHub is the heart and MCP is the bridge.
- Ask Apolo Heart what it remembers about GitHub heart MCP bridge.
- Enqueue a bounded Apolo loop task with one hop.

## Hard platform boundary

ChatGPT currently requires connector creation through the user's Settings/Apps & Connectors flow and a public HTTPS endpoint. This repo can prepare and run the MCP server, but it cannot silently install itself into every ChatGPT conversation without that user-side connector step.

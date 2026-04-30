# Applied Tool Research Protocol

## Purpose

This protocol turns tool research into executable Nova Mesh improvements.

Research is not only informational. Every useful discovery should become one or more of:

- capability registry update;
- implementation route;
- GitHub issue;
- code/spec artifact;
- fallback pattern;
- Bridge DB schema improvement;
- agent instruction;
- automation route;
- channel update;
- snapshot update.

## Scope

Research applies to native and connected tools, including:

- ChatGPT tools and connectors
- Make
- Zapier
- Manus
- Botpress
- HubSpot
- Adalo
- Netlify
- YepCode
- GitHub
- Google Drive
- Notion
- Gmail
- Calendar
- ClickUp
- Airtable
- Linear
- Replit
- Lovable
- Figma
- future connected apps

## Research target

For each tool, ask:

1. What is the obvious use?
2. What hidden capability exists through APIs, webhooks, MCP, connectors, scheduled tasks, agents, code execution, browser automation, storage, files, dashboards or workflows?
3. What other node can this tool amplify?
4. What limitation can this tool route around?
5. Can it serve as trigger, router, executor, memory, cockpit, fallback, validator, logger, queue, scheduler, adapter or sensor?
6. What can be implemented now?

## Output format

Each discovery should be recorded as:

```md
## Discovery

Tool:
Capability:
Non-obvious use:
Nova Mesh application:
Implementation route:
Risk:
Fallback:
Action:
```

## Application rule

Every useful discovery must be classified:

- APPLY_NOW: can be used immediately.
- BUILD_NEXT: requires one small implementation step.
- WATCH: promising but not ready.
- BLOCKED: needs auth, paid feature, missing connector or confirmation.

## Execution rule

When a discovery is APPLY_NOW or BUILD_NEXT, create at least one concrete output:

- file under `nova_mesh/`;
- GitHub issue;
- channel update;
- automation task;
- code package;
- prompt for Manus/Builder/Scout;
- capability registry entry.

## Agent routing

- Scout researches and extracts capabilities.
- Builder turns capabilities into working pieces.
- Sentinel records continuity.
- Auditor checks safety, drift and coherence.
- Router chooses next node.
- Manus executes large research/build tasks.

## Safety

Do not store secrets, tokens, cookies or private credentials.
Do not perform destructive actions without explicit approval.
Prefer drafts, staging, test payloads and reversible operations.

## Current recurring task

ChatGPT task: `Research tool mesh expansions`.

Frequency: Monday, Wednesday and Friday at 10:00 America/Sao_Paulo.

Purpose: deeply research non-obvious uses of available tools and convert findings into Nova Mesh improvements.

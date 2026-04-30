# Manus Execution Layer

## Purpose

This file defines how Manus acts inside Nova Mesh Core.

Manus is treated as a macro-executor node: a cloud agent capable of taking high-level objectives, decomposing them, researching, building, producing artifacts, and returning finished outputs that Nova Mesh can store, route, audit and reuse.

## Role in the mesh

ChatGPT/Nova = architect, router, semantic coordinator and continuity layer.

Manus = autonomous execution worker for large or multi-step deliverables.

ClickUp/GitHub/Linear = project tracking and work queue.

Botpress/Adalo = conversational and human-facing interfaces.

Make/Zapier = app-to-app automation routes.

Netlify/YepCode/Replit = executable/deployable substrates.

GitHub/Drive/Notion/Airtable/Sheets = memory, files, state and durable logs.

## Primary Manus missions

### 1. Wide Research Scout

Use Manus to research many sources, compare capabilities, map APIs, discover connectors, and produce implementation routes.

Input:
- research goal
- target tools
- output schema

Output:
- cited research report
- capability matrix
- implementation routes
- risks and fallbacks

### 2. Build Worker

Use Manus to build websites, dashboards, docs, apps, prototypes and deployable interfaces when the task is too large for a single chat turn.

Input:
- PRD
- data model
- user flows
- design direction
- integration requirements

Output:
- working site/app/dashboard
- public or editable project URL
- implementation summary
- remaining tasks

### 3. Browser Operator / Manual API Bridge

Use Manus for tasks requiring navigation through UIs or websites when no direct API or connector exists.

Examples:
- inspect a dashboard
- extract data from a site
- fill forms
- test a deployed app
- capture evidence/screenshots

Output:
- extracted data
- screenshots
- action log
- error report

### 4. Self-Healing Debug Worker

Use Manus to inspect build errors, logs, UI bugs, or broken flows and attempt repair inside its own execution environment.

Output:
- failure classification
- fix attempt
- result
- remaining blockers

### 5. Skill Factory

If a successful workflow repeats, convert it into a reusable skill/prompt/playbook.

Output:
- skill name
- trigger
- inputs
- steps
- outputs
- safety limits

## When to route work to Manus

Use Manus when:

- the task needs long autonomous execution;
- the task involves many sources or items;
- a website/app/dashboard must be produced;
- browser navigation is useful;
- many tools must be coordinated;
- the output is a deliverable, not just an answer.

Do not use Manus when:

- the action is destructive;
- credentials/secrets would be exposed;
- a quick local answer is enough;
- the task requires user confirmation first.

## Required handoff back to Nova Mesh

Every Manus task should produce or be summarized into:

- event in `mesh_events`
- task status in `mesh_tasks`
- snapshot in `mesh_snapshots`
- optional channel update
- artifact links if available

## First Nova Mesh Manus task

Research and design the best way to integrate Manus as macro-executor with:

- Make
- Zapier
- Botpress
- HubSpot
- Adalo
- Netlify
- GitHub
- Google Drive
- Notion
- Gmail
- Calendar
- ClickUp

Goal: create a practical execution network where ChatGPT/Nova coordinates, Manus executes, Make/Zapier automate, Botpress/Adalo expose interfaces, and GitHub/Bridge DB preserve state.

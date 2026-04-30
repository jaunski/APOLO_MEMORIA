# Nova Mesh Autopilot Daemon

## Purpose

The Autopilot Daemon is an external automation bot for Nova Mesh Core.

It reads the project state, detects the next useful safe action, creates/updates tasks, writes snapshots, opens follow-up issues, and keeps the project moving without requiring a ChatGPT session to stay open.

## Important distinction

This is not ChatGPT running forever.

It is an external bot pattern using GitHub Actions, Netlify, Manus, Make/Zapier and future Bridge DB events as execution surfaces.

## First implementation substrate

GitHub Actions.

Why:

- already connected;
- can run on push, workflow_dispatch, schedule and workflow_run;
- can read/write repository files;
- can create issues;
- works without the chat being open;
- fits the current GitHub memory spine.

## Autopilot modes

### Sentinel Bot

Reads state, detects stale tasks, creates snapshots and continuity notes.

### Builder Bot

Detects implementation tasks and creates next concrete build issues or code package requests.

### Scout Bot

Detects missing capabilities and creates research tasks or capability registry TODOs.

### Reactor Bot

Reacts to workflow outcomes, failures, deploys and package changes.

### Auditor Bot

Looks for bloat, drift, missing fallbacks, unsafe routes and stale files.

## SAFE_AUTO scope

The daemon may perform low-risk reversible work:

- create snapshots;
- append channel updates;
- create GitHub issues;
- update task status;
- create small specs;
- create follow-up checklists;
- classify failures;
- create dead-letter records;
- recommend next action.

## REVIEW_QUEUE scope

The daemon should prepare but not execute:

- production changes with external impact;
- sending messages to real people;
- public publication;
- connecting paid services;
- permission/access changes.

## HARD_STOP scope

The daemon must not:

- expose secrets;
- delete data;
- spend money;
- perform irreversible account changes;
- bypass platform security.

## First daemon loop

Read:

- `nova_mesh/data/mesh_state.json`
- `nova_mesh/data/mesh_events.json`
- `nova_mesh/data/mesh_tasks.json`
- `nova_mesh/data/mesh_capabilities.json`
- `nova_mesh/data/mesh_dead_letters.json`

Then:

1. classify state;
2. detect next action;
3. update or create task;
4. create issue if needed;
5. write snapshot/channel update;
6. commit changes.

## Future upgrade

Once Netlify Ingest is live, the Autopilot Daemon should also consume Bridge DB state through `/state` and emit events through `/ingest`.

Once Manus handoff is stable, the daemon should create Manus tasks for large research/build work.

## Success criteria

Nova Mesh should keep producing useful next-step artifacts even when no chat is active.

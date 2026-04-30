# Nova Mesh Autonomy Cascade Protocol

## Purpose

This protocol turns Nova Mesh Core into an increasingly autonomous and automated project system.

The goal is to create a cascade where every useful action produces the next action, every failure becomes a tracked event, every discovery becomes an implementation route, and every session leaves enough state for the next one to continue.

## Core loop

Read state -> detect next step -> execute safe action -> log result -> create follow-up task -> snapshot -> repeat.

## Cascade levels

### Level 0 — Manual Chat Work

Nova responds and creates files/issues manually through connected tools.

Status: active.

### Level 1 — External Memory Spine

GitHub stores canonical files, contracts, state JSON, snapshots and channel updates.

Status: active.

### Level 2 — Agent Roles

Sentinel, Builder, Scout, Auditor, Router and Manus Execution Layer divide work into bounded missions.

Status: active.

### Level 3 — Scheduled Research and Continuity

ChatGPT tasks and GitHub Actions periodically inspect and expand the mesh.

Status: active/expanding.

### Level 4 — Executable Ingest

Netlify Ingest receives events from Make, Zapier, Manus, Botpress, Adalo, HubSpot and other tools.

Status: implementation created, deployment pending.

### Level 5 — Bridge DB Live State

Netlify Blobs or another storage layer becomes the primary live state store.

Status: implemented in code, deployment/test pending.

### Level 6 — Router and Fallback Automation

Events are routed by capability, tool health, risk and fallback paths.

Status: planned.

### Level 7 — Self-Healing Mesh

Failures create dead letters, retries, GitHub issues, calendar retries or human review tasks automatically.

Status: partially designed.

### Level 8 — Cross-Tool Autonomy

Make, Zapier, Manus, GitHub Actions, Netlify, Botpress, Adalo and other tools work as cooperating execution nodes.

Status: emerging.

## Action classification

Each next action should be classified as:

- SAFE_AUTO: execute without asking again.
- REVIEW_QUEUE: prepare and ask before external impact.
- HARD_STOP: do not execute without explicit approval.

## Cascade rule

Every action should create at least one of:

- completed artifact;
- next task;
- issue;
- snapshot;
- channel update;
- failure/dead-letter record;
- capability registry update;
- implementation package;
- automation.

## Failure handling

When something fails:

1. classify failure type: credential, permission, timeout, schema, tool, deploy, unknown;
2. preserve the objective;
3. switch only the substrate if necessary;
4. record the failure;
5. create the smallest next fallback step;
6. continue through another executor.

## Current cascade priorities

1. Run GitHub Actions package check for Netlify package.
2. Use Manus output to complete deploy route.
3. Deploy Netlify Ingest.
4. Test POST ingest and GET state.
5. Connect Make/Zapier to ingest.
6. Create capability router v0.
7. Create dead-letter retry workflow.
8. Add Adalo/Botpress cockpit.

## Success metric

Nova Mesh reaches a state where:

- a new event can enter from an external tool;
- it is stored in a live Bridge DB;
- a future Nova can read it through state endpoint or GitHub memory;
- follow-up tasks are generated automatically;
- failures are captured rather than lost.

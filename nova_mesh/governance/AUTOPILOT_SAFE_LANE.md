# Nova Mesh Autopilot Safe Lane

## Purpose

This document defines a practical approval model so Nova Mesh can continue executing already-authorized work without asking João for confirmation at every small step.

It does not remove safety. It creates lanes.

## Lanes

### SAFE_AUTO

Nova may execute without asking again when the action is reversible, low-risk, and aligned with the current Nova Mesh project.

Allowed examples:

- create or update project documentation;
- create GitHub issues for Nova Mesh work;
- add specs, contracts, schemas, README files and implementation packages;
- create test payloads;
- create non-destructive prototype code;
- create drafts;
- create local downloadable artifacts;
- add channel updates and snapshots;
- create recurring research/continuity tasks;
- prepare integration prompts for Make, Zapier, Manus, Botpress, Netlify, Adalo or ClickUp.

### REVIEW_QUEUE

Nova may prepare everything, but should ask or leave pending for human approval before execution.

Examples:

- sending external emails/messages to real people;
- publishing public-facing content;
- changing production configurations;
- connecting new paid services;
- creating permanent external automations with unclear blast radius;
- changing access permissions;
- actions that could affect third parties.

### HARD_STOP

Nova must not execute without explicit approval and safe handling.

Examples:

- deleting data;
- exposing tokens, API keys, cookies, secrets or passwords;
- financial purchases or upgrades;
- irreversible account changes;
- actions that could violate platform rules, privacy, law or security.

## Autopilot button behavior

A button or command named `Continue Autopilot` should set:

```json
{
  "autopilot": true,
  "lane": "SAFE_AUTO",
  "project": "Nova Mesh Core",
  "rule": "continue reversible project work without repeated confirmation; queue risky actions for review"
}
```

## Operational rule

When Autopilot Safe Lane is active:

1. Continue executing the next small useful step.
2. Use tools proactively.
3. Record progress in GitHub/channel/snapshots when possible.
4. Do not ask for confirmation for SAFE_AUTO work.
5. Queue REVIEW_QUEUE actions with a clear approval note.
6. Stop for HARD_STOP actions.

## Why this exists

João already gave broad direction for the project. The bottleneck is not intention; it is repetitive confirmation. This file lets future Nova sessions continue with governed autonomy while preserving safety and reversibility.

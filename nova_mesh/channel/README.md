# Nova Mesh Channel

This folder works as a shared cross-chat update channel for Nova Mesh Core.

It is not real-time chat between AI sessions. It is a durable handoff log that any future Nova/ChatGPT session can read to understand what previous sessions did, learned, attempted, failed, or planned.

## Purpose

- Preserve continuity if a chat crashes, resets, or loses context.
- Let future sessions know what was already built.
- Record tool failures and fallbacks.
- Capture new discoveries about Make, Zapier, Botpress, HubSpot, Adalo, Netlify, YepCode, GitHub, Google Drive, Notion, Gmail, Calendar and connected apps.
- Keep the project from depending on one conversation.

## Update format

Each update should be a small markdown file:

`YYYY-MM-DD_HHMM_short-title.md`

Recommended content:

```md
# Update title

## Session context

What chat/session was doing.

## Actions completed

- ...

## Tool results

- Tool used:
- Success/failure:
- Error if any:

## New knowledge

- ...

## Next recommended step

- ...

## Handoff summary

One paragraph that a future Nova can read quickly.
```

## Rule

Every significant step should leave a durable trace here or in `nova_mesh/snapshots/`.

If write access fails, create a local artifact and tell the user where to upload/save it later.

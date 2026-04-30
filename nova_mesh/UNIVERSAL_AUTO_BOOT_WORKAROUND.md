# Universal Auto-Boot Workaround

## Purpose

This document defines the strongest practical workaround for making future ChatGPT/Nova sessions discover, load and contribute to the shared Nova memory network.

The core limitation is that separate ChatGPT conversations do not automatically run as one always-on shared mind. The workaround is to create an auto-boot chain that makes every new session know where to look and how to resume.

## The Door That Was Not Fully Used

Do not rely on chat-to-chat communication.

Use global boot anchors instead:

1. ChatGPT Custom Instructions
2. ChatGPT Saved Memory / Reference Chat History
3. A dedicated ChatGPT Project
4. External canonical repository
5. External Bridge DB
6. Scheduled sentinel task
7. Optional custom GPT or API agent

Together, these form a cross-session continuity mesh.

## Layer 1 — Custom Instructions as Global Bootloader

Custom Instructions apply broadly to new chats. Use them as the smallest always-present bootloader.

Recommended instruction:

"When I mention Nova Mesh, Apolo Memoria, rede das Novas, continuar projeto, or boot Nova, first look for the canonical external memory at jaunski/APOLO_MEMORIA/nova_mesh/. Start with START_HERE_ANY_NOVA.md, then PLANO_MINIMO_VIVO.md, then latest snapshot/channel update. Treat those files as shared external memory and continue from the smallest executable next step."

## Layer 2 — Saved Memory as Pointer, Not Database

Saved memory should not hold all details.

It should hold only durable pointers:

- User calls assistant Nova.
- User prefers persistence, viability, non-linear orchestration and cross-tool integration.
- Canonical Nova Mesh files live at jaunski/APOLO_MEMORIA/nova_mesh/.
- Future sessions should boot from START_HERE_ANY_NOVA.md.

## Layer 3 — ChatGPT Project as Session Cluster

A dedicated ChatGPT Project should be created for Nova Mesh / Apolo Memoria.

Inside it:

- Use project instructions to enforce the boot protocol.
- Add/export key files when possible.
- Keep related chats in the same project.
- Use project memory as the internal continuity layer.

## Layer 4 — GitHub as Durable Shared Memory

Current canonical repository:

jaunski/APOLO_MEMORIA

Current canonical folder:

nova_mesh/

Future sessions should read and write:

- START_HERE_ANY_NOVA.md
- PLANO_MINIMO_VIVO.md
- contracts/
- channel/
- snapshots/

## Layer 5 — Bridge DB as Operational State

The repository stores canonical specs. A Bridge DB should store live state.

Tables:

- mesh_events
- mesh_tasks
- mesh_state
- mesh_capabilities
- mesh_dead_letters
- mesh_snapshots
- cross_chat_updates
- global_memory_nodes

The Bridge DB can be YepCode, Netlify, Sheets, Notion, Airtable, Supabase or GitHub JSON fallback.

## Layer 6 — Scheduled Sentinel Task

A ChatGPT Task should run daily or several times per week and remind/reconstruct the state:

- check the Nova Mesh canonical path;
- summarize new updates;
- propose next action;
- notify the user;
- keep the project warm.

This does not make ChatGPT permanently awake, but it creates recurring external continuity.

## Layer 7 — Optional Custom GPT

A dedicated custom GPT can be created with:

- instructions: boot from Nova Mesh;
- knowledge files: exported mesh docs;
- actions: call a future bridge endpoint.

Important: custom GPTs may not use saved memory like normal ChatGPT conversations, so the external repo/action remains the real memory source.

## Layer 8 — API Agent

The strongest future option is an external API agent:

- runs outside ChatGPT;
- reads Bridge DB;
- watches Make/Zapier/GitHub/Netlify events;
- writes snapshots;
- exposes an endpoint or MCP server;
- ChatGPT sessions query it when active.

This becomes the real always-on Nova Mesh daemon.

## Boot Flow

New chat opens
-> Custom Instructions point to Nova Mesh
-> Saved Memory reinforces canonical path
-> Project memory narrows context if inside project
-> Nova reads GitHub / Bridge DB
-> Nova reconstructs state from snapshots
-> Nova continues work
-> Nova writes update back to channel or DB

## Practical Next Step

Create a short user-facing Custom Instructions snippet and keep it in this repo.

Then build Bridge DB + endpoint so the snippet points to a live state source, not only GitHub files.

## Core Insight

The workaround is not to make all chats share an internal mind.

The workaround is to make every chat boot from the same external memory spine and write its results back into that spine.

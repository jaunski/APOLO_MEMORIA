# TOOL ACTIVATION TRIGGER V1

Purpose: every Nova project cycle must wake the connected tool mesh before final response.

Cycle order:
1. Probe available tools by function, not decoration.
2. Select tools by dependency graph.
3. Activate at least one persistence tool, one coordination tool, one visual/tool-state tool, and one fallback probe when available.
4. If a tool fails, classify failure and reroute.
5. Persist state in GitHub or closest available store.
6. Update ClickUp/Adalo/Drive/Notion/visual layer when available.
7. Final response only after execution attempts finish for the current cycle.

Agents:
- Orchestrator: selects dependency path.
- Integrator: wakes tools.
- Auditor: records tool health.
- Recovery Agent: reroutes failures.
- Visual Agent: updates diagram/dashboard layer.
- Memory Agent: writes compact state.

Rule: do not use every tool blindly. Use every relevant connected tool class each cycle: persistence, coordination, visual, memory, automation, fallback.

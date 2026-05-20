# NOVA LOOPING EXPANSION V4

## Parallel Loop Matrix

### Fast Heartbeat Loop
- cron hourly
- reads state
- updates queue
- emits webhook fanout

### Reflection Loop
- audits failed tasks
- generates recovery tasks
- updates backlog

### Speculative Loop
- prepares likely next actions before confirmation
- prebuilds payloads
- precreates dashboard states

### Multi-Agent Swarm
- strategist
- orchestrator
- integrator
- auditor
- memory_agent
- visualizer
- executor

## Tool Activation Graph

GitHub Actions -> Make -> Zapier -> Drive -> Notion -> Figma -> GitHub repository_dispatch

## Failure Policy

No blocker ends the cycle.
Every blocker creates:
- alternate route
- recovery task
- next experiment

## Goal

Continuous execution outside chat with recursive loops and externalized cognition.
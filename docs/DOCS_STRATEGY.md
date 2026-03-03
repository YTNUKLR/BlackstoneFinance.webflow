# Documentation Strategy

_Last updated: 2026-03-03_

This document defines **when and how** project documentation must be updated. It is the enforcement mechanism for the RepoBaseDocs framework. Agents and humans follow these rules to prevent documentation drift.

---

## Document Tiers

| Tier | Purpose | Documents |
|------|---------|-----------|
| **Tier 1 — Agent Input** | Consumed by executing agents during work | PROJECT_SPEC, EXECUTION_PLAN, TASK_BRIEFS, OPEN_DECISIONS, BREADCRUMBS |
| **Tier 2 — Human Dashboard & Process** | Maintained as output; read by humans | PROJECT_STATE, CLOSED_DECISION_LOG, DOCS_STRATEGY |

Tier 1 documents are the specification chain. Quality gates in their templates enforce completeness.
Tier 2 documents track reality and process. They are updated as output of agent work, not consumed as input.

---

## Mandatory Update Triggers

| Event | EXECUTION_PLAN | TASK_BRIEFS | BREADCRUMBS | PROJECT_STATE | OPEN_DECISIONS | PROJECT_SPEC | CLOSED_DECISION_LOG |
|-------|---------------|-------------|-------------|---------------|----------------|--------------|---------------------|
| Phase/task completed | Mark Done | Remove or archive brief | -- | Move to Done section | -- | -- | -- |
| New phase/task created | Add phase card | Add task brief | -- | -- | -- | Verify phase traces to spec | -- |
| Gotcha discovered | -- | -- | Add to Critical Gotchas | -- | -- | -- | -- |
| Decision made | Update phase if unblocked | -- | -- | Update if work unblocked | Move to Decided (ADR) | Update Core Constraints if project-wide | -- |
| New decision needed | Add to phase prerequisites | -- | -- | Add to Blocked if blocking | Add to Open table | -- | -- |
| Session ending | -- | -- | Add Session History entry | Update Current State | -- | -- | Review for any unlogged decisions |
| Blocker encountered | -- | -- | Add gotcha if technical | Add to Remaining Work | Add decision if needed | -- | -- |
| Agent hits design fork during execution | -- | -- | -- | -- | Add if unresolved | -- | Append new entry |

---

## Update Rules Per Document

### PROJECT_SPEC.md
The root specification. Update when project intent, constraints, or scope boundaries change. Every change gets a dated entry in Evolution Notes. The design system (colors, fonts) is documented here — update if the theme changes.

### EXECUTION_PLAN.md
The execution plan is the **single source of truth** for what to build and in what order. Update it when phases complete (mark Done in the Completed Work table), when new phases are added, or when dependencies change. Never delete completed phases.

### TASK_BRIEFS.md
Task briefs are the **work packets** agents consume. Each brief must be self-contained. For this project, most tasks require Webflow Designer connection — note this prerequisite in every brief. Reference element IDs from `docs/site-structure.md`.

### BREADCRUMBS.md
Breadcrumbs are **institutional memory**. The Webflow MCP gotchas are especially critical — they prevent wasted time on API quirks. Add entries when you discover new tool behaviors, rate limits, or workarounds.

### PROJECT_STATE.md
Project state is the **dashboard**. Update at the start and end of every session. Track remaining template content that needs replacement.

### OPEN_DECISIONS.md
Open decisions track **choices that block or shape work**. Content decisions (what goes on each page) are the primary open items for this project.

### CLOSED_DECISION_LOG.md
Append-only during execution. Log design forks like layout choices, content tone decisions, and element structure choices.

### DOCS_STRATEGY.md (this file)
Update when the documentation process itself changes.

---

## Supplementary Documentation

This project has two additional documentation files that predate the RepoBaseDocs framework:

| Document | Purpose | Relationship |
|----------|---------|-------------|
| `docs/site-structure.md` | Webflow page IDs, element IDs, component IDs | Referenced by TASK_BRIEFS for element targeting |
| `docs/webflow-mcp.md` | MCP tool patterns, rate limits, batching rules | Referenced by BREADCRUMBS and TASK_BRIEFS |

These are **not superseded** — they provide essential technical reference that the framework documents summarize. Keep them current when page structure or MCP tool behavior changes.

---

## Session Handoff Ritual

Every agent must execute this protocol before ending a session:

### Before Ending Any Session

1. **What was done**: List completed work — which pages were updated, what content/styles changed.
2. **What's in flight**: Any partially completed updates or unpublished changes.
3. **Gotchas encountered**: Any new Webflow MCP tool behaviors or workarounds. Add to BREADCRUMBS.md immediately.
4. **Next steps**: Reference specific EXECUTION_PLAN phases.

### Where to Record

- Update **PROJECT_STATE.md** Current State and Remaining Work sections.
- Update **BREADCRUMBS.md** Session History.
- If a decision was made or deferred, update **OPEN_DECISIONS.md**.

---

## Agent Session Checklist

- [ ] PROJECT_STATE.md reflects current state and remaining work
- [ ] Any new Webflow MCP gotchas are recorded in BREADCRUMBS.md
- [ ] Any decisions made are recorded in OPEN_DECISIONS.md as ADRs
- [ ] EXECUTION_PLAN.md phase statuses are current
- [ ] Session handoff information is recorded
- [ ] Log execution-time decisions to CLOSED_DECISION_LOG

---

## Staleness Prevention

1. **No session ends without a PROJECT_STATE.md update.** Non-negotiable.
2. **Webflow MCP gotchas are recorded immediately**, not "later."
3. **Content decisions are captured when identified**, not when resolved.
4. **Update site-structure.md** when new pages or elements are added.
5. **Dead content gets deleted**, not commented out.

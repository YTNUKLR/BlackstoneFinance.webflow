# TASK_BRIEFS

**Tier:** 1 — Agent Input
**Author:** Planning agent
**Consumers:** Executing agents
**Purpose:** Self-contained task briefs that executing agents consume directly. Each brief is a complete work packet — an executing agent reads one brief and starts building without asking questions.

See [EXECUTION_PLAN.md](./EXECUTION_PLAN.md) for the full phase sequence and priorities. See [PROJECT_SPEC.md](./PROJECT_SPEC.md) for project-wide constraints that all tasks inherit.

---

## Task Priority Matrix

| Task | Phase | Priority | Dependencies | Pipeline |
|------|-------|----------|--------------|----------|
| _No task briefs authored yet_ | -- | -- | -- | -- |

Task briefs will be authored as phases from the EXECUTION_PLAN are ready for agent execution. Phase 1 (Shared Components) is the first candidate — it requires Webflow Designer connection and human coordination to open the Designer tab.

---

## Guidelines

### Sizing Tasks

- **Small** (1-2 sessions): Single-page text/style updates, component edits. Use Iterative pipeline.
- **Medium** (2-4 sessions): Multi-page content replacement, theme application across pages. Use Iterative or Managed pipeline.
- **Large** (split it): Full page content creation with custom layouts. Break into per-page tasks.

### Webflow-Specific Task Requirements

- Every task that uses Designer API must note the Designer connection prerequisite
- Batch Designer API calls to 2-3 actions per call (see `docs/webflow-mcp.md`)
- Tasks modifying shared components (Navigation, Contact, Footer) affect all pages and should be sequenced carefully
- Reference element IDs from `docs/site-structure.md` in task briefs

### File Ownership Rules

- **Explicit**: Every file a task creates or modifies is listed in File Ownership. No implicit touches.
- **Non-overlapping**: No two active tasks may own the same file. If overlap is unavoidable, gate the tasks sequentially via Dependencies.
- **Component edits**: Tasks editing shared components implicitly affect all pages. Flag this in the brief.

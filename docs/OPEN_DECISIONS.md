# Open Decisions

Decisions that shape or block website development work. Capture decisions as soon as identified.

---

## Open

| # | Decision | Options | Blocking | Decide By |
|---|----------|---------|----------|-----------|
| 2 | What content goes on the About page? | a) Company overview focused on PortfolioEngine product, b) Team/founder bios, c) Product philosophy and methodology | Phase 2 | Before starting Phase 2 |
| 3 | What specific content goes on each feature page? | a) High-level marketing copy with screenshots, b) Detailed feature specifications, c) Use-case scenarios per audience (hedge funds, family offices, RIAs) | Phase 3 | Before starting Phase 3 |

---

## Decided

### ADR-001: Use `mcp__claude_ai_Webflow__*` tools over `mcp__webflow__*`

**Date**: 2026-02-27 | **Status**: Decided

**Context**: Two sets of Webflow MCP tools are available. The `mcp__webflow__*` set has limited scopes (missing `pages:read`, `cms:read`).

**Decision**: Use `mcp__claude_ai_Webflow__*` exclusively — it has broader API scopes covering sites, pages, and Designer.

**Rationale**: The limited-scope tools cannot perform basic operations like reading page content. The broader-scope set covers all needed operations.

**Consequences**: Must always use the `mcp__claude_ai_Webflow__` prefix when searching for Webflow tools.

---

### ADR-003: Direct HTML editing for shared components (preserving Webflow compatibility)

**Date**: 2026-03-03 | **Status**: Decided

**Context**: Shared components (nav, contact, footer) needed updating. Options: a) Designer API, b) Direct HTML editing, c) Both.

**Decision**: Direct HTML editing (option b), with the constraint that all Webflow classes, `data-*` attributes, and DOM structure are preserved for future Designer/MCP compatibility.

**Rationale**: The site is already maintained as a Webflow export in git. The index.html nav was already edited directly in Session 1. Direct HTML is faster, version-controlled, and doesn't require Chrome/Designer tab active. Webflow structure preserved means Designer API can still be used for future styling work.

**Consequences**: Changes must preserve all Webflow classes and attributes. Future Webflow exports could overwrite changes — but this is manageable since the git history preserves all work.

---

### ADR-002: Premium dark theme with navy and gold

**Date**: 2026-02-27 | **Status**: Decided

**Context**: The site needed a professional theme appropriate for financial services. Options ranged from clean white/minimal to dark premium.

**Decision**: Premium dark theme — navy background (#0B1120), champagne gold accents (#C9A96E), warm light text (#E8E6E1), Montserrat font.

**Rationale**: Dark themes convey sophistication and exclusivity, appropriate for a portfolio management platform targeting hedge funds and family offices. Gold accents reinforce the financial services positioning.

**Consequences**: All new pages and components must follow this color palette. Contrast ratios must be maintained for accessibility.

---

## Guidelines

- **Capture early**: Add a decision to the Open table as soon as it is identified, even with no options listed.
- **Record rationale always**: When moving a decision to Decided, the Rationale field is mandatory.
- **Never delete decided entries**: ADRs are permanent records. If reversed, add a new ADR that supersedes the old one.
- **Reference blocking phases**: Note which EXECUTION_PLAN.md phase is blocked in the "Blocking" column.
- **Number ADRs sequentially**: ADR-001, ADR-002, etc. Never reuse numbers.

# BlackstoneFinance / PortfolioEngine - Session Memory

## Project Overview
- **Repo**: Webflow export of PortfolioEngine — a professional portfolio management platform
- **Webflow Site**: PortfolioEngine (site ID: `67a6ae073034b57db459b595`)
- **Domains**: conjur.pro, www.conjur.pro
- **Webflow shortname**: racetrackviewmap
- See [webflow-mcp.md](webflow-mcp.md) for MCP tool patterns
- See [site-structure.md](site-structure.md) for page IDs and element map

## For New Sessions

Read these documents in this order:

1. **[PROJECT_SPEC.md](PROJECT_SPEC.md)** — Root specification: intent, constraints, scope
2. **[PROJECT_STATE.md](PROJECT_STATE.md)** (this file) — Where we are
3. **[EXECUTION_PLAN.md](EXECUTION_PLAN.md)** — What to do next
4. **[TASK_BRIEFS.md](TASK_BRIEFS.md)** — Self-contained work packets
5. **[OPEN_DECISIONS.md](OPEN_DECISIONS.md)** — Open questions and decided items
6. **[BREADCRUMBS.md](BREADCRUMBS.md)** — Gotchas, common tasks, session history

Also available: [CLOSED_DECISION_LOG.md](CLOSED_DECISION_LOG.md) (execution-time decisions), [DOCS_STRATEGY.md](DOCS_STRATEGY.md) (documentation rules)

Technical reference: [site-structure.md](site-structure.md) (element IDs), [webflow-mcp.md](webflow-mcp.md) (MCP tool patterns)

## Current State (2026-03-03)
- Home page fully branded with PortfolioEngine content
- Premium dark theme applied: navy bg (#0B1120), gold accents (#C9A96E)
- SEO/OG metadata updated on Home, About, 401, 404 pages
- **Phase 1 complete**: Navigation, contact section, and footer standardized across all pages
- Footer added to all pages (was missing from index.html and 404.html)
- jQuery CDN fix on index.html (was missing, required for Webflow interactions)
- Three placeholder pages created: portfolio-dashboard.html, thesis-basket.html, analytics.html
- 404 page now has nav, contact, and footer
- about.html nav/contact/footer updated (body content still template — Phase 2)
- Hosting switched from Webflow to GitHub Pages (ADR-004)
- All changes pushed to main; site live at https://ytnuklr.github.io/BlackstoneFinance.webflow/
- DNS for conjur.pro needs updating to point to GitHub Pages IPs

## Remaining Work
- About page body still has template content ("Jane Lo") — Phase 2
- Feature pages are Coming Soon placeholders — Phase 3 will add real content
- Contact section CC Contact combo class may need dark bg review via Webflow styling
- Hover states still need refinement — Phase 4
- 401.html left as-is (password gate utility page, no nav/contact/footer needed)

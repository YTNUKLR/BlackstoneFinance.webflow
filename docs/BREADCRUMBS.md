# Breadcrumbs

**Last Updated**: 2026-03-03

Hard-won knowledge, gotchas, and common procedures for working on the PortfolioEngine website.

---

## Critical Gotchas

### 1. Two Webflow MCP tool sets — only one works

There are two sets of Webflow MCP tools: `mcp__claude_ai_Webflow__*` and `mcp__webflow__*`. Only `mcp__claude_ai_Webflow__*` has sufficient API scopes. The other set is missing `pages:read`, `cms:read`, and other essential scopes. Always use `mcp__claude_ai_Webflow__*`.

### 2. Designer tab must be active and in foreground

Webflow Designer API calls (text updates, style changes, element creation) require the Designer tab to be open AND active in Chrome. Chrome suspends background tabs, which kills the MCP connection. Recommend: `chrome://settings/performance` -> add `webflow.com` to "Always keep active."

### 3. Designer API batching limit: 2-3 actions per call

Sending 8+ actions in a single Designer API call causes timeouts. Keep to 2-3 actions per call for reliability. Style updates are most sensitive — limit to 1-2 per call.

### 4. Cannot directly edit text inside component instances

Navigation, Contact, and Footer are shared components. Editing their text from a page context does not work — you get "Element does not support text setting." You must edit the component definition itself. This has not yet been attempted; see OPEN_DECISIONS #1.

### 5. Publish API has strict rate limits

The Webflow Publish API returns 429 (rate limited) frequently. Even 60-second waits between retries can fail. Workaround: the user publishes manually from Designer (Publish button, top right).

### 6. Target String elements, not Block elements for text updates

Webflow has Block elements (containers) and String elements (text nodes). `set_text` only works on String elements (they have a `textContent` field). Block elements return "Element does not support text setting." When updating text, drill down to the String child, not the Block parent.

### 7. Webflow site shortname is "racetrackviewmap"

The Webflow site shortname (used in URLs and Designer connection) is `racetrackviewmap`, not anything related to BlackstoneFinance or PortfolioEngine. This is a Webflow artifact — the display name is PortfolioEngine.

### 9. index.html was missing jQuery CDN script

All other pages (about.html, 401.html, 404.html) had the jQuery CDN script before webflow.js, but index.html only had webflow.js. This would cause Webflow interactions (nav collapse, form handling) to silently fail. Fixed in Phase 1 (2026-03-03).

### 10. 401.html is a password gate — don't add nav/contact/footer

401.html is a Webflow utility page with just a password form. Adding nav/contact/footer would break its purpose as a standalone gate. Leave it as-is.

### 11. Placeholder pages use `cc-home-wrap` section class

The Coming Soon placeholder pages (portfolio-dashboard.html, thesis-basket.html, analytics.html) reuse the `section cc-home-wrap` class from the home page hero for consistent dark-theme styling. No custom CSS was needed.

### 8. CSS properties must be longhand

Webflow style updates only accept longhand CSS properties. Use `margin-top`, `margin-right`, etc. — not the shorthand `margin`. Colors accept hex (`#C9A96E`) or rgba (`rgba(201, 169, 110, 0.2)`).

---

## File Map

### Core Files

| File | Purpose |
|------|---------|
| `index.html` | Home/landing page |
| `about.html` | About page |
| `styleguide.html` | Webflow style guide and component library |
| `401.html` | Custom 401 error page |
| `404.html` | Custom 404 error page |
| `portfolio-dashboard.html` | Portfolio Dashboard (Coming Soon placeholder) |
| `thesis-basket.html` | Thesis Baskets (Coming Soon placeholder) |
| `analytics.html` | Analytics (Coming Soon placeholder) |
| `work/project-{1-4}.html` | Old template project pages (unused) |
| `css/racetrackviewmap.webflow.css` | Custom styles (Webflow-generated) |
| `css/normalize.css` | CSS reset |
| `css/webflow.css` | Webflow base styles |
| `js/` | JavaScript files (Webflow interactions) |
| `images/` | Image assets |

### Documentation

| Document | Purpose |
|----------|---------|
| `docs/PROJECT_STATE.md` | Living snapshot: what is done, active, blocked |
| `docs/PROJECT_SPEC.md` | Root specification — intent, constraints, scope |
| `docs/EXECUTION_PLAN.md` | Priority-ordered phases |
| `docs/TASK_BRIEFS.md` | Self-contained task work packets |
| `docs/OPEN_DECISIONS.md` | Open questions and decided items (ADRs) |
| `docs/CLOSED_DECISION_LOG.md` | Execution-time micro-decisions |
| `docs/BREADCRUMBS.md` | This file — gotchas and procedures |
| `docs/DOCS_STRATEGY.md` | Documentation update rules |
| `docs/site-structure.md` | Webflow page IDs and element IDs |
| `docs/webflow-mcp.md` | MCP tool patterns and gotchas |

---

## Common Tasks

### Update text on the home page

1. Ensure Webflow Designer is open and active (see Gotcha #2)
2. Look up the element ID in `docs/site-structure.md`
3. Use `mcp__claude_ai_Webflow__element_tool` with `set_text` action
4. Target String elements, not Block elements (see Gotcha #6)
5. Batch 2-3 text updates per call (see Gotcha #3)

### Update page styles

1. Ensure Webflow Designer is open and active
2. Use `mcp__claude_ai_Webflow__style_tool` with longhand CSS properties (see Gotcha #8)
3. Limit to 1-2 style updates per call
4. For pseudo states (hover), use separate call with `pseudo` parameter
5. For breakpoints (mobile), use separate call with `breakpoint_id` parameter

### Publish changes

1. User publishes manually from Designer (Publish button, top right)
2. Do NOT use the Publish API — it is rate-limited (see Gotcha #5)
3. For GitHub Pages: commit and push changes to main branch

---

## Session History

### 2026-02-27 (Session 1 — Initial Branding)

**Goal**: Transform the Webflow template ("Jane Lo" portfolio) into PortfolioEngine marketing site.
**What changed**:
- Updated home page hero text, feature cards, and solutions section from template content to PortfolioEngine branding
- Applied premium dark theme: navy bg (#0B1120), gold accents (#C9A96E), warm light text (#E8E6E1)
- Updated SEO/OG metadata on Home, About, 401, 404 pages
- Created project documentation: PROJECT_STATE.md, site-structure.md, webflow-mcp.md
- Published to conjur.pro
**Remaining**: Navigation component still says "Portfolio" with old links. Contact component has template form. About page has template content. Feature pages are placeholders. Some hover states need refinement.

### 2026-03-03 (Session 2 — Phase 1: Shared Components)

**Goal**: Standardize navigation, contact section, and footer across all pages. Create placeholder pages for nav links.
**What changed**:
- Standardized nav on about.html and 404.html to match index.html (PortfolioEngine text logo, 5 links)
- Replaced about.html template contact form with CTA section matching index.html
- Added minimal footer (copyright + email) to index.html, about.html, 404.html
- Fixed missing jQuery CDN on index.html
- Created 3 Coming Soon placeholder pages: portfolio-dashboard.html, thesis-basket.html, analytics.html
- 401.html left as-is (password gate utility page)
- Design doc: `docs/plans/2026-03-03-phase1-shared-components-design.md`
- Implementation plan: `docs/plans/2026-03-03-phase1-implementation.md`
**Remaining**: About page body still template content (Phase 2). Feature pages are placeholders (Phase 3). Hover states need refinement (Phase 4). Changes not yet published to conjur.pro.

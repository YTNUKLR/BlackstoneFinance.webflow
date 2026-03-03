# Phase 1: Update Shared Components — Design

**Date**: 2026-03-03
**Status**: Approved
**Approach**: Direct HTML editing (preserve all Webflow classes/attributes for future Designer compatibility)

## Decisions Made

| Decision | Answer |
|----------|--------|
| Nav links to nonexistent pages | Create placeholder "Coming Soon" pages |
| Footer content | Minimal — copyright + email only |
| Contact section style (about.html) | Match index.html CTA style (not a form) |
| "Start Free Trial" button target | Leave as `#` for now |
| Editing approach | Direct HTML (Approach A), preserving Webflow structure |

## Constraint

All edits must preserve Webflow classes, `data-*` attributes, and DOM structure so that Webflow Designer and MCP tools remain functional for future styling work.

## Changes

### 1. Navigation — Standardize Across All Pages

Every page gets the index.html nav structure:

- **Logo**: `<div class="text-block">PortfolioEngine</div>` (text, no image)
- **Links**: Home (`index.html`), Dashboard (`portfolio-dashboard.html`), Thesis Baskets (`thesis-basket.html`), Analytics (`analytics.html`), Contact (`#contact`)
- **Classes preserved**: `navigation w-nav`, `navigation-items`, `logo-link w-nav-brand`, `navigation-wrap`, `navigation-item w-nav-link`, `menu-button w-nav-button`
- **`w--current`** class applied to the appropriate link per page

**Pages affected**: `about.html`, `401.html`, `404.html`, plus 3 new placeholder pages

### 2. Contact Section — Standardize Across All Pages

Every page gets the index.html contact section:

- **Heading**: "Ready to Elevate Your Portfolio Management?"
- **Subtext**: "Join 500+ investment firms already using PortfolioEngine to outperform the market"
- **Buttons**: "Start Free Trial" (`href="#"`), "Schedule Demo" (`href="mailto:contact@portfolioengine.com"`)
- **Stats column**: $12B+ AUM, 98% Client Retention, 0.8s Load Time
- **Features column**: Real-Time Analytics, Thesis Basket Management, Risk Management Suite
- **`id="contact"`** on the section div for nav anchor
- **Classes preserved**: `section cc-contact`, `container`, `section-heading-wrap`, `label cc-light`, `button w-button`, `button cc-contact-us w-button`, `contact-feature-wrap`, `contact-feature`

### 3. Footer — Add to All Pages

Minimal footer on every page:

```
© 2026 PortfolioEngine  |  contact@portfolioengine.com
```

- Uses existing `footer-wrap` class
- Removes Webflow branding and social links
- Email is a `mailto:` link
- **index.html**: Footer added (currently missing)
- **about.html**: Footer replaced (currently has Webflow template content)
- **Other pages**: Footer added

### 4. Placeholder Pages — 3 New Files

`portfolio-dashboard.html`, `thesis-basket.html`, `analytics.html`

Each contains:
- Standard `<head>` with Webflow CSS links, matching dark theme meta
- Standardized nav (with `w--current` on their respective link)
- Centered "Coming Soon" section with page title and brief description
- Standardized contact section
- Minimal footer
- Webflow JS includes

Content uses existing Webflow classes only — no custom CSS.

## Pages Touched

| Page | Nav | Contact | Footer | Other |
|------|-----|---------|--------|-------|
| `index.html` | No change | No change | **Add** | — |
| `about.html` | **Replace** old template nav | **Replace** old template form | **Replace** Webflow links | — |
| `401.html` | **Verify/update** | **Add if missing** | **Add** | — |
| `404.html` | **Verify/update** | **Add if missing** | **Add** | — |
| `portfolio-dashboard.html` | **New** | **New** | **New** | Coming Soon content |
| `thesis-basket.html` | **New** | **New** | **New** | Coming Soon content |
| `analytics.html` | **New** | **New** | **New** | Coming Soon content |

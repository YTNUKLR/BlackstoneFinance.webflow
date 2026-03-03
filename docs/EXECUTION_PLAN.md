# Execution Plan

**Date**: 2026-03-03
**Status**: Active — Site partially branded. Home page updated, shared components and secondary pages still need work.
**Purpose**: Ordered list of what needs to happen next to complete the PortfolioEngine marketing site.

---

## How to Use This Document

1. **Start at the first incomplete phase.** Phases are ordered by priority.
2. **Check prerequisites.** Some phases depend on others completing first.
3. **Mark phases complete** in the Completed Work table as work finishes.

---

## Completed Work

| Phase | What Was Done | Date |
|-------|--------------|------|
| Initial Webflow export | Site exported from Webflow, repo created | 2026-02 |
| Home page content | Updated hero, feature cards, and solutions section from template ("Jane Lo") to PortfolioEngine content | 2026-02-27 |
| Dark theme | Applied premium dark theme: navy bg (#0B1120), gold accents (#C9A96E), Montserrat font | 2026-02-27 |
| SEO metadata | Updated OG/meta on Home, About, 401, 404 pages | 2026-02-27 |
| Site documentation | Created PROJECT_STATE.md, site-structure.md, webflow-mcp.md | 2026-02-27 |
| Phase 1: Shared Components | Nav, contact, footer standardized on all pages. 3 placeholder pages created. jQuery CDN fixed on index.html. 401.html skipped (password gate). | 2026-03-03 |

---

## What to Do Next

### Phase 2: Update About Page

**Priority**: High | **Effort**: Medium | **Prerequisites**: ~~Phase 1~~ Done
**Why**: About page still has template content. Visitors who click "About" see placeholder text.

1. Replace template content with PortfolioEngine company/product information
2. Apply dark theme styling consistent with home page
3. Ensure responsive layout works on mobile

**Acceptance**: About page has PortfolioEngine-specific content with consistent dark theme styling.

---

### Phase 3: Create Product Feature Pages

**Priority**: High | **Effort**: Large | **Prerequisites**: Phase 1
**Why**: The existing work/project pages (1-4) are template placeholders. They should showcase PortfolioEngine features: Portfolio Dashboard, Thesis Baskets, Analytics, Client Reporting.

1. Update project-1.html -> Portfolio Dashboard feature page
2. Update project-2.html -> Thesis Baskets feature page
3. Update project-3.html -> Advanced Analytics feature page
4. Update project-4.html -> Client Reporting feature page
5. Apply dark theme styling to all four pages
6. Update navigation links to point to these pages with correct names

**Acceptance**: All four feature pages have PortfolioEngine-specific content with consistent styling and working navigation links.

---

### Phase 4: Refine Hover States and Interactions

**Priority**: Medium | **Effort**: Small | **Prerequisites**: Phases 1-3
**Why**: A few hover states still need refinement per PROJECT_STATE.md. Professional polish matters for a financial services site.

1. Audit all interactive elements for consistent hover behavior
2. Ensure gold accent (#C9A96E) hover states are applied consistently
3. Test on mobile for touch interaction behavior

**Acceptance**: All hover states are consistent and professional.

---

### Phase 5: Final Review and Polish

**Priority**: Medium | **Effort**: Small | **Prerequisites**: Phases 1-4
**Why**: Final pass to ensure no template content remains and all pages work together cohesively.

1. Full-site review for any remaining template text
2. Cross-browser testing (Chrome, Firefox, Safari, Edge)
3. Mobile responsiveness audit
4. Performance audit (image optimization, load times)
5. Publish to conjur.pro

**Acceptance**: Site is fully branded, responsive, and published with no template remnants.

---

## Phase Dependency Graph

```
Phase 1: Shared Components (Navigation, Contact, Footer)
    │
    ├──→ Phase 2: About Page
    │
    ├──→ Phase 3: Product Feature Pages (4 pages)
    │
    └──→ Phase 4: Hover States & Interactions
              │
              ▼
         Phase 5: Final Review & Polish
```

---

## Priority Matrix

| Phase | Priority | Effort | Can Start Now? |
|-------|----------|--------|----------------|
| ~~1. Shared Components~~ | ~~Critical~~ | ~~Medium~~ | **Done** |
| 2. About Page | High | Medium | **Yes** |
| 3. Product Feature Pages | High | Large | **Yes** |
| 4. Hover States | Medium | Small | After Phases 1-3 |
| 5. Final Review | Medium | Small | After all above |

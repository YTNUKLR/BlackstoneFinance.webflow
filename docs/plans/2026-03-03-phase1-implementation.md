# Phase 1: Shared Components Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Standardize navigation, contact section, and footer across all pages; create three placeholder pages.

**Architecture:** Direct HTML editing of Webflow-exported files. All edits preserve Webflow classes, `data-*` attributes, and DOM structure for future Designer/MCP compatibility. No custom CSS — only existing Webflow classes used.

**Tech Stack:** Static HTML, Webflow CSS framework, GitHub Pages deployment.

**Design doc:** `docs/plans/2026-03-03-phase1-shared-components-design.md`

---

## Reference: Canonical HTML Snippets

These are the exact HTML blocks to use across all pages. Only `w--current` and `aria-current="page"` vary per page.

### Nav snippet (from index.html:21-37)

```html
  <div data-collapse="medium" data-animation="default" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" class="navigation w-nav">
    <div class="navigation-items">
      <a href="index.html" class="logo-link w-nav-brand">
        <div class="text-block">PortfolioEngine</div>
      </a>
      <div class="navigation-wrap">
        <nav role="navigation" class="navigation-items w-nav-menu">
          <a href="index.html" class="navigation-item w-nav-link">Home</a>
          <a href="portfolio-dashboard.html" class="navigation-item w-nav-link">Dashboard</a>
          <a href="thesis-basket.html" class="navigation-item w-nav-link">Thesis Baskets</a>
          <a href="analytics.html" class="navigation-item w-nav-link">Analytics</a>
          <a href="#contact" class="navigation-item w-nav-link">Contact</a>
        </nav>
        <div class="menu-button w-nav-button"><img src="images/menu-icon_1menu-icon.png" width="22" alt="" class="menu-icon"></div>
      </div>
    </div>
  </div>
```

**Per-page `w--current` rules:**
- **index.html**: Home link gets `w--current` + `aria-current="page"`, logo gets `w--current` + `aria-current="page"`
- **about.html**: No link gets `w--current` (About not in nav — user navigates via logo → Home)
- **portfolio-dashboard.html**: Dashboard link gets `w--current` + `aria-current="page"`
- **thesis-basket.html**: Thesis Baskets link gets `w--current` + `aria-current="page"`
- **analytics.html**: Analytics link gets `w--current` + `aria-current="page"`
- **404.html**: No link gets `w--current`

### Contact snippet (from index.html:188-214)

```html
  <div id="contact" class="section cc-contact">
    <div class="container">
      <div class="section-heading-wrap">
        <div class="label cc-light">Get Started</div>
        <h2>Ready to Elevate Your Portfolio Management?</h2>
        <p class="paragraph-light">Join 500+ investment firms already using PortfolioEngine to outperform the market</p>
      </div>
      <div class="button-wrap">
        <a href="#" class="button w-button">Start Free Trial</a>
        <a href="mailto:contact@portfolioengine.com" class="button cc-contact-us w-button">Schedule Demo</a>
      </div>
      <div class="contact-feature-wrap">
        <div>
          <div class="label cc-light">Key Stats</div>
          <div class="contact-feature">$12B+ Assets Under Management</div>
          <div class="contact-feature">98% Client Retention Rate</div>
          <div class="contact-feature">0.8s Average Load Time</div>
        </div>
        <div>
          <div class="label cc-light">Features</div>
          <div class="contact-feature">Real-Time Analytics</div>
          <div class="contact-feature">Thesis Basket Management</div>
          <div class="contact-feature">Risk Management Suite</div>
        </div>
      </div>
    </div>
  </div>
```

### Footer snippet (new — uses existing `footer-wrap` class)

```html
  <div class="footer-wrap">
    <div class="paragraph-tiny">&copy; 2026 PortfolioEngine &nbsp;|&nbsp; <a href="mailto:contact@portfolioengine.com" class="footer-item">contact@portfolioengine.com</a></div>
  </div>
```

### Script tags (from about.html:213-214 — must be last before `</body>`)

```html
  <script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=67a6ae073034b57db459b595" type="text/javascript" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
  <script src="js/webflow.js" type="text/javascript"></script>
```

---

## Task 1: Add footer + fix missing jQuery on index.html

**Files:**
- Modify: `index.html:214-217` (before closing scripts)

**Step 1: Add footer before script tag**

Insert the footer snippet between the closing `</div>` of the contact section (line 214) and the `<script>` tag (line 216).

**Step 2: Add missing jQuery CDN script**

index.html is currently missing the jQuery CDN script that all other pages have. Add it before `webflow.js`:

Replace:
```html
  <script src="js/webflow.js" type="text/javascript"></script>
```

With:
```html
  <script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=67a6ae073034b57db459b595" type="text/javascript" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
  <script src="js/webflow.js" type="text/javascript"></script>
```

**Step 3: Verify in browser**

Open `index.html` locally and confirm footer renders below contact section.

**Step 4: Commit**

```bash
git add index.html
git commit -m "Add footer and fix missing jQuery CDN on index.html"
```

---

## Task 2: Update about.html — nav, contact, and footer

**Files:**
- Modify: `about.html:21-33` (nav), `about.html:174-200` (contact), `about.html:201-212` (footer)

**Step 1: Replace navigation (lines 21-33)**

Replace the entire nav block (old template with image logo and Home/About/Styleguide links) with the canonical nav snippet. No link gets `w--current` since "About" isn't in the nav.

**Step 2: Replace contact section (lines 174-200)**

Replace old template contact form ("Want to get in touch? Drop me a line!" with Lorem ipsum and form fields) with the canonical contact snippet. Add `id="contact"` on the section div.

**Step 3: Replace footer (lines 201-212)**

Replace old Webflow-branded footer (Powered by Webflow + Facebook/Twitter/Instagram links) with the canonical footer snippet.

**Step 4: Verify in browser**

Open `about.html` locally. Confirm:
- Nav shows PortfolioEngine text logo + correct 5 links
- Contact shows CTA with buttons and stats (not the form)
- Footer shows copyright + email
- `#contact` nav link scrolls to contact section

**Step 5: Commit**

```bash
git add about.html
git commit -m "Standardize nav, contact, and footer on about.html"
```

---

## Task 3: Update 404.html — add nav, contact, and footer

**Files:**
- Modify: `404.html` (insert nav at top of body, contact + footer before scripts)

**Step 1: Add nav after `<body>` tag (line 20)**

Insert the canonical nav snippet. No link gets `w--current`.

**Step 2: Add contact section + footer before script tags**

Insert the canonical contact snippet + footer snippet after the closing `</div>` of the utility-page-wrap (line 31) and before the `<script>` tags (line 32).

**Step 3: Verify in browser**

Open `404.html` locally. Confirm nav, 404 message, contact section, and footer all render.

**Step 4: Commit**

```bash
git add 404.html
git commit -m "Add nav, contact section, and footer to 404 page"
```

---

## Task 4: Skip 401.html

**Rationale:** 401.html is a Webflow password-gate utility page (just a password form). Adding nav/contact/footer would break its purpose as a standalone gate. Leave as-is.

No action needed.

---

## Task 5: Create portfolio-dashboard.html

**Files:**
- Create: `portfolio-dashboard.html`

**Step 1: Create the file**

Use the canonical `<head>` from index.html (with title/og adjusted), canonical nav (Dashboard link gets `w--current`), a Coming Soon body section, canonical contact, canonical footer, and canonical script tags.

```html
<!DOCTYPE html>
<html data-wf-site="67a6ae073034b57db459b595">
<head>
  <meta charset="utf-8">
  <title>Dashboard - PortfolioEngine</title>
  <meta content="Portfolio Dashboard - PortfolioEngine" property="og:title">
  <meta content="Real-time portfolio analytics and performance tracking" property="og:description">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <link href="css/normalize.css" rel="stylesheet" type="text/css">
  <link href="css/webflow.css" rel="stylesheet" type="text/css">
  <link href="css/racetrackviewmap.webflow.css" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com" rel="preconnect">
  <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin="anonymous">
  <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" type="text/javascript"></script>
  <script type="text/javascript">WebFont.load({  google: {    families: ["Montserrat:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic"]  }});</script>
  <script type="text/javascript">!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);</script>
  <link href="images/favicon.ico" rel="shortcut icon" type="image/x-icon">
  <link href="images/webclip.png" rel="apple-touch-icon">
</head>
<body>
  <!-- NAV: Dashboard link gets w--current -->
  <div data-collapse="medium" data-animation="default" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" class="navigation w-nav">
    <div class="navigation-items">
      <a href="index.html" class="logo-link w-nav-brand">
        <div class="text-block">PortfolioEngine</div>
      </a>
      <div class="navigation-wrap">
        <nav role="navigation" class="navigation-items w-nav-menu">
          <a href="index.html" class="navigation-item w-nav-link">Home</a>
          <a href="portfolio-dashboard.html" aria-current="page" class="navigation-item w-nav-link w--current">Dashboard</a>
          <a href="thesis-basket.html" class="navigation-item w-nav-link">Thesis Baskets</a>
          <a href="analytics.html" class="navigation-item w-nav-link">Analytics</a>
          <a href="#contact" class="navigation-item w-nav-link">Contact</a>
        </nav>
        <div class="menu-button w-nav-button"><img src="images/menu-icon_1menu-icon.png" width="22" alt="" class="menu-icon"></div>
      </div>
    </div>
  </div>

  <div class="section cc-home-wrap">
    <div class="container">
      <div class="intro-wrap">
        <div class="label cc-light">Coming Soon</div>
        <h1 class="name-text">Portfolio Dashboard</h1>
        <div class="paragraph-light">Real-time portfolio analytics, performance attribution, and customizable dashboards for institutional-grade investment management.</div>
      </div>
    </div>
  </div>

  <div id="contact" class="section cc-contact">
    <div class="container">
      <div class="section-heading-wrap">
        <div class="label cc-light">Get Started</div>
        <h2>Ready to Elevate Your Portfolio Management?</h2>
        <p class="paragraph-light">Join 500+ investment firms already using PortfolioEngine to outperform the market</p>
      </div>
      <div class="button-wrap">
        <a href="#" class="button w-button">Start Free Trial</a>
        <a href="mailto:contact@portfolioengine.com" class="button cc-contact-us w-button">Schedule Demo</a>
      </div>
      <div class="contact-feature-wrap">
        <div>
          <div class="label cc-light">Key Stats</div>
          <div class="contact-feature">$12B+ Assets Under Management</div>
          <div class="contact-feature">98% Client Retention Rate</div>
          <div class="contact-feature">0.8s Average Load Time</div>
        </div>
        <div>
          <div class="label cc-light">Features</div>
          <div class="contact-feature">Real-Time Analytics</div>
          <div class="contact-feature">Thesis Basket Management</div>
          <div class="contact-feature">Risk Management Suite</div>
        </div>
      </div>
    </div>
  </div>

  <div class="footer-wrap">
    <div class="paragraph-tiny">&copy; 2026 PortfolioEngine &nbsp;|&nbsp; <a href="mailto:contact@portfolioengine.com" class="footer-item">contact@portfolioengine.com</a></div>
  </div>

  <script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=67a6ae073034b57db459b595" type="text/javascript" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
  <script src="js/webflow.js" type="text/javascript"></script>
</body>
</html>
```

**Step 2: Verify in browser**

Open locally. Confirm nav (Dashboard highlighted), Coming Soon section, contact, footer.

**Step 3: Commit**

```bash
git add portfolio-dashboard.html
git commit -m "Create placeholder Portfolio Dashboard page"
```

---

## Task 6: Create thesis-basket.html

**Files:**
- Create: `thesis-basket.html`

Same structure as Task 5, with these differences:
- Title: `Thesis Baskets - PortfolioEngine`
- OG title: `Thesis Baskets - PortfolioEngine`
- OG description: `Create and track thematic investment strategies with thesis-based portfolio construction`
- `w--current` on Thesis Baskets nav link
- Heading: `Thesis Baskets`
- Description: `Create and track thematic investment strategies with our unique thesis-based portfolio construction tools. Monitor performance, rebalance automatically, and validate your investment thesis.`

**Step 1: Create the file** (same template as Task 5, swap title/content/w--current)

**Step 2: Verify in browser**

**Step 3: Commit**

```bash
git add thesis-basket.html
git commit -m "Create placeholder Thesis Baskets page"
```

---

## Task 7: Create analytics.html

**Files:**
- Create: `analytics.html`

Same structure as Task 5, with these differences:
- Title: `Analytics - PortfolioEngine`
- OG title: `Analytics - PortfolioEngine`
- OG description: `Advanced performance metrics, risk analysis, and factor attribution for professional investors`
- `w--current` on Analytics nav link
- Heading: `Analytics`
- Description: `Advanced performance metrics, attribution analysis, risk modeling, and factor decomposition — institutional-grade analytics for professional investors.`

**Step 1: Create the file** (same template as Task 5, swap title/content/w--current)

**Step 2: Verify in browser**

**Step 3: Commit**

```bash
git add analytics.html
git commit -m "Create placeholder Analytics page"
```

---

## Task 8: Update project docs

**Files:**
- Modify: `docs/PROJECT_STATE.md`
- Modify: `docs/EXECUTION_PLAN.md`
- Modify: `docs/OPEN_DECISIONS.md`
- Modify: `docs/BREADCRUMBS.md`

**Step 1: Update PROJECT_STATE.md**

Update "Current State" to reflect Phase 1 completion. Move completed items from "Remaining Work" and add any new findings.

**Step 2: Update EXECUTION_PLAN.md**

Mark Phase 1 as complete. Update Phase 2 status from "Blocked on Phase 1" to "Ready to start".

**Step 3: Update OPEN_DECISIONS.md**

Close Decision #1 (how to edit shared components — answered: Direct HTML). Move to Decided section as ADR-003.

**Step 4: Update BREADCRUMBS.md**

Add findings:
- index.html was missing jQuery CDN script (fixed)
- 401.html is a password gate — don't add nav/contact/footer
- about.html nav/contact/footer were completely stale template content
- Placeholder pages use `cc-home-wrap` section class for Coming Soon hero

**Step 5: Commit**

```bash
git add docs/PROJECT_STATE.md docs/EXECUTION_PLAN.md docs/OPEN_DECISIONS.md docs/BREADCRUMBS.md
git commit -m "Update project docs for Phase 1 completion"
```

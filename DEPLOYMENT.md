# Deployment Guide

## GitHub Pages Deployment

This guide covers deploying the PortfolioEngine website to GitHub Pages.

## Table of Contents
- [Quick Deploy](#quick-deploy)
- [Custom Domain Setup](#custom-domain-setup)
- [Troubleshooting](#troubleshooting)
- [Important Files](#important-files)

## Quick Deploy

### Step 1: Push to GitHub
```bash
# Add all changes
git add -A

# Commit with descriptive message
git commit -m "Your commit message"

# Push to main branch
git push origin main
```

### Step 2: Enable GitHub Pages
1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Source", select **Deploy from a branch**
4. Choose **main** branch and **/ (root)** folder
5. Click **Save**

### Step 3: Access Your Site
- **GitHub Pages URL**: `https://[username].github.io/[repository-name]/`
- **Example**: https://ytnuklr.github.io/BlackstoneFinance.webflow/

## Custom Domain Setup

### Prerequisites
- A domain name (e.g., www.conjur.pro)
- Access to your domain's DNS settings

### Step 1: Configure DNS
Add a CNAME record in your domain registrar (e.g., GoDaddy):
- **Type**: CNAME
- **Host**: www
- **Points to**: `[username].github.io`
- **TTL**: 600 seconds (or default)

### Step 2: Add CNAME File
Create a `CNAME` file in your repository root:
```
www.yourdomain.com
```

### Step 3: Push Changes
```bash
git add CNAME
git commit -m "Add custom domain"
git push origin main
```

### Step 4: Verify in GitHub
1. Go to **Settings** → **Pages**
2. Custom domain should show your domain
3. Wait for DNS check to complete (can take up to 24 hours)
4. Enable "Enforce HTTPS" when available

## Troubleshooting

### Issue: Site Shows Old Content

**Problem**: GitHub Pages shows outdated content or doesn't update.

**Solutions**:
1. **Clear Browser Cache**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Try incognito/private browsing mode

2. **Force GitHub Pages Rebuild**
   ```bash
   # Add a space to trigger rebuild
   echo " " >> index.html
   git add index.html
   git commit -m "Trigger rebuild"
   git push origin main
   ```

3. **Check Deployment Status**
   - Go to repository → **Actions** tab
   - Look for "pages build and deployment" workflow
   - Ensure it completed successfully

### Issue: Custom Domain Not Working

**Problem**: "Both www.domain.com and its alternate name are improperly configured"

**Solutions**:
1. **Verify DNS Settings**
   ```bash
   # Check DNS propagation
   dig www.yourdomain.com CNAME +short
   # Should return: username.github.io.
   ```

2. **Remove Conflicting Services**
   - If using Webflow, disconnect the domain from Webflow hosting
   - If using other hosting, ensure it's not serving the domain

3. **DNS Propagation Time**
   - DNS changes can take 1-48 hours to propagate
   - Check status at: https://www.whatsmydns.net/

### Issue: 404 Error

**Problem**: GitHub Pages returns 404 error.

**Solutions**:
1. **Check Repository Settings**
   - Ensure repository is public
   - GitHub Pages is enabled in Settings

2. **Verify index.html**
   - File must be named exactly `index.html` (lowercase)
   - Located in root directory

3. **Add .nojekyll File**
   ```bash
   touch .nojekyll
   git add .nojekyll
   git commit -m "Add .nojekyll"
   git push origin main
   ```

### Issue: Authentication Errors

**Problem**: Can't push to GitHub (authentication failed).

**Solutions**:
1. **Use Personal Access Token**
   - Go to GitHub → Settings → Developer settings → Personal access tokens
   - Generate new token with "repo" scope
   - Use token as password when pushing

2. **Use GitHub Desktop**
   - Download from desktop.github.com
   - Sign in with your GitHub account
   - Push changes through the GUI

3. **Setup SSH Key**
   ```bash
   # Generate SSH key
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

   # Add to GitHub account
   # Copy public key and add to GitHub → Settings → SSH Keys
   cat ~/.ssh/id_rsa.pub
   ```

## Important Files

### Required Files
- `index.html` - Main landing page (required)
- `.nojekyll` - Prevents Jekyll processing (recommended)

### Optional Files
- `CNAME` - Custom domain configuration
- `404.html` - Custom 404 error page
- `.gitignore` - Exclude files from repository

### File Structure
```
/
├── index.html                 # Main landing page (PortfolioEngine)
├── portfolio-dashboard.html   # Dashboard page
├── thesis-basket.html        # Thesis management
├── analytics.html            # Analytics dashboard
├── css/                      # Stylesheets
│   ├── webflow.css
│   ├── normalize.css
│   └── racetrackviewmap.webflow.css
├── js/                       # JavaScript
│   └── webflow.js
├── images/                   # Image assets
├── CNAME                     # Custom domain (optional)
└── .nojekyll                 # Disable Jekyll processing
```

## Deployment Checklist

Before deploying, ensure:
- [ ] All files are committed to Git
- [ ] `index.html` exists in root directory
- [ ] All asset paths are relative (not absolute)
- [ ] Images are optimized for web
- [ ] JavaScript console has no errors
- [ ] Site works locally when opened directly
- [ ] Custom domain DNS is configured (if using)
- [ ] Repository is public (for GitHub Pages)

## Performance Tips

1. **Use CDN for Libraries**
   ```html
   <!-- Instead of local files -->
   <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
   ```

2. **Optimize Images**
   - Use WebP format when possible
   - Compress images before uploading
   - Use appropriate dimensions

3. **Enable Browser Caching**
   - GitHub Pages automatically handles caching
   - Use versioned filenames for updates

## Monitoring

### Check Deployment Status
- **GitHub Actions**: Repository → Actions → "pages build and deployment"
- **Site Status**: Settings → Pages → "Your site is live at..."

### Analytics
Consider adding:
- Google Analytics
- GitHub Insights (repository traffic)

## Security

- Always use HTTPS (GitHub Pages provides free SSL)
- Don't commit sensitive data (API keys, passwords)
- Use `.gitignore` for local config files
- Review dependencies regularly

---
*Last Updated: February 27, 2026*
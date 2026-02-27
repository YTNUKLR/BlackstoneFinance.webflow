# Troubleshooting Guide

## Common Issues and Solutions

This guide addresses common problems encountered when working with the PortfolioEngine website.

## Table of Contents
- [GitHub Pages Issues](#github-pages-issues)
- [Custom Domain Problems](#custom-domain-problems)
- [Display Issues](#display-issues)
- [Development Issues](#development-issues)
- [Git Issues](#git-issues)

---

## GitHub Pages Issues

### Site Not Updating After Push

**Symptoms:**
- Changes pushed to GitHub but site shows old content
- GitHub shows commits but website doesn't reflect changes

**Solutions:**

1. **Wait for deployment to complete**
   - GitHub Pages can take 5-20 minutes to deploy
   - Check Actions tab for deployment status: `https://github.com/[username]/[repo]/actions`

2. **Clear browser cache**
   ```
   Windows/Linux: Ctrl + F5
   Mac Chrome: Cmd + Shift + R
   Mac Safari: Cmd + Option + E, then Cmd + R
   ```

3. **Force rebuild**
   ```bash
   # Add empty line to trigger rebuild
   echo " " >> index.html
   git add index.html
   git commit -m "Trigger GitHub Pages rebuild"
   git push origin main
   ```

4. **Check correct URL**
   - Default: `https://[username].github.io/[repository]/`
   - Custom domain: Check CNAME file contents

### 404 Error on GitHub Pages

**Symptoms:**
- Site returns 404 error
- "Site not found" message

**Solutions:**

1. **Verify GitHub Pages is enabled**
   - Go to Settings → Pages
   - Ensure source is set to "Deploy from a branch"
   - Select main branch and / (root) folder

2. **Check index.html exists**
   ```bash
   ls -la | grep index.html
   # Should show index.html file
   ```

3. **Add .nojekyll file**
   ```bash
   touch .nojekyll
   git add .nojekyll
   git commit -m "Add .nojekyll file"
   git push origin main
   ```

---

## Custom Domain Problems

### DNS Configuration Error

**Symptoms:**
- "Both www.domain.com and its alternate name are improperly configured"
- InvalidCNAMEError in GitHub Pages settings

**Solutions:**

1. **Check DNS records at your registrar**

   For subdomain (www.example.com):
   ```
   Type: CNAME
   Host: www
   Value: [username].github.io.
   TTL: 600
   ```

   For apex domain (example.com):
   ```
   Type: A
   Host: @
   Value: 185.199.108.153
          185.199.109.153
          185.199.110.153
          185.199.111.153
   ```

2. **Verify DNS propagation**
   ```bash
   # Check CNAME record
   dig www.yourdomain.com CNAME +short

   # Should return:
   # username.github.io.
   ```

3. **Check for conflicts**
   - Ensure domain is not active on Webflow
   - Check no other hosting service is using the domain
   - Remove any conflicting A or CNAME records

### Webflow Conflict

**Symptoms:**
- Domain shows old Webflow content instead of GitHub Pages
- Source code shows `cdn.prod.website-files.com`

**Solutions:**

1. **Disconnect from Webflow**
   - Log into Webflow
   - Go to Project Settings → Hosting
   - Unpublish or remove custom domain
   - Wait 30 minutes for changes to propagate

2. **Use GitHub Pages URL instead**
   ```
   https://[username].github.io/[repository]/
   ```

3. **Clear Webflow's CDN cache**
   - May need to wait 24-48 hours for full propagation
   - Contact Webflow support if domain remains locked

---

## Display Issues

### Page Shows "Jane Lo" Instead of PortfolioEngine

**Symptoms:**
- Old template content displays
- Wrong index.html file being served

**Solutions:**

1. **Check which index.html is active**
   ```bash
   head -n 10 index.html | grep "<title>"
   # Should show: PortfolioEngine - Professional Portfolio Management Platform
   ```

2. **Ensure correct file naming**
   ```bash
   # PortfolioEngine should be index.html
   # Old template should be index-original.html
   ls -la | grep index
   ```

3. **Verify local changes are committed**
   ```bash
   git status
   # Should show: nothing to commit, working tree clean
   ```

### Charts Not Displaying

**Symptoms:**
- Empty chart areas
- JavaScript errors in console

**Solutions:**

1. **Check JavaScript is enabled**

2. **Verify Chart.js is loading**
   ```html
   <!-- Should be in HTML head or before closing body -->
   <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
   ```

3. **Check browser console for errors**
   ```
   Right-click → Inspect → Console tab
   Look for red error messages
   ```

### Styling Issues

**Symptoms:**
- Page looks unstyled or broken
- Fonts not loading

**Solutions:**

1. **Check CSS file paths**
   ```html
   <!-- Paths should be relative -->
   <link href="css/webflow.css" rel="stylesheet">
   <!-- NOT absolute like /css/webflow.css -->
   ```

2. **Verify files exist**
   ```bash
   ls -la css/
   # Should show all CSS files
   ```

3. **Check font loading**
   - Ensure internet connection for Google Fonts
   - Check browser doesn't block external fonts

---

## Development Issues

### Local Testing Problems

**Symptoms:**
- Site doesn't work when opening HTML files directly
- CORS errors in browser console

**Solutions:**

1. **Use a local server**
   ```bash
   # Python 3
   python3 -m http.server 8000

   # Node.js
   npx http-server

   # Then visit: http://localhost:8000
   ```

2. **Check file paths are relative**
   ```html
   <!-- Good -->
   <link href="css/style.css">

   <!-- Bad for local testing -->
   <link href="/css/style.css">
   ```

### Can't See Changes Locally

**Symptoms:**
- Changes made but browser shows old version

**Solutions:**

1. **Hard refresh browser**
   - Windows/Linux: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

2. **Disable cache in DevTools**
   - Open DevTools (F12)
   - Network tab → Check "Disable cache"

3. **Use incognito/private mode**
   - Bypasses all caching

---

## Git Issues

### Authentication Failed

**Symptoms:**
- Can't push to GitHub
- "fatal: Authentication failed"

**Solutions:**

1. **Use Personal Access Token**
   ```bash
   # Create token at: https://github.com/settings/tokens
   # Use token as password when prompted
   git push origin main
   # Username: your-github-username
   # Password: your-personal-access-token
   ```

2. **Use SSH instead of HTTPS**
   ```bash
   # Change remote URL to SSH
   git remote set-url origin git@github.com:username/repository.git
   ```

3. **Use GitHub Desktop**
   - Download from desktop.github.com
   - Handles authentication automatically

### Merge Conflicts

**Symptoms:**
- Can't push due to conflicts
- "Updates were rejected"

**Solutions:**

1. **Pull latest changes first**
   ```bash
   git pull origin main
   # Resolve any conflicts
   git add .
   git commit -m "Resolved conflicts"
   git push origin main
   ```

2. **Force push (CAUTION: overwrites remote)**
   ```bash
   # Only if you're sure your version is correct
   git push --force origin main
   ```

---

## Quick Fixes

### Emergency Rollback

If something breaks badly:

```bash
# Find last working commit
git log --oneline -10

# Reset to that commit
git reset --hard [commit-hash]

# Force push (CAUTION)
git push --force origin main
```

### Complete Fresh Start

```bash
# Backup current work
cp -r . ../backup-portfolio

# Reset to original
git fetch origin
git reset --hard origin/main

# Or start completely fresh
rm -rf .git
git init
git add .
git commit -m "Fresh start"
git remote add origin https://github.com/username/repository.git
git push --force origin main
```

---

## Getting Help

### Resources
- GitHub Pages Documentation: https://docs.github.com/pages
- Webflow Support: https://university.webflow.com
- Stack Overflow: Search for "GitHub Pages" issues

### Debug Information to Collect
When asking for help, provide:
1. Browser and version
2. Error messages from browser console
3. Output of `git status`
4. Screenshot of GitHub Pages settings
5. Contents of CNAME file (if using custom domain)

### Contact Points
- GitHub Support: https://support.github.com
- GitHub Community Forum: https://github.community
- Repository Issues: Create an issue in your repository

---

## Prevention Tips

1. **Always test locally first**
   ```bash
   python3 -m http.server 8000
   # Visit http://localhost:8000
   ```

2. **Commit frequently with clear messages**
   ```bash
   git add .
   git commit -m "Clear description of changes"
   ```

3. **Check before pushing**
   ```bash
   git status
   git diff
   git log --oneline -5
   ```

4. **Keep backups**
   ```bash
   # Before major changes
   git branch backup-$(date +%Y%m%d)
   ```

5. **Use .gitignore**
   ```
   .DS_Store
   Thumbs.db
   *.log
   node_modules/
   ```

---
*Last Updated: February 27, 2026*
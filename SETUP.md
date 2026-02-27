# PortfolioEngine Setup Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Development Setup](#development-setup)
5. [Production Deployment](#production-deployment)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

### System Requirements
- **Operating System**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 20.04+)
- **Web Server**: Apache 2.4+ or Nginx 1.18+
- **Node.js**: v16.0.0 or higher (for development tools)
- **Git**: v2.30.0 or higher

### Browser Requirements
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Optional Tools
- **Docker**: v20.10+ (for containerized deployment)
- **VS Code**: Latest version (recommended IDE)
- **Postman**: For API testing

## Installation

### Quick Start
```bash
# Clone the repository
git clone https://github.com/blackstone/portfolioengine-website.git
cd portfolioengine-website

# Install dependencies (if using build tools)
npm install

# Start local development server
npm run serve
```

### Manual Installation

#### Step 1: Download Files
1. Download the repository as a ZIP file or clone via Git
2. Extract files to your desired directory

#### Step 2: Web Server Setup

**Apache Configuration:**
```apache
<VirtualHost *:80>
    ServerName portfolioengine.local
    DocumentRoot /var/www/portfolioengine

    <Directory /var/www/portfolioengine>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/portfolioengine-error.log
    CustomLog ${APACHE_LOG_DIR}/portfolioengine-access.log combined
</VirtualHost>
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name portfolioengine.local;
    root /var/www/portfolioengine;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Step 3: File Permissions
```bash
# Set appropriate permissions
chmod -R 755 /var/www/portfolioengine
chown -R www-data:www-data /var/www/portfolioengine
```

## Configuration

### Environment Configuration
Create a `.env` file in the root directory:

```env
# API Configuration
API_BASE_URL=https://api.portfolioengine.com
API_KEY=your-api-key-here
API_VERSION=v1

# Analytics
GA_TRACKING_ID=UA-XXXXXXXXX-X
MIXPANEL_TOKEN=your-mixpanel-token

# Features
ENABLE_THESIS_BASKET=true
ENABLE_RISK_ANALYTICS=true
ENABLE_ML_INSIGHTS=false

# Security
ENABLE_MFA=true
SESSION_TIMEOUT=1800
CORS_ORIGIN=https://portfolioengine.com
```

### JavaScript Configuration
Edit `js/config.js`:

```javascript
const CONFIG = {
    api: {
        baseUrl: process.env.API_BASE_URL || 'https://api.portfolioengine.com',
        timeout: 30000,
        retryAttempts: 3
    },
    features: {
        thesisBasket: process.env.ENABLE_THESIS_BASKET === 'true',
        riskAnalytics: process.env.ENABLE_RISK_ANALYTICS === 'true',
        mlInsights: process.env.ENABLE_ML_INSIGHTS === 'true'
    },
    ui: {
        theme: 'light',
        dateFormat: 'MM/DD/YYYY',
        currency: 'USD',
        language: 'en-US'
    }
};
```

### CSS Customization
Modify theme variables in `css/variables.css`:

```css
:root {
    /* Brand Colors */
    --primary-color: #003366;
    --secondary-color: #0066CC;
    --accent-color: #00A86B;

    /* Typography */
    --font-family-primary: 'Montserrat', sans-serif;
    --font-size-base: 16px;

    /* Layout */
    --container-max-width: 1200px;
    --sidebar-width: 280px;

    /* Spacing */
    --spacing-unit: 8px;
}
```

## Development Setup

### Local Development Server
```bash
# Using Node.js http-server
npm install -g http-server
http-server . -p 8080

# Using Python
python3 -m http.server 8080

# Using PHP
php -S localhost:8080
```

### Development Tools Setup

#### Install Development Dependencies
```bash
npm install --save-dev webpack webpack-cli
npm install --save-dev babel-loader @babel/core @babel/preset-env
npm install --save-dev css-loader style-loader
npm install --save-dev eslint prettier
```

#### Webpack Configuration
Create `webpack.config.js`:

```javascript
const path = require('path');

module.exports = {
    entry: './js/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ],
    },
    devServer: {
        contentBase: '.',
        port: 8080,
        hot: true,
    },
};
```

### Code Quality Tools

#### ESLint Configuration
Create `.eslintrc.json`:

```json
{
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
        "indent": ["error", 4],
        "quotes": ["error", "single"],
        "semi": ["error", "always"]
    }
}
```

#### Prettier Configuration
Create `.prettierrc`:

```json
{
    "singleQuote": true,
    "tabWidth": 4,
    "semi": true,
    "trailingComma": "es5"
}
```

## Production Deployment

### Pre-Deployment Checklist
- [ ] Minify JavaScript and CSS files
- [ ] Optimize images (compress and convert to WebP)
- [ ] Enable HTTPS/SSL certificate
- [ ] Configure CDN for static assets
- [ ] Set up monitoring and analytics
- [ ] Configure backup strategy
- [ ] Review security settings

### Build Process
```bash
# Run production build
npm run build

# Output will be in dist/ directory
# Deploy dist/ contents to production server
```

### Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t portfolioengine-website .
docker run -d -p 80:80 portfolioengine-website
```

### CI/CD Pipeline

#### GitHub Actions Example
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm ci
      - run: npm run build
      - run: npm test
      - name: Deploy to S3
        uses: jakejarvis/s3-sync-action@master
        with:
          args: --acl public-read --follow-symlinks --delete
        env:
          AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          SOURCE_DIR: 'dist'
```

## Testing

### Unit Testing
```bash
# Run unit tests
npm test

# Run with coverage
npm run test:coverage
```

### Integration Testing
```bash
# Run integration tests
npm run test:integration
```

### Performance Testing
```bash
# Run Lighthouse audit
npm run lighthouse

# Run WebPageTest
npm run webpagetest
```

### Browser Testing
Test on multiple browsers using BrowserStack or similar services.

## Troubleshooting

### Common Issues

#### Issue: CSS not loading
**Solution:**
- Check file paths in HTML
- Verify MIME types in server configuration
- Clear browser cache

#### Issue: JavaScript errors
**Solution:**
- Check browser console for specific errors
- Verify API endpoints are accessible
- Check for CORS issues

#### Issue: Slow page load
**Solution:**
- Enable compression (gzip/brotli)
- Optimize images
- Implement lazy loading
- Use CDN for static assets

#### Issue: API connection failed
**Solution:**
- Verify API_BASE_URL in configuration
- Check network connectivity
- Verify API key is valid
- Check CORS settings

### Debug Mode
Enable debug mode for detailed logging:

```javascript
// In js/config.js
const DEBUG_MODE = true;

if (DEBUG_MODE) {
    console.log('Debug mode enabled');
    window.DEBUG = true;
}
```

### Support Channels
- **GitHub Issues**: https://github.com/blackstone/portfolioengine/issues
- **Email Support**: support@portfolioengine.com
- **Documentation**: https://docs.portfolioengine.com

## Maintenance

### Regular Tasks
- **Daily**: Monitor error logs
- **Weekly**: Review performance metrics
- **Monthly**: Security updates and patches
- **Quarterly**: Dependency updates

### Backup Strategy
```bash
# Automated daily backup script
#!/bin/bash
BACKUP_DIR="/backups/portfolioengine"
DATE=$(date +%Y%m%d)
tar -czf $BACKUP_DIR/backup-$DATE.tar.gz /var/www/portfolioengine
find $BACKUP_DIR -name "backup-*.tar.gz" -mtime +30 -delete
```

---
*Last Updated: February 2026*
*Version: 1.2.0*
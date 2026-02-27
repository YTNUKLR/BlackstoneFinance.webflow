# PortfolioEngine Website

## Overview
PortfolioEngine is a sophisticated portfolio management and investment analysis platform designed for financial professionals and investment managers. This website serves as the front-end interface for the PortfolioEngine system, providing intuitive access to portfolio analytics, risk management tools, and investment thesis tracking.

## 🚀 Quick Start Guide

### View the Website Locally
1. **Clone or download the repository**
   ```bash
   git clone https://github.com/YTNUKLR/BlackstoneFinance.webflow.git
   cd BlackstoneFinance.webflow
   ```

2. **Open in browser** (choose one method):
   - **Direct**: Open `index.html` in your browser
   - **With local server** (recommended):
     ```bash
     # Python 3
     python3 -m http.server 8000
     # Then visit: http://localhost:8000

     # OR using Node.js
     npx http-server
     # Then visit: http://localhost:8080
     ```

3. **Explore the site**:
   - Landing page showcases PortfolioEngine features
   - Click "View Demo Dashboard" to see portfolio management
   - Navigate to Thesis Baskets and Analytics pages

### Deploy to GitHub Pages
1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy PortfolioEngine"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Source: Deploy from branch
   - Branch: main, folder: / (root)
   - Save and wait 5-10 minutes

3. **Access your site**:
   ```
   https://[your-username].github.io/[repository-name]/
   ```

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

## Project Description
The PortfolioEngine website is built using modern web technologies to deliver a responsive, professional interface for portfolio management. It integrates with backend services to provide real-time portfolio analytics, thesis tracking, and investment performance monitoring.

## Core Functionality
- **Portfolio Dashboard**: Real-time overview of portfolio performance and holdings
- **Thesis Management**: Track and manage investment theses with basket functionality
- **Risk Analytics**: Comprehensive risk metrics and analysis tools
- **Performance Reporting**: Detailed performance attribution and reporting
- **Client Portal**: Secure access for clients to view their portfolio information

## Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript
- **Framework**: Webflow (exported static site)
- **Styling**: Custom CSS with responsive design
- **JavaScript**: Vanilla JS for interactive components
- **Assets**: Optimized images and icons

## Repository Structure
```
BlackstoneFinance.webflow/
├── index.html              # Main landing page
├── about.html              # About page
├── styleguide.html         # Style guide and component library
├── 404.html                # Custom 404 error page
├── 401.html                # Custom 401 authorization page
├── css/                    # Stylesheets
│   ├── normalize.css       # CSS reset
│   ├── webflow.css         # Webflow base styles
│   └── racetrackviewmap.webflow.css  # Custom styles
├── js/                     # JavaScript files
├── images/                 # Image assets
└── work/                   # Portfolio project pages
    ├── project-1.html
    ├── project-2.html
    ├── project-3.html
    └── project-4.html
```

## Key Features
- **Responsive Design**: Fully responsive layout optimized for desktop, tablet, and mobile devices
- **Portfolio Visualization**: Interactive charts and graphs for portfolio analysis
- **Investment Thesis Tracking**: Comprehensive thesis management with basket creation and monitoring
- **Real-time Updates**: Live data integration for portfolio metrics
- **Secure Authentication**: Client portal with secure login functionality
- **Performance Analytics**: Advanced performance attribution and analysis tools

## Getting Started
Please refer to [SETUP.md](SETUP.md) for detailed installation and configuration instructions.

## 📚 Documentation

### Core Documentation
- [FEATURES.md](FEATURES.md) - Detailed feature documentation
- [SETUP.md](SETUP.md) - Installation and setup guide
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API integration documentation
- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture overview

### Development & Deployment
- [DEPLOYMENT.md](DEPLOYMENT.md) - **GitHub Pages deployment guide**
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - **Common issues and solutions**
- [CHANGELOG.md](CHANGELOG.md) - **Project change history**

### Quick Reference
- **Local Development**: See Quick Start Guide above
- **GitHub Pages Issues**: Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- **Custom Domain Setup**: See [DEPLOYMENT.md](DEPLOYMENT.md#custom-domain-setup)
- **What's New**: See [CHANGELOG.md](CHANGELOG.md)

## Development Workflow
1. **Local Development**: Set up local environment following SETUP.md
2. **Testing**: Run tests before committing changes
3. **Deployment**: Follow deployment guidelines in SETUP.md
4. **Monitoring**: Use integrated analytics to monitor performance

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization
- Optimized image loading with lazy loading
- Minified CSS and JavaScript files
- CDN integration for static assets
- Efficient caching strategies

## Security Considerations
- HTTPS enforced for all connections
- Secure authentication for client portal
- Regular security audits
- Data encryption for sensitive information

## Contributing
Please read our contributing guidelines before submitting pull requests.

## License
Proprietary - Blackstone Finance

## Support
For support inquiries, please contact the PortfolioEngine development team.

## Version History
- v1.0.0 - Initial release with core portfolio management features
- v1.1.0 - Added thesis basket functionality
- v1.2.0 - Enhanced risk analytics and reporting

---
© 2026 Blackstone Finance - PortfolioEngine. All rights reserved.
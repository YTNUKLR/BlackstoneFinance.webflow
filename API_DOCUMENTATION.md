# PortfolioEngine API Documentation

## Table of Contents
1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Base URL & Versioning](#base-url--versioning)
4. [Response Format](#response-format)
5. [Error Handling](#error-handling)
6. [Rate Limiting](#rate-limiting)
7. [API Endpoints](#api-endpoints)
   - [Portfolio Management](#portfolio-management)
   - [Thesis Basket](#thesis-basket)
   - [Positions](#positions)
   - [Transactions](#transactions)
   - [Analytics](#analytics)
   - [Market Data](#market-data)
   - [User Management](#user-management)

## Overview

The PortfolioEngine API provides programmatic access to all portfolio management, analytics, and thesis tracking functionality. The API follows RESTful principles and returns JSON responses.

### Key Features
- RESTful architecture
- JSON request/response format
- OAuth 2.0 authentication
- Real-time WebSocket support for live data
- Comprehensive error messages
- Rate limiting for fair usage

## Authentication

### OAuth 2.0 Flow
```http
POST /api/v1/auth/token
Content-Type: application/json

{
    "grant_type": "client_credentials",
    "client_id": "your_client_id",
    "client_secret": "your_client_secret"
}
```

#### Response
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "Bearer",
    "expires_in": 3600,
    "refresh_token": "def50200..."
}
```

### Using the Access Token
Include the access token in the Authorization header:
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Base URL & Versioning

### Base URL
```
Production: https://api.portfolioengine.com
Staging: https://staging-api.portfolioengine.com
Development: https://dev-api.portfolioengine.com
```

### API Versioning
The API version is included in the URL path:
```
https://api.portfolioengine.com/api/v1/
```

## Response Format

### Successful Response
```json
{
    "status": "success",
    "data": {
        // Response data
    },
    "meta": {
        "timestamp": "2026-02-27T10:30:00Z",
        "request_id": "req_123456789"
    }
}
```

### Paginated Response
```json
{
    "status": "success",
    "data": [...],
    "pagination": {
        "page": 1,
        "per_page": 20,
        "total_pages": 5,
        "total_items": 100
    },
    "meta": {
        "timestamp": "2026-02-27T10:30:00Z"
    }
}
```

## Error Handling

### Error Response Format
```json
{
    "status": "error",
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "Invalid request parameters",
        "details": [
            {
                "field": "portfolio_id",
                "message": "Portfolio ID is required"
            }
        ]
    },
    "meta": {
        "timestamp": "2026-02-27T10:30:00Z",
        "request_id": "req_123456789"
    }
}
```

### HTTP Status Codes
- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `204 No Content` - Request successful, no content to return
- `400 Bad Request` - Invalid request parameters
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Access denied
- `404 Not Found` - Resource not found
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error

## Rate Limiting

### Rate Limit Headers
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1614556800
```

### Rate Limits by Plan
- **Free**: 100 requests/hour
- **Basic**: 1,000 requests/hour
- **Professional**: 10,000 requests/hour
- **Enterprise**: Unlimited

## API Endpoints

### Portfolio Management

#### List Portfolios
```http
GET /api/v1/portfolios
```

**Query Parameters:**
- `page` (integer): Page number
- `per_page` (integer): Items per page
- `sort` (string): Sort field
- `order` (string): Sort order (asc/desc)

**Response:**
```json
{
    "status": "success",
    "data": [
        {
            "id": "port_123",
            "name": "Growth Portfolio",
            "type": "equity",
            "currency": "USD",
            "inception_date": "2020-01-01",
            "aum": 10000000,
            "performance": {
                "ytd": 0.15,
                "1y": 0.22,
                "3y": 0.18,
                "since_inception": 0.20
            }
        }
    ]
}
```

#### Get Portfolio Details
```http
GET /api/v1/portfolios/{portfolio_id}
```

**Response:**
```json
{
    "status": "success",
    "data": {
        "id": "port_123",
        "name": "Growth Portfolio",
        "description": "Long-only equity growth portfolio",
        "type": "equity",
        "currency": "USD",
        "inception_date": "2020-01-01",
        "benchmark": "SPX",
        "aum": 10000000,
        "cash_balance": 500000,
        "positions_count": 25,
        "performance": {
            "ytd": 0.15,
            "1y": 0.22,
            "3y": 0.18,
            "since_inception": 0.20
        },
        "risk_metrics": {
            "volatility": 0.16,
            "sharpe_ratio": 1.35,
            "max_drawdown": -0.12,
            "var_95": -0.025
        }
    }
}
```

#### Create Portfolio
```http
POST /api/v1/portfolios
Content-Type: application/json

{
    "name": "New Growth Portfolio",
    "description": "Technology-focused growth portfolio",
    "type": "equity",
    "currency": "USD",
    "benchmark": "NDX",
    "initial_capital": 1000000
}
```

#### Update Portfolio
```http
PUT /api/v1/portfolios/{portfolio_id}
Content-Type: application/json

{
    "name": "Updated Portfolio Name",
    "description": "Updated description",
    "benchmark": "SPX"
}
```

### Thesis Basket

#### List Thesis Baskets
```http
GET /api/v1/thesis-baskets
```

**Response:**
```json
{
    "status": "success",
    "data": [
        {
            "id": "thesis_456",
            "name": "AI Revolution",
            "description": "Companies leading AI innovation",
            "created_date": "2025-01-15",
            "target_return": 0.25,
            "time_horizon": "3Y",
            "status": "active",
            "positions_count": 8,
            "current_weight": 0.15,
            "performance": {
                "absolute": 0.32,
                "relative": 0.12
            }
        }
    ]
}
```

#### Create Thesis Basket
```http
POST /api/v1/thesis-baskets
Content-Type: application/json

{
    "name": "Clean Energy Transition",
    "description": "Companies enabling the transition to clean energy",
    "investment_thesis": "Long-term structural shift to renewable energy...",
    "target_return": 0.30,
    "time_horizon": "5Y",
    "risk_level": "medium",
    "positions": [
        {
            "symbol": "TSLA",
            "weight": 0.20,
            "rationale": "EV market leader"
        },
        {
            "symbol": "ENPH",
            "weight": 0.15,
            "rationale": "Solar technology innovation"
        }
    ]
}
```

#### Get Thesis Basket Details
```http
GET /api/v1/thesis-baskets/{thesis_id}
```

#### Update Thesis Basket
```http
PUT /api/v1/thesis-baskets/{thesis_id}
Content-Type: application/json

{
    "status": "under_review",
    "notes": "Reviewing position weights after Q1 earnings"
}
```

#### Rebalance Thesis Basket
```http
POST /api/v1/thesis-baskets/{thesis_id}/rebalance
Content-Type: application/json

{
    "rebalance_type": "target_weights",
    "execute_trades": false
}
```

### Positions

#### Get Portfolio Positions
```http
GET /api/v1/portfolios/{portfolio_id}/positions
```

**Query Parameters:**
- `asset_class` (string): Filter by asset class
- `sector` (string): Filter by sector
- `include_closed` (boolean): Include closed positions

**Response:**
```json
{
    "status": "success",
    "data": [
        {
            "id": "pos_789",
            "symbol": "AAPL",
            "name": "Apple Inc.",
            "asset_class": "equity",
            "sector": "technology",
            "quantity": 1000,
            "avg_cost": 150.25,
            "current_price": 175.50,
            "market_value": 175500,
            "unrealized_pnl": 25250,
            "unrealized_pnl_pct": 0.168,
            "weight": 0.035
        }
    ]
}
```

#### Add Position
```http
POST /api/v1/portfolios/{portfolio_id}/positions
Content-Type: application/json

{
    "symbol": "MSFT",
    "quantity": 500,
    "price": 380.50,
    "trade_date": "2026-02-27",
    "trade_type": "buy"
}
```

### Transactions

#### Get Transactions
```http
GET /api/v1/portfolios/{portfolio_id}/transactions
```

**Query Parameters:**
- `start_date` (date): Start date filter
- `end_date` (date): End date filter
- `type` (string): Transaction type filter
- `symbol` (string): Symbol filter

**Response:**
```json
{
    "status": "success",
    "data": [
        {
            "id": "txn_012",
            "date": "2026-02-27",
            "type": "buy",
            "symbol": "GOOGL",
            "quantity": 100,
            "price": 2800.00,
            "commission": 0,
            "total_value": 280000,
            "notes": "Adding to position on weakness"
        }
    ]
}
```

#### Create Transaction
```http
POST /api/v1/portfolios/{portfolio_id}/transactions
Content-Type: application/json

{
    "type": "sell",
    "symbol": "NVDA",
    "quantity": 200,
    "price": 850.00,
    "date": "2026-02-27",
    "notes": "Taking profits"
}
```

### Analytics

#### Portfolio Performance
```http
GET /api/v1/portfolios/{portfolio_id}/performance
```

**Query Parameters:**
- `period` (string): Time period (1D, 1W, 1M, 3M, 6M, YTD, 1Y, 3Y, 5Y, ALL)
- `benchmark` (string): Benchmark symbol for comparison

**Response:**
```json
{
    "status": "success",
    "data": {
        "period": "YTD",
        "portfolio_return": 0.152,
        "benchmark_return": 0.085,
        "excess_return": 0.067,
        "volatility": 0.165,
        "sharpe_ratio": 1.42,
        "max_drawdown": -0.08,
        "win_rate": 0.65,
        "best_performer": {
            "symbol": "NVDA",
            "return": 0.85
        },
        "worst_performer": {
            "symbol": "PYPL",
            "return": -0.22
        }
    }
}
```

#### Risk Analysis
```http
GET /api/v1/portfolios/{portfolio_id}/risk-analysis
```

**Response:**
```json
{
    "status": "success",
    "data": {
        "var_95": -0.025,
        "var_99": -0.035,
        "cvar_95": -0.032,
        "beta": 1.15,
        "correlation_matrix": {...},
        "sector_concentration": {...},
        "stress_scenarios": [
            {
                "scenario": "Market Crash -20%",
                "portfolio_impact": -0.23
            }
        ]
    }
}
```

#### Attribution Analysis
```http
GET /api/v1/portfolios/{portfolio_id}/attribution
```

**Query Parameters:**
- `start_date` (date): Analysis start date
- `end_date` (date): Analysis end date
- `level` (string): Attribution level (security/sector/factor)

### Market Data

#### Get Quote
```http
GET /api/v1/market-data/quote/{symbol}
```

**Response:**
```json
{
    "status": "success",
    "data": {
        "symbol": "AAPL",
        "price": 175.50,
        "change": 2.35,
        "change_pct": 0.0136,
        "volume": 58234000,
        "market_cap": 2750000000000,
        "pe_ratio": 28.5,
        "dividend_yield": 0.0044,
        "52w_high": 182.50,
        "52w_low": 142.00
    }
}
```

#### Historical Prices
```http
GET /api/v1/market-data/historical/{symbol}
```

**Query Parameters:**
- `start_date` (date): Start date
- `end_date` (date): End date
- `interval` (string): Data interval (1d, 1w, 1m)

### User Management

#### Get User Profile
```http
GET /api/v1/users/profile
```

#### Update User Preferences
```http
PUT /api/v1/users/preferences
Content-Type: application/json

{
    "theme": "dark",
    "currency": "USD",
    "date_format": "MM/DD/YYYY",
    "notifications": {
        "email": true,
        "push": false
    }
}
```

## WebSocket API

### Connection
```javascript
const ws = new WebSocket('wss://api.portfolioengine.com/ws');

ws.onopen = () => {
    ws.send(JSON.stringify({
        type: 'auth',
        token: 'your_access_token'
    }));
};
```

### Subscribe to Real-time Data
```javascript
// Subscribe to portfolio updates
ws.send(JSON.stringify({
    type: 'subscribe',
    channel: 'portfolio',
    portfolio_id: 'port_123'
}));

// Subscribe to market data
ws.send(JSON.stringify({
    type: 'subscribe',
    channel: 'market_data',
    symbols: ['AAPL', 'GOOGL', 'MSFT']
}));
```

### Message Format
```json
{
    "type": "update",
    "channel": "portfolio",
    "data": {
        "portfolio_id": "port_123",
        "market_value": 10250000,
        "daily_pnl": 15000,
        "timestamp": "2026-02-27T15:30:00Z"
    }
}
```

## SDKs and Libraries

### JavaScript/TypeScript
```bash
npm install @portfolioengine/api-client
```

```javascript
import { PortfolioEngineClient } from '@portfolioengine/api-client';

const client = new PortfolioEngineClient({
    apiKey: 'your_api_key',
    environment: 'production'
});

// Get portfolio
const portfolio = await client.portfolios.get('port_123');
```

### Python
```bash
pip install portfolioengine-api
```

```python
from portfolioengine import Client

client = Client(api_key='your_api_key')

# Get portfolio
portfolio = client.portfolios.get('port_123')
```

## Testing

### Sandbox Environment
Use the sandbox environment for testing:
```
Base URL: https://sandbox-api.portfolioengine.com
```

### Test Credentials
```json
{
    "client_id": "test_client_id",
    "client_secret": "test_secret",
    "test_portfolio_id": "test_port_001"
}
```

---
*Last Updated: February 2026*
*API Version: v1.2.0*
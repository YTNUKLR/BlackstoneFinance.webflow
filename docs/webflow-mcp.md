# Webflow MCP Tool Patterns & Gotchas

## Two Tool Sets
- `mcp__claude_ai_Webflow__*` — Has broader API scopes (sites, pages, Designer). **Use this set.**
- `mcp__webflow__*` — Limited scopes (missing `pages:read`, `cms:read`). Mostly unusable for this project.

## Designer Connection Requirements
1. User must open Designer via the app URL:
   `https://racetrackviewmap.design.webflow.com?app=dc8209c65e3ec02254d15275ca056539c89f6d15741893a0adf29ad6f381eb99`
2. Press **E** in Designer to open Apps panel, launch **"Webflow MCP Bridge App"**
3. Paste `http://localhost:1338` if prompted for connection URL
4. **Designer tab MUST be active and in foreground** — Chrome suspends background tabs
5. Recommend: `chrome://settings/performance` → add `webflow.com` to "Always keep active"

## Text Updates
- **Target String child elements**, not Block parents
- Block elements return "Element does not support text setting"
- String elements have `textContent` field and accept `set_text`
- Element IDs use format: `{"component": "<pageId>", "element": "<elementId>"}`

## Batching
- **2-3 actions per call** is safe. 8+ actions causes timeouts.
- Style updates: 1-2 styles per call is reliable
- Text updates: 2 set_text actions per call works well

## Rate Limits
- **Publish API**: Very strict rate limit (429). Multiple retries even after 60s failed.
  - Workaround: User publishes manually from Designer (Publish button, top right)
- General API calls: ~1 per second is fine for data operations

## Data API vs Designer API
| Capability | Data API (no Designer needed) | Designer API (needs Designer open) |
|---|---|---|
| List sites/pages | Yes | N/A |
| Update page SEO/meta | Yes | N/A |
| Get page content nodes | Yes | N/A |
| Update primary locale text | **No** (secondary locales only) | **Yes** (set_text on elements) |
| Create/modify elements | No | Yes |
| Update styles | No | Yes |
| Publish | Yes (but rate limited) | Manual button |
| Snapshot/preview | No | Yes |

## Style Update Tips
- Use longhand CSS properties only (margin-top, not margin)
- Colors: hex (#C9A96E) or rgba (rgba(201, 169, 110, 0.2))
- Pseudo states: separate update_style call with `pseudo` param
- Breakpoints: separate update_style call with `breakpoint_id` param

## Components
- Navigation, Contact, Footer are ComponentInstance elements
- Cannot directly edit text inside components from page context
- Need to edit the component definition itself (not yet attempted)

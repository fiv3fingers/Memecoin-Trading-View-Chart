# TradingView Chart — Memecoin Real-Time Price Visualization

> Embed a fully interactive **TradingView Chart** into any web application to display live memecoin price data. This project ships a complete, modular stack — a backend data-service and a frontend chart renderer — purpose-built for tokens that trade on decentralised exchanges.

[![TypeScript](https://img.shields.io/badge/TypeScript-94%25-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![HTML / CSS](https://img.shields.io/badge/HTML%20%2F%20CSS-5%25-E34C26?style=flat-square)](https://developer.mozilla.org)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![Eclipse](https://img.shields.io/badge/chain-Eclipse%20Mainnet-6C63FF?style=flat-square)](https://www.eclipse.xyz/)

---

## What Is This Project?

Many memecoins trade exclusively on decentralised exchanges and therefore have **no native TradingView symbol**. This repository solves that gap: it fetches real-time OHLCV and price data through a lightweight backend API, then feeds that data into the TradingView charting library so the chart renders exactly like any listed asset on the TradingView platform.

The initial implementation is wired to the **LAIKA** token on **Eclipse Mainnet** (an SVM-powered Ethereum Layer 2). Swapping it for a different token or chain requires only a single environment variable change — no code edits.

---

## Key Features

- **Interactive TradingView Chart integration** — renders candlestick / OHLCV charts using the official TradingView charting library directly in the browser.
- **Real-time price updates** — the backend polls live on-chain price data and streams it to the frontend for continuous chart refreshes.
- **Historical data visualisation** — past candles are fetched and cached in MongoDB, so the chart loads with a full price history on first render.
- **Decentralised-exchange data source** — price data is sourced via the DexScreener API, which aggregates liquidity-pool feeds across 80+ chains with no API key required for basic usage.
- **Eclipse Mainnet support** — connects to the Eclipse SVM Layer 2 via a configurable RPC endpoint; switching to any Solana-compatible chain is a one-line `.env` change.
- **Modular architecture** — frontend and backend are fully decoupled. The chart UI can be embedded as a standalone component, and the data API can be consumed by any client.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Language | TypeScript (94 %), HTML, CSS, JavaScript |
| Chart library | TradingView Advanced Charts (charting library) |
| Price data | DexScreener API |
| Blockchain RPC | Eclipse Mainnet (SVM / Solana-compatible) |
| Data store | MongoDB (historical candles & cache) |
| Runtime | Node.js |

---

## Project Structure

```
Memecoin-Trading-View-Chart/
├── Backend/            # Express-style API — fetches & caches token price data
├── Frontend/           # TradingView chart renderer (HTML + TS)
└── README.md
```

**Backend** is responsible for two jobs: pulling the latest price ticks from Eclipse via RPC and from DexScreener via REST, then persisting candle data in MongoDB so the frontend can request both live and historical bars in a single request.

**Frontend** mounts the TradingView chart widget, connects it to the Backend's data endpoint as its datafeed, and handles all chart-rendering configuration (theme, interval, symbol display name, etc.).

---

## Prerequisites

- **Node.js** ≥ 18 (LTS recommended)
- **npm** or **yarn**
- A running **MongoDB** instance (local or cloud — e.g. MongoDB Atlas)
- An Eclipse Mainnet RPC endpoint (a public one works for development)

---

## Installation & Usage

### 1. Clone the repository

```bash
git clone https://github.com/fiv3fingers/Memecoin-Trading-View-Chart.git
cd Memecoin-Trading-View-Chart
```

### 2. Start the Backend

```bash
cd Backend
npm install
npm run dev
```

The server will start and begin polling Eclipse RPC + DexScreener for LAIKA price data, writing candles to your MongoDB instance.

### 3. Start the Frontend

```bash
cd ../Frontend
npm install
npm run start
```

Open the URL printed in the terminal. You should see a live TradingView chart populated with LAIKA price action.

---

## Environment Variables

Both services are configured through a single `.env` file placed in the **Backend** directory. Copy the example and fill in your values:

```bash
cp .env.sample .env
```

| Variable | Required | Description |
|---|---|---|
| `ECLIPSE_MAIN_RPC` | ✅ | RPC endpoint for Eclipse Mainnet. Used to query on-chain token state. |
| `NET` | ✅ | Network selector. Set to `mainnet` for live data or `devnet` for a test environment. |
| `LAIKA_TOKEN_ADDRESS` | ✅ | On-chain mint address of the token to chart. Default: `LaihKXA47apnS599tyEyasY2REfEzBNe4heunANhsMx` (LAIKA). |
| `MONGODB_URI` | ✅ | MongoDB connection string. Stores historical candle data and API cache. |

> **Security:** Never commit your `.env` file to version control. The included `.gitignore` already excludes it.

### Switching Tokens

To chart a different memecoin, update exactly two values:

1. `LAIKA_TOKEN_ADDRESS` → paste the new token's mint address.
2. `ECLIPSE_MAIN_RPC` → point to the RPC of the chain the token lives on (any Solana-compatible RPC works).

No code changes required.

---

## Example Use Cases

| Use Case | How This Project Helps |
|---|---|
| **Memecoin dashboard** | Embed the TradingView chart component inside a larger portfolio or analytics page. The backend handles all data fetching transparently. |
| **Token launch page** | Display a live price chart on a project's marketing site within minutes of the token going live on a DEX. |
| **Trading bot UI** | Pair the real-time chart with your own buy/sell controls; the Backend API already exposes the latest price tick via its REST endpoint. |
| **DeFi analytics** | Combine historical candle data (stored in MongoDB) with on-chain metrics for a research or analysis dashboard. |

---

## Demo / Screenshots

*Screenshots and a hosted demo link can be added here once a deployment is available.*

```
┌─────────────────────────────────────────────────┐
│  [ LAIKA / USD ]   1D  ▼                        │
│                                                 │
│        ╱╲        ╱╲                             │
│       ╱  ╲      ╱  ╲     ╱╲                    │
│      ╱    ╲    ╱    ╲   ╱  ╲                   │
│  ───╱──────╲──╱──────╲─╱────╲───────           │
│    ╱        ╲╱        ╲╱     ╲                  │
│                                                 │
│  Volume  ██████░░░░░░███████░░░░░░░░░░          │
└─────────────────────────────────────────────────┘
         ↑ TradingView candlestick chart
```

---

## Contributing

Contributions are welcome. If you plan to submit a pull request, please open an issue first to discuss the change. Follow the existing code style (TypeScript, `.env`-driven config) and keep frontend and backend concerns separate.

---

## Contact

Questions or feature requests? Reach out on [Telegram](https://t.me/WebFiveFingers).

---

## References

- [TradingView Advanced Charts — Charting Library Docs](https://www.tradingview.com/charting-library-docs/)
- [TradingView Widget Embed Guide](https://www.tradingview.com/widget-docs/widgets/charts/advanced-chart/)
- [DexScreener API Reference](https://docs.dexscreener.com/api/reference)
- [Eclipse Mainnet — Developer Docs](https://docs.eclipse.xyz/)

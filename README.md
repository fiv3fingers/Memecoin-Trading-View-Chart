# LAIKA Token TradingView Chart

This repository provides a TradingView chart integration for the LAIKA token, including both frontend and backend scripts. It allows developers and traders to visualize LAIKA token price movements and market data in real time.

## 🚀 Features

- 📊 Interactive TradingView chart for LAIKA token

- 🔗 Backend service to fetch token data (e.g., from Dexscreener API or similar source)

- 🌐 Frontend integration for easy embedding in websites or dashboards

- ⚡ Real-time price updates and historical data visualization

- 🛠️ Modular structure: frontend and backend are separated for flexibility

## 📂 Project Structure
```
.
├── frontend/     # React/JS/HTML code to render TradingView chart
├── backend/      # API service to fetch token data (e.g., from Dexscreener)
├── README.md     # Documentation
```

## ⚙️ Installation

1. Clone the repository
```
git clone https://github.com/fiv3fingers/Memecoin-Trading-View-Chart.git
cd Memecoin-Trading-View-Chart
```

2. Backend setup
```
cd backend
npm install
npm run dev
```

3. Frontend setup
```
cd frontend
npm install
npm run start
```

## 🔑 Environment Variables
```
ECLIPSE_MAIN_RPC=
NET=mainnet
LAIKA_TOKEN_ADDRESS=LaihKXA47apnS599tyEyasY2REfEzBNe4heunANhsMx
MONGODB_URI=
```

### 📖 Variable Descriptions
`SOLANA_MAIN_RPC`: The primary RPC endpoint for connecting to Eclipse mainnet.

`NET`: Defines which network the backend should connect to. Accepted values: mainnet → production (live LAIKA token data) devnet → testing environment

`LAIKA_TOKEN_ADDRESS`: The on-chain address of the LAIKA token.

`MONGODB_URI`: MongoDB connection string for storing historical trading data, chart candles, and API cache. Make sure to replace with your own credentials if deploying.

## Contact
If you need any help, you can ping me on [Telegram](https://t.me/idioRusty)

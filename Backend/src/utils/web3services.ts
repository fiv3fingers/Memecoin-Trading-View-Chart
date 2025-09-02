import { PublicKey, TransactionResponse } from "@solana/web3.js"
import { Market, Network } from "@invariant-labs/sdk-eclipse";
import { connection, laikaTokenAddy, LAMPORTS_PER_ETHER } from "../config/config"
import TVModel from "../models/ChartModel"


export const getNotification = async (addy: string) => {
    const pubkey = new PublicKey(addy)
    const logID = connection.onLogs(pubkey, async (logs, context) => {
        const signature = logs.signature
        const decode = await decodeTx(signature)
        const logMessages = decode?.meta?.logMessages || []
        const hasInvariantSwap = logMessages.some(log => log.includes("Program log: INVARIANT: SWAP"))
        if (!hasInvariantSwap) return null
        const buyerWalletAddy = decode?.transaction?.message?.accountKeys[0].toString()
        const timestamp = decode?.blockTime
        const tradeAmount = calculateLaikaTradeAmount(decode!, buyerWalletAddy!)
        const tokenInfo = await getCurrentTokenPriceAndMCap();
        const newTrading = new TVModel({
            time: new Date(Number(timestamp) * 1000),
            amount: tradeAmount > 0 ? tradeAmount : -tradeAmount,
            price: tokenInfo?.priceUsd,
            type: tradeAmount > 0 ? 'buy' : 'sell',
            trader: buyerWalletAddy
        })
        await newTrading.save();
    })
}

export const calculateLaikaTradeAmount = (decode: TransactionResponse, buyerWalletAddy: string) => {
    let oldBalance = 0
    let newBalance = 0

    decode.meta?.preTokenBalances?.forEach(preTokenBalance => {
        if (preTokenBalance.mint === laikaTokenAddy && preTokenBalance.owner === buyerWalletAddy) {
            oldBalance = preTokenBalance.uiTokenAmount.uiAmount || 0
        }
    })

    decode.meta?.postTokenBalances?.forEach(postTokenBalance => {
        if (postTokenBalance.mint === laikaTokenAddy && postTokenBalance.owner === buyerWalletAddy) {
            newBalance = postTokenBalance.uiTokenAmount.uiAmount || 0
        }
    })

    return newBalance - oldBalance
}

export const decodeTx = async (sig: string): Promise<TransactionResponse | null> => {
    try {
        return await connection.getTransaction(sig)
    } catch (error) {
        console.error("Error fetching transaction:", error)
        return null
    }
}

export const getCurrentTokenPriceAndMCap = async (): Promise<{
    priceBase: string;
    priceUsd: string;
    marketCapBase: string;
    marketCapUsd: string;
}> => {
    const market = await Market.buildWithoutProvider(Network.MAIN, connection)
    let laika = await market.getCurrentTokenStats(laikaTokenAddy)
    while ('error' in laika) {
        laika = await market.getCurrentTokenStats(laikaTokenAddy)
    }
    return laika
}
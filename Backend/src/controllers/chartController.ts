import { Request, Response } from 'express';
import TVModel from '../models/ChartModel';

interface PriceFeed {
    time: Date,
    price: number,
    amount: number,
    type: string,
    trader: string
}

interface CandlePrice {
    open: number,
    high: number,
    low: number,
    close: number,
    time: number,
};

const generateExtraCandles = (lastCandle: CandlePrice, numberOfCandles: number, candlePeriod: number) => {
    const extraCandles = [];
    for (let i = 1; i <= numberOfCandles; i++) {
        const newTime = lastCandle.time - (i * candlePeriod);
        extraCandles.unshift({
            open: lastCandle.low,
            high: lastCandle.low,
            low: lastCandle.low,
            close: lastCandle.low,
            time: newTime,
        });
    }
    return extraCandles;
};

export const getChartData = async (req: Request, res: Response) => {
    try {
        const range = parseInt(req.params.range, 10);
        const countBack = parseInt(req.params.countBack, 10);

        // Fetch price histories from the database
        const priceFeeds: PriceFeed[] = await TVModel.find();
        // const priceFeeds: priceFeedInfo[] | undefined = await Coin.findOne({ token })
        //     .then(async (coin) => {
        //         if (!coin) return undefined;
        //         const data = await TradeStatus.findOne({ coinId: coin._id }, { 'record.price': 1, 'record.time': 1 });
        //         return data ? (data.record as priceFeedInfo[]) : undefined;
        //     });

        if (!priceFeeds) {
            res.status(200).send({ data: [] });
            return;
        }

        const priceHistory = priceFeeds.map((feed) => {
            const price = feed.price;
            // Ensure feed.time exists
            return {
                price: price,
                ts: feed.time.getTime() / 1000,
            };
        }).sort((a, b) => a.ts - b.ts);

        if (!priceHistory.length) {
            res.status(200).send({ data: [] });
            return;
        }

        let candlePeriod = 1440;

        // Calculate candle prices
        let cdStart = Math.floor(priceHistory[0].ts / candlePeriod) * candlePeriod;
        let cdEnd = Math.floor(priceHistory[priceHistory.length - 1].ts / candlePeriod) * candlePeriod;

        let cdFeeds: CandlePrice[] = [];
        let pIndex = 0;

        for (let curCdStart = cdStart; curCdStart <= cdEnd; curCdStart += candlePeriod) {
            let st = priceHistory[pIndex].price;
            let hi = st;
            let lo = st;
            let en = st;
            let prevIndex = pIndex;

            while (pIndex < priceHistory.length) {
                const currentPrice = priceHistory[pIndex].price;
                if (hi < currentPrice) hi = currentPrice;
                if (lo > currentPrice) lo = currentPrice;
                en = currentPrice;
                if (priceHistory[pIndex].ts >= curCdStart + candlePeriod) break;
                pIndex++;
            }

            if (prevIndex !== pIndex) {
                cdFeeds.push({
                    open: st,
                    high: hi,
                    low: lo,
                    close: en,
                    time: curCdStart,
                });
            }
        }
        const extraCandlesNeeded = countBack - cdFeeds.length;
        if (extraCandlesNeeded > 0) {
            console.log(`[getCandleData]: Generating ${extraCandlesNeeded} extra candle(s)`);
            const lastCandle = cdFeeds[0];
            const extraCandles = generateExtraCandles(lastCandle, extraCandlesNeeded, candlePeriod);
            cdFeeds = [...extraCandles, ...cdFeeds];
        }
        console.log("cdFeeds----->", cdFeeds.length)

        res.status(200).send({ data: cdFeeds });
    } catch (error) {
        console.error('Error fetching chart data:', error);
        res.status(500).json({ error: 'Failed to fetch chart data' });
    }
};

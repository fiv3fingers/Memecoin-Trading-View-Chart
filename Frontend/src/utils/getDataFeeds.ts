import { Bar, DatafeedConfiguration, IBasicDataFeed, LibrarySymbolInfo, PeriodParams, ResolutionString } from "../libraries/charting_library/charting_library";
import { getChartTable } from "./getChartTable";

const configurationData: DatafeedConfiguration = {
    // Represents the resolutions for bars supported by your datafeed
    supported_resolutions: [
        "60",
        "1440",
    ] as ResolutionString[],
};

const lastBarsCache = new Map<string, Bar>();

const getDataFeed = (name: string): IBasicDataFeed => {
    let initialLoadComplete = false;
    return {
        onReady: (callback) => {
            console.log("[onReady]: Method call");
            setTimeout(() => callback(configurationData));
        },

        searchSymbols: () => {
            console.log("[searchSymbols]: Method call");
        },

        resolveSymbol: async (
            symbolName,
            onSymbolResolvedCallback,
            _onResolveErrorCallback,
            _extension,
        ) => {
            console.log("[resolveSymbol]: Method call", symbolName);

            // Symbol information object
            const symbolInfo: LibrarySymbolInfo = {
                name: name,
                description: name,
                type: "crypto",
                session: "24x7",
                timezone: "Etc/UTC",
                minmov: 1,
                pricescale: 1000000000,
                exchange: "",
                has_intraday: true,
                visible_plots_set: 'ohlc',
                has_weekly_and_monthly: true,
                supported_resolutions: configurationData.supported_resolutions,
                volume_precision: 2,
                data_status: "streaming",
                format: "price",
                listed_exchange: "",
            };

            console.log("[resolveSymbol]: Symbol resolved", symbolName);
            setTimeout(() => onSymbolResolvedCallback(symbolInfo));
        },

        getBars: async (
            symbolInfo,
            resolution,
            periodParams,
            onHistoryCallback,
            onErrorCallback
        ) => {
            const { firstDataRequest, countBack } = periodParams
            try {
                const chartTable = await getChartTable({
                    range: +resolution,
                    countBack
                });
                console.log("chartTable------>", chartTable)
                if (!chartTable) {
                    onHistoryCallback([], { noData: true });
                    return;
                }

                let bars = chartTable.data.map((bar: any) => ({
                    ...bar,
                    time: bar.time * 1000, // Convert from seconds to milliseconds
                }));

                if (firstDataRequest) {
                    lastBarsCache.set(symbolInfo.name, { ...bars[bars.length - 1] });
                }

                console.log(`[getBars]: returned ${bars.length} bar(s)`);
                onHistoryCallback(bars, { noData: false });

                if (!initialLoadComplete) {
                    initialLoadComplete = true;
                }
                return;
            } catch (error: any) {
                console.log("[getBars]: Get error", error);
                onErrorCallback(error);
            }
        },

        subscribeBars: (
            symbolInfo,
            resolution,
            onRealtimeCallback,
            subscriberUID,
            onResetCacheNeededCallback,
        ) => { },

        unsubscribeBars: (subscriberUID) => { },
    }
}

export default getDataFeed;
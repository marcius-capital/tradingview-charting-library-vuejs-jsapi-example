/**
 * Creating a mock of the datafeed
 * Tutorial: https://github.com/tradingview/charting-library-tutorial/blob/master/documentation/integration.md
 * Full implementation: https://github.com/tradingview/charting_library/wiki/JS-Api#how-to-start
 * Tutorial implementation: https://github.com/tradingview/charting-library-tutorial/blob/master/documentation/datafeed-implementation.md
 * Stream implementation: https://github.com/tradingview/charting-library-tutorial/blob/master/documentation/streaming-implementation.md
 */

import { getExchangeServerTime, getSymbols, getKlines, subscribeKline, unsubscribeKline, checkInterval } from './helpers'

const configurationData = {
	supports_marks: false,
	supports_timescale_marks: false,
	supports_time: true,
	supported_resolutions: [
		'1', '3', '5', '15', '30', '60', '120', '240', '1D', '3D', '1W', '1M'
	]
};

export default {
	// get a configuration of your datafeed (e.g. supported resolutions, exchanges and so on)
	onReady: (callback) => {
		console.log('[onReady]: Method call');
		setTimeout(() => callback(configurationData)) // callback must be called asynchronously.
	},
	/*
	 // NO need if not using search
	searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
		console.log('[searchSymbols]: Method call');
	},
	 */
	// retrieve information about a specific symbol (exchange, price scale, full symbol etc.)
	resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
		console.log('[resolveSymbol]: Method call', symbolName);

		const comps = symbolName.split(':')
		symbolName = (comps.length > 1 ? comps[1] : symbolName).toUpperCase()


		// need for pricescale()
		function pricescale(symbol) {
			for (let filter of symbol.filters) {
				if (filter.filterType == 'PRICE_FILTER') {
					return Math.round(1 / parseFloat(filter.tickSize))
				}
			}
			return 1
		}

		const symbolInfo = (symbol) => ({
			name: symbol.symbol,
			description: symbol.baseAsset + ' / ' + symbol.quoteAsset,
			ticker: symbol.symbol,
			//exchange: 'Binance',
			//listed_exchange: 'Binance',
			//type: 'crypto',
			session: '24x7',
			minmov: 1,
			pricescale: pricescale(symbol), // 	or 100
			timezone: 'UTC',
			has_intraday: true,
			has_daily: true,
			has_weekly_and_monthly: true,
			currency_code: symbol.quoteAsset
		})

		// Get symbols
		getSymbols().then(symbols => {
			const symbol = symbols.find(i => i.symbol == symbolName)
			return symbol ? onSymbolResolvedCallback(symbolInfo(symbol)) : onResolveErrorCallback('[resolveSymbol]: symbol not found')
		})

	},
	// get historical data for the symbol
	getBars: async (symbolInfo, interval, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) => {
		console.log('[getBars] Method call', symbolInfo, interval)
		console.log('[getBars] First request', firstDataRequest)

		if (!checkInterval(interval)) {
			return onErrorCallback('[getBars] Invalid interval')
		}

		const klines = await getKlines({ symbol: symbolInfo.name, interval, from, to })
		if (klines.length > 0) {
			return onHistoryCallback(klines)
		}

		onErrorCallback('Klines data error')

	},
	// subscription to real-time updates
	subscribeBars: (symbolInfo, interval, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
		console.log('[subscribeBars]: Method call with subscribeUID:', subscribeUID);

		subscribeKline({ symbol: symbolInfo.name, interval, uniqueID: subscribeUID, }, cb => onRealtimeCallback(cb))
	},
	unsubscribeBars: (subscriberUID) => {
		console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
		unsubscribeKline(subscriberUID)
	},
	getServerTime: (callback) => {
		getExchangeServerTime().then(time => {
			callback(Math.floor(time / 1000))
		}).catch(err => {
			console.error(err)
		})
	}
};

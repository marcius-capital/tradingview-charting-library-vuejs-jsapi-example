import api from '@marcius-capital/binance-api'

const proxy = {
	host: 'http://localhost',
	port: '3000'
}

const intervals = {
	'1': '1m',
	'3': '3m',
	'5': '5m',
	'15': '15m',
	'30': '30m',
	'60': '1h',
	'120': '2h',
	'240': '4h',
	'360': '6h',
	'480': '8h',
	'720': '12h',
	'D': '1d',
	'1D': '1d',
	'3D': '3d',
	'W': '1w',
	'1W': '1w',
	'M': '1M',
	'1M': '1M',
}

export const getExchangeServerTime = () => {
	return api.rest.time({ proxy }).then(res => res.serverTime)
}

export const getSymbols = () => {
	return api.rest.exchangeInfo({ proxy }).then(res => res.symbols)
}

const formatingKline = ({ openTime, open, high, low, close, volume }) => {
	return {
		time: openTime / 1000,
		open,
		high,
		low,
		close,
		volume,
	}
}

export const getKlines = ({ symbol, interval, from, to }) => {
	interval = intervals[interval] // set interval
	return api.rest.klines({ symbol: symbol.toUpperCase(), interval, proxy })
		.then(res => {
			const arr = res.map(i => formatingKline(i))
			return arr
		})
}

export const subscribeKline = ({ symbol, interval, uniqueID }, callback) => {
	interval = intervals[interval] // set interval
	return api.stream.kline({ symbol, interval, uniqueID }, res => {
		const candle = formatingKline(res.kline)
		callback(candle)
	})
}

export const unsubscribeKline = (uniqueID) => {
	return api.stream.close.kline({ uniqueID })
}

export const checkInterval = (interval) => !!intervals[interval]

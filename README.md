# TradingView JS API Binance

Ready-made example of integration with updating data via WebSocket. Vue.js and JS API integration example for Binance exchange

**NOTE**: Binance does not allow you to request data directly from browser, so a proxy is required. For this, routing through the server is used.

![tradingview-charting-library-vuejs-jsapi-example](/docs/chart.jpg)

## How to start

1. Install dependences for client and server side

```node
$ cd client && npm install // cd client && yarn
$ cd server && npm install // cd server && yarn
```

2. Copy `charting_library` folder from https://github.com/tradingview/charting_library/ to `/public` folder. The earliest supported version of the Charting Library is 1.15. If you get 404 then you need to [request an access to this repository](https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/).

3. Run both client and server

```node
$ cd client && npm run serve
$ cd server && npm run dev
```

4. Build for production

```node
$ cd client && npm run build
```

## What is Charting Library

Charting Library is a standalone solution for displaying charts. This free, downloadable library is hosted on your servers and is connected to your data feed to be used in your website or app. [Learn more and download](https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/).

## What is Vue.js

Vue is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, and is easy to pick up and integrate with other libraries or existing projects.

## Axios proxy issue

Axios - a module that allows you to make REST requests. Its build does not allow the use of proxy on client-side, only on the nodejs server. Our [binance-api](https://github.com/marcius-capital/binance-api) module uses a [wrapper](https://github.com/marcius-capital/binance-api/blob/master/src/spot/modules/proxy.js) to solve this problem.

## Stay in touch

Feel free to ask questions 😊

* Discord: Nikita Marcius#2274
* Telegram: [@nikitamarcius](https://ttttt.me/nikitamarcius)

## Contributors

<a href="https://github.com/marcius-studio">
<img src="https://raw.githubusercontent.com/marcius-studio/storage/master/badge-marcius-studio.svg" height="60">
</a>   

## Licence

[Apache License Version 2.0](LICENSE.md)

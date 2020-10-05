# TradingView JS API Binance

Ready-made example of integration with updating data via WebSocket. Vue.js and JS API integration example for Binance exchange

**Note**

Binance does not allow you to request data directly from browser, so a proxy is required. For this, routing through the server is used.

![tradingview-charting-library-vuejs-jsapi-example](/docs/chart.jpg)

## Articles

* **[Connecting and settings TradingView with JS API and UDF adapter - Medium.com](https://medium.com/marcius-studio/connecting-and-settings-tradingview-with-js-api-and-udf-adapter-b790297a31fa)**
* **[Financial charts for your application - Medium.com](https://medium.com/marcius-studio/financial-charts-for-your-application-cfcceb147786)**

## Before begin

The Charting Library is free, but its code is in the private repository on GitHub.
Make sure that you have access to this repository: <https://github.com/tradingview/charting_library/>.

If you see 404 error page, then you need to request access to this repository at <https://tradingview.com/HTML5-stock-forex-bitcoin-charting-library/?feature=technical-analysis-charts> and click on the `Get Library` button.

## Features

**Client-side**

* [x] Vuejs 2.x
* [x] @vue/cli-service (Webpack 4, SASS/SCSS)

**Server-side**

* [x] Fastifyjs
* [x] fastify-http-proxy

## Installation 

Install dependences for client and server side.

```bash
$ cd client && npm install
$ cd server && npm install
```

Copy `charting_library` folder from https://github.com/tradingview/charting_library/ to `/public` folder. The earliest supported version of the Charting Library is 1.15. If you get 404 then you need to [request an access to this repository](https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/).

## Commands

```bash
// client\package.json
$ cd client && npm run serve // run
$ cd client && npm run build

// server\package.json
$ cd server && npm run start // run
$ cd server && npm run build
```

## What is Charting Library

Charting Library is a standalone solution for displaying charts. This free, downloadable library is hosted on your servers and is connected to your data feed to be used in your website or app. [Learn more and download](https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/).

## What is Vuejs

Vue is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, and is easy to pick up and integrate with other libraries or existing projects.

## Issues

Axios - a module that allows you to make REST requests. Its build does not allow the use of proxy on client-side, only on the nodejs server. Our [binance-api](https://github.com/marcius-capital/binance-api) module uses a [wrapper](https://github.com/marcius-capital/binance-api/blob/master/src/spot/modules/proxy.js) to solve this problem.

## Contributors

<a href="https://github.com/marcius-studio">
<img src="https://raw.githubusercontent.com/marcius-studio/storage/master/badge-marcius-studio.svg" height="60">
</a>

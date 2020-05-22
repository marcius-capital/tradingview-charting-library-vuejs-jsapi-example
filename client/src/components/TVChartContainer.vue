<template>
  <div class="TVChartContainer" :id="containerId" />
</template>

<script>
  import Datafeed from './api'

  import { widget } from '../../public/charting_library/charting_library.min';

  export default {
    name: 'TVChartContainer',
    props: {
      symbol: {
        default: 'AAPL',
        type: String,
      },
      interval: {
        default: 'D',
        type: String,
      },
      containerId: {
        default: 'tv_chart_container',
        type: String,
      },
      datafeedUrl: {
        default: 'https://demo_feed.tradingview.com',
        type: String,
      },
      libraryPath: {
        default: '/charting_library/',
        type: String,
      },
      chartsStorageUrl: {
        default: 'https://saveload.tradingview.com',
        type: String,
      },
      chartsStorageApiVersion: {
        default: '1.2',
        type: String,
      },
      clientId: {
        default: 'tradingview.com',
        type: String,
      },
      userId: {
        default: 'public_user_id',
        type: String,
      },
      fullscreen: {
        default: false,
        type: Boolean,
      },
      autosize: {
        default: true,
        type: Boolean,
      },
      studiesOverrides: {
        type: Object,
      }
    },
    tvWidget: null,
    mounted() {
      const widgetOptions = {
        symbol: this.symbol,
        // BEWARE: no trailing slash is expected in feed URL
        datafeed: Datafeed, // new window.Datafeeds.UDFCompatibleDatafeed(this.datafeedUrl),
        interval: this.interval,
        container_id: this.containerId,
        library_path: this.libraryPath,

        locale: 'en',
        disabled_features: ['use_localstorage_for_settings'],
        // enabled_features: ['study_templates'],
        charts_storage_url: this.chartsStorageUrl,
        charts_storage_api_version: this.chartsStorageApiVersion,
        client_id: this.clientId,
        user_id: this.userId,
        fullscreen: this.fullscreen,
        autosize: this.autosize,
        studies_overrides: this.studiesOverrides,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };

      const tvWidget = new widget(widgetOptions);
      this.tvWidget = tvWidget;

      tvWidget.onChartReady(() => {
        /*
        tvWidget.headerReady().then(() => {
          const button = tvWidget.createButton();

          button.setAttribute('title', 'Click to show a notification popup');
          button.classList.add('apply-common-tooltip');

          button.addEventListener('click', () => tvWidget.showNoticeDialog({
            title: 'Notification',
            body: 'TradingView Charting Library API works correctly',
            callback: () => {
              // eslint-disable-next-line no-console
              console.log('Noticed!');
            },
          }));

          button.innerHTML = 'Check API';
        });

*/

      });

    },
    destroyed() {
      if (this.tvWidget !== null) {
        this.tvWidget.remove();
        this.tvWidget = null;
      }
    }
  }
</script>

<style>
  .TVChartContainer {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
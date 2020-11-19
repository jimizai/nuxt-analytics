import Vue from "vue";
import VueGtag from "vue-gtag";
import baiduAnalytics from "vue-baidu-analytics";

export default async function (ctx, inject) {
  const router = ctx.app.router
  <% if (options.baidu) { %>
    Vue.use(baiduAnalytics, {
      router,
      siteIdList: [...<% Array.isArray(options.baidu) ? options.baidu : [options.baidu] %>],
      debug: false
    });
  <% } %>

  <% if (options.google) { %>
    Vue.use(
      VueGtag,
      {
        config: { id: <% options.google %> }
      },
      router
    );
  <% } %>

  const track = ({ category, action, label, value }) => {
    if (Vue.$trackBaiduEvent) {
      Vue.$trackBaiduEvent(category, action, label || "", value || 0);
    }
    if (Vue.$gtag) {
      if (category != "purchase") {
        gtag.event(category, {
          event_category: action,
          event_label: label || "",
          value: value || 0
        });
      } else {
        gtag.event("purchase", {
          currency: "CNY",
          value: value,
          items: [
            {
              name: action,
              quantity: 1,
              price: value,
              category: label
            }
          ]
        });
      }
    }

  }

  ctx.$track = track
  inject('track', track)
}

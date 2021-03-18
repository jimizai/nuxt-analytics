import Vue from "vue";
import VueGtag, {
  query,
  config,
  event,
  pageview,
  screenview,
  customMap,
  time,
  exception,
  linker,
  purchase,
  set,
  optIn,
  optOut,
  refund
} from "vue-gtag";

const gtag = {
  query,
  config,
  event,
  pageview,
  screenview,
  customMap,
  time,
  exception,
  linker,
  purchase,
  set,
  optIn,
  optOut,
  refund
}

const toArray = arr => Array.isArray(arr) ? arr : [arr];

/**
 * 定义基础配置
 * 官方文档 https://tongji.baidu.com/open/api/more?p=guide_overview
 */
var BAIDU = /** @class */ (function () {
    function BAIDU(siteId, isDebug) {
        if (siteId === void 0) { siteId = ""; }
        if (isDebug === void 0) { isDebug = false; }
        this.siteId = siteId;
        this.isDebug = isDebug;
    }
    /**
     * 初始化
     */
    BAIDU.prototype.init = function () {
        window._hmt = window._hmt ? window._hmt : [];
        var SCRIPT = document.createElement("script");
        SCRIPT["async"] = true;
        SCRIPT["src"] = "https://hm.baidu.com/hm.js?" + this.siteId;
        document.querySelector("head").appendChild(SCRIPT);
        if (this.isDebug) {
            console.log("[baidu-analytics] siteId load done.\nsiteId:    " + this.siteId);
        }
    };
    /**
     * 设置要响应的站点
     */
    BAIDU.prototype.setAccount = function () {
        window._hmt.push(["_setAccount", this.siteId]);
    };
    /**
     * 提交PV、UV
     */
    BAIDU.prototype.trackPageview = function (pageUrl) {
        // 如果页面链接没传或者无效链接，则默认为根域名
        if (!pageUrl || typeof pageUrl !== "string") {
            pageUrl = "/";
        }
        // 如果页面链接带上了域名，则需要过滤掉
        if (pageUrl.includes("http")) {
            var PAGE_CUT = pageUrl.split("/");
            var HOST_NAME = PAGE_CUT[0] + "//" + PAGE_CUT[2];
            pageUrl = pageUrl.replace(HOST_NAME, "");
        }
        // 设置响应id并提交数据
        this.setAccount();
        window._hmt.push(["_trackPageview", pageUrl]);
        if (this.isDebug) {
            console.log("[baidu-analytics] track pv done.\nsiteId:    " + this.siteId + "\npageUrl:   " + pageUrl);
        }
    };
    /**
     * 提交点击事件
     */
    BAIDU.prototype.trackEvent = function (category, action, label, value) {
        // 前两个是必填项
        if (typeof category !== "string" ||
            typeof action !== "string" ||
            !category ||
            !action) {
            throw new Error("[baidu-analytics] Missing necessary category and operation information, and must be of type string.");
            return false;
        }
        // 重置一些无效的默认值
        if (!label || typeof label !== "string") {
            label = "";
        }
        if (!Number(value)) {
            value = 1;
        }
        // 设置响应id并提交数据
        this.setAccount();
        window._hmt.push(["_trackEvent", category, action, label, value]);
        if (this.isDebug) {
            console.log("[baidu-analytics] track event done.\nsiteId:   " + this.siteId + "\ncategory: " + category + "\naction:   " + action + "\nlabel:    " + label + "\nvalue:    " + value);
        }
    };
    return BAIDU;
}());


var PushBAIDU = /** @class */ (function () {
    function PushBAIDU(siteIdList, isDebug) {
        this.siteIdList = siteIdList;
        this.isDebug = isDebug;
    }
    /**
     * 批量部署站点
     */
    PushBAIDU.prototype.init = function () {
        var _this = this;
        this.siteIdList.forEach(function (siteId) {
            var SITE = new BAIDU(siteId, _this.isDebug);
            SITE.init();
        });
    };
    /**
     * 批量提交pv上报
     */
    PushBAIDU.prototype.pv = function (pageUrl) {
        var _this = this;
        this.siteIdList.forEach(function (siteId) {
            var SITE = new BAIDU(siteId, _this.isDebug);
            SITE.trackPageview(pageUrl);
        });
    };
    /**
     * 批量提交事件上报
     */
    PushBAIDU.prototype.event = function (category, action, label, value) {
        var _this = this;
        this.siteIdList.forEach(function (siteId) {
            var SITE = new BAIDU(siteId, _this.isDebug);
            SITE.trackEvent(category, action, label, value);
        });
    };
    return PushBAIDU;
}());

export default async function (ctx, inject) {
  const router = ctx.app.router
  const runtimeConfig = ctx.$config && ctx.$config.analytics || {}
  const moduleOptions = <%= serialize(options) %>
  const options = {...moduleOptions, ...runtimeConfig}

  if(options.disabled) {
    return 
  }

  if (options.baidu) {
    const siteIdList = toArray(options.baidu)
    /**
     * 一些环境和参数的检查
     */
    if (typeof document === "undefined" || typeof window === "undefined") {
        return false;
    }
    if (!router) {
        throw new Error("[baidu-analytics] Must pass a Vue-Router instance to baidu-analytics.");
    }
    if (!siteIdList) {
        throw new Error("[baidu-analytics] Missing tracking domain ID, add at least one of baidu analytics.");
    }
    /**
     * 挂载推送的方法
     */
    var pushBAIDU = new PushBAIDU(siteIdList, options.debug);
    Vue.prototype.$pushBAIDU = pushBAIDU;
    /**
     * 部署站点并初始化
     */
    if (siteIdList) {
        pushBAIDU.init();
    }
    /**
     * 路由切换时执行PV上报
     */
    router.afterEach(function (to) {
        // 获取要上报的链接（当前版本不需要拼接了）
        var PAGE_URL = window.location.href;
        // 上报数据
        pushBAIDU.pv(PAGE_URL);
    });

    ctx.$pushBAIDU = pushBAIDU;
    inject('pushBAIDU', pushBAIDU);
  }

  if (options.google) {
    Vue.use(
      VueGtag,
      {
        config: { id: options.google }
      },
      router
    );

    ctx.$gtag = gtag;
    inject('gtag', gtag);
  }
}

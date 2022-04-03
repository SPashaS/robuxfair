/*! For license information please see app.min.js.LICENSE.txt */
(() => {
  "use strict";
  const e = {};
  let t = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        t.Android() || t.BlackBerry() || t.iOS() || t.Opera() || t.Windows()
      );
    },
  };
  let s = (e, t = 500, s = 0) => {
      e.classList.contains("_slide") ||
        (e.classList.add("_slide"),
        (e.style.transitionProperty = "height, margin, padding"),
        (e.style.transitionDuration = t + "ms"),
        (e.style.height = `${e.offsetHeight}px`),
        e.offsetHeight,
        (e.style.overflow = "hidden"),
        (e.style.height = s ? `${s}px` : "0px"),
        (e.style.paddingTop = 0),
        (e.style.paddingBottom = 0),
        (e.style.marginTop = 0),
        (e.style.marginBottom = 0),
        window.setTimeout(() => {
          (e.hidden = !s),
            !s && e.style.removeProperty("height"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            !s && e.style.removeProperty("overflow"),
            e.style.removeProperty("transition-duration"),
            e.style.removeProperty("transition-property"),
            e.classList.remove("_slide"),
            document.dispatchEvent(
              new CustomEvent("slideUpDone", { detail: { target: e } })
            );
        }, t));
    },
    i = (e, t = 500, s = 0) => {
      if (!e.classList.contains("_slide")) {
        e.classList.add("_slide"),
          (e.hidden = !e.hidden && null),
          s && e.style.removeProperty("height");
        let i = e.offsetHeight;
        (e.style.overflow = "hidden"),
          (e.style.height = s ? `${s}px` : "0px"),
          (e.style.paddingTop = 0),
          (e.style.paddingBottom = 0),
          (e.style.marginTop = 0),
          (e.style.marginBottom = 0),
          e.offsetHeight,
          (e.style.transitionProperty = "height, margin, padding"),
          (e.style.transitionDuration = t + "ms"),
          (e.style.height = i + "px"),
          e.style.removeProperty("padding-top"),
          e.style.removeProperty("padding-bottom"),
          e.style.removeProperty("margin-top"),
          e.style.removeProperty("margin-bottom"),
          window.setTimeout(() => {
            e.style.removeProperty("height"),
              e.style.removeProperty("overflow"),
              e.style.removeProperty("transition-duration"),
              e.style.removeProperty("transition-property"),
              e.classList.remove("_slide"),
              document.dispatchEvent(
                new CustomEvent("slideDownDone", { detail: { target: e } })
              );
          }, t);
      }
    },
    n = !0,
    r = (e = 500) => {
      let t = document.querySelector("body");
      if (n) {
        let s = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < s.length; e++) {
            s[e].style.paddingRight = "0px";
          }
          (t.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (n = !1),
          setTimeout(function () {
            n = !0;
          }, e);
      }
    },
    o = (e = 500) => {
      let t = document.querySelector("body");
      if (n) {
        let s = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < s.length; e++) {
          s[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (t.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (n = !1),
          setTimeout(function () {
            n = !0;
          }, e);
      }
    };
  function l(e) {
    setTimeout(() => {
      window.FLS && console.log(e);
    }, 0);
  }
  function a(e) {
    return e.filter(function (e, t, s) {
      return s.indexOf(e) === t;
    });
  }
  function h(e, t) {
    const s = Array.from(e).filter(function (e, s, i) {
      if (e.dataset[t]) return e.dataset[t].split(",")[0];
    });
    if (s.length) {
      const e = [];
      s.forEach((s) => {
        const i = {},
          n = s.dataset[t].split(",");
        (i.value = n[0]),
          (i.type = n[1] ? n[1].trim() : "max"),
          (i.item = s),
          e.push(i);
      });
      let i = e.map(function (e) {
        return (
          "(" + e.type + "-width: " + e.value + "px)," + e.value + "," + e.type
        );
      });
      i = a(i);
      const n = [];
      if (i.length)
        return (
          i.forEach((t) => {
            const s = t.split(","),
              i = s[1],
              r = s[2],
              o = window.matchMedia(s[0]),
              l = e.filter(function (e) {
                if (e.value === i && e.type === r) return !0;
              });
            n.push({ itemsArray: l, matchMedia: o });
          }),
          n
        );
    }
  }
  e.mousePrlx = new (class {
    constructor(e, t = null) {
      if (
        ((this.config = Object.assign({ init: !0, logging: !0 }, e)),
        this.config.init)
      ) {
        const e = document.querySelectorAll("[data-prlx-mouse]");
        e.length
          ? (this.paralaxMouseInit(e),
            this.setLogging(`Проснулся, слежу за объектами: (${e.length})`))
          : this.setLogging("Нет ни одного объекта. Сплю...zzZZZzZZz...");
      }
    }
    paralaxMouseInit(e) {
      e.forEach((e) => {
        const t = e.closest("[data-prlx-mouse-wrapper]"),
          s = e.dataset.prlxCx ? +e.dataset.prlxCx : 100,
          i = e.dataset.prlxCy ? +e.dataset.prlxCy : 100,
          n = e.hasAttribute("data-prlx-dxr") ? -1 : 1,
          r = e.hasAttribute("data-prlx-dyr") ? -1 : 1,
          o = e.dataset.prlxA ? +e.dataset.prlxA : 50;
        let l = 0,
          a = 0,
          h = 0,
          c = 0;
        function d(t = window) {
          t.addEventListener("mousemove", function (t) {
            const s = e.getBoundingClientRect().top + window.scrollY;
            if (s >= window.scrollY || s + e.offsetHeight >= window.scrollY) {
              const e = window.innerWidth,
                s = window.innerHeight,
                i = t.clientX - e / 2,
                n = t.clientY - s / 2;
              (h = (i / e) * 100), (c = (n / s) * 100);
            }
          });
        }
        !(function t() {
          (l += ((h - l) * o) / 1e3),
            (a += ((c - a) * o) / 1e3),
            (e.style.cssText = `transform: translate3D(${(n * l) / (s / 10)}%,${
              (r * a) / (i / 10)
            }%,0);`),
            requestAnimationFrame(t);
        })(),
          t ? d(t) : d();
      });
    }
    setLogging(e) {
      this.config.logging && l(`[PRLX Mouse]: ${e}`);
    }
  })({});
  e.watcher = new (class {
    constructor(e) {
      (this.config = Object.assign({ logging: !0 }, e)),
        this.observer,
        !document.documentElement.classList.contains("watcher") &&
          this.scrollWatcherRun();
    }
    scrollWatcherUpdate() {
      this.scrollWatcherRun();
    }
    scrollWatcherRun() {
      document.documentElement.classList.add("watcher"),
        this.scrollWatcherConstructor(
          document.querySelectorAll("[data-watch]")
        );
    }
    scrollWatcherConstructor(e) {
      if (e.length) {
        this.scrollWatcherLogging(
          `Проснулся, слежу за объектами (${e.length})...`
        ),
          a(
            Array.from(e).map(function (e) {
              return `${
                e.dataset.watchRoot ? e.dataset.watchRoot : null
              }|${e.dataset.watchMargin ? e.dataset.watchMargin : "0px"}|${e.dataset.watchThreshold ? e.dataset.watchThreshold : 0}`;
            })
          ).forEach((t) => {
            let s = t.split("|"),
              i = { root: s[0], margin: s[1], threshold: s[2] },
              n = Array.from(e).filter(function (e) {
                let t = e.dataset.watchRoot ? e.dataset.watchRoot : null,
                  s = e.dataset.watchMargin ? e.dataset.watchMargin : "0px",
                  n = e.dataset.watchThreshold ? e.dataset.watchThreshold : 0;
                if (
                  String(t) === i.root &&
                  String(s) === i.margin &&
                  String(n) === i.threshold
                )
                  return e;
              }),
              r = this.getScrollWatcherConfig(i);
            this.scrollWatcherInit(n, r);
          });
      } else
        this.scrollWatcherLogging("Сплю, нет объектов для слежения. ZzzZZzz");
    }
    getScrollWatcherConfig(e) {
      let t = {};
      if (
        (document.querySelector(e.root)
          ? (t.root = document.querySelector(e.root))
          : "null" !== e.root &&
            this.scrollWatcherLogging(
              `Эмм... родительского объекта ${e.root} нет на странице`
            ),
        (t.rootMargin = e.margin),
        !(e.margin.indexOf("px") < 0 && e.margin.indexOf("%") < 0))
      ) {
        if ("prx" === e.threshold) {
          e.threshold = [];
          for (let t = 0; t <= 1; t += 0.005) e.threshold.push(t);
        } else e.threshold = e.threshold.split(",");
        return (t.threshold = e.threshold), t;
      }
      this.scrollWatcherLogging(
        "Ой ой, настройку data-watch-margin нужно задавать в PX или %"
      );
    }
    scrollWatcherCreate(e) {
      this.observer = new IntersectionObserver((e, t) => {
        e.forEach((e) => {
          this.scrollWatcherCallback(e, t);
        });
      }, e);
    }
    scrollWatcherInit(e, t) {
      this.scrollWatcherCreate(t), e.forEach((e) => this.observer.observe(e));
    }
    scrollWatcherIntersecting(e, t) {
      e.isIntersecting
        ? (!t.classList.contains("_watcher-view") &&
            t.classList.add("_watcher-view"),
          this.scrollWatcherLogging(
            `Я вижу ${t.classList}, добавил класс _watcher-view`
          ))
        : (t.classList.contains("_watcher-view") &&
            t.classList.remove("_watcher-view"),
          this.scrollWatcherLogging(
            `Я не вижу ${t.classList}, убрал класс _watcher-view`
          ));
    }
    scrollWatcherOff(e, t) {
      t.unobserve(e),
        this.scrollWatcherLogging(`Я перестал следить за ${e.classList}`);
    }
    scrollWatcherLogging(e) {
      this.config.logging && l(`[Наблюдатель]: ${e}`);
    }
    scrollWatcherCallback(e, t) {
      const s = e.target;
      this.scrollWatcherIntersecting(e, s),
        s.hasAttribute("data-watch-once") &&
          e.isIntersecting &&
          this.scrollWatcherOff(s, t),
        document.dispatchEvent(
          new CustomEvent("watcherCallback", { detail: { entry: e } })
        );
    }
  })({});
  let c = !1;
  function d(e) {
    this.type = e;
  }
  setTimeout(() => {
    if (c) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0),
    (d.prototype.init = function () {
      const e = this;
      (this.оbjects = []),
        (this.daClassname = "_dynamic_adapt_"),
        (this.nodes = document.querySelectorAll("[data-da]"));
      for (let e = 0; e < this.nodes.length; e++) {
        const t = this.nodes[e],
          s = t.dataset.da.trim().split(","),
          i = {};
        (i.element = t),
          (i.parent = t.parentNode),
          (i.destination = document.querySelector(s[0].trim())),
          (i.breakpoint = s[1] ? s[1].trim() : "767"),
          (i.place = s[2] ? s[2].trim() : "last"),
          (i.index = this.indexInParent(i.parent, i.element)),
          this.оbjects.push(i);
      }
      this.arraySort(this.оbjects),
        (this.mediaQueries = Array.prototype.map.call(
          this.оbjects,
          function (e) {
            return (
              "(" +
              this.type +
              "-width: " +
              e.breakpoint +
              "px)," +
              e.breakpoint
            );
          },
          this
        )),
        (this.mediaQueries = Array.prototype.filter.call(
          this.mediaQueries,
          function (e, t, s) {
            return Array.prototype.indexOf.call(s, e) === t;
          }
        ));
      for (let t = 0; t < this.mediaQueries.length; t++) {
        const s = this.mediaQueries[t],
          i = String.prototype.split.call(s, ","),
          n = window.matchMedia(i[0]),
          r = i[1],
          o = Array.prototype.filter.call(this.оbjects, function (e) {
            return e.breakpoint === r;
          });
        n.addListener(function () {
          e.mediaHandler(n, o);
        }),
          this.mediaHandler(n, o);
      }
    }),
    (d.prototype.mediaHandler = function (e, t) {
      if (e.matches)
        for (let e = 0; e < t.length; e++) {
          const s = t[e];
          (s.index = this.indexInParent(s.parent, s.element)),
            this.moveTo(s.place, s.element, s.destination);
        }
      else
        for (let e = t.length - 1; e >= 0; e--) {
          const s = t[e];
          s.element.classList.contains(this.daClassname) &&
            this.moveBack(s.parent, s.element, s.index);
        }
    }),
    (d.prototype.moveTo = function (e, t, s) {
      t.classList.add(this.daClassname),
        "last" === e || e >= s.children.length
          ? s.insertAdjacentElement("beforeend", t)
          : "first" !== e
          ? s.children[e].insertAdjacentElement("beforebegin", t)
          : s.insertAdjacentElement("afterbegin", t);
    }),
    (d.prototype.moveBack = function (e, t, s) {
      t.classList.remove(this.daClassname),
        void 0 !== e.children[s]
          ? e.children[s].insertAdjacentElement("beforebegin", t)
          : e.insertAdjacentElement("beforeend", t);
    }),
    (d.prototype.indexInParent = function (e, t) {
      const s = Array.prototype.slice.call(e.children);
      return Array.prototype.indexOf.call(s, t);
    }),
    (d.prototype.arraySort = function (e) {
      "min" === this.type
        ? Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? -1
                : "last" === e.place || "first" === t.place
                ? 1
                : e.place - t.place
              : e.breakpoint - t.breakpoint;
          })
        : Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? 1
                : "last" === e.place || "first" === t.place
                ? -1
                : t.place - e.place
              : t.breakpoint - e.breakpoint;
          });
    });
  var u, p;
  if (
    (new d("max").init(),
    (u = globalThis),
    (p = function () {
      return (() => {
        var e = {
            555: (e, t, s) => {
              var i;
              void 0 ===
                (i = function (e, t) {
                  Object.defineProperty(t, "__esModule", { value: !0 }),
                    (t.initializePlugins =
                      t.registerPlugin =
                      t.getPluginInstance =
                        void 0);
                  const s = {};
                  function i(e) {
                    const t = [],
                      i = Object.keys(s);
                    return (
                      e.forEach((e) => {
                        if (!i.includes(e))
                          throw new Error(`vlitejs :: Unknown plugin "${e}".`);
                        t.push({ id: e, Plugin: s[e] });
                      }),
                      t
                    );
                  }
                  (t.getPluginInstance = i),
                    (t.registerPlugin = function (e, t) {
                      if (void 0 !== t) {
                        if (!Object.keys(s).includes(e)) return void (s[e] = t);
                        throw new Error(
                          `vlitejs :: The plugin id "${e}" is already registered.`
                        );
                      }
                      throw new Error(
                        `vlitejs :: The plugin id "${e}" is undefined.`
                      );
                    }),
                    (t.initializePlugins = function ({
                      plugins: e,
                      provider: t,
                      type: s,
                      player: n,
                    }) {
                      i(e).forEach(({ id: e, Plugin: i }) => {
                        const r = new i({ player: n });
                        if (
                          ((n.plugins[e] = r),
                          !r.providers.includes(t) || !r.types.includes(s))
                        )
                          throw new Error(
                            `vlitejs :: The "${e}" plugin is only compatible with providers:"${r.providers}" and types:"${r.types}"`
                          );
                        r.init();
                      });
                    });
                }.apply(t, [s, t])) || (e.exports = i);
            },
            571: (e, t, s) => {
              var i;
              void 0 ===
                (i = function (e, t) {
                  Object.defineProperty(t, "__esModule", { value: !0 }),
                    (t.default = function (e) {
                      return class extends e {
                        constructor(e) {
                          super(e),
                            (this.events = [
                              {
                                type: "timeupdate",
                                listener: super.onTimeUpdate,
                              },
                              { type: "ended", listener: super.onMediaEnded },
                              { type: "playing", listener: this.onPlaying },
                              { type: "waiting", listener: this.onWaiting },
                              { type: "seeking", listener: this.onSeeking },
                              { type: "seeked", listener: this.onSeeked },
                            ]);
                        }
                        init() {
                          this.waitUntilVideoIsReady().then(() => {
                            this.addSpecificEvents(), super.onReady();
                          });
                        }
                        waitUntilVideoIsReady() {
                          return new window.Promise((e, t) => {
                            this.media.addEventListener("loadedmetadata", e, {
                              once: !0,
                            }),
                              this.media.addEventListener("canplay", e, {
                                once: !0,
                              });
                          });
                        }
                        addSpecificEvents() {
                          this.events.forEach((e) => {
                            this.media.addEventListener(
                              e.type,
                              e.listener.bind(this)
                            );
                          });
                        }
                        getInstance() {
                          return this.media;
                        }
                        getCurrentTime() {
                          return new window.Promise((e) =>
                            e(this.media.currentTime)
                          );
                        }
                        getDuration() {
                          return new window.Promise((e) =>
                            e(this.media.duration)
                          );
                        }
                        methodPlay() {
                          this.media.play();
                        }
                        methodPause() {
                          this.media.pause();
                        }
                        methodSetVolume(e) {
                          this.media.volume = e;
                        }
                        methodGetVolume() {
                          return new window.Promise((e) =>
                            e(this.media.volume)
                          );
                        }
                        methodMute() {
                          (this.media.muted = !0),
                            this.media.setAttribute("muted", "");
                        }
                        methodUnMute() {
                          (this.media.muted = !1),
                            this.media.removeAttribute("muted");
                        }
                        methodSeekTo(e) {
                          this.media.currentTime = e;
                        }
                        onWaiting() {
                          this.loading(!0);
                        }
                        onPlaying() {
                          this.loading(!1);
                        }
                        onSeeking() {
                          this.loading(!0);
                        }
                        onSeeked() {
                          this.loading(!1);
                        }
                        removeSpecificEvents() {
                          this.events.forEach((e) => {
                            this.media.removeEventListener(e.type, e.listener);
                          });
                        }
                        destroy() {
                          this.removeSpecificEvents(), super.destroy();
                        }
                      };
                    });
                }.apply(t, [s, t])) || (e.exports = i);
            },
            390: function (e, t, s) {
              var i,
                n,
                r =
                  (this && this.__importDefault) ||
                  function (e) {
                    return e && e.__esModule ? e : { default: e };
                  };
              (i = [s, t, s(571)]),
                void 0 ===
                  (n = function (e, t, s) {
                    Object.defineProperty(t, "__esModule", { value: !0 }),
                      (t.registerProvider = t.getProviderInstance = void 0);
                    const i = { html5: (s = r(s)).default };
                    (t.getProviderInstance = function (e, t) {
                      const s = i[e];
                      if (s) return s(t);
                      throw new Error(`vlitejs :: Unknown provider "${e}"`);
                    }),
                      (t.registerProvider = function (e, t) {
                        if (void 0 !== t) {
                          if (!Object.keys(i).includes(e))
                            return void (i[e] = t);
                          throw new Error(
                            `vlitejs :: The provider id "${e}" is already registered.`
                          );
                        }
                        throw new Error(
                          `vlitejs :: The provider id "${e}" is undefined.`
                        );
                      });
                  }.apply(t, i)) || (e.exports = n);
            },
            158: (e, t, s) => {
              var i;
              void 0 ===
                (i = function (e, t) {
                  function s() {
                    return document.exitFullscreen instanceof Function
                      ? ""
                      : ["webkit", "moz", "ms"].find(
                          (e) =>
                            document[e + "ExitFullscreen"] instanceof
                              Function ||
                            document[`${e}CancelFullScreen`] instanceof Function
                        ) || "";
                  }
                  Object.defineProperty(t, "__esModule", { value: !0 }),
                    (t.isTouch =
                      t.getCSSTransitionDuration =
                      t.getBrowserPrefix =
                      t.checkSupportFullScreen =
                      t.formatVideoTime =
                        void 0),
                    (t.formatVideoTime = function (e) {
                      const t = 1e3 * e,
                        s = (t / 1e3 / 60) << 0,
                        i = (t / 1e3) % 60 << 0;
                      let n = "";
                      return (
                        (n += s < 10 ? "0" : ""),
                        (n += s + ":"),
                        (n += i < 10 ? "0" : ""),
                        (n += i),
                        n
                      );
                    }),
                    (t.checkSupportFullScreen = function () {
                      const e = s();
                      return {
                        requestFn: e
                          ? `${e}RequestFullScreen`
                          : "requestFullscreen",
                        cancelFn: e ? `${e}ExitFullscreen` : "exitFullscreen",
                        changeEvent: e
                          ? `${e}fullscreenchange`
                          : "fullscreenchange",
                        isFullScreen: e
                          ? `${e}FullscreenElement`
                          : "fullscreenElement",
                      };
                    }),
                    (t.getBrowserPrefix = s),
                    (t.getCSSTransitionDuration = function ({
                      target: e,
                      isMilliseconds: t = !1,
                    }) {
                      return (
                        parseFloat(
                          window.getComputedStyle(e).transitionDuration
                        ) * (t ? 1e3 : 1)
                      );
                    }),
                    (t.isTouch = function () {
                      return !!("ontouchstart" in document.documentElement);
                    });
                }.apply(t, [s, t])) || (e.exports = i);
            },
            711: function (e, t, s) {
              var i,
                n,
                r =
                  (this && this.__importDefault) ||
                  function (e) {
                    return e && e.__esModule ? e : { default: e };
                  };
              (i = [s, t, s(158), s(61)]),
                void 0 ===
                  (n = function (e, t, s, i) {
                    Object.defineProperty(t, "__esModule", { value: !0 }),
                      (i = r(i)),
                      (t.default = class {
                        constructor({ Vlitejs: e, type: t }) {
                          (this.Vlitejs = e),
                            (this.type = t),
                            (this.plugins = {}),
                            (this.media = e.media),
                            (this.options = e.options),
                            (this.elements = {
                              container: e.container,
                              bigPlay: e.container.querySelector(".v-bigPlay"),
                              poster: e.container.querySelector(".v-poster"),
                              controlBar: null,
                              playPause: null,
                              progressBar: null,
                              currentTime: null,
                              duration: null,
                              volume: null,
                              fullscreen: null,
                            }),
                            (this.isFullScreen = !1),
                            (this.isMuted = this.options.muted),
                            (this.isPaused = null),
                            (this.playerEvents = []),
                            (this.isTouch = s.isTouch()),
                            (this.controlBar = new i.default({
                              player: this,
                              type: t,
                            }));
                        }
                        build() {
                          this.options.controls && this.controlBar.init(),
                            this.init();
                        }
                        init() {
                          throw new Error(
                            'You have to implement the function "init".'
                          );
                        }
                        waitUntilVideoIsReady() {
                          throw new Error(
                            'You have to implement the function "waitUntilVideoIsReady".'
                          );
                        }
                        getInstance() {
                          throw new Error(
                            'You have to implement the function "getInstance".'
                          );
                        }
                        getCurrentTime() {
                          throw new Error(
                            'You have to implement the function "getCurrentTime".'
                          );
                        }
                        methodSeekTo(e) {
                          throw new Error(
                            'You have to implement the function "methodSeekTo".'
                          );
                        }
                        getDuration() {
                          throw new Error(
                            'You have to implement the function "getDuration".'
                          );
                        }
                        methodPlay() {
                          throw new Error(
                            'You have to implement the function "methodPlay".'
                          );
                        }
                        methodPause() {
                          throw new Error(
                            'You have to implement the function "methodPause".'
                          );
                        }
                        methodSetVolume(e) {
                          throw new Error(
                            'You have to implement the function "methodSetVolume".'
                          );
                        }
                        methodGetVolume() {
                          throw new Error(
                            'You have to implement the function "methodGetVolume".'
                          );
                        }
                        methodMute() {
                          throw new Error(
                            'You have to implement the function "methodMute".'
                          );
                        }
                        methodUnMute() {
                          throw new Error(
                            'You have to implement the function "methodUnMute".'
                          );
                        }
                        onReady() {
                          this.options.muted && this.mute(),
                            this.media.setAttribute("tabindex", "-1"),
                            this.options.autoplay &&
                              (!this.media.muted && this.mute(), this.play()),
                            this.options.controls && this.controlBar.onReady(),
                            Object.keys(this.plugins).forEach((e) => {
                              this.plugins[e].onReady instanceof Function &&
                                this.plugins[e].onReady();
                            }),
                            this.loading(!1),
                            this.Vlitejs.onReady instanceof Function &&
                              this.Vlitejs.onReady.call(this, this);
                        }
                        on(e, t) {
                          t instanceof Function &&
                            (this.playerEvents.push({ type: e, listener: t }),
                            this.elements.container.addEventListener(e, t));
                        }
                        dispatchEvent(e) {
                          this.elements.container.dispatchEvent(new Event(e));
                        }
                        loading(e) {
                          this.elements.container.classList[
                            e ? "add" : "remove"
                          ]("v-loading"),
                            this.dispatchEvent("progress");
                        }
                        onTimeUpdate() {
                          this.options.time &&
                            Promise.all([
                              this.getCurrentTime(),
                              this.getDuration(),
                            ]).then(([e, t]) => {
                              const i = Math.round(e);
                              if (this.elements.progressBar) {
                                const s = (100 * i) / t;
                                (this.elements.progressBar.value = `${s}`),
                                  this.elements.progressBar.style.setProperty(
                                    "--value",
                                    `${s}%`
                                  ),
                                  this.elements.progressBar.setAttribute(
                                    "aria-valuenow",
                                    `${Math.round(e)}`
                                  );
                              }
                              this.elements.currentTime &&
                                (this.elements.currentTime.innerHTML =
                                  s.formatVideoTime(i)),
                                this.dispatchEvent("timeupdate");
                            });
                        }
                        onMediaEnded() {
                          this.options.loop
                            ? this.play()
                            : (this.elements.container.classList.replace(
                                "v-playing",
                                "v-paused"
                              ),
                              this.elements.container.classList.add(
                                "v-firstStart"
                              )),
                            this.elements.poster &&
                              this.elements.poster.classList.add("v-active"),
                            this.elements.progressBar &&
                              ((this.elements.progressBar.value = "0"),
                              this.elements.progressBar.style.setProperty(
                                "--value",
                                "0%"
                              ),
                              this.elements.progressBar.removeAttribute(
                                "aria-valuenow"
                              )),
                            this.elements.currentTime &&
                              (this.elements.currentTime.innerHTML = "00:00"),
                            this.dispatchEvent("ended");
                        }
                        play() {
                          this.elements.container.classList.contains(
                            "v-firstStart"
                          ) &&
                            (this.elements.container.classList.remove(
                              "v-firstStart"
                            ),
                            "video" === this.type &&
                              this.elements.poster &&
                              this.elements.poster.classList.remove(
                                "v-active"
                              )),
                            this.methodPlay(),
                            (this.isPaused = !1),
                            this.elements.container.classList.replace(
                              "v-paused",
                              "v-playing"
                            ),
                            this.elements.playPause &&
                              (this.elements.playPause.setAttribute(
                                "aria-label",
                                "Pause"
                              ),
                              this.elements.playPause.classList.add(
                                "v-controlPressed"
                              )),
                            "video" === this.type &&
                              this.elements.bigPlay &&
                              this.elements.bigPlay.setAttribute(
                                "aria-label",
                                "Pause"
                              ),
                            this.afterPlayPause(),
                            this.dispatchEvent("play");
                        }
                        pause() {
                          this.methodPause(),
                            (this.isPaused = !0),
                            this.elements.container.classList.replace(
                              "v-playing",
                              "v-paused"
                            ),
                            this.elements.playPause &&
                              (this.elements.playPause.setAttribute(
                                "aria-label",
                                "Play"
                              ),
                              this.elements.playPause.classList.remove(
                                "v-controlPressed"
                              )),
                            "video" === this.type &&
                              this.elements.bigPlay &&
                              this.elements.bigPlay.setAttribute(
                                "aria-label",
                                "Play"
                              ),
                            this.afterPlayPause(),
                            this.dispatchEvent("pause");
                        }
                        afterPlayPause() {
                          this.Vlitejs.autoHideGranted &&
                            (this.Vlitejs.stopAutoHideTimer(),
                            !this.isPaused &&
                              this.Vlitejs.startAutoHideTimer());
                        }
                        setVolume(e) {
                          e > 1
                            ? (e = 1)
                            : e <= 0
                            ? ((e = 0),
                              (this.isMuted = !0),
                              this.elements.volume &&
                                this.elements.volume.classList.add(
                                  "v-controlPressed"
                                ))
                            : ((this.isMuted = !1),
                              this.elements.volume &&
                                this.elements.volume.classList.remove(
                                  "v-controlPressed"
                                )),
                            this.methodSetVolume(e),
                            this.dispatchEvent("volumechange");
                        }
                        getVolume() {
                          return new window.Promise((e) => {
                            this.methodGetVolume().then((t) => {
                              e(t);
                            });
                          });
                        }
                        mute() {
                          this.methodMute(),
                            (this.isMuted = !0),
                            this.elements.volume &&
                              (this.elements.volume.classList.add(
                                "v-controlPressed"
                              ),
                              this.elements.volume.setAttribute(
                                "aria-label",
                                "Unmute"
                              )),
                            this.dispatchEvent("volumechange");
                        }
                        unMute() {
                          this.methodUnMute(),
                            (this.isMuted = !1),
                            this.elements.volume &&
                              (this.elements.volume.classList.remove(
                                "v-controlPressed"
                              ),
                              this.elements.volume.setAttribute(
                                "aria-label",
                                "Mute"
                              )),
                            this.dispatchEvent("volumechange");
                        }
                        seekTo(e) {
                          this.methodSeekTo(e);
                        }
                        requestFullscreen() {
                          const { requestFn: e } =
                            this.Vlitejs.supportFullScreen;
                          this.media[e] &&
                            (this.elements.container[e](),
                            (this.isFullScreen = !0),
                            this.elements.container.classList.add(
                              "v-fullscreenButton-display"
                            ),
                            this.elements.fullscreen &&
                              (this.elements.fullscreen.classList.add(
                                "v-controlPressed"
                              ),
                              this.elements.fullscreen.setAttribute(
                                "aria-label",
                                "Exit fullscreen"
                              )),
                            this.dispatchEvent("enterfullscreen"));
                        }
                        exitFullscreen({ escKey: e = !1 } = {}) {
                          const { cancelFn: t } =
                            this.Vlitejs.supportFullScreen;
                          document[t] &&
                            (!e && document[t](),
                            (this.isFullScreen = !1),
                            this.elements.container.classList.remove(
                              "v-fullscreenButton-display"
                            ),
                            this.elements.fullscreen &&
                              (this.elements.fullscreen.classList.remove(
                                "v-controlPressed"
                              ),
                              this.elements.fullscreen.setAttribute(
                                "aria-label",
                                "Enter fullscreen"
                              )),
                            this.dispatchEvent("exitfullscreen"));
                        }
                        destroy() {
                          this.controlBar && this.controlBar.destroy(),
                            Object.keys(this.plugins).forEach((e) => {
                              this.plugins[e].destroy instanceof Function &&
                                this.plugins[e].destroy();
                            }),
                            this.playerEvents.forEach((e) => {
                              this.elements.container.removeEventListener(
                                e.type,
                                e.listener
                              );
                            }),
                            this.elements.container.remove();
                        }
                      });
                  }.apply(t, i)) || (e.exports = n);
            },
            206: function (e, t, s) {
              var i,
                n,
                r =
                  (this && this.__importDefault) ||
                  function (e) {
                    return e && e.__esModule ? e : { default: e };
                  };
              (i = [
                s,
                t,
                s(711),
                s(341),
                s(158),
                s(261),
                s(295),
                s(266),
                s(685),
                s(390),
                s(555),
              ]),
                void 0 ===
                  (n = function (e, t, s, i, n, o, l, a, h, c, d) {
                    Object.defineProperty(t, "__esModule", { value: !0 }),
                      (s = r(s)),
                      (i = r(i)),
                      (o = r(o)),
                      (l = r(l)),
                      (a = r(a)),
                      (h = r(h));
                    const u = {
                      audio: {
                        controls: !0,
                        autoplay: !1,
                        playPause: !0,
                        progressBar: !0,
                        time: !0,
                        volume: !0,
                        loop: !1,
                      },
                      video: {
                        controls: !0,
                        autoplay: !1,
                        playPause: !0,
                        progressBar: !0,
                        time: !0,
                        volume: !0,
                        fullscreen: !0,
                        poster: null,
                        bigPlay: !0,
                        playsinline: !1,
                        loop: !1,
                        muted: !1,
                        autoHide: !1,
                        providerParams: {},
                      },
                    };
                    class p {
                      constructor(
                        e,
                        {
                          options: t = {},
                          provider: i = "html5",
                          plugins: r = [],
                          onReady: o = !1,
                        } = {}
                      ) {
                        if ("string" == typeof e)
                          this.media = document.querySelector(e);
                        else {
                          if (
                            !(
                              e instanceof HTMLVideoElement ||
                              e instanceof HTMLAudioElement ||
                              e instanceof HTMLDivElement
                            )
                          )
                            throw new TypeError(
                              "vlitejs :: The element or selector supplied is not valid."
                            );
                          this.media = e;
                        }
                        (this.provider = i),
                          (this.onReady = o),
                          (this.delayAutoHide = 3e3),
                          (this.type =
                            this.media instanceof HTMLAudioElement
                              ? "audio"
                              : "video"),
                          (this.supportFullScreen = n.checkSupportFullScreen()),
                          ["autoplay", "playsinline", "muted", "loop"].forEach(
                            (e) => {
                              this.media.hasAttribute(e)
                                ? (t[e] = !0)
                                : t[e] && this.media.setAttribute(e, "");
                            }
                          ),
                          (this.options = Object.assign(
                            Object.assign({}, u[this.type]),
                            t
                          )),
                          (this.autoHideGranted =
                            "video" === this.type &&
                            !!this.options.autoHide &&
                            !!this.options.controls),
                          (this.onClickOnPlayer =
                            this.onClickOnPlayer.bind(this)),
                          (this.onDoubleClickOnPlayer =
                            this.onDoubleClickOnPlayer.bind(this)),
                          (this.onKeydown = this.onKeydown.bind(this)),
                          (this.onMousemove = this.onMousemove.bind(this)),
                          (this.onChangeFullScreen =
                            this.onChangeFullScreen.bind(this));
                        const l = c.getProviderInstance(i, s.default);
                        this.wrapElement(),
                          (this.container = this.media.parentNode),
                          "video" === this.type && this.renderLayout(),
                          (this.player = new l({
                            type: this.type,
                            Vlitejs: this,
                          })),
                          this.player.build(),
                          this.addEvents(),
                          d.initializePlugins({
                            plugins: r,
                            provider: i,
                            type: this.type,
                            player: this.player,
                          });
                      }
                      wrapElement() {
                        const e = document.createElement("div");
                        e.classList.add(
                          "v-vlite",
                          "v-firstStart",
                          "v-paused",
                          "v-loading",
                          `v-${this.type}`
                        ),
                          e.setAttribute("tabindex", "0"),
                          this.media.parentNode.insertBefore(e, this.media),
                          e.appendChild(this.media);
                      }
                      renderLayout() {
                        const e = `\n\t\t\t${a.default()}\n\t\t\t${o.default()}\n\t\t\t${
                          this.options.poster
                            ? h.default({ posterUrl: this.options.poster })
                            : ""
                        }\n\t\t\t${
                          this.options.bigPlay ? l.default() : ""
                        }\n\t\t`;
                        this.container.insertAdjacentHTML("beforeend", e);
                      }
                      addEvents() {
                        "video" === this.type &&
                          (this.container.addEventListener(
                            "click",
                            this.onClickOnPlayer
                          ),
                          this.container.addEventListener(
                            "dblclick",
                            this.onDoubleClickOnPlayer
                          ),
                          this.autoHideGranted &&
                            this.container.addEventListener(
                              "mousemove",
                              this.onMousemove
                            ),
                          window.addEventListener(
                            this.supportFullScreen.changeEvent,
                            this.onChangeFullScreen
                          )),
                          this.container.addEventListener(
                            "keydown",
                            this.onKeydown
                          );
                      }
                      onClickOnPlayer(e) {
                        const t = e.target;
                        i.default({
                          target: t,
                          selectorString: ".v-poster, .v-overlay, .v-bigPlay",
                          nodeName: ["div", "button"],
                        }) &&
                          (this.player.controlBar.togglePlayPause(e),
                          t.matches(".v-bigPlay") && this.container.focus());
                      }
                      onDoubleClickOnPlayer(e) {
                        const t = e.target;
                        i.default({
                          target: t,
                          selectorString: ".v-overlay",
                          nodeName: ["div"],
                        }) && this.player.controlBar.toggleFullscreen(e);
                      }
                      onKeydown(e) {
                        const t = document.activeElement,
                          { keyCode: s } = e;
                        [9, 32, 37, 39].includes(s) &&
                          this.autoHideGranted &&
                          (t === this.container ||
                            (null == t ? void 0 : t.closest(".v-vlite"))) &&
                          (this.stopAutoHideTimer(), this.startAutoHideTimer()),
                          ![37, 39].includes(s) ||
                            (t !== this.container &&
                              t !== this.player.elements.progressBar) ||
                            (e.preventDefault(),
                            37 === s
                              ? this.fastForward("backward")
                              : 39 === s && this.fastForward("forward")),
                          ![38, 40].includes(s) ||
                            (t !== this.container &&
                              t !== this.player.elements.volume) ||
                            (38 === s
                              ? (this.animateVolumeButton(),
                                this.increaseVolume())
                              : 40 === s &&
                                (this.animateVolumeButton(),
                                this.decreaseVolume())),
                          32 === s &&
                            t === this.container &&
                            this.player.controlBar.togglePlayPause(e);
                      }
                      onMousemove() {
                        this.player.isPaused ||
                          (this.stopAutoHideTimer(), this.startAutoHideTimer());
                      }
                      onChangeFullScreen(e) {
                        !document[this.supportFullScreen.isFullScreen] &&
                          this.player.isFullScreen &&
                          this.player.exitFullscreen({ escKey: !0 });
                      }
                      fastForward(e) {
                        this.player.getCurrentTime().then((t) => {
                          this.player.seekTo("backward" === e ? t - 5 : t + 5);
                        });
                      }
                      increaseVolume() {
                        this.player.getVolume().then((e) => {
                          this.player.setVolume(e + 0.05);
                        });
                      }
                      decreaseVolume() {
                        this.player.getVolume().then((e) => {
                          this.player.setVolume(e - 0.05);
                        });
                      }
                      animateVolumeButton() {
                        if (this.player.elements.volume) {
                          const e = n.getCSSTransitionDuration({
                            target: this.player.elements.volume,
                            isMilliseconds: !0,
                          });
                          this.player.elements.volume.classList.add(
                            "v-animate"
                          ),
                            setTimeout(
                              () =>
                                this.player.elements.volume.classList.remove(
                                  "v-animate"
                                ),
                              e
                            );
                        }
                      }
                      stopAutoHideTimer() {
                        "video" === this.type &&
                          this.player.elements.controlBar &&
                          (this.player.elements.controlBar.classList.remove(
                            "hidden"
                          ),
                          clearTimeout(this.timerAutoHide));
                      }
                      startAutoHideTimer() {
                        "video" === this.type &&
                          !this.player.isPaused &&
                          this.player.elements.controlBar &&
                          (this.timerAutoHide = window.setTimeout(() => {
                            this.player.elements.controlBar.classList.add(
                              "hidden"
                            );
                          }, this.delayAutoHide));
                      }
                      removeEvents() {
                        this.container.removeEventListener(
                          "keydown",
                          this.onKeydown
                        ),
                          "video" === this.type &&
                            (this.container.removeEventListener(
                              "click",
                              this.onClickOnPlayer
                            ),
                            this.container.removeEventListener(
                              "dblclick",
                              this.onDoubleClickOnPlayer
                            ),
                            this.autoHideGranted &&
                              this.container.removeEventListener(
                                "mousemove",
                                this.onMousemove
                              ),
                            window.removeEventListener(
                              this.supportFullScreen.changeEvent,
                              this.onChangeFullScreen
                            ));
                      }
                      destroy() {
                        this.removeEvents(),
                          this.player.destroy(),
                          this.player.controlBar.destroy();
                      }
                    }
                    (p.registerProvider = c.registerProvider),
                      (p.registerPlugin = d.registerPlugin),
                      (t.default = p);
                  }.apply(t, i)) || (e.exports = n);
            },
            295: function (e, t, s) {
              var i,
                n,
                r =
                  (this && this.__importDefault) ||
                  function (e) {
                    return e && e.__esModule ? e : { default: e };
                  };
              (i = [s, t, s(363)]),
                void 0 ===
                  (n = function (e, t, s) {
                    Object.defineProperty(t, "__esModule", { value: !0 }),
                      (s = r(s)),
                      (t.default = function () {
                        return `<button class="v-bigPlay v-controlButton">${s.default}</button>`;
                      });
                  }.apply(t, i)) || (e.exports = n);
            },
            61: function (e, t, s) {
              var i,
                n,
                r =
                  (this && this.__importDefault) ||
                  function (e) {
                    return e && e.__esModule ? e : { default: e };
                  };
              (i = [s, t, s(158), s(341), s(372)]),
                void 0 ===
                  (n = function (e, t, s, i, n) {
                    Object.defineProperty(t, "__esModule", { value: !0 }),
                      (i = r(i)),
                      (n = r(n)),
                      (t.default = class {
                        constructor({ player: e, type: t }) {
                          (this.player = e),
                            (this.type = t),
                            (this.touchEvents = [
                              "touchstart",
                              "touchmove",
                              "touchend",
                            ]),
                            (this.onInputProgressBar =
                              this.onInputProgressBar.bind(this)),
                            (this.onTouchEventProgressBar =
                              this.onTouchEventProgressBar.bind(this)),
                            (this.onClickOnControlBar =
                              this.onClickOnControlBar.bind(this)),
                            (this.togglePlayPause =
                              this.togglePlayPause.bind(this)),
                            (this.toggleVolume = this.toggleVolume.bind(this)),
                            (this.toggleFullscreen =
                              this.toggleFullscreen.bind(this));
                        }
                        init() {
                          this.render(), this.cacheElements(), this.addEvents();
                        }
                        cacheElements() {
                          const e =
                            this.player.elements.container.querySelector(
                              ".v-controlBar"
                            );
                          (this.player.elements.controlBar = e),
                            this.player.elements.controlBar &&
                              ((this.player.elements.playPause =
                                e.querySelector(".v-playPauseButton")),
                              (this.player.elements.progressBar =
                                e.querySelector(".v-progressBar")),
                              (this.player.elements.currentTime =
                                e.querySelector(".v-currentTime")),
                              (this.player.elements.duration =
                                e.querySelector(".v-duration")),
                              (this.player.elements.volume =
                                e.querySelector(".v-volumeButton")),
                              (this.player.elements.fullscreen =
                                e.querySelector(".v-fullscreenButton")),
                              this.player.elements.volume &&
                                this.player.elements.volume.setAttribute(
                                  "aria-label",
                                  this.player.isMuted ? "Unmute" : "Mute"
                                ));
                        }
                        render() {
                          this.player.elements.container.insertAdjacentHTML(
                            "beforeend",
                            this.getTemplate()
                          );
                        }
                        onReady() {
                          this.player.getDuration().then((e) => {
                            this.player.elements.progressBar &&
                              this.player.elements.progressBar.setAttribute(
                                "aria-valuemax",
                                `${Math.round(e)}`
                              ),
                              this.player.elements.duration &&
                                (this.player.elements.duration.innerHTML =
                                  s.formatVideoTime(e));
                          });
                        }
                        addEvents() {
                          this.player.elements.progressBar &&
                            (this.player.elements.progressBar.addEventListener(
                              "input",
                              this.onInputProgressBar
                            ),
                            this.player.isTouch &&
                              this.touchEvents.forEach((e) => {
                                this.player.elements.progressBar.addEventListener(
                                  e,
                                  this.onTouchEventProgressBar
                                );
                              })),
                            this.player.elements.controlBar &&
                              this.player.elements.controlBar.addEventListener(
                                "click",
                                this.onClickOnControlBar
                              );
                        }
                        onTouchEventProgressBar(e) {
                          e.preventDefault();
                          const t = e.target,
                            s = parseFloat(t.getAttribute("max") || "100"),
                            i = t.getBoundingClientRect(),
                            n =
                              ((e.changedTouches[0].clientX - i.left) /
                                i.width) *
                              100;
                          (t.value = "" + (100 * n) / s),
                            t.dispatchEvent(new Event("input"));
                        }
                        onInputProgressBar(e) {
                          const t = e.target;
                          t.style.setProperty("--value", `${t.value}%`),
                            this.player.elements.container.classList.contains(
                              "v-firstStart"
                            ) && this.player.play(),
                            this.player.getDuration().then((e) => {
                              this.player.seekTo(
                                (parseFloat(t.value) * e) / 100
                              );
                            });
                        }
                        onClickOnControlBar(e) {
                          const t = e.target,
                            s = i.default({
                              target: t,
                              selectorString: ".v-playPauseButton",
                              nodeName: ["button"],
                            }),
                            n = i.default({
                              target: t,
                              selectorString: ".v-volumeButton",
                              nodeName: ["button"],
                            }),
                            r = i.default({
                              target: t,
                              selectorString: ".v-fullscreenButton",
                              nodeName: ["button"],
                            });
                          s
                            ? this.togglePlayPause(e)
                            : n
                            ? this.toggleVolume(e)
                            : r && this.toggleFullscreen(e);
                        }
                        togglePlayPause(e) {
                          e.preventDefault(),
                            this.player.elements.container.classList.contains(
                              "v-paused"
                            )
                              ? this.player.play()
                              : this.player.pause();
                        }
                        toggleVolume(e) {
                          e.preventDefault(),
                            this.player.elements.volume.classList.contains(
                              "v-controlPressed"
                            )
                              ? this.player.unMute()
                              : this.player.mute();
                        }
                        toggleFullscreen(e) {
                          e.preventDefault(),
                            this.player.isFullScreen
                              ? this.player.exitFullscreen()
                              : this.player.requestFullscreen();
                        }
                        getTemplate() {
                          return `${n.default({
                            options: this.player.options,
                            isMuted: this.player.isMuted,
                            type: this.type,
                          })}`;
                        }
                        removeEvents() {
                          this.player.elements.progressBar &&
                            (this.player.elements.progressBar.removeEventListener(
                              "input",
                              this.onInputProgressBar
                            ),
                            this.player.isTouch &&
                              this.touchEvents.forEach((e) => {
                                this.player.elements.progressBar.removeEventListener(
                                  e,
                                  this.onTouchEventProgressBar
                                );
                              })),
                            this.player.elements.controlBar &&
                              this.player.elements.controlBar.removeEventListener(
                                "click",
                                this.onClickOnControlBar
                              );
                        }
                        destroy() {
                          this.removeEvents(),
                            this.player.elements.controlBar &&
                              this.player.elements.controlBar.remove();
                        }
                      });
                  }.apply(t, i)) || (e.exports = n);
            },
            372: function (e, t, s) {
              var i,
                n,
                r =
                  (this && this.__importDefault) ||
                  function (e) {
                    return e && e.__esModule ? e : { default: e };
                  };
              (i = [s, t, s(169), s(951), s(418), s(569), s(804), s(299)]),
                void 0 ===
                  (n = function (e, t, s, i, n, o, l, a) {
                    Object.defineProperty(t, "__esModule", { value: !0 }),
                      (s = r(s)),
                      (i = r(i)),
                      (n = r(n)),
                      (o = r(o)),
                      (l = r(l)),
                      (a = r(a)),
                      (t.default = function ({
                        options: e,
                        isMuted: t,
                        type: r,
                      }) {
                        return `<div class="v-controlBar">${
                          e.playPause
                            ? `<button class="v-playPauseButton v-controlButton" aria-label="Play">${s.default}${i.default}</button>`
                            : ""
                        }${
                          e.time
                            ? '<div class="v-time"><span class="v-currentTime">00:00</span>&nbsp;/&nbsp;<span class="v-duration"></span></div>'
                            : ""
                        }${
                          e.progressBar
                            ? '<input type="range" class="v-progressBar" min="0" max="100" step="0.01" value="0" aria-label="Seek" aria-valuemin="0" />'
                            : ""
                        }${
                          e.volume
                            ? (function ({ isMuted: e }) {
                                return `<button class="v-volumeButton v-controlButton${
                                  e ? " v-controlPressed" : ""
                                }">${n.default}${o.default}</button>`;
                              })({ isMuted: t })
                            : ""
                        }${
                          e.fullscreen
                            ? `<button class="v-fullscreenButton v-controlButton" aria-label="Enter fullscreen">${l.default}${a.default}</span></button>`
                            : ""
                        }</div>`;
                      });
                  }.apply(t, i)) || (e.exports = n);
            },
            261: (e, t, s) => {
              var i;
              void 0 ===
                (i = function (e, t) {
                  Object.defineProperty(t, "__esModule", { value: !0 }),
                    (t.default = function () {
                      return '\n\t\t<div class="v-loader">\n\t\t\t<div class="v-loaderContent">\n\t\t\t\t<div class="v-loaderBounce1"></div>\n\t\t\t\t<div class="v-loaderBounce2"></div>\n\t\t\t\t<div class="v-loaderBounce3"></div>\n\t\t\t</div>\n\t\t</div>\n\t';
                    });
                }.apply(t, [s, t])) || (e.exports = i);
            },
            266: (e, t, s) => {
              var i;
              void 0 ===
                (i = function (e, t) {
                  Object.defineProperty(t, "__esModule", { value: !0 }),
                    (t.default = function () {
                      return '<div class="v-overlay"></div>';
                    });
                }.apply(t, [s, t])) || (e.exports = i);
            },
            685: (e, t, s) => {
              var i;
              void 0 ===
                (i = function (e, t) {
                  Object.defineProperty(t, "__esModule", { value: !0 }),
                    (t.default = function ({ posterUrl: e = "" }) {
                      return `<div class="v-poster v-active"${
                        e && ` style="background-image: url(${e})"`
                      }></div>`;
                    });
                }.apply(t, [s, t])) || (e.exports = i);
            },
            420: (e, t, s) => {
              s(295);
            },
            439: (e, t, s) => {
              s(61);
            },
            97: (e, t, s) => {
              s(261);
            },
            736: (e, t, s) => {
              s(266);
            },
            315: (e, t, s) => {
              s(685);
            },
            341: (e) => {
              e.exports = function ({
                target: e,
                selectorString: t,
                nodeName: s,
              }) {
                if (
                  ("string" == typeof s && (s = [s]),
                  Array.isArray(s) && s.length)
                )
                  return s
                    .map((s) => e.nodeName.toLowerCase() === s && e.matches(t))
                    .includes(!0);
              };
            },
            363: (e) => {
              e.exports = "\n";
            },
            299: (e) => {
              e.exports =
                '<svg class="v-iconPressed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 16h2v2c0 .55.45 1 1 1s1-.45 1-1v-3c0-.55-.45-1-1-1H6c-.55 0-1 .45-1 1s.45 1 1 1zm2-8H6c-.55 0-1 .45-1 1s.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1s-1 .45-1 1v2zm7 11c.55 0 1-.45 1-1v-2h2c.55 0 1-.45 1-1s-.45-1-1-1h-3c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1zm1-11V6c0-.55-.45-1-1-1s-1 .45-1 1v3c0 .55.45 1 1 1h3c.55 0 1-.45 1-1s-.45-1-1-1h-2z"/></svg>\n';
            },
            804: (e) => {
              e.exports =
                '<svg class="v-iconUnpressed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 14c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h3c.55 0 1-.45 1-1s-.45-1-1-1H7v-2c0-.55-.45-1-1-1zm0-4c.55 0 1-.45 1-1V7h2c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1zm11 7h-2c-.55 0-1 .45-1 1s.45 1 1 1h3c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1s-1 .45-1 1v2zM14 6c0 .55.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1V6c0-.55-.45-1-1-1h-3c-.55 0-1 .45-1 1z"/></svg>\n';
            },
            951: (e) => {
              e.exports =
                '<svg class="v-iconPressed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2zm6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2z"/></svg>\n';
            },
            169: (e) => {
              e.exports =
                '<svg class="v-iconUnpressed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 000-1.69L9.54 5.98A.998.998 0 008 6.82z"/></svg>\n';
            },
            418: (e) => {
              e.exports =
                '<svg class="v-iconUnpressed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.34-1.71-.71L7 9H4c-.55 0-1 .45-1 1zm13.5 2A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 4.45v.2c0 .38.25.71.6.85C17.18 6.53 19 9.06 19 12s-1.82 5.47-4.4 6.5c-.36.14-.6.47-.6.85v.2c0 .63.63 1.07 1.21.85C18.6 19.11 21 15.84 21 12s-2.4-7.11-5.79-8.4c-.58-.23-1.21.22-1.21.85z"/></svg>\n';
            },
            569: (e) => {
              e.exports =
                '<svg class="v-iconPressed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M3.63 3.63a.996.996 0 000 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.15-.58.53-.58.92 0 .72.73 1.18 1.39.91.8-.33 1.55-.77 2.22-1.31l1.34 1.34a.996.996 0 101.41-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-3.83-2.4-7.11-5.78-8.4-.59-.23-1.22.23-1.22.86v.19c0 .38.25.71.61.85C17.18 6.54 19 9.06 19 12zm-8.71-6.29l-.17.17L12 7.76V6.41c0-.89-1.08-1.33-1.71-.7zM16.5 12A4.5 4.5 0 0014 7.97v1.79l2.48 2.48c.01-.08.02-.16.02-.24z"/></svg>\n';
            },
          },
          t = {};
        function s(i) {
          var n = t[i];
          if (void 0 !== n) return n.exports;
          var r = (t[i] = { exports: {} });
          return e[i].call(r.exports, r, r.exports, s), r.exports;
        }
        (s.n = (e) => {
          var t = e && e.__esModule ? () => e.default : () => e;
          return s.d(t, { a: t }), t;
        }),
          (s.d = (e, t) => {
            for (var i in t)
              s.o(t, i) &&
                !s.o(e, i) &&
                Object.defineProperty(e, i, { enumerable: !0, get: t[i] });
          }),
          (s.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t));
        var i = {};
        return (
          (() => {
            s.d(i, { default: () => n });
            var e = s(206),
              t = s.n(e);
            s(97), s(439), s(420), s(736), s(315);
            const n = t();
          })(),
          i.default
        );
      })();
    }),
    "object" == typeof exports && "object" == typeof module
      ? (module.exports = p())
      : "function" == typeof define && define.amd
      ? define([], p)
      : "object" == typeof exports
      ? (exports.Vlitejs = p())
      : (u.Vlitejs = p()),
    !t.any())
  )
    (function () {
      class e {
        constructor(t, s = {}) {
          if (!(t instanceof Node))
            throw (
              "Can't initialize VanillaTilt because " + t + " is not a Node."
            );
          (this.width = null),
            (this.height = null),
            (this.clientWidth = null),
            (this.clientHeight = null),
            (this.left = null),
            (this.top = null),
            (this.gammazero = null),
            (this.betazero = null),
            (this.lastgammazero = null),
            (this.lastbetazero = null),
            (this.transitionTimeout = null),
            (this.updateCall = null),
            (this.event = null),
            (this.updateBind = this.update.bind(this)),
            (this.resetBind = this.reset.bind(this)),
            (this.element = t),
            (this.settings = this.extendSettings(s)),
            (this.reverse = this.settings.reverse ? -1 : 1),
            (this.glare = e.isSettingTrue(this.settings.glare)),
            (this.glarePrerender = e.isSettingTrue(
              this.settings["glare-prerender"]
            )),
            (this.fullPageListening = e.isSettingTrue(
              this.settings["full-page-listening"]
            )),
            (this.gyroscope = e.isSettingTrue(this.settings.gyroscope)),
            (this.gyroscopeSamples = this.settings.gyroscopeSamples),
            (this.elementListener = this.getElementListener()),
            this.glare && this.prepareGlare(),
            this.fullPageListening && this.updateClientSize(),
            this.addEventListeners(),
            this.reset(),
            this.updateInitialPosition();
        }
        static isSettingTrue(e) {
          return "" === e || !0 === e || 1 === e;
        }
        getElementListener() {
          if (this.fullPageListening) return window.document;
          if ("string" == typeof this.settings["mouse-event-element"]) {
            const e = document.querySelector(
              this.settings["mouse-event-element"]
            );
            if (e) return e;
          }
          return this.settings["mouse-event-element"] instanceof Node
            ? this.settings["mouse-event-element"]
            : this.element;
        }
        addEventListeners() {
          (this.onMouseEnterBind = this.onMouseEnter.bind(this)),
            (this.onMouseMoveBind = this.onMouseMove.bind(this)),
            (this.onMouseLeaveBind = this.onMouseLeave.bind(this)),
            (this.onWindowResizeBind = this.onWindowResize.bind(this)),
            (this.onDeviceOrientationBind =
              this.onDeviceOrientation.bind(this)),
            this.elementListener.addEventListener(
              "mouseenter",
              this.onMouseEnterBind
            ),
            this.elementListener.addEventListener(
              "mouseleave",
              this.onMouseLeaveBind
            ),
            this.elementListener.addEventListener(
              "mousemove",
              this.onMouseMoveBind
            ),
            (this.glare || this.fullPageListening) &&
              window.addEventListener("resize", this.onWindowResizeBind),
            this.gyroscope &&
              window.addEventListener(
                "deviceorientation",
                this.onDeviceOrientationBind
              );
        }
        removeEventListeners() {
          this.elementListener.removeEventListener(
            "mouseenter",
            this.onMouseEnterBind
          ),
            this.elementListener.removeEventListener(
              "mouseleave",
              this.onMouseLeaveBind
            ),
            this.elementListener.removeEventListener(
              "mousemove",
              this.onMouseMoveBind
            ),
            this.gyroscope &&
              window.removeEventListener(
                "deviceorientation",
                this.onDeviceOrientationBind
              ),
            (this.glare || this.fullPageListening) &&
              window.removeEventListener("resize", this.onWindowResizeBind);
        }
        destroy() {
          clearTimeout(this.transitionTimeout),
            null !== this.updateCall && cancelAnimationFrame(this.updateCall),
            this.reset(),
            this.removeEventListeners(),
            (this.element.vanillaTilt = null),
            delete this.element.vanillaTilt,
            (this.element = null);
        }
        onDeviceOrientation(e) {
          if (null === e.gamma || null === e.beta) return;
          this.updateElementPosition(),
            this.gyroscopeSamples > 0 &&
              ((this.lastgammazero = this.gammazero),
              (this.lastbetazero = this.betazero),
              null === this.gammazero
                ? ((this.gammazero = e.gamma), (this.betazero = e.beta))
                : ((this.gammazero = (e.gamma + this.lastgammazero) / 2),
                  (this.betazero = (e.beta + this.lastbetazero) / 2)),
              (this.gyroscopeSamples -= 1));
          const t =
              this.settings.gyroscopeMaxAngleX -
              this.settings.gyroscopeMinAngleX,
            s =
              this.settings.gyroscopeMaxAngleY -
              this.settings.gyroscopeMinAngleY,
            i = t / this.width,
            n = s / this.height,
            r =
              (e.gamma - (this.settings.gyroscopeMinAngleX + this.gammazero)) /
              i,
            o =
              (e.beta - (this.settings.gyroscopeMinAngleY + this.betazero)) / n;
          null !== this.updateCall && cancelAnimationFrame(this.updateCall),
            (this.event = { clientX: r + this.left, clientY: o + this.top }),
            (this.updateCall = requestAnimationFrame(this.updateBind));
        }
        onMouseEnter() {
          this.updateElementPosition(),
            (this.element.style.willChange = "transform"),
            this.setTransition();
        }
        onMouseMove(e) {
          null !== this.updateCall && cancelAnimationFrame(this.updateCall),
            (this.event = e),
            (this.updateCall = requestAnimationFrame(this.updateBind));
        }
        onMouseLeave() {
          this.setTransition(),
            this.settings.reset && requestAnimationFrame(this.resetBind);
        }
        reset() {
          (this.event = {
            clientX: this.left + this.width / 2,
            clientY: this.top + this.height / 2,
          }),
            this.element &&
              this.element.style &&
              (this.element.style.transform = `perspective(${this.settings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`),
            this.resetGlare();
        }
        resetGlare() {
          this.glare &&
            ((this.glareElement.style.transform =
              "rotate(180deg) translate(-50%, -50%)"),
            (this.glareElement.style.opacity = "0"));
        }
        updateInitialPosition() {
          if (0 === this.settings.startX && 0 === this.settings.startY) return;
          this.onMouseEnter(),
            this.fullPageListening
              ? (this.event = {
                  clientX:
                    ((this.settings.startX + this.settings.max) /
                      (2 * this.settings.max)) *
                    this.clientWidth,
                  clientY:
                    ((this.settings.startY + this.settings.max) /
                      (2 * this.settings.max)) *
                    this.clientHeight,
                })
              : (this.event = {
                  clientX:
                    this.left +
                    ((this.settings.startX + this.settings.max) /
                      (2 * this.settings.max)) *
                      this.width,
                  clientY:
                    this.top +
                    ((this.settings.startY + this.settings.max) /
                      (2 * this.settings.max)) *
                      this.height,
                });
          let e = this.settings.scale;
          (this.settings.scale = 1),
            this.update(),
            (this.settings.scale = e),
            this.resetGlare();
        }
        getValues() {
          let e, t;
          return (
            this.fullPageListening
              ? ((e = this.event.clientX / this.clientWidth),
                (t = this.event.clientY / this.clientHeight))
              : ((e = (this.event.clientX - this.left) / this.width),
                (t = (this.event.clientY - this.top) / this.height)),
            (e = Math.min(Math.max(e, 0), 1)),
            (t = Math.min(Math.max(t, 0), 1)),
            {
              tiltX: (
                this.reverse *
                (this.settings.max - e * this.settings.max * 2)
              ).toFixed(2),
              tiltY: (
                this.reverse *
                (t * this.settings.max * 2 - this.settings.max)
              ).toFixed(2),
              percentageX: 100 * e,
              percentageY: 100 * t,
              angle:
                Math.atan2(
                  this.event.clientX - (this.left + this.width / 2),
                  -(this.event.clientY - (this.top + this.height / 2))
                ) *
                (180 / Math.PI),
            }
          );
        }
        updateElementPosition() {
          let e = this.element.getBoundingClientRect();
          (this.width = this.element.offsetWidth),
            (this.height = this.element.offsetHeight),
            (this.left = e.left),
            (this.top = e.top);
        }
        update() {
          let e = this.getValues();
          (this.element.style.transform =
            "perspective(" +
            this.settings.perspective +
            "px) rotateX(" +
            ("x" === this.settings.axis ? 0 : e.tiltY) +
            "deg) rotateY(" +
            ("y" === this.settings.axis ? 0 : e.tiltX) +
            "deg) scale3d(" +
            this.settings.scale +
            ", " +
            this.settings.scale +
            ", " +
            this.settings.scale +
            ")"),
            this.glare &&
              ((this.glareElement.style.transform = `rotate(${e.angle}deg) translate(-50%, -50%)`),
              (this.glareElement.style.opacity =
                "" + (e.percentageY * this.settings["max-glare"]) / 100)),
            this.element.dispatchEvent(
              new CustomEvent("tiltChange", { detail: e })
            ),
            (this.updateCall = null);
        }
        prepareGlare() {
          if (!this.glarePrerender) {
            const e = document.createElement("div");
            e.classList.add("js-tilt-glare");
            const t = document.createElement("div");
            t.classList.add("js-tilt-glare-inner"),
              e.appendChild(t),
              this.element.appendChild(e);
          }
          (this.glareElementWrapper =
            this.element.querySelector(".js-tilt-glare")),
            (this.glareElement = this.element.querySelector(
              ".js-tilt-glare-inner"
            )),
            this.glarePrerender ||
              (Object.assign(this.glareElementWrapper.style, {
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                "pointer-events": "none",
              }),
              Object.assign(this.glareElement.style, {
                position: "absolute",
                top: "50%",
                left: "50%",
                "pointer-events": "none",
                "background-image":
                  "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
                transform: "rotate(180deg) translate(-50%, -50%)",
                "transform-origin": "0% 0%",
                opacity: "0",
              }),
              this.updateGlareSize());
        }
        updateGlareSize() {
          if (this.glare) {
            const e =
              2 *
              (this.element.offsetWidth > this.element.offsetHeight
                ? this.element.offsetWidth
                : this.element.offsetHeight);
            Object.assign(this.glareElement.style, {
              width: `${e}px`,
              height: `${e}px`,
            });
          }
        }
        updateClientSize() {
          (this.clientWidth =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth),
            (this.clientHeight =
              window.innerHeight ||
              document.documentElement.clientHeight ||
              document.body.clientHeight);
        }
        onWindowResize() {
          this.updateGlareSize(), this.updateClientSize();
        }
        setTransition() {
          clearTimeout(this.transitionTimeout),
            (this.element.style.transition =
              this.settings.speed + "ms " + this.settings.easing),
            this.glare &&
              (this.glareElement.style.transition = `opacity ${this.settings.speed}ms ${this.settings.easing}`),
            (this.transitionTimeout = setTimeout(() => {
              (this.element.style.transition = ""),
                this.glare && (this.glareElement.style.transition = "");
            }, this.settings.speed));
        }
        extendSettings(e) {
          let t = {
              reverse: !1,
              max: 15,
              startX: 0,
              startY: 0,
              perspective: 1e3,
              easing: "cubic-bezier(.03,.98,.52,.99)",
              scale: 1,
              speed: 300,
              transition: !0,
              axis: null,
              glare: !1,
              "max-glare": 1,
              "glare-prerender": !1,
              "full-page-listening": !1,
              "mouse-event-element": null,
              reset: !0,
              gyroscope: !0,
              gyroscopeMinAngleX: -45,
              gyroscopeMaxAngleX: 45,
              gyroscopeMinAngleY: -45,
              gyroscopeMaxAngleY: 45,
              gyroscopeSamples: 10,
            },
            s = {};
          for (var i in t)
            if (i in e) s[i] = e[i];
            else if (this.element.hasAttribute("data-tilt-" + i)) {
              let e = this.element.getAttribute("data-tilt-" + i);
              try {
                s[i] = JSON.parse(e);
              } catch (t) {
                s[i] = e;
              }
            } else s[i] = t[i];
          return s;
        }
        static init(t, s) {
          t instanceof Node && (t = [t]),
            t instanceof NodeList && (t = [].slice.call(t)),
            t instanceof Array &&
              t.forEach((t) => {
                "vanillaTilt" in t || (t.vanillaTilt = new e(t, s));
              });
        }
      }
      "undefined" != typeof document &&
        ((window.VanillaTilt = e),
        e.init(document.querySelectorAll("[data-tilt]")));
    })();
  document.getElementById("player")
    ? (console.log("Есть видео :)"),
      new Vlitejs("#player", {
        options: {
          autoplay: !1,
          controls: !0,
          playPause: !0,
          progressBar: !0,
          time: !0,
          volume: !0,
          fullscreen: !1,
          poster: "../../img/poster.jpg",
          bigPlay: !0,
          autoHide: !1,
          playsinline: !1,
          loop: !1,
          muted: !1,
          providerParams: {},
        },
      }))
    : console.log("Нет видео :("),
    (window.FLS = !0),
    (function (e) {
      let t = new Image();
      (t.onload = t.onerror =
        function () {
          e(2 == t.height);
        }),
        (t.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let t = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(t);
    }),
    (function () {
      let e = document.querySelector(".icon-menu");
      e &&
        e.addEventListener("click", function (e) {
          n &&
            (((e = 500) => {
              document.documentElement.classList.contains("lock") ? r(e) : o(e);
            })(),
            document.documentElement.classList.toggle("menu-open"));
        });
    })(),
    (function () {
      const e = document.querySelectorAll("[data-spollers]");
      if (e.length > 0) {
        const t = Array.from(e).filter(function (e, t, s) {
          return !e.dataset.spollers.split(",")[0];
        });
        t.length && r(t);
        let n = h(e, "spollers");
        function r(e, t = !1) {
          e.forEach((e) => {
            (e = t ? e.item : e),
              t.matches || !t
                ? (e.classList.add("_spoller-init"),
                  o(e),
                  e.addEventListener("click", l))
                : (e.classList.remove("_spoller-init"),
                  o(e, !1),
                  e.removeEventListener("click", l));
          });
        }
        function o(e, t = !0) {
          let s = e.querySelectorAll("[data-spoller]");
          s.length &&
            ((s = Array.from(s).filter(
              (t) => t.closest("[data-spollers]") === e
            )),
            s.forEach((e) => {
              t
                ? (e.removeAttribute("tabindex"),
                  e.classList.contains("_spoller-active") ||
                    (e.nextElementSibling.hidden = !0))
                : (e.setAttribute("tabindex", "-1"),
                  (e.nextElementSibling.hidden = !1));
            }));
        }
        function l(e) {
          const t = e.target;
          if (t.closest("[data-spoller]")) {
            const n = t.closest("[data-spoller]"),
              r = n.closest("[data-spollers]"),
              o = !!r.hasAttribute("data-one-spoller");
            r.querySelectorAll("._slide").length ||
              (o && !n.classList.contains("_spoller-active") && a(r),
              n.classList.toggle("_spoller-active"),
              ((e, t = 500) => {
                e.hidden ? i(e, t) : s(e, t);
              })(n.nextElementSibling, 500)),
              e.preventDefault();
          }
        }
        function a(e) {
          const t = e.querySelector("[data-spoller]._spoller-active");
          t &&
            (t.classList.remove("_spoller-active"),
            s(t.nextElementSibling, 500));
        }
        n &&
          n.length &&
          n.forEach((e) => {
            e.matchMedia.addEventListener("change", function () {
              r(e.itemsArray, e.matchMedia);
            }),
              r(e.itemsArray, e.matchMedia);
          });
      }
    })();
})();

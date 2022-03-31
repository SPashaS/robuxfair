/*!
 * @license MIT
 * @name vlitejs
 * @version 4.0.4
 * @copyright 2021 Yoriiis aka Joris DANIEL
 */
!(function (e, t) {
    "object" == typeof exports && "object" == typeof module ? (module.exports = t()) : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? (exports.Vlitejs = t()) : (e.Vlitejs = t());
})(globalThis, function () {
    return (() => {
        var e = {
                555: (e, t, s) => {
                    var i;
                    void 0 ===
                        (i = function (e, t) {
                            "use strict";
                            Object.defineProperty(t, "__esModule", { value: !0 }), (t.initializePlugins = t.registerPlugin = t.getPluginInstance = void 0);
                            const s = {};
                            function i(e) {
                                const t = [],
                                    i = Object.keys(s);
                                return (
                                    e.forEach((e) => {
                                        if (!i.includes(e)) throw new Error(`vlitejs :: Unknown plugin "${e}".`);
                                        t.push({ id: e, Plugin: s[e] });
                                    }),
                                    t
                                );
                            }
                            (t.getPluginInstance = i),
                                (t.registerPlugin = function (e, t) {
                                    if (void 0 !== t) {
                                        if (!Object.keys(s).includes(e)) return void (s[e] = t);
                                        throw new Error(`vlitejs :: The plugin id "${e}" is already registered.`);
                                    }
                                    throw new Error(`vlitejs :: The plugin id "${e}" is undefined.`);
                                }),
                                (t.initializePlugins = function ({ plugins: e, provider: t, type: s, player: n }) {
                                    i(e).forEach(({ id: e, Plugin: i }) => {
                                        const r = new i({ player: n });
                                        if (((n.plugins[e] = r), !r.providers.includes(t) || !r.types.includes(s))) throw new Error(`vlitejs :: The "${e}" plugin is only compatible with providers:"${r.providers}" and types:"${r.types}"`);
                                        r.init();
                                    });
                                });
                        }.apply(t, [s, t])) || (e.exports = i);
                },
                571: (e, t, s) => {
                    var i;
                    void 0 ===
                        (i = function (e, t) {
                            "use strict";
                            Object.defineProperty(t, "__esModule", { value: !0 }),
                                (t.default = function (e) {
                                    return class extends e {
                                        constructor(e) {
                                            super(e),
                                                (this.events = [
                                                    { type: "timeupdate", listener: super.onTimeUpdate },
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
                                                this.media.addEventListener("loadedmetadata", e, { once: !0 }), this.media.addEventListener("canplay", e, { once: !0 });
                                            });
                                        }
                                        addSpecificEvents() {
                                            this.events.forEach((e) => {
                                                this.media.addEventListener(e.type, e.listener.bind(this));
                                            });
                                        }
                                        getInstance() {
                                            return this.media;
                                        }
                                        getCurrentTime() {
                                            return new window.Promise((e) => e(this.media.currentTime));
                                        }
                                        getDuration() {
                                            return new window.Promise((e) => e(this.media.duration));
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
                                            return new window.Promise((e) => e(this.media.volume));
                                        }
                                        methodMute() {
                                            (this.media.muted = !0), this.media.setAttribute("muted", "");
                                        }
                                        methodUnMute() {
                                            (this.media.muted = !1), this.media.removeAttribute("muted");
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
                                "use strict";
                                Object.defineProperty(t, "__esModule", { value: !0 }), (t.registerProvider = t.getProviderInstance = void 0);
                                const i = { html5: (s = r(s)).default };
                                (t.getProviderInstance = function (e, t) {
                                    const s = i[e];
                                    if (s) return s(t);
                                    throw new Error(`vlitejs :: Unknown provider "${e}"`);
                                }),
                                    (t.registerProvider = function (e, t) {
                                        if (void 0 !== t) {
                                            if (!Object.keys(i).includes(e)) return void (i[e] = t);
                                            throw new Error(`vlitejs :: The provider id "${e}" is already registered.`);
                                        }
                                        throw new Error(`vlitejs :: The provider id "${e}" is undefined.`);
                                    });
                            }.apply(t, i)) || (e.exports = n);
                },
                158: (e, t, s) => {
                    var i;
                    void 0 ===
                        (i = function (e, t) {
                            "use strict";
                            function s() {
                                if (document.exitFullscreen instanceof Function) return "";
                                return ["webkit", "moz", "ms"].find((e) => document[e + "ExitFullscreen"] instanceof Function || document[`${e}CancelFullScreen`] instanceof Function) || "";
                            }
                            Object.defineProperty(t, "__esModule", { value: !0 }),
                                (t.isTouch = t.getCSSTransitionDuration = t.getBrowserPrefix = t.checkSupportFullScreen = t.formatVideoTime = void 0),
                                (t.formatVideoTime = function (e) {
                                    const t = 1e3 * e,
                                        s = (t / 1e3 / 60) << 0,
                                        i = (t / 1e3) % 60 << 0;
                                    let n = "";
                                    return (n += s < 10 ? "0" : ""), (n += s + ":"), (n += i < 10 ? "0" : ""), (n += i), n;
                                }),
                                (t.checkSupportFullScreen = function () {
                                    const e = s();
                                    return {
                                        requestFn: e ? `${e}RequestFullScreen` : "requestFullscreen",
                                        cancelFn: e ? `${e}ExitFullscreen` : "exitFullscreen",
                                        changeEvent: e ? `${e}fullscreenchange` : "fullscreenchange",
                                        isFullScreen: e ? `${e}FullscreenElement` : "fullscreenElement",
                                    };
                                }),
                                (t.getBrowserPrefix = s),
                                (t.getCSSTransitionDuration = function ({ target: e, isMilliseconds: t = !1 }) {
                                    return parseFloat(window.getComputedStyle(e).transitionDuration) * (t ? 1e3 : 1);
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
                                "use strict";
                                Object.defineProperty(t, "__esModule", { value: !0 }), (i = r(i));
                                t.default = class {
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
                                            (this.controlBar = new i.default({ player: this, type: t }));
                                    }
                                    build() {
                                        this.options.controls && this.controlBar.init(), this.init();
                                    }
                                    init() {
                                        throw new Error('You have to implement the function "init".');
                                    }
                                    waitUntilVideoIsReady() {
                                        throw new Error('You have to implement the function "waitUntilVideoIsReady".');
                                    }
                                    getInstance() {
                                        throw new Error('You have to implement the function "getInstance".');
                                    }
                                    getCurrentTime() {
                                        throw new Error('You have to implement the function "getCurrentTime".');
                                    }
                                    methodSeekTo(e) {
                                        throw new Error('You have to implement the function "methodSeekTo".');
                                    }
                                    getDuration() {
                                        throw new Error('You have to implement the function "getDuration".');
                                    }
                                    methodPlay() {
                                        throw new Error('You have to implement the function "methodPlay".');
                                    }
                                    methodPause() {
                                        throw new Error('You have to implement the function "methodPause".');
                                    }
                                    methodSetVolume(e) {
                                        throw new Error('You have to implement the function "methodSetVolume".');
                                    }
                                    methodGetVolume() {
                                        throw new Error('You have to implement the function "methodGetVolume".');
                                    }
                                    methodMute() {
                                        throw new Error('You have to implement the function "methodMute".');
                                    }
                                    methodUnMute() {
                                        throw new Error('You have to implement the function "methodUnMute".');
                                    }
                                    onReady() {
                                        this.options.muted && this.mute(),
                                            this.media.setAttribute("tabindex", "-1"),
                                            this.options.autoplay && (!this.media.muted && this.mute(), this.play()),
                                            this.options.controls && this.controlBar.onReady(),
                                            Object.keys(this.plugins).forEach((e) => {
                                                this.plugins[e].onReady instanceof Function && this.plugins[e].onReady();
                                            }),
                                            this.loading(!1),
                                            this.Vlitejs.onReady instanceof Function && this.Vlitejs.onReady.call(this, this);
                                    }
                                    on(e, t) {
                                        t instanceof Function && (this.playerEvents.push({ type: e, listener: t }), this.elements.container.addEventListener(e, t));
                                    }
                                    dispatchEvent(e) {
                                        this.elements.container.dispatchEvent(new Event(e));
                                    }
                                    loading(e) {
                                        this.elements.container.classList[e ? "add" : "remove"]("v-loading"), this.dispatchEvent("progress");
                                    }
                                    onTimeUpdate() {
                                        this.options.time &&
                                            Promise.all([this.getCurrentTime(), this.getDuration()]).then(([e, t]) => {
                                                const i = Math.round(e);
                                                if (this.elements.progressBar) {
                                                    const s = (100 * i) / t;
                                                    (this.elements.progressBar.value = `${s}`), this.elements.progressBar.style.setProperty("--value", `${s}%`), this.elements.progressBar.setAttribute("aria-valuenow", `${Math.round(e)}`);
                                                }
                                                this.elements.currentTime && (this.elements.currentTime.innerHTML = s.formatVideoTime(i)), this.dispatchEvent("timeupdate");
                                            });
                                    }
                                    onMediaEnded() {
                                        this.options.loop ? this.play() : (this.elements.container.classList.replace("v-playing", "v-paused"), this.elements.container.classList.add("v-firstStart")),
                                            this.elements.poster && this.elements.poster.classList.add("v-active"),
                                            this.elements.progressBar && ((this.elements.progressBar.value = "0"), this.elements.progressBar.style.setProperty("--value", "0%"), this.elements.progressBar.removeAttribute("aria-valuenow")),
                                            this.elements.currentTime && (this.elements.currentTime.innerHTML = "00:00"),
                                            this.dispatchEvent("ended");
                                    }
                                    play() {
                                        this.elements.container.classList.contains("v-firstStart") &&
                                            (this.elements.container.classList.remove("v-firstStart"), "video" === this.type && this.elements.poster && this.elements.poster.classList.remove("v-active")),
                                            this.methodPlay(),
                                            (this.isPaused = !1),
                                            this.elements.container.classList.replace("v-paused", "v-playing"),
                                            this.elements.playPause && (this.elements.playPause.setAttribute("aria-label", "Pause"), this.elements.playPause.classList.add("v-controlPressed")),
                                            "video" === this.type && this.elements.bigPlay && this.elements.bigPlay.setAttribute("aria-label", "Pause"),
                                            this.afterPlayPause(),
                                            this.dispatchEvent("play");
                                    }
                                    pause() {
                                        this.methodPause(),
                                            (this.isPaused = !0),
                                            this.elements.container.classList.replace("v-playing", "v-paused"),
                                            this.elements.playPause && (this.elements.playPause.setAttribute("aria-label", "Play"), this.elements.playPause.classList.remove("v-controlPressed")),
                                            "video" === this.type && this.elements.bigPlay && this.elements.bigPlay.setAttribute("aria-label", "Play"),
                                            this.afterPlayPause(),
                                            this.dispatchEvent("pause");
                                    }
                                    afterPlayPause() {
                                        this.Vlitejs.autoHideGranted && (this.Vlitejs.stopAutoHideTimer(), !this.isPaused && this.Vlitejs.startAutoHideTimer());
                                    }
                                    setVolume(e) {
                                        e > 1
                                            ? (e = 1)
                                            : e <= 0
                                            ? ((e = 0), (this.isMuted = !0), this.elements.volume && this.elements.volume.classList.add("v-controlPressed"))
                                            : ((this.isMuted = !1), this.elements.volume && this.elements.volume.classList.remove("v-controlPressed")),
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
                                            this.elements.volume && (this.elements.volume.classList.add("v-controlPressed"), this.elements.volume.setAttribute("aria-label", "Unmute")),
                                            this.dispatchEvent("volumechange");
                                    }
                                    unMute() {
                                        this.methodUnMute(),
                                            (this.isMuted = !1),
                                            this.elements.volume && (this.elements.volume.classList.remove("v-controlPressed"), this.elements.volume.setAttribute("aria-label", "Mute")),
                                            this.dispatchEvent("volumechange");
                                    }
                                    seekTo(e) {
                                        this.methodSeekTo(e);
                                    }
                                    requestFullscreen() {
                                        const { requestFn: e } = this.Vlitejs.supportFullScreen;
                                        this.media[e] &&
                                            (this.elements.container[e](),
                                            (this.isFullScreen = !0),
                                            this.elements.container.classList.add("v-fullscreenButton-display"),
                                            this.elements.fullscreen && (this.elements.fullscreen.classList.add("v-controlPressed"), this.elements.fullscreen.setAttribute("aria-label", "Exit fullscreen")),
                                            this.dispatchEvent("enterfullscreen"));
                                    }
                                    exitFullscreen({ escKey: e = !1 } = {}) {
                                        const { cancelFn: t } = this.Vlitejs.supportFullScreen;
                                        document[t] &&
                                            (!e && document[t](),
                                            (this.isFullScreen = !1),
                                            this.elements.container.classList.remove("v-fullscreenButton-display"),
                                            this.elements.fullscreen && (this.elements.fullscreen.classList.remove("v-controlPressed"), this.elements.fullscreen.setAttribute("aria-label", "Enter fullscreen")),
                                            this.dispatchEvent("exitfullscreen"));
                                    }
                                    destroy() {
                                        this.controlBar && this.controlBar.destroy(),
                                            Object.keys(this.plugins).forEach((e) => {
                                                this.plugins[e].destroy instanceof Function && this.plugins[e].destroy();
                                            }),
                                            this.playerEvents.forEach((e) => {
                                                this.elements.container.removeEventListener(e.type, e.listener);
                                            }),
                                            this.elements.container.remove();
                                    }
                                };
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
                    (i = [s, t, s(711), s(341), s(158), s(261), s(295), s(266), s(685), s(390), s(555)]),
                        void 0 ===
                            (n = function (e, t, s, i, n, o, l, a, u, c, h) {
                                "use strict";
                                Object.defineProperty(t, "__esModule", { value: !0 }), (s = r(s)), (i = r(i)), (o = r(o)), (l = r(l)), (a = r(a)), (u = r(u));
                                const d = {
                                    audio: { controls: !0, autoplay: !1, playPause: !0, progressBar: !0, time: !0, volume: !0, loop: !1 },
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
                                    constructor(e, { options: t = {}, provider: i = "html5", plugins: r = [], onReady: o = !1 } = {}) {
                                        if ("string" == typeof e) this.media = document.querySelector(e);
                                        else {
                                            if (!(e instanceof HTMLVideoElement || e instanceof HTMLAudioElement || e instanceof HTMLDivElement)) throw new TypeError("vlitejs :: The element or selector supplied is not valid.");
                                            this.media = e;
                                        }
                                        (this.provider = i), (this.onReady = o), (this.delayAutoHide = 3e3), (this.type = this.media instanceof HTMLAudioElement ? "audio" : "video"), (this.supportFullScreen = n.checkSupportFullScreen());
                                        ["autoplay", "playsinline", "muted", "loop"].forEach((e) => {
                                            this.media.hasAttribute(e) ? (t[e] = !0) : t[e] && this.media.setAttribute(e, "");
                                        }),
                                            (this.options = Object.assign(Object.assign({}, d[this.type]), t)),
                                            (this.autoHideGranted = "video" === this.type && !!this.options.autoHide && !!this.options.controls),
                                            (this.onClickOnPlayer = this.onClickOnPlayer.bind(this)),
                                            (this.onDoubleClickOnPlayer = this.onDoubleClickOnPlayer.bind(this)),
                                            (this.onKeydown = this.onKeydown.bind(this)),
                                            (this.onMousemove = this.onMousemove.bind(this)),
                                            (this.onChangeFullScreen = this.onChangeFullScreen.bind(this));
                                        const l = c.getProviderInstance(i, s.default);
                                        this.wrapElement(),
                                            (this.container = this.media.parentNode),
                                            "video" === this.type && this.renderLayout(),
                                            (this.player = new l({ type: this.type, Vlitejs: this })),
                                            this.player.build(),
                                            this.addEvents(),
                                            h.initializePlugins({ plugins: r, provider: i, type: this.type, player: this.player });
                                    }
                                    wrapElement() {
                                        const e = document.createElement("div");
                                        e.classList.add("v-vlite", "v-firstStart", "v-paused", "v-loading", `v-${this.type}`), e.setAttribute("tabindex", "0");
                                        this.media.parentNode.insertBefore(e, this.media), e.appendChild(this.media);
                                    }
                                    renderLayout() {
                                        const e = `\n\t\t\t${a.default()}\n\t\t\t${o.default()}\n\t\t\t${this.options.poster ? u.default({ posterUrl: this.options.poster }) : ""}\n\t\t\t${this.options.bigPlay ? l.default() : ""}\n\t\t`;
                                        this.container.insertAdjacentHTML("beforeend", e);
                                    }
                                    addEvents() {
                                        "video" === this.type &&
                                            (this.container.addEventListener("click", this.onClickOnPlayer),
                                            this.container.addEventListener("dblclick", this.onDoubleClickOnPlayer),
                                            this.autoHideGranted && this.container.addEventListener("mousemove", this.onMousemove),
                                            window.addEventListener(this.supportFullScreen.changeEvent, this.onChangeFullScreen)),
                                            this.container.addEventListener("keydown", this.onKeydown);
                                    }
                                    onClickOnPlayer(e) {
                                        const t = e.target;
                                        i.default({ target: t, selectorString: ".v-poster, .v-overlay, .v-bigPlay", nodeName: ["div", "button"] }) &&
                                            (this.player.controlBar.togglePlayPause(e), t.matches(".v-bigPlay") && this.container.focus());
                                    }
                                    onDoubleClickOnPlayer(e) {
                                        const t = e.target;
                                        i.default({ target: t, selectorString: ".v-overlay", nodeName: ["div"] }) && this.player.controlBar.toggleFullscreen(e);
                                    }
                                    onKeydown(e) {
                                        const t = document.activeElement,
                                            { keyCode: s } = e;
                                        [9, 32, 37, 39].includes(s) && this.autoHideGranted && (t === this.container || (null == t ? void 0 : t.closest(".v-vlite"))) && (this.stopAutoHideTimer(), this.startAutoHideTimer()),
                                            ![37, 39].includes(s) ||
                                                (t !== this.container && t !== this.player.elements.progressBar) ||
                                                (e.preventDefault(), 37 === s ? this.fastForward("backward") : 39 === s && this.fastForward("forward")),
                                            ![38, 40].includes(s) ||
                                                (t !== this.container && t !== this.player.elements.volume) ||
                                                (38 === s ? (this.animateVolumeButton(), this.increaseVolume()) : 40 === s && (this.animateVolumeButton(), this.decreaseVolume())),
                                            32 === s && t === this.container && this.player.controlBar.togglePlayPause(e);
                                    }
                                    onMousemove() {
                                        this.player.isPaused || (this.stopAutoHideTimer(), this.startAutoHideTimer());
                                    }
                                    onChangeFullScreen(e) {
                                        !document[this.supportFullScreen.isFullScreen] && this.player.isFullScreen && this.player.exitFullscreen({ escKey: !0 });
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
                                            const e = n.getCSSTransitionDuration({ target: this.player.elements.volume, isMilliseconds: !0 });
                                            this.player.elements.volume.classList.add("v-animate"), setTimeout(() => this.player.elements.volume.classList.remove("v-animate"), e);
                                        }
                                    }
                                    stopAutoHideTimer() {
                                        "video" === this.type && this.player.elements.controlBar && (this.player.elements.controlBar.classList.remove("hidden"), clearTimeout(this.timerAutoHide));
                                    }
                                    startAutoHideTimer() {
                                        "video" === this.type &&
                                            !this.player.isPaused &&
                                            this.player.elements.controlBar &&
                                            (this.timerAutoHide = window.setTimeout(() => {
                                                this.player.elements.controlBar.classList.add("hidden");
                                            }, this.delayAutoHide));
                                    }
                                    removeEvents() {
                                        this.container.removeEventListener("keydown", this.onKeydown),
                                            "video" === this.type &&
                                                (this.container.removeEventListener("click", this.onClickOnPlayer),
                                                this.container.removeEventListener("dblclick", this.onDoubleClickOnPlayer),
                                                this.autoHideGranted && this.container.removeEventListener("mousemove", this.onMousemove),
                                                window.removeEventListener(this.supportFullScreen.changeEvent, this.onChangeFullScreen));
                                    }
                                    destroy() {
                                        this.removeEvents(), this.player.destroy(), this.player.controlBar.destroy();
                                    }
                                }
                                (p.registerProvider = c.registerProvider), (p.registerPlugin = h.registerPlugin), (t.default = p);
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
                                "use strict";
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
                                "use strict";
                                Object.defineProperty(t, "__esModule", { value: !0 }), (i = r(i)), (n = r(n));
                                t.default = class {
                                    constructor({ player: e, type: t }) {
                                        (this.player = e),
                                            (this.type = t),
                                            (this.touchEvents = ["touchstart", "touchmove", "touchend"]),
                                            (this.onInputProgressBar = this.onInputProgressBar.bind(this)),
                                            (this.onTouchEventProgressBar = this.onTouchEventProgressBar.bind(this)),
                                            (this.onClickOnControlBar = this.onClickOnControlBar.bind(this)),
                                            (this.togglePlayPause = this.togglePlayPause.bind(this)),
                                            (this.toggleVolume = this.toggleVolume.bind(this)),
                                            (this.toggleFullscreen = this.toggleFullscreen.bind(this));
                                    }
                                    init() {
                                        this.render(), this.cacheElements(), this.addEvents();
                                    }
                                    cacheElements() {
                                        const e = this.player.elements.container.querySelector(".v-controlBar");
                                        (this.player.elements.controlBar = e),
                                            this.player.elements.controlBar &&
                                                ((this.player.elements.playPause = e.querySelector(".v-playPauseButton")),
                                                (this.player.elements.progressBar = e.querySelector(".v-progressBar")),
                                                (this.player.elements.currentTime = e.querySelector(".v-currentTime")),
                                                (this.player.elements.duration = e.querySelector(".v-duration")),
                                                (this.player.elements.volume = e.querySelector(".v-volumeButton")),
                                                (this.player.elements.fullscreen = e.querySelector(".v-fullscreenButton")),
                                                this.player.elements.volume && this.player.elements.volume.setAttribute("aria-label", this.player.isMuted ? "Unmute" : "Mute"));
                                    }
                                    render() {
                                        this.player.elements.container.insertAdjacentHTML("beforeend", this.getTemplate());
                                    }
                                    onReady() {
                                        this.player.getDuration().then((e) => {
                                            this.player.elements.progressBar && this.player.elements.progressBar.setAttribute("aria-valuemax", `${Math.round(e)}`),
                                                this.player.elements.duration && (this.player.elements.duration.innerHTML = s.formatVideoTime(e));
                                        });
                                    }
                                    addEvents() {
                                        this.player.elements.progressBar &&
                                            (this.player.elements.progressBar.addEventListener("input", this.onInputProgressBar),
                                            this.player.isTouch &&
                                                this.touchEvents.forEach((e) => {
                                                    this.player.elements.progressBar.addEventListener(e, this.onTouchEventProgressBar);
                                                })),
                                            this.player.elements.controlBar && this.player.elements.controlBar.addEventListener("click", this.onClickOnControlBar);
                                    }
                                    onTouchEventProgressBar(e) {
                                        e.preventDefault();
                                        const t = e.target,
                                            s = parseFloat(t.getAttribute("max") || "100"),
                                            i = t.getBoundingClientRect(),
                                            n = ((e.changedTouches[0].clientX - i.left) / i.width) * 100;
                                        (t.value = "" + (100 * n) / s), t.dispatchEvent(new Event("input"));
                                    }
                                    onInputProgressBar(e) {
                                        const t = e.target;
                                        t.style.setProperty("--value", `${t.value}%`),
                                            this.player.elements.container.classList.contains("v-firstStart") && this.player.play(),
                                            this.player.getDuration().then((e) => {
                                                this.player.seekTo((parseFloat(t.value) * e) / 100);
                                            });
                                    }
                                    onClickOnControlBar(e) {
                                        const t = e.target,
                                            s = i.default({ target: t, selectorString: ".v-playPauseButton", nodeName: ["button"] }),
                                            n = i.default({ target: t, selectorString: ".v-volumeButton", nodeName: ["button"] }),
                                            r = i.default({ target: t, selectorString: ".v-fullscreenButton", nodeName: ["button"] });
                                        s ? this.togglePlayPause(e) : n ? this.toggleVolume(e) : r && this.toggleFullscreen(e);
                                    }
                                    togglePlayPause(e) {
                                        e.preventDefault(), this.player.elements.container.classList.contains("v-paused") ? this.player.play() : this.player.pause();
                                    }
                                    toggleVolume(e) {
                                        e.preventDefault(), this.player.elements.volume.classList.contains("v-controlPressed") ? this.player.unMute() : this.player.mute();
                                    }
                                    toggleFullscreen(e) {
                                        e.preventDefault(), this.player.isFullScreen ? this.player.exitFullscreen() : this.player.requestFullscreen();
                                    }
                                    getTemplate() {
                                        return `${n.default({ options: this.player.options, isMuted: this.player.isMuted, type: this.type })}`;
                                    }
                                    removeEvents() {
                                        this.player.elements.progressBar &&
                                            (this.player.elements.progressBar.removeEventListener("input", this.onInputProgressBar),
                                            this.player.isTouch &&
                                                this.touchEvents.forEach((e) => {
                                                    this.player.elements.progressBar.removeEventListener(e, this.onTouchEventProgressBar);
                                                })),
                                            this.player.elements.controlBar && this.player.elements.controlBar.removeEventListener("click", this.onClickOnControlBar);
                                    }
                                    destroy() {
                                        this.removeEvents(), this.player.elements.controlBar && this.player.elements.controlBar.remove();
                                    }
                                };
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
                                "use strict";
                                Object.defineProperty(t, "__esModule", { value: !0 }),
                                    (s = r(s)),
                                    (i = r(i)),
                                    (n = r(n)),
                                    (o = r(o)),
                                    (l = r(l)),
                                    (a = r(a)),
                                    (t.default = function ({ options: e, isMuted: t, type: r }) {
                                        return `<div class="v-controlBar">${e.playPause ? `<button class="v-playPauseButton v-controlButton" aria-label="Play">${s.default}${i.default}</button>` : ""}${
                                            e.time ? '<div class="v-time"><span class="v-currentTime">00:00</span>&nbsp;/&nbsp;<span class="v-duration"></span></div>' : ""
                                        }${e.progressBar ? '<input type="range" class="v-progressBar" min="0" max="100" step="0.01" value="0" aria-label="Seek" aria-valuemin="0" />' : ""}${
                                            e.volume
                                                ? (function ({ isMuted: e }) {
                                                      return `<button class="v-volumeButton v-controlButton${e ? " v-controlPressed" : ""}">${n.default}${o.default}</button>`;
                                                  })({ isMuted: t })
                                                : ""
                                        }${e.fullscreen ? `<button class="v-fullscreenButton v-controlButton" aria-label="Enter fullscreen">${l.default}${a.default}</span></button>` : ""}</div>`;
                                    });
                            }.apply(t, i)) || (e.exports = n);
                },
                261: (e, t, s) => {
                    var i;
                    void 0 ===
                        (i = function (e, t) {
                            "use strict";
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
                            "use strict";
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
                            "use strict";
                            Object.defineProperty(t, "__esModule", { value: !0 }),
                                (t.default = function ({ posterUrl: e = "" }) {
                                    return `<div class="v-poster v-active"${e && ` style="background-image: url(${e})"`}></div>`;
                                });
                        }.apply(t, [s, t])) || (e.exports = i);
                },
                420: (e, t, s) => {
                    "use strict";
                    s(295);
                },
                439: (e, t, s) => {
                    "use strict";
                    s(61);
                },
                97: (e, t, s) => {
                    "use strict";
                    s(261);
                },
                736: (e, t, s) => {
                    "use strict";
                    s(266);
                },
                315: (e, t, s) => {
                    "use strict";
                    s(685);
                },
                341: (e) => {
                    /**
                     * @license MIT
                     * @name validateTarget
                     * @version 2.0.0
                     * @author: Yoriiis aka Joris DANIEL <joris.daniel@gmail.com>
                     * @description: Easily validate target of an HTML element especially during event delegation
                     * {@link https://github.com/yoriiis/validate-target}
                     * @copyright 2020 Joris DANIEL
                     **/
                    e.exports = function ({ target: e, selectorString: t, nodeName: s }) {
                        if (("string" == typeof s && (s = [s]), Array.isArray(s) && s.length)) return s.map((s) => e.nodeName.toLowerCase() === s && e.matches(t)).includes(!0);
                    };
                },
                363: (e) => {
                    "use strict";
                    e.exports =
                        '\n';
                },
                299: (e) => {
                    "use strict";
                    e.exports =
                        '<svg class="v-iconPressed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 16h2v2c0 .55.45 1 1 1s1-.45 1-1v-3c0-.55-.45-1-1-1H6c-.55 0-1 .45-1 1s.45 1 1 1zm2-8H6c-.55 0-1 .45-1 1s.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1s-1 .45-1 1v2zm7 11c.55 0 1-.45 1-1v-2h2c.55 0 1-.45 1-1s-.45-1-1-1h-3c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1zm1-11V6c0-.55-.45-1-1-1s-1 .45-1 1v3c0 .55.45 1 1 1h3c.55 0 1-.45 1-1s-.45-1-1-1h-2z"/></svg>\n';
                },
                804: (e) => {
                    "use strict";
                    e.exports =
                        '<svg class="v-iconUnpressed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 14c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h3c.55 0 1-.45 1-1s-.45-1-1-1H7v-2c0-.55-.45-1-1-1zm0-4c.55 0 1-.45 1-1V7h2c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1zm11 7h-2c-.55 0-1 .45-1 1s.45 1 1 1h3c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1s-1 .45-1 1v2zM14 6c0 .55.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1V6c0-.55-.45-1-1-1h-3c-.55 0-1 .45-1 1z"/></svg>\n';
                },
                951: (e) => {
                    "use strict";
                    e.exports =
                        '<svg class="v-iconPressed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2zm6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2z"/></svg>\n';
                },
                169: (e) => {
                    "use strict";
                    e.exports =
                        '<svg class="v-iconUnpressed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 000-1.69L9.54 5.98A.998.998 0 008 6.82z"/></svg>\n';
                },
                418: (e) => {
                    "use strict";
                    e.exports =
                        '<svg class="v-iconUnpressed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.34-1.71-.71L7 9H4c-.55 0-1 .45-1 1zm13.5 2A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 4.45v.2c0 .38.25.71.6.85C17.18 6.53 19 9.06 19 12s-1.82 5.47-4.4 6.5c-.36.14-.6.47-.6.85v.2c0 .63.63 1.07 1.21.85C18.6 19.11 21 15.84 21 12s-2.4-7.11-5.79-8.4c-.58-.23-1.21.22-1.21.85z"/></svg>\n';
                },
                569: (e) => {
                    "use strict";
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
                for (var i in t) s.o(t, i) && !s.o(e, i) && Object.defineProperty(e, i, { enumerable: !0, get: t[i] });
            }),
            (s.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t));
        var i = {};
        return (
            (() => {
                "use strict";
                s.d(i, { default: () => n });
                var e = s(206),
                    t = s.n(e);
                s(97), s(439), s(420), s(736), s(315);
                const n = t();
            })(),
            (i = i.default)
        );
    })();
});

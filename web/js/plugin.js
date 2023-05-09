//ie8-eventlistener.js
-[1,] || (function () {
    //为window对象添加
    addEventListener = function (n, f) {
        if ("on" + n in this.constructor.prototype)
            this.attachEvent("on" + n, f); else {
            var o = this.customEvents = this.customEvents || {};
            n in o ? o[n].push(f) : (o[n] = [f]);
        }
        ;
    };
    removeEventListener = function (n, f) {
        if ("on" + n in this.constructor.prototype)
            this.detachEvent("on" + n, f); else {
            var s = this.customEvents && this.customEvents[n];
            if (s)
                for (var i = 0; i < s.length; i++)
                    if (s[i] == f) return void s.splice(i, 1);
        }
        ;
    };
    dispatchEvent = function (e) {
        if ("on" + e.type in this.constructor.prototype)
            this.fireEvent("on" + e.type, e); else {
            var s = this.customEvents && this.customEvents[e.type];
            if (s)
                for (var s = s.slice(0), i = 0; i < s.length; i++)
                    s[i].call(this, e);
        }
    };
    //为document对象添加
    HTMLDocument.prototype.addEventListener = addEventListener;
    HTMLDocument.prototype.removeEventListener = removeEventListener;
    HTMLDocument.prototype.dispatchEvent = dispatchEvent;
    HTMLDocument.prototype.createEvent = function () {
        var e = document.createEventObject();
        e.initMouseEvent = function (en) {
            this.type = en;
        };
        e.initEvent = function (en) {
            this.type = en;
        };
        return e;
    };
    //为全元素添加
    var tags = [
            "Unknown", "UList", "Title", "TextArea", "TableSection", "TableRow",
            "Table", "TableCol", "TableCell", "TableCaption", "Style", "Span",
            "Select", "Script", "Param", "Paragraph", "Option", "Object", "OList",
            "Meta", "Marquee", "Map", "Link", "Legend", "Label", "LI", "Input",
            "Image", "IFrame", "Html", "Heading", "Head", "HR", "FrameSet",
            "Frame", "Form", "Font", "FieldSet", "Embed", "Div", "DList",
            "Button", "Body", "Base", "BR", "Area", "Anchor"
        ],
        html5tags = [
            "abbr", "article", "aside", "audio", "canvas", "datalist", "details",
            "dialog", "eventsource", "figure", "footer", "header", "hgroup", "mark",
            "menu", "meter", "nav", "output", "progress", "section", "time", "video"
        ],
        properties = {
            addEventListener: {
                value: addEventListener
            },
            removeEventListener: {
                value: removeEventListener
            },
            dispatchEvent: {
                value: dispatchEvent
            }
        };
    for (var o, n, i = 0; o = window["HTML" + tags[i] + "Element"]; i++)
        tags[i] = o.prototype;
    for (i = 0; i < html5tags.length; i++)
        tags.push(document.createElement(html5tags[i]).constructor.prototype);
    for (i = 0; o = tags[i]; i++)
        for (n in properties) Object.defineProperty(o, n, properties[n]);
})();

//https://github.com/serkanyersen/ifvisible.js
(function () {
    !function (a, b) {
        return "function" == typeof define && define.amd ? define(function () {
            return b()
        }) : "object" == typeof exports ? module.exports = b() : a.ifvisible = b()
    }(this, function () {
        var a,
            b,
            c,
            d,
            e,
            f,
            g,
            h,
            i,
            j,
            k,
            l,
            m,
            n;
        return i = {}, c = document, k = !1, l = "active", g = 6e4, f = !1, b = function () {
            var a,
                b,
                c,
                d,
                e,
                f,
                g;
            return a = function () {
                return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
            }, e = function () {
                return a() + a() + "-" + a() + "-" + a() + "-" + a() + "-" + a() + a() + a()
            }, f = {}, c = "__ceGUID", b = function (a, b, d) {
                return a[c] = void 0, a[c] || (a[c] = "ifvisible.object.event.identifier"), f[a[c]] || (f[a[c]] = {}), f[a[c]][b] || (f[a[c]][b] = []), f[a[c]][b].push(d)
            }, d = function (a, b, d) {
                var e,
                    g,
                    h,
                    i,
                    j;
                if (a[c] && f[a[c]] && f[a[c]][b]) {
                    for (i = f[a[c]][b], j = [], g = 0, h = i.length; g < h; g++) e = i[g], j.push(e(d || {}));
                    return j
                }
            }, g = function (a, b, d) {
                var e,
                    g,
                    h,
                    i,
                    j;
                if (d) {
                    if (a[c] && f[a[c]] && f[a[c]][b])
                        for (j = f[a[c]][b], g = h = 0, i = j.length; h < i; g = ++h)
                            if (e = j[g], e === d) return f[a[c]][b].splice(g, 1), e
                } else if (a[c] && f[a[c]] && f[a[c]][b]) return delete f[a[c]][b]
            }, {
                add: b,
                remove: g,
                fire: d
            }
        }(), a = function () {
            var a;
            return a = !1, function (b, c, d) {
                return a || (a = b.addEventListener ? function (a, b, c) {
                    return a.addEventListener(b, c, !1)
                } : b.attachEvent ? function (a, b, c) {
                    return a.attachEvent("on" + b, c, !1)
                } : function (a, b, c) {
                    return a["on" + b] = c
                }), a(b, c, d)
            }
        }(), d = function (a, b) {
            var d;
            return c.createEventObject ? a.fireEvent("on" + b, d) : (d = c.createEvent("HTMLEvents"), d.initEvent(b, !0, !0), !a.dispatchEvent(d))
        }, h = function () {
            var a,
                b,
                d,
                e,
                f;
            for (e = void 0, f = 3, d = c.createElement("div"), a = d.getElementsByTagName("i"), b = function () {
                return d.innerHTML = "<!--[if gt IE " + ++f + "]><i></i><![endif]-->", a[0]
            }; b();)
                ;
            return f > 4 ? f : e
        }(), e = !1, n = void 0, "undefined" != typeof c.hidden ? (e = "hidden", n = "visibilitychange") : "undefined" != typeof c.mozHidden ? (e = "mozHidden", n = "mozvisibilitychange") : "undefined" != typeof c.msHidden ? (e = "msHidden", n = "msvisibilitychange") : "undefined" != typeof c.webkitHidden && (e = "webkitHidden", n = "webkitvisibilitychange"), m = function () {
            var b,
                d;
            return b = [], d = function () {
                return b.map(clearTimeout), "active" !== l && i.wakeup(), f = +new Date, b.push(setTimeout(function () {
                    if ("active" === l) return i.idle()
                }, g))
            }, d(), a(c, "mousemove", d), a(c, "keyup", d), a(c, "touchstart", d), a(window, "scroll", d), i.focus(d), i.wakeup(d)
        }, j = function () {
            var b;
            return !!k || (e === !1 ? (b = "blur", h < 9 && (b = "focusout"), a(window, b, function () {
                return i.blur()
            }), a(window, "focus", function () {
                return i.focus()
            })) : a(c, n, function () {
                return c[e] ? i.blur() : i.focus()
            }, !1), k = !0, m())
        }, i = {
            setIdleDuration: function (a) {
                return g = 1e3 * a
            },
            getIdleDuration: function () {
                return g
            },
            getIdleInfo: function () {
                var a,
                    b;
                return a = +new Date, b = {}, "idle" === l ? (b.isIdle = !0, b.idleFor = a - f, b.timeLeft = 0, b.timeLeftPer = 100) : (b.isIdle = !1, b.idleFor = a - f, b.timeLeft = f + g - a, b.timeLeftPer = (100 - 100 * b.timeLeft / g).toFixed(2)), b
            },
            focus: function (a) {
                return "function" == typeof a ? this.on("focus", a) : (l = "active", b.fire(this, "focus"), b.fire(this, "wakeup"), b.fire(this, "statusChanged", {
                    status: l
                })), this
            },
            blur: function (a) {
                return "function" == typeof a ? this.on("blur", a) : (l = "hidden", b.fire(this, "blur"), b.fire(this, "idle"), b.fire(this, "statusChanged", {
                    status: l
                })), this
            },
            idle: function (a) {
                return "function" == typeof a ? this.on("idle", a) : (l = "idle", b.fire(this, "idle"), b.fire(this, "statusChanged", {
                    status: l
                })), this
            },
            wakeup: function (a) {
                return "function" == typeof a ? this.on("wakeup", a) : (l = "active", b.fire(this, "wakeup"), b.fire(this, "statusChanged", {
                    status: l
                })), this
            },
            on: function (a, c) {
                return j(), b.add(this, a, c), this
            },
            off: function (a, c) {
                return j(), b.remove(this, a, c), this
            },
            onEvery: function (a, b) {
                var c,
                    d;
                return j(), c = !1, b && (d = setInterval(function () {
                    if ("active" === l && c === !1) return b()
                }, 1e3 * a)), {
                    stop: function () {
                        return clearInterval(d)
                    },
                    pause: function () {
                        return c = !0
                    },
                    resume: function () {
                        return c = !1
                    },
                    code: d,
                    callback: b
                }
            },
            now: function (a) {
                return j(), l === (a || "active")
            }
        }
    })
}).call(this);


/* jQuery.qrcode 0.12.0 - http://larsjung.de/jquery-qrcode/ - uses //github.com/kazuhikoarase/qrcode-generator (MIT) */
!function (r) {
    "use strict";

    function t(t, e, n, o) {
        function i(r, t) {
            return r -= o, t -= o, 0 > r || r >= u || 0 > t || t >= u ? !1 : a.isDark(r, t)
        }

        var a = r(n, e);
        a.addData(t), a.make(), o = o || 0;
        var u = a.getModuleCount(),
            f = a.getModuleCount() + 2 * o,
            c = function (r, t, e, n) {
                var o = this.isDark,
                    i = 1 / f;
                this.isDark = function (a, u) {
                    var f = u * i,
                        c = a * i,
                        l = f + i,
                        g = c + i;
                    return o(a, u) && (r > l || f > e || t > g || c > n)
                }
            };
        this.text = t, this.level = e, this.version = n, this.moduleCount = f, this.isDark = i, this.addBlank = c
    }

    function e(r, e, n, o, i) {
        n = Math.max(1, n || 1), o = Math.min(40, o || 40);
        for (var a = n; o >= a; a += 1) try {
            return new t(r, e, a, i)
        } catch (u) {
        }
    }

    function n(r, t, e) {
        var n = e.size,
            o = "bold " + e.mSize * n + "px " + e.fontname,
            i = w("<canvas/>")[0].getContext("2d");
        i.font = o;
        var a = i.measureText(e.label).width,
            u = e.mSize,
            f = a / n,
            c = (1 - f) * e.mPosX,
            l = (1 - u) * e.mPosY,
            g = c + f,
            s = l + u,
            h = .01;
        1 === e.mode ? r.addBlank(0, l - h, n, s + h) : r.addBlank(c - h, l - h, g + h, s + h), t.fillStyle = e.fontcolor, t.font = o, t.fillText(e.label, c * n, l * n + .75 * e.mSize * n)
    }

    function o(r, t, e) {
        var n = e.size,
            o = e.image.naturalWidth || 1,
            i = e.image.naturalHeight || 1,
            a = e.mSize,
            u = a * o / i,
            f = (1 - u) * e.mPosX,
            c = (1 - a) * e.mPosY,
            l = f + u,
            g = c + a,
            s = .01;
        3 === e.mode ? r.addBlank(0, c - s, n, g + s) : r.addBlank(f - s, c - s, l + s, g + s), t.drawImage(e.image, f * n, c * n, u * n, a * n)
    }

    function i(r, t, e) {
        w(e.background).is("img") ? t.drawImage(e.background, 0, 0, e.size, e.size) : e.background && (t.fillStyle = e.background, t.fillRect(e.left, e.top, e.size, e.size));
        var i = e.mode;
        1 === i || 2 === i ? n(r, t, e) : (3 === i || 4 === i) && o(r, t, e)
    }

    function a(r, t, e, n, o, i, a, u) {
        r.isDark(a, u) && t.rect(n, o, i, i)
    }

    function u(r, t, e, n, o, i, a, u, f, c) {
        a ? r.moveTo(t + i, e) : r.moveTo(t, e), u ? (r.lineTo(n - i, e), r.arcTo(n, e, n, o, i)) : r.lineTo(n, e), f ? (r.lineTo(n, o - i), r.arcTo(n, o, t, o, i)) : r.lineTo(n, o), c ? (r.lineTo(t + i, o), r.arcTo(t, o, t, e, i)) : r.lineTo(t, o), a ? (r.lineTo(t, e + i), r.arcTo(t, e, n, e, i)) : r.lineTo(t, e)
    }

    function f(r, t, e, n, o, i, a, u, f, c) {
        a && (r.moveTo(t + i, e), r.lineTo(t, e), r.lineTo(t, e + i), r.arcTo(t, e, t + i, e, i)), u && (r.moveTo(n - i, e), r.lineTo(n, e), r.lineTo(n, e + i), r.arcTo(n, e, n - i, e, i)), f && (r.moveTo(n - i, o), r.lineTo(n, o), r.lineTo(n, o - i), r.arcTo(n, o, n - i, o, i)), c && (r.moveTo(t + i, o), r.lineTo(t, o), r.lineTo(t, o - i), r.arcTo(t, o, t + i, o, i))
    }

    function c(r, t, e, n, o, i, a, c) {
        var l = r.isDark,
            g = n + i,
            s = o + i,
            h = e.radius * i,
            v = a - 1,
            d = a + 1,
            w = c - 1,
            m = c + 1,
            p = l(a, c),
            y = l(v, w),
            T = l(v, c),
            B = l(v, m),
            A = l(a, m),
            E = l(d, m),
            k = l(d, c),
            M = l(d, w),
            C = l(a, w);
        p ? u(t, n, o, g, s, h, !T && !C, !T && !A, !k && !A, !k && !C) : f(t, n, o, g, s, h, T && C && y, T && A && B, k && A && E, k && C && M)
    }

    function l(r, t, e) {
        var n,
            o,
            i = r.moduleCount,
            u = e.size / i,
            f = a;
        for (p && e.radius > 0 && e.radius <= .5 && (f = c), t.beginPath(), n = 0; i > n; n += 1)
            for (o = 0; i > o; o += 1) {
                var l = e.left + o * u,
                    g = e.top + n * u,
                    s = u;
                f(r, t, e, l, g, s, n, o)
            }
        if (w(e.fill).is("img")) {
            t.strokeStyle = "rgba(0,0,0,0.5)", t.lineWidth = 2, t.stroke();
            var h = t.globalCompositeOperation;
            t.globalCompositeOperation = "destination-out", t.fill(), t.globalCompositeOperation = h, t.clip(), t.drawImage(e.fill, 0, 0, e.size, e.size), t.restore()
        } else t.fillStyle = e.fill, t.fill()
    }

    function g(r, t) {
        var n = e(t.text, t.ecLevel, t.minVersion, t.maxVersion, t.quiet);
        if (!n) return null;
        var o = w(r).data("qrcode", n),
            a = o[0].getContext("2d");
        return i(n, a, t), l(n, a, t), o
    }

    function s(r) {
        var t = w("<canvas/>").attr("width", r.size).attr("height", r.size);
        return g(t, r)
    }

    function h(r) {
        return w("<img/>").attr("src", s(r)[0].toDataURL("image/png"))
    }

    function v(r) {
        var t = e(r.text, r.ecLevel, r.minVersion, r.maxVersion, r.quiet);
        if (!t) return null;
        var n,
            o,
            i = r.size,
            a = r.background,
            u = Math.floor,
            f = t.moduleCount,
            c = u(i / f),
            l = u(.5 * (i - c * f)),
            g = {
                position: "relative",
                left: 0,
                top: 0,
                padding: 0,
                margin: 0,
                width: i,
                height: i
            },
            s = {
                position: "absolute",
                padding: 0,
                margin: 0,
                width: c,
                height: c,
                "background-color": r.fill
            },
            h = w("<div/>").data("qrcode", t).css(g);
        for (a && h.css("background-color", a), n = 0; f > n; n += 1)
            for (o = 0; f > o; o += 1) t.isDark(n, o) && w("<div/>").css(s).css({
                left: l + o * c,
                top: l + n * c
            }).appendTo(h);
        return h
    }

    function d(r) {
        return m && "canvas" === r.render ? s(r) : m && "image" === r.render ? h(r) : v(r)
    }

    var w = jQuery,
        m = function () {
            var r = document.createElement("canvas");
            return Boolean(r.getContext && r.getContext("2d"))
        }(),
        p = "[object Opera]" !== Object.prototype.toString.call(window.opera),
        y = {
            render: "canvas",
            minVersion: 1,
            maxVersion: 40,
            ecLevel: "L",
            left: 0,
            top: 0,
            size: 200,
            fill: "#000",
            background: null,
            text: "no text",
            radius: 0,
            quiet: 0,
            mode: 0,
            mSize: .1,
            mPosX: .5,
            mPosY: .5,
            label: "no label",
            fontname: "sans",
            fontcolor: "#000",
            image: null
        };
    w.fn.qrcode = function (r) {
        var t = w.extend({}, y, r);
        return this.each(function () {
            "canvas" === this.nodeName.toLowerCase() ? g(this, t) : w(this).append(d(t))
        })
    }
}(function () {
    var r = function () {
        function r(t, e) {
            if ("undefined" == typeof t.length)
                throw new Error(t.length + "/" + e);
            var n = function () {
                    for (var r = 0; r < t.length && 0 == t[r];) r += 1;
                    for (var n = new Array(t.length - r + e), o = 0; o < t.length - r; o += 1) n[o] = t[o + r];
                    return n
                }(),
                o = {};
            return o.getAt = function (r) {
                return n[r]
            }, o.getLength = function () {
                return n.length
            }, o.multiply = function (t) {
                for (var e = new Array(o.getLength() + t.getLength() - 1), n = 0; n < o.getLength(); n += 1)
                    for (var i = 0; i < t.getLength(); i += 1) e[n + i] ^= a.gexp(a.glog(o.getAt(n)) + a.glog(t.getAt(i)));
                return r(e, 0)
            }, o.mod = function (t) {
                if (o.getLength() - t.getLength() < 0) return o;
                for (var e = a.glog(o.getAt(0)) - a.glog(t.getAt(0)), n = new Array(o.getLength()), i = 0; i < o.getLength(); i += 1) n[i] = o.getAt(i);
                for (var i = 0; i < t.getLength(); i += 1) n[i] ^= a.gexp(a.glog(t.getAt(i)) + e);
                return r(n, 0).mod(t)
            }, o
        }

        var t = function (t, e) {
            var o = 236,
                a = 17,
                l = t,
                g = n[e],
                s = null,
                h = 0,
                d = null,
                w = new Array,
                m = {},
                p = function (r, t) {
                    h = 4 * l + 17, s = function (r) {
                        for (var t = new Array(r), e = 0; r > e; e += 1) {
                            t[e] = new Array(r);
                            for (var n = 0; r > n; n += 1) t[e][n] = null
                        }
                        return t
                    }(h), y(0, 0), y(h - 7, 0), y(0, h - 7), A(), B(), k(r, t), l >= 7 && E(r), null == d && (d = D(l, g, w)), M(d, t)
                },
                y = function (r, t) {
                    for (var e = -1; 7 >= e; e += 1)
                        if (!(-1 >= r + e || r + e >= h))
                            for (var n = -1; 7 >= n; n += 1) -1 >= t + n || t + n >= h || (e >= 0 && 6 >= e && (0 == n || 6 == n) || n >= 0 && 6 >= n && (0 == e || 6 == e) || e >= 2 && 4 >= e && n >= 2 && 4 >= n ? s[r + e][t + n] = !0 : s[r + e][t + n] = !1)
                },
                T = function () {
                    for (var r = 0, t = 0, e = 0; 8 > e; e += 1) {
                        p(!0, e);
                        var n = i.getLostPoint(m);
                        (0 == e || r > n) && (r = n, t = e)
                    }
                    return t
                },
                B = function () {
                    for (var r = 8; h - 8 > r; r += 1) null == s[r][6] && (s[r][6] = r % 2 == 0);
                    for (var t = 8; h - 8 > t; t += 1) null == s[6][t] && (s[6][t] = t % 2 == 0)
                },
                A = function () {
                    for (var r = i.getPatternPosition(l), t = 0; t < r.length; t += 1)
                        for (var e = 0; e < r.length; e += 1) {
                            var n = r[t],
                                o = r[e];
                            if (null == s[n][o])
                                for (var a = -2; 2 >= a; a += 1)
                                    for (var u = -2; 2 >= u; u += 1) -2 == a || 2 == a || -2 == u || 2 == u || 0 == a && 0 == u ? s[n + a][o + u] = !0 : s[n + a][o + u] = !1
                        }
                },
                E = function (r) {
                    for (var t = i.getBCHTypeNumber(l), e = 0; 18 > e; e += 1) {
                        var n = !r && 1 == (t >> e & 1);
                        s[Math.floor(e / 3)][e % 3 + h - 8 - 3] = n
                    }
                    for (var e = 0; 18 > e; e += 1) {
                        var n = !r && 1 == (t >> e & 1);
                        s[e % 3 + h - 8 - 3][Math.floor(e / 3)] = n
                    }
                },
                k = function (r, t) {
                    for (var e = g << 3 | t, n = i.getBCHTypeInfo(e), o = 0; 15 > o; o += 1) {
                        var a = !r && 1 == (n >> o & 1);
                        6 > o ? s[o][8] = a : 8 > o ? s[o + 1][8] = a : s[h - 15 + o][8] = a
                    }
                    for (var o = 0; 15 > o; o += 1) {
                        var a = !r && 1 == (n >> o & 1);
                        8 > o ? s[8][h - o - 1] = a : 9 > o ? s[8][15 - o - 1 + 1] = a : s[8][15 - o - 1] = a
                    }
                    s[h - 8][8] = !r
                },
                M = function (r, t) {
                    for (var e = -1, n = h - 1, o = 7, a = 0, u = i.getMaskFunction(t), f = h - 1; f > 0; f -= 2)
                        for (6 == f && (f -= 1); ;) {
                            for (var c = 0; 2 > c; c += 1)
                                if (null == s[n][f - c]) {
                                    var l = !1;
                                    a < r.length && (l = 1 == (r[a] >>> o & 1));
                                    var g = u(n, f - c);
                                    g && (l = !l), s[n][f - c] = l, o -= 1, -1 == o && (a += 1, o = 7)
                                }
                            if (n += e, 0 > n || n >= h) {
                                n -= e, e = -e;
                                break
                            }
                        }
                },
                C = function (t, e) {
                    for (var n = 0, o = 0, a = 0, u = new Array(e.length), f = new Array(e.length), c = 0; c < e.length; c += 1) {
                        var l = e[c].dataCount,
                            g = e[c].totalCount - l;
                        o = Math.max(o, l), a = Math.max(a, g), u[c] = new Array(l);
                        for (var s = 0; s < u[c].length; s += 1) u[c][s] = 255 & t.getBuffer()[s + n];
                        n += l;
                        var h = i.getErrorCorrectPolynomial(g),
                            v = r(u[c], h.getLength() - 1),
                            d = v.mod(h);
                        f[c] = new Array(h.getLength() - 1);
                        for (var s = 0; s < f[c].length; s += 1) {
                            var w = s + d.getLength() - f[c].length;
                            f[c][s] = w >= 0 ? d.getAt(w) : 0
                        }
                    }
                    for (var m = 0, s = 0; s < e.length; s += 1) m += e[s].totalCount;
                    for (var p = new Array(m), y = 0, s = 0; o > s; s += 1)
                        for (var c = 0; c < e.length; c += 1) s < u[c].length && (p[y] = u[c][s], y += 1);
                    for (var s = 0; a > s; s += 1)
                        for (var c = 0; c < e.length; c += 1) s < f[c].length && (p[y] = f[c][s], y += 1);
                    return p
                },
                D = function (r, t, e) {
                    for (var n = u.getRSBlocks(r, t), c = f(), l = 0; l < e.length; l += 1) {
                        var g = e[l];
                        c.put(g.getMode(), 4), c.put(g.getLength(), i.getLengthInBits(g.getMode(), r)), g.write(c)
                    }
                    for (var s = 0, l = 0; l < n.length; l += 1) s += n[l].dataCount;
                    if (c.getLengthInBits() > 8 * s)
                        throw new Error("code length overflow. (" + c.getLengthInBits() + ">" + 8 * s + ")");
                    for (c.getLengthInBits() + 4 <= 8 * s && c.put(0, 4); c.getLengthInBits() % 8 != 0;) c.putBit(!1);
                    for (; ;) {
                        if (c.getLengthInBits() >= 8 * s) break;
                        if (c.put(o, 8), c.getLengthInBits() >= 8 * s) break;
                        c.put(a, 8)
                    }
                    return C(c, n)
                };
            return m.addData = function (r) {
                var t = c(r);
                w.push(t), d = null
            }, m.isDark = function (r, t) {
                if (0 > r || r >= h || 0 > t || t >= h)
                    throw new Error(r + "," + t);
                return s[r][t]
            }, m.getModuleCount = function () {
                return h
            }, m.make = function () {
                p(!1, T())
            }, m.createTableTag = function (r, t) {
                r = r || 2, t = "undefined" == typeof t ? 4 * r : t;
                var e = "";
                e += '<table style="', e += " border-width: 0px; border-style: none;", e += " border-collapse: collapse;", e += " padding: 0px; margin: " + t + "px;", e += '">', e += "<tbody>";
                for (var n = 0; n < m.getModuleCount(); n += 1) {
                    e += "<tr>";
                    for (var o = 0; o < m.getModuleCount(); o += 1) e += '<td style="', e += " border-width: 0px; border-style: none;", e += " border-collapse: collapse;", e += " padding: 0px; margin: 0px;", e += " width: " + r + "px;", e += " height: " + r + "px;", e += " background-color: ", e += m.isDark(n, o) ? "#000000" : "#ffffff", e += ";", e += '"/>';
                    e += "</tr>"
                }
                return e += "</tbody>", e += "</table>"
            }, m.createImgTag = function (r, t) {
                r = r || 2, t = "undefined" == typeof t ? 4 * r : t;
                var e = m.getModuleCount() * r + 2 * t,
                    n = t,
                    o = e - t;
                return v(e, e, function (t, e) {
                    if (t >= n && o > t && e >= n && o > e) {
                        var i = Math.floor((t - n) / r),
                            a = Math.floor((e - n) / r);
                        return m.isDark(a, i) ? 0 : 1
                    }
                    return 1
                })
            }, m
        };
        t.stringToBytes = function (r) {
            for (var t = new Array, e = 0; e < r.length; e += 1) {
                var n = r.charCodeAt(e);
                t.push(255 & n)
            }
            return t
        }, t.createStringToBytes = function (r, t) {
            var e = function () {
                    for (var e = s(r), n = function () {
                        var r = e.read();
                        if (-1 == r)
                            throw new Error;
                        return r
                    }, o = 0, i = {}; ;) {
                        var a = e.read();
                        if (-1 == a) break;
                        var u = n(),
                            f = n(),
                            c = n(),
                            l = String.fromCharCode(a << 8 | u),
                            g = f << 8 | c;
                        i[l] = g, o += 1
                    }
                    if (o != t)
                        throw new Error(o + " != " + t);
                    return i
                }(),
                n = "?".charCodeAt(0);
            return function (r) {
                for (var t = new Array, o = 0; o < r.length; o += 1) {
                    var i = r.charCodeAt(o);
                    if (128 > i) t.push(i); else {
                        var a = e[r.charAt(o)];
                        "number" == typeof a ? (255 & a) == a ? t.push(a) : (t.push(a >>> 8), t.push(255 & a)) : t.push(n)
                    }
                }
                return t
            }
        };
        var e = {
                MODE_NUMBER: 1,
                MODE_ALPHA_NUM: 2,
                MODE_8BIT_BYTE: 4,
                MODE_KANJI: 8
            },
            n = {
                L: 1,
                M: 0,
                Q: 3,
                H: 2
            },
            o = {
                PATTERN000: 0,
                PATTERN001: 1,
                PATTERN010: 2,
                PATTERN011: 3,
                PATTERN100: 4,
                PATTERN101: 5,
                PATTERN110: 6,
                PATTERN111: 7
            },
            i = function () {
                var t = [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
                    n = 1335,
                    i = 7973,
                    u = 21522,
                    f = {},
                    c = function (r) {
                        for (var t = 0; 0 != r;) t += 1, r >>>= 1;
                        return t
                    };
                return f.getBCHTypeInfo = function (r) {
                    for (var t = r << 10; c(t) - c(n) >= 0;) t ^= n << c(t) - c(n);
                    return (r << 10 | t) ^ u
                }, f.getBCHTypeNumber = function (r) {
                    for (var t = r << 12; c(t) - c(i) >= 0;) t ^= i << c(t) - c(i);
                    return r << 12 | t
                }, f.getPatternPosition = function (r) {
                    return t[r - 1]
                }, f.getMaskFunction = function (r) {
                    switch (r) {
                        case o.PATTERN000:
                            return function (r, t) {
                                return (r + t) % 2 == 0
                            };
                        case o.PATTERN001:
                            return function (r, t) {
                                return r % 2 == 0
                            };
                        case o.PATTERN010:
                            return function (r, t) {
                                return t % 3 == 0
                            };
                        case o.PATTERN011:
                            return function (r, t) {
                                return (r + t) % 3 == 0
                            };
                        case o.PATTERN100:
                            return function (r, t) {
                                return (Math.floor(r / 2) + Math.floor(t / 3)) % 2 == 0
                            };
                        case o.PATTERN101:
                            return function (r, t) {
                                return r * t % 2 + r * t % 3 == 0
                            };
                        case o.PATTERN110:
                            return function (r, t) {
                                return (r * t % 2 + r * t % 3) % 2 == 0
                            };
                        case o.PATTERN111:
                            return function (r, t) {
                                return (r * t % 3 + (r + t) % 2) % 2 == 0
                            };
                        default:
                            throw new Error("bad maskPattern:" + r)
                    }
                }, f.getErrorCorrectPolynomial = function (t) {
                    for (var e = r([1], 0), n = 0; t > n; n += 1) e = e.multiply(r([1, a.gexp(n)], 0));
                    return e
                }, f.getLengthInBits = function (r, t) {
                    if (t >= 1 && 10 > t) switch (r) {
                        case e.MODE_NUMBER:
                            return 10;
                        case e.MODE_ALPHA_NUM:
                            return 9;
                        case e.MODE_8BIT_BYTE:
                            return 8;
                        case e.MODE_KANJI:
                            return 8;
                        default:
                            throw new Error("mode:" + r)
                    }
                    else if (27 > t) switch (r) {
                        case e.MODE_NUMBER:
                            return 12;
                        case e.MODE_ALPHA_NUM:
                            return 11;
                        case e.MODE_8BIT_BYTE:
                            return 16;
                        case e.MODE_KANJI:
                            return 10;
                        default:
                            throw new Error("mode:" + r)
                    } else {
                        if (!(41 > t))
                            throw new Error("type:" + t);
                        switch (r) {
                            case e.MODE_NUMBER:
                                return 14;
                            case e.MODE_ALPHA_NUM:
                                return 13;
                            case e.MODE_8BIT_BYTE:
                                return 16;
                            case e.MODE_KANJI:
                                return 12;
                            default:
                                throw new Error("mode:" + r)
                        }
                    }
                }, f.getLostPoint = function (r) {
                    for (var t = r.getModuleCount(), e = 0, n = 0; t > n; n += 1)
                        for (var o = 0; t > o; o += 1) {
                            for (var i = 0, a = r.isDark(n, o), u = -1; 1 >= u; u += 1)
                                if (!(0 > n + u || n + u >= t))
                                    for (var f = -1; 1 >= f; f += 1) 0 > o + f || o + f >= t || (0 != u || 0 != f) && a == r.isDark(n + u, o + f) && (i += 1);
                            i > 5 && (e += 3 + i - 5)
                        }
                    for (var n = 0; t - 1 > n; n += 1)
                        for (var o = 0; t - 1 > o; o += 1) {
                            var c = 0;
                            r.isDark(n, o) && (c += 1), r.isDark(n + 1, o) && (c += 1), r.isDark(n, o + 1) && (c += 1), r.isDark(n + 1, o + 1) && (c += 1), (0 == c || 4 == c) && (e += 3)
                        }
                    for (var n = 0; t > n; n += 1)
                        for (var o = 0; t - 6 > o; o += 1) r.isDark(n, o) && !r.isDark(n, o + 1) && r.isDark(n, o + 2) && r.isDark(n, o + 3) && r.isDark(n, o + 4) && !r.isDark(n, o + 5) && r.isDark(n, o + 6) && (e += 40);
                    for (var o = 0; t > o; o += 1)
                        for (var n = 0; t - 6 > n; n += 1) r.isDark(n, o) && !r.isDark(n + 1, o) && r.isDark(n + 2, o) && r.isDark(n + 3, o) && r.isDark(n + 4, o) && !r.isDark(n + 5, o) && r.isDark(n + 6, o) && (e += 40);
                    for (var l = 0, o = 0; t > o; o += 1)
                        for (var n = 0; t > n; n += 1) r.isDark(n, o) && (l += 1);
                    var g = Math.abs(100 * l / t / t - 50) / 5;
                    return e += 10 * g
                }, f
            }(),
            a = function () {
                for (var r = new Array(256), t = new Array(256), e = 0; 8 > e; e += 1) r[e] = 1 << e;
                for (var e = 8; 256 > e; e += 1) r[e] = r[e - 4] ^ r[e - 5] ^ r[e - 6] ^ r[e - 8];
                for (var e = 0; 255 > e; e += 1) t[r[e]] = e;
                var n = {};
                return n.glog = function (r) {
                    if (1 > r)
                        throw new Error("glog(" + r + ")");
                    return t[r]
                }, n.gexp = function (t) {
                    for (; 0 > t;) t += 255;
                    for (; t >= 256;) t -= 255;
                    return r[t]
                }, n
            }(),
            u = function () {
                var r = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12, 7, 37, 13], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]],
                    t = function (r, t) {
                        var e = {};
                        return e.totalCount = r, e.dataCount = t, e
                    },
                    e = {},
                    o = function (t, e) {
                        switch (e) {
                            case n.L:
                                return r[4 * (t - 1) + 0];
                            case n.M:
                                return r[4 * (t - 1) + 1];
                            case n.Q:
                                return r[4 * (t - 1) + 2];
                            case n.H:
                                return r[4 * (t - 1) + 3];
                            default:
                                return void 0
                        }
                    };
                return e.getRSBlocks = function (r, e) {
                    var n = o(r, e);
                    if ("undefined" == typeof n)
                        throw new Error("bad rs block @ typeNumber:" + r + "/errorCorrectLevel:" + e);
                    for (var i = n.length / 3, a = new Array, u = 0; i > u; u += 1)
                        for (var f = n[3 * u + 0], c = n[3 * u + 1], l = n[3 * u + 2], g = 0; f > g; g += 1) a.push(t(c, l));
                    return a
                }, e
            }(),
            f = function () {
                var r = new Array,
                    t = 0,
                    e = {};
                return e.getBuffer = function () {
                    return r
                }, e.getAt = function (t) {
                    var e = Math.floor(t / 8);
                    return 1 == (r[e] >>> 7 - t % 8 & 1)
                }, e.put = function (r, t) {
                    for (var n = 0; t > n; n += 1) e.putBit(1 == (r >>> t - n - 1 & 1))
                }, e.getLengthInBits = function () {
                    return t
                }, e.putBit = function (e) {
                    var n = Math.floor(t / 8);
                    r.length <= n && r.push(0), e && (r[n] |= 128 >>> t % 8), t += 1
                }, e
            },
            c = function (r) {
                var n = e.MODE_8BIT_BYTE,
                    o = t.stringToBytes(r),
                    i = {};
                return i.getMode = function () {
                    return n
                }, i.getLength = function (r) {
                    return o.length
                }, i.write = function (r) {
                    for (var t = 0; t < o.length; t += 1) r.put(o[t], 8)
                }, i
            },
            l = function () {
                var r = new Array,
                    t = {};
                return t.writeByte = function (t) {
                    r.push(255 & t)
                }, t.writeShort = function (r) {
                    t.writeByte(r), t.writeByte(r >>> 8)
                }, t.writeBytes = function (r, e, n) {
                    e = e || 0, n = n || r.length;
                    for (var o = 0; n > o; o += 1) t.writeByte(r[o + e])
                }, t.writeString = function (r) {
                    for (var e = 0; e < r.length; e += 1) t.writeByte(r.charCodeAt(e))
                }, t.toByteArray = function () {
                    return r
                }, t.toString = function () {
                    var t = "";
                    t += "[";
                    for (var e = 0; e < r.length; e += 1) e > 0 && (t += ","), t += r[e];
                    return t += "]"
                }, t
            },
            g = function () {
                var r = 0,
                    t = 0,
                    e = 0,
                    n = "",
                    o = {},
                    i = function (r) {
                        n += String.fromCharCode(a(63 & r))
                    },
                    a = function (r) {
                        if (0 > r)
                            ; else {
                            if (26 > r) return 65 + r;
                            if (52 > r) return 97 + (r - 26);
                            if (62 > r) return 48 + (r - 52);
                            if (62 == r) return 43;
                            if (63 == r) return 47
                        }
                        throw new Error("n:" + r)
                    };
                return o.writeByte = function (n) {
                    for (r = r << 8 | 255 & n, t += 8, e += 1; t >= 6;) i(r >>> t - 6), t -= 6
                }, o.flush = function () {
                    if (t > 0 && (i(r << 6 - t), r = 0, t = 0), e % 3 != 0)
                        for (var o = 3 - e % 3, a = 0; o > a; a += 1) n += "="
                }, o.toString = function () {
                    return n
                }, o
            },
            s = function (r) {
                var t = r,
                    e = 0,
                    n = 0,
                    o = 0,
                    i = {};
                i.read = function () {
                    for (; 8 > o;) {
                        if (e >= t.length) {
                            if (0 == o) return -1;
                            throw new Error("unexpected end of file./" + o)
                        }
                        var r = t.charAt(e);
                        if (e += 1, "=" == r) return o = 0, -1;
                        r.match(/^\s$/) || (n = n << 6 | a(r.charCodeAt(0)), o += 6)
                    }
                    var i = n >>> o - 8 & 255;
                    return o -= 8, i
                };
                var a = function (r) {
                    if (r >= 65 && 90 >= r) return r - 65;
                    if (r >= 97 && 122 >= r) return r - 97 + 26;
                    if (r >= 48 && 57 >= r) return r - 48 + 52;
                    if (43 == r) return 62;
                    if (47 == r) return 63;
                    throw new Error("c:" + r)
                };
                return i
            },
            h = function (r, t) {
                var e = r,
                    n = t,
                    o = new Array(r * t),
                    i = {};
                i.setPixel = function (r, t, n) {
                    o[t * e + r] = n
                }, i.write = function (r) {
                    r.writeString("GIF87a"), r.writeShort(e), r.writeShort(n), r.writeByte(128), r.writeByte(0), r.writeByte(0), r.writeByte(0), r.writeByte(0), r.writeByte(0), r.writeByte(255), r.writeByte(255), r.writeByte(255), r.writeString(","), r.writeShort(0), r.writeShort(0), r.writeShort(e), r.writeShort(n), r.writeByte(0);
                    var t = 2,
                        o = u(t);
                    r.writeByte(t);
                    for (var i = 0; o.length - i > 255;) r.writeByte(255), r.writeBytes(o, i, 255), i += 255;
                    r.writeByte(o.length - i), r.writeBytes(o, i, o.length - i), r.writeByte(0), r.writeString(";")
                };
                var a = function (r) {
                        var t = r,
                            e = 0,
                            n = 0,
                            o = {};
                        return o.write = function (r, o) {
                            if (r >>> o != 0)
                                throw new Error("length over");
                            for (; e + o >= 8;) t.writeByte(255 & (r << e | n)), o -= 8 - e, r >>>= 8 - e, n = 0, e = 0;
                            n = r << e | n, e += o
                        }, o.flush = function () {
                            e > 0 && t.writeByte(n)
                        }, o
                    },
                    u = function (r) {
                        for (var t = 1 << r, e = (1 << r) + 1, n = r + 1, i = f(), u = 0; t > u; u += 1) i.add(String.fromCharCode(u));
                        i.add(String.fromCharCode(t)), i.add(String.fromCharCode(e));
                        var c = l(),
                            g = a(c);
                        g.write(t, n);
                        var s = 0,
                            h = String.fromCharCode(o[s]);
                        for (s += 1; s < o.length;) {
                            var v = String.fromCharCode(o[s]);
                            s += 1, i.contains(h + v) ? h += v : (g.write(i.indexOf(h), n), i.size() < 4095 && (i.size() == 1 << n && (n += 1), i.add(h + v)), h = v)
                        }
                        return g.write(i.indexOf(h), n), g.write(e, n), g.flush(), c.toByteArray()
                    },
                    f = function () {
                        var r = {},
                            t = 0,
                            e = {};
                        return e.add = function (n) {
                            if (e.contains(n))
                                throw new Error("dup key:" + n);
                            r[n] = t, t += 1
                        }, e.size = function () {
                            return t
                        }, e.indexOf = function (t) {
                            return r[t]
                        }, e.contains = function (t) {
                            return "undefined" != typeof r[t]
                        }, e
                    };
                return i
            },
            v = function (r, t, e, n) {
                for (var o = h(r, t), i = 0; t > i; i += 1)
                    for (var a = 0; r > a; a += 1) o.setPixel(a, i, e(a, i));
                var u = l();
                o.write(u);
                for (var f = g(), c = u.toByteArray(), s = 0; s < c.length; s += 1) f.writeByte(c[s]);
                f.flush();
                var v = "";
                return v += "<img", v += ' src="', v += "data:image/gif;base64,", v += f, v += '"', v += ' width="', v += r, v += '"', v += ' height="', v += t, v += '"', n && (v += ' alt="', v += n, v += '"'), v += "/>"
            };
        return t
    }();
    return function (r) {
        "function" == typeof define && define.amd ? define([], r) : "object" == typeof exports && (module.exports = r())
    }(function () {
        return r
    }), !function (r) {
        r.stringToBytes = function (r) {
            function t(r) {
                for (var t = [], e = 0; e < r.length; e++) {
                    var n = r.charCodeAt(e);
                    128 > n ? t.push(n) : 2048 > n ? t.push(192 | n >> 6, 128 | 63 & n) : 55296 > n || n >= 57344 ? t.push(224 | n >> 12, 128 | n >> 6 & 63, 128 | 63 & n) : (e++, n = 65536 + ((1023 & n) << 10 | 1023 & r.charCodeAt(e)), t.push(240 | n >> 18, 128 | n >> 12 & 63, 128 | n >> 6 & 63, 128 | 63 & n))
                }
                return t
            }

            return t(r)
        }
    }(r), r
}());


/*! Lazy Load 1.9.7 - MIT license - Copyright 2010-2015 Mika Tuupola */
!function (a, b, c, d) {
    var e = a(b);
    a.fn.lazyload = function (f) {
        function g() {
            var b = 0;
            i.each(function () {
                var c = a(this);
                if (!j.skip_invisible || c.is(":visible"))
                    if (a.abovethetop(this, j) || a.leftofbegin(this, j))
                        ;
                    else if (a.belowthefold(this, j) || a.rightoffold(this, j)) {
                        if (++b > j.failure_limit) return !1
                    } else c.trigger("appear"), b = 0
            })
        }

        var h,
            i = this,
            j = {
                threshold: 0,
                failure_limit: 0,
                event: "scroll",
                effect: "show",
                container: b,
                data_attribute: "original",
                skip_invisible: !1,
                appear: null,
                load: null,
                placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
            };
        return f && (d !== f.failurelimit && (f.failure_limit = f.failurelimit,
                delete f.failurelimit
        ), d !== f.effectspeed && (f.effect_speed = f.effectspeed,
                delete f.effectspeed
        ), a.extend(j, f)), h = j.container === d || j.container === b ? e : a(j.container), 0 === j.event.indexOf("scroll") && h.bind(j.event, function () {
            return g()
        }), this.each(function () {
            var b = this,
                c = a(b);
            b.loaded = !1, (c.attr("src") === d || c.attr("src") === !1) && c.is("img") && c.attr("src", j.placeholder), c.one("appear", function () {
                if (!this.loaded) {
                    if (j.appear) {
                        var d = i.length;
                        j.appear.call(b, d, j)
                    }
                    a("<img />").bind("load", function () {
                        var d = c.attr("data-" + j.data_attribute);
                        c.hide(), c.is("img") ? c.attr("src", d) : c.css("background-image", "url('" + d + "')"), c[j.effect](j.effect_speed), b.loaded = !0;
                        var e = a.grep(i, function (a) {
                            return !a.loaded
                        });
                        if (i = a(e), j.load) {
                            var f = i.length;
                            j.load.call(b, f, j)
                        }
                    }).attr("src", c.attr("data-" + j.data_attribute))
                }
            }), 0 !== j.event.indexOf("scroll") && c.bind(j.event, function () {
                b.loaded || c.trigger("appear")
            })
        }), e.bind("resize", function () {
            g()
        }), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && e.bind("pageshow", function (b) {
            b.originalEvent && b.originalEvent.persisted && i.each(function () {
                a(this).trigger("appear")
            })
        }), a(c).ready(function () {
            g()
        }), this
    }, a.belowthefold = function (c, f) {
        var g;
        return g = f.container === d || f.container === b ? (b.innerHeight ? b.innerHeight : e.height()) + e.scrollTop() : a(f.container).offset().top + a(f.container).height(), g <= a(c).offset().top - f.threshold
    }, a.rightoffold = function (c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.width() + e.scrollLeft() : a(f.container).offset().left + a(f.container).width(), g <= a(c).offset().left - f.threshold
    }, a.abovethetop = function (c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.scrollTop() : a(f.container).offset().top, g >= a(c).offset().top + f.threshold + a(c).height()
    }, a.leftofbegin = function (c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.scrollLeft() : a(f.container).offset().left, g >= a(c).offset().left + f.threshold + a(c).width()
    }, a.inviewport = function (b, c) {
        return !(a.rightoffold(b, c) || a.leftofbegin(b, c) || a.belowthefold(b, c) || a.abovethetop(b, c))
    }, a.extend(a.expr[":"], {
        "below-the-fold": function (b) {
            return a.belowthefold(b, {
                threshold: 0
            })
        },
        "above-the-top": function (b) {
            return !a.belowthefold(b, {
                threshold: 0
            })
        },
        "right-of-screen": function (b) {
            return a.rightoffold(b, {
                threshold: 0
            })
        },
        "left-of-screen": function (b) {
            return !a.rightoffold(b, {
                threshold: 0
            })
        },
        "in-viewport": function (b) {
            return a.inviewport(b, {
                threshold: 0
            })
        },
        "above-the-fold": function (b) {
            return !a.belowthefold(b, {
                threshold: 0
            })
        },
        "right-of-fold": function (b) {
            return a.rightoffold(b, {
                threshold: 0
            })
        },
        "left-of-fold": function (b) {
            return !a.rightoffold(b, {
                threshold: 0
            })
        }
    })
}(jQuery, window, document);

$(".lazyload").lazyload({
    //placeholder:"http://www.mvcat.com/img/loading_cat.gif",
    //effect:"fadeIn",
    event: "scroll mousemove mouseover"
});


//this is a Jquery plugin function that fire an event when the size of an element changed
//usage $().sizeChanged(function(){})
(function ($) {
    $.fn.sizeChanged = function (handleFunction) {
        var element = this;
        var lastWidth = element.width();
        var lastHeight = element.height();

        setInterval(function () {
            if (lastWidth === element.width() && lastHeight === element.height())
                return;
            if (typeof (handleFunction) == 'function') {
                handleFunction({
                        width: lastWidth,
                        height: lastHeight
                    },
                    {
                        width: element.width(),
                        height: element.height()
                    });
                lastWidth = element.width();
                lastHeight = element.height();
            }
        }, 100);
        return element;
    };

}(jQuery));

/*! Video.js v4.11.3 Copyright 2014 Brightcove, Inc. https://github.com/videojs/video.js/blob/master/LICENSE */
(function () {
    var b = void 0,
        f = !0,
        k = null,
        l = !1;

    function m() {
        return function () {
        }
    }

    function n(a) {
        return function () {
            return this[a]
        }
    }

    function r(a) {
        return function () {
            return a
        }
    }

    var s;
    document.createElement("video");
    document.createElement("audio");
    document.createElement("track");

    function t(a, c, d) {
        if ("string" === typeof a) {
            0 === a.indexOf("#") && (a = a.slice(1));
            if (t.Fa[a]) return t.Fa[a];
            a = t.w(a)
        }
        if (!a || !a.nodeName)
            throw new TypeError("The element or ID supplied is not valid. (videojs)");
        return a.player || new t.Player(a, c, d)
    }

    var videojs = window.videojs = t;
    t.Zb = "4.11";
    t.ed = "https:" == document.location.protocol ? "https://" : "http://";
    t.options = {
        techOrder: ["html5", "flash"],
        html5: {},
        flash: {},
        width: 300,
        height: 150,
        defaultVolume: 1,
        playbackRates: [],
        inactivityTimeout: 2E3,
        children: {
            mediaLoader: {},
            posterImage: {},
            textTrackDisplay: {},
            loadingSpinner: {},
            bigPlayButton: {},
            controlBar: {},
            errorDisplay: {}
        },
        language: document.getElementsByTagName("html")[0].getAttribute("lang") || navigator.languages && navigator.languages[0] || navigator.Ke || navigator.language || "en",
        languages: {},
        notSupportedMessage: "No compatible source was found for this video."
    };
    "GENERATED_CDN_VSN" !== t.Zb && (videojs.options.flash.swf = t.ed + "vjs.zencdn.net/" + t.Zb + "/video-js.swf");
    t.sd = function (a, c) {
        t.options.languages[a] = t.options.languages[a] !== b ? t.Z.Ea(t.options.languages[a], c) : c;
        return t.options.languages
    };
    t.Fa = {};
    "function" === typeof define && define.amd ? define([], function () {
        return videojs
    }) : "object" === typeof exports && "object" === typeof module && (module.exports = videojs);
    t.ua = t.CoreObject = m();
    t.ua.extend = function (a) {
        var c,
            d;
        a = a || {};
        c = a.init || a.i || this.prototype.init || this.prototype.i || m();
        d = function () {
            c.apply(this, arguments)
        };
        d.prototype = t.h.create(this.prototype);
        d.prototype.constructor = d;
        d.extend = t.ua.extend;
        d.create = t.ua.create;
        for (var e in a) a.hasOwnProperty(e) && (d.prototype[e] = a[e]);
        return d
    };
    t.ua.create = function () {
        var a = t.h.create(this.prototype);
        this.apply(a, arguments);
        return a
    };
    t.c = function (a, c, d) {
        if (t.h.isArray(c)) return u(t.c, a, c, d);
        var e = t.getData(a);
        e.C || (e.C = {});
        e.C[c] || (e.C[c] = []);
        d.p || (d.p = t.p++);
        e.C[c].push(d);
        e.W || (e.disabled = l, e.W = function (c) {
            if (!e.disabled) {
                c = t.Ac(c);
                var d = e.C[c.type];
                if (d)
                    for (var d = d.slice(0), j = 0, p = d.length; j < p && !c.Hc(); j++) d[j].call(a, c)
            }
        });
        1 == e.C[c].length && (a.addEventListener ? a.addEventListener(c, e.W, l) : a.attachEvent && a.attachEvent("on" + c, e.W))
    };
    t.k = function (a, c, d) {
        if (t.Cc(a)) {
            var e = t.getData(a);
            if (e.C) {
                if (t.h.isArray(c)) return u(t.k, a, c, d);
                if (c) {
                    var g = e.C[c];
                    if (g) {
                        if (d) {
                            if (d.p)
                                for (e = 0; e < g.length; e++) g[e].p === d.p && g.splice(e--, 1)
                        } else
                            e.C[c] = [];
                        t.qc(a, c)
                    }
                } else
                    for (g in e.C) c = g, e.C[c] = [], t.qc(a, c)
            }
        }
    };
    t.qc = function (a, c) {
        var d = t.getData(a);
        0 === d.C[c].length && (
            delete d.C[c]
                , a.removeEventListener ? a.removeEventListener(c, d.W, l) : a.detachEvent && a.detachEvent("on" + c, d.W));
        t.Lb(d.C) && (
            delete d.C
                ,
                delete d.W
                ,
                delete d.disabled
        );
        t.Lb(d) && t.Qc(a)
    };
    t.Ac = function (a) {
        function c() {
            return f
        }

        function d() {
            return l
        }

        if (!a || !a.Mb) {
            var e = a || window.event;
            a = {};
            for (var g in e) "layerX" !== g && ("layerY" !== g && "keyLocation" !== g) && ("returnValue" == g && e.preventDefault || (a[g] = e[g]));
            a.target || (a.target = a.srcElement || document);
            a.relatedTarget = a.fromElement === a.target ? a.toElement : a.fromElement;
            a.preventDefault = function () {
                e.preventDefault && e.preventDefault();
                a.returnValue = l;
                a.Nd = c;
                a.defaultPrevented = f
            };
            a.Nd = d;
            a.defaultPrevented = l;
            a.stopPropagation = function () {
                e.stopPropagation &&
                e.stopPropagation();
                a.cancelBubble = f;
                a.Mb = c
            };
            a.Mb = d;
            a.stopImmediatePropagation = function () {
                e.stopImmediatePropagation && e.stopImmediatePropagation();
                a.Hc = c;
                a.stopPropagation()
            };
            a.Hc = d;
            if (a.clientX != k) {
                g = document.documentElement;
                var h = document.body;
                a.pageX = a.clientX + (g && g.scrollLeft || h && h.scrollLeft || 0) - (g && g.clientLeft || h && h.clientLeft || 0);
                a.pageY = a.clientY + (g && g.scrollTop || h && h.scrollTop || 0) - (g && g.clientTop || h && h.clientTop || 0)
            }
            a.which = a.charCode || a.keyCode;
            a.button != k && (a.button = a.button & 1 ? 0 : a.button &
            4 ? 1 : a.button & 2 ? 2 : 0)
        }
        return a
    };
    t.l = function (a, c) {
        var d = t.Cc(a) ? t.getData(a) : {},
            e = a.parentNode || a.ownerDocument;
        "string" === typeof c && (c = {
            type: c,
            target: a
        });
        c = t.Ac(c);
        d.W && d.W.call(a, c);
        if (e && !c.Mb() && c.bubbles !== l) t.l(e, c);
        else if (!e && !c.defaultPrevented && (d = t.getData(c.target), c.target[c.type])) {
            d.disabled = f;
            if ("function" === typeof c.target[c.type]) c.target[c.type]();
            d.disabled = l
        }
        return !c.defaultPrevented
    };
    t.Q = function (a, c, d) {
        function e() {
            t.k(a, c, e);
            d.apply(this, arguments)
        }

        if (t.h.isArray(c)) return u(t.Q, a, c, d);
        e.p = d.p = d.p || t.p++;
        t.c(a, c, e)
    };

    function u(a, c, d, e) {
        t.nc.forEach(d, function (d) {
            a(c, d, e)
        })
    }

    var v = Object.prototype.hasOwnProperty;
    t.e = function (a, c) {
        var d;
        c = c || {};
        d = document.createElement(a || "div");
        t.h.X(c, function (a, c) {
            -1 !== a.indexOf("aria-") || "role" == a ? d.setAttribute(a, c) : d[a] = c
        });
        return d
    };
    t.ba = function (a) {
        return a.charAt(0).toUpperCase() + a.slice(1)
    };
    t.h = {};
    t.h.create = Object.create || function (a) {
        function c() {
        }

        c.prototype = a;
        return new c
    };
    t.h.X = function (a, c, d) {
        for (var e in a) v.call(a, e) && c.call(d || this, e, a[e])
    };
    t.h.z = function (a, c) {
        if (!c) return a;
        for (var d in c) v.call(c, d) && (a[d] = c[d]);
        return a
    };
    t.h.Ad = function (a, c) {
        var d,
            e,
            g;
        a = t.h.copy(a);
        for (d in c) v.call(c, d) && (e = a[d], g = c[d], a[d] = t.h.Ya(e) && t.h.Ya(g) ? t.h.Ad(e, g) : c[d]);
        return a
    };
    t.h.copy = function (a) {
        return t.h.z({}, a)
    };
    t.h.Ya = function (a) {
        return !!a && "object" === typeof a && "[object Object]" === a.toString() && a.constructor === Object
    };
    t.h.isArray = Array.isArray || function (a) {
        return "[object Array]" === Object.prototype.toString.call(a)
    };
    t.Pd = function (a) {
        return a !== a
    };
    t.bind = function (a, c, d) {
        function e() {
            return c.apply(a, arguments)
        }

        c.p || (c.p = t.p++);
        e.p = d ? d + "_" + c.p : c.p;
        return e
    };
    t.xa = {};
    t.p = 1;
    t.expando = "vdata" + (new Date).getTime();
    t.getData = function (a) {
        var c = a[t.expando];
        c || (c = a[t.expando] = t.p++, t.xa[c] = {});
        return t.xa[c]
    };
    t.Cc = function (a) {
        a = a[t.expando];
        return !(!a || t.Lb(t.xa[a]))
    };
    t.Qc = function (a) {
        var c = a[t.expando];
        if (c) {
            delete t.xa[c];
            try {
                delete a[t.expando]
            } catch (d) {
                a.removeAttribute ? a.removeAttribute(t.expando) : a[t.expando] = k
            }
        }
    };
    t.Lb = function (a) {
        for (var c in a)
            if (a[c] !== k) return l;
        return f
    };
    t.Xa = function (a, c) {
        return -1 !== (" " + a.className + " ").indexOf(" " + c + " ")
    };
    t.n = function (a, c) {
        t.Xa(a, c) || (a.className = "" === a.className ? c : a.className + " " + c)
    };
    t.r = function (a, c) {
        var d,
            e;
        if (t.Xa(a, c)) {
            d = a.className.split(" ");
            for (e = d.length - 1; 0 <= e; e--) d[e] === c && d.splice(e, 1);
            a.className = d.join(" ")
        }
    };
    t.A = t.e("video");
    t.N = navigator.userAgent;
    t.md = /iPhone/i.test(t.N);
    t.ld = /iPad/i.test(t.N);
    t.nd = /iPod/i.test(t.N);
    t.kd = t.md || t.ld || t.nd;
    var aa = t,
        x;
    var y = t.N.match(/OS (\d+)_/i);
    x = y && y[1] ? y[1] : b;
    aa.Ae = x;
    t.hd = /Android/i.test(t.N);
    var ba = t,
        z;
    var A = t.N.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i),
        B,
        C;
    A ? (B = A[1] && parseFloat(A[1]), C = A[2] && parseFloat(A[2]), z = B && C ? parseFloat(A[1] + "." + A[2]) : B ? B : k) : z = k;
    ba.Yb = z;
    t.od = t.hd && /webkit/i.test(t.N) && 2.3 > t.Yb;
    t.jd = /Firefox/i.test(t.N);
    t.Be = /Chrome/i.test(t.N);
    t.jc = !!("ontouchstart" in window || window.gd && document instanceof window.gd);
    t.fd = "backgroundSize" in t.A.style;
    t.Tc = function (a, c) {
        t.h.X(c, function (c, e) {
            e === k || "undefined" === typeof e || e === l ? a.removeAttribute(c) : a.setAttribute(c, e === f ? "" : e)
        })
    };
    t.Ca = function (a) {
        var c,
            d,
            e,
            g;
        c = {};
        if (a && a.attributes && 0 < a.attributes.length) {
            d = a.attributes;
            for (var h = d.length - 1; 0 <= h; h--) {
                e = d[h].name;
                g = d[h].value;
                if ("boolean" === typeof a[e] || -1 !== ",autoplay,controls,loop,muted,default,".indexOf("," + e + ","))
                    g = g !== k ? f : l;
                c[e] = g
            }
        }
        return c
    };
    t.He = function (a, c) {
        var d = "";
        document.defaultView && document.defaultView.getComputedStyle ? d = document.defaultView.getComputedStyle(a, "").getPropertyValue(c) : a.currentStyle && (d = a["client" + c.substr(0, 1).toUpperCase() + c.substr(1)] + "px");
        return d
    };
    t.Kb = function (a, c) {
        c.firstChild ? c.insertBefore(a, c.firstChild) : c.appendChild(a)
    };
    t.Sa = {};
    t.w = function (a) {
        0 === a.indexOf("#") && (a = a.slice(1));
        return document.getElementById(a)
    };
    t.Ba = function (a, c) {
        c = c || a;
        var d = Math.floor(a % 60),
            e = Math.floor(a / 60 % 60),
            g = Math.floor(a / 3600),
            h = Math.floor(c / 60 % 60),
            j = Math.floor(c / 3600);
        if (isNaN(a) || Infinity === a)
            g = e = d = "-";
        g = 0 < g || 0 < j ? g + ":" : "";
        return g + (((g || 10 <= h) && 10 > e ? "0" + e : e) + ":") + (10 > d ? "0" + d : d)
    };
    t.ud = function () {
        document.body.focus();
        document.onselectstart = r(l)
    };
    t.ve = function () {
        document.onselectstart = r(f)
    };
    t.trim = function (a) {
        return (a + "").replace(/^\s+|\s+$/g, "")
    };
    t.round = function (a, c) {
        c || (c = 0);
        return Math.round(a * Math.pow(10, c)) / Math.pow(10, c)
    };
    t.Ab = function (a, c) {
        return {
            length: 1,
            start: function () {
                return a
            },
            end: function () {
                return c
            }
        }
    };
    t.je = function (a) {
        try {
            var c = window.localStorage || l;
            c && (c.volume = a)
        } catch (d) {
            22 == d.code || 1014 == d.code ? t.log("LocalStorage Full (VideoJS)", d) : 18 == d.code ? t.log("LocalStorage not allowed (VideoJS)", d) : t.log("LocalStorage Error (VideoJS)", d)
        }
    };
    t.Jd = function (a) {
        a.match(/^https?:\/\//) || (a = t.e("div", {
            innerHTML: '<a href="' + a + '">x</a>'
        }).firstChild.href);
        return a
    };
    t.fe = function (a) {
        var c,
            d,
            e,
            g;
        g = "protocol hostname port pathname search hash host".split(" ");
        d = t.e("a", {
            href: a
        });
        if (e = "" === d.host && "file:" !== d.protocol) c = t.e("div"), c.innerHTML = '<a href="' + a + '"></a>', d = c.firstChild, c.setAttribute("style", "display:none; position:absolute;"), document.body.appendChild(c);
        a = {};
        for (var h = 0; h < g.length; h++) a[g[h]] = d[g[h]];
        e && document.body.removeChild(c);
        return a
    };

    function D(a, c) {
        var d,
            e;
        d = Array.prototype.slice.call(c);
        e = m();
        e = window.console || {
            log: e,
            warn: e,
            error: e
        };
        a ? d.unshift(a.toUpperCase() + ":") : a = "log";
        t.log.history.push(d);
        d.unshift("VIDEOJS:");
        if (e[a].apply) e[a].apply(e, d); else e[a](d.join(" "))
    }

    t.log = function () {
        D(k, arguments)
    };
    t.log.history = [];
    t.log.error = function () {
        D("error", arguments)
    };
    t.log.warn = function () {
        D("warn", arguments)
    };
    t.Hd = function (a) {
        var c,
            d;
        a.getBoundingClientRect && a.parentNode && (c = a.getBoundingClientRect());
        if (!c) return {
            left: 0,
            top: 0
        };
        a = document.documentElement;
        d = document.body;
        return {
            left: t.round(c.left + (window.pageXOffset || d.scrollLeft) - (a.clientLeft || d.clientLeft || 0)),
            top: t.round(c.top + (window.pageYOffset || d.scrollTop) - (a.clientTop || d.clientTop || 0))
        }
    };
    t.nc = {};
    t.nc.forEach = function (a, c, d) {
        if (t.h.isArray(a) && c instanceof Function)
            for (var e = 0, g = a.length; e < g; ++e) c.call(d || t, a[e], e, a);
        return a
    };
    t.ye = function (a, c) {
        var d,
            e,
            g,
            h,
            j,
            p,
            q;
        "string" === typeof a && (a = {
            uri: a
        });
        videojs.Z.Ea({
            method: "GET",
            timeout: 45E3
        }, a);
        c = c || m();
        p = function () {
            window.clearTimeout(j);
            c(k, e, e.response || e.responseText)
        };
        q = function (a) {
            window.clearTimeout(j);
            if (!a || "string" === typeof a)
                a = Error(a);
            c(a, e)
        };
        d = window.XMLHttpRequest;
        "undefined" === typeof d && (d = function () {
            try {
                return new window.ActiveXObject("Msxml2.XMLHTTP.6.0")
            } catch (a) {
            }
            try {
                return new window.ActiveXObject("Msxml2.XMLHTTP.3.0")
            } catch (c) {
            }
            try {
                return new window.ActiveXObject("Msxml2.XMLHTTP")
            } catch (d) {
            }
            throw Error("This browser does not support XMLHttpRequest.");
        });
        e = new d;
        e.uri = a.uri;
        d = t.fe(a.uri);
        g = window.location;
        d.protocol + d.host !== g.protocol + g.host && window.XDomainRequest && !("withCredentials" in e) ? (e = new window.XDomainRequest, e.onload = p, e.onerror = q, e.onprogress = m(), e.ontimeout = m()) : (h = "file:" == d.protocol || "file:" == g.protocol, e.onreadystatechange = function () {
            if (4 === e.readyState) {
                if (e.te) return q("timeout");
                200 === e.status || h && 0 === e.status ? p() : q()
            }
        }, a.timeout && (j = window.setTimeout(function () {
            4 !== e.readyState && (e.te = f, e.abort())
        }, a.timeout)));
        try {
            e.open(a.method ||
                "GET", a.uri, f)
        } catch (w) {
            q(w);
            return
        }
        a.withCredentials && (e.withCredentials = f);
        a.responseType && (e.responseType = a.responseType);
        try {
            e.send()
        } catch (ja) {
            q(ja)
        }
    };
    t.Z = {};
    t.Z.Ea = function (a, c) {
        var d,
            e,
            g;
        a = t.h.copy(a);
        for (d in c) c.hasOwnProperty(d) && (e = a[d], g = c[d], a[d] = t.h.Ya(e) && t.h.Ya(g) ? t.Z.Ea(e, g) : c[d]);
        return a
    };
    t.a = t.ua.extend({
        i: function (a, c, d) {
            this.d = a;
            this.m = t.h.copy(this.m);
            c = this.options(c);
            this.K = c.id || c.el && c.el.id;
            this.K || (this.K = (a.id && a.id() || "no_player") + "_component_" + t.p++);
            this.Vd = c.name || k;
            this.b = c.el || this.e();
            this.O = [];
            this.Ua = {};
            this.Va = {};
            this.Ec();
            this.H(d);
            if (c.Rc !== l) {
                var e,
                    g;
                this.j().reportUserActivity && (e = t.bind(this.j(), this.j().reportUserActivity), this.c("touchstart", function () {
                    e();
                    this.clearInterval(g);
                    g = this.setInterval(e, 250)
                }), a = function () {
                    e();
                    this.clearInterval(g)
                }, this.c("touchmove",
                    e), this.c("touchend", a), this.c("touchcancel", a))
            }
        }
    });
    s = t.a.prototype;
    s.dispose = function () {
        this.l({
            type: "dispose",
            bubbles: l
        });
        if (this.O)
            for (var a = this.O.length - 1; 0 <= a; a--) this.O[a].dispose && this.O[a].dispose();
        this.Va = this.Ua = this.O = k;
        this.k();
        this.b.parentNode && this.b.parentNode.removeChild(this.b);
        t.Qc(this.b);
        this.b = k
    };
    s.d = f;
    s.j = n("d");
    s.options = function (a) {
        return a === b ? this.m : this.m = t.Z.Ea(this.m, a)
    };
    s.e = function (a, c) {
        return t.e(a, c)
    };
    s.t = function (a) {
        var c = this.d.language(),
            d = this.d.languages();
        return d && d[c] && d[c][a] ? d[c][a] : a
    };
    s.w = n("b");
    s.ma = function () {
        return this.v || this.b
    };
    s.id = n("K");
    s.name = n("Vd");
    s.children = n("O");
    s.Kd = function (a) {
        return this.Ua[a]
    };
    s.na = function (a) {
        return this.Va[a]
    };
    s.U = function (a, c) {
        var d,
            e;
        "string" === typeof a ? (e = a, c = c || {}, d = c.componentClass || t.ba(e), c.name = e, d = new window.videojs[d](this.d || this, c)) : d = a;
        this.O.push(d);
        "function" === typeof d.id && (this.Ua[d.id()] = d);
        (e = e || d.name && d.name()) && (this.Va[e] = d);
        "function" === typeof d.el && d.el() && this.ma().appendChild(d.el());
        return d
    };
    s.removeChild = function (a) {
        "string" === typeof a && (a = this.na(a));
        if (a && this.O) {
            for (var c = l, d = this.O.length - 1; 0 <= d; d--)
                if (this.O[d] === a) {
                    c = f;
                    this.O.splice(d, 1);
                    break
                }
            c && (this.Ua[a.id] = k, this.Va[a.name] = k, (c = a.w()) && c.parentNode === this.ma() && this.ma().removeChild(a.w()))
        }
    };
    s.Ec = function () {
        var a,
            c,
            d,
            e,
            g,
            h;
        a = this;
        c = a.options();
        if (d = c.children)
            if (h = function (d, e) {
                c[d] !== b && (e = c[d]);
                e !== l && (a[d] = a.U(d, e))
            }, t.h.isArray(d))
                for (var j = 0; j < d.length; j++) e = d[j], "string" == typeof e ? (g = e, e = {}) : g = e.name, h(g, e);
            else t.h.X(d, h)
    };
    s.S = r("");
    s.c = function (a, c, d) {
        var e,
            g,
            h;
        "string" === typeof a || t.h.isArray(a) ? t.c(this.b, a, t.bind(this, c)) : (e = t.bind(this, d), h = this, g = function () {
            h.k(a, c, e)
        }, g.p = e.p, this.c("dispose", g), d = function () {
            h.k("dispose", g)
        }, d.p = e.p, a.nodeName ? (t.c(a, c, e), t.c(a, "dispose", d)) : "function" === typeof a.c && (a.c(c, e), a.c("dispose", d)));
        return this
    };
    s.k = function (a, c, d) {
        !a || "string" === typeof a || t.h.isArray(a) ? t.k(this.b, a, c) : (d = t.bind(this, d), this.k("dispose", d), a.nodeName ? (t.k(a, c, d), t.k(a, "dispose", d)) : (a.k(c, d), a.k("dispose", d)));
        return this
    };
    s.Q = function (a, c, d) {
        var e,
            g,
            h;
        "string" === typeof a || t.h.isArray(a) ? t.Q(this.b, a, t.bind(this, c)) : (e = t.bind(this, d), g = this, h = function () {
            g.k(a, c, h);
            e.apply(this, arguments)
        }, h.p = e.p, this.c(a, c, h));
        return this
    };
    s.l = function (a) {
        t.l(this.b, a);
        return this
    };
    s.H = function (a) {
        a && (this.oa ? a.call(this) : (this.eb === b && (this.eb = []), this.eb.push(a)));
        return this
    };
    s.Ka = function () {
        this.oa = f;
        var a = this.eb;
        if (a && 0 < a.length) {
            for (var c = 0, d = a.length; c < d; c++) a[c].call(this);
            this.eb = [];
            this.l("ready")
        }
    };
    s.Xa = function (a) {
        return t.Xa(this.b, a)
    };
    s.n = function (a) {
        t.n(this.b, a);
        return this
    };
    s.r = function (a) {
        t.r(this.b, a);
        return this
    };
    s.show = function () {
        this.b.style.display = "block";
        return this
    };
    s.Y = function () {
        this.b.style.display = "none";
        return this
    };

    function E(a) {
        a.r("vjs-lock-showing")
    }

    s.disable = function () {
        this.Y();
        this.show = m()
    };
    s.width = function (a, c) {
        return F(this, "width", a, c)
    };
    s.height = function (a, c) {
        return F(this, "height", a, c)
    };
    s.Dd = function (a, c) {
        return this.width(a, f).height(c)
    };

    function F(a, c, d, e) {
        if (d !== b) {
            if (d === k || t.Pd(d))
                d = 0;
            a.b.style[c] = -1 !== ("" + d).indexOf("%") || -1 !== ("" + d).indexOf("px") ? d : "auto" === d ? "" : d + "px";
            e || a.l("resize");
            return a
        }
        if (!a.b) return 0;
        d = a.b.style[c];
        e = d.indexOf("px");
        return -1 !== e ? parseInt(d.slice(0, e), 10) : parseInt(a.b["offset" + t.ba(c)], 10)
    }

    function G(a) {
        var c,
            d,
            e,
            g,
            h,
            j,
            p,
            q;
        c = 0;
        d = k;
        a.c("touchstart", function (a) {
            1 === a.touches.length && (d = a.touches[0], c = (new Date).getTime(), g = f)
        });
        a.c("touchmove", function (a) {
            1 < a.touches.length ? g = l : d && (j = a.touches[0].pageX - d.pageX, p = a.touches[0].pageY - d.pageY, q = Math.sqrt(j * j + p * p), 22 < q && (g = l))
        });
        h = function () {
            g = l
        };
        a.c("touchleave", h);
        a.c("touchcancel", h);
        a.c("touchend", function (a) {
            d = k;
            g === f && (e = (new Date).getTime() - c, 250 > e && (a.preventDefault(), this.l("tap")))
        })
    }

    s.setTimeout = function (a, c) {
        function d() {
            this.clearTimeout(e)
        }

        a = t.bind(this, a);
        var e = setTimeout(a, c);
        d.p = "vjs-timeout-" + e;
        this.c("dispose", d);
        return e
    };
    s.clearTimeout = function (a) {
        function c() {
        }

        clearTimeout(a);
        c.p = "vjs-timeout-" + a;
        this.k("dispose", c);
        return a
    };
    s.setInterval = function (a, c) {
        function d() {
            this.clearInterval(e)
        }

        a = t.bind(this, a);
        var e = setInterval(a, c);
        d.p = "vjs-interval-" + e;
        this.c("dispose", d);
        return e
    };
    s.clearInterval = function (a) {
        function c() {
        }

        clearInterval(a);
        c.p = "vjs-interval-" + a;
        this.k("dispose", c);
        return a
    };
    t.u = t.a.extend({
        i: function (a, c) {
            t.a.call(this, a, c);
            G(this);
            this.c("tap", this.s);
            this.c("click", this.s);
            this.c("focus", this.bb);
            this.c("blur", this.ab)
        }
    });
    s = t.u.prototype;
    s.e = function (a, c) {
        var d;
        c = t.h.z({
            className: this.S(),
            role: "button",
            "aria-live": "polite",
            tabIndex: 0
        }, c);
        d = t.a.prototype.e.call(this, a, c);
        c.innerHTML || (this.v = t.e("div", {
            className: "vjs-control-content"
        }), this.yb = t.e("span", {
            className: "vjs-control-text",
            innerHTML: this.t(this.la) || "Need Text"
        }), this.v.appendChild(this.yb), d.appendChild(this.v));
        return d
    };
    s.S = function () {
        return "vjs-control " + t.a.prototype.S.call(this)
    };
    s.s = m();
    s.bb = function () {
        t.c(document, "keydown", t.bind(this, this.ea))
    };
    s.ea = function (a) {
        if (32 == a.which || 13 == a.which) a.preventDefault(), this.s()
    };
    s.ab = function () {
        t.k(document, "keydown", t.bind(this, this.ea))
    };
    t.R = t.a.extend({
        i: function (a, c) {
            t.a.call(this, a, c);
            this.td = this.na(this.m.barName);
            this.handle = this.na(this.m.handleName);
            this.c("mousedown", this.cb);
            this.c("touchstart", this.cb);
            this.c("focus", this.bb);
            this.c("blur", this.ab);
            this.c("click", this.s);
            this.c(a, "controlsvisible", this.update);
            this.c(a, this.Mc, this.update)
        }
    });
    s = t.R.prototype;
    s.e = function (a, c) {
        c = c || {};
        c.className += " vjs-slider";
        c = t.h.z({
            role: "slider",
            "aria-valuenow": 0,
            "aria-valuemin": 0,
            "aria-valuemax": 100,
            tabIndex: 0
        }, c);
        return t.a.prototype.e.call(this, a, c)
    };
    s.cb = function (a) {
        a.preventDefault();
        t.ud();
        this.n("vjs-sliding");
        this.c(document, "mousemove", this.fa);
        this.c(document, "mouseup", this.qa);
        this.c(document, "touchmove", this.fa);
        this.c(document, "touchend", this.qa);
        this.fa(a)
    };
    s.fa = m();
    s.qa = function () {
        t.ve();
        this.r("vjs-sliding");
        this.k(document, "mousemove", this.fa);
        this.k(document, "mouseup", this.qa);
        this.k(document, "touchmove", this.fa);
        this.k(document, "touchend", this.qa);
        this.update()
    };
    s.update = function () {
        if (this.b) {
            var a,
                c = this.Ib(),
                d = this.handle,
                e = this.td;
            isNaN(c) && (c = 0);
            a = c;
            if (d) {
                a = this.b.offsetWidth;
                var g = d.w().offsetWidth;
                a = g ? g / a : 0;
                c *= 1 - a;
                a = c + a / 2;
                d.w().style.left = t.round(100 * c, 2) + "%"
            }
            e && (e.w().style.width = t.round(100 * a, 2) + "%")
        }
    };

    function H(a, c) {
        var d,
            e,
            g,
            h;
        d = a.b;
        e = t.Hd(d);
        h = g = d.offsetWidth;
        d = a.handle;
        if (a.options().vertical) return h = e.top, e = c.changedTouches ? c.changedTouches[0].pageY : c.pageY, d && (d = d.w().offsetHeight, h += d / 2, g -= d), Math.max(0, Math.min(1, (h - e + g) / g));
        g = e.left;
        e = c.changedTouches ? c.changedTouches[0].pageX : c.pageX;
        d && (d = d.w().offsetWidth, g += d / 2, h -= d);
        return Math.max(0, Math.min(1, (e - g) / h))
    }

    s.bb = function () {
        this.c(document, "keydown", this.ea)
    };
    s.ea = function (a) {
        if (37 == a.which || 40 == a.which) a.preventDefault(), this.Xc();
        else if (38 == a.which || 39 == a.which) a.preventDefault(), this.Yc()
    };
    s.ab = function () {
        this.k(document, "keydown", this.ea)
    };
    s.s = function (a) {
        a.stopImmediatePropagation();
        a.preventDefault()
    };
    t.$ = t.a.extend();
    t.$.prototype.defaultValue = 0;
    t.$.prototype.e = function (a, c) {
        c = c || {};
        c.className += " vjs-slider-handle";
        c = t.h.z({
            innerHTML: '<span class="vjs-control-text">' + this.defaultValue + "</span>"
        }, c);
        return t.a.prototype.e.call(this, "div", c)
    };
    t.ja = t.a.extend();

    function ca(a, c) {
        a.U(c);
        c.c("click", t.bind(a, function () {
            E(this)
        }))
    }

    t.ja.prototype.e = function () {
        var a = this.options().sc || "ul";
        this.v = t.e(a, {
            className: "vjs-menu-content"
        });
        a = t.a.prototype.e.call(this, "div", {
            append: this.v,
            className: "vjs-menu"
        });
        a.appendChild(this.v);
        t.c(a, "click", function (a) {
            a.preventDefault();
            a.stopImmediatePropagation()
        });
        return a
    };
    t.J = t.u.extend({
        i: function (a, c) {
            t.u.call(this, a, c);
            this.selected(c.selected)
        }
    });
    t.J.prototype.e = function (a, c) {
        return t.u.prototype.e.call(this, "li", t.h.z({
            className: "vjs-menu-item",
            innerHTML: this.t(this.m.label)
        }, c))
    };
    t.J.prototype.s = function () {
        this.selected(f)
    };
    t.J.prototype.selected = function (a) {
        a ? (this.n("vjs-selected"), this.b.setAttribute("aria-selected", f)) : (this.r("vjs-selected"), this.b.setAttribute("aria-selected", l))
    };
    t.L = t.u.extend({
        i: function (a, c) {
            t.u.call(this, a, c);
            this.Da = this.za();
            this.U(this.Da);
            this.P && 0 === this.P.length && this.Y();
            this.c("keydown", this.ea);
            this.b.setAttribute("aria-haspopup", f);
            this.b.setAttribute("role", "button")
        }
    });
    s = t.L.prototype;
    s.wa = l;
    s.za = function () {
        var a = new t.ja(this.d);
        this.options().title && a.ma().appendChild(t.e("li", {
            className: "vjs-menu-title",
            innerHTML: t.ba(this.options().title),
            re: -1
        }));
        if (this.P = this.createItems())
            for (var c = 0; c < this.P.length; c++) ca(a, this.P[c]);
        return a
    };
    s.ya = m();
    s.S = function () {
        return this.className + " vjs-menu-button " + t.u.prototype.S.call(this)
    };
    s.bb = m();
    s.ab = m();
    s.s = function () {
        this.Q("mouseout", t.bind(this, function () {
            E(this.Da);
            this.b.blur()
        }));
        this.wa ? I(this) : J(this)
    };
    s.ea = function (a) {
        32 == a.which || 13 == a.which ? (this.wa ? I(this) : J(this), a.preventDefault()) : 27 == a.which && (this.wa && I(this), a.preventDefault())
    };

    function J(a) {
        a.wa = f;
        a.Da.n("vjs-lock-showing");
        a.b.setAttribute("aria-pressed", f);
        a.P && 0 < a.P.length && a.P[0].w().focus()
    }

    function I(a) {
        a.wa = l;
        E(a.Da);
        a.b.setAttribute("aria-pressed", l)
    }

    t.D = function (a) {
        "number" === typeof a ? this.code = a : "string" === typeof a ? this.message = a : "object" === typeof a && t.h.z(this, a);
        this.message || (this.message = t.D.Bd[this.code] || "")
    };
    t.D.prototype.code = 0;
    t.D.prototype.message = "";
    t.D.prototype.status = k;
    t.D.Wa = "MEDIA_ERR_CUSTOM MEDIA_ERR_ABORTED MEDIA_ERR_NETWORK MEDIA_ERR_DECODE MEDIA_ERR_SRC_NOT_SUPPORTED MEDIA_ERR_ENCRYPTED".split(" ");
    t.D.Bd = {
        1: "You aborted the video playback",
        2: "A network error caused the video download to fail part-way.",
        3: "The video playback was aborted due to a corruption problem or because the video used features your browser did not support.",
        4: "The video could not be loaded, either because the server or network failed or because the format is not supported.",
        5: "The video is encrypted and we do not have the keys to decrypt it."
    };
    for (var K = 0; K < t.D.Wa.length; K++) t.D[t.D.Wa[K]] = K, t.D.prototype[t.D.Wa[K]] = K;
    var L,
        M,
        N,
        O;
    L = ["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "), "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "), "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "), "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "), "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")];
    M = L[0];
    for (O = 0; O < L.length; O++)
        if (L[O][1] in document) {
            N = L[O];
            break
        }
    if (N) {
        t.Sa.Hb = {};
        for (O = 0; O < N.length; O++) t.Sa.Hb[M[O]] = N[O]
    }
    t.Player = t.a.extend({
        i: function (a, c, d) {
            this.I = a;
            a.id = a.id || "vjs_video_" + t.p++;
            this.se = a && t.Ca(a);
            c = t.h.z(da(a), c);
            this.Za = c.language || t.options.language;
            this.Td = c.languages || t.options.languages;
            this.F = {};
            this.Nc = c.poster || "";
            this.zb = !!c.controls;
            a.controls = l;
            c.Rc = l;
            P(this, "audio" === this.I.nodeName.toLowerCase());
            t.a.call(this, this, c, d);
            this.controls() ? this.n("vjs-controls-enabled") : this.n("vjs-controls-disabled");
            P(this) && this.n("vjs-audio");
            t.Fa[this.K] = this;
            c.plugins && t.h.X(c.plugins, function (a,
                                                    c) {
                this[a](c)
            }, this);
            var e,
                g,
                h,
                j,
                p;
            e = t.bind(this, this.reportUserActivity);
            this.c("mousedown", function () {
                e();
                this.clearInterval(g);
                g = this.setInterval(e, 250)
            });
            this.c("mousemove", function (a) {
                if (a.screenX != j || a.screenY != p) j = a.screenX, p = a.screenY, e()
            });
            this.c("mouseup", function () {
                e();
                this.clearInterval(g)
            });
            this.c("keydown", e);
            this.c("keyup", e);
            this.setInterval(function () {
                if (this.ta) {
                    this.ta = l;
                    this.userActive(f);
                    this.clearTimeout(h);
                    var a = this.options().inactivityTimeout;
                    0 < a && (h = this.setTimeout(function () {
                        this.ta ||
                        this.userActive(l)
                    }, a))
                }
            }, 250)
        }
    });
    s = t.Player.prototype;
    s.language = function (a) {
        if (a === b) return this.Za;
        this.Za = a;
        return this
    };
    s.languages = n("Td");
    s.m = t.options;
    s.dispose = function () {
        this.l("dispose");
        this.k("dispose");
        t.Fa[this.K] = k;
        this.I && this.I.player && (this.I.player = k);
        this.b && this.b.player && (this.b.player = k);
        this.o && this.o.dispose();
        t.a.prototype.dispose.call(this)
    };

    function da(a) {
        var c,
            d,
            e = {
                sources: [],
                tracks: []
            };
        c = t.Ca(a);
        d = c["data-setup"];
        d !== k && t.h.z(c, t.JSON.parse(d || "{}"));
        t.h.z(e, c);
        if (a.hasChildNodes()) {
            var g,
                h;
            a = a.childNodes;
            g = 0;
            for (h = a.length; g < h; g++) c = a[g], d = c.nodeName.toLowerCase(), "source" === d ? e.sources.push(t.Ca(c)) : "track" === d && e.tracks.push(t.Ca(c))
        }
        return e
    }

    s.e = function () {
        var a = this.b = t.a.prototype.e.call(this, "div"),
            c = this.I,
            d;
        c.removeAttribute("width");
        c.removeAttribute("height");
        if (c.hasChildNodes()) {
            var e,
                g,
                h,
                j,
                p;
            e = c.childNodes;
            g = e.length;
            for (p = []; g--;) h = e[g], j = h.nodeName.toLowerCase(), "track" === j && p.push(h);
            for (e = 0; e < p.length; e++) c.removeChild(p[e])
        }
        d = t.Ca(c);
        t.h.X(d, function (c) {
            "class" == c ? a.className = d[c] : a.setAttribute(c, d[c])
        });
        c.id += "_html5_api";
        c.className = "vjs-tech";
        c.player = a.player = this;
        this.n("vjs-paused");
        this.width(this.m.width, f);
        this.height(this.m.height,
            f);
        c.Md = c.networkState;
        c.parentNode && c.parentNode.insertBefore(a, c);
        t.Kb(c, a);
        this.b = a;
        this.c("loadstart", this.Zd);
        this.c("waiting", this.ee);
        this.c(["canplay", "canplaythrough", "playing", "ended"], this.de);
        this.c("seeking", this.be);
        this.c("seeked", this.ae);
        this.c("ended", this.Wd);
        this.c("play", this.Qb);
        this.c("firstplay", this.Xd);
        this.c("pause", this.Pb);
        this.c("progress", this.$d);
        this.c("durationchange", this.Kc);
        this.c("fullscreenchange", this.Yd);
        return a
    };

    function Q(a, c, d) {
        a.o && (a.oa = l, a.o.dispose(), a.o = l);
        "Html5" !== c && a.I && (t.g.Cb(a.I), a.I = k);
        a.Ia = c;
        a.oa = l;
        var e = t.h.z({
            source: d,
            parentEl: a.b
        }, a.m[c.toLowerCase()]);
        d && (a.vc = d.type, d.src == a.F.src && 0 < a.F.currentTime && (e.startTime = a.F.currentTime), a.F.src = d.src);
        a.o = new window.videojs[c](a, e);
        a.o.H(function () {
            this.d.Ka()
        })
    }

    s.Zd = function () {
        this.error(k);
        this.paused() ? (R(this, l), this.Q("play", function () {
            R(this, f)
        })) : this.l("firstplay")
    };
    s.Dc = l;

    function R(a, c) {
        c !== b && a.Dc !== c && ((a.Dc = c) ? (a.n("vjs-has-started"), a.l("firstplay")) : a.r("vjs-has-started"))
    }

    s.Qb = function () {
        this.r("vjs-paused");
        this.n("vjs-playing")
    };
    s.ee = function () {
        this.n("vjs-waiting")
    };
    s.de = function () {
        this.r("vjs-waiting")
    };
    s.be = function () {
        this.n("vjs-seeking")
    };
    s.ae = function () {
        this.r("vjs-seeking")
    };
    s.Xd = function () {
        this.m.starttime && this.currentTime(this.m.starttime);
        this.n("vjs-has-started")
    };
    s.Pb = function () {
        this.r("vjs-playing");
        this.n("vjs-paused")
    };
    s.$d = function () {
        1 == this.bufferedPercent() && this.l("loadedalldata")
    };
    s.Wd = function () {
        this.m.loop ? (this.currentTime(0), this.play()) : this.paused() || this.pause()
    };
    s.Kc = function () {
        var a = S(this, "duration");
        a && (0 > a && (a = Infinity), this.duration(a), Infinity === a ? this.n("vjs-live") : this.r("vjs-live"))
    };
    s.Yd = function () {
        this.isFullscreen() ? this.n("vjs-fullscreen") : this.r("vjs-fullscreen")
    };

    function T(a, c, d) {
        if (a.o && !a.o.oa) a.o.H(function () {
            this[c](d)
        }); else try {
            a.o[c](d)
        } catch (e) {
            throw t.log(e), e;
        }
    }

    function S(a, c) {
        if (a.o && a.o.oa) try {
            return a.o[c]()
        } catch (d) {
            throw a.o[c] === b ? t.log("Video.js: " + c + " method not defined for " + a.Ia + " playback technology.", d) : "TypeError" == d.name ? (t.log("Video.js: " + c + " unavailable on " + a.Ia + " playback technology element.", d), a.o.oa = l) : t.log(d), d;
        }
    }

    s.play = function () {
        T(this, "play");
        return this
    };
    s.pause = function () {
        T(this, "pause");
        return this
    };
    s.paused = function () {
        return S(this, "paused") === l ? l : f
    };
    s.currentTime = function (a) {
        return a !== b ? (T(this, "setCurrentTime", a), this) : this.F.currentTime = S(this, "currentTime") || 0
    };
    s.duration = function (a) {
        if (a !== b) return this.F.duration = parseFloat(a), this;
        this.F.duration === b && this.Kc();
        return this.F.duration || 0
    };
    s.remainingTime = function () {
        return this.duration() - this.currentTime()
    };
    s.buffered = function () {
        var a = S(this, "buffered");
        if (!a || !a.length)
            a = t.Ab(0, 0);
        return a
    };
    s.bufferedPercent = function () {
        var a = this.duration(),
            c = this.buffered(),
            d = 0,
            e,
            g;
        if (!a) return 0;
        for (var h = 0; h < c.length; h++) e = c.start(h), g = c.end(h), g > a && (g = a), d += g - e;
        return d / a
    };
    s.volume = function (a) {
        if (a !== b) return a = Math.max(0, Math.min(1, parseFloat(a))), this.F.volume = a, T(this, "setVolume", a), t.je(a), this;
        a = parseFloat(S(this, "volume"));
        return isNaN(a) ? 1 : a
    };
    s.muted = function (a) {
        return a !== b ? (T(this, "setMuted", a), this) : S(this, "muted") || l
    };
    s.Ha = function () {
        return S(this, "supportsFullScreen") || l
    };
    s.Gc = l;
    s.isFullscreen = function (a) {
        return a !== b ? (this.Gc = !!a, this) : this.Gc
    };
    s.isFullScreen = function (a) {
        t.log.warn('player.isFullScreen() has been deprecated, use player.isFullscreen() with a lowercase "s")');
        return this.isFullscreen(a)
    };
    s.requestFullscreen = function () {
        var a = t.Sa.Hb;
        this.isFullscreen(f);
        a ? (t.c(document, a.fullscreenchange, t.bind(this, function (c) {
            this.isFullscreen(document[a.fullscreenElement]);
            this.isFullscreen() === l && t.k(document, a.fullscreenchange, arguments.callee);
            this.l("fullscreenchange")
        })), this.b[a.requestFullscreen]()) : this.o.Ha() ? T(this, "enterFullScreen") : (this.zc(), this.l("fullscreenchange"));
        return this
    };
    s.requestFullScreen = function () {
        t.log.warn('player.requestFullScreen() has been deprecated, use player.requestFullscreen() with a lowercase "s")');
        return this.requestFullscreen()
    };
    s.exitFullscreen = function () {
        var a = t.Sa.Hb;
        this.isFullscreen(l);
        if (a) document[a.exitFullscreen](); else
            this.o.Ha() ? T(this, "exitFullScreen") : (this.Eb(), this.l("fullscreenchange"));
        return this
    };
    s.cancelFullScreen = function () {
        t.log.warn("player.cancelFullScreen() has been deprecated, use player.exitFullscreen()");
        return this.exitFullscreen()
    };
    s.zc = function () {
        this.Od = f;
        this.Ed = document.documentElement.style.overflow;
        t.c(document, "keydown", t.bind(this, this.Bc));
        document.documentElement.style.overflow = "hidden";
        t.n(document.body, "vjs-full-window");
        this.l("enterFullWindow")
    };
    s.Bc = function (a) {
        27 === a.keyCode && (this.isFullscreen() === f ? this.exitFullscreen() : this.Eb())
    };
    s.Eb = function () {
        this.Od = l;
        t.k(document, "keydown", this.Bc);
        document.documentElement.style.overflow = this.Ed;
        t.r(document.body, "vjs-full-window");
        this.l("exitFullWindow")
    };
    s.selectSource = function (a) {
        for (var c = 0, d = this.m.techOrder; c < d.length; c++) {
            var e = t.ba(d[c]),
                g = window.videojs[e];
            if (g) {
                if (g.isSupported())
                    for (var h = 0, j = a; h < j.length; h++) {
                        var p = j[h];
                        if (g.canPlaySource(p)) return {
                            source: p,
                            o: e
                        }
                    }
            } else t.log.error('The "' + e + '" tech is undefined. Skipped browser support check for that tech.')
        }
        return l
    };
    s.src = function (a) {
        if (a === b) return S(this, "src");
        t.h.isArray(a) ? U(this, a) : "string" === typeof a ? this.src({
            src: a
        }) : a instanceof Object && (a.type && !window.videojs[this.Ia].canPlaySource(a) ? U(this, [a]) : (this.F.src = a.src, this.vc = a.type || "", this.H(function () {
            window.videojs[this.Ia].prototype.hasOwnProperty("setSource") ? T(this, "setSource", a) : T(this, "src", a.src);
            "auto" == this.m.preload && this.load();
            this.m.autoplay && this.play()
        })));
        return this
    };

    function U(a, c) {
        var d = a.selectSource(c);
        d ? d.o === a.Ia ? a.src(d.source) : Q(a, d.o, d.source) : (a.setTimeout(function () {
            this.error({
                code: 4,
                message: this.t(this.options().notSupportedMessage)
            })
        }, 0), a.Ka())
    }

    s.load = function () {
        T(this, "load");
        return this
    };
    s.currentSrc = function () {
        return S(this, "currentSrc") || this.F.src || ""
    };
    s.zd = function () {
        return this.vc || ""
    };
    s.Ga = function (a) {
        return a !== b ? (T(this, "setPreload", a), this.m.preload = a, this) : S(this, "preload")
    };
    s.autoplay = function (a) {
        return a !== b ? (T(this, "setAutoplay", a), this.m.autoplay = a, this) : S(this, "autoplay")
    };
    s.loop = function (a) {
        return a !== b ? (T(this, "setLoop", a), this.m.loop = a, this) : S(this, "loop")
    };
    s.poster = function (a) {
        if (a === b) return this.Nc;
        a || (a = "");
        this.Nc = a;
        T(this, "setPoster", a);
        this.l("posterchange");
        return this
    };
    s.controls = function (a) {
        return a !== b ? (a = !!a, this.zb !== a && ((this.zb = a) ? (this.r("vjs-controls-disabled"), this.n("vjs-controls-enabled"), this.l("controlsenabled")) : (this.r("vjs-controls-enabled"), this.n("vjs-controls-disabled"), this.l("controlsdisabled"))), this) : this.zb
    };
    t.Player.prototype.Xb;
    s = t.Player.prototype;
    s.usingNativeControls = function (a) {
        return a !== b ? (a = !!a, this.Xb !== a && ((this.Xb = a) ? (this.n("vjs-using-native-controls"), this.l("usingnativecontrols")) : (this.r("vjs-using-native-controls"), this.l("usingcustomcontrols"))), this) : this.Xb
    };
    s.da = k;
    s.error = function (a) {
        if (a === b) return this.da;
        if (a === k) return this.da = a, this.r("vjs-error"), this;
        this.da = a instanceof t.D ? a : new t.D(a);
        this.l("error");
        this.n("vjs-error");
        t.log.error("(CODE:" + this.da.code + " " + t.D.Wa[this.da.code] + ")", this.da.message, this.da);
        return this
    };
    s.ended = function () {
        return S(this, "ended")
    };
    s.seeking = function () {
        return S(this, "seeking")
    };
    s.ta = f;
    s.reportUserActivity = function () {
        this.ta = f
    };
    s.Wb = f;
    s.userActive = function (a) {
        return a !== b ? (a = !!a, a !== this.Wb && ((this.Wb = a) ? (this.ta = f, this.r("vjs-user-inactive"), this.n("vjs-user-active"), this.l("useractive")) : (this.ta = l, this.o && this.o.Q("mousemove", function (a) {
            a.stopPropagation();
            a.preventDefault()
        }), this.r("vjs-user-active"), this.n("vjs-user-inactive"), this.l("userinactive"))), this) : this.Wb
    };
    s.playbackRate = function (a) {
        return a !== b ? (T(this, "setPlaybackRate", a), this) : this.o && this.o.featuresPlaybackRate ? S(this, "playbackRate") : 1
    };
    s.Fc = l;

    function P(a, c) {
        return c !== b ? (a.Fc = !!c, a) : a.Fc
    }

    t.Na = t.a.extend();
    t.Na.prototype.m = {
        Ie: "play",
        children: {
            playToggle: {},
            currentTimeDisplay: {},
            timeDivider: {},
            durationDisplay: {},
            remainingTimeDisplay: {},
            liveDisplay: {},
            progressControl: {},
            fullscreenToggle: {},
            volumeControl: {},
            muteToggle: {},
            playbackRateMenuButton: {}
        }
    };
    t.Na.prototype.e = function () {
        return t.e("div", {
            className: "vjs-control-bar"
        })
    };
    t.bc = t.a.extend({
        i: function (a, c) {
            t.a.call(this, a, c)
        }
    });
    t.bc.prototype.e = function () {
        var a = t.a.prototype.e.call(this, "div", {
            className: "vjs-live-controls vjs-control"
        });
        this.v = t.e("div", {
            className: "vjs-live-display",
            innerHTML: '<span class="vjs-control-text">' + this.t("Stream Type") + "</span>" + this.t("LIVE"),
            "aria-live": "off"
        });
        a.appendChild(this.v);
        return a
    };
    t.ec = t.u.extend({
        i: function (a, c) {
            t.u.call(this, a, c);
            this.c(a, "play", this.Qb);
            this.c(a, "pause", this.Pb)
        }
    });
    s = t.ec.prototype;
    s.la = "Play";
    s.S = function () {
        return "vjs-play-control " + t.u.prototype.S.call(this)
    };
    s.s = function () {
        this.d.paused() ? this.d.play() : this.d.pause()
    };
    s.Qb = function () {
        this.r("vjs-paused");
        this.n("vjs-playing");
        this.b.children[0].children[0].innerHTML = this.t("Pause")
    };
    s.Pb = function () {
        this.r("vjs-playing");
        this.n("vjs-paused");
        this.b.children[0].children[0].innerHTML = this.t("Play")
    };
    t.kb = t.a.extend({
        i: function (a, c) {
            t.a.call(this, a, c);
            this.c(a, "timeupdate", this.ia)
        }
    });
    t.kb.prototype.e = function () {
        var a = t.a.prototype.e.call(this, "div", {
            className: "vjs-current-time vjs-time-controls vjs-control"
        });
        this.v = t.e("div", {
            className: "vjs-current-time-display",
            innerHTML: '<span class="vjs-control-text">Current Time </span>0:00',
            "aria-live": "off"
        });
        a.appendChild(this.v);
        return a
    };
    t.kb.prototype.ia = function () {
        var a = this.d.fb ? this.d.F.currentTime : this.d.currentTime();
        this.v.innerHTML = '<span class="vjs-control-text">' + this.t("Current Time") + "</span> " + t.Ba(a, this.d.duration())
    };
    t.lb = t.a.extend({
        i: function (a, c) {
            t.a.call(this, a, c);
            this.c(a, "timeupdate", this.ia)
        }
    });
    t.lb.prototype.e = function () {
        var a = t.a.prototype.e.call(this, "div", {
            className: "vjs-duration vjs-time-controls vjs-control"
        });
        this.v = t.e("div", {
            className: "vjs-duration-display",
            innerHTML: '<span class="vjs-control-text">' + this.t("Duration Time") + "</span> 0:00",
            "aria-live": "off"
        });
        a.appendChild(this.v);
        return a
    };
    t.lb.prototype.ia = function () {
        var a = this.d.duration();
        a && (this.v.innerHTML = '<span class="vjs-control-text">' + this.t("Duration Time") + "</span> " + t.Ba(a))
    };
    t.lc = t.a.extend({
        i: function (a, c) {
            t.a.call(this, a, c)
        }
    });
    t.lc.prototype.e = function () {
        return t.a.prototype.e.call(this, "div", {
            className: "vjs-time-divider",
            innerHTML: "<div><span>/</span></div>"
        })
    };
    t.sb = t.a.extend({
        i: function (a, c) {
            t.a.call(this, a, c);
            this.c(a, "timeupdate", this.ia)
        }
    });
    t.sb.prototype.e = function () {
        var a = t.a.prototype.e.call(this, "div", {
            className: "vjs-remaining-time vjs-time-controls vjs-control"
        });
        this.v = t.e("div", {
            className: "vjs-remaining-time-display",
            innerHTML: '<span class="vjs-control-text">' + this.t("Remaining Time") + "</span> -0:00",
            "aria-live": "off"
        });
        a.appendChild(this.v);
        return a
    };
    t.sb.prototype.ia = function () {
        this.d.duration() && (this.v.innerHTML = '<span class="vjs-control-text">' + this.t("Remaining Time") + "</span> -" + t.Ba(this.d.remainingTime()))
    };
    t.Oa = t.u.extend({
        i: function (a, c) {
            t.u.call(this, a, c)
        }
    });
    t.Oa.prototype.la = "Fullscreen";
    t.Oa.prototype.S = function () {
        return "vjs-fullscreen-control " + t.u.prototype.S.call(this)
    };
    t.Oa.prototype.s = function () {
        this.d.isFullscreen() ? (this.d.exitFullscreen(), this.yb.innerHTML = this.t("Fullscreen")) : (this.d.requestFullscreen(), this.yb.innerHTML = this.t("Non-Fullscreen"))
    };
    t.rb = t.a.extend({
        i: function (a, c) {
            t.a.call(this, a, c)
        }
    });
    t.rb.prototype.m = {
        children: {
            seekBar: {}
        }
    };
    t.rb.prototype.e = function () {
        return t.a.prototype.e.call(this, "div", {
            className: "vjs-progress-control vjs-control"
        })
    };
    t.hc = t.R.extend({
        i: function (a, c) {
            t.R.call(this, a, c);
            this.c(a, "timeupdate", this.sa);
            a.H(t.bind(this, this.sa))
        }
    });
    s = t.hc.prototype;
    s.m = {
        children: {
            loadProgressBar: {},
            playProgressBar: {},
            seekHandle: {}
        },
        barName: "playProgressBar",
        handleName: "seekHandle"
    };
    s.Mc = "timeupdate";
    s.e = function () {
        return t.R.prototype.e.call(this, "div", {
            className: "vjs-progress-holder",
            "aria-label": "video progress bar"
        })
    };
    s.sa = function () {
        var a = this.d.fb ? this.d.F.currentTime : this.d.currentTime();
        this.b.setAttribute("aria-valuenow", t.round(100 * this.Ib(), 2));
        this.b.setAttribute("aria-valuetext", t.Ba(a, this.d.duration()))
    };
    s.Ib = function () {
        return this.d.currentTime() / this.d.duration()
    };
    s.cb = function (a) {
        t.R.prototype.cb.call(this, a);
        this.d.fb = f;
        this.xe = !this.d.paused();
        this.d.pause()
    };
    s.fa = function (a) {
        a = H(this, a) * this.d.duration();
        a == this.d.duration() && (a -= 0.1);
        this.d.currentTime(a)
    };
    s.qa = function (a) {
        t.R.prototype.qa.call(this, a);
        this.d.fb = l;
        this.xe && this.d.play()
    };
    s.Yc = function () {
        this.d.currentTime(this.d.currentTime() + 5)
    };
    s.Xc = function () {
        this.d.currentTime(this.d.currentTime() - 5)
    };
    t.ob = t.a.extend({
        i: function (a, c) {
            t.a.call(this, a, c);
            this.c(a, "progress", this.update)
        }
    });
    t.ob.prototype.e = function () {
        return t.a.prototype.e.call(this, "div", {
            className: "vjs-load-progress",
            innerHTML: '<span class="vjs-control-text"><span>' + this.t("Loaded") + "</span>: 0%</span>"
        })
    };
    t.ob.prototype.update = function () {
        var a,
            c,
            d,
            e,
            g = this.d.buffered();
        a = this.d.duration();
        var h,
            j = this.d;
        h = j.buffered();
        j = j.duration();
        h = h.end(h.length - 1);
        h > j && (h = j);
        j = this.b.children;
        this.b.style.width = 100 * (h / a || 0) + "%";
        for (a = 0; a < g.length; a++) c = g.start(a), d = g.end(a), (e = j[a]) || (e = this.b.appendChild(t.e())), e.style.left = 100 * (c / h || 0) + "%", e.style.width = 100 * ((d - c) / h || 0) + "%";
        for (a = j.length; a > g.length; a--) this.b.removeChild(j[a - 1])
    };
    t.dc = t.a.extend({
        i: function (a, c) {
            t.a.call(this, a, c)
        }
    });
    t.dc.prototype.e = function () {
        return t.a.prototype.e.call(this, "div", {
            className: "vjs-play-progress",
            innerHTML: '<span class="vjs-control-text"><span>' + this.t("Progress") + "</span>: 0%</span>"
        })
    };
    t.Pa = t.$.extend({
        i: function (a, c) {
            t.$.call(this, a, c);
            this.c(a, "timeupdate", this.ia)
        }
    });
    t.Pa.prototype.defaultValue = "00:00";
    t.Pa.prototype.e = function () {
        return t.$.prototype.e.call(this, "div", {
            className: "vjs-seek-handle",
            "aria-live": "off"
        })
    };
    t.Pa.prototype.ia = function () {
        var a = this.d.fb ? this.d.F.currentTime : this.d.currentTime();
        this.b.innerHTML = '<span class="vjs-control-text">' + t.Ba(a, this.d.duration()) + "</span>"
    };
    t.ub = t.a.extend({
        i: function (a, c) {
            t.a.call(this, a, c);
            a.o && a.o.featuresVolumeControl === l && this.n("vjs-hidden");
            this.c(a, "loadstart", function () {
                a.o.featuresVolumeControl === l ? this.n("vjs-hidden") : this.r("vjs-hidden")
            })
        }
    });
    t.ub.prototype.m = {
        children: {
            volumeBar: {}
        }
    };
    t.ub.prototype.e = function () {
        return t.a.prototype.e.call(this, "div", {
            className: "vjs-volume-control vjs-control"
        })
    };
    t.tb = t.R.extend({
        i: function (a, c) {
            t.R.call(this, a, c);
            this.c(a, "volumechange", this.sa);
            a.H(t.bind(this, this.sa))
        }
    });
    s = t.tb.prototype;
    s.sa = function () {
        this.b.setAttribute("aria-valuenow", t.round(100 * this.d.volume(), 2));
        this.b.setAttribute("aria-valuetext", t.round(100 * this.d.volume(), 2) + "%")
    };
    s.m = {
        children: {
            volumeLevel: {},
            volumeHandle: {}
        },
        barName: "volumeLevel",
        handleName: "volumeHandle"
    };
    s.Mc = "volumechange";
    s.e = function () {
        return t.R.prototype.e.call(this, "div", {
            className: "vjs-volume-bar",
            "aria-label": "volume level"
        })
    };
    s.fa = function (a) {
        this.d.muted() && this.d.muted(l);
        this.d.volume(H(this, a))
    };
    s.Ib = function () {
        return this.d.muted() ? 0 : this.d.volume()
    };
    s.Yc = function () {
        this.d.volume(this.d.volume() + 0.1)
    };
    s.Xc = function () {
        this.d.volume(this.d.volume() - 0.1)
    };
    t.mc = t.a.extend({
        i: function (a, c) {
            t.a.call(this, a, c)
        }
    });
    t.mc.prototype.e = function () {
        return t.a.prototype.e.call(this, "div", {
            className: "vjs-volume-level",
            innerHTML: '<span class="vjs-control-text"></span>'
        })
    };
    t.vb = t.$.extend();
    t.vb.prototype.defaultValue = "00:00";
    t.vb.prototype.e = function () {
        return t.$.prototype.e.call(this, "div", {
            className: "vjs-volume-handle"
        })
    };
    t.ka = t.u.extend({
        i: function (a, c) {
            t.u.call(this, a, c);
            this.c(a, "volumechange", this.update);
            a.o && a.o.featuresVolumeControl === l && this.n("vjs-hidden");
            this.c(a, "loadstart", function () {
                a.o.featuresVolumeControl === l ? this.n("vjs-hidden") : this.r("vjs-hidden")
            })
        }
    });
    t.ka.prototype.e = function () {
        return t.u.prototype.e.call(this, "div", {
            className: "vjs-mute-control vjs-control",
            innerHTML: '<div><span class="vjs-control-text">' + this.t("Mute") + "</span></div>"
        })
    };
    t.ka.prototype.s = function () {
        this.d.muted(this.d.muted() ? l : f)
    };
    t.ka.prototype.update = function () {
        var a = this.d.volume(),
            c = 3;
        0 === a || this.d.muted() ? c = 0 : 0.33 > a ? c = 1 : 0.67 > a && (c = 2);
        this.d.muted() ? this.b.children[0].children[0].innerHTML != this.t("Unmute") && (this.b.children[0].children[0].innerHTML = this.t("Unmute")) : this.b.children[0].children[0].innerHTML != this.t("Mute") && (this.b.children[0].children[0].innerHTML = this.t("Mute"));
        for (a = 0; 4 > a; a++) t.r(this.b, "vjs-vol-" + a);
        t.n(this.b, "vjs-vol-" + c)
    };
    t.va = t.L.extend({
        i: function (a, c) {
            t.L.call(this, a, c);
            this.c(a, "volumechange", this.update);
            a.o && a.o.featuresVolumeControl === l && this.n("vjs-hidden");
            this.c(a, "loadstart", function () {
                a.o.featuresVolumeControl === l ? this.n("vjs-hidden") : this.r("vjs-hidden")
            });
            this.n("vjs-menu-button")
        }
    });
    t.va.prototype.za = function () {
        var a = new t.ja(this.d, {
                sc: "div"
            }),
            c = new t.tb(this.d, this.m.volumeBar);
        c.c("focus", function () {
            a.n("vjs-lock-showing")
        });
        c.c("blur", function () {
            E(a)
        });
        a.U(c);
        return a
    };
    t.va.prototype.s = function () {
        t.ka.prototype.s.call(this);
        t.L.prototype.s.call(this)
    };
    t.va.prototype.e = function () {
        return t.u.prototype.e.call(this, "div", {
            className: "vjs-volume-menu-button vjs-menu-button vjs-control",
            innerHTML: '<div><span class="vjs-control-text">' + this.t("Mute") + "</span></div>"
        })
    };
    t.va.prototype.update = t.ka.prototype.update;
    t.fc = t.L.extend({
        i: function (a, c) {
            t.L.call(this, a, c);
            this.bd();
            this.ad();
            this.c(a, "loadstart", this.bd);
            this.c(a, "ratechange", this.ad)
        }
    });
    s = t.fc.prototype;
    s.la = "Playback Rate";
    s.className = "vjs-playback-rate";
    s.e = function () {
        var a = t.L.prototype.e.call(this);
        this.Ic = t.e("div", {
            className: "vjs-playback-rate-value",
            innerHTML: 1
        });
        a.appendChild(this.Ic);
        return a
    };
    s.za = function () {
        var a = new t.ja(this.j()),
            c = this.j().options().playbackRates;
        if (c)
            for (var d = c.length - 1; 0 <= d; d--) a.U(new t.qb(this.j(), {
                rate: c[d] + "x"
            }));
        return a
    };
    s.sa = function () {
        this.w().setAttribute("aria-valuenow", this.j().playbackRate())
    };
    s.s = function () {
        for (var a = this.j().playbackRate(), c = this.j().options().playbackRates, d = c[0], e = 0; e < c.length; e++)
            if (c[e] > a) {
                d = c[e];
                break
            }
        this.j().playbackRate(d)
    };

    function ea(a) {
        return a.j().o && a.j().o.featuresPlaybackRate && a.j().options().playbackRates && 0 < a.j().options().playbackRates.length
    }

    s.bd = function () {
        ea(this) ? this.r("vjs-hidden") : this.n("vjs-hidden")
    };
    s.ad = function () {
        ea(this) && (this.Ic.innerHTML = this.j().playbackRate() + "x")
    };
    t.qb = t.J.extend({
        sc: "button",
        i: function (a, c) {
            var d = this.label = c.rate,
                e = this.Pc = parseFloat(d, 10);
            c.label = d;
            c.selected = 1 === e;
            t.J.call(this, a, c);
            this.c(a, "ratechange", this.update)
        }
    });
    t.qb.prototype.s = function () {
        t.J.prototype.s.call(this);
        this.j().playbackRate(this.Pc)
    };
    t.qb.prototype.update = function () {
        this.selected(this.j().playbackRate() == this.Pc)
    };
    t.gc = t.u.extend({
        i: function (a, c) {
            t.u.call(this, a, c);
            this.update();
            a.c("posterchange", t.bind(this, this.update))
        }
    });
    s = t.gc.prototype;
    s.dispose = function () {
        this.j().k("posterchange", this.update);
        t.u.prototype.dispose.call(this)
    };
    s.e = function () {
        var a = t.e("div", {
            className: "vjs-poster",
            tabIndex: -1
        });
        t.fd || (this.Fb = t.e("img"), a.appendChild(this.Fb));
        return a
    };
    s.update = function () {
        var a = this.j().poster();
        this.ga(a);
        a ? this.b.style.display = "" : this.Y()
    };
    s.ga = function (a) {
        var c;
        this.Fb ? this.Fb.src = a : (c = "", a && (c = 'url("' + a + '")'), this.b.style.backgroundImage = c)
    };
    s.s = function () {
        this.d.play()
    };
    t.cc = t.a.extend({
        i: function (a, c) {
            t.a.call(this, a, c)
        }
    });
    t.cc.prototype.e = function () {
        return t.a.prototype.e.call(this, "div", {
            className: "vjs-loading-spinner"
        })
    };
    t.ib = t.u.extend();
    t.ib.prototype.e = function () {
        return t.u.prototype.e.call(this, "div", {
            className: "vjs-big-play-button",
            innerHTML: '<span aria-hidden="true"></span>',
            "aria-label": "play video"
        })
    };
    t.ib.prototype.s = function () {
        this.d.play()
    };
    t.mb = t.a.extend({
        i: function (a, c) {
            t.a.call(this, a, c);
            this.update();
            this.c(a, "error", this.update)
        }
    });
    t.mb.prototype.e = function () {
        var a = t.a.prototype.e.call(this, "div", {
            className: "vjs-error-display"
        });
        this.v = t.e("div");
        a.appendChild(this.v);
        return a
    };
    t.mb.prototype.update = function () {
        this.j().error() && (this.v.innerHTML = this.t(this.j().error().message))
    };
    t.q = t.a.extend({
        i: function (a, c, d) {
            c = c || {};
            c.Rc = l;
            t.a.call(this, a, c, d);
            this.featuresProgressEvents || (this.Jc = f, this.Oc = this.setInterval(function () {
                var a = this.j().bufferedPercent();
                this.vd != a && this.j().l("progress");
                this.vd = a;
                1 === a && this.clearInterval(this.Oc)
            }, 500));
            this.featuresTimeupdateEvents || (a = this.d, this.Ob = f, this.c(a, "play", this.$c), this.c(a, "pause", this.hb), this.Q("timeupdate", function () {
                this.featuresTimeupdateEvents = f;
                fa(this)
            }));
            var e;
            e = this.j();
            a = function () {
                if (e.controls() && !e.usingNativeControls()) {
                    var a;
                    this.c("mousedown", this.s);
                    this.c("touchstart", function () {
                        a = this.d.userActive()
                    });
                    this.c("touchmove", function () {
                        a && this.j().reportUserActivity()
                    });
                    this.c("touchend", function (a) {
                        a.preventDefault()
                    });
                    G(this);
                    this.c("tap", this.ce)
                }
            };
            this.H(a);
            this.c(e, "controlsenabled", a);
            this.c(e, "controlsdisabled", this.he);
            this.H(function () {
                this.networkState && 0 < this.networkState() && this.j().l("loadstart")
            })
        }
    });
    s = t.q.prototype;
    s.he = function () {
        this.k("tap");
        this.k("touchstart");
        this.k("touchmove");
        this.k("touchleave");
        this.k("touchcancel");
        this.k("touchend");
        this.k("click");
        this.k("mousedown")
    };
    s.s = function (a) {
        0 === a.button && this.j().controls() && (this.j().paused() ? this.j().play() : this.j().pause())
    };
    s.ce = function () {
        this.j().userActive(!this.j().userActive())
    };

    function fa(a) {
        a.Ob = l;
        a.hb();
        a.k("play", a.$c);
        a.k("pause", a.hb)
    }

    s.$c = function () {
        this.uc && this.hb();
        this.uc = this.setInterval(function () {
            this.j().l("timeupdate")
        }, 250)
    };
    s.hb = function () {
        this.clearInterval(this.uc);
        this.j().l("timeupdate")
    };
    s.dispose = function () {
        this.Jc && (this.Jc = l, this.clearInterval(this.Oc));
        this.Ob && fa(this);
        t.a.prototype.dispose.call(this)
    };
    s.Ub = function () {
        this.Ob && this.j().l("timeupdate")
    };
    s.Uc = m();
    t.q.prototype.featuresVolumeControl = f;
    t.q.prototype.featuresFullscreenResize = l;
    t.q.prototype.featuresPlaybackRate = l;
    t.q.prototype.featuresProgressEvents = l;
    t.q.prototype.featuresTimeupdateEvents = l;
    t.q.dd = function (a) {
        a.Sb = function (c) {
            var d,
                e = a.Vc;
            e || (e = a.Vc = []);
            d === b && (d = e.length);
            e.splice(d, 0, c)
        };
        a.Sc = function (c) {
            for (var d = a.Vc || [], e, g = 0; g < d.length; g++)
                if (e = d[g].Ta(c)) return d[g];
            return k
        };
        a.pc = function (c) {
            var d = a.Sc(c);
            return d ? d.Ta(c) : ""
        };
        a.prototype.gb = function (c) {
            var d = a.Sc(c);
            this.Db();
            this.k("dispose", this.Db);
            this.tc = c;
            this.Vb = d.Jb(c, this);
            this.c("dispose", this.Db);
            return this
        };
        a.prototype.Db = function () {
            this.Vb && this.Vb.dispose && this.Vb.dispose()
        }
    };
    t.g = t.q.extend({
        i: function (a, c, d) {
            t.q.call(this, a, c, d);
            for (d = t.g.nb.length - 1; 0 <= d; d--) this.c(t.g.nb[d], this.Fd);
            (c = c.source) && (this.b.currentSrc !== c.src || a.I && 3 === a.I.Md) && this.gb(c);
            if (t.jc && a.options().nativeControlsForTouch === f) {
                var e,
                    g,
                    h,
                    j;
                e = this;
                g = this.j();
                c = g.controls();
                e.b.controls = !!c;
                h = function () {
                    e.b.controls = f
                };
                j = function () {
                    e.b.controls = l
                };
                g.c("controlsenabled", h);
                g.c("controlsdisabled", j);
                c = function () {
                    g.k("controlsenabled", h);
                    g.k("controlsdisabled", j)
                };
                e.c("dispose", c);
                g.c("usingcustomcontrols",
                    c);
                g.usingNativeControls(f)
            }
            a.H(function () {
                this.I && (this.m.autoplay && this.paused()) && (
                    delete this.I.poster
                        , this.play())
            });
            this.Ka()
        }
    });
    s = t.g.prototype;
    s.dispose = function () {
        t.g.Cb(this.b);
        t.q.prototype.dispose.call(this)
    };
    s.e = function () {
        var a = this.d,
            c = a.I,
            d;
        if (!c || this.movingMediaElementInDOM === l) c ? (d = c.cloneNode(l), t.g.Cb(c), c = d, a.I = k) : (c = t.e("video"), t.Tc(c, t.h.z(a.se || {}, {
            id: a.id() + "_html5_api",
            "class": "vjs-tech"
        }))), c.player = a, t.Kb(c, a.w());
        d = ["autoplay", "preload", "loop", "muted"];
        for (var e = d.length - 1; 0 <= e; e--) {
            var g = d[e],
                h = {};
            "undefined" !== typeof a.m[g] && (h[g] = a.m[g]);
            t.Tc(c, h)
        }
        return c
    };
    s.Fd = function (a) {
        "error" == a.type && this.error() ? this.j().error(this.error().code) : (a.bubbles = l, this.j().l(a))
    };
    s.play = function () {
        this.b.play()
    };
    s.pause = function () {
        this.b.pause()
    };
    s.paused = function () {
        return this.b.paused
    };
    s.currentTime = function () {
        return this.b.currentTime
    };
    s.Ub = function (a) {
        try {
            this.b.currentTime = a
        } catch (c) {
            t.log(c, "Video is not ready. (Video.js)")
        }
    };
    s.duration = function () {
        return this.b.duration || 0
    };
    s.buffered = function () {
        return this.b.buffered
    };
    s.volume = function () {
        return this.b.volume
    };
    s.oe = function (a) {
        this.b.volume = a
    };
    s.muted = function () {
        return this.b.muted
    };
    s.le = function (a) {
        this.b.muted = a
    };
    s.width = function () {
        return this.b.offsetWidth
    };
    s.height = function () {
        return this.b.offsetHeight
    };
    s.Ha = function () {
        return "function" == typeof this.b.webkitEnterFullScreen && (/Android/.test(t.N) || !/Chrome|Mac OS X 10.5/.test(t.N)) ? f : l
    };
    s.yc = function () {
        var a = this.b;
        "webkitDisplayingFullscreen" in a && this.Q("webkitbeginfullscreen", function () {
            this.d.isFullscreen(f);
            this.Q("webkitendfullscreen", function () {
                this.d.isFullscreen(l);
                this.d.l("fullscreenchange")
            });
            this.d.l("fullscreenchange")
        });
        a.paused && a.networkState <= a.ze ? (this.b.play(), this.setTimeout(function () {
            a.pause();
            a.webkitEnterFullScreen()
        }, 0)) : a.webkitEnterFullScreen()
    };
    s.Gd = function () {
        this.b.webkitExitFullScreen()
    };
    s.src = function (a) {
        if (a === b) return this.b.src;
        this.ga(a)
    };
    s.ga = function (a) {
        this.b.src = a
    };
    s.load = function () {
        this.b.load()
    };
    s.currentSrc = function () {
        return this.b.currentSrc
    };
    s.poster = function () {
        return this.b.poster
    };
    s.Uc = function (a) {
        this.b.poster = a
    };
    s.Ga = function () {
        return this.b.Ga
    };
    s.ne = function (a) {
        this.b.Ga = a
    };
    s.autoplay = function () {
        return this.b.autoplay
    };
    s.ie = function (a) {
        this.b.autoplay = a
    };
    s.controls = function () {
        return this.b.controls
    };
    s.loop = function () {
        return this.b.loop
    };
    s.ke = function (a) {
        this.b.loop = a
    };
    s.error = function () {
        return this.b.error
    };
    s.seeking = function () {
        return this.b.seeking
    };
    s.ended = function () {
        return this.b.ended
    };
    s.playbackRate = function () {
        return this.b.playbackRate
    };
    s.me = function (a) {
        this.b.playbackRate = a
    };
    s.networkState = function () {
        return this.b.networkState
    };
    t.g.isSupported = function () {
        try {
            t.A.volume = 0.5
        } catch (a) {
            return l
        }
        return !!t.A.canPlayType
    };
    t.q.dd(t.g);
    t.g.V = {};
    t.g.V.Ta = function (a) {
        function c(a) {
            try {
                return !!t.A.canPlayType(a)
            } catch (c) {
                return ""
            }
        }

        if (a.type) return c(a.type);
        a = a.src.match(/\.([^\/\?]+)(\?[^\/]+)?$/i)[1];
        return c("video/" + a)
    };
    t.g.V.Jb = function (a, c) {
        c.ga(a.src)
    };
    t.g.V.dispose = m();
    t.g.Sb(t.g.V);
    t.g.xd = function () {
        var a = t.A.volume;
        t.A.volume = a / 2 + 0.1;
        return a !== t.A.volume
    };
    t.g.wd = function () {
        var a = t.A.playbackRate;
        t.A.playbackRate = a / 2 + 0.1;
        return a !== t.A.playbackRate
    };
    t.g.prototype.featuresVolumeControl = t.g.xd();
    t.g.prototype.featuresPlaybackRate = t.g.wd();
    t.g.prototype.movingMediaElementInDOM = !t.kd;
    t.g.prototype.featuresFullscreenResize = f;
    t.g.prototype.featuresProgressEvents = f;
    var V,
        ga = /^application\/(?:x-|vnd\.apple\.)mpegurl/i,
        ha = /^video\/mp4/i;
    t.g.Lc = function () {
        4 <= t.Yb && (V || (V = t.A.constructor.prototype.canPlayType), t.A.constructor.prototype.canPlayType = function (a) {
            return a && ga.test(a) ? "maybe" : V.call(this, a)
        });
        t.od && (V || (V = t.A.constructor.prototype.canPlayType), t.A.constructor.prototype.canPlayType = function (a) {
            return a && ha.test(a) ? "maybe" : V.call(this, a)
        })
    };
    t.g.we = function () {
        var a = t.A.constructor.prototype.canPlayType;
        t.A.constructor.prototype.canPlayType = V;
        V = k;
        return a
    };
    t.g.Lc();
    t.g.nb = "loadstart suspend abort error emptied stalled loadedmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate progress play pause ratechange volumechange".split(" ");
    t.g.Cb = function (a) {
        if (a) {
            a.player = k;
            for (a.parentNode && a.parentNode.removeChild(a); a.hasChildNodes();) a.removeChild(a.firstChild);
            a.removeAttribute("src");
            if ("function" === typeof a.load) try {
                a.load()
            } catch (c) {
            }
        }
    };
    t.f = t.q.extend({
        i: function (a, c, d) {
            t.q.call(this, a, c, d);
            var e = c.source;
            d = c.parentEl;
            var g = this.b = t.e("div", {
                    id: a.id() + "_temp_flash"
                }),
                h = a.id() + "_flash_api",
                j = a.m,
                j = t.h.z({
                    readyFunction: "videojs.Flash.onReady",
                    eventProxyFunction: "videojs.Flash.onEvent",
                    errorEventProxyFunction: "videojs.Flash.onError",
                    autoplay: j.autoplay,
                    preload: j.Ga,
                    loop: j.loop,
                    muted: j.muted
                }, c.flashVars),
                p = t.h.z({
                    wmode: "opaque",
                    bgcolor: "#000000"
                }, c.params),
                h = t.h.z({
                    id: h,
                    name: h,
                    "class": "vjs-tech"
                }, c.attributes);
            e && this.H(function () {
                this.gb(e)
            });
            t.Kb(g, d);
            c.startTime && this.H(function () {
                this.load();
                this.play();
                this.currentTime(c.startTime)
            });
            t.jd && this.H(function () {
                this.c("mousemove", function () {
                    this.j().l({
                        type: "mousemove",
                        bubbles: l
                    })
                })
            });
            a.c("stageclick", a.reportUserActivity);
            this.b = t.f.xc(c.swf, g, j, p, h)
        }
    });
    s = t.f.prototype;
    s.dispose = function () {
        t.q.prototype.dispose.call(this)
    };
    s.play = function () {
        this.b.vjs_play()
    };
    s.pause = function () {
        this.b.vjs_pause()
    };
    s.src = function (a) {
        return a === b ? this.currentSrc() : this.ga(a)
    };
    s.ga = function (a) {
        a = t.Jd(a);
        this.b.vjs_src(a);
        if (this.d.autoplay()) {
            var c = this;
            this.setTimeout(function () {
                c.play()
            }, 0)
        }
    };
    t.f.prototype.setCurrentTime = function (a) {
        this.Ud = a;
        this.b.vjs_setProperty("currentTime", a);
        t.q.prototype.Ub.call(this)
    };
    t.f.prototype.currentTime = function () {
        return this.seeking() ? this.Ud || 0 : this.b.vjs_getProperty("currentTime")
    };
    t.f.prototype.currentSrc = function () {
        return this.tc ? this.tc.src : this.b.vjs_getProperty("currentSrc")
    };
    t.f.prototype.load = function () {
        this.b.vjs_load()
    };
    t.f.prototype.poster = function () {
        this.b.vjs_getProperty("poster")
    };
    t.f.prototype.setPoster = m();
    t.f.prototype.buffered = function () {
        return t.Ab(0, this.b.vjs_getProperty("buffered"))
    };
    t.f.prototype.Ha = r(l);
    t.f.prototype.yc = r(l);

    function ia() {
        var a = W[X],
            c = a.charAt(0).toUpperCase() + a.slice(1);
        ka["set" + c] = function (c) {
            return this.b.vjs_setProperty(a, c)
        }
    }

    function la(a) {
        ka[a] = function () {
            return this.b.vjs_getProperty(a)
        }
    }

    var ka = t.f.prototype,
        W = "rtmpConnection rtmpStream preload defaultPlaybackRate playbackRate autoplay loop mediaGroup controller controls volume muted defaultMuted".split(" "),
        ma = "error networkState readyState seeking initialTime duration startOffsetTime paused played seekable ended videoTracks audioTracks videoWidth videoHeight textTracks".split(" "),
        X;
    for (X = 0; X < W.length; X++) la(W[X]), ia();
    for (X = 0; X < ma.length; X++) la(ma[X]);
    t.f.isSupported = function () {
        return 10 <= t.f.version()[0]
    };
    t.q.dd(t.f);
    t.f.V = {};
    t.f.V.Ta = function (a) {
        return !a.type ? "" : a.type.replace(/;.*/, "").toLowerCase() in t.f.Id ? "maybe" : ""
    };
    t.f.V.Jb = function (a, c) {
        c.ga(a.src)
    };
    t.f.V.dispose = m();
    t.f.Sb(t.f.V);
    t.f.Id = {
        "video/flv": "FLV",
        "video/x-flv": "FLV",
        "video/mp4": "MP4",
        "video/m4v": "MP4"
    };
    t.f.onReady = function (a) {
        var c;
        if (c = (a = t.w(a)) && a.parentNode && a.parentNode.player) a.player = c, t.f.checkReady(c.o)
    };
    t.f.checkReady = function (a) {
        a.w() && (a.w().vjs_getProperty ? a.Ka() : this.setTimeout(function () {
            t.f.checkReady(a)
        }, 50))
    };
    t.f.onEvent = function (a, c) {
        t.w(a).player.l(c)
    };
    t.f.onError = function (a, c) {
        var d = t.w(a).player,
            e = "FLASH: " + c;
        "srcnotfound" == c ? d.error({
            code: 4,
            message: e
        }) : d.error(e)
    };
    t.f.version = function () {
        var a = "0,0,0";
        try {
            a = (new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version").replace(/\D+/g, ",").match(/^,?(.+),?$/)[1]
        } catch (c) {
            try {
                navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin && (a = (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1])
            } catch (d) {
            }
        }
        return a.split(",")
    };
    t.f.xc = function (a, c, d, e, g) {
        a = t.f.Ld(a, d, e, g);
        a = t.e("div", {
            innerHTML: a
        }).childNodes[0];
        d = c.parentNode;
        c.parentNode.replaceChild(a, c);
        var h = d.childNodes[0];
        setTimeout(function () {
            h.style.display = "block"
        }, 1E3);
        return a
    };
    t.f.Ld = function (a, c, d, e) {
        var g = "",
            h = "",
            j = "";
        c && t.h.X(c, function (a, c) {
            g += a + "=" + c + "&amp;"
        });
        d = t.h.z({
            movie: a,
            flashvars: g,
            allowScriptAccess: "always",
            allowNetworking: "all"
        }, d);
        t.h.X(d, function (a, c) {
            h += '<param name="' + a + '" value="' + c + '" />'
        });
        e = t.h.z({
            data: a,
            width: "100%",
            height: "100%"
        }, e);
        t.h.X(e, function (a, c) {
            j += a + '="' + c + '" '
        });
        return '<object type="application/x-shockwave-flash" ' + j + ">" + h + "</object>"
    };
    t.f.qe = {
        "rtmp/mp4": "MP4",
        "rtmp/flv": "FLV"
    };
    t.f.Je = function (a, c) {
        return a + "&" + c
    };
    t.f.pe = function (a) {
        var c = {
            rc: "",
            Zc: ""
        };
        if (!a) return c;
        var d = a.indexOf("&"),
            e;
        -1 !== d ? e = d + 1 : (d = e = a.lastIndexOf("/") + 1, 0 === d && (d = e = a.length));
        c.rc = a.substring(0, d);
        c.Zc = a.substring(e, a.length);
        return c
    };
    t.f.Rd = function (a) {
        return a in t.f.qe
    };
    t.f.qd = /^rtmp[set]?:\/\//i;
    t.f.Qd = function (a) {
        return t.f.qd.test(a)
    };
    t.f.Tb = {};
    t.f.Tb.Ta = function (a) {
        return t.f.Rd(a.type) || t.f.Qd(a.src) ? "maybe" : ""
    };
    t.f.Tb.Jb = function (a, c) {
        var d = t.f.pe(a.src);
        c.setRtmpConnection(d.rc);
        c.setRtmpStream(d.Zc)
    };
    t.f.Sb(t.f.Tb);
    t.pd = t.a.extend({
        i: function (a, c, d) {
            t.a.call(this, a, c, d);
            if (!a.m.sources || 0 === a.m.sources.length) {
                c = 0;
                for (d = a.m.techOrder; c < d.length; c++) {
                    var e = t.ba(d[c]),
                        g = window.videojs[e];
                    if (g && g.isSupported()) {
                        Q(a, e);
                        break
                    }
                }
            } else a.src(a.m.sources)
        }
    });
    t.Player.prototype.textTracks = function () {
        return this.Ja = this.Ja || []
    };

    function na(a, c, d, e, g) {
        var h = a.Ja = a.Ja || [];
        g = g || {};
        g.kind = c;
        g.label = d;
        g.language = e;
        c = t.ba(c || "subtitles");
        var j = new window.videojs[c + "Track"](a, g);
        h.push(j);
        j.Bb() && a.H(function () {
            this.setTimeout(function () {
                Y(j.j(), j.id())
            }, 0)
        })
    }

    function Y(a, c, d) {
        for (var e = a.Ja, g = 0, h = e.length, j, p; g < h; g++) j = e[g], j.id() === c ? (j.show(), p = j) : d && (j.M() == d && 0 < j.mode()) && j.disable();
        (c = p ? p.M() : d ? d : l) && a.l(c + "trackchange")
    }

    t.B = t.a.extend({
        i: function (a, c) {
            t.a.call(this, a, c);
            this.K = c.id || "vjs_" + c.kind + "_" + c.language + "_" + t.p++;
            this.Wc = c.src;
            this.Cd = c["default"] || c.dflt;
            this.ue = c.title;
            this.Za = c.srclang;
            this.Sd = c.label;
            this.ca = [];
            this.wb = [];
            this.pa = this.ra = 0;
            a.c("dispose", t.bind(this, this.wc, this.K))
        }
    });
    s = t.B.prototype;
    s.M = n("G");
    s.src = n("Wc");
    s.Bb = n("Cd");
    s.title = n("ue");
    s.language = n("Za");
    s.label = n("Sd");
    s.yd = n("ca");
    s.rd = n("wb");
    s.readyState = n("ra");
    s.mode = n("pa");
    s.e = function () {
        return t.a.prototype.e.call(this, "div", {
            className: "vjs-" + this.G + " vjs-text-track"
        })
    };
    s.show = function () {
        oa(this);
        this.pa = 2;
        t.a.prototype.show.call(this)
    };
    s.Y = function () {
        oa(this);
        this.pa = 1;
        t.a.prototype.Y.call(this)
    };
    s.disable = function () {
        2 == this.pa && this.Y();
        this.wc();
        this.pa = 0
    };

    function oa(a) {
        0 === a.ra && a.load();
        0 === a.pa && (a.d.c("timeupdate", t.bind(a, a.update, a.K)), a.d.c("ended", t.bind(a, a.reset, a.K)), ("captions" === a.G || "subtitles" === a.G) && a.d.na("textTrackDisplay").U(a))
    }

    s.wc = function () {
        this.d.k("timeupdate", t.bind(this, this.update, this.K));
        this.d.k("ended", t.bind(this, this.reset, this.K));
        this.reset();
        this.d.na("textTrackDisplay").removeChild(this)
    };
    s.load = function () {
        0 === this.ra && (this.ra = 1, t.ye(this.Wc, t.bind(this, function (a, c, d) {
            if (a) this.error = a, this.ra = 3, this.l("error"); else {
                var e,
                    g;
                a = d.split("\n");
                c = "";
                d = 1;
                for (var h = a.length; d < h; d++)
                    if (c = t.trim(a[d])) {
                        -1 == c.indexOf("--\x3e") ? (e = c, c = t.trim(a[++d])) : e = this.ca.length;
                        e = {
                            id: e,
                            index: this.ca.length
                        };
                        g = c.split(/[\t ]+/);
                        e.startTime = pa(g[0]);
                        e.Aa = pa(g[2]);
                        for (g = []; a[++d] && (c = t.trim(a[d]));) g.push(c);
                        e.text = g.join("<br/>");
                        this.ca.push(e)
                    }
                this.ra = 2;
                this.l("loaded")
            }
        })))
    };

    function pa(a) {
        var c = a.split(":");
        a = 0;
        var d,
            e,
            g;
        3 == c.length ? (d = c[0], e = c[1], c = c[2]) : (d = 0, e = c[0], c = c[1]);
        c = c.split(/\s+/);
        c = c.splice(0, 1)[0];
        c = c.split(/\.|,/);
        g = parseFloat(c[1]);
        c = c[0];
        a += 3600 * parseFloat(d);
        a += 60 * parseFloat(e);
        a += parseFloat(c);
        g && (a += g / 1E3);
        return a
    }

    s.update = function () {
        if (0 < this.ca.length) {
            var a = this.d.options().trackTimeOffset || 0,
                a = this.d.currentTime() + a;
            if (this.Rb === b || a < this.Rb || this.$a <= a) {
                var c = this.ca,
                    d = this.d.duration(),
                    e = 0,
                    g = l,
                    h = [],
                    j,
                    p,
                    q,
                    w;
                a >= this.$a || this.$a === b ? w = this.Gb !== b ? this.Gb : 0 : (g = f, w = this.Nb !== b ? this.Nb : c.length - 1);
                for (; ;) {
                    q = c[w];
                    if (q.Aa <= a) e = Math.max(e, q.Aa), q.Ra && (q.Ra = l);
                    else if (a < q.startTime) {
                        if (d = Math.min(d, q.startTime), q.Ra && (q.Ra = l), !g) break
                    } else g ? (h.splice(0, 0, q), p === b && (p = w), j = w) : (h.push(q), j === b && (j = w), p = w), d = Math.min(d,
                        q.Aa), e = Math.max(e, q.startTime), q.Ra = f;
                    if (g)
                        if (0 === w) break; else w--;
                    else if (w === c.length - 1) break; else w++
                }
                this.wb = h;
                this.$a = d;
                this.Rb = e;
                this.Gb = j;
                this.Nb = p;
                j = this.wb;
                p = "";
                a = 0;
                for (c = j.length; a < c; a++) p += '<span class="vjs-tt-cue">' + j[a].text + "</span>";
                this.b.innerHTML = p;
                this.l("cuechange")
            }
        }
    };
    s.reset = function () {
        this.$a = 0;
        this.Rb = this.d.duration();
        this.Nb = this.Gb = 0
    };
    t.$b = t.B.extend();
    t.$b.prototype.G = "captions";
    t.ic = t.B.extend();
    t.ic.prototype.G = "subtitles";
    t.ac = t.B.extend();
    t.ac.prototype.G = "chapters";
    t.kc = t.a.extend({
        i: function (a, c, d) {
            t.a.call(this, a, c, d);
            if (a.m.tracks && 0 < a.m.tracks.length) {
                c = this.d;
                a = a.m.tracks;
                for (var e = 0; e < a.length; e++) d = a[e], na(c, d.kind, d.label, d.language, d)
            }
        }
    });
    t.kc.prototype.e = function () {
        return t.a.prototype.e.call(this, "div", {
            className: "vjs-text-track-display"
        })
    };
    t.aa = t.J.extend({
        i: function (a, c) {
            var d = this.ha = c.track;
            c.label = d.label();
            c.selected = d.Bb();
            t.J.call(this, a, c);
            this.c(a, d.M() + "trackchange", this.update)
        }
    });
    t.aa.prototype.s = function () {
        t.J.prototype.s.call(this);
        Y(this.d, this.ha.K, this.ha.M())
    };
    t.aa.prototype.update = function () {
        this.selected(2 == this.ha.mode())
    };
    t.pb = t.aa.extend({
        i: function (a, c) {
            c.track = {
                M: function () {
                    return c.kind
                },
                j: a,
                label: function () {
                    return c.kind + " off"
                },
                Bb: r(l),
                mode: r(l)
            };
            t.aa.call(this, a, c);
            this.selected(f)
        }
    });
    t.pb.prototype.s = function () {
        t.aa.prototype.s.call(this);
        Y(this.d, this.ha.K, this.ha.M())
    };
    t.pb.prototype.update = function () {
        for (var a = this.d.textTracks(), c = 0, d = a.length, e, g = f; c < d; c++) e = a[c], e.M() == this.ha.M() && 2 == e.mode() && (g = l);
        this.selected(g)
    };
    t.T = t.L.extend({
        i: function (a, c) {
            t.L.call(this, a, c);
            1 >= this.P.length && this.Y()
        }
    });
    t.T.prototype.ya = function () {
        var a = [],
            c;
        a.push(new t.pb(this.d, {
            kind: this.G
        }));
        for (var d = 0; d < this.d.textTracks().length; d++) c = this.d.textTracks()[d], c.M() === this.G && a.push(new t.aa(this.d, {
            track: c
        }));
        return a
    };
    t.La = t.T.extend({
        i: function (a, c, d) {
            t.T.call(this, a, c, d);
            this.b.setAttribute("aria-label", "Captions Menu")
        }
    });
    t.La.prototype.G = "captions";
    t.La.prototype.la = "Captions";
    t.La.prototype.className = "vjs-captions-button";
    t.Qa = t.T.extend({
        i: function (a, c, d) {
            t.T.call(this, a, c, d);
            this.b.setAttribute("aria-label", "Subtitles Menu")
        }
    });
    t.Qa.prototype.G = "subtitles";
    t.Qa.prototype.la = "Subtitles";
    t.Qa.prototype.className = "vjs-subtitles-button";
    t.Ma = t.T.extend({
        i: function (a, c, d) {
            t.T.call(this, a, c, d);
            this.b.setAttribute("aria-label", "Chapters Menu")
        }
    });
    s = t.Ma.prototype;
    s.G = "chapters";
    s.la = "Chapters";
    s.className = "vjs-chapters-button";
    s.ya = function () {
        for (var a = [], c, d = 0; d < this.d.textTracks().length; d++) c = this.d.textTracks()[d], c.M() === this.G && a.push(new t.aa(this.d, {
            track: c
        }));
        return a
    };
    s.za = function () {
        for (var a = this.d.textTracks(), c = 0, d = a.length, e, g, h = this.P = []; c < d; c++)
            if (e = a[c], e.M() == this.G)
                if (0 === e.readyState()) e.load(), e.c("loaded", t.bind(this, this.za)); else {
                    g = e;
                    break
                }
        a = this.Da;
        a === b && (a = new t.ja(this.d), a.ma().appendChild(t.e("li", {
            className: "vjs-menu-title",
            innerHTML: t.ba(this.G),
            re: -1
        })));
        if (g) {
            e = g.ca;
            for (var j, c = 0, d = e.length; c < d; c++) j = e[c], j = new t.jb(this.d, {
                track: g,
                cue: j
            }), h.push(j), a.U(j);
            this.U(a)
        }
        0 < this.P.length && this.show();
        return a
    };
    t.jb = t.J.extend({
        i: function (a, c) {
            var d = this.ha = c.track,
                e = this.cue = c.cue,
                g = a.currentTime();
            c.label = e.text;
            c.selected = e.startTime <= g && g < e.Aa;
            t.J.call(this, a, c);
            d.c("cuechange", t.bind(this, this.update))
        }
    });
    t.jb.prototype.s = function () {
        t.J.prototype.s.call(this);
        this.d.currentTime(this.cue.startTime);
        this.update(this.cue.startTime)
    };
    t.jb.prototype.update = function () {
        var a = this.cue,
            c = this.d.currentTime();
        this.selected(a.startTime <= c && c < a.Aa)
    };
    t.h.z(t.Na.prototype.m.children, {
        subtitlesButton: {},
        captionsButton: {},
        chaptersButton: {}
    });
    if ("undefined" !== typeof window.JSON && "function" === typeof window.JSON.parse)
        t.JSON = window.JSON; else {
        t.JSON = {};
        var Z = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        t.JSON.parse = function (a, c) {
            function d(a, e) {
                var j,
                    p,
                    q = a[e];
                if (q && "object" === typeof q)
                    for (j in q) Object.prototype.hasOwnProperty.call(q, j) && (p = d(q, j), p !== b ? q[j] = p :
                            delete q[j]
                    );
                return c.call(a, e, q)
            }

            var e;
            a = String(a);
            Z.lastIndex = 0;
            Z.test(a) && (a = a.replace(Z, function (a) {
                return "\\u" + ("0000" +
                    a.charCodeAt(0).toString(16)).slice(-4)
            }));
            if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return e = eval("(" + a + ")"), "function" === typeof c ? d({
                "": e
            }, "") : e;
            throw new SyntaxError("JSON.parse(): invalid or malformed JSON data");
        }
    }
    t.oc = function () {
        var a,
            c,
            d,
            e;
        a = document.getElementsByTagName("video");
        c = document.getElementsByTagName("audio");
        var g = [];
        if (a && 0 < a.length) {
            d = 0;
            for (e = a.length; d < e; d++) g.push(a[d])
        }
        if (c && 0 < c.length) {
            d = 0;
            for (e = c.length; d < e; d++) g.push(c[d])
        }
        if (g && 0 < g.length) {
            d = 0;
            for (e = g.length; d < e; d++)
                if ((c = g[d]) && c.getAttribute) c.player === b && (a = c.getAttribute("data-setup"), a !== k && videojs(c)); else {
                    t.xb();
                    break
                }
        } else t.cd || t.xb()
    };
    t.xb = function () {
        setTimeout(t.oc, 1)
    };
    "complete" === document.readyState ? t.cd = f : t.Q(window, "load", function () {
        t.cd = f
    });
    t.xb();
    t.ge = function (a, c) {
        t.Player.prototype[a] = c
    };
    var qa = this;

    function $(a, c) {
        var d = a.split("."),
            e = qa;
        !(d[0] in e) && e.execScript && e.execScript("var " + d[0]);
        for (var g; d.length && (g = d.shift());) !d.length && c !== b ? e[g] = c : e = e[g] ? e[g] : e[g] = {}
    }
    ;$("videojs", t);
    $("_V_", t);
    $("videojs.options", t.options);
    $("videojs.players", t.Fa);
    $("videojs.TOUCH_ENABLED", t.jc);
    $("videojs.cache", t.xa);
    $("videojs.Component", t.a);
    t.a.prototype.player = t.a.prototype.j;
    t.a.prototype.options = t.a.prototype.options;
    t.a.prototype.init = t.a.prototype.i;
    t.a.prototype.dispose = t.a.prototype.dispose;
    t.a.prototype.createEl = t.a.prototype.e;
    t.a.prototype.contentEl = t.a.prototype.ma;
    t.a.prototype.el = t.a.prototype.w;
    t.a.prototype.addChild = t.a.prototype.U;
    t.a.prototype.getChild = t.a.prototype.na;
    t.a.prototype.getChildById = t.a.prototype.Kd;
    t.a.prototype.children = t.a.prototype.children;
    t.a.prototype.initChildren = t.a.prototype.Ec;
    t.a.prototype.removeChild = t.a.prototype.removeChild;
    t.a.prototype.on = t.a.prototype.c;
    t.a.prototype.off = t.a.prototype.k;
    t.a.prototype.one = t.a.prototype.Q;
    t.a.prototype.trigger = t.a.prototype.l;
    t.a.prototype.triggerReady = t.a.prototype.Ka;
    t.a.prototype.show = t.a.prototype.show;
    t.a.prototype.hide = t.a.prototype.Y;
    t.a.prototype.width = t.a.prototype.width;
    t.a.prototype.height = t.a.prototype.height;
    t.a.prototype.dimensions = t.a.prototype.Dd;
    t.a.prototype.ready = t.a.prototype.H;
    t.a.prototype.addClass = t.a.prototype.n;
    t.a.prototype.removeClass = t.a.prototype.r;
    t.a.prototype.buildCSSClass = t.a.prototype.S;
    t.a.prototype.localize = t.a.prototype.t;
    t.a.prototype.setInterval = t.a.prototype.setInterval;
    t.a.prototype.setTimeout = t.a.prototype.setTimeout;
    t.Player.prototype.ended = t.Player.prototype.ended;
    t.Player.prototype.enterFullWindow = t.Player.prototype.zc;
    t.Player.prototype.exitFullWindow = t.Player.prototype.Eb;
    t.Player.prototype.preload = t.Player.prototype.Ga;
    t.Player.prototype.remainingTime = t.Player.prototype.remainingTime;
    t.Player.prototype.supportsFullScreen = t.Player.prototype.Ha;
    t.Player.prototype.currentType = t.Player.prototype.zd;
    t.Player.prototype.requestFullScreen = t.Player.prototype.requestFullScreen;
    t.Player.prototype.requestFullscreen = t.Player.prototype.requestFullscreen;
    t.Player.prototype.cancelFullScreen = t.Player.prototype.cancelFullScreen;
    t.Player.prototype.exitFullscreen = t.Player.prototype.exitFullscreen;
    t.Player.prototype.isFullScreen = t.Player.prototype.isFullScreen;
    t.Player.prototype.isFullscreen = t.Player.prototype.isFullscreen;
    $("videojs.MediaLoader", t.pd);
    $("videojs.TextTrackDisplay", t.kc);
    $("videojs.ControlBar", t.Na);
    $("videojs.Button", t.u);
    $("videojs.PlayToggle", t.ec);
    $("videojs.FullscreenToggle", t.Oa);
    $("videojs.BigPlayButton", t.ib);
    $("videojs.LoadingSpinner", t.cc);
    $("videojs.CurrentTimeDisplay", t.kb);
    $("videojs.DurationDisplay", t.lb);
    $("videojs.TimeDivider", t.lc);
    $("videojs.RemainingTimeDisplay", t.sb);
    $("videojs.LiveDisplay", t.bc);
    $("videojs.ErrorDisplay", t.mb);
    $("videojs.Slider", t.R);
    $("videojs.ProgressControl", t.rb);
    $("videojs.SeekBar", t.hc);
    $("videojs.LoadProgressBar", t.ob);
    $("videojs.PlayProgressBar", t.dc);
    $("videojs.SeekHandle", t.Pa);
    $("videojs.VolumeControl", t.ub);
    $("videojs.VolumeBar", t.tb);
    $("videojs.VolumeLevel", t.mc);
    $("videojs.VolumeMenuButton", t.va);
    $("videojs.VolumeHandle", t.vb);
    $("videojs.MuteToggle", t.ka);
    $("videojs.PosterImage", t.gc);
    $("videojs.Menu", t.ja);
    $("videojs.MenuItem", t.J);
    $("videojs.MenuButton", t.L);
    $("videojs.PlaybackRateMenuButton", t.fc);
    t.L.prototype.createItems = t.L.prototype.ya;
    t.T.prototype.createItems = t.T.prototype.ya;
    t.Ma.prototype.createItems = t.Ma.prototype.ya;
    $("videojs.SubtitlesButton", t.Qa);
    $("videojs.CaptionsButton", t.La);
    $("videojs.ChaptersButton", t.Ma);
    $("videojs.MediaTechController", t.q);
    t.q.prototype.featuresVolumeControl = t.q.prototype.Ge;
    t.q.prototype.featuresFullscreenResize = t.q.prototype.Ce;
    t.q.prototype.featuresPlaybackRate = t.q.prototype.De;
    t.q.prototype.featuresProgressEvents = t.q.prototype.Ee;
    t.q.prototype.featuresTimeupdateEvents = t.q.prototype.Fe;
    t.q.prototype.setPoster = t.q.prototype.Uc;
    $("videojs.Html5", t.g);
    t.g.Events = t.g.nb;
    t.g.isSupported = t.g.isSupported;
    t.g.canPlaySource = t.g.pc;
    t.g.patchCanPlayType = t.g.Lc;
    t.g.unpatchCanPlayType = t.g.we;
    t.g.prototype.setCurrentTime = t.g.prototype.Ub;
    t.g.prototype.setVolume = t.g.prototype.oe;
    t.g.prototype.setMuted = t.g.prototype.le;
    t.g.prototype.setPreload = t.g.prototype.ne;
    t.g.prototype.setAutoplay = t.g.prototype.ie;
    t.g.prototype.setLoop = t.g.prototype.ke;
    t.g.prototype.enterFullScreen = t.g.prototype.yc;
    t.g.prototype.exitFullScreen = t.g.prototype.Gd;
    t.g.prototype.playbackRate = t.g.prototype.playbackRate;
    t.g.prototype.setPlaybackRate = t.g.prototype.me;
    t.g.prototype.setSource = t.g.prototype.gb;
    $("videojs.Flash", t.f);
    t.f.isSupported = t.f.isSupported;
    t.f.canPlaySource = t.f.pc;
    t.f.onReady = t.f.onReady;
    t.f.embed = t.f.xc;
    t.f.version = t.f.version;
    t.f.prototype.setSource = t.f.prototype.gb;
    $("videojs.TextTrack", t.B);
    t.B.prototype.label = t.B.prototype.label;
    t.B.prototype.kind = t.B.prototype.M;
    t.B.prototype.mode = t.B.prototype.mode;
    t.B.prototype.cues = t.B.prototype.yd;
    t.B.prototype.activeCues = t.B.prototype.rd;
    $("videojs.CaptionsTrack", t.$b);
    $("videojs.SubtitlesTrack", t.ic);
    $("videojs.ChaptersTrack", t.ac);
    $("videojs.autoSetup", t.oc);
    $("videojs.plugin", t.ge);
    $("videojs.createTimeRange", t.Ab);
    $("videojs.util", t.Z);
    t.Z.mergeOptions = t.Z.Ea;
    t.addLanguage = t.sd;
})();

/**
 * Share.js
 *
 * @author  overtrue <i@overtrue.me>
 * @license MIT
 *
 * @example
 * <pre>
 * $('.share-components').share();
 *
 * // or
 *
 * $('.share-bar').share({
 *     sites: ['qzone', 'qq', 'weibo','wechat'],
 *     // ...
 * });
 * </pre>
 */
;(function ($) {
    /**
     * Initialize a share bar.
     *
     * @param {Object}        $options globals (optional).
     *
     * @return {Void}
     */
    $.fn.share = function ($options) {
        var $head = $(document.head);

        var $defaults = {
            url: ourl || location.href,
            site_url: location.origin,
            source: $head.find('[name=site], [name=Site]').attr('content') || document.title,
            title: $head.find('[name=title], [name=Title]').attr('content') || document.title,
            description: $head.find('[name=description], [name=Description]').attr('content') || '',
            image: $('img:first').prop('src') || '',
            imageSelector: undefined,
            images: $('img:first').prop('src') || '',
            weiboKey: '',
            wechatQrcodeTitle: '微信扫一扫：分享',
            wechatQrcodeHelper: '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>',
            wechatQrcodeSize: 100,
            mobileSites: [],
            sites: ['weibo', 'qq', 'wechat', 'tencent', 'douban', 'qzone', 'linkedin', 'diandian', 'facebook', 'twitter', 'google'],
            disabled: [],
            initialized: false
        };

        var $globals = $.extend({}, $defaults, $options);

        var $templates = {
            qzone: 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{URL}}&title={{TITLE}}&desc={{DESCRIPTION}}&summary={{SUMMARY}}&site={{SOURCE}}',
            qq: 'http://connect.qq.com/widget/shareqq/index.html?url={{URL}}&title={{TITLE}}&source={{SOURCE}}&desc={{DESCRIPTION}}&pics={{IMAGE}}',
            tencent: 'http://share.v.t.qq.com/index.php?c=share&a=index&title={{TITLE}}&url={{URL}}&pic={{IMAGE}}',
            weibo: 'http://service.weibo.com/share/share.php?url={{URL}}&title={{TITLE}}{{DESCRIPTION}}&pic={{IMAGES}}&appkey={{WEIBOKEY}}',
            wechat: 'javascript:;',
            douban: 'http://shuo.douban.com/!service/share?href={{URL}}&name={{TITLE}}&text={{DESCRIPTION}}&image={{IMAGE}}&starid=0&aid=0&style=11',
            diandian: 'http://www.diandian.com/share?lo={{URL}}&ti={{TITLE}}&type=link',
            linkedin: 'http://www.linkedin.com/shareArticle?mini=true&ro=true&title={{TITLE}}&url={{URL}}&summary={{SUMMARY}}&source={{SOURCE}}&armin=armin',
            facebook: 'https://www.facebook.com/sharer/sharer.php?u={{URL}}&title={{TITLE}}&description={{DESCRIPTION}}&caption={{SUBHEAD}}&link={{URL}}&picture={{IMAGE}}',
            twitter: 'https://twitter.com/intent/tweet?text={{TITLE}}&url={{URL}}&via={{SITE_URL}}',
            google: 'https://plus.google.com/share?url={{URL}}'
        };

        var $ariaLabels = {
            qzone: "QQ空间",
            qq: "QQ",
            tencent: "腾讯微博",
            weibo: "微博",
            wechat: "微信",
            douban: "豆瓣",
            diandian: "点点",
            linkedin: "LinkedIn",
            facebook: "Facebook",
            twitter: "Twitter",
            google: "Google"
        };

        this.each(function () {
            if ($(this).data('initialized')) {
                return true;
            }

            var $data = $.extend({}, $globals, $(this).data());
            if ($data.imageSelector) {
                $data.image = $($data.imageSelector).map(function () {
                    return $(this).prop('src');
                }).get().join('||');
            }
            var $container = $(this).addClass('share-component social-share');

            createIcons($container, $data);
            createWechat($container, $data);

            $(this).data('initialized', true);
        });

        /**
         * Create site icons
         *
         * @param {Object|String} $container
         * @param {Object}        $data
         */
        function createIcons($container, $data) {
            var $sites = getSites($data);

            $data.mode == 'prepend' ? $sites.reverse() : $sites

            if (!$sites.length) {
                return;
            }

            $.each($sites, function (i, $name) {
                var $url = makeUrl($name, $data);
                var $link = $data.initialized ? $container.find('.icon-' + $name) : $('<a class="social-share-icon icon-' + $name + '"></a>');

                if (!$link.length) {
                    return true;
                }
                $link.prop('aria-label', "分享到 " + $ariaLabels[$name]);

                $link.prop('href', $url);

                if ($name === 'wechat') {
                    $link.prop('tabindex', -1);
                } else {
                    $link.prop('target', '_blank');
                }

                if (!$data.initialized) {
                    $data.mode == 'prepend' ? $container.prepend($link) : $container.append($link);
                }
            });
        }

        /**
         * Create the wechat icon and QRCode.
         *
         * @param {Object|String} $container
         * @param {Object}        $data
         */
        function createWechat($container, $data) {
            var $wechat = $container.find('a.icon-wechat');

            if (!$wechat.length) {
                return;
            }

            $wechat.append('<div class="wechat-qrcode"><h4>' + $data.wechatQrcodeTitle + '</h4><div class="qrcode"></div><div class="help">' + $data.wechatQrcodeHelper + '</div></div>');

            $wechat.find('.qrcode').qrcode({
                render: 'image',
                size: $data.wechatQrcodeSize,
                text: $data.url,
                background: "transparent",
                foreground: "#000000"
            });

            if ($wechat.offset().top < 100) {
                $wechat.find('.wechat-qrcode').addClass('bottom');
            }
        }

        /**
         * Get available site lists.
         *
         * @param {Array} $data
         *
         * @return {Array}
         */
        function getSites($data) {
            if ($data['mobileSites'].length === 0 && $data['sites'].length) {
                $data['mobileSites'] = $data['sites'];
            }
            ;

            var $sites = (isMobileScreen() ? $data['mobileSites'] : ($data['sites'].length ? $data['sites'] : [])).slice(0);
            var $disabled = $data['disabled'];

            if (typeof $sites == 'string') {
                $sites = $sites.split(/\s*,\s*/);
            }
            if (typeof $disabled == 'string') {
                $disabled = $disabled.split(/\s*,\s*/);
            }

            if (runningInWeChat()) {
                $disabled.push('wechat');
            }
            // Remove elements
            $disabled.length && $.each($disabled, function (i, el) {
                var removeItemIndex = $.inArray(el, $sites);
                if (removeItemIndex !== -1) {
                    $sites.splice(removeItemIndex, 1);
                }
            });

            return $sites;
        }

        /**
         * Build the url of icon.
         *
         * @param {String} $name
         * @param {Object} $data
         *
         * @return {String}
         */
        function makeUrl($name, $data) {
            var $template = $templates[$name];
            $data['summary'] = $data['description'];

            for (var $key in $data) {
                if ($data.hasOwnProperty($key)) {
                    var $camelCaseKey = $name + $key.replace(/^[a-z]/, function ($str) {
                        return $str.toUpperCase();
                    });

                    var $value = encodeURIComponent($data[$camelCaseKey] === undefined ? $data[$key] : $data[$camelCaseKey]);
                    $template = $template.replace(new RegExp('{{' + $key.toUpperCase() + '}}', 'g'), $value);
                }
            }

            return $template;
        }

        /**
         * Detect wechat browser.
         *
         * @return {Boolean}
         */
        function runningInWeChat() {
            return /MicroMessenger/i.test(navigator.userAgent);
        }

        /**
         * Mobile screen width.
         *
         * @return {boolean}
         */
        function isMobileScreen() {
            return $(window).width() <= 768;
        }
    };

// Domready after initialization
//$(function () {
//$('.share-component,.social-share').share();
//});
})(jQuery);


if ($("#content img").length > 0) {
    var shareimages = imageurl;
    $("#content img").each(function () {
        shareimages = shareimages + "||" + $(this).attr("data-original")
    })
}

$('.social-share').share({
    url: ourl || location.href,
    //site_url: location.origin,
    //source: $head.find('[name=site], [name=Site]').attr('content') || document.title,
    //title: $head.find('[name=title], [name=Title]').attr('content') || document.title,
    //description: $head.find('[name=description], [name=Description]').attr('content') || '',
    //image: $('img:first').prop('src') || '',
    //imageSelector: undefined,
    image: imageurl || '',
    images: shareimages || imageurl,
    weiboKey: '2535656746',
    wechatQrcodeTitle: '微信扫一扫',
    wechatQrcodeHelper: '<p>发送给朋友&分享朋友圈</p>',
    //wechatQrcodeSize: 100,
    //mobileSites: ['weibo','douban','facebook','twitter'],
    //disabled: ['tencent','diandian','google'],
    //initialized: false,
    //sites: ['weibo','qq','wechat','tencent','douban','qzone','linkedin','diandian','facebook','twitter','google'],
    sites: ['wechat', 'weibo', 'douban', 'facebook', 'twitter']
});


/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright 2015 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery)
}(function (a) {
    function b(b) {
        var g = b || window.event,
            h = i.call(arguments, 1),
            j = 0,
            l = 0,
            m = 0,
            n = 0,
            o = 0,
            p = 0;
        if (b = a.event.fix(g), b.type = "mousewheel", "detail" in g && (m = -1 * g.detail), "wheelDelta" in g && (m = g.wheelDelta), "wheelDeltaY" in g && (m = g.wheelDeltaY), "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX), "axis" in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m, m = 0), j = 0 === m ? l : m, "deltaY" in g && (m = -1 * g.deltaY, j = m), "deltaX" in g && (l = g.deltaX, 0 === m && (j = -1 * l)), 0 !== m || 0 !== l) {
            if (1 === g.deltaMode) {
                var q = a.data(this, "mousewheel-line-height");
                j *= q, m *= q, l *= q
            } else if (2 === g.deltaMode) {
                var r = a.data(this, "mousewheel-page-height");
                j *= r, m *= r, l *= r
            }
            if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? "floor" : "ceil"](j / f), l = Math[l >= 1 ? "floor" : "ceil"](l / f), m = Math[m >= 1 ? "floor" : "ceil"](m / f), k.settings.normalizeOffset && this.getBoundingClientRect) {
                var s = this.getBoundingClientRect();
                o = b.clientX - s.left, p = b.clientY - s.top
            }
            return b.deltaX = l, b.deltaY = m, b.deltaFactor = f, b.offsetX = o, b.offsetY = p, b.deltaMode = 0, h.unshift(b, j, l, m), e && clearTimeout(e), e = setTimeout(c, 200), (a.event.dispatch || a.event.handle).apply(this, h)
        }
    }

    function c() {
        f = null
    }

    function d(a, b) {
        return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0
    }

    var e,
        f,
        g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        i = Array.prototype.slice;
    if (a.event.fixHooks)
        for (var j = g.length; j;) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
    var k = a.event.special.mousewheel = {
        version: "3.1.12",
        setup: function () {
            if (this.addEventListener)
                for (var c = h.length; c;) this.addEventListener(h[--c], b, !1);
            else
                this.onmousewheel = b;
            a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this))
        },
        teardown: function () {
            if (this.removeEventListener)
                for (var c = h.length; c;) this.removeEventListener(h[--c], b, !1);
            else
                this.onmousewheel = null;
            a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function (b) {
            var c = a(b),
                d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
            return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16
        },
        getPageHeight: function (b) {
            return a(b).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    a.fn.extend({
        mousewheel: function (a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
        },
        unmousewheel: function (a) {
            return this.unbind("mousewheel", a)
        }
    })
});

/* == malihu jquery custom scrollbar plugin == Version: 3.1.5, License: MIT License (MIT) */
!function (e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof module && module.exports ? module.exports = e : e(jQuery, window, document)
}(function (e) {
    !function (t) {
        var o = "function" == typeof define && define.amd,
            a = "undefined" != typeof module && module.exports,
            n = "https:" == document.location.protocol ? "https:" : "http:",
            i = "cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";
        o || (a ? require("jquery-mousewheel")(e) : e.event.special.mousewheel || e("head").append(decodeURI("%3Cscript src=" + n + "//" + i + "%3E%3C/script%3E"))), t()
    }(function () {
        var t,
            o = "mCustomScrollbar",
            a = "mCS",
            n = ".mCustomScrollbar",
            i = {
                setTop: 0,
                setLeft: 0,
                axis: "y",
                scrollbarPosition: "inside",
                scrollInertia: 950,
                autoDraggerLength: !0,
                alwaysShowScrollbar: 0,
                snapOffset: 0,
                mouseWheel: {
                    enable: !0,
                    scrollAmount: "auto",
                    axis: "y",
                    deltaFactor: "auto",
                    disableOver: ["select", "option", "keygen", "datalist", "textarea"]
                },
                scrollButtons: {
                    scrollType: "stepless",
                    scrollAmount: "auto"
                },
                keyboard: {
                    enable: !0,
                    scrollType: "stepless",
                    scrollAmount: "auto"
                },
                contentTouchScroll: 25,
                documentTouchScroll: !0,
                advanced: {
                    autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
                    updateOnContentResize: !0,
                    updateOnImageLoad: "auto",
                    autoUpdateTimeout: 60
                },
                theme: "light",
                callbacks: {
                    onTotalScrollOffset: 0,
                    onTotalScrollBackOffset: 0,
                    alwaysTriggerOffsets: !0
                }
            },
            r = 0,
            l = {},
            s = window.attachEvent && !window.addEventListener ? 1 : 0,
            c = !1,
            d = ["mCSB_dragger_onDrag", "mCSB_scrollTools_onDrag", "mCS_img_loaded", "mCS_disabled", "mCS_destroyed", "mCS_no_scrollbar", "mCS-autoHide", "mCS-dir-rtl", "mCS_no_scrollbar_y", "mCS_no_scrollbar_x", "mCS_y_hidden", "mCS_x_hidden", "mCSB_draggerContainer", "mCSB_buttonUp", "mCSB_buttonDown", "mCSB_buttonLeft", "mCSB_buttonRight"],
            u = {
                init: function (t) {
                    var t = e.extend(!0, {}, i, t),
                        o = f.call(this);
                    if (t.live) {
                        var s = t.liveSelector || this.selector || n,
                            c = e(s);
                        if ("off" === t.live) return void m(s);
                        l[s] = setTimeout(function () {
                            c.mCustomScrollbar(t), "once" === t.live && c.length && m(s)
                        }, 500)
                    } else m(s);
                    return t.setWidth = t.set_width ? t.set_width : t.setWidth, t.setHeight = t.set_height ? t.set_height : t.setHeight, t.axis = t.horizontalScroll ? "x" : p(t.axis), t.scrollInertia = t.scrollInertia > 0 && t.scrollInertia < 17 ? 17 : t.scrollInertia, "object" != typeof t.mouseWheel && 1 == t.mouseWheel && (t.mouseWheel = {
                        enable: !0,
                        scrollAmount: "auto",
                        axis: "y",
                        preventDefault: !1,
                        deltaFactor: "auto",
                        normalizeDelta: !1,
                        invert: !1
                    }), t.mouseWheel.scrollAmount = t.mouseWheelPixels ? t.mouseWheelPixels : t.mouseWheel.scrollAmount, t.mouseWheel.normalizeDelta = t.advanced.normalizeMouseWheelDelta ? t.advanced.normalizeMouseWheelDelta : t.mouseWheel.normalizeDelta, t.scrollButtons.scrollType = g(t.scrollButtons.scrollType), h(t), e(o).each(function () {
                        var o = e(this);
                        if (!o.data(a)) {
                            o.data(a, {
                                idx: ++r,
                                opt: t,
                                scrollRatio: {
                                    y: null,
                                    x: null
                                },
                                overflowed: null,
                                contentReset: {
                                    y: null,
                                    x: null
                                },
                                bindEvents: !1,
                                tweenRunning: !1,
                                sequential: {},
                                langDir: o.css("direction"),
                                cbOffsets: null,
                                trigger: null,
                                poll: {
                                    size: {
                                        o: 0,
                                        n: 0
                                    },
                                    img: {
                                        o: 0,
                                        n: 0
                                    },
                                    change: {
                                        o: 0,
                                        n: 0
                                    }
                                }
                            });
                            var n = o.data(a),
                                i = n.opt,
                                l = o.data("mcs-axis"),
                                s = o.data("mcs-scrollbar-position"),
                                c = o.data("mcs-theme");
                            l && (i.axis = l), s && (i.scrollbarPosition = s), c && (i.theme = c, h(i)), v.call(this), n && i.callbacks.onCreate && "function" == typeof i.callbacks.onCreate && i.callbacks.onCreate.call(this), e("#mCSB_" + n.idx + "_container img:not(." + d[2] + ")").addClass(d[2]), u.update.call(null, o)
                        }
                    })
                },
                update: function (t, o) {
                    var n = t || f.call(this);
                    return e(n).each(function () {
                        var t = e(this);
                        if (t.data(a)) {
                            var n = t.data(a),
                                i = n.opt,
                                r = e("#mCSB_" + n.idx + "_container"),
                                l = e("#mCSB_" + n.idx),
                                s = [e("#mCSB_" + n.idx + "_dragger_vertical"), e("#mCSB_" + n.idx + "_dragger_horizontal")];
                            if (!r.length) return;
                            n.tweenRunning && Q(t), o && n && i.callbacks.onBeforeUpdate && "function" == typeof i.callbacks.onBeforeUpdate && i.callbacks.onBeforeUpdate.call(this), t.hasClass(d[3]) && t.removeClass(d[3]), t.hasClass(d[4]) && t.removeClass(d[4]), l.css("max-height", "none"), l.height() !== t.height() && l.css("max-height", t.height()), _.call(this), "y" === i.axis || i.advanced.autoExpandHorizontalScroll || r.css("width", x(r)), n.overflowed = y.call(this), M.call(this), i.autoDraggerLength && S.call(this), b.call(this), T.call(this);
                            var c = [Math.abs(r[0].offsetTop), Math.abs(r[0].offsetLeft)];
                            "x" !== i.axis && (n.overflowed[0] ? s[0].height() > s[0].parent().height() ? B.call(this) : (G(t, c[0].toString(), {
                                dir: "y",
                                dur: 0,
                                overwrite: "none"
                            }), n.contentReset.y = null) : (B.call(this), "y" === i.axis ? k.call(this) : "yx" === i.axis && n.overflowed[1] && G(t, c[1].toString(), {
                                dir: "x",
                                dur: 0,
                                overwrite: "none"
                            }))), "y" !== i.axis && (n.overflowed[1] ? s[1].width() > s[1].parent().width() ? B.call(this) : (G(t, c[1].toString(), {
                                dir: "x",
                                dur: 0,
                                overwrite: "none"
                            }), n.contentReset.x = null) : (B.call(this), "x" === i.axis ? k.call(this) : "yx" === i.axis && n.overflowed[0] && G(t, c[0].toString(), {
                                dir: "y",
                                dur: 0,
                                overwrite: "none"
                            }))), o && n && (2 === o && i.callbacks.onImageLoad && "function" == typeof i.callbacks.onImageLoad ? i.callbacks.onImageLoad.call(this) : 3 === o && i.callbacks.onSelectorChange && "function" == typeof i.callbacks.onSelectorChange ? i.callbacks.onSelectorChange.call(this) : i.callbacks.onUpdate && "function" == typeof i.callbacks.onUpdate && i.callbacks.onUpdate.call(this)), N.call(this)
                        }
                    })
                },
                scrollTo: function (t, o) {
                    if ("undefined" != typeof t && null != t) {
                        var n = f.call(this);
                        return e(n).each(function () {
                            var n = e(this);
                            if (n.data(a)) {
                                var i = n.data(a),
                                    r = i.opt,
                                    l = {
                                        trigger: "external",
                                        scrollInertia: r.scrollInertia,
                                        scrollEasing: "mcsEaseInOut",
                                        moveDragger: !1,
                                        timeout: 60,
                                        callbacks: !0,
                                        onStart: !0,
                                        onUpdate: !0,
                                        onComplete: !0
                                    },
                                    s = e.extend(!0, {}, l, o),
                                    c = Y.call(this, t),
                                    d = s.scrollInertia > 0 && s.scrollInertia < 17 ? 17 : s.scrollInertia;
                                c[0] = X.call(this, c[0], "y"), c[1] = X.call(this, c[1], "x"), s.moveDragger && (c[0] *= i.scrollRatio.y, c[1] *= i.scrollRatio.x), s.dur = ne() ? 0 : d, setTimeout(function () {
                                    null !== c[0] && "undefined" != typeof c[0] && "x" !== r.axis && i.overflowed[0] && (s.dir = "y", s.overwrite = "all", G(n, c[0].toString(), s)), null !== c[1] && "undefined" != typeof c[1] && "y" !== r.axis && i.overflowed[1] && (s.dir = "x", s.overwrite = "none", G(n, c[1].toString(), s))
                                }, s.timeout)
                            }
                        })
                    }
                },
                stop: function () {
                    var t = f.call(this);
                    return e(t).each(function () {
                        var t = e(this);
                        t.data(a) && Q(t)
                    })
                },
                disable: function (t) {
                    var o = f.call(this);
                    return e(o).each(function () {
                        var o = e(this);
                        if (o.data(a)) {
                            o.data(a);
                            N.call(this, "remove"), k.call(this), t && B.call(this), M.call(this, !0), o.addClass(d[3])
                        }
                    })
                },
                destroy: function () {
                    var t = f.call(this);
                    return e(t).each(function () {
                        var n = e(this);
                        if (n.data(a)) {
                            var i = n.data(a),
                                r = i.opt,
                                l = e("#mCSB_" + i.idx),
                                s = e("#mCSB_" + i.idx + "_container"),
                                c = e(".mCSB_" + i.idx + "_scrollbar");
                            r.live && m(r.liveSelector || e(t).selector), N.call(this, "remove"), k.call(this), B.call(this), n.removeData(a), $(this, "mcs"), c.remove(), s.find("img." + d[2]).removeClass(d[2]), l.replaceWith(s.contents()), n.removeClass(o + " _" + a + "_" + i.idx + " " + d[6] + " " + d[7] + " " + d[5] + " " + d[3]).addClass(d[4])
                        }
                    })
                }
            },
            f = function () {
                return "object" != typeof e(this) || e(this).length < 1 ? n : this
            },
            h = function (t) {
                var o = ["rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark"],
                    a = ["rounded-dots", "rounded-dots-dark", "3d", "3d-dark", "3d-thick", "3d-thick-dark", "inset", "inset-dark", "inset-2", "inset-2-dark", "inset-3", "inset-3-dark"],
                    n = ["minimal", "minimal-dark"],
                    i = ["minimal", "minimal-dark"],
                    r = ["minimal", "minimal-dark"];
                t.autoDraggerLength = e.inArray(t.theme, o) > -1 ? !1 : t.autoDraggerLength, t.autoExpandScrollbar = e.inArray(t.theme, a) > -1 ? !1 : t.autoExpandScrollbar, t.scrollButtons.enable = e.inArray(t.theme, n) > -1 ? !1 : t.scrollButtons.enable, t.autoHideScrollbar = e.inArray(t.theme, i) > -1 ? !0 : t.autoHideScrollbar, t.scrollbarPosition = e.inArray(t.theme, r) > -1 ? "outside" : t.scrollbarPosition
            },
            m = function (e) {
                l[e] && (clearTimeout(l[e]), $(l, e))
            },
            p = function (e) {
                return "yx" === e || "xy" === e || "auto" === e ? "yx" : "x" === e || "horizontal" === e ? "x" : "y"
            },
            g = function (e) {
                return "stepped" === e || "pixels" === e || "step" === e || "click" === e ? "stepped" : "stepless"
            },
            v = function () {
                var t = e(this),
                    n = t.data(a),
                    i = n.opt,
                    r = i.autoExpandScrollbar ? " " + d[1] + "_expand" : "",
                    l = ["<div id='mCSB_" + n.idx + "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" + n.idx + "_scrollbar mCS-" + i.theme + " mCSB_scrollTools_vertical" + r + "'><div class='" + d[12] + "'><div id='mCSB_" + n.idx + "_dragger_vertical' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>", "<div id='mCSB_" + n.idx + "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" + n.idx + "_scrollbar mCS-" + i.theme + " mCSB_scrollTools_horizontal" + r + "'><div class='" + d[12] + "'><div id='mCSB_" + n.idx + "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
                    s = "yx" === i.axis ? "mCSB_vertical_horizontal" : "x" === i.axis ? "mCSB_horizontal" : "mCSB_vertical",
                    c = "yx" === i.axis ? l[0] + l[1] : "x" === i.axis ? l[1] : l[0],
                    u = "yx" === i.axis ? "<div id='mCSB_" + n.idx + "_container_wrapper' class='mCSB_container_wrapper' />" : "",
                    f = i.autoHideScrollbar ? " " + d[6] : "",
                    h = "x" !== i.axis && "rtl" === n.langDir ? " " + d[7] : "";
                i.setWidth && t.css("width", i.setWidth), i.setHeight && t.css("height", i.setHeight), i.setLeft = "y" !== i.axis && "rtl" === n.langDir ? "989999px" : i.setLeft, t.addClass(o + " _" + a + "_" + n.idx + f + h).wrapInner("<div id='mCSB_" + n.idx + "' class='mCustomScrollBox mCS-" + i.theme + " " + s + "'><div id='mCSB_" + n.idx + "_container' class='mCSB_container' style='position:relative; top:" + i.setTop + "; left:" + i.setLeft + ";' dir='" + n.langDir + "' /></div>");
                var m = e("#mCSB_" + n.idx),
                    p = e("#mCSB_" + n.idx + "_container");
                "y" === i.axis || i.advanced.autoExpandHorizontalScroll || p.css("width", x(p)), "outside" === i.scrollbarPosition ? ("static" === t.css("position") && t.css("position", "relative"), t.css("overflow", "visible"), m.addClass("mCSB_outside").after(c)) : (m.addClass("mCSB_inside").append(c), p.wrap(u)), w.call(this);
                var g = [e("#mCSB_" + n.idx + "_dragger_vertical"), e("#mCSB_" + n.idx + "_dragger_horizontal")];
                g[0].css("min-height", g[0].height()), g[1].css("min-width", g[1].width())
            },
            x = function (t) {
                var o = [t[0].scrollWidth, Math.max.apply(Math, t.children().map(function () {
                        return e(this).outerWidth(!0)
                    }).get())],
                    a = t.parent().width();
                return o[0] > a ? o[0] : o[1] > a ? o[1] : "100%"
            },
            _ = function () {
                var t = e(this),
                    o = t.data(a),
                    n = o.opt,
                    i = e("#mCSB_" + o.idx + "_container");
                if (n.advanced.autoExpandHorizontalScroll && "y" !== n.axis) {
                    i.css({
                        width: "auto",
                        "min-width": 0,
                        "overflow-x": "scroll"
                    });
                    var r = Math.ceil(i[0].scrollWidth);
                    3 === n.advanced.autoExpandHorizontalScroll || 2 !== n.advanced.autoExpandHorizontalScroll && r > i.parent().width() ? i.css({
                        width: r,
                        "min-width": "100%",
                        "overflow-x": "inherit"
                    }) : i.css({
                        "overflow-x": "inherit",
                        position: "absolute"
                    }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
                        width: Math.ceil(i[0].getBoundingClientRect().right + .4) - Math.floor(i[0].getBoundingClientRect().left),
                        "min-width": "100%",
                        position: "relative"
                    }).unwrap()
                }
            },
            w = function () {
                var t = e(this),
                    o = t.data(a),
                    n = o.opt,
                    i = e(".mCSB_" + o.idx + "_scrollbar:first"),
                    r = oe(n.scrollButtons.tabindex) ? "tabindex='" + n.scrollButtons.tabindex + "'" : "",
                    l = ["<a href='#' class='" + d[13] + "' " + r + " />", "<a href='#' class='" + d[14] + "' " + r + " />", "<a href='#' class='" + d[15] + "' " + r + " />", "<a href='#' class='" + d[16] + "' " + r + " />"],
                    s = ["x" === n.axis ? l[2] : l[0], "x" === n.axis ? l[3] : l[1], l[2], l[3]];
                n.scrollButtons.enable && i.prepend(s[0]).append(s[1]).next(".mCSB_scrollTools").prepend(s[2]).append(s[3])
            },
            S = function () {
                var t = e(this),
                    o = t.data(a),
                    n = e("#mCSB_" + o.idx),
                    i = e("#mCSB_" + o.idx + "_container"),
                    r = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")],
                    l = [n.height() / i.outerHeight(!1), n.width() / i.outerWidth(!1)],
                    c = [parseInt(r[0].css("min-height")), Math.round(l[0] * r[0].parent().height()), parseInt(r[1].css("min-width")), Math.round(l[1] * r[1].parent().width())],
                    d = s && c[1] < c[0] ? c[0] : c[1],
                    u = s && c[3] < c[2] ? c[2] : c[3];
                r[0].css({
                    height: d,
                    "max-height": r[0].parent().height() - 10
                }).find(".mCSB_dragger_bar").css({
                    "line-height": c[0] + "px"
                }), r[1].css({
                    width: u,
                    "max-width": r[1].parent().width() - 10
                })
            },
            b = function () {
                var t = e(this),
                    o = t.data(a),
                    n = e("#mCSB_" + o.idx),
                    i = e("#mCSB_" + o.idx + "_container"),
                    r = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")],
                    l = [i.outerHeight(!1) - n.height(), i.outerWidth(!1) - n.width()],
                    s = [l[0] / (r[0].parent().height() - r[0].height()), l[1] / (r[1].parent().width() - r[1].width())];
                o.scrollRatio = {
                    y: s[0],
                    x: s[1]
                }
            },
            C = function (e, t, o) {
                var a = o ? d[0] + "_expanded" : "",
                    n = e.closest(".mCSB_scrollTools");
                "active" === t ? (e.toggleClass(d[0] + " " + a), n.toggleClass(d[1]), e[0]._draggable = e[0]._draggable ? 0 : 1) : e[0]._draggable || ("hide" === t ? (e.removeClass(d[0]), n.removeClass(d[1])) : (e.addClass(d[0]), n.addClass(d[1])))
            },
            y = function () {
                var t = e(this),
                    o = t.data(a),
                    n = e("#mCSB_" + o.idx),
                    i = e("#mCSB_" + o.idx + "_container"),
                    r = null == o.overflowed ? i.height() : i.outerHeight(!1),
                    l = null == o.overflowed ? i.width() : i.outerWidth(!1),
                    s = i[0].scrollHeight,
                    c = i[0].scrollWidth;
                return s > r && (r = s), c > l && (l = c), [r > n.height(), l > n.width()]
            },
            B = function () {
                var t = e(this),
                    o = t.data(a),
                    n = o.opt,
                    i = e("#mCSB_" + o.idx),
                    r = e("#mCSB_" + o.idx + "_container"),
                    l = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")];
                if (Q(t), ("x" !== n.axis && !o.overflowed[0] || "y" === n.axis && o.overflowed[0]) && (l[0].add(r).css("top", 0), G(t, "_resetY")), "y" !== n.axis && !o.overflowed[1] || "x" === n.axis && o.overflowed[1]) {
                    var s = dx = 0;
                    "rtl" === o.langDir && (s = i.width() - r.outerWidth(!1), dx = Math.abs(s / o.scrollRatio.x)), r.css("left", s), l[1].css("left", dx), G(t, "_resetX")
                }
            },
            T = function () {
                function t() {
                    r = setTimeout(function () {
                        e.event.special.mousewheel ? (clearTimeout(r), W.call(o[0])) : t()
                    }, 100)
                }

                var o = e(this),
                    n = o.data(a),
                    i = n.opt;
                if (!n.bindEvents) {
                    if (I.call(this), i.contentTouchScroll && D.call(this), E.call(this), i.mouseWheel.enable) {
                        var r;
                        t()
                    }
                    P.call(this), U.call(this), i.advanced.autoScrollOnFocus && H.call(this), i.scrollButtons.enable && F.call(this), i.keyboard.enable && q.call(this), n.bindEvents = !0
                }
            },
            k = function () {
                var t = e(this),
                    o = t.data(a),
                    n = o.opt,
                    i = a + "_" + o.idx,
                    r = ".mCSB_" + o.idx + "_scrollbar",
                    l = e("#mCSB_" + o.idx + ",#mCSB_" + o.idx + "_container,#mCSB_" + o.idx + "_container_wrapper," + r + " ." + d[12] + ",#mCSB_" + o.idx + "_dragger_vertical,#mCSB_" + o.idx + "_dragger_horizontal," + r + ">a"),
                    s = e("#mCSB_" + o.idx + "_container");
                n.advanced.releaseDraggableSelectors && l.add(e(n.advanced.releaseDraggableSelectors)), n.advanced.extraDraggableSelectors && l.add(e(n.advanced.extraDraggableSelectors)), o.bindEvents && (e(document).add(e(!A() || top.document)).unbind("." + i), l.each(function () {
                    e(this).unbind("." + i)
                }), clearTimeout(t[0]._focusTimeout), $(t[0], "_focusTimeout"), clearTimeout(o.sequential.step), $(o.sequential, "step"), clearTimeout(s[0].onCompleteTimeout), $(s[0], "onCompleteTimeout"), o.bindEvents = !1)
            },
            M = function (t) {
                var o = e(this),
                    n = o.data(a),
                    i = n.opt,
                    r = e("#mCSB_" + n.idx + "_container_wrapper"),
                    l = r.length ? r : e("#mCSB_" + n.idx + "_container"),
                    s = [e("#mCSB_" + n.idx + "_scrollbar_vertical"), e("#mCSB_" + n.idx + "_scrollbar_horizontal")],
                    c = [s[0].find(".mCSB_dragger"), s[1].find(".mCSB_dragger")];
                "x" !== i.axis && (n.overflowed[0] && !t ? (s[0].add(c[0]).add(s[0].children("a")).css("display", "block"), l.removeClass(d[8] + " " + d[10])) : (i.alwaysShowScrollbar ? (2 !== i.alwaysShowScrollbar && c[0].css("display", "none"), l.removeClass(d[10])) : (s[0].css("display", "none"), l.addClass(d[10])), l.addClass(d[8]))), "y" !== i.axis && (n.overflowed[1] && !t ? (s[1].add(c[1]).add(s[1].children("a")).css("display", "block"), l.removeClass(d[9] + " " + d[11])) : (i.alwaysShowScrollbar ? (2 !== i.alwaysShowScrollbar && c[1].css("display", "none"), l.removeClass(d[11])) : (s[1].css("display", "none"), l.addClass(d[11])), l.addClass(d[9]))), n.overflowed[0] || n.overflowed[1] ? o.removeClass(d[5]) : o.addClass(d[5])
            },
            O = function (t) {
                var o = t.type,
                    a = t.target.ownerDocument !== document && null !== frameElement ? [e(frameElement).offset().top, e(frameElement).offset().left] : null,
                    n = A() && t.target.ownerDocument !== top.document && null !== frameElement ? [e(t.view.frameElement).offset().top, e(t.view.frameElement).offset().left] : [0, 0];
                switch (o) {
                    case "pointerdown":
                    case "MSPointerDown":
                    case "pointermove":
                    case "MSPointerMove":
                    case "pointerup":
                    case "MSPointerUp":
                        return a ? [t.originalEvent.pageY - a[0] + n[0], t.originalEvent.pageX - a[1] + n[1], !1] : [t.originalEvent.pageY, t.originalEvent.pageX, !1];
                    case "touchstart":
                    case "touchmove":
                    case "touchend":
                        var i = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0],
                            r = t.originalEvent.touches.length || t.originalEvent.changedTouches.length;
                        return t.target.ownerDocument !== document ? [i.screenY, i.screenX, r > 1] : [i.pageY, i.pageX, r > 1];
                    default:
                        return a ? [t.pageY - a[0] + n[0], t.pageX - a[1] + n[1], !1] : [t.pageY, t.pageX, !1]
                }
            },
            I = function () {
                function t(e, t, a, n) {
                    if (h[0].idleTimer = d.scrollInertia < 233 ? 250 : 0, o.attr("id") === f[1]) var i = "x",
                        s = (o[0].offsetLeft - t + n) * l.scrollRatio.x;
                    else var i = "y",
                        s = (o[0].offsetTop - e + a) * l.scrollRatio.y;
                    G(r, s.toString(), {
                        dir: i,
                        drag: !0
                    })
                }

                var o,
                    n,
                    i,
                    r = e(this),
                    l = r.data(a),
                    d = l.opt,
                    u = a + "_" + l.idx,
                    f = ["mCSB_" + l.idx + "_dragger_vertical", "mCSB_" + l.idx + "_dragger_horizontal"],
                    h = e("#mCSB_" + l.idx + "_container"),
                    m = e("#" + f[0] + ",#" + f[1]),
                    p = d.advanced.releaseDraggableSelectors ? m.add(e(d.advanced.releaseDraggableSelectors)) : m,
                    g = d.advanced.extraDraggableSelectors ? e(!A() || top.document).add(e(d.advanced.extraDraggableSelectors)) : e(!A() || top.document);
                m.bind("contextmenu." + u, function (e) {
                    e.preventDefault()
                }).bind("mousedown." + u + " touchstart." + u + " pointerdown." + u + " MSPointerDown." + u, function (t) {
                    if (t.stopImmediatePropagation(), t.preventDefault(), ee(t)) {
                        c = !0, s && (document.onselectstart = function () {
                            return !1
                        }), L.call(h, !1), Q(r), o = e(this);
                        var a = o.offset(),
                            l = O(t)[0] - a.top,
                            u = O(t)[1] - a.left,
                            f = o.height() + a.top,
                            m = o.width() + a.left;
                        f > l && l > 0 && m > u && u > 0 && (n = l, i = u), C(o, "active", d.autoExpandScrollbar)
                    }
                }).bind("touchmove." + u, function (e) {
                    e.stopImmediatePropagation(), e.preventDefault();
                    var a = o.offset(),
                        r = O(e)[0] - a.top,
                        l = O(e)[1] - a.left;
                    t(n, i, r, l)
                }), e(document).add(g).bind("mousemove." + u + " pointermove." + u + " MSPointerMove." + u, function (e) {
                    if (o) {
                        var a = o.offset(),
                            r = O(e)[0] - a.top,
                            l = O(e)[1] - a.left;
                        if (n === r && i === l) return;
                        t(n, i, r, l)
                    }
                }).add(p).bind("mouseup." + u + " touchend." + u + " pointerup." + u + " MSPointerUp." + u, function () {
                    o && (C(o, "active", d.autoExpandScrollbar), o = null), c = !1, s && (document.onselectstart = null), L.call(h, !0)
                })
            },
            D = function () {
                function o(e) {
                    if (!te(e) || c || O(e)[2]) return void (t = 0);
                    t = 1, b = 0, C = 0, d = 1, y.removeClass("mCS_touch_action");
                    var o = I.offset();
                    u = O(e)[0] - o.top, f = O(e)[1] - o.left, z = [O(e)[0], O(e)[1]]
                }

                function n(e) {
                    if (te(e) && !c && !O(e)[2] && (T.documentTouchScroll || e.preventDefault(), e.stopImmediatePropagation(), (!C || b) && d)) {
                        g = K();
                        var t = M.offset(),
                            o = O(e)[0] - t.top,
                            a = O(e)[1] - t.left,
                            n = "mcsLinearOut";
                        if (E.push(o), W.push(a), z[2] = Math.abs(O(e)[0] - z[0]), z[3] = Math.abs(O(e)[1] - z[1]), B.overflowed[0]) var i = D[0].parent().height() - D[0].height(),
                            r = u - o > 0 && o - u > -(i * B.scrollRatio.y) && (2 * z[3] < z[2] || "yx" === T.axis);
                        if (B.overflowed[1]) var l = D[1].parent().width() - D[1].width(),
                            h = f - a > 0 && a - f > -(l * B.scrollRatio.x) && (2 * z[2] < z[3] || "yx" === T.axis);
                        r || h ? (U || e.preventDefault(), b = 1) : (C = 1, y.addClass("mCS_touch_action")), U && e.preventDefault(), w = "yx" === T.axis ? [u - o, f - a] : "x" === T.axis ? [null, f - a] : [u - o, null], I[0].idleTimer = 250, B.overflowed[0] && s(w[0], R, n, "y", "all", !0), B.overflowed[1] && s(w[1], R, n, "x", L, !0)
                    }
                }

                function i(e) {
                    if (!te(e) || c || O(e)[2]) return void (t = 0);
                    t = 1, e.stopImmediatePropagation(), Q(y), p = K();
                    var o = M.offset();
                    h = O(e)[0] - o.top, m = O(e)[1] - o.left, E = [], W = []
                }

                function r(e) {
                    if (te(e) && !c && !O(e)[2]) {
                        d = 0, e.stopImmediatePropagation(), b = 0, C = 0, v = K();
                        var t = M.offset(),
                            o = O(e)[0] - t.top,
                            a = O(e)[1] - t.left;
                        if (!(v - g > 30)) {
                            _ = 1e3 / (v - p);
                            var n = "mcsEaseOut",
                                i = 2.5 > _,
                                r = i ? [E[E.length - 2], W[W.length - 2]] : [0, 0];
                            x = i ? [o - r[0], a - r[1]] : [o - h, a - m];
                            var u = [Math.abs(x[0]), Math.abs(x[1])];
                            _ = i ? [Math.abs(x[0] / 4), Math.abs(x[1] / 4)] : [_, _];
                            var f = [Math.abs(I[0].offsetTop) - x[0] * l(u[0] / _[0], _[0]), Math.abs(I[0].offsetLeft) - x[1] * l(u[1] / _[1], _[1])];
                            w = "yx" === T.axis ? [f[0], f[1]] : "x" === T.axis ? [null, f[1]] : [f[0], null], S = [4 * u[0] + T.scrollInertia, 4 * u[1] + T.scrollInertia];
                            var y = parseInt(T.contentTouchScroll) || 0;
                            w[0] = u[0] > y ? w[0] : 0, w[1] = u[1] > y ? w[1] : 0, B.overflowed[0] && s(w[0], S[0], n, "y", L, !1), B.overflowed[1] && s(w[1], S[1], n, "x", L, !1)
                        }
                    }
                }

                function l(e, t) {
                    var o = [1.5 * t, 2 * t, t / 1.5, t / 2];
                    return e > 90 ? t > 4 ? o[0] : o[3] : e > 60 ? t > 3 ? o[3] : o[2] : e > 30 ? t > 8 ? o[1] : t > 6 ? o[0] : t > 4 ? t : o[2] : t > 8 ? t : o[3]
                }

                function s(e, t, o, a, n, i) {
                    e && G(y, e.toString(), {
                        dur: t,
                        scrollEasing: o,
                        dir: a,
                        overwrite: n,
                        drag: i
                    })
                }

                var d,
                    u,
                    f,
                    h,
                    m,
                    p,
                    g,
                    v,
                    x,
                    _,
                    w,
                    S,
                    b,
                    C,
                    y = e(this),
                    B = y.data(a),
                    T = B.opt,
                    k = a + "_" + B.idx,
                    M = e("#mCSB_" + B.idx),
                    I = e("#mCSB_" + B.idx + "_container"),
                    D = [e("#mCSB_" + B.idx + "_dragger_vertical"), e("#mCSB_" + B.idx + "_dragger_horizontal")],
                    E = [],
                    W = [],
                    R = 0,
                    L = "yx" === T.axis ? "none" : "all",
                    z = [],
                    P = I.find("iframe"),
                    H = ["touchstart." + k + " pointerdown." + k + " MSPointerDown." + k, "touchmove." + k + " pointermove." + k + " MSPointerMove." + k, "touchend." + k + " pointerup." + k + " MSPointerUp." + k],
                    U = void 0 !== document.body.style.touchAction && "" !== document.body.style.touchAction;
                I.bind(H[0], function (e) {
                    o(e)
                }).bind(H[1], function (e) {
                    n(e)
                }), M.bind(H[0], function (e) {
                    i(e)
                }).bind(H[2], function (e) {
                    r(e)
                }), P.length && P.each(function () {
                    e(this).bind("load", function () {
                        A(this) && e(this.contentDocument || this.contentWindow.document).bind(H[0], function (e) {
                            o(e), i(e)
                        }).bind(H[1], function (e) {
                            n(e)
                        }).bind(H[2], function (e) {
                            r(e)
                        })
                    })
                })
            },
            E = function () {
                function o() {
                    return window.getSelection ? window.getSelection().toString() : document.selection && "Control" != document.selection.type ? document.selection.createRange().text : 0
                }

                function n(e, t, o) {
                    d.type = o && i ? "stepped" : "stepless", d.scrollAmount = 10, j(r, e, t, "mcsLinearOut", o ? 60 : null)
                }

                var i,
                    r = e(this),
                    l = r.data(a),
                    s = l.opt,
                    d = l.sequential,
                    u = a + "_" + l.idx,
                    f = e("#mCSB_" + l.idx + "_container"),
                    h = f.parent();
                f.bind("mousedown." + u, function () {
                    t || i || (i = 1, c = !0)
                }).add(document).bind("mousemove." + u, function (e) {
                    if (!t && i && o()) {
                        var a = f.offset(),
                            r = O(e)[0] - a.top + f[0].offsetTop,
                            c = O(e)[1] - a.left + f[0].offsetLeft;
                        r > 0 && r < h.height() && c > 0 && c < h.width() ? d.step && n("off", null, "stepped") : ("x" !== s.axis && l.overflowed[0] && (0 > r ? n("on", 38) : r > h.height() && n("on", 40)), "y" !== s.axis && l.overflowed[1] && (0 > c ? n("on", 37) : c > h.width() && n("on", 39)))
                    }
                }).bind("mouseup." + u + " dragend." + u, function () {
                    t || (i && (i = 0, n("off", null)), c = !1)
                })
            },
            W = function () {
                function t(t, a) {
                    if (Q(o), !z(o, t.target)) {
                        var r = "auto" !== i.mouseWheel.deltaFactor ? parseInt(i.mouseWheel.deltaFactor) : s && t.deltaFactor < 100 ? 100 : t.deltaFactor || 100,
                            d = i.scrollInertia;
                        if ("x" === i.axis || "x" === i.mouseWheel.axis) var u = "x",
                            f = [Math.round(r * n.scrollRatio.x), parseInt(i.mouseWheel.scrollAmount)],
                            h = "auto" !== i.mouseWheel.scrollAmount ? f[1] : f[0] >= l.width() ? .9 * l.width() : f[0],
                            m = Math.abs(e("#mCSB_" + n.idx + "_container")[0].offsetLeft),
                            p = c[1][0].offsetLeft,
                            g = c[1].parent().width() - c[1].width(),
                            v = "y" === i.mouseWheel.axis ? t.deltaY || a : t.deltaX;
                        else var u = "y",
                            f = [Math.round(r * n.scrollRatio.y), parseInt(i.mouseWheel.scrollAmount)],
                            h = "auto" !== i.mouseWheel.scrollAmount ? f[1] : f[0] >= l.height() ? .9 * l.height() : f[0],
                            m = Math.abs(e("#mCSB_" + n.idx + "_container")[0].offsetTop),
                            p = c[0][0].offsetTop,
                            g = c[0].parent().height() - c[0].height(),
                            v = t.deltaY || a;
                        "y" === u && !n.overflowed[0] || "x" === u && !n.overflowed[1] || ((i.mouseWheel.invert || t.webkitDirectionInvertedFromDevice) && (v = -v), i.mouseWheel.normalizeDelta && (v = 0 > v ? -1 : 1), (v > 0 && 0 !== p || 0 > v && p !== g || i.mouseWheel.preventDefault) && (t.stopImmediatePropagation(), t.preventDefault()), t.deltaFactor < 5 && !i.mouseWheel.normalizeDelta && (h = t.deltaFactor, d = 17), G(o, (m - v * h).toString(), {
                            dir: u,
                            dur: d
                        }))
                    }
                }

                if (e(this).data(a)) {
                    var o = e(this),
                        n = o.data(a),
                        i = n.opt,
                        r = a + "_" + n.idx,
                        l = e("#mCSB_" + n.idx),
                        c = [e("#mCSB_" + n.idx + "_dragger_vertical"), e("#mCSB_" + n.idx + "_dragger_horizontal")],
                        d = e("#mCSB_" + n.idx + "_container").find("iframe");
                    d.length && d.each(function () {
                        e(this).bind("load", function () {
                            A(this) && e(this.contentDocument || this.contentWindow.document).bind("mousewheel." + r, function (e, o) {
                                t(e, o)
                            })
                        })
                    }), l.bind("mousewheel." + r, function (e, o) {
                        t(e, o)
                    })
                }
            },
            R = new Object,
            A = function (t) {
                var o = !1,
                    a = !1,
                    n = null;
                if (void 0 === t ? a = "#empty" : void 0 !== e(t).attr("id") && (a = e(t).attr("id")), a !== !1 && void 0 !== R[a]) return R[a];
                if (t) {
                    try {
                        var i = t.contentDocument || t.contentWindow.document;
                        n = i.body.innerHTML
                    } catch (r) {
                    }
                    o = null !== n
                } else {
                    try {
                        var i = top.document;
                        n = i.body.innerHTML
                    } catch (r) {
                    }
                    o = null !== n
                }
                return a !== !1 && (R[a] = o), o
            },
            L = function (e) {
                var t = this.find("iframe");
                if (t.length) {
                    var o = e ? "auto" : "none";
                    t.css("pointer-events", o)
                }
            },
            z = function (t, o) {
                var n = o.nodeName.toLowerCase(),
                    i = t.data(a).opt.mouseWheel.disableOver,
                    r = ["select", "textarea"];
                return e.inArray(n, i) > -1 && !(e.inArray(n, r) > -1 && !e(o).is(":focus"))
            },
            P = function () {
                var t,
                    o = e(this),
                    n = o.data(a),
                    i = a + "_" + n.idx,
                    r = e("#mCSB_" + n.idx + "_container"),
                    l = r.parent(),
                    s = e(".mCSB_" + n.idx + "_scrollbar ." + d[12]);
                s.bind("mousedown." + i + " touchstart." + i + " pointerdown." + i + " MSPointerDown." + i, function (o) {
                    c = !0, e(o.target).hasClass("mCSB_dragger") || (t = 1)
                }).bind("touchend." + i + " pointerup." + i + " MSPointerUp." + i, function () {
                    c = !1
                }).bind("click." + i, function (a) {
                    if (t && (t = 0, e(a.target).hasClass(d[12]) || e(a.target).hasClass("mCSB_draggerRail"))) {
                        Q(o);
                        var i = e(this),
                            s = i.find(".mCSB_dragger");
                        if (i.parent(".mCSB_scrollTools_horizontal").length > 0) {
                            if (!n.overflowed[1]) return;
                            var c = "x",
                                u = a.pageX > s.offset().left ? -1 : 1,
                                f = Math.abs(r[0].offsetLeft) - u * (.9 * l.width())
                        } else {
                            if (!n.overflowed[0]) return;
                            var c = "y",
                                u = a.pageY > s.offset().top ? -1 : 1,
                                f = Math.abs(r[0].offsetTop) - u * (.9 * l.height())
                        }
                        G(o, f.toString(), {
                            dir: c,
                            scrollEasing: "mcsEaseInOut"
                        })
                    }
                })
            },
            H = function () {
                var t = e(this),
                    o = t.data(a),
                    n = o.opt,
                    i = a + "_" + o.idx,
                    r = e("#mCSB_" + o.idx + "_container"),
                    l = r.parent();
                r.bind("focusin." + i, function () {
                    var o = e(document.activeElement),
                        a = r.find(".mCustomScrollBox").length,
                        i = 0;
                    o.is(n.advanced.autoScrollOnFocus) && (Q(t), clearTimeout(t[0]._focusTimeout), t[0]._focusTimer = a ? (i + 17) * a : 0, t[0]._focusTimeout = setTimeout(function () {
                        var e = [ae(o)[0], ae(o)[1]],
                            a = [r[0].offsetTop, r[0].offsetLeft],
                            s = [a[0] + e[0] >= 0 && a[0] + e[0] < l.height() - o.outerHeight(!1), a[1] + e[1] >= 0 && a[0] + e[1] < l.width() - o.outerWidth(!1)],
                            c = "yx" !== n.axis || s[0] || s[1] ? "all" : "none";
                        "x" === n.axis || s[0] || G(t, e[0].toString(), {
                            dir: "y",
                            scrollEasing: "mcsEaseInOut",
                            overwrite: c,
                            dur: i
                        }), "y" === n.axis || s[1] || G(t, e[1].toString(), {
                            dir: "x",
                            scrollEasing: "mcsEaseInOut",
                            overwrite: c,
                            dur: i
                        })
                    }, t[0]._focusTimer))
                })
            },
            U = function () {
                var t = e(this),
                    o = t.data(a),
                    n = a + "_" + o.idx,
                    i = e("#mCSB_" + o.idx + "_container").parent();
                i.bind("scroll." + n, function () {
                    0 === i.scrollTop() && 0 === i.scrollLeft() || e(".mCSB_" + o.idx + "_scrollbar").css("visibility", "hidden")
                })
            },
            F = function () {
                var t = e(this),
                    o = t.data(a),
                    n = o.opt,
                    i = o.sequential,
                    r = a + "_" + o.idx,
                    l = ".mCSB_" + o.idx + "_scrollbar",
                    s = e(l + ">a");
                s.bind("contextmenu." + r, function (e) {
                    e.preventDefault()
                }).bind("mousedown." + r + " touchstart." + r + " pointerdown." + r + " MSPointerDown." + r + " mouseup." + r + " touchend." + r + " pointerup." + r + " MSPointerUp." + r + " mouseout." + r + " pointerout." + r + " MSPointerOut." + r + " click." + r, function (a) {
                    function r(e, o) {
                        i.scrollAmount = n.scrollButtons.scrollAmount, j(t, e, o)
                    }

                    if (a.preventDefault(), ee(a)) {
                        var l = e(this).attr("class");
                        switch (i.type = n.scrollButtons.scrollType, a.type) {
                            case "mousedown":
                            case "touchstart":
                            case "pointerdown":
                            case "MSPointerDown":
                                if ("stepped" === i.type) return;
                                c = !0, o.tweenRunning = !1, r("on", l);
                                break;
                            case "mouseup":
                            case "touchend":
                            case "pointerup":
                            case "MSPointerUp":
                            case "mouseout":
                            case "pointerout":
                            case "MSPointerOut":
                                if ("stepped" === i.type) return;
                                c = !1, i.dir && r("off", l);
                                break;
                            case "click":
                                if ("stepped" !== i.type || o.tweenRunning) return;
                                r("on", l)
                        }
                    }
                })
            },
            q = function () {
                function t(t) {
                    function a(e, t) {
                        r.type = i.keyboard.scrollType, r.scrollAmount = i.keyboard.scrollAmount, "stepped" === r.type && n.tweenRunning || j(o, e, t)
                    }

                    switch (t.type) {
                        case "blur":
                            n.tweenRunning && r.dir && a("off", null);
                            break;
                        case "keydown":
                        case "keyup":
                            var l = t.keyCode ? t.keyCode : t.which,
                                s = "on";
                            if ("x" !== i.axis && (38 === l || 40 === l) || "y" !== i.axis && (37 === l || 39 === l)) {
                                if ((38 === l || 40 === l) && !n.overflowed[0] || (37 === l || 39 === l) && !n.overflowed[1]) return;
                                "keyup" === t.type && (s = "off"), e(document.activeElement).is(u) || (t.preventDefault(), t.stopImmediatePropagation(), a(s, l))
                            } else if (33 === l || 34 === l) {
                                if ((n.overflowed[0] || n.overflowed[1]) && (t.preventDefault(), t.stopImmediatePropagation()), "keyup" === t.type) {
                                    Q(o);
                                    var f = 34 === l ? -1 : 1;
                                    if ("x" === i.axis || "yx" === i.axis && n.overflowed[1] && !n.overflowed[0]) var h = "x",
                                        m = Math.abs(c[0].offsetLeft) - f * (.9 * d.width());
                                    else var h = "y",
                                        m = Math.abs(c[0].offsetTop) - f * (.9 * d.height());
                                    G(o, m.toString(), {
                                        dir: h,
                                        scrollEasing: "mcsEaseInOut"
                                    })
                                }
                            } else if ((35 === l || 36 === l) && !e(document.activeElement).is(u) && ((n.overflowed[0] || n.overflowed[1]) && (t.preventDefault(), t.stopImmediatePropagation()), "keyup" === t.type)) {
                                if ("x" === i.axis || "yx" === i.axis && n.overflowed[1] && !n.overflowed[0]) var h = "x",
                                    m = 35 === l ? Math.abs(d.width() - c.outerWidth(!1)) : 0;
                                else var h = "y",
                                    m = 35 === l ? Math.abs(d.height() - c.outerHeight(!1)) : 0;
                                G(o, m.toString(), {
                                    dir: h,
                                    scrollEasing: "mcsEaseInOut"
                                })
                            }
                    }
                }

                var o = e(this),
                    n = o.data(a),
                    i = n.opt,
                    r = n.sequential,
                    l = a + "_" + n.idx,
                    s = e("#mCSB_" + n.idx),
                    c = e("#mCSB_" + n.idx + "_container"),
                    d = c.parent(),
                    u = "input,textarea,select,datalist,keygen,[contenteditable='true']",
                    f = c.find("iframe"),
                    h = ["blur." + l + " keydown." + l + " keyup." + l];
                f.length && f.each(function () {
                    e(this).bind("load", function () {
                        A(this) && e(this.contentDocument || this.contentWindow.document).bind(h[0], function (e) {
                            t(e)
                        })
                    })
                }), s.attr("tabindex", "0").bind(h[0], function (e) {
                    t(e)
                })
            },
            j = function (t, o, n, i, r) {
                function l(e) {
                    u.snapAmount && (f.scrollAmount = u.snapAmount instanceof Array ? "x" === f.dir[0] ? u.snapAmount[1] : u.snapAmount[0] : u.snapAmount);
                    var o = "stepped" !== f.type,
                        a = r ? r : e ? o ? p / 1.5 : g : 1e3 / 60,
                        n = e ? o ? 7.5 : 40 : 2.5,
                        s = [Math.abs(h[0].offsetTop), Math.abs(h[0].offsetLeft)],
                        d = [c.scrollRatio.y > 10 ? 10 : c.scrollRatio.y, c.scrollRatio.x > 10 ? 10 : c.scrollRatio.x],
                        m = "x" === f.dir[0] ? s[1] + f.dir[1] * (d[1] * n) : s[0] + f.dir[1] * (d[0] * n),
                        v = "x" === f.dir[0] ? s[1] + f.dir[1] * parseInt(f.scrollAmount) : s[0] + f.dir[1] * parseInt(f.scrollAmount),
                        x = "auto" !== f.scrollAmount ? v : m,
                        _ = i ? i : e ? o ? "mcsLinearOut" : "mcsEaseInOut" : "mcsLinear",
                        w = !!e;
                    return e && 17 > a && (x = "x" === f.dir[0] ? s[1] : s[0]), G(t, x.toString(), {
                        dir: f.dir[0],
                        scrollEasing: _,
                        dur: a,
                        onComplete: w
                    }), e ? void (f.dir = !1) : (clearTimeout(f.step), void (f.step = setTimeout(function () {
                        l()
                    }, a)))
                }

                function s() {
                    clearTimeout(f.step), $(f, "step"), Q(t)
                }

                var c = t.data(a),
                    u = c.opt,
                    f = c.sequential,
                    h = e("#mCSB_" + c.idx + "_container"),
                    m = "stepped" === f.type,
                    p = u.scrollInertia < 26 ? 26 : u.scrollInertia,
                    g = u.scrollInertia < 1 ? 17 : u.scrollInertia;
                switch (o) {
                    case "on":
                        if (f.dir = [n === d[16] || n === d[15] || 39 === n || 37 === n ? "x" : "y", n === d[13] || n === d[15] || 38 === n || 37 === n ? -1 : 1], Q(t), oe(n) && "stepped" === f.type) return;
                        l(m);
                        break;
                    case "off":
                        s(), (m || c.tweenRunning && f.dir) && l(!0)
                }
            },
            Y = function (t) {
                var o = e(this).data(a).opt,
                    n = [];
                return "function" == typeof t && (t = t()), t instanceof Array ? n = t.length > 1 ? [t[0], t[1]] : "x" === o.axis ? [null, t[0]] : [t[0], null] : (n[0] = t.y ? t.y : t.x || "x" === o.axis ? null : t, n[1] = t.x ? t.x : t.y || "y" === o.axis ? null : t), "function" == typeof n[0] && (n[0] = n[0]()), "function" == typeof n[1] && (n[1] = n[1]()), n
            },
            X = function (t, o) {
                if (null != t && "undefined" != typeof t) {
                    var n = e(this),
                        i = n.data(a),
                        r = i.opt,
                        l = e("#mCSB_" + i.idx + "_container"),
                        s = l.parent(),
                        c = typeof t;
                    o || (o = "x" === r.axis ? "x" : "y");
                    var d = "x" === o ? l.outerWidth(!1) - s.width() : l.outerHeight(!1) - s.height(),
                        f = "x" === o ? l[0].offsetLeft : l[0].offsetTop,
                        h = "x" === o ? "left" : "top";
                    switch (c) {
                        case "function":
                            return t();
                        case "object":
                            var m = t.jquery ? t : e(t);
                            if (!m.length) return;
                            return "x" === o ? ae(m)[1] : ae(m)[0];
                        case "string":
                        case "number":
                            if (oe(t)) return Math.abs(t);
                            if (-1 !== t.indexOf("%")) return Math.abs(d * parseInt(t) / 100);
                            if (-1 !== t.indexOf("-=")) return Math.abs(f - parseInt(t.split("-=")[1]));
                            if (-1 !== t.indexOf("+=")) {
                                var p = f + parseInt(t.split("+=")[1]);
                                return p >= 0 ? 0 : Math.abs(p)
                            }
                            if (-1 !== t.indexOf("px") && oe(t.split("px")[0])) return Math.abs(t.split("px")[0]);
                            if ("top" === t || "left" === t) return 0;
                            if ("bottom" === t) return Math.abs(s.height() - l.outerHeight(!1));
                            if ("right" === t) return Math.abs(s.width() - l.outerWidth(!1));
                            if ("first" === t || "last" === t) {
                                var m = l.find(":" + t);
                                return "x" === o ? ae(m)[1] : ae(m)[0]
                            }
                            return e(t).length ? "x" === o ? ae(e(t))[1] : ae(e(t))[0] : (l.css(h, t), void u.update.call(null, n[0]))
                    }
                }
            },
            N = function (t) {
                function o() {
                    return clearTimeout(f[0].autoUpdate), 0 === l.parents("html").length ? void (l = null) : void (f[0].autoUpdate = setTimeout(function () {
                        return c.advanced.updateOnSelectorChange && (s.poll.change.n = i(), s.poll.change.n !== s.poll.change.o) ? (s.poll.change.o = s.poll.change.n, void r(3)) : c.advanced.updateOnContentResize && (s.poll.size.n = l[0].scrollHeight + l[0].scrollWidth + f[0].offsetHeight + l[0].offsetHeight + l[0].offsetWidth, s.poll.size.n !== s.poll.size.o) ? (s.poll.size.o = s.poll.size.n, void r(1)) : !c.advanced.updateOnImageLoad || "auto" === c.advanced.updateOnImageLoad && "y" === c.axis || (s.poll.img.n = f.find("img").length, s.poll.img.n === s.poll.img.o) ? void ((c.advanced.updateOnSelectorChange || c.advanced.updateOnContentResize || c.advanced.updateOnImageLoad) && o()) : (s.poll.img.o = s.poll.img.n, void f.find("img").each(function () {
                            n(this)
                        }))
                    }, c.advanced.autoUpdateTimeout))
                }

                function n(t) {
                    function o(e, t) {
                        return function () {
                            return t.apply(e, arguments)
                        }
                    }

                    function a() {
                        this.onload = null, e(t).addClass(d[2]), r(2)
                    }

                    if (e(t).hasClass(d[2])) return void r();
                    var n = new Image;
                    n.onload = o(n, a), n.src = t.src
                }

                function i() {
                    c.advanced.updateOnSelectorChange === !0 && (c.advanced.updateOnSelectorChange = "*");
                    var e = 0,
                        t = f.find(c.advanced.updateOnSelectorChange);
                    return c.advanced.updateOnSelectorChange && t.length > 0 && t.each(function () {
                        e += this.offsetHeight + this.offsetWidth
                    }), e
                }

                function r(e) {
                    clearTimeout(f[0].autoUpdate), u.update.call(null, l[0], e)
                }

                var l = e(this),
                    s = l.data(a),
                    c = s.opt,
                    f = e("#mCSB_" + s.idx + "_container");
                return t ? (clearTimeout(f[0].autoUpdate), void $(f[0], "autoUpdate")) : void o()
            },
            V = function (e, t, o) {
                return Math.round(e / t) * t - o
            },
            Q = function (t) {
                var o = t.data(a),
                    n = e("#mCSB_" + o.idx + "_container,#mCSB_" + o.idx + "_container_wrapper,#mCSB_" + o.idx + "_dragger_vertical,#mCSB_" + o.idx + "_dragger_horizontal");
                n.each(function () {
                    Z.call(this)
                })
            },
            G = function (t, o, n) {
                function i(e) {
                    return s && c.callbacks[e] && "function" == typeof c.callbacks[e]
                }

                function r() {
                    return [c.callbacks.alwaysTriggerOffsets || w >= S[0] + y, c.callbacks.alwaysTriggerOffsets || -B >= w]
                }

                function l() {
                    var e = [h[0].offsetTop, h[0].offsetLeft],
                        o = [x[0].offsetTop, x[0].offsetLeft],
                        a = [h.outerHeight(!1), h.outerWidth(!1)],
                        i = [f.height(), f.width()];
                    t[0].mcs = {
                        content: h,
                        top: e[0],
                        left: e[1],
                        draggerTop: o[0],
                        draggerLeft: o[1],
                        topPct: Math.round(100 * Math.abs(e[0]) / (Math.abs(a[0]) - i[0])),
                        leftPct: Math.round(100 * Math.abs(e[1]) / (Math.abs(a[1]) - i[1])),
                        direction: n.dir
                    }
                }

                var s = t.data(a),
                    c = s.opt,
                    d = {
                        trigger: "internal",
                        dir: "y",
                        scrollEasing: "mcsEaseOut",
                        drag: !1,
                        dur: c.scrollInertia,
                        overwrite: "all",
                        callbacks: !0,
                        onStart: !0,
                        onUpdate: !0,
                        onComplete: !0
                    },
                    n = e.extend(d, n),
                    u = [n.dur, n.drag ? 0 : n.dur],
                    f = e("#mCSB_" + s.idx),
                    h = e("#mCSB_" + s.idx + "_container"),
                    m = h.parent(),
                    p = c.callbacks.onTotalScrollOffset ? Y.call(t, c.callbacks.onTotalScrollOffset) : [0, 0],
                    g = c.callbacks.onTotalScrollBackOffset ? Y.call(t, c.callbacks.onTotalScrollBackOffset) : [0, 0];
                if (s.trigger = n.trigger, 0 === m.scrollTop() && 0 === m.scrollLeft() || (e(".mCSB_" + s.idx + "_scrollbar").css("visibility", "visible"), m.scrollTop(0).scrollLeft(0)), "_resetY" !== o || s.contentReset.y || (i("onOverflowYNone") && c.callbacks.onOverflowYNone.call(t[0]), s.contentReset.y = 1), "_resetX" !== o || s.contentReset.x || (i("onOverflowXNone") && c.callbacks.onOverflowXNone.call(t[0]), s.contentReset.x = 1), "_resetY" !== o && "_resetX" !== o) {
                    if (!s.contentReset.y && t[0].mcs || !s.overflowed[0] || (i("onOverflowY") && c.callbacks.onOverflowY.call(t[0]), s.contentReset.x = null), !s.contentReset.x && t[0].mcs || !s.overflowed[1] || (i("onOverflowX") && c.callbacks.onOverflowX.call(t[0]), s.contentReset.x = null), c.snapAmount) {
                        var v = c.snapAmount instanceof Array ? "x" === n.dir ? c.snapAmount[1] : c.snapAmount[0] : c.snapAmount;
                        o = V(o, v, c.snapOffset)
                    }
                    switch (n.dir) {
                        case "x":
                            var x = e("#mCSB_" + s.idx + "_dragger_horizontal"),
                                _ = "left",
                                w = h[0].offsetLeft,
                                S = [f.width() - h.outerWidth(!1), x.parent().width() - x.width()],
                                b = [o, 0 === o ? 0 : o / s.scrollRatio.x],
                                y = p[1],
                                B = g[1],
                                T = y > 0 ? y / s.scrollRatio.x : 0,
                                k = B > 0 ? B / s.scrollRatio.x : 0;
                            break;
                        case "y":
                            var x = e("#mCSB_" + s.idx + "_dragger_vertical"),
                                _ = "top",
                                w = h[0].offsetTop,
                                S = [f.height() - h.outerHeight(!1), x.parent().height() - x.height()],
                                b = [o, 0 === o ? 0 : o / s.scrollRatio.y],
                                y = p[0],
                                B = g[0],
                                T = y > 0 ? y / s.scrollRatio.y : 0,
                                k = B > 0 ? B / s.scrollRatio.y : 0
                    }
                    b[1] < 0 || 0 === b[0] && 0 === b[1] ? b = [0, 0] : b[1] >= S[1] ? b = [S[0], S[1]] : b[0] = -b[0], t[0].mcs || (l(), i("onInit") && c.callbacks.onInit.call(t[0])), clearTimeout(h[0].onCompleteTimeout), J(x[0], _, Math.round(b[1]), u[1], n.scrollEasing), !s.tweenRunning && (0 === w && b[0] >= 0 || w === S[0] && b[0] <= S[0]) || J(h[0], _, Math.round(b[0]), u[0], n.scrollEasing, n.overwrite, {
                        onStart: function () {
                            n.callbacks && n.onStart && !s.tweenRunning && (i("onScrollStart") && (l(), c.callbacks.onScrollStart.call(t[0])), s.tweenRunning = !0, C(x), s.cbOffsets = r())
                        },
                        onUpdate: function () {
                            n.callbacks && n.onUpdate && i("whileScrolling") && (l(), c.callbacks.whileScrolling.call(t[0]))
                        },
                        onComplete: function () {
                            if (n.callbacks && n.onComplete) {
                                "yx" === c.axis && clearTimeout(h[0].onCompleteTimeout);
                                var e = h[0].idleTimer || 0;
                                h[0].onCompleteTimeout = setTimeout(function () {
                                    i("onScroll") && (l(), c.callbacks.onScroll.call(t[0])), i("onTotalScroll") && b[1] >= S[1] - T && s.cbOffsets[0] && (l(), c.callbacks.onTotalScroll.call(t[0])), i("onTotalScrollBack") && b[1] <= k && s.cbOffsets[1] && (l(), c.callbacks.onTotalScrollBack.call(t[0])), s.tweenRunning = !1, h[0].idleTimer = 0, C(x, "hide")
                                }, e)
                            }
                        }
                    })
                }
            },
            J = function (e, t, o, a, n, i, r) {
                function l() {
                    S.stop || (x || m.call(), x = K() - v, s(), x >= S.time && (S.time = x > S.time ? x + f - (x - S.time) : x + f - 1, S.time < x + 1 && (S.time = x + 1)), S.time < a ? S.id = h(l) : g.call())
                }

                function s() {
                    a > 0 ? (S.currVal = u(S.time, _, b, a, n), w[t] = Math.round(S.currVal) + "px") : w[t] = o + "px", p.call()
                }

                function c() {
                    f = 1e3 / 60, S.time = x + f, h = window.requestAnimationFrame ? window.requestAnimationFrame : function (e) {
                        return s(), setTimeout(e, .01)
                    }, S.id = h(l)
                }

                function d() {
                    null != S.id && (window.requestAnimationFrame ? window.cancelAnimationFrame(S.id) : clearTimeout(S.id), S.id = null)
                }

                function u(e, t, o, a, n) {
                    switch (n) {
                        case "linear":
                        case "mcsLinear":
                            return o * e / a + t;
                        case "mcsLinearOut":
                            return e /= a, e--, o * Math.sqrt(1 - e * e) + t;
                        case "easeInOutSmooth":
                            return e /= a / 2, 1 > e ? o / 2 * e * e + t : (e--, -o / 2 * (e * (e - 2) - 1) + t);
                        case "easeInOutStrong":
                            return e /= a / 2, 1 > e ? o / 2 * Math.pow(2, 10 * (e - 1)) + t : (e--, o / 2 * (-Math.pow(2, -10 * e) + 2) + t);
                        case "easeInOut":
                        case "mcsEaseInOut":
                            return e /= a / 2, 1 > e ? o / 2 * e * e * e + t : (e -= 2, o / 2 * (e * e * e + 2) + t);
                        case "easeOutSmooth":
                            return e /= a, e--, -o * (e * e * e * e - 1) + t;
                        case "easeOutStrong":
                            return o * (-Math.pow(2, -10 * e / a) + 1) + t;
                        case "easeOut":
                        case "mcsEaseOut":
                        default:
                            var i = (e /= a) * e,
                                r = i * e;
                            return t + o * (.499999999999997 * r * i + -2.5 * i * i + 5.5 * r + -6.5 * i + 4 * e)
                    }
                }

                e._mTween || (e._mTween = {
                    top: {},
                    left: {}
                });
                var f,
                    h,
                    r = r || {},
                    m = r.onStart || function () {
                    },
                    p = r.onUpdate || function () {
                    },
                    g = r.onComplete || function () {
                    },
                    v = K(),
                    x = 0,
                    _ = e.offsetTop,
                    w = e.style,
                    S = e._mTween[t];
                "left" === t && (_ = e.offsetLeft);
                var b = o - _;
                S.stop = 0, "none" !== i && d(), c()
            },
            K = function () {
                return window.performance && window.performance.now ? window.performance.now() : window.performance && window.performance.webkitNow ? window.performance.webkitNow() : Date.now ? Date.now() : (new Date).getTime()
            },
            Z = function () {
                var e = this;
                e._mTween || (e._mTween = {
                    top: {},
                    left: {}
                });
                for (var t = ["top", "left"], o = 0; o < t.length; o++) {
                    var a = t[o];
                    e._mTween[a].id && (window.requestAnimationFrame ? window.cancelAnimationFrame(e._mTween[a].id) : clearTimeout(e._mTween[a].id), e._mTween[a].id = null, e._mTween[a].stop = 1)
                }
            },
            $ = function (e, t) {
                try {
                    delete e[t]
                } catch (o) {
                    e[t] = null
                }
            },
            ee = function (e) {
                return !(e.which && 1 !== e.which)
            },
            te = function (e) {
                var t = e.originalEvent.pointerType;
                return !(t && "touch" !== t && 2 !== t)
            },
            oe = function (e) {
                return !isNaN(parseFloat(e)) && isFinite(e)
            },
            ae = function (e) {
                var t = e.parents(".mCSB_container");
                return [e.offset().top - t.offset().top, e.offset().left - t.offset().left]
            },
            ne = function () {
                function e() {
                    var e = ["webkit", "moz", "ms", "o"];
                    if ("hidden" in document) return "hidden";
                    for (var t = 0; t < e.length; t++)
                        if (e[t] + "Hidden" in document) return e[t] + "Hidden";
                    return null
                }

                var t = e();
                return t ? document[t] : !1
            };
        e.fn[o] = function (t) {
            return u[t] ? u[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist") : u.init.apply(this, arguments)
        }, e[o] = function (t) {
            return u[t] ? u[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist") : u.init.apply(this, arguments)
        }, e[o].defaults = i, window[o] = !0, e(window).bind("load", function () {
            e(n)[o](), e.extend(e.expr[":"], {
                mcsInView: e.expr[":"].mcsInView || function (t) {
                    var o,
                        a,
                        n = e(t),
                        i = n.parents(".mCSB_container");
                    if (i.length) return o = i.parent(), a = [i[0].offsetTop, i[0].offsetLeft], a[0] + ae(n)[0] >= 0 && a[0] + ae(n)[0] < o.height() - n.outerHeight(!1) && a[1] + ae(n)[1] >= 0 && a[1] + ae(n)[1] < o.width() - n.outerWidth(!1)
                },
                mcsInSight: e.expr[":"].mcsInSight || function (t, o, a) {
                    var n,
                        i,
                        r,
                        l,
                        s = e(t),
                        c = s.parents(".mCSB_container"),
                        d = "exact" === a[3] ? [[1, 0], [1, 0]] : [[.9, .1], [.6, .4]];
                    if (c.length) return n = [s.outerHeight(!1), s.outerWidth(!1)], r = [c[0].offsetTop + ae(s)[0], c[0].offsetLeft + ae(s)[1]], i = [c.parent()[0].offsetHeight, c.parent()[0].offsetWidth], l = [n[0] < i[0] ? d[0] : d[1], n[1] < i[1] ? d[0] : d[1]], r[0] - i[0] * l[0][0] < 0 && r[0] + n[0] - i[0] * l[0][1] >= 0 && r[1] - i[1] * l[1][0] < 0 && r[1] + n[1] - i[1] * l[1][1] >= 0
                },
                mcsOverflow: e.expr[":"].mcsOverflow || function (t) {
                    var o = e(t).data(a);
                    if (o) return o.overflowed[0] || o.overflowed[1]
                }
            })
        })
    })
});

/*!
   --------------------------------
   Infinite Scroll
   --------------------------------
   + https://github.com/paulirish/infinite-scroll
   + version 2.1.0
   + Copyright 2011/12 Paul Irish & Luke Shumard
   + Licensed under the MIT license
   + Documentation: http://infinite-scroll.com/
*/
;(function (e) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], e)
    } else {
        e(jQuery)
    }
})(function (e, t) {
    "use strict";
    e.infinitescroll = function (n, r, i) {
        this.element = e(i);
        if (!this._create(n, r)) {
            this.failed = true
        }
    };
    e.infinitescroll.defaults = {
        loading: {
            finished: t,
            finishedMsg: "<em>Congratulations, you've reached the end of the internet.</em>",
            img: "",
            msg: null,
            msgText: "<em>Loading the next set of posts...</em>",
            selector: null,
            speed: "fast",
            start: t
        },
        state: {
            isDuringAjax: false,
            isInvalidPage: false,
            isDestroyed: false,
            isDone: false,
            isPaused: false,
            isBeyondMaxPage: false,
            currPage: 1
        },
        debug: false,
        behavior: t,
        binder: e(window),
        nextSelector: "div.navigation a:first",
        navSelector: "div.navigation",
        contentSelector: null,
        extraScrollPx: 150,
        itemSelector: "div.post",
        animate: false,
        pathParse: t,
        dataType: "html",
        appendCallback: true,
        bufferPx: 40,
        errorCallback: function () {
        },
        infid: 0,
        pixelsFromNavToBottom: t,
        path: t,
        prefill: false,
        maxPage: t
    };
    e.infinitescroll.prototype = {
        _binding: function (n) {
            var r = this,
                i = r.options;
            i.v = "2.0b2.120520";
            if (!!i.behavior && this["_binding_" + i.behavior] !== t) {
                this["_binding_" + i.behavior].call(this);
                return
            }
            if (n !== "bind" && n !== "unbind") {
                this._debug("Binding value  " + n + " not valid");
                return false
            }
            if (n === "unbind") {
                this.options.binder.unbind("smartscroll.infscr." + r.options.infid)
            } else {
                this.options.binder[n]("smartscroll.infscr." + r.options.infid, function () {
                    r.scroll()
                })
            }
            this._debug("Binding", n)
        },
        _create: function (r, i) {
            var s = e.extend(true, {}, e.infinitescroll.defaults, r);
            this.options = s;
            var o = e(window);
            var u = this;
            if (!u._validate(r)) {
                return false
            }
            var a = e(s.nextSelector).attr("href");
            if (!a) {
                this._debug("Navigation selector not found");
                return false
            }
            s.path = s.path || this._determinepath(a);
            s.contentSelector = s.contentSelector || this.element;
            s.loading.selector = s.loading.selector || s.contentSelector;
            s.loading.msg = s.loading.msg || e('<div id="infscr-loading"><img alt="Loading..." src="' + s.loading.img + '" /><div>' + s.loading.msgText + "</div></div>");
            (new Image).src = s.loading.img;
            if (s.pixelsFromNavToBottom === t) {
                s.pixelsFromNavToBottom = e(document).height() - e(s.navSelector).offset().top;
                this._debug("pixelsFromNavToBottom: " + s.pixelsFromNavToBottom)
            }
            var f = this;
            s.loading.start = s.loading.start || function () {
                e(s.navSelector).hide();
                s.loading.msg.insertAfter(s.loading.selector).show(s.loading.speed, e.proxy(function () {
                    this.beginAjax(s)
                }, f))
            };
            s.loading.finished = s.loading.finished || function () {
                if (!s.state.isBeyondMaxPage) s.loading.msg.fadeOut(s.loading.speed)
            };
            s.callback = function (n, r, u) {
                if (!!s.behavior && n["_callback_" + s.behavior] !== t) {
                    n["_callback_" + s.behavior].call(e(s.contentSelector)[0], r, u)
                }
                if (i) {
                    i.call(e(s.contentSelector)[0], r, s, u)
                }
                if (s.prefill) {
                    o.bind("resize.infinite-scroll", n._prefill)
                }
            };
            if (r.debug) {
                if (Function.prototype.bind && (typeof console === "object" || typeof console === "function") && typeof console.log === "object") {
                    ["log", "info", "warn", "error", "assert", "dir", "clear", "profile", "profileEnd"].forEach(function (e) {
                        console[e] = this.call(console[e], console)
                    }, Function.prototype.bind)
                }
            }
            this._setup();
            if (s.prefill) {
                this._prefill()
            }
            return true
        },
        _prefill: function () {
            function i() {
                return e(n.options.contentSelector).height() <= r.height()
            }

            var n = this;
            var r = e(window);
            this._prefill = function () {
                if (i()) {
                    n.scroll()
                }
                r.bind("resize.infinite-scroll", function () {
                    if (i()) {
                        r.unbind("resize.infinite-scroll");
                        n.scroll()
                    }
                })
            };
            this._prefill()
        },
        _debug: function () {
            if (true !== this.options.debug) {
                return
            }
            if (typeof console !== "undefined" && typeof console.log === "function") {
                if (Array.prototype.slice.call(arguments).length === 1 && typeof Array.prototype.slice.call(arguments)[0] === "string") {
                    console.log(Array.prototype.slice.call(arguments).toString())
                } else {
                    console.log(Array.prototype.slice.call(arguments))
                }
            } else if (!Function.prototype.bind && typeof console !== "undefined" && typeof console.log === "object") {
                Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments))
            }
        },
        _determinepath: function (n) {
            var r = this.options;
            if (!!r.behavior && this["_determinepath_" + r.behavior] !== t) {
                return this["_determinepath_" + r.behavior].call(this, n)
            }
            if (!!r.pathParse) {
                this._debug("pathParse manual");
                return r.pathParse(n, this.options.state.currPage + 1)
            } else if (n.match(/^(.*?)\b2\b(.*?$)/)) {
                n = n.match(/^(.*?)\b2\b(.*?$)/).slice(1)
            } else if (n.match(/^(.*?)2(.*?$)/)) {
                if (n.match(/^(.*?page=)2(\/.*|$)/)) {
                    n = n.match(/^(.*?page=)2(\/.*|$)/).slice(1);
                    return n
                }
                n = n.match(/^(.*?)2(.*?$)/).slice(1)
            } else {
                if (n.match(/^(.*?page=)1(\/.*|$)/)) {
                    n = n.match(/^(.*?page=)1(\/.*|$)/).slice(1);
                    return n
                } else {
                    this._debug("Sorry, we couldn't parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com.");
                    r.state.isInvalidPage = true
                }
            }
            this._debug("determinePath", n);
            return n
        },
        _error: function (n) {
            var r = this.options;
            if (!!r.behavior && this["_error_" + r.behavior] !== t) {
                this["_error_" + r.behavior].call(this, n);
                return
            }
            if (n !== "destroy" && n !== "end") {
                n = "unknown"
            }
            this._debug("Error", n);
            if (n === "end" || r.state.isBeyondMaxPage) {
                this._showdonemsg()
            }
            r.state.isDone = true;
            r.state.currPage = 1;
            r.state.isPaused = false;
            r.state.isBeyondMaxPage = false;
            this._binding("unbind")
        },
        _loadcallback: function (r, i, s) {
            var o = this.options,
                u = this.options.callback,
                a = o.state.isDone ? "done" : !o.appendCallback ? "no-append" : "append",
                f;
            if (!!o.behavior && this["_loadcallback_" + o.behavior] !== t) {
                this["_loadcallback_" + o.behavior].call(this, r, i);
                return
            }
            switch (a) {
                case "done":
                    this._showdonemsg();
                    return false;
                case "no-append":
                    if (o.dataType === "html") {
                        i = "<div>" + i + "</div>";
                        i = e(i).find(o.itemSelector)
                    }
                    if (i.length === 0) {
                        return this._error("end")
                    }
                    break;
                case "append":
                    var l = r.children();
                    if (l.length === 0) {
                        return this._error("end")
                    }
                    f = document.createDocumentFragment();
                    while (r[0].firstChild) {
                        f.appendChild(r[0].firstChild)
                    }
                    this._debug("contentSelector", e(o.contentSelector)[0]);
                    e(o.contentSelector)[0].appendChild(f);
                    i = l.get();
                    break
            }
            o.loading.finished.call(e(o.contentSelector)[0], o);
            if (o.animate) {
                var c = e(window).scrollTop() + e(o.loading.msg).height() + o.extraScrollPx + "px";
                e("html,body").animate({
                    scrollTop: c
                }, 800, function () {
                    o.state.isDuringAjax = false
                })
            }
            if (!o.animate) {
                o.state.isDuringAjax = false
            }
            u(this, i, s);
            if (o.prefill) {
                this._prefill()
            }
        },
        _nearbottom: function () {
            var r = this.options,
                i = 0 + e(document).height() - r.binder.scrollTop() - e(window).height();
            if (!!r.behavior && this["_nearbottom_" + r.behavior] !== t) {
                return this["_nearbottom_" + r.behavior].call(this)
            }
            this._debug("math:", i, r.pixelsFromNavToBottom);
            return i - r.bufferPx < r.pixelsFromNavToBottom
        },
        _pausing: function (n) {
            var r = this.options;
            if (!!r.behavior && this["_pausing_" + r.behavior] !== t) {
                this["_pausing_" + r.behavior].call(this, n);
                return
            }
            if (n !== "pause" && n !== "resume" && n !== null) {
                this._debug("Invalid argument. Toggling pause value instead")
            }
            n = n && (n === "pause" || n === "resume") ? n : "toggle";
            switch (n) {
                case "pause":
                    r.state.isPaused = true;
                    break;
                case "resume":
                    r.state.isPaused = false;
                    break;
                case "toggle":
                    r.state.isPaused = !r.state.isPaused;
                    break
            }
            this._debug("Paused", r.state.isPaused);
            return false
        },
        _setup: function () {
            var n = this.options;
            if (!!n.behavior && this["_setup_" + n.behavior] !== t) {
                this["_setup_" + n.behavior].call(this);
                return
            }
            this._binding("bind");
            return false
        },
        _showdonemsg: function () {
            var r = this.options;
            if (!!r.behavior && this["_showdonemsg_" + r.behavior] !== t) {
                this["_showdonemsg_" + r.behavior].call(this);
                return
            }
            r.loading.msg.find("img").hide().parent().find("div").html(r.loading.finishedMsg).animate({
                opacity: 1
            }, 2e3, function () {
                e(this).parent().fadeOut(r.loading.speed)
            });
            r.errorCallback.call(e(r.contentSelector)[0], "done")
        },
        _validate: function (n) {
            for (var r in n) {
                if (r.indexOf && r.indexOf("Selector") > -1 && e(n[r]).length === 0) {
                    this._debug("Your " + r + " found no elements.");
                    return false
                }
            }
            return true
        },
        bind: function () {
            this._binding("bind")
        },
        destroy: function () {
            this.options.state.isDestroyed = true;
            this.options.loading.finished();
            return this._error("destroy")
        },
        pause: function () {
            this._pausing("pause")
        },
        resume: function () {
            this._pausing("resume")
        },
        beginAjax: function (r) {
            var i = this,
                s = r.path,
                o,
                u,
                a,
                f;
            r.state.currPage++;
            if (r.maxPage !== t && r.state.currPage > r.maxPage) {
                r.state.isBeyondMaxPage = true;
                this.destroy();
                return
            }
            o = e(r.contentSelector).is("table, tbody") ? e("<tbody/>") : e("<div/>");
            u = typeof s === "function" ? s(r.state.currPage) : s.join(r.state.currPage);
            i._debug("heading into ajax", u);
            a = r.dataType === "html" || r.dataType === "json" ? r.dataType : "html+callback";
            if (r.appendCallback && r.dataType === "html") {
                a += "+callback"
            }
            switch (a) {
                case "html+callback":
                    i._debug("Using HTML via .load() method");
                    o.load(u + " " + r.itemSelector, t, function (t) {
                        i._loadcallback(o, t, u)
                    });
                    break;
                case "html":
                    i._debug("Using " + a.toUpperCase() + " via $.ajax() method");
                    e.ajax({
                        url: u,
                        dataType: r.dataType,
                        complete: function (t, n) {
                            f = typeof t.isResolved !== "undefined" ? t.isResolved() : n === "success" || n === "notmodified";
                            if (f) {
                                i._loadcallback(o, t.responseText, u)
                            } else {
                                i._error("end")
                            }
                        }
                    });
                    break;
                case "json":
                    i._debug("Using " + a.toUpperCase() + " via $.ajax() method");
                    e.ajax({
                        dataType: "json",
                        type: "GET",
                        url: u,
                        success: function (e, n, s) {
                            f = typeof s.isResolved !== "undefined" ? s.isResolved() : n === "success" || n === "notmodified";
                            if (r.appendCallback) {
                                if (r.template !== t) {
                                    var a = r.template(e);
                                    o.append(a);
                                    if (f) {
                                        i._loadcallback(o, a)
                                    } else {
                                        i._error("end")
                                    }
                                } else {
                                    i._debug("template must be defined.");
                                    i._error("end")
                                }
                            } else {
                                if (f) {
                                    i._loadcallback(o, e, u)
                                } else {
                                    i._error("end")
                                }
                            }
                        },
                        error: function () {
                            i._debug("JSON ajax request failed.");
                            i._error("end")
                        }
                    });
                    break
            }
        },
        retrieve: function (r) {
            r = r || null;
            var i = this,
                s = i.options;
            if (!!s.behavior && this["retrieve_" + s.behavior] !== t) {
                this["retrieve_" + s.behavior].call(this, r);
                return
            }
            if (s.state.isDestroyed) {
                this._debug("Instance is destroyed");
                return false
            }
            s.state.isDuringAjax = true;
            s.loading.start.call(e(s.contentSelector)[0], s)
        },
        scroll: function () {
            var n = this.options,
                r = n.state;
            if (!!n.behavior && this["scroll_" + n.behavior] !== t) {
                this["scroll_" + n.behavior].call(this);
                return
            }
            if (r.isDuringAjax || r.isInvalidPage || r.isDone || r.isDestroyed || r.isPaused) {
                return
            }
            if (!this._nearbottom()) {
                return
            }
            this.retrieve()
        },
        toggle: function () {
            this._pausing()
        },
        unbind: function () {
            this._binding("unbind")
        },
        update: function (n) {
            if (e.isPlainObject(n)) {
                this.options = e.extend(true, this.options, n)
            }
        }
    };
    e.fn.infinitescroll = function (n, r) {
        var i = typeof n;
        switch (i) {
            case "string":
                var s = Array.prototype.slice.call(arguments, 1);
                this.each(function () {
                    var t = e.data(this, "infinitescroll");
                    if (!t) {
                        return false
                    }
                    if (!e.isFunction(t[n]) || n.charAt(0) === "_") {
                        return false
                    }
                    t[n].apply(t, s)
                });
                break;
            case "object":
                this.each(function () {
                    var t = e.data(this, "infinitescroll");
                    if (t) {
                        t.update(n)
                    } else {
                        t = new e.infinitescroll(n, r, this);
                        if (!t.failed) {
                            e.data(this, "infinitescroll", t)
                        }
                    }
                });
                break
        }
        return this
    };
    var n = e.event,
        r;
    n.special.smartscroll = {
        setup: function () {
            e(this).bind("scroll", n.special.smartscroll.handler)
        },
        teardown: function () {
            e(this).unbind("scroll", n.special.smartscroll.handler)
        },
        handler: function (t, n) {
            var i = this,
                s = arguments;
            t.type = "smartscroll";
            if (r) {
                clearTimeout(r)
            }
            r = setTimeout(function () {
                e(i).trigger("smartscroll", s)
            }, n === "execAsap" ? 0 : 100)
        }
    };
    e.fn.smartscroll = function (e) {
        return e ? this.bind("smartscroll", e) : this.trigger("smartscroll", ["execAsap"])
    }
});


//start
$(document).ready(function () {

    if ($(".pages").length != 0) {

        var $infinitescroll = $(".ipages").infinitescroll({
                loading: {
                    finishedMsg: "木有了！",
                    img: null,
                    msgText: "载入中"
                },
                nextSelector: ".pages a:last",
                navSelector: ".pages",
                contentSelector: ".ipages",
                itemSelector: ".ipage",
                extraScrollPx: 150,
                bufferPx: 30,
                pixelsFromNavToBottom: 100,
                debug: false,
                path: $(".pages a:last").attr("href").match(/^(.*?_)2(.*?$)/).slice(1),
                appendCallback: true
            },
            function (newElements) {
                if ($("body.content #content").length > 0) {
                    $(newElements).find("img").each(function () {
                        $(this).wrap('<div class="poster img"></div>');
                        $(this).parent(".poster").attr("data-original", $(this).attr("src"));
                    });
                }

                $(newElements).find(".poster,.lazyload").lazyload({
                    //placeholder:"http://www.mvcat.com/img/loading_cat.gif",
                    //effect:"fadeIn",
                    event: "scroll mousemove mouseover touchstart"
                });

                $(newElements).find(".tooltip").tooltip();

                moviefinder($(newElements));
                movielite();

                //playbutton($(newElements).find(".poster[data-video],.poster[data-video-title]"));

            })
    }


    /* jquery.nicescroll v3.7.6 InuYaksa - MIT - https://nicescroll.areaaperta.com */
    !function (e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
    }(function (e) {
        "use strict";
        var o = !1,
            t = !1,
            r = 0,
            i = 2e3,
            s = 0,
            n = e,
            l = document,
            a = window,
            c = n(a),
            d = [],
            u = a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || !1,
            h = a.cancelAnimationFrame || a.webkitCancelAnimationFrame || a.mozCancelAnimationFrame || !1;
        if (u) a.cancelAnimationFrame || (h = function (e) {
        }); else {
            var p = 0;
            u = function (e, o) {
                var t = (new Date).getTime(),
                    r = Math.max(0, 16 - (t - p)),
                    i = a.setTimeout(function () {
                        e(t + r)
                    }, r);
                return p = t + r, i
            }, h = function (e) {
                a.clearTimeout(e)
            }
        }
        var m = a.MutationObserver || a.WebKitMutationObserver || !1,
            f = Date.now || function () {
                return (new Date).getTime()
            },
            g = {
                zindex: "auto",
                cursoropacitymin: 0,
                cursoropacitymax: 1,
                cursorcolor: "#424242",
                cursorwidth: "6px",
                cursorborder: "1px solid #fff",
                cursorborderradius: "5px",
                scrollspeed: 40,
                mousescrollstep: 27,
                touchbehavior: !1,
                emulatetouch: !1,
                hwacceleration: !0,
                usetransition: !0,
                boxzoom: !1,
                dblclickzoom: !0,
                gesturezoom: !0,
                grabcursorenabled: !0,
                autohidemode: !0,
                background: "",
                iframeautoresize: !0,
                cursorminheight: 32,
                preservenativescrolling: !0,
                railoffset: !1,
                railhoffset: !1,
                bouncescroll: !0,
                spacebarenabled: !0,
                railpadding: {
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0
                },
                disableoutline: !0,
                horizrailenabled: !0,
                railalign: "right",
                railvalign: "bottom",
                enabletranslate3d: !0,
                enablemousewheel: !0,
                enablekeyboard: !0,
                smoothscroll: !0,
                sensitiverail: !0,
                enablemouselockapi: !0,
                cursorfixedheight: !1,
                directionlockdeadzone: 6,
                hidecursordelay: 400,
                nativeparentscrolling: !0,
                enablescrollonselection: !0,
                overflowx: !0,
                overflowy: !0,
                cursordragspeed: .3,
                rtlmode: "auto",
                cursordragontouch: !1,
                oneaxismousemode: "auto",
                scriptpath: function () {
                    var e = l.currentScript || function () {
                            var e = l.getElementsByTagName("script");
                            return !!e.length && e[e.length - 1]
                        }(),
                        o = e ? e.src.split("?")[0] : "";
                    return o.split("/").length > 0 ? o.split("/").slice(0, -1).join("/") + "/" : ""
                }(),
                preventmultitouchscrolling: !0,
                disablemutationobserver: !1,
                enableobserver: !0,
                scrollbarid: !1
            },
            v = !1,
            w = function () {
                if (v) return v;
                var e = l.createElement("DIV"),
                    o = e.style,
                    t = navigator.userAgent,
                    r = navigator.platform,
                    i = {};
                return i.haspointerlock = "pointerLockElement" in l || "webkitPointerLockElement" in l || "mozPointerLockElement" in l, i.isopera = "opera" in a, i.isopera12 = i.isopera && "getUserMedia" in navigator, i.isoperamini = "[object OperaMini]" === Object.prototype.toString.call(a.operamini), i.isie = "all" in l && "attachEvent" in e && !i.isopera, i.isieold = i.isie && !("msInterpolationMode" in o), i.isie7 = i.isie && !i.isieold && (!("documentMode" in l) || 7 === l.documentMode), i.isie8 = i.isie && "documentMode" in l && 8 === l.documentMode, i.isie9 = i.isie && "performance" in a && 9 === l.documentMode, i.isie10 = i.isie && "performance" in a && 10 === l.documentMode, i.isie11 = "msRequestFullscreen" in e && l.documentMode >= 11, i.ismsedge = "msCredentials" in a, i.ismozilla = "MozAppearance" in o, i.iswebkit = !i.ismsedge && "WebkitAppearance" in o, i.ischrome = i.iswebkit && "chrome" in a, i.ischrome38 = i.ischrome && "touchAction" in o, i.ischrome22 = !i.ischrome38 && i.ischrome && i.haspointerlock, i.ischrome26 = !i.ischrome38 && i.ischrome && "transition" in o, i.cantouch = "ontouchstart" in l.documentElement || "ontouchstart" in a, i.hasw3ctouch = (a.PointerEvent || !1) && (navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0), i.hasmstouch = !i.hasw3ctouch && (a.MSPointerEvent || !1), i.ismac = /^mac$/i.test(r), i.isios = i.cantouch && /iphone|ipad|ipod/i.test(r), i.isios4 = i.isios && !("seal" in Object), i.isios7 = i.isios && "webkitHidden" in l, i.isios8 = i.isios && "hidden" in l, i.isios10 = i.isios && a.Proxy, i.isandroid = /android/i.test(t), i.haseventlistener = "addEventListener" in e, i.trstyle = !1, i.hastransform = !1, i.hastranslate3d = !1, i.transitionstyle = !1, i.hastransition = !1, i.transitionend = !1, i.trstyle = "transform", i.hastransform = "transform" in o || function () {
                    for (var e = ["msTransform", "webkitTransform", "MozTransform", "OTransform"], t = 0, r = e.length; t < r; t++)
                        if (void 0 !== o[e[t]]) {
                            i.trstyle = e[t];
                            break
                        }
                    i.hastransform = !!i.trstyle
                }(), i.hastransform && (o[i.trstyle] = "translate3d(1px,2px,3px)", i.hastranslate3d = /translate3d/.test(o[i.trstyle])), i.transitionstyle = "transition", i.prefixstyle = "", i.transitionend = "transitionend", i.hastransition = "transition" in o || function () {
                    i.transitionend = !1;
                    for (var e = ["webkitTransition", "msTransition", "MozTransition", "OTransition", "OTransition", "KhtmlTransition"], t = ["-webkit-", "-ms-", "-moz-", "-o-", "-o", "-khtml-"], r = ["webkitTransitionEnd", "msTransitionEnd", "transitionend", "otransitionend", "oTransitionEnd", "KhtmlTransitionEnd"], s = 0, n = e.length; s < n; s++)
                        if (e[s] in o) {
                            i.transitionstyle = e[s], i.prefixstyle = t[s], i.transitionend = r[s];
                            break
                        }
                    i.ischrome26 && (i.prefixstyle = t[1]), i.hastransition = i.transitionstyle
                }(), i.cursorgrabvalue = function () {
                    var e = ["grab", "-webkit-grab", "-moz-grab"];
                    (i.ischrome && !i.ischrome38 || i.isie) && (e = []);
                    for (var t = 0, r = e.length; t < r; t++) {
                        var s = e[t];
                        if (o.cursor = s, o.cursor == s) return s
                    }
                    return "url(https://cdnjs.cloudflare.com/ajax/libs/slider-pro/1.3.0/css/images/openhand.cur),n-resize"
                }(), i.hasmousecapture = "setCapture" in e, i.hasMutationObserver = !1 !== m, e = null, v = i, i
            },
            b = function (e, p) {
                function v() {
                    var e = T.doc.css(P.trstyle);
                    return !(!e || "matrix" != e.substr(0, 6)) && e.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, "").split(/, +/)
                }

                function b() {
                    var e = T.win;
                    if ("zIndex" in e) return e.zIndex();
                    for (; e.length > 0;) {
                        if (9 == e[0].nodeType) return !1;
                        var o = e.css("zIndex");
                        if (!isNaN(o) && 0 !== o) return parseInt(o);
                        e = e.parent()
                    }
                    return !1
                }

                function x(e, o, t) {
                    var r = e.css(o),
                        i = parseFloat(r);
                    if (isNaN(i)) {
                        var s = 3 == (i = I[r] || 0) ? t ? T.win.outerHeight() - T.win.innerHeight() : T.win.outerWidth() - T.win.innerWidth() : 1;
                        return T.isie8 && i && (i += 1), s ? i : 0
                    }
                    return i
                }

                function S(e, o, t, r) {
                    T._bind(e, o, function (r) {
                        var i = {
                            original: r = r || a.event,
                            target: r.target || r.srcElement,
                            type: "wheel",
                            deltaMode: "MozMousePixelScroll" == r.type ? 0 : 1,
                            deltaX: 0,
                            deltaZ: 0,
                            preventDefault: function () {
                                return r.preventDefault ? r.preventDefault() : r.returnValue = !1, !1
                            },
                            stopImmediatePropagation: function () {
                                r.stopImmediatePropagation ? r.stopImmediatePropagation() : r.cancelBubble = !0
                            }
                        };
                        return "mousewheel" == o ? (r.wheelDeltaX && (i.deltaX = -.025 * r.wheelDeltaX), r.wheelDeltaY && (i.deltaY = -.025 * r.wheelDeltaY), !i.deltaY && !i.deltaX && (i.deltaY = -.025 * r.wheelDelta)) : i.deltaY = r.detail, t.call(e, i)
                    }, r)
                }

                function z(e, o, t, r) {
                    T.scrollrunning || (T.newscrolly = T.getScrollTop(), T.newscrollx = T.getScrollLeft(), D = f());
                    var i = f() - D;
                    if (D = f(), i > 350 ? A = 1 : A += (2 - A) / 10, e = e * A | 0, o = o * A | 0, e) {
                        if (r)
                            if (e < 0) {
                                if (T.getScrollLeft() >= T.page.maxw) return !0
                            } else if (T.getScrollLeft() <= 0) return !0;
                        var s = e > 0 ? 1 : -1;
                        X !== s && (T.scrollmom && T.scrollmom.stop(), T.newscrollx = T.getScrollLeft(), X = s), T.lastdeltax -= e
                    }
                    if (o) {
                        if (function () {
                            var e = T.getScrollTop();
                            if (o < 0) {
                                if (e >= T.page.maxh) return !0
                            } else if (e <= 0) return !0
                        }()) {
                            if (M.nativeparentscrolling && t && !T.ispage && !T.zoomactive) return !0;
                            var n = T.view.h >> 1;
                            T.newscrolly < -n ? (T.newscrolly = -n, o = -1) : T.newscrolly > T.page.maxh + n ? (T.newscrolly = T.page.maxh + n, o = 1) : o = 0
                        }
                        var l = o > 0 ? 1 : -1;
                        B !== l && (T.scrollmom && T.scrollmom.stop(), T.newscrolly = T.getScrollTop(), B = l), T.lastdeltay -= o
                    }
                    (o || e) && T.synched("relativexy", function () {
                        var e = T.lastdeltay + T.newscrolly;
                        T.lastdeltay = 0;
                        var o = T.lastdeltax + T.newscrollx;
                        T.lastdeltax = 0, T.rail.drag || T.doScrollPos(o, e)
                    })
                }

                function k(e, o, t) {
                    var r,
                        i;
                    return !(t || !q) || (0 === e.deltaMode ? (r = -e.deltaX * (M.mousescrollstep / 54) | 0, i = -e.deltaY * (M.mousescrollstep / 54) | 0) : 1 === e.deltaMode && (r = -e.deltaX * M.mousescrollstep * 50 / 80 | 0, i = -e.deltaY * M.mousescrollstep * 50 / 80 | 0), o && M.oneaxismousemode && 0 === r && i && (r = i, i = 0, t && (r < 0 ? T.getScrollLeft() >= T.page.maxw : T.getScrollLeft() <= 0) && (i = r, r = 0)), T.isrtlmode && (r = -r), z(r, i, t, !0) ? void (t && (q = !0)) : (q = !1, e.stopImmediatePropagation(), e.preventDefault()))
                }

                var T = this;
                this.version = "3.7.6", this.name = "nicescroll", this.me = p;
                var E = n("body"),
                    M = this.opt = {
                        doc: E,
                        win: !1
                    };
                if (n.extend(M, g), M.snapbackspeed = 80, e)
                    for (var L in M) void 0 !== e[L] && (M[L] = e[L]);
                if (M.disablemutationobserver && (m = !1), this.doc = M.doc, this.iddoc = this.doc && this.doc[0] ? this.doc[0].id || "" : "", this.ispage = /^BODY|HTML/.test(M.win ? M.win[0].nodeName : this.doc[0].nodeName), this.haswrapper = !1 !== M.win, this.win = M.win || (this.ispage ? c : this.doc), this.docscroll = this.ispage && !this.haswrapper ? c : this.win, this.body = E, this.viewport = !1, this.isfixed = !1, this.iframe = !1, this.isiframe = "IFRAME" == this.doc[0].nodeName && "IFRAME" == this.win[0].nodeName, this.istextarea = "TEXTAREA" == this.win[0].nodeName, this.forcescreen = !1, this.canshowonmouseevent = "scroll" != M.autohidemode, this.onmousedown = !1, this.onmouseup = !1, this.onmousemove = !1, this.onmousewheel = !1, this.onkeypress = !1, this.ongesturezoom = !1, this.onclick = !1, this.onscrollstart = !1, this.onscrollend = !1, this.onscrollcancel = !1, this.onzoomin = !1, this.onzoomout = !1, this.view = !1, this.page = !1, this.scroll = {
                    x: 0,
                    y: 0
                }, this.scrollratio = {
                    x: 0,
                    y: 0
                }, this.cursorheight = 20, this.scrollvaluemax = 0, "auto" == M.rtlmode) {
                    var C = this.win[0] == a ? this.body : this.win,
                        N = C.css("writing-mode") || C.css("-webkit-writing-mode") || C.css("-ms-writing-mode") || C.css("-moz-writing-mode");
                    "horizontal-tb" == N || "lr-tb" == N || "" === N ? (this.isrtlmode = "rtl" == C.css("direction"), this.isvertical = !1) : (this.isrtlmode = "vertical-rl" == N || "tb" == N || "tb-rl" == N || "rl-tb" == N, this.isvertical = "vertical-rl" == N || "tb" == N || "tb-rl" == N)
                } else this.isrtlmode = !0 === M.rtlmode, this.isvertical = !1;
                if (this.scrollrunning = !1, this.scrollmom = !1, this.observer = !1, this.observerremover = !1, this.observerbody = !1, !1 !== M.scrollbarid)
                    this.id = M.scrollbarid; else
                    do {
                        this.id = "ascrail" + i++
                    } while (l.getElementById(this.id));
                this.rail = !1, this.cursor = !1, this.cursorfreezed = !1, this.selectiondrag = !1, this.zoom = !1, this.zoomactive = !1, this.hasfocus = !1, this.hasmousefocus = !1, this.railslocked = !1, this.locked = !1, this.hidden = !1, this.cursoractive = !0, this.wheelprevented = !1, this.overflowx = M.overflowx, this.overflowy = M.overflowy, this.nativescrollingarea = !1, this.checkarea = 0, this.events = [], this.saved = {}, this.delaylist = {}, this.synclist = {}, this.lastdeltax = 0, this.lastdeltay = 0, this.detected = w();
                var P = n.extend({}, this.detected);
                this.canhwscroll = P.hastransform && M.hwacceleration, this.ishwscroll = this.canhwscroll && T.haswrapper, this.isrtlmode ? this.isvertical ? this.hasreversehr = !(P.iswebkit || P.isie || P.isie11) : this.hasreversehr = !(P.iswebkit || P.isie && !P.isie10 && !P.isie11) : this.hasreversehr = !1, this.istouchcapable = !1, P.cantouch || !P.hasw3ctouch && !P.hasmstouch ? !P.cantouch || P.isios || P.isandroid || !P.iswebkit && !P.ismozilla || (this.istouchcapable = !0) : this.istouchcapable = !0, M.enablemouselockapi || (P.hasmousecapture = !1, P.haspointerlock = !1), this.debounced = function (e, o, t) {
                    T && (T.delaylist[e] || !1 || (T.delaylist[e] = {
                        h: u(function () {
                            T.delaylist[e].fn.call(T), T.delaylist[e] = !1
                        }, t)
                    }, o.call(T)), T.delaylist[e].fn = o)
                }, this.synched = function (e, o) {
                    T.synclist[e] ? T.synclist[e] = o : (T.synclist[e] = o, u(function () {
                        T && (T.synclist[e] && T.synclist[e].call(T), T.synclist[e] = null)
                    }))
                }, this.unsynched = function (e) {
                    T.synclist[e] && (T.synclist[e] = !1)
                }, this.css = function (e, o) {
                    for (var t in o) T.saved.css.push([e, t, e.css(t)]), e.css(t, o[t])
                }, this.scrollTop = function (e) {
                    return void 0 === e ? T.getScrollTop() : T.setScrollTop(e)
                }, this.scrollLeft = function (e) {
                    return void 0 === e ? T.getScrollLeft() : T.setScrollLeft(e)
                };
                var R = function (e, o, t, r, i, s, n) {
                    this.st = e, this.ed = o, this.spd = t, this.p1 = r || 0, this.p2 = i || 1, this.p3 = s || 0, this.p4 = n || 1, this.ts = f(), this.df = o - e
                };
                if (R.prototype = {
                    B2: function (e) {
                        return 3 * (1 - e) * (1 - e) * e
                    },
                    B3: function (e) {
                        return 3 * (1 - e) * e * e
                    },
                    B4: function (e) {
                        return e * e * e
                    },
                    getPos: function () {
                        return (f() - this.ts) / this.spd
                    },
                    getNow: function () {
                        var e = (f() - this.ts) / this.spd,
                            o = this.B2(e) + this.B3(e) + this.B4(e);
                        return e >= 1 ? this.ed : this.st + this.df * o | 0
                    },
                    update: function (e, o) {
                        return this.st = this.getNow(), this.ed = e, this.spd = o, this.ts = f(), this.df = this.ed - this.st, this
                    }
                }, this.ishwscroll) {
                    this.doc.translate = {
                        x: 0,
                        y: 0,
                        tx: "0px",
                        ty: "0px"
                    }, P.hastranslate3d && P.isios && this.doc.css("-webkit-backface-visibility", "hidden"), this.getScrollTop = function (e) {
                        if (!e) {
                            var o = v();
                            if (o) return 16 == o.length ? -o[13] : -o[5];
                            if (T.timerscroll && T.timerscroll.bz) return T.timerscroll.bz.getNow()
                        }
                        return T.doc.translate.y
                    }, this.getScrollLeft = function (e) {
                        if (!e) {
                            var o = v();
                            if (o) return 16 == o.length ? -o[12] : -o[4];
                            if (T.timerscroll && T.timerscroll.bh) return T.timerscroll.bh.getNow()
                        }
                        return T.doc.translate.x
                    }, this.notifyScrollEvent = function (e) {
                        var o = l.createEvent("UIEvents");
                        o.initUIEvent("scroll", !1, !1, a, 1), o.niceevent = !0, e.dispatchEvent(o)
                    };
                    var _ = this.isrtlmode ? 1 : -1;
                    P.hastranslate3d && M.enabletranslate3d ? (this.setScrollTop = function (e, o) {
                        T.doc.translate.y = e, T.doc.translate.ty = -1 * e + "px", T.doc.css(P.trstyle, "translate3d(" + T.doc.translate.tx + "," + T.doc.translate.ty + ",0)"), o || T.notifyScrollEvent(T.win[0])
                    }, this.setScrollLeft = function (e, o) {
                        T.doc.translate.x = e, T.doc.translate.tx = e * _ + "px", T.doc.css(P.trstyle, "translate3d(" + T.doc.translate.tx + "," + T.doc.translate.ty + ",0)"), o || T.notifyScrollEvent(T.win[0])
                    }) : (this.setScrollTop = function (e, o) {
                        T.doc.translate.y = e, T.doc.translate.ty = -1 * e + "px", T.doc.css(P.trstyle, "translate(" + T.doc.translate.tx + "," + T.doc.translate.ty + ")"), o || T.notifyScrollEvent(T.win[0])
                    }, this.setScrollLeft = function (e, o) {
                        T.doc.translate.x = e, T.doc.translate.tx = e * _ + "px", T.doc.css(P.trstyle, "translate(" + T.doc.translate.tx + "," + T.doc.translate.ty + ")"), o || T.notifyScrollEvent(T.win[0])
                    })
                } else this.getScrollTop = function () {
                    return T.docscroll.scrollTop()
                }, this.setScrollTop = function (e) {
                    T.docscroll.scrollTop(e)
                }, this.getScrollLeft = function () {
                    return T.hasreversehr ? T.detected.ismozilla ? T.page.maxw - Math.abs(T.docscroll.scrollLeft()) : T.page.maxw - T.docscroll.scrollLeft() : T.docscroll.scrollLeft()
                }, this.setScrollLeft = function (e) {
                    return setTimeout(function () {
                        if (T) return T.hasreversehr && (e = T.detected.ismozilla ? -(T.page.maxw - e) : T.page.maxw - e), T.docscroll.scrollLeft(e)
                    }, 1)
                };
                this.getTarget = function (e) {
                    return !!e && (e.target ? e.target : !!e.srcElement && e.srcElement)
                }, this.hasParent = function (e, o) {
                    if (!e) return !1;
                    for (var t = e.target || e.srcElement || e || !1; t && t.id != o;) t = t.parentNode || !1;
                    return !1 !== t
                };
                var I = {
                    thin: 1,
                    medium: 3,
                    thick: 5
                };
                this.getDocumentScrollOffset = function () {
                    return {
                        top: a.pageYOffset || l.documentElement.scrollTop,
                        left: a.pageXOffset || l.documentElement.scrollLeft
                    }
                }, this.getOffset = function () {
                    if (T.isfixed) {
                        var e = T.win.offset(),
                            o = T.getDocumentScrollOffset();
                        return e.top -= o.top, e.left -= o.left, e
                    }
                    var t = T.win.offset();
                    if (!T.viewport) return t;
                    var r = T.viewport.offset();
                    return {
                        top: t.top - r.top,
                        left: t.left - r.left
                    }
                }, this.updateScrollBar = function (e) {
                    var o,
                        t;
                    if (T.ishwscroll) T.rail.css({
                        height: T.win.innerHeight() - (M.railpadding.top + M.railpadding.bottom)
                    }), T.railh && T.railh.css({
                        width: T.win.innerWidth() - (M.railpadding.left + M.railpadding.right)
                    }); else {
                        var r = T.getOffset();
                        if (o = {
                            top: r.top,
                            left: r.left - (M.railpadding.left + M.railpadding.right)
                        }, o.top += x(T.win, "border-top-width", !0), o.left += T.rail.align ? T.win.outerWidth() - x(T.win, "border-right-width") - T.rail.width : x(T.win, "border-left-width"), (t = M.railoffset) && (t.top && (o.top += t.top), t.left && (o.left += t.left)), T.railslocked || T.rail.css({
                            top: o.top,
                            left: o.left,
                            height: (e ? e.h : T.win.innerHeight()) - (M.railpadding.top + M.railpadding.bottom)
                        }), T.zoom && T.zoom.css({
                            top: o.top + 1,
                            left: 1 == T.rail.align ? o.left - 20 : o.left + T.rail.width + 4
                        }), T.railh && !T.railslocked) {
                            o = {
                                top: r.top,
                                left: r.left
                            }, (t = M.railhoffset) && (t.top && (o.top += t.top), t.left && (o.left += t.left));
                            var i = T.railh.align ? o.top + x(T.win, "border-top-width", !0) + T.win.innerHeight() - T.railh.height : o.top + x(T.win, "border-top-width", !0),
                                s = o.left + x(T.win, "border-left-width");
                            T.railh.css({
                                top: i - (M.railpadding.top + M.railpadding.bottom),
                                left: s,
                                width: T.railh.width
                            })
                        }
                    }
                }, this.doRailClick = function (e, o, t) {
                    var r,
                        i,
                        s,
                        n;
                    T.railslocked || (T.cancelEvent(e), "pageY" in e || (e.pageX = e.clientX + l.documentElement.scrollLeft, e.pageY = e.clientY + l.documentElement.scrollTop), o ? (r = t ? T.doScrollLeft : T.doScrollTop, s = t ? (e.pageX - T.railh.offset().left - T.cursorwidth / 2) * T.scrollratio.x : (e.pageY - T.rail.offset().top - T.cursorheight / 2) * T.scrollratio.y, T.unsynched("relativexy"), r(0 | s)) : (r = t ? T.doScrollLeftBy : T.doScrollBy, s = t ? T.scroll.x : T.scroll.y, n = t ? e.pageX - T.railh.offset().left : e.pageY - T.rail.offset().top, i = t ? T.view.w : T.view.h, r(s >= n ? i : -i)))
                }, T.newscrolly = T.newscrollx = 0, T.hasanimationframe = "requestAnimationFrame" in a, T.hascancelanimationframe = "cancelAnimationFrame" in a, T.hasborderbox = !1, this.init = function () {
                    if (T.saved.css = [], P.isoperamini) return !0;
                    if (P.isandroid && !("hidden" in l)) return !0;
                    M.emulatetouch = M.emulatetouch || M.touchbehavior, T.hasborderbox = a.getComputedStyle && "border-box" === a.getComputedStyle(l.body)["box-sizing"];
                    var e = {
                        "overflow-y": "hidden"
                    };
                    if ((P.isie11 || P.isie10) && (e["-ms-overflow-style"] = "none"), T.ishwscroll && (this.doc.css(P.transitionstyle, P.prefixstyle + "transform 0ms ease-out"), P.transitionend && T.bind(T.doc, P.transitionend, T.onScrollTransitionEnd, !1)), T.zindex = "auto", T.ispage || "auto" != M.zindex ? T.zindex = M.zindex : T.zindex = b() || "auto", !T.ispage && "auto" != T.zindex && T.zindex > s && (s = T.zindex), T.isie && 0 === T.zindex && "auto" == M.zindex && (T.zindex = "auto"), !T.ispage || !P.isieold) {
                        var i = T.docscroll;
                        T.ispage && (i = T.haswrapper ? T.win : T.doc), T.css(i, e), T.ispage && (P.isie11 || P.isie) && T.css(n("html"), e), !P.isios || T.ispage || T.haswrapper || T.css(E, {
                            "-webkit-overflow-scrolling": "touch"
                        });
                        var d = n(l.createElement("div"));
                        d.css({
                            position: "relative",
                            top: 0,
                            float: "right",
                            width: M.cursorwidth,
                            height: 0,
                            "background-color": M.cursorcolor,
                            border: M.cursorborder,
                            "background-clip": "padding-box",
                            "-webkit-border-radius": M.cursorborderradius,
                            "-moz-border-radius": M.cursorborderradius,
                            "border-radius": M.cursorborderradius
                        }), d.addClass("nicescroll-cursors"), T.cursor = d;
                        var u = n(l.createElement("div"));
                        u.attr("id", T.id), u.addClass("nicescroll-rails nicescroll-rails-vr");
                        var h,
                            p,
                            f = ["left", "right", "top", "bottom"];
                        for (var g in f) p = f[g], (h = M.railpadding[p] || 0) && u.css("padding-" + p, h + "px");
                        u.append(d), u.width = Math.max(parseFloat(M.cursorwidth), d.outerWidth()), u.css({
                            width: u.width + "px",
                            zIndex: T.zindex,
                            background: M.background,
                            cursor: "default"
                        }), u.visibility = !0, u.scrollable = !0, u.align = "left" == M.railalign ? 0 : 1, T.rail = u, T.rail.drag = !1;
                        var v = !1;
                        !M.boxzoom || T.ispage || P.isieold || (v = l.createElement("div"), T.bind(v, "click", T.doZoom), T.bind(v, "mouseenter", function () {
                            T.zoom.css("opacity", M.cursoropacitymax)
                        }), T.bind(v, "mouseleave", function () {
                            T.zoom.css("opacity", M.cursoropacitymin)
                        }), T.zoom = n(v), T.zoom.css({
                            cursor: "pointer",
                            zIndex: T.zindex,
                            backgroundImage: "url(" + M.scriptpath + "zoomico.png)",
                            height: 18,
                            width: 18,
                            backgroundPosition: "0 0"
                        }), M.dblclickzoom && T.bind(T.win, "dblclick", T.doZoom), P.cantouch && M.gesturezoom && (T.ongesturezoom = function (e) {
                            return e.scale > 1.5 && T.doZoomIn(e), e.scale < .8 && T.doZoomOut(e), T.cancelEvent(e)
                        }, T.bind(T.win, "gestureend", T.ongesturezoom))), T.railh = !1;
                        var w;
                        if (M.horizrailenabled && (T.css(i, {
                            overflowX: "hidden"
                        }), (d = n(l.createElement("div"))).css({
                            position: "absolute",
                            top: 0,
                            height: M.cursorwidth,
                            width: 0,
                            backgroundColor: M.cursorcolor,
                            border: M.cursorborder,
                            backgroundClip: "padding-box",
                            "-webkit-border-radius": M.cursorborderradius,
                            "-moz-border-radius": M.cursorborderradius,
                            "border-radius": M.cursorborderradius
                        }), P.isieold && d.css("overflow", "hidden"), d.addClass("nicescroll-cursors"), T.cursorh = d, (w = n(l.createElement("div"))).attr("id", T.id + "-hr"), w.addClass("nicescroll-rails nicescroll-rails-hr"), w.height = Math.max(parseFloat(M.cursorwidth), d.outerHeight()), w.css({
                            height: w.height + "px",
                            zIndex: T.zindex,
                            background: M.background
                        }), w.append(d), w.visibility = !0, w.scrollable = !0, w.align = "top" == M.railvalign ? 0 : 1, T.railh = w, T.railh.drag = !1), T.ispage) u.css({
                            position: "fixed",
                            top: 0,
                            height: "100%"
                        }), u.css(u.align ? {
                            right: 0
                        } : {
                            left: 0
                        }), T.body.append(u), T.railh && (w.css({
                            position: "fixed",
                            left: 0,
                            width: "100%"
                        }), w.css(w.align ? {
                            bottom: 0
                        } : {
                            top: 0
                        }), T.body.append(w)); else {
                            if (T.ishwscroll) {
                                "static" == T.win.css("position") && T.css(T.win, {
                                    position: "relative"
                                });
                                var x = "HTML" == T.win[0].nodeName ? T.body : T.win;
                                n(x).scrollTop(0).scrollLeft(0), T.zoom && (T.zoom.css({
                                    position: "absolute",
                                    top: 1,
                                    right: 0,
                                    "margin-right": u.width + 4
                                }), x.append(T.zoom)), u.css({
                                    position: "absolute",
                                    top: 0
                                }), u.css(u.align ? {
                                    right: 0
                                } : {
                                    left: 0
                                }), x.append(u), w && (w.css({
                                    position: "absolute",
                                    left: 0,
                                    bottom: 0
                                }), w.css(w.align ? {
                                    bottom: 0
                                } : {
                                    top: 0
                                }), x.append(w))
                            } else {
                                T.isfixed = "fixed" == T.win.css("position");
                                var S = T.isfixed ? "fixed" : "absolute";
                                T.isfixed || (T.viewport = T.getViewport(T.win[0])), T.viewport && (T.body = T.viewport, /fixed|absolute/.test(T.viewport.css("position")) || T.css(T.viewport, {
                                    position: "relative"
                                })), u.css({
                                    position: S
                                }), T.zoom && T.zoom.css({
                                    position: S
                                }), T.updateScrollBar(), T.body.append(u), T.zoom && T.body.append(T.zoom), T.railh && (w.css({
                                    position: S
                                }), T.body.append(w))
                            }
                            P.isios && T.css(T.win, {
                                "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                                "-webkit-touch-callout": "none"
                            }), M.disableoutline && (P.isie && T.win.attr("hideFocus", "true"), P.iswebkit && T.win.css("outline", "none"))
                        }
                        if (!1 === M.autohidemode ? (T.autohidedom = !1, T.rail.css({
                            opacity: M.cursoropacitymax
                        }), T.railh && T.railh.css({
                            opacity: M.cursoropacitymax
                        })) : !0 === M.autohidemode || "leave" === M.autohidemode ? (T.autohidedom = n().add(T.rail), P.isie8 && (T.autohidedom = T.autohidedom.add(T.cursor)), T.railh && (T.autohidedom = T.autohidedom.add(T.railh)), T.railh && P.isie8 && (T.autohidedom = T.autohidedom.add(T.cursorh))) : "scroll" == M.autohidemode ? (T.autohidedom = n().add(T.rail), T.railh && (T.autohidedom = T.autohidedom.add(T.railh))) : "cursor" == M.autohidemode ? (T.autohidedom = n().add(T.cursor), T.railh && (T.autohidedom = T.autohidedom.add(T.cursorh))) : "hidden" == M.autohidemode && (T.autohidedom = !1, T.hide(), T.railslocked = !1), P.cantouch || T.istouchcapable || M.emulatetouch || P.hasmstouch) {
                            T.scrollmom = new y(T);
                            T.ontouchstart = function (e) {
                                if (T.locked) return !1;
                                if (e.pointerType && ("mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE)) return !1;
                                if (T.hasmoving = !1, T.scrollmom.timer && (T.triggerScrollEnd(), T.scrollmom.stop()), !T.railslocked) {
                                    var o = T.getTarget(e);
                                    if (o && /INPUT/i.test(o.nodeName) && /range/i.test(o.type)) return T.stopPropagation(e);
                                    var t = "mousedown" === e.type;
                                    if (!("clientX" in e) && "changedTouches" in e && (e.clientX = e.changedTouches[0].clientX, e.clientY = e.changedTouches[0].clientY), T.forcescreen) {
                                        var r = e;
                                        (e = {
                                            original: e.original ? e.original : e
                                        }).clientX = r.screenX, e.clientY = r.screenY
                                    }
                                    if (T.rail.drag = {
                                        x: e.clientX,
                                        y: e.clientY,
                                        sx: T.scroll.x,
                                        sy: T.scroll.y,
                                        st: T.getScrollTop(),
                                        sl: T.getScrollLeft(),
                                        pt: 2,
                                        dl: !1,
                                        tg: o
                                    }, T.ispage || !M.directionlockdeadzone)
                                        T.rail.drag.dl = "f"; else {
                                        var i = {
                                                w: c.width(),
                                                h: c.height()
                                            },
                                            s = T.getContentSize(),
                                            l = s.h - i.h,
                                            a = s.w - i.w;
                                        T.rail.scrollable && !T.railh.scrollable ? T.rail.drag.ck = l > 0 && "v" : !T.rail.scrollable && T.railh.scrollable ? T.rail.drag.ck = a > 0 && "h" : T.rail.drag.ck = !1
                                    }
                                    if (M.emulatetouch && T.isiframe && P.isie) {
                                        var d = T.win.position();
                                        T.rail.drag.x += d.left, T.rail.drag.y += d.top
                                    }
                                    if (T.hasmoving = !1, T.lastmouseup = !1, T.scrollmom.reset(e.clientX, e.clientY), o && t) {
                                        if (!/INPUT|SELECT|BUTTON|TEXTAREA/i.test(o.nodeName)) return P.hasmousecapture && o.setCapture(), M.emulatetouch ? (o.onclick && !o._onclick && (o._onclick = o.onclick, o.onclick = function (e) {
                                            if (T.hasmoving) return !1;
                                            o._onclick.call(this, e)
                                        }), T.cancelEvent(e)) : T.stopPropagation(e);
                                        /SUBMIT|CANCEL|BUTTON/i.test(n(o).attr("type")) && (T.preventclick = {
                                            tg: o,
                                            click: !1
                                        })
                                    }
                                }
                            }, T.ontouchend = function (e) {
                                if (!T.rail.drag) return !0;
                                if (2 == T.rail.drag.pt) {
                                    if (e.pointerType && ("mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE)) return !1;
                                    T.rail.drag = !1;
                                    var o = "mouseup" === e.type;
                                    if (T.hasmoving && (T.scrollmom.doMomentum(), T.lastmouseup = !0, T.hideCursor(), P.hasmousecapture && l.releaseCapture(), o)) return T.cancelEvent(e)
                                } else if (1 == T.rail.drag.pt) return T.onmouseup(e)
                            };
                            var z = M.emulatetouch && T.isiframe && !P.hasmousecapture,
                                k = .3 * M.directionlockdeadzone | 0;
                            T.ontouchmove = function (e, o) {
                                if (!T.rail.drag) return !0;
                                if (e.targetTouches && M.preventmultitouchscrolling && e.targetTouches.length > 1) return !0;
                                if (e.pointerType && ("mouse" === e.pointerType || e.pointerType === e.MSPOINTER_TYPE_MOUSE)) return !0;
                                if (2 == T.rail.drag.pt) {
                                    "changedTouches" in e && (e.clientX = e.changedTouches[0].clientX, e.clientY = e.changedTouches[0].clientY);
                                    var t,
                                        r;
                                    if (r = t = 0, z && !o) {
                                        var i = T.win.position();
                                        r = -i.left, t = -i.top
                                    }
                                    var s = e.clientY + t,
                                        n = s - T.rail.drag.y,
                                        a = e.clientX + r,
                                        c = a - T.rail.drag.x,
                                        d = T.rail.drag.st - n;
                                    if (T.ishwscroll && M.bouncescroll)
                                        d < 0 ? d = Math.round(d / 2) : d > T.page.maxh && (d = T.page.maxh + Math.round((d - T.page.maxh) / 2));
                                    else if (d < 0 ? (d = 0, s = 0) : d > T.page.maxh && (d = T.page.maxh, s = 0), 0 === s && !T.hasmoving) return T.ispage || (T.rail.drag = !1), !0;
                                    var u = T.getScrollLeft();
                                    if (T.railh && T.railh.scrollable && (u = T.isrtlmode ? c - T.rail.drag.sl : T.rail.drag.sl - c, T.ishwscroll && M.bouncescroll ? u < 0 ? u = Math.round(u / 2) : u > T.page.maxw && (u = T.page.maxw + Math.round((u - T.page.maxw) / 2)) : (u < 0 && (u = 0, a = 0), u > T.page.maxw && (u = T.page.maxw, a = 0))), !T.hasmoving) {
                                        if (T.rail.drag.y === e.clientY && T.rail.drag.x === e.clientX) return T.cancelEvent(e);
                                        var h = Math.abs(n),
                                            p = Math.abs(c),
                                            m = M.directionlockdeadzone;
                                        if (T.rail.drag.ck ? "v" == T.rail.drag.ck ? p > m && h <= k ? T.rail.drag = !1 : h > m && (T.rail.drag.dl = "v") : "h" == T.rail.drag.ck && (h > m && p <= k ? T.rail.drag = !1 : p > m && (T.rail.drag.dl = "h")) : h > m && p > m ? T.rail.drag.dl = "f" : h > m ? T.rail.drag.dl = p > k ? "f" : "v" : p > m && (T.rail.drag.dl = h > k ? "f" : "h"), !T.rail.drag.dl) return T.cancelEvent(e);
                                        T.triggerScrollStart(e.clientX, e.clientY, 0, 0, 0), T.hasmoving = !0
                                    }
                                    return T.preventclick && !T.preventclick.click && (T.preventclick.click = T.preventclick.tg.onclick || !1, T.preventclick.tg.onclick = T.onpreventclick), T.rail.drag.dl && ("v" == T.rail.drag.dl ? u = T.rail.drag.sl : "h" == T.rail.drag.dl && (d = T.rail.drag.st)), T.synched("touchmove", function () {
                                        T.rail.drag && 2 == T.rail.drag.pt && (T.prepareTransition && T.resetTransition(), T.rail.scrollable && T.setScrollTop(d), T.scrollmom.update(a, s), T.railh && T.railh.scrollable ? (T.setScrollLeft(u), T.showCursor(d, u)) : T.showCursor(d), P.isie10 && l.selection.clear())
                                    }), T.cancelEvent(e)
                                }
                                return 1 == T.rail.drag.pt ? T.onmousemove(e) : void 0
                            }, T.ontouchstartCursor = function (e, o) {
                                if (!T.rail.drag || 3 == T.rail.drag.pt) {
                                    if (T.locked) return T.cancelEvent(e);
                                    T.cancelScroll(), T.rail.drag = {
                                        x: e.touches[0].clientX,
                                        y: e.touches[0].clientY,
                                        sx: T.scroll.x,
                                        sy: T.scroll.y,
                                        pt: 3,
                                        hr: !!o
                                    };
                                    var t = T.getTarget(e);
                                    return !T.ispage && P.hasmousecapture && t.setCapture(), T.isiframe && !P.hasmousecapture && (T.saved.csspointerevents = T.doc.css("pointer-events"), T.css(T.doc, {
                                        "pointer-events": "none"
                                    })), T.cancelEvent(e)
                                }
                            }, T.ontouchendCursor = function (e) {
                                if (T.rail.drag) {
                                    if (P.hasmousecapture && l.releaseCapture(), T.isiframe && !P.hasmousecapture && T.doc.css("pointer-events", T.saved.csspointerevents), 3 != T.rail.drag.pt) return;
                                    return T.rail.drag = !1, T.cancelEvent(e)
                                }
                            }, T.ontouchmoveCursor = function (e) {
                                if (T.rail.drag) {
                                    if (3 != T.rail.drag.pt) return;
                                    if (T.cursorfreezed = !0, T.rail.drag.hr) {
                                        T.scroll.x = T.rail.drag.sx + (e.touches[0].clientX - T.rail.drag.x), T.scroll.x < 0 && (T.scroll.x = 0);
                                        var o = T.scrollvaluemaxw;
                                        T.scroll.x > o && (T.scroll.x = o)
                                    } else {
                                        T.scroll.y = T.rail.drag.sy + (e.touches[0].clientY - T.rail.drag.y), T.scroll.y < 0 && (T.scroll.y = 0);
                                        var t = T.scrollvaluemax;
                                        T.scroll.y > t && (T.scroll.y = t)
                                    }
                                    return T.synched("touchmove", function () {
                                        T.rail.drag && 3 == T.rail.drag.pt && (T.showCursor(), T.rail.drag.hr ? T.doScrollLeft(Math.round(T.scroll.x * T.scrollratio.x), M.cursordragspeed) : T.doScrollTop(Math.round(T.scroll.y * T.scrollratio.y), M.cursordragspeed))
                                    }), T.cancelEvent(e)
                                }
                            }
                        }
                        if (T.onmousedown = function (e, o) {
                            if (!T.rail.drag || 1 == T.rail.drag.pt) {
                                if (T.railslocked) return T.cancelEvent(e);
                                T.cancelScroll(), T.rail.drag = {
                                    x: e.clientX,
                                    y: e.clientY,
                                    sx: T.scroll.x,
                                    sy: T.scroll.y,
                                    pt: 1,
                                    hr: o || !1
                                };
                                var t = T.getTarget(e);
                                return P.hasmousecapture && t.setCapture(), T.isiframe && !P.hasmousecapture && (T.saved.csspointerevents = T.doc.css("pointer-events"), T.css(T.doc, {
                                    "pointer-events": "none"
                                })), T.hasmoving = !1, T.cancelEvent(e)
                            }
                        }, T.onmouseup = function (e) {
                            if (T.rail.drag) return 1 != T.rail.drag.pt || (P.hasmousecapture && l.releaseCapture(), T.isiframe && !P.hasmousecapture && T.doc.css("pointer-events", T.saved.csspointerevents), T.rail.drag = !1, T.cursorfreezed = !1, T.hasmoving && T.triggerScrollEnd(), T.cancelEvent(e))
                        }, T.onmousemove = function (e) {
                            if (T.rail.drag) {
                                if (1 !== T.rail.drag.pt) return;
                                if (P.ischrome && 0 === e.which) return T.onmouseup(e);
                                if (T.cursorfreezed = !0, T.hasmoving || T.triggerScrollStart(e.clientX, e.clientY, 0, 0, 0), T.hasmoving = !0, T.rail.drag.hr) {
                                    T.scroll.x = T.rail.drag.sx + (e.clientX - T.rail.drag.x), T.scroll.x < 0 && (T.scroll.x = 0);
                                    var o = T.scrollvaluemaxw;
                                    T.scroll.x > o && (T.scroll.x = o)
                                } else {
                                    T.scroll.y = T.rail.drag.sy + (e.clientY - T.rail.drag.y), T.scroll.y < 0 && (T.scroll.y = 0);
                                    var t = T.scrollvaluemax;
                                    T.scroll.y > t && (T.scroll.y = t)
                                }
                                return T.synched("mousemove", function () {
                                    T.cursorfreezed && (T.showCursor(), T.rail.drag.hr ? T.scrollLeft(Math.round(T.scroll.x * T.scrollratio.x)) : T.scrollTop(Math.round(T.scroll.y * T.scrollratio.y)))
                                }), T.cancelEvent(e)
                            }
                            T.checkarea = 0
                        }, P.cantouch || M.emulatetouch) T.onpreventclick = function (e) {
                            if (T.preventclick) return T.preventclick.tg.onclick = T.preventclick.click, T.preventclick = !1, T.cancelEvent(e)
                        }, T.onclick = !P.isios && function (e) {
                            return !T.lastmouseup || (T.lastmouseup = !1, T.cancelEvent(e))
                        }, M.grabcursorenabled && P.cursorgrabvalue && (T.css(T.ispage ? T.doc : T.win, {
                            cursor: P.cursorgrabvalue
                        }), T.css(T.rail, {
                            cursor: P.cursorgrabvalue
                        })); else {
                            var L = function (e) {
                                if (T.selectiondrag) {
                                    if (e) {
                                        var o = T.win.outerHeight(),
                                            t = e.pageY - T.selectiondrag.top;
                                        t > 0 && t < o && (t = 0), t >= o && (t -= o), T.selectiondrag.df = t
                                    }
                                    if (0 !== T.selectiondrag.df) {
                                        var r = -2 * T.selectiondrag.df / 6 | 0;
                                        T.doScrollBy(r), T.debounced("doselectionscroll", function () {
                                            L()
                                        }, 50)
                                    }
                                }
                            };
                            T.hasTextSelected = "getSelection" in l ? function () {
                                return l.getSelection().rangeCount > 0
                            } : "selection" in l ? function () {
                                return "None" != l.selection.type
                            } : function () {
                                return !1
                            }, T.onselectionstart = function (e) {
                                T.ispage || (T.selectiondrag = T.win.offset())
                            }, T.onselectionend = function (e) {
                                T.selectiondrag = !1
                            }, T.onselectiondrag = function (e) {
                                T.selectiondrag && T.hasTextSelected() && T.debounced("selectionscroll", function () {
                                    L(e)
                                }, 250)
                            }
                        }
                        if (P.hasw3ctouch ? (T.css(T.ispage ? n("html") : T.win, {
                            "touch-action": "none"
                        }), T.css(T.rail, {
                            "touch-action": "none"
                        }), T.css(T.cursor, {
                            "touch-action": "none"
                        }), T.bind(T.win, "pointerdown", T.ontouchstart), T.bind(l, "pointerup", T.ontouchend), T.delegate(l, "pointermove", T.ontouchmove)) : P.hasmstouch ? (T.css(T.ispage ? n("html") : T.win, {
                            "-ms-touch-action": "none"
                        }), T.css(T.rail, {
                            "-ms-touch-action": "none"
                        }), T.css(T.cursor, {
                            "-ms-touch-action": "none"
                        }), T.bind(T.win, "MSPointerDown", T.ontouchstart), T.bind(l, "MSPointerUp", T.ontouchend), T.delegate(l, "MSPointerMove", T.ontouchmove), T.bind(T.cursor, "MSGestureHold", function (e) {
                            e.preventDefault()
                        }), T.bind(T.cursor, "contextmenu", function (e) {
                            e.preventDefault()
                        })) : P.cantouch && (T.bind(T.win, "touchstart", T.ontouchstart, !1, !0), T.bind(l, "touchend", T.ontouchend, !1, !0), T.bind(l, "touchcancel", T.ontouchend, !1, !0), T.delegate(l, "touchmove", T.ontouchmove, !1, !0)), M.emulatetouch && (T.bind(T.win, "mousedown", T.ontouchstart, !1, !0), T.bind(l, "mouseup", T.ontouchend, !1, !0), T.bind(l, "mousemove", T.ontouchmove, !1, !0)), (M.cursordragontouch || !P.cantouch && !M.emulatetouch) && (T.rail.css({
                            cursor: "default"
                        }), T.railh && T.railh.css({
                            cursor: "default"
                        }), T.jqbind(T.rail, "mouseenter", function () {
                            if (!T.ispage && !T.win.is(":visible")) return !1;
                            T.canshowonmouseevent && T.showCursor(), T.rail.active = !0
                        }), T.jqbind(T.rail, "mouseleave", function () {
                            T.rail.active = !1, T.rail.drag || T.hideCursor()
                        }), M.sensitiverail && (T.bind(T.rail, "click", function (e) {
                            T.doRailClick(e, !1, !1)
                        }), T.bind(T.rail, "dblclick", function (e) {
                            T.doRailClick(e, !0, !1)
                        }), T.bind(T.cursor, "click", function (e) {
                            T.cancelEvent(e)
                        }), T.bind(T.cursor, "dblclick", function (e) {
                            T.cancelEvent(e)
                        })), T.railh && (T.jqbind(T.railh, "mouseenter", function () {
                            if (!T.ispage && !T.win.is(":visible")) return !1;
                            T.canshowonmouseevent && T.showCursor(), T.rail.active = !0
                        }), T.jqbind(T.railh, "mouseleave", function () {
                            T.rail.active = !1, T.rail.drag || T.hideCursor()
                        }), M.sensitiverail && (T.bind(T.railh, "click", function (e) {
                            T.doRailClick(e, !1, !0)
                        }), T.bind(T.railh, "dblclick", function (e) {
                            T.doRailClick(e, !0, !0)
                        }), T.bind(T.cursorh, "click", function (e) {
                            T.cancelEvent(e)
                        }), T.bind(T.cursorh, "dblclick", function (e) {
                            T.cancelEvent(e)
                        })))), M.cursordragontouch && (this.istouchcapable || P.cantouch) && (T.bind(T.cursor, "touchstart", T.ontouchstartCursor), T.bind(T.cursor, "touchmove", T.ontouchmoveCursor), T.bind(T.cursor, "touchend", T.ontouchendCursor), T.cursorh && T.bind(T.cursorh, "touchstart", function (e) {
                            T.ontouchstartCursor(e, !0)
                        }), T.cursorh && T.bind(T.cursorh, "touchmove", T.ontouchmoveCursor), T.cursorh && T.bind(T.cursorh, "touchend", T.ontouchendCursor)), M.emulatetouch || P.isandroid || P.isios ? (T.bind(P.hasmousecapture ? T.win : l, "mouseup", T.ontouchend), T.onclick && T.bind(l, "click", T.onclick), M.cursordragontouch ? (T.bind(T.cursor, "mousedown", T.onmousedown), T.bind(T.cursor, "mouseup", T.onmouseup), T.cursorh && T.bind(T.cursorh, "mousedown", function (e) {
                            T.onmousedown(e, !0)
                        }), T.cursorh && T.bind(T.cursorh, "mouseup", T.onmouseup)) : (T.bind(T.rail, "mousedown", function (e) {
                            e.preventDefault()
                        }), T.railh && T.bind(T.railh, "mousedown", function (e) {
                            e.preventDefault()
                        }))) : (T.bind(P.hasmousecapture ? T.win : l, "mouseup", T.onmouseup), T.bind(l, "mousemove", T.onmousemove), T.onclick && T.bind(l, "click", T.onclick), T.bind(T.cursor, "mousedown", T.onmousedown), T.bind(T.cursor, "mouseup", T.onmouseup), T.railh && (T.bind(T.cursorh, "mousedown", function (e) {
                            T.onmousedown(e, !0)
                        }), T.bind(T.cursorh, "mouseup", T.onmouseup)), !T.ispage && M.enablescrollonselection && (T.bind(T.win[0], "mousedown", T.onselectionstart), T.bind(l, "mouseup", T.onselectionend), T.bind(T.cursor, "mouseup", T.onselectionend), T.cursorh && T.bind(T.cursorh, "mouseup", T.onselectionend), T.bind(l, "mousemove", T.onselectiondrag)), T.zoom && (T.jqbind(T.zoom, "mouseenter", function () {
                            T.canshowonmouseevent && T.showCursor(), T.rail.active = !0
                        }), T.jqbind(T.zoom, "mouseleave", function () {
                            T.rail.active = !1, T.rail.drag || T.hideCursor()
                        }))), M.enablemousewheel && (T.isiframe || T.mousewheel(P.isie && T.ispage ? l : T.win, T.onmousewheel), T.mousewheel(T.rail, T.onmousewheel), T.railh && T.mousewheel(T.railh, T.onmousewheelhr)), T.ispage || P.cantouch || /HTML|^BODY/.test(T.win[0].nodeName) || (T.win.attr("tabindex") || T.win.attr({
                            tabindex: ++r
                        }), T.bind(T.win, "focus", function (e) {
                            o = T.getTarget(e).id || T.getTarget(e) || !1, T.hasfocus = !0, T.canshowonmouseevent && T.noticeCursor()
                        }), T.bind(T.win, "blur", function (e) {
                            o = !1, T.hasfocus = !1
                        }), T.bind(T.win, "mouseenter", function (e) {
                            t = T.getTarget(e).id || T.getTarget(e) || !1, T.hasmousefocus = !0, T.canshowonmouseevent && T.noticeCursor()
                        }), T.bind(T.win, "mouseleave", function (e) {
                            t = !1, T.hasmousefocus = !1, T.rail.drag || T.hideCursor()
                        })), T.onkeypress = function (e) {
                            if (T.railslocked && 0 === T.page.maxh) return !0;
                            e = e || a.event;
                            var r = T.getTarget(e);
                            if (r && /INPUT|TEXTAREA|SELECT|OPTION/.test(r.nodeName) && (!(r.getAttribute("type") || r.type || !1) || !/submit|button|cancel/i.tp)) return !0;
                            if (n(r).attr("contenteditable")) return !0;
                            if (T.hasfocus || T.hasmousefocus && !o || T.ispage && !o && !t) {
                                var i = e.keyCode;
                                if (T.railslocked && 27 != i) return T.cancelEvent(e);
                                var s = e.ctrlKey || !1,
                                    l = e.shiftKey || !1,
                                    c = !1;
                                switch (i) {
                                    case 38:
                                    case 63233:
                                        T.doScrollBy(72), c = !0;
                                        break;
                                    case 40:
                                    case 63235:
                                        T.doScrollBy(-72), c = !0;
                                        break;
                                    case 37:
                                    case 63232:
                                        T.railh && (s ? T.doScrollLeft(0) : T.doScrollLeftBy(72), c = !0);
                                        break;
                                    case 39:
                                    case 63234:
                                        T.railh && (s ? T.doScrollLeft(T.page.maxw) : T.doScrollLeftBy(-72), c = !0);
                                        break;
                                    case 33:
                                    case 63276:
                                        T.doScrollBy(T.view.h), c = !0;
                                        break;
                                    case 34:
                                    case 63277:
                                        T.doScrollBy(-T.view.h), c = !0;
                                        break;
                                    case 36:
                                    case 63273:
                                        T.railh && s ? T.doScrollPos(0, 0) : T.doScrollTo(0), c = !0;
                                        break;
                                    case 35:
                                    case 63275:
                                        T.railh && s ? T.doScrollPos(T.page.maxw, T.page.maxh) : T.doScrollTo(T.page.maxh), c = !0;
                                        break;
                                    case 32:
                                        M.spacebarenabled && (l ? T.doScrollBy(T.view.h) : T.doScrollBy(-T.view.h), c = !0);
                                        break;
                                    case 27:
                                        T.zoomactive && (T.doZoom(), c = !0)
                                }
                                if (c) return T.cancelEvent(e)
                            }
                        }, M.enablekeyboard && T.bind(l, P.isopera && !P.isopera12 ? "keypress" : "keydown", T.onkeypress), T.bind(l, "keydown", function (e) {
                            (e.ctrlKey || !1) && (T.wheelprevented = !0)
                        }), T.bind(l, "keyup", function (e) {
                            e.ctrlKey || !1 || (T.wheelprevented = !1)
                        }), T.bind(a, "blur", function (e) {
                            T.wheelprevented = !1
                        }), T.bind(a, "resize", T.onscreenresize), T.bind(a, "orientationchange", T.onscreenresize), T.bind(a, "load", T.lazyResize), P.ischrome && !T.ispage && !T.haswrapper) {
                            var C = T.win.attr("style"),
                                N = parseFloat(T.win.css("width")) + 1;
                            T.win.css("width", N), T.synched("chromefix", function () {
                                T.win.attr("style", C)
                            })
                        }
                        if (T.onAttributeChange = function (e) {
                            T.lazyResize(T.isieold ? 250 : 30)
                        }, M.enableobserver && (T.isie11 || !1 === m || (T.observerbody = new m(function (e) {
                            if (e.forEach(function (e) {
                                if ("attributes" == e.type) return E.hasClass("modal-open") && E.hasClass("modal-dialog") && !n.contains(n(".modal-dialog")[0], T.doc[0]) ? T.hide() : T.show()
                            }), T.me.clientWidth != T.page.width || T.me.clientHeight != T.page.height) return T.lazyResize(30)
                        }), T.observerbody.observe(l.body, {
                            childList: !0,
                            subtree: !0,
                            characterData: !1,
                            attributes: !0,
                            attributeFilter: ["class"]
                        })), !T.ispage && !T.haswrapper)) {
                            var R = T.win[0];
                            !1 !== m ? (T.observer = new m(function (e) {
                                e.forEach(T.onAttributeChange)
                            }), T.observer.observe(R, {
                                childList: !0,
                                characterData: !1,
                                attributes: !0,
                                subtree: !1
                            }), T.observerremover = new m(function (e) {
                                e.forEach(function (e) {
                                    if (e.removedNodes.length > 0)
                                        for (var o in e.removedNodes)
                                            if (T && e.removedNodes[o] === R) return T.remove()
                                })
                            }), T.observerremover.observe(R.parentNode, {
                                childList: !0,
                                characterData: !1,
                                attributes: !1,
                                subtree: !1
                            })) : (T.bind(R, P.isie && !P.isie9 ? "propertychange" : "DOMAttrModified", T.onAttributeChange), P.isie9 && R.attachEvent("onpropertychange", T.onAttributeChange), T.bind(R, "DOMNodeRemoved", function (e) {
                                e.target === R && T.remove()
                            }))
                        }
                        !T.ispage && M.boxzoom && T.bind(a, "resize", T.resizeZoom), T.istextarea && (T.bind(T.win, "keydown", T.lazyResize), T.bind(T.win, "mouseup", T.lazyResize)), T.lazyResize(30)
                    }
                    if ("IFRAME" == this.doc[0].nodeName) {
                        var _ = function () {
                            T.iframexd = !1;
                            var o;
                            try {
                                (o = "contentDocument" in this ? this.contentDocument : this.contentWindow._doc).domain
                            } catch (e) {
                                T.iframexd = !0, o = !1
                            }
                            if (T.iframexd) return "console" in a && console.log("NiceScroll error: policy restriced iframe"), !0;
                            if (T.forcescreen = !0, T.isiframe && (T.iframe = {
                                doc: n(o),
                                html: T.doc.contents().find("html")[0],
                                body: T.doc.contents().find("body")[0]
                            }, T.getContentSize = function () {
                                return {
                                    w: Math.max(T.iframe.html.scrollWidth, T.iframe.body.scrollWidth),
                                    h: Math.max(T.iframe.html.scrollHeight, T.iframe.body.scrollHeight)
                                }
                            }, T.docscroll = n(T.iframe.body)), !P.isios && M.iframeautoresize && !T.isiframe) {
                                T.win.scrollTop(0), T.doc.height("");
                                var t = Math.max(o.getElementsByTagName("html")[0].scrollHeight, o.body.scrollHeight);
                                T.doc.height(t)
                            }
                            T.lazyResize(30), T.css(n(T.iframe.body), e), P.isios && T.haswrapper && T.css(n(o.body), {
                                "-webkit-transform": "translate3d(0,0,0)"
                            }), "contentWindow" in this ? T.bind(this.contentWindow, "scroll", T.onscroll) : T.bind(o, "scroll", T.onscroll), M.enablemousewheel && T.mousewheel(o, T.onmousewheel), M.enablekeyboard && T.bind(o, P.isopera ? "keypress" : "keydown", T.onkeypress), P.cantouch ? (T.bind(o, "touchstart", T.ontouchstart), T.bind(o, "touchmove", T.ontouchmove)) : M.emulatetouch && (T.bind(o, "mousedown", T.ontouchstart), T.bind(o, "mousemove", function (e) {
                                return T.ontouchmove(e, !0)
                            }), M.grabcursorenabled && P.cursorgrabvalue && T.css(n(o.body), {
                                cursor: P.cursorgrabvalue
                            })), T.bind(o, "mouseup", T.ontouchend), T.zoom && (M.dblclickzoom && T.bind(o, "dblclick", T.doZoom), T.ongesturezoom && T.bind(o, "gestureend", T.ongesturezoom))
                        };
                        this.doc[0].readyState && "complete" === this.doc[0].readyState && setTimeout(function () {
                            _.call(T.doc[0], !1)
                        }, 500), T.bind(this.doc, "load", _)
                    }
                }, this.showCursor = function (e, o) {
                    if (T.cursortimeout && (clearTimeout(T.cursortimeout), T.cursortimeout = 0), T.rail) {
                        if (T.autohidedom && (T.autohidedom.stop().css({
                            opacity: M.cursoropacitymax
                        }), T.cursoractive = !0), T.rail.drag && 1 == T.rail.drag.pt || (void 0 !== e && !1 !== e && (T.scroll.y = e / T.scrollratio.y | 0), void 0 !== o && (T.scroll.x = o / T.scrollratio.x | 0)), T.cursor.css({
                            height: T.cursorheight,
                            top: T.scroll.y
                        }), T.cursorh) {
                            var t = T.hasreversehr ? T.scrollvaluemaxw - T.scroll.x : T.scroll.x;
                            T.cursorh.css({
                                width: T.cursorwidth,
                                left: !T.rail.align && T.rail.visibility ? t + T.rail.width : t
                            }), T.cursoractive = !0
                        }
                        T.zoom && T.zoom.stop().css({
                            opacity: M.cursoropacitymax
                        })
                    }
                }, this.hideCursor = function (e) {
                    T.cursortimeout || T.rail && T.autohidedom && (T.hasmousefocus && "leave" === M.autohidemode || (T.cursortimeout = setTimeout(function () {
                        T.rail.active && T.showonmouseevent || (T.autohidedom.stop().animate({
                            opacity: M.cursoropacitymin
                        }), T.zoom && T.zoom.stop().animate({
                            opacity: M.cursoropacitymin
                        }), T.cursoractive = !1), T.cursortimeout = 0
                    }, e || M.hidecursordelay)))
                }, this.noticeCursor = function (e, o, t) {
                    T.showCursor(o, t), T.rail.active || T.hideCursor(e)
                }, this.getContentSize = T.ispage ? function () {
                    return {
                        w: Math.max(l.body.scrollWidth, l.documentElement.scrollWidth),
                        h: Math.max(l.body.scrollHeight, l.documentElement.scrollHeight)
                    }
                } : T.haswrapper ? function () {
                    return {
                        w: T.doc[0].offsetWidth,
                        h: T.doc[0].offsetHeight
                    }
                } : function () {
                    return {
                        w: T.docscroll[0].scrollWidth,
                        h: T.docscroll[0].scrollHeight
                    }
                }, this.onResize = function (e, o) {
                    if (!T || !T.win) return !1;
                    var t = T.page.maxh,
                        r = T.page.maxw,
                        i = T.view.h,
                        s = T.view.w;
                    if (T.view = {
                        w: T.ispage ? T.win.width() : T.win[0].clientWidth,
                        h: T.ispage ? T.win.height() : T.win[0].clientHeight
                    }, T.page = o || T.getContentSize(), T.page.maxh = Math.max(0, T.page.h - T.view.h), T.page.maxw = Math.max(0, T.page.w - T.view.w), T.page.maxh == t && T.page.maxw == r && T.view.w == s && T.view.h == i) {
                        if (T.ispage) return T;
                        var n = T.win.offset();
                        if (T.lastposition) {
                            var l = T.lastposition;
                            if (l.top == n.top && l.left == n.left) return T
                        }
                        T.lastposition = n
                    }
                    return 0 === T.page.maxh ? (T.hideRail(), T.scrollvaluemax = 0, T.scroll.y = 0, T.scrollratio.y = 0, T.cursorheight = 0, T.setScrollTop(0), T.rail && (T.rail.scrollable = !1)) : (T.page.maxh -= M.railpadding.top + M.railpadding.bottom, T.rail.scrollable = !0), 0 === T.page.maxw ? (T.hideRailHr(), T.scrollvaluemaxw = 0, T.scroll.x = 0, T.scrollratio.x = 0, T.cursorwidth = 0, T.setScrollLeft(0), T.railh && (T.railh.scrollable = !1)) : (T.page.maxw -= M.railpadding.left + M.railpadding.right, T.railh && (T.railh.scrollable = M.horizrailenabled)), T.railslocked = T.locked || 0 === T.page.maxh && 0 === T.page.maxw, T.railslocked ? (T.ispage || T.updateScrollBar(T.view), !1) : (T.hidden || (T.rail.visibility || T.showRail(), T.railh && !T.railh.visibility && T.showRailHr()), T.istextarea && T.win.css("resize") && "none" != T.win.css("resize") && (T.view.h -= 20), T.cursorheight = Math.min(T.view.h, Math.round(T.view.h * (T.view.h / T.page.h))), T.cursorheight = M.cursorfixedheight ? M.cursorfixedheight : Math.max(M.cursorminheight, T.cursorheight), T.cursorwidth = Math.min(T.view.w, Math.round(T.view.w * (T.view.w / T.page.w))), T.cursorwidth = M.cursorfixedheight ? M.cursorfixedheight : Math.max(M.cursorminheight, T.cursorwidth), T.scrollvaluemax = T.view.h - T.cursorheight - (M.railpadding.top + M.railpadding.bottom), T.hasborderbox || (T.scrollvaluemax -= T.cursor[0].offsetHeight - T.cursor[0].clientHeight), T.railh && (T.railh.width = T.page.maxh > 0 ? T.view.w - T.rail.width : T.view.w, T.scrollvaluemaxw = T.railh.width - T.cursorwidth - (M.railpadding.left + M.railpadding.right)), T.ispage || T.updateScrollBar(T.view), T.scrollratio = {
                        x: T.page.maxw / T.scrollvaluemaxw,
                        y: T.page.maxh / T.scrollvaluemax
                    }, T.getScrollTop() > T.page.maxh ? T.doScrollTop(T.page.maxh) : (T.scroll.y = T.getScrollTop() / T.scrollratio.y | 0, T.scroll.x = T.getScrollLeft() / T.scrollratio.x | 0, T.cursoractive && T.noticeCursor()), T.scroll.y && 0 === T.getScrollTop() && T.doScrollTo(T.scroll.y * T.scrollratio.y | 0), T)
                }, this.resize = T.onResize;
                var O = 0;
                this.onscreenresize = function (e) {
                    clearTimeout(O);
                    var o = !T.ispage && !T.haswrapper;
                    o && T.hideRails(), O = setTimeout(function () {
                        T && (o && T.showRails(), T.resize()), O = 0
                    }, 120)
                }, this.lazyResize = function (e) {
                    return clearTimeout(O), e = isNaN(e) ? 240 : e, O = setTimeout(function () {
                        T && T.resize(), O = 0
                    }, e), T
                }, this.jqbind = function (e, o, t) {
                    T.events.push({
                        e: e,
                        n: o,
                        f: t,
                        q: !0
                    }), n(e).on(o, t)
                }, this.mousewheel = function (e, o, t) {
                    var r = "jquery" in e ? e[0] : e;
                    if ("onwheel" in l.createElement("div")) T._bind(r, "wheel", o, t || !1); else {
                        var i = void 0 !== l.onmousewheel ? "mousewheel" : "DOMMouseScroll";
                        S(r, i, o, t || !1), "DOMMouseScroll" == i && S(r, "MozMousePixelScroll", o, t || !1)
                    }
                };
                var Y = !1;
                if (P.haseventlistener) {
                    try {
                        var H = Object.defineProperty({}, "passive", {
                            get: function () {
                                Y = !0
                            }
                        });
                        a.addEventListener("test", null, H)
                    } catch (e) {
                    }
                    this.stopPropagation = function (e) {
                        return !!e && ((e = e.original ? e.original : e).stopPropagation(), !1)
                    }, this.cancelEvent = function (e) {
                        return e.cancelable && e.preventDefault(), e.stopImmediatePropagation(), e.preventManipulation && e.preventManipulation(), !1
                    }
                } else Event.prototype.preventDefault = function () {
                    this.returnValue = !1
                }, Event.prototype.stopPropagation = function () {
                    this.cancelBubble = !0
                }, a.constructor.prototype.addEventListener = l.constructor.prototype.addEventListener = Element.prototype.addEventListener = function (e, o, t) {
                    this.attachEvent("on" + e, o)
                }, a.constructor.prototype.removeEventListener = l.constructor.prototype.removeEventListener = Element.prototype.removeEventListener = function (e, o, t) {
                    this.detachEvent("on" + e, o)
                }, this.cancelEvent = function (e) {
                    return (e = e || a.event) && (e.cancelBubble = !0, e.cancel = !0, e.returnValue = !1), !1
                }, this.stopPropagation = function (e) {
                    return (e = e || a.event) && (e.cancelBubble = !0), !1
                };
                this.delegate = function (e, o, t, r, i) {
                    var s = d[o] || !1;
                    s || (s = {
                        a: [],
                        l: [],
                        f: function (e) {
                            for (var o = s.l, t = !1, r = o.length - 1; r >= 0; r--)
                                if (!1 === (t = o[r].call(e.target, e))) return !1;
                            return t
                        }
                    }, T.bind(e, o, s.f, r, i), d[o] = s), T.ispage ? (s.a = [T.id].concat(s.a), s.l = [t].concat(s.l)) : (s.a.push(T.id), s.l.push(t))
                }, this.undelegate = function (e, o, t, r, i) {
                    var s = d[o] || !1;
                    if (s && s.l)
                        for (var n = 0, l = s.l.length; n < l; n++) s.a[n] === T.id && (s.a.splice(n), s.l.splice(n), 0 === s.a.length && (T._unbind(e, o, s.l.f), d[o] = null))
                }, this.bind = function (e, o, t, r, i) {
                    var s = "jquery" in e ? e[0] : e;
                    T._bind(s, o, t, r || !1, i || !1)
                }, this._bind = function (e, o, t, r, i) {
                    T.events.push({
                        e: e,
                        n: o,
                        f: t,
                        b: r,
                        q: !1
                    }), Y && i ? e.addEventListener(o, t, {
                        passive: !1,
                        capture: r
                    }) : e.addEventListener(o, t, r || !1)
                }, this._unbind = function (e, o, t, r) {
                    d[o] ? T.undelegate(e, o, t, r) : e.removeEventListener(o, t, r)
                }, this.unbindAll = function () {
                    for (var e = 0; e < T.events.length; e++) {
                        var o = T.events[e];
                        o.q ? o.e.unbind(o.n, o.f) : T._unbind(o.e, o.n, o.f, o.b)
                    }
                }, this.showRails = function () {
                    return T.showRail().showRailHr()
                }, this.showRail = function () {
                    return 0 === T.page.maxh || !T.ispage && "none" == T.win.css("display") || (T.rail.visibility = !0, T.rail.css("display", "block")), T
                }, this.showRailHr = function () {
                    return T.railh && (0 === T.page.maxw || !T.ispage && "none" == T.win.css("display") || (T.railh.visibility = !0, T.railh.css("display", "block"))), T
                }, this.hideRails = function () {
                    return T.hideRail().hideRailHr()
                }, this.hideRail = function () {
                    return T.rail.visibility = !1, T.rail.css("display", "none"), T
                }, this.hideRailHr = function () {
                    return T.railh && (T.railh.visibility = !1, T.railh.css("display", "none")), T
                }, this.show = function () {
                    return T.hidden = !1, T.railslocked = !1, T.showRails()
                }, this.hide = function () {
                    return T.hidden = !0, T.railslocked = !0, T.hideRails()
                }, this.toggle = function () {
                    return T.hidden ? T.show() : T.hide()
                }, this.remove = function () {
                    T.stop(), T.cursortimeout && clearTimeout(T.cursortimeout);
                    for (var e in T.delaylist) T.delaylist[e] && h(T.delaylist[e].h);
                    T.doZoomOut(), T.unbindAll(), P.isie9 && T.win[0].detachEvent("onpropertychange", T.onAttributeChange), !1 !== T.observer && T.observer.disconnect(), !1 !== T.observerremover && T.observerremover.disconnect(), !1 !== T.observerbody && T.observerbody.disconnect(), T.events = null, T.cursor && T.cursor.remove(), T.cursorh && T.cursorh.remove(), T.rail && T.rail.remove(), T.railh && T.railh.remove(), T.zoom && T.zoom.remove();
                    for (var o = 0; o < T.saved.css.length; o++) {
                        var t = T.saved.css[o];
                        t[0].css(t[1], void 0 === t[2] ? "" : t[2])
                    }
                    T.saved = !1, T.me.data("__nicescroll", "");
                    var r = n.nicescroll;
                    r.each(function (e) {
                        if (this && this.id === T.id) {
                            delete r[e];
                            for (var o = ++e; o < r.length; o++, e++) r[e] = r[o];
                            --r.length &&
                            delete r[r.length]
                        }
                    });
                    for (var i in T) T[i] = null,
                        delete T[i];
                    T = null
                }, this.scrollstart = function (e) {
                    return this.onscrollstart = e, T
                }, this.scrollend = function (e) {
                    return this.onscrollend = e, T
                }, this.scrollcancel = function (e) {
                    return this.onscrollcancel = e, T
                }, this.zoomin = function (e) {
                    return this.onzoomin = e, T
                }, this.zoomout = function (e) {
                    return this.onzoomout = e, T
                }, this.isScrollable = function (e) {
                    var o = e.target ? e.target : e;
                    if ("OPTION" == o.nodeName) return !0;
                    for (; o && 1 == o.nodeType && o !== this.me[0] && !/^BODY|HTML/.test(o.nodeName);) {
                        var t = n(o),
                            r = t.css("overflowY") || t.css("overflowX") || t.css("overflow") || "";
                        if (/scroll|auto/.test(r)) return o.clientHeight != o.scrollHeight;
                        o = !!o.parentNode && o.parentNode
                    }
                    return !1
                }, this.getViewport = function (e) {
                    for (var o = !(!e || !e.parentNode) && e.parentNode; o && 1 == o.nodeType && !/^BODY|HTML/.test(o.nodeName);) {
                        var t = n(o);
                        if (/fixed|absolute/.test(t.css("position"))) return t;
                        var r = t.css("overflowY") || t.css("overflowX") || t.css("overflow") || "";
                        if (/scroll|auto/.test(r) && o.clientHeight != o.scrollHeight) return t;
                        if (t.getNiceScroll().length > 0) return t;
                        o = !!o.parentNode && o.parentNode
                    }
                    return !1
                }, this.triggerScrollStart = function (e, o, t, r, i) {
                    if (T.onscrollstart) {
                        var s = {
                            type: "scrollstart",
                            current: {
                                x: e,
                                y: o
                            },
                            request: {
                                x: t,
                                y: r
                            },
                            end: {
                                x: T.newscrollx,
                                y: T.newscrolly
                            },
                            speed: i
                        };
                        T.onscrollstart.call(T, s)
                    }
                }, this.triggerScrollEnd = function () {
                    if (T.onscrollend) {
                        var e = T.getScrollLeft(),
                            o = T.getScrollTop(),
                            t = {
                                type: "scrollend",
                                current: {
                                    x: e,
                                    y: o
                                },
                                end: {
                                    x: e,
                                    y: o
                                }
                            };
                        T.onscrollend.call(T, t)
                    }
                };
                var B = 0,
                    X = 0,
                    D = 0,
                    A = 1,
                    q = !1;
                if (this.onmousewheel = function (e) {
                    if (T.wheelprevented || T.locked) return !1;
                    if (T.railslocked) return T.debounced("checkunlock", T.resize, 250), !1;
                    if (T.rail.drag) return T.cancelEvent(e);
                    if ("auto" === M.oneaxismousemode && 0 !== e.deltaX && (M.oneaxismousemode = !1), M.oneaxismousemode && 0 === e.deltaX && !T.rail.scrollable) return !T.railh || !T.railh.scrollable || T.onmousewheelhr(e);
                    var o = f(),
                        t = !1;
                    if (M.preservenativescrolling && T.checkarea + 600 < o && (T.nativescrollingarea = T.isScrollable(e), t = !0), T.checkarea = o, T.nativescrollingarea) return !0;
                    var r = k(e, !1, t);
                    return r && (T.checkarea = 0), r
                }, this.onmousewheelhr = function (e) {
                    if (!T.wheelprevented) {
                        if (T.railslocked || !T.railh.scrollable) return !0;
                        if (T.rail.drag) return T.cancelEvent(e);
                        var o = f(),
                            t = !1;
                        return M.preservenativescrolling && T.checkarea + 600 < o && (T.nativescrollingarea = T.isScrollable(e), t = !0), T.checkarea = o, !!T.nativescrollingarea || (T.railslocked ? T.cancelEvent(e) : k(e, !0, t))
                    }
                }, this.stop = function () {
                    return T.cancelScroll(), T.scrollmon && T.scrollmon.stop(), T.cursorfreezed = !1, T.scroll.y = Math.round(T.getScrollTop() * (1 / T.scrollratio.y)), T.noticeCursor(), T
                }, this.getTransitionSpeed = function (e) {
                    return 80 + e / 72 * M.scrollspeed | 0
                }, M.smoothscroll)
                    if (T.ishwscroll && P.hastransition && M.usetransition && M.smoothscroll) {
                        var j = "";
                        this.resetTransition = function () {
                            j = "", T.doc.css(P.prefixstyle + "transition-duration", "0ms")
                        }, this.prepareTransition = function (e, o) {
                            var t = o ? e : T.getTransitionSpeed(e),
                                r = t + "ms";
                            return j !== r && (j = r, T.doc.css(P.prefixstyle + "transition-duration", r)), t
                        }, this.doScrollLeft = function (e, o) {
                            var t = T.scrollrunning ? T.newscrolly : T.getScrollTop();
                            T.doScrollPos(e, t, o)
                        }, this.doScrollTop = function (e, o) {
                            var t = T.scrollrunning ? T.newscrollx : T.getScrollLeft();
                            T.doScrollPos(t, e, o)
                        }, this.cursorupdate = {
                            running: !1,
                            start: function () {
                                var e = this;
                                if (!e.running) {
                                    e.running = !0;
                                    var o = function () {
                                        e.running && u(o), T.showCursor(T.getScrollTop(), T.getScrollLeft()), T.notifyScrollEvent(T.win[0])
                                    };
                                    u(o)
                                }
                            },
                            stop: function () {
                                this.running = !1
                            }
                        }, this.doScrollPos = function (e, o, t) {
                            var r = T.getScrollTop(),
                                i = T.getScrollLeft();
                            if (((T.newscrolly - r) * (o - r) < 0 || (T.newscrollx - i) * (e - i) < 0) && T.cancelScroll(), M.bouncescroll ? (o < 0 ? o = o / 2 | 0 : o > T.page.maxh && (o = T.page.maxh + (o - T.page.maxh) / 2 | 0), e < 0 ? e = e / 2 | 0 : e > T.page.maxw && (e = T.page.maxw + (e - T.page.maxw) / 2 | 0)) : (o < 0 ? o = 0 : o > T.page.maxh && (o = T.page.maxh), e < 0 ? e = 0 : e > T.page.maxw && (e = T.page.maxw)), T.scrollrunning && e == T.newscrollx && o == T.newscrolly) return !1;
                            T.newscrolly = o, T.newscrollx = e;
                            var s = T.getScrollTop(),
                                n = T.getScrollLeft(),
                                l = {};
                            l.x = e - n, l.y = o - s;
                            var a = 0 | Math.sqrt(l.x * l.x + l.y * l.y),
                                c = T.prepareTransition(a);
                            T.scrollrunning || (T.scrollrunning = !0, T.triggerScrollStart(n, s, e, o, c), T.cursorupdate.start()), T.scrollendtrapped = !0, P.transitionend || (T.scrollendtrapped && clearTimeout(T.scrollendtrapped), T.scrollendtrapped = setTimeout(T.onScrollTransitionEnd, c)), T.setScrollTop(T.newscrolly), T.setScrollLeft(T.newscrollx)
                        }, this.cancelScroll = function () {
                            if (!T.scrollendtrapped) return !0;
                            var e = T.getScrollTop(),
                                o = T.getScrollLeft();
                            return T.scrollrunning = !1, P.transitionend || clearTimeout(P.transitionend), T.scrollendtrapped = !1, T.resetTransition(), T.setScrollTop(e), T.railh && T.setScrollLeft(o), T.timerscroll && T.timerscroll.tm && clearInterval(T.timerscroll.tm), T.timerscroll = !1, T.cursorfreezed = !1, T.cursorupdate.stop(), T.showCursor(e, o), T
                        }, this.onScrollTransitionEnd = function () {
                            if (T.scrollendtrapped) {
                                var e = T.getScrollTop(),
                                    o = T.getScrollLeft();
                                if (e < 0 ? e = 0 : e > T.page.maxh && (e = T.page.maxh), o < 0 ? o = 0 : o > T.page.maxw && (o = T.page.maxw), e != T.newscrolly || o != T.newscrollx) return T.doScrollPos(o, e, M.snapbackspeed);
                                T.scrollrunning && T.triggerScrollEnd(), T.scrollrunning = !1, T.scrollendtrapped = !1, T.resetTransition(), T.timerscroll = !1, T.setScrollTop(e), T.railh && T.setScrollLeft(o), T.cursorupdate.stop(), T.noticeCursor(!1, e, o), T.cursorfreezed = !1
                            }
                        }
                    } else this.doScrollLeft = function (e, o) {
                        var t = T.scrollrunning ? T.newscrolly : T.getScrollTop();
                        T.doScrollPos(e, t, o)
                    }, this.doScrollTop = function (e, o) {
                        var t = T.scrollrunning ? T.newscrollx : T.getScrollLeft();
                        T.doScrollPos(t, e, o)
                    }, this.doScrollPos = function (e, o, t) {
                        var r = T.getScrollTop(),
                            i = T.getScrollLeft();
                        ((T.newscrolly - r) * (o - r) < 0 || (T.newscrollx - i) * (e - i) < 0) && T.cancelScroll();
                        var s = !1;
                        if (T.bouncescroll && T.rail.visibility || (o < 0 ? (o = 0, s = !0) : o > T.page.maxh && (o = T.page.maxh, s = !0)), T.bouncescroll && T.railh.visibility || (e < 0 ? (e = 0, s = !0) : e > T.page.maxw && (e = T.page.maxw, s = !0)), T.scrollrunning && T.newscrolly === o && T.newscrollx === e) return !0;
                        T.newscrolly = o, T.newscrollx = e, T.dst = {}, T.dst.x = e - i, T.dst.y = o - r, T.dst.px = i, T.dst.py = r;
                        var n = 0 | Math.sqrt(T.dst.x * T.dst.x + T.dst.y * T.dst.y),
                            l = T.getTransitionSpeed(n);
                        T.bzscroll = {};
                        var a = s ? 1 : .58;
                        T.bzscroll.x = new R(i, T.newscrollx, l, 0, 0, a, 1), T.bzscroll.y = new R(r, T.newscrolly, l, 0, 0, a, 1);
                        f();
                        var c = function () {
                            if (T.scrollrunning) {
                                var e = T.bzscroll.y.getPos();
                                T.setScrollLeft(T.bzscroll.x.getNow()), T.setScrollTop(T.bzscroll.y.getNow()), e <= 1 ? T.timer = u(c) : (T.scrollrunning = !1, T.timer = 0, T.triggerScrollEnd())
                            }
                        };
                        T.scrollrunning || (T.triggerScrollStart(i, r, e, o, l), T.scrollrunning = !0, T.timer = u(c))
                    }, this.cancelScroll = function () {
                        return T.timer && h(T.timer), T.timer = 0, T.bzscroll = !1, T.scrollrunning = !1, T
                    };
                else this.doScrollLeft = function (e, o) {
                    var t = T.getScrollTop();
                    T.doScrollPos(e, t, o)
                }, this.doScrollTop = function (e, o) {
                    var t = T.getScrollLeft();
                    T.doScrollPos(t, e, o)
                }, this.doScrollPos = function (e, o, t) {
                    var r = e > T.page.maxw ? T.page.maxw : e;
                    r < 0 && (r = 0);
                    var i = o > T.page.maxh ? T.page.maxh : o;
                    i < 0 && (i = 0), T.synched("scroll", function () {
                        T.setScrollTop(i), T.setScrollLeft(r)
                    })
                }, this.cancelScroll = function () {
                };
                this.doScrollBy = function (e, o) {
                    z(0, e)
                }, this.doScrollLeftBy = function (e, o) {
                    z(e, 0)
                }, this.doScrollTo = function (e, o) {
                    var t = o ? Math.round(e * T.scrollratio.y) : e;
                    t < 0 ? t = 0 : t > T.page.maxh && (t = T.page.maxh), T.cursorfreezed = !1, T.doScrollTop(e)
                }, this.checkContentSize = function () {
                    var e = T.getContentSize();
                    e.h == T.page.h && e.w == T.page.w || T.resize(!1, e)
                }, T.onscroll = function (e) {
                    T.rail.drag || T.cursorfreezed || T.synched("scroll", function () {
                        T.scroll.y = Math.round(T.getScrollTop() / T.scrollratio.y), T.railh && (T.scroll.x = Math.round(T.getScrollLeft() / T.scrollratio.x)), T.noticeCursor()
                    })
                }, T.bind(T.docscroll, "scroll", T.onscroll), this.doZoomIn = function (e) {
                    if (!T.zoomactive) {
                        T.zoomactive = !0, T.zoomrestore = {
                            style: {}
                        };
                        var o = ["position", "top", "left", "zIndex", "backgroundColor", "marginTop", "marginBottom", "marginLeft", "marginRight"],
                            t = T.win[0].style;
                        for (var r in o) {
                            var i = o[r];
                            T.zoomrestore.style[i] = void 0 !== t[i] ? t[i] : ""
                        }
                        T.zoomrestore.style.width = T.win.css("width"), T.zoomrestore.style.height = T.win.css("height"), T.zoomrestore.padding = {
                            w: T.win.outerWidth() - T.win.width(),
                            h: T.win.outerHeight() - T.win.height()
                        }, P.isios4 && (T.zoomrestore.scrollTop = c.scrollTop(), c.scrollTop(0)), T.win.css({
                            position: P.isios4 ? "absolute" : "fixed",
                            top: 0,
                            left: 0,
                            zIndex: s + 100,
                            margin: 0
                        });
                        var n = T.win.css("backgroundColor");
                        return ("" === n || /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(n)) && T.win.css("backgroundColor", "#fff"), T.rail.css({
                            zIndex: s + 101
                        }), T.zoom.css({
                            zIndex: s + 102
                        }), T.zoom.css("backgroundPosition", "0 -18px"), T.resizeZoom(), T.onzoomin && T.onzoomin.call(T), T.cancelEvent(e)
                    }
                }, this.doZoomOut = function (e) {
                    if (T.zoomactive) return T.zoomactive = !1, T.win.css("margin", ""), T.win.css(T.zoomrestore.style), P.isios4 && c.scrollTop(T.zoomrestore.scrollTop), T.rail.css({
                        "z-index": T.zindex
                    }), T.zoom.css({
                        "z-index": T.zindex
                    }), T.zoomrestore = !1, T.zoom.css("backgroundPosition", "0 0"), T.onResize(), T.onzoomout && T.onzoomout.call(T), T.cancelEvent(e)
                }, this.doZoom = function (e) {
                    return T.zoomactive ? T.doZoomOut(e) : T.doZoomIn(e)
                }, this.resizeZoom = function () {
                    if (T.zoomactive) {
                        var e = T.getScrollTop();
                        T.win.css({
                            width: c.width() - T.zoomrestore.padding.w + "px",
                            height: c.height() - T.zoomrestore.padding.h + "px"
                        }), T.onResize(), T.setScrollTop(Math.min(T.page.maxh, e))
                    }
                }, this.init(), n.nicescroll.push(this)
            },
            y = function (e) {
                var o = this;
                this.nc = e, this.lastx = 0, this.lasty = 0, this.speedx = 0, this.speedy = 0, this.lasttime = 0, this.steptime = 0, this.snapx = !1, this.snapy = !1, this.demulx = 0, this.demuly = 0, this.lastscrollx = -1, this.lastscrolly = -1, this.chkx = 0, this.chky = 0, this.timer = 0, this.reset = function (e, t) {
                    o.stop(), o.steptime = 0, o.lasttime = f(), o.speedx = 0, o.speedy = 0, o.lastx = e, o.lasty = t, o.lastscrollx = -1, o.lastscrolly = -1
                }, this.update = function (e, t) {
                    var r = f();
                    o.steptime = r - o.lasttime, o.lasttime = r;
                    var i = t - o.lasty,
                        s = e - o.lastx,
                        n = o.nc.getScrollTop() + i,
                        l = o.nc.getScrollLeft() + s;
                    o.snapx = l < 0 || l > o.nc.page.maxw, o.snapy = n < 0 || n > o.nc.page.maxh, o.speedx = s, o.speedy = i, o.lastx = e, o.lasty = t
                }, this.stop = function () {
                    o.nc.unsynched("domomentum2d"), o.timer && clearTimeout(o.timer), o.timer = 0, o.lastscrollx = -1, o.lastscrolly = -1
                }, this.doSnapy = function (e, t) {
                    var r = !1;
                    t < 0 ? (t = 0, r = !0) : t > o.nc.page.maxh && (t = o.nc.page.maxh, r = !0), e < 0 ? (e = 0, r = !0) : e > o.nc.page.maxw && (e = o.nc.page.maxw, r = !0), r ? o.nc.doScrollPos(e, t, o.nc.opt.snapbackspeed) : o.nc.triggerScrollEnd()
                }, this.doMomentum = function (e) {
                    var t = f(),
                        r = e ? t + e : o.lasttime,
                        i = o.nc.getScrollLeft(),
                        s = o.nc.getScrollTop(),
                        n = o.nc.page.maxh,
                        l = o.nc.page.maxw;
                    o.speedx = l > 0 ? Math.min(60, o.speedx) : 0, o.speedy = n > 0 ? Math.min(60, o.speedy) : 0;
                    var a = r && t - r <= 60;
                    (s < 0 || s > n || i < 0 || i > l) && (a = !1);
                    var c = !(!o.speedy || !a) && o.speedy,
                        d = !(!o.speedx || !a) && o.speedx;
                    if (c || d) {
                        var u = Math.max(16, o.steptime);
                        if (u > 50) {
                            var h = u / 50;
                            o.speedx *= h, o.speedy *= h, u = 50
                        }
                        o.demulxy = 0, o.lastscrollx = o.nc.getScrollLeft(), o.chkx = o.lastscrollx, o.lastscrolly = o.nc.getScrollTop(), o.chky = o.lastscrolly;
                        var p = o.lastscrollx,
                            m = o.lastscrolly,
                            g = function () {
                                var e = f() - t > 600 ? .04 : .02;
                                o.speedx && (p = Math.floor(o.lastscrollx - o.speedx * (1 - o.demulxy)), o.lastscrollx = p, (p < 0 || p > l) && (e = .1)), o.speedy && (m = Math.floor(o.lastscrolly - o.speedy * (1 - o.demulxy)), o.lastscrolly = m, (m < 0 || m > n) && (e = .1)), o.demulxy = Math.min(1, o.demulxy + e), o.nc.synched("domomentum2d", function () {
                                    if (o.speedx) {
                                        o.nc.getScrollLeft();
                                        o.chkx = p, o.nc.setScrollLeft(p)
                                    }
                                    if (o.speedy) {
                                        o.nc.getScrollTop();
                                        o.chky = m, o.nc.setScrollTop(m)
                                    }
                                    o.timer || (o.nc.hideCursor(), o.doSnapy(p, m))
                                }), o.demulxy < 1 ? o.timer = setTimeout(g, u) : (o.stop(), o.nc.hideCursor(), o.doSnapy(p, m))
                            };
                        g()
                    } else o.doSnapy(o.nc.getScrollLeft(), o.nc.getScrollTop())
                }
            },
            x = e.fn.scrollTop;
        e.cssHooks.pageYOffset = {
            get: function (e, o, t) {
                var r = n.data(e, "__nicescroll") || !1;
                return r && r.ishwscroll ? r.getScrollTop() : x.call(e)
            },
            set: function (e, o) {
                var t = n.data(e, "__nicescroll") || !1;
                return t && t.ishwscroll ? t.setScrollTop(parseInt(o)) : x.call(e, o), this
            }
        }, e.fn.scrollTop = function (e) {
            if (void 0 === e) {
                var o = !!this[0] && (n.data(this[0], "__nicescroll") || !1);
                return o && o.ishwscroll ? o.getScrollTop() : x.call(this)
            }
            return this.each(function () {
                var o = n.data(this, "__nicescroll") || !1;
                o && o.ishwscroll ? o.setScrollTop(parseInt(e)) : x.call(n(this), e)
            })
        };
        var S = e.fn.scrollLeft;
        n.cssHooks.pageXOffset = {
            get: function (e, o, t) {
                var r = n.data(e, "__nicescroll") || !1;
                return r && r.ishwscroll ? r.getScrollLeft() : S.call(e)
            },
            set: function (e, o) {
                var t = n.data(e, "__nicescroll") || !1;
                return t && t.ishwscroll ? t.setScrollLeft(parseInt(o)) : S.call(e, o), this
            }
        }, e.fn.scrollLeft = function (e) {
            if (void 0 === e) {
                var o = !!this[0] && (n.data(this[0], "__nicescroll") || !1);
                return o && o.ishwscroll ? o.getScrollLeft() : S.call(this)
            }
            return this.each(function () {
                var o = n.data(this, "__nicescroll") || !1;
                o && o.ishwscroll ? o.setScrollLeft(parseInt(e)) : S.call(n(this), e)
            })
        };
        var z = function (e) {
            var o = this;
            if (this.length = 0, this.name = "nicescrollarray", this.each = function (e) {
                return n.each(o, e), o
            }, this.push = function (e) {
                o[o.length] = e, o.length++
            }, this.eq = function (e) {
                return o[e]
            }, e)
                for (var t = 0; t < e.length; t++) {
                    var r = n.data(e[t], "__nicescroll") || !1;
                    r && (this[this.length] = r, this.length++)
                }
            return this
        };
        !function (e, o, t) {
            for (var r = 0, i = o.length; r < i; r++) t(e, o[r])
        }(z.prototype, ["show", "hide", "toggle", "onResize", "resize", "remove", "stop", "doScrollPos"], function (e, o) {
            e[o] = function () {
                var e = arguments;
                return this.each(function () {
                    this[o].apply(this, e)
                })
            }
        }), e.fn.getNiceScroll = function (e) {
            return void 0 === e ? new z(this) : this[e] && n.data(this[e], "__nicescroll") || !1
        }, (e.expr.pseudos || e.expr[":"]).nicescroll = function (e) {
            return void 0 !== n.data(e, "__nicescroll")
        }, n.fn.niceScroll = function (e, o) {
            void 0 !== o || "object" != typeof e || "jquery" in e || (o = e, e = !1);
            var t = new z;
            return this.each(function () {
                var r = n(this),
                    i = n.extend({}, o);
                if (e) {
                    var s = n(e);
                    i.doc = s.length > 1 ? n(e, r) : s, i.win = r
                }
                !("doc" in i) || "win" in i || (i.win = r);
                var l = r.data("__nicescroll") || !1;
                l || (i.doc = i.doc || r, l = new b(i, r), r.data("__nicescroll", l)), t.push(l)
            }), 1 === t.length ? t[0] : t
        }, a.NiceScroll = {
            getjQuery: function () {
                return e
            }
        }, n.nicescroll || (n.nicescroll = new z, n.nicescroll.options = g)
    });

    //nicescroll
    var scrollEle = $(".left,.rightside,.nicescroll");

    try {
        if (inFrame)
            scrollEle = scrollEle.not(".left");
        if ($('.rightside').css('position') != "fixed")
            scrollEle = scrollEle.not(".rightside");
    } catch (err) {
    }

    if (!isMobile && !isWebKit && !isIE && !isEdge && scrollEle.length > 0) {
        scrollEle.niceScroll({
            cursorcolor: "#000000", // 改变滚动条颜色，使用16进制颜色值
            cursoropacitymin: 0, // 当滚动条是隐藏状态时改变透明度, 值范围 1 到 0
            cursoropacitymax: 0.25, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
            cursorwidth: "8px", // 滚动条的宽度，单位：便素
            cursorborder: "1px solid transparent", // CSS方式定义滚动条边框
            cursorborderradius: "0px", // 滚动条圆角（像素）
            zindex: "auto", // 改变滚动条的DIV的z-index值
            scrollspeed: 60, // 滚动速度
            mousescrollstep: 40, // 鼠标滚轮的滚动速度 (像素)
            touchbehavior: true, // 激活拖拽滚动
            hwacceleration: true, // 激活硬件加速
            boxzoom: false, // 激活放大box的内容
            dblclickzoom: true, // (仅当 boxzoom=true时有效)双击box时放大
            gesturezoom: true, // (仅 boxzoom=true 和触屏设备时有效) 激活变焦当out/in（两个手指外张或收缩）
            grabcursorenabled: true, // (仅当 touchbehavior=true) 显示“抓住”图标display "grab" icon
            autohidemode: "hidden", // 隐藏滚动条的方式, 可用的值:
            //true | // 无滚动时隐藏
            //"cursor" | // 隐藏
            //false | // 不隐藏,
            //"leave" | // 仅在指针离开内容时隐藏
            //"hidden" | // 一直隐藏
            //"scroll", // 仅在滚动时显示
            background: "", // 轨道的背景颜色
            iframeautoresize: true, // 在加载事件时自动重置iframe大小
            cursorminheight: 32, // 设置滚动条的最小高度 (像素)
            preservenativescrolling: true, // 你可以用鼠标滚动可滚动区域的滚动条和增加鼠标滚轮事件
            railoffset: false, // 可以使用top/left来修正位置
            bouncescroll: false, // (only hw accell) 启用滚动跳跃的内容移动
            spacebarenabled: true, // 当按下空格时使页面向下滚动
            railpadding: {
                top: 0,
                right: 0,
                left: 0,
                bottom: 0
            }, // 设置轨道的内间距
            disableoutline: true, // 当选中一个使用nicescroll的div时，chrome浏览器中禁用outline
            horizrailenabled: true, // nicescroll可以管理水平滚动
            railalign: "right", // 对齐垂直轨道
            railvalign: "bottom", // 对齐水平轨道
            enabletranslate3d: true, // nicescroll 可以使用CSS变型来滚动内容
            enablemousewheel: true, // nicescroll可以管理鼠标滚轮事件
            enablekeyboard: true, // nicescroll可以管理键盘事件
            smoothscroll: true, // ease动画滚动
            sensitiverail: true, // 单击轨道产生滚动
            enablemouselockapi: true, // 可以用鼠标锁定API标题 (类似对象拖动)
            cursorfixedheight: false, // 修正光标的高度（像素）
            hidecursordelay: 400, // 设置滚动条淡出的延迟时间（毫秒）
            directionlockdeadzone: 6, // 设定死区，为激活方向锁定（像素）
            nativeparentscrolling: true, // 检测内容底部便于让父级滚动
            enablescrollonselection: true, // 当选择文本时激活内容自动滚动
            cursordragspeed: 0.3, // 设置拖拽的速度
            rtlmode: "auto", // DIV的水平滚动从左边开始
            cursordragontouch: false, // 使用触屏模式来实现拖拽
            oneaxismousemode: "auto", // 当只有水平滚动时可以用鼠标滚轮来滚动，如果设为false则不支持水平滚动，如果设为auto支持双轴滚动
            scriptpath: "", // 为boxmode图片自定义路径 ("" => same script path)
            preventmultitouchscrolling: true // 防止多触点事件引发滚动
        });

        $(window).resize(function () {
            scrollEle.getNiceScroll().resize();
        });

    } //end ismobile

//end ready
});

/*!
 * @fileOverview TouchSwipe - jQuery Plugin
 * @version 1.6.18
 *
 * @author Matt Bryson http://www.github.com/mattbryson
 * @see https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
 * @see http://labs.rampinteractive.co.uk/touchSwipe/
 * @see http://plugins.jquery.com/project/touchSwipe
 * @license
 * Copyright (c) 2010-2015 Matt Bryson
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */
!function (factory) {
    "function" == typeof define && define.amd && define.amd.jQuery ? define(["jquery"], factory) : factory("undefined" != typeof module && module.exports ? require("jquery") : jQuery)
}(function ($) {
    "use strict";

    function init(options) {
        return !options || void 0 !== options.allowPageScroll || void 0 === options.swipe && void 0 === options.swipeStatus || (options.allowPageScroll = NONE), void 0 !== options.click && void 0 === options.tap && (options.tap = options.click), options || (options = {}), options = $.extend({}, $.fn.swipe.defaults, options), this.each(function () {
            var $this = $(this),
                plugin = $this.data(PLUGIN_NS);
            plugin || (plugin = new TouchSwipe(this, options), $this.data(PLUGIN_NS, plugin))
        })
    }

    function TouchSwipe(element, options) {
        function touchStart(jqEvent) {
            if (!(getTouchInProgress() || $(jqEvent.target).closest(options.excludedElements, $element).length > 0)) {
                var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent;
                if (!event.pointerType || "mouse" != event.pointerType || 0 != options.fallbackToMouseEvents) {
                    var ret,
                        touches = event.touches,
                        evt = touches ? touches[0] : event;
                    return phase = PHASE_START, touches ? fingerCount = touches.length : options.preventDefaultEvents !== !1 && jqEvent.preventDefault(), distance = 0, direction = null, currentDirection = null, pinchDirection = null, duration = 0, startTouchesDistance = 0, endTouchesDistance = 0, pinchZoom = 1, pinchDistance = 0, maximumsMap = createMaximumsData(), cancelMultiFingerRelease(), createFingerData(0, evt), !touches || fingerCount === options.fingers || options.fingers === ALL_FINGERS || hasPinches() ? (startTime = getTimeStamp(), 2 == fingerCount && (createFingerData(1, touches[1]), startTouchesDistance = endTouchesDistance = calculateTouchesDistance(fingerData[0].start, fingerData[1].start)), (options.swipeStatus || options.pinchStatus) && (ret = triggerHandler(event, phase))) : ret = !1, ret === !1 ? (phase = PHASE_CANCEL, triggerHandler(event, phase), ret) : (options.hold && (holdTimeout = setTimeout($.proxy(function () {
                        $element.trigger("hold", [event.target]), options.hold && (ret = options.hold.call($element, event, event.target))
                    }, this), options.longTapThreshold)), setTouchInProgress(!0), null)
                }
            }
        }

        function touchMove(jqEvent) {
            var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent;
            if (phase !== PHASE_END && phase !== PHASE_CANCEL && !inMultiFingerRelease()) {
                var ret,
                    touches = event.touches,
                    evt = touches ? touches[0] : event,
                    currentFinger = updateFingerData(evt);
                if (endTime = getTimeStamp(), touches && (fingerCount = touches.length), options.hold && clearTimeout(holdTimeout), phase = PHASE_MOVE, 2 == fingerCount && (0 == startTouchesDistance ? (createFingerData(1, touches[1]), startTouchesDistance = endTouchesDistance = calculateTouchesDistance(fingerData[0].start, fingerData[1].start)) : (updateFingerData(touches[1]), endTouchesDistance = calculateTouchesDistance(fingerData[0].end, fingerData[1].end), pinchDirection = calculatePinchDirection(fingerData[0].end, fingerData[1].end)), pinchZoom = calculatePinchZoom(startTouchesDistance, endTouchesDistance), pinchDistance = Math.abs(startTouchesDistance - endTouchesDistance)), fingerCount === options.fingers || options.fingers === ALL_FINGERS || !touches || hasPinches()) {
                    if (direction = calculateDirection(currentFinger.start, currentFinger.end), currentDirection = calculateDirection(currentFinger.last, currentFinger.end), validateDefaultEvent(jqEvent, currentDirection), distance = calculateDistance(currentFinger.start, currentFinger.end), duration = calculateDuration(), setMaxDistance(direction, distance), ret = triggerHandler(event, phase), !options.triggerOnTouchEnd || options.triggerOnTouchLeave) {
                        var inBounds = !0;
                        if (options.triggerOnTouchLeave) {
                            var bounds = getbounds(this);
                            inBounds = isInBounds(currentFinger.end, bounds)
                        }
                        !options.triggerOnTouchEnd && inBounds ? phase = getNextPhase(PHASE_MOVE) : options.triggerOnTouchLeave && !inBounds && (phase = getNextPhase(PHASE_END)), phase != PHASE_CANCEL && phase != PHASE_END || triggerHandler(event, phase)
                    }
                } else phase = PHASE_CANCEL, triggerHandler(event, phase);
                ret === !1 && (phase = PHASE_CANCEL, triggerHandler(event, phase))
            }
        }

        function touchEnd(jqEvent) {
            var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent,
                touches = event.touches;
            if (touches) {
                if (touches.length && !inMultiFingerRelease()) return startMultiFingerRelease(event), !0;
                if (touches.length && inMultiFingerRelease()) return !0
            }
            return inMultiFingerRelease() && (fingerCount = fingerCountAtRelease), endTime = getTimeStamp(), duration = calculateDuration(), didSwipeBackToCancel() || !validateSwipeDistance() ? (phase = PHASE_CANCEL, triggerHandler(event, phase)) : options.triggerOnTouchEnd || options.triggerOnTouchEnd === !1 && phase === PHASE_MOVE ? (options.preventDefaultEvents !== !1 && jqEvent.cancelable !== !1 && jqEvent.preventDefault(), phase = PHASE_END, triggerHandler(event, phase)) : !options.triggerOnTouchEnd && hasTap() ? (phase = PHASE_END, triggerHandlerForGesture(event, phase, TAP)) : phase === PHASE_MOVE && (phase = PHASE_CANCEL, triggerHandler(event, phase)), setTouchInProgress(!1), null
        }

        function touchCancel() {
            fingerCount = 0, endTime = 0, startTime = 0, startTouchesDistance = 0, endTouchesDistance = 0, pinchZoom = 1, cancelMultiFingerRelease(), setTouchInProgress(!1)
        }

        function touchLeave(jqEvent) {
            var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent;
            options.triggerOnTouchLeave && (phase = getNextPhase(PHASE_END), triggerHandler(event, phase))
        }

        function removeListeners() {
            $element.off(START_EV, touchStart), $element.off(CANCEL_EV, touchCancel), $element.off(MOVE_EV, touchMove), $element.off(END_EV, touchEnd), LEAVE_EV && $element.off(LEAVE_EV, touchLeave), setTouchInProgress(!1)
        }

        function getNextPhase(currentPhase) {
            var nextPhase = currentPhase,
                validTime = validateSwipeTime(),
                validDistance = validateSwipeDistance(),
                didCancel = didSwipeBackToCancel();
            return !validTime || didCancel ? nextPhase = PHASE_CANCEL : !validDistance || currentPhase != PHASE_MOVE || options.triggerOnTouchEnd && !options.triggerOnTouchLeave ? !validDistance && currentPhase == PHASE_END && options.triggerOnTouchLeave && (nextPhase = PHASE_CANCEL) : nextPhase = PHASE_END, nextPhase
        }

        function triggerHandler(event, phase) {
            var ret,
                touches = event.touches;
            return (didSwipe() || hasSwipes()) && (ret = triggerHandlerForGesture(event, phase, SWIPE)), (didPinch() || hasPinches()) && ret !== !1 && (ret = triggerHandlerForGesture(event, phase, PINCH)), didDoubleTap() && ret !== !1 ? ret = triggerHandlerForGesture(event, phase, DOUBLE_TAP) : didLongTap() && ret !== !1 ? ret = triggerHandlerForGesture(event, phase, LONG_TAP) : didTap() && ret !== !1 && (ret = triggerHandlerForGesture(event, phase, TAP)), phase === PHASE_CANCEL && touchCancel(event), phase === PHASE_END && (touches ? touches.length || touchCancel(event) : touchCancel(event)), ret
        }

        function triggerHandlerForGesture(event, phase, gesture) {
            var ret;
            if (gesture == SWIPE) {
                if ($element.trigger("swipeStatus", [phase, direction || null, distance || 0, duration || 0, fingerCount, fingerData, currentDirection]), options.swipeStatus && (ret = options.swipeStatus.call($element, event, phase, direction || null, distance || 0, duration || 0, fingerCount, fingerData, currentDirection), ret === !1)) return !1;
                if (phase == PHASE_END && validateSwipe()) {
                    if (clearTimeout(singleTapTimeout), clearTimeout(holdTimeout), $element.trigger("swipe", [direction, distance, duration, fingerCount, fingerData, currentDirection]), options.swipe && (ret = options.swipe.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection), ret === !1)) return !1;
                    switch (direction) {
                        case LEFT:
                            $element.trigger("swipeLeft", [direction, distance, duration, fingerCount, fingerData, currentDirection]), options.swipeLeft && (ret = options.swipeLeft.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection));
                            break;
                        case RIGHT:
                            $element.trigger("swipeRight", [direction, distance, duration, fingerCount, fingerData, currentDirection]), options.swipeRight && (ret = options.swipeRight.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection));
                            break;
                        case UP:
                            $element.trigger("swipeUp", [direction, distance, duration, fingerCount, fingerData, currentDirection]), options.swipeUp && (ret = options.swipeUp.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection));
                            break;
                        case DOWN:
                            $element.trigger("swipeDown", [direction, distance, duration, fingerCount, fingerData, currentDirection]), options.swipeDown && (ret = options.swipeDown.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection))
                    }
                }
            }
            if (gesture == PINCH) {
                if ($element.trigger("pinchStatus", [phase, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData]), options.pinchStatus && (ret = options.pinchStatus.call($element, event, phase, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData), ret === !1)) return !1;
                if (phase == PHASE_END && validatePinch()) switch (pinchDirection) {
                    case IN:
                        $element.trigger("pinchIn", [pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData]), options.pinchIn && (ret = options.pinchIn.call($element, event, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData));
                        break;
                    case OUT:
                        $element.trigger("pinchOut", [pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData]), options.pinchOut && (ret = options.pinchOut.call($element, event, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData))
                }
            }
            return gesture == TAP ? phase !== PHASE_CANCEL && phase !== PHASE_END || (clearTimeout(singleTapTimeout), clearTimeout(holdTimeout), hasDoubleTap() && !inDoubleTap() ? (doubleTapStartTime = getTimeStamp(), singleTapTimeout = setTimeout($.proxy(function () {
                doubleTapStartTime = null, $element.trigger("tap", [event.target]), options.tap && (ret = options.tap.call($element, event, event.target))
            }, this), options.doubleTapThreshold)) : (doubleTapStartTime = null, $element.trigger("tap", [event.target]), options.tap && (ret = options.tap.call($element, event, event.target)))) : gesture == DOUBLE_TAP ? phase !== PHASE_CANCEL && phase !== PHASE_END || (clearTimeout(singleTapTimeout), clearTimeout(holdTimeout), doubleTapStartTime = null, $element.trigger("doubletap", [event.target]), options.doubleTap && (ret = options.doubleTap.call($element, event, event.target))) : gesture == LONG_TAP && (phase !== PHASE_CANCEL && phase !== PHASE_END || (clearTimeout(singleTapTimeout), doubleTapStartTime = null, $element.trigger("longtap", [event.target]), options.longTap && (ret = options.longTap.call($element, event, event.target)))), ret
        }

        function validateSwipeDistance() {
            var valid = !0;
            return null !== options.threshold && (valid = distance >= options.threshold), valid
        }

        function didSwipeBackToCancel() {
            var cancelled = !1;
            return null !== options.cancelThreshold && null !== direction && (cancelled = getMaxDistance(direction) - distance >= options.cancelThreshold), cancelled
        }

        function validatePinchDistance() {
            return null !== options.pinchThreshold ? pinchDistance >= options.pinchThreshold : !0
        }

        function validateSwipeTime() {
            var result;
            return result = options.maxTimeThreshold ? !(duration >= options.maxTimeThreshold) : !0
        }

        function validateDefaultEvent(jqEvent, direction) {
            if (options.preventDefaultEvents !== !1)
                if (options.allowPageScroll === NONE) jqEvent.preventDefault(); else {
                    var auto = options.allowPageScroll === AUTO;
                    switch (direction) {
                        case LEFT:
                            (options.swipeLeft && auto || !auto && options.allowPageScroll != HORIZONTAL) && jqEvent.preventDefault();
                            break;
                        case RIGHT:
                            (options.swipeRight && auto || !auto && options.allowPageScroll != HORIZONTAL) && jqEvent.preventDefault();
                            break;
                        case UP:
                            (options.swipeUp && auto || !auto && options.allowPageScroll != VERTICAL) && jqEvent.preventDefault();
                            break;
                        case DOWN:
                            (options.swipeDown && auto || !auto && options.allowPageScroll != VERTICAL) && jqEvent.preventDefault();
                            break;
                        case NONE:
                    }
                }
        }

        function validatePinch() {
            var hasCorrectFingerCount = validateFingers(),
                hasEndPoint = validateEndPoint(),
                hasCorrectDistance = validatePinchDistance();
            return hasCorrectFingerCount && hasEndPoint && hasCorrectDistance
        }

        function hasPinches() {
            return !!(options.pinchStatus || options.pinchIn || options.pinchOut)
        }

        function didPinch() {
            return !(!validatePinch() || !hasPinches())
        }

        function validateSwipe() {
            var hasValidTime = validateSwipeTime(),
                hasValidDistance = validateSwipeDistance(),
                hasCorrectFingerCount = validateFingers(),
                hasEndPoint = validateEndPoint(),
                didCancel = didSwipeBackToCancel(),
                valid = !didCancel && hasEndPoint && hasCorrectFingerCount && hasValidDistance && hasValidTime;
            return valid
        }

        function hasSwipes() {
            return !!(options.swipe || options.swipeStatus || options.swipeLeft || options.swipeRight || options.swipeUp || options.swipeDown)
        }

        function didSwipe() {
            return !(!validateSwipe() || !hasSwipes())
        }

        function validateFingers() {
            return fingerCount === options.fingers || options.fingers === ALL_FINGERS || !SUPPORTS_TOUCH
        }

        function validateEndPoint() {
            return 0 !== fingerData[0].end.x
        }

        function hasTap() {
            return !!options.tap
        }

        function hasDoubleTap() {
            return !!options.doubleTap
        }

        function hasLongTap() {
            return !!options.longTap
        }

        function validateDoubleTap() {
            if (null == doubleTapStartTime) return !1;
            var now = getTimeStamp();
            return hasDoubleTap() && now - doubleTapStartTime <= options.doubleTapThreshold
        }

        function inDoubleTap() {
            return validateDoubleTap()
        }

        function validateTap() {
            return (1 === fingerCount || !SUPPORTS_TOUCH) && (isNaN(distance) || distance < options.threshold)
        }

        function validateLongTap() {
            return duration > options.longTapThreshold && DOUBLE_TAP_THRESHOLD > distance
        }

        function didTap() {
            return !(!validateTap() || !hasTap())
        }

        function didDoubleTap() {
            return !(!validateDoubleTap() || !hasDoubleTap())
        }

        function didLongTap() {
            return !(!validateLongTap() || !hasLongTap())
        }

        function startMultiFingerRelease(event) {
            previousTouchEndTime = getTimeStamp(), fingerCountAtRelease = event.touches.length + 1
        }

        function cancelMultiFingerRelease() {
            previousTouchEndTime = 0, fingerCountAtRelease = 0
        }

        function inMultiFingerRelease() {
            var withinThreshold = !1;
            if (previousTouchEndTime) {
                var diff = getTimeStamp() - previousTouchEndTime;
                diff <= options.fingerReleaseThreshold && (withinThreshold = !0)
            }
            return withinThreshold
        }

        function getTouchInProgress() {
            return !($element.data(PLUGIN_NS + "_intouch") !== !0)
        }

        function setTouchInProgress(val) {
            $element && (val === !0 ? ($element.on(MOVE_EV, touchMove), $element.on(END_EV, touchEnd), LEAVE_EV && $element.on(LEAVE_EV, touchLeave)) : ($element.off(MOVE_EV, touchMove, !1), $element.off(END_EV, touchEnd, !1), LEAVE_EV && $element.off(LEAVE_EV, touchLeave, !1)), $element.data(PLUGIN_NS + "_intouch", val === !0))
        }

        function createFingerData(id, evt) {
            var f = {
                start: {
                    x: 0,
                    y: 0
                },
                last: {
                    x: 0,
                    y: 0
                },
                end: {
                    x: 0,
                    y: 0
                }
            };
            return f.start.x = f.last.x = f.end.x = evt.pageX || evt.clientX, f.start.y = f.last.y = f.end.y = evt.pageY || evt.clientY, fingerData[id] = f, f
        }

        function updateFingerData(evt) {
            var id = void 0 !== evt.identifier ? evt.identifier : 0,
                f = getFingerData(id);
            return null === f && (f = createFingerData(id, evt)), f.last.x = f.end.x, f.last.y = f.end.y, f.end.x = evt.pageX || evt.clientX, f.end.y = evt.pageY || evt.clientY, f
        }

        function getFingerData(id) {
            return fingerData[id] || null
        }

        function setMaxDistance(direction, distance) {
            direction != NONE && (distance = Math.max(distance, getMaxDistance(direction)), maximumsMap[direction].distance = distance)
        }

        function getMaxDistance(direction) {
            return maximumsMap[direction] ? maximumsMap[direction].distance : void 0
        }

        function createMaximumsData() {
            var maxData = {};
            return maxData[LEFT] = createMaximumVO(LEFT), maxData[RIGHT] = createMaximumVO(RIGHT), maxData[UP] = createMaximumVO(UP), maxData[DOWN] = createMaximumVO(DOWN), maxData
        }

        function createMaximumVO(dir) {
            return {
                direction: dir,
                distance: 0
            }
        }

        function calculateDuration() {
            return endTime - startTime
        }

        function calculateTouchesDistance(startPoint, endPoint) {
            var diffX = Math.abs(startPoint.x - endPoint.x),
                diffY = Math.abs(startPoint.y - endPoint.y);
            return Math.round(Math.sqrt(diffX * diffX + diffY * diffY))
        }

        function calculatePinchZoom(startDistance, endDistance) {
            var percent = endDistance / startDistance * 1;
            return percent.toFixed(2)
        }

        function calculatePinchDirection() {
            return 1 > pinchZoom ? OUT : IN
        }

        function calculateDistance(startPoint, endPoint) {
            return Math.round(Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2)))
        }

        function calculateAngle(startPoint, endPoint) {
            var x = startPoint.x - endPoint.x,
                y = endPoint.y - startPoint.y,
                r = Math.atan2(y, x),
                angle = Math.round(180 * r / Math.PI);
            return 0 > angle && (angle = 360 - Math.abs(angle)), angle
        }

        function calculateDirection(startPoint, endPoint) {
            if (comparePoints(startPoint, endPoint)) return NONE;
            var angle = calculateAngle(startPoint, endPoint);
            return 45 >= angle && angle >= 0 ? LEFT : 360 >= angle && angle >= 315 ? LEFT : angle >= 135 && 225 >= angle ? RIGHT : angle > 45 && 135 > angle ? DOWN : UP
        }

        function getTimeStamp() {
            var now = new Date;
            return now.getTime()
        }

        function getbounds(el) {
            el = $(el);
            var offset = el.offset(),
                bounds = {
                    left: offset.left,
                    right: offset.left + el.outerWidth(),
                    top: offset.top,
                    bottom: offset.top + el.outerHeight()
                };
            return bounds
        }

        function isInBounds(point, bounds) {
            return point.x > bounds.left && point.x < bounds.right && point.y > bounds.top && point.y < bounds.bottom
        }

        function comparePoints(pointA, pointB) {
            return pointA.x == pointB.x && pointA.y == pointB.y
        }

        var options = $.extend({}, options),
            useTouchEvents = SUPPORTS_TOUCH || SUPPORTS_POINTER || !options.fallbackToMouseEvents,
            START_EV = useTouchEvents ? SUPPORTS_POINTER ? SUPPORTS_POINTER_IE10 ? "MSPointerDown" : "pointerdown" : "touchstart" : "mousedown",
            MOVE_EV = useTouchEvents ? SUPPORTS_POINTER ? SUPPORTS_POINTER_IE10 ? "MSPointerMove" : "pointermove" : "touchmove" : "mousemove",
            END_EV = useTouchEvents ? SUPPORTS_POINTER ? SUPPORTS_POINTER_IE10 ? "MSPointerUp" : "pointerup" : "touchend" : "mouseup",
            LEAVE_EV = useTouchEvents ? SUPPORTS_POINTER ? "mouseleave" : null : "mouseleave",
            CANCEL_EV = SUPPORTS_POINTER ? SUPPORTS_POINTER_IE10 ? "MSPointerCancel" : "pointercancel" : "touchcancel",
            distance = 0,
            direction = null,
            currentDirection = null,
            duration = 0,
            startTouchesDistance = 0,
            endTouchesDistance = 0,
            pinchZoom = 1,
            pinchDistance = 0,
            pinchDirection = 0,
            maximumsMap = null,
            $element = $(element),
            phase = "start",
            fingerCount = 0,
            fingerData = {},
            startTime = 0,
            endTime = 0,
            previousTouchEndTime = 0,
            fingerCountAtRelease = 0,
            doubleTapStartTime = 0,
            singleTapTimeout = null,
            holdTimeout = null;
        try {
            $element.on(START_EV, touchStart), $element.on(CANCEL_EV, touchCancel)
        } catch (e) {
            $.error("events not supported " + START_EV + "," + CANCEL_EV + " on jQuery.swipe")
        }
        this.enable = function () {
            return this.disable(), $element.on(START_EV, touchStart), $element.on(CANCEL_EV, touchCancel), $element
        }, this.disable = function () {
            return removeListeners(), $element
        }, this.destroy = function () {
            removeListeners(), $element.data(PLUGIN_NS, null), $element = null
        }, this.option = function (property, value) {
            if ("object" == typeof property)
                options = $.extend(options, property);
            else if (void 0 !== options[property]) {
                if (void 0 === value) return options[property];
                options[property] = value
            } else {
                if (!property) return options;
                $.error("Option " + property + " does not exist on jQuery.swipe.options")
            }
            return null
        }
    }

    var VERSION = "1.6.18",
        LEFT = "left",
        RIGHT = "right",
        UP = "up",
        DOWN = "down",
        IN = "in",
        OUT = "out",
        NONE = "none",
        AUTO = "auto",
        SWIPE = "swipe",
        PINCH = "pinch",
        TAP = "tap",
        DOUBLE_TAP = "doubletap",
        LONG_TAP = "longtap",
        HORIZONTAL = "horizontal",
        VERTICAL = "vertical",
        ALL_FINGERS = "all",
        DOUBLE_TAP_THRESHOLD = 10,
        PHASE_START = "start",
        PHASE_MOVE = "move",
        PHASE_END = "end",
        PHASE_CANCEL = "cancel",
        SUPPORTS_TOUCH = "ontouchstart" in window,
        SUPPORTS_POINTER_IE10 = window.navigator.msPointerEnabled && !window.PointerEvent && !SUPPORTS_TOUCH,
        SUPPORTS_POINTER = (window.PointerEvent || window.navigator.msPointerEnabled) && !SUPPORTS_TOUCH,
        PLUGIN_NS = "TouchSwipe",
        defaults = {
            fingers: 1,
            threshold: 75,
            cancelThreshold: null,
            pinchThreshold: 20,
            maxTimeThreshold: null,
            fingerReleaseThreshold: 250,
            longTapThreshold: 500,
            doubleTapThreshold: 200,
            swipe: null,
            swipeLeft: null,
            swipeRight: null,
            swipeUp: null,
            swipeDown: null,
            swipeStatus: null,
            pinchIn: null,
            pinchOut: null,
            pinchStatus: null,
            click: null,
            tap: null,
            doubleTap: null,
            longTap: null,
            hold: null,
            triggerOnTouchEnd: !0,
            triggerOnTouchLeave: !1,
            allowPageScroll: "auto",
            fallbackToMouseEvents: !0,
            excludedElements: ".noSwipe",
            preventDefaultEvents: !0
        };
    $.fn.swipe = function (method) {
        var $this = $(this),
            plugin = $this.data(PLUGIN_NS);
        if (plugin && "string" == typeof method) {
            if (plugin[method]) return plugin[method].apply(plugin, Array.prototype.slice.call(arguments, 1));
            $.error("Method " + method + " does not exist on jQuery.swipe")
        } else if (plugin && "object" == typeof method) plugin.option.apply(plugin, arguments);
        else if (!(plugin || "object" != typeof method && method)) return init.apply(this, arguments);
        return $this
    }, $.fn.swipe.version = VERSION, $.fn.swipe.defaults = defaults, $.fn.swipe.phases = {
        PHASE_START: PHASE_START,
        PHASE_MOVE: PHASE_MOVE,
        PHASE_END: PHASE_END,
        PHASE_CANCEL: PHASE_CANCEL
    }, $.fn.swipe.directions = {
        LEFT: LEFT,
        RIGHT: RIGHT,
        UP: UP,
        DOWN: DOWN,
        IN: IN,
        OUT: OUT
    }, $.fn.swipe.pageScroll = {
        NONE: NONE,
        HORIZONTAL: HORIZONTAL,
        VERTICAL: VERTICAL,
        AUTO: AUTO
    }, $.fn.swipe.fingers = {
        ONE: 1,
        TWO: 2,
        THREE: 3,
        FOUR: 4,
        FIVE: 5,
        ALL: ALL_FINGERS
    }
});

/*
  jShaker jQuery Plugin
  (C)2010 ajaxBlender.com
  For any questions please visit www.ajaxblender.com
  or email us at support@ajaxblender.com
*/

;(function ($) {
    var element = {};
    $.fn.jshaker = function () {
        element = $(this);
        element.css('position', 'relative');
        element.find('*').each(function (i, el) {
            $(el).css('position', 'relative');
        });

        var iFunc = function () {
            $.fn.jshaker.animate($(element));
        };
        setTimeout(iFunc, 50);
    };

    $.fn.jshaker.animate = function (el) {
        $.fn.jshaker.shake(el);
        el.find('*').each(function (i, el) {
            $.fn.jshaker.shake(el);
        });
        var iFunc = function () {
            $.fn.jshaker.animate(el);
        };
        setTimeout(iFunc, 50);
    }

    $.fn.jshaker.shake = function (el) {
        var pos = $(el).position();
        if (Math.random() > 0.5) {
            $(el).css('top', pos['top'] + Math.random() * 20 < 10 ? (Math.random() * 20 * (-1)) : Math.random() * 20);
        } else {
            $(el).css('left', pos['left'] + Math.random() * 20 < 10 ? (Math.random() * 20 * (-1)) : Math.random() * 20);
        }
    }
})(jQuery);

/* -----------------------------------------------
/* Author : Vincent Garreau  - vincentgarreau.com
/* MIT license: http://opensource.org/licenses/MIT
/* Demo / Generator : vincentgarreau.com/particles.js
/* GitHub : github.com/VincentGarreau/particles.js
/* How to use? : Check the GitHub README
/* v2.0.0
/* ----------------------------------------------- */
function hexToRgb(e) {
    var a = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    e = e.replace(a, function (e, a, t, i) {
        return a + a + t + t + i + i
    });
    var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
    return t ? {
        r: parseInt(t[1], 16),
        g: parseInt(t[2], 16),
        b: parseInt(t[3], 16)
    } : null
}

function clamp(e, a, t) {
    return Math.min(Math.max(e, a), t)
}

function isInArray(e, a) {
    return a.indexOf(e) > -1
}

var pJS = function (e, a) {
    var t = document.querySelector("#" + e + " > .particles-js-canvas-el");
    this.pJS = {
        canvas: {
            el: t,
            w: t.offsetWidth,
            h: t.offsetHeight
        },
        particles: {
            number: {
                value: 400,
                density: {
                    enable: !0,
                    value_area: 800
                }
            },
            color: {
                value: "#fff"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#ff0000"
                },
                polygon: {
                    nb_sides: 5
                },
                image: {
                    src: "",
                    width: 100,
                    height: 100
                }
            },
            opacity: {
                value: 1,
                random: !1,
                anim: {
                    enable: !1,
                    speed: 2,
                    opacity_min: 0,
                    sync: !1
                }
            },
            size: {
                value: 20,
                random: !1,
                anim: {
                    enable: !1,
                    speed: 20,
                    size_min: 0,
                    sync: !1
                }
            },
            line_linked: {
                enable: !0,
                distance: 100,
                color: "#fff",
                opacity: 1,
                width: 1
            },
            move: {
                enable: !0,
                speed: 2,
                direction: "none",
                random: !1,
                straight: !1,
                out_mode: "out",
                bounce: !1,
                attract: {
                    enable: !1,
                    rotateX: 3e3,
                    rotateY: 3e3
                }
            },
            array: []
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: !0,
                    mode: "grab"
                },
                onclick: {
                    enable: !0,
                    mode: "push"
                },
                resize: !0
            },
            modes: {
                grab: {
                    distance: 100,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 200,
                    size: 80,
                    duration: .4
                },
                repulse: {
                    distance: 200,
                    duration: .4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            },
            mouse: {}
        },
        retina_detect: !1,
        fn: {
            interact: {},
            modes: {},
            vendors: {}
        },
        tmp: {}
    };
    var i = this.pJS;
    a && Object.deepExtend(i, a), i.tmp.obj = {
        size_value: i.particles.size.value,
        size_anim_speed: i.particles.size.anim.speed,
        move_speed: i.particles.move.speed,
        line_linked_distance: i.particles.line_linked.distance,
        line_linked_width: i.particles.line_linked.width,
        mode_grab_distance: i.interactivity.modes.grab.distance,
        mode_bubble_distance: i.interactivity.modes.bubble.distance,
        mode_bubble_size: i.interactivity.modes.bubble.size,
        mode_repulse_distance: i.interactivity.modes.repulse.distance
    }, i.fn.retinaInit = function () {
        i.retina_detect && window.devicePixelRatio > 1 ? (i.canvas.pxratio = window.devicePixelRatio, i.tmp.retina = !0) : (i.canvas.pxratio = 1, i.tmp.retina = !1), i.canvas.w = i.canvas.el.offsetWidth * i.canvas.pxratio, i.canvas.h = i.canvas.el.offsetHeight * i.canvas.pxratio, i.particles.size.value = i.tmp.obj.size_value * i.canvas.pxratio, i.particles.size.anim.speed = i.tmp.obj.size_anim_speed * i.canvas.pxratio, i.particles.move.speed = i.tmp.obj.move_speed * i.canvas.pxratio, i.particles.line_linked.distance = i.tmp.obj.line_linked_distance * i.canvas.pxratio, i.interactivity.modes.grab.distance = i.tmp.obj.mode_grab_distance * i.canvas.pxratio, i.interactivity.modes.bubble.distance = i.tmp.obj.mode_bubble_distance * i.canvas.pxratio, i.particles.line_linked.width = i.tmp.obj.line_linked_width * i.canvas.pxratio, i.interactivity.modes.bubble.size = i.tmp.obj.mode_bubble_size * i.canvas.pxratio, i.interactivity.modes.repulse.distance = i.tmp.obj.mode_repulse_distance * i.canvas.pxratio
    }, i.fn.canvasInit = function () {
        i.canvas.ctx = i.canvas.el.getContext("2d")
    }, i.fn.canvasSize = function () {
        i.canvas.el.width = i.canvas.w, i.canvas.el.height = i.canvas.h, i && i.interactivity.events.resize && window.addEventListener("resize", function () {
            i.canvas.w = i.canvas.el.offsetWidth, i.canvas.h = i.canvas.el.offsetHeight, i.tmp.retina && (i.canvas.w *= i.canvas.pxratio, i.canvas.h *= i.canvas.pxratio), i.canvas.el.width = i.canvas.w, i.canvas.el.height = i.canvas.h, i.particles.move.enable || (i.fn.particlesEmpty(), i.fn.particlesCreate(), i.fn.particlesDraw(), i.fn.vendors.densityAutoParticles()), i.fn.vendors.densityAutoParticles()
        })
    }, i.fn.canvasPaint = function () {
        i.canvas.ctx.fillRect(0, 0, i.canvas.w, i.canvas.h)
    }, i.fn.canvasClear = function () {
        i.canvas.ctx.clearRect(0, 0, i.canvas.w, i.canvas.h)
    }, i.fn.particle = function (e, a, t) {
        if (this.radius = (i.particles.size.random ? Math.random() : 1) * i.particles.size.value, i.particles.size.anim.enable && (this.size_status = !1, this.vs = i.particles.size.anim.speed / 100, i.particles.size.anim.sync || (this.vs = this.vs * Math.random())), this.x = t ? t.x : Math.random() * i.canvas.w, this.y = t ? t.y : Math.random() * i.canvas.h, this.x > i.canvas.w - 2 * this.radius ? this.x = this.x - this.radius : this.x < 2 * this.radius && (this.x = this.x + this.radius), this.y > i.canvas.h - 2 * this.radius ? this.y = this.y - this.radius : this.y < 2 * this.radius && (this.y = this.y + this.radius), i.particles.move.bounce && i.fn.vendors.checkOverlap(this, t), this.color = {}, "object" == typeof e.value)
            if (e.value instanceof Array) {
                var s = e.value[Math.floor(Math.random() * i.particles.color.value.length)];
                this.color.rgb = hexToRgb(s)
            } else void 0 != e.value.r && void 0 != e.value.g && void 0 != e.value.b && (this.color.rgb = {
                r: e.value.r,
                g: e.value.g,
                b: e.value.b
            }), void 0 != e.value.h && void 0 != e.value.s && void 0 != e.value.l && (this.color.hsl = {
                h: e.value.h,
                s: e.value.s,
                l: e.value.l
            });
        else
            "random" == e.value ? this.color.rgb = {
                r: Math.floor(256 * Math.random()) + 0,
                g: Math.floor(256 * Math.random()) + 0,
                b: Math.floor(256 * Math.random()) + 0
            } : "string" == typeof e.value && (this.color = e, this.color.rgb = hexToRgb(this.color.value));
        this.opacity = (i.particles.opacity.random ? Math.random() : 1) * i.particles.opacity.value, i.particles.opacity.anim.enable && (this.opacity_status = !1, this.vo = i.particles.opacity.anim.speed / 100, i.particles.opacity.anim.sync || (this.vo = this.vo * Math.random()));
        var n = {};
        switch (i.particles.move.direction) {
            case "top":
                n = {
                    x: 0,
                    y: -1
                };
                break;
            case "top-right":
                n = {
                    x: .5,
                    y: -.5
                };
                break;
            case "right":
                n = {
                    x: 1,
                    y: -0
                };
                break;
            case "bottom-right":
                n = {
                    x: .5,
                    y: .5
                };
                break;
            case "bottom":
                n = {
                    x: 0,
                    y: 1
                };
                break;
            case "bottom-left":
                n = {
                    x: -.5,
                    y: 1
                };
                break;
            case "left":
                n = {
                    x: -1,
                    y: 0
                };
                break;
            case "top-left":
                n = {
                    x: -.5,
                    y: -.5
                };
                break;
            default:
                n = {
                    x: 0,
                    y: 0
                }
        }
        i.particles.move.straight ? (this.vx = n.x, this.vy = n.y, i.particles.move.random && (this.vx = this.vx * Math.random(), this.vy = this.vy * Math.random())) : (this.vx = n.x + Math.random() - .5, this.vy = n.y + Math.random() - .5), this.vx_i = this.vx, this.vy_i = this.vy;
        var r = i.particles.shape.type;
        if ("object" == typeof r) {
            if (r instanceof Array) {
                var c = r[Math.floor(Math.random() * r.length)];
                this.shape = c
            }
        } else
            this.shape = r;
        if ("image" == this.shape) {
            var o = i.particles.shape;
            this.img = {
                src: o.image.src,
                ratio: o.image.width / o.image.height
            }, this.img.ratio || (this.img.ratio = 1), "svg" == i.tmp.img_type && void 0 != i.tmp.source_svg && (i.fn.vendors.createSvgImg(this), i.tmp.pushing && (this.img.loaded = !1))
        }
    }, i.fn.particle.prototype.draw = function () {
        function e() {
            i.canvas.ctx.drawImage(r, a.x - t, a.y - t, 2 * t, 2 * t / a.img.ratio)
        }

        var a = this;
        if (void 0 != a.radius_bubble) var t = a.radius_bubble;
        else var t = a.radius;
        if (void 0 != a.opacity_bubble) var s = a.opacity_bubble;
        else var s = a.opacity;
        if (a.color.rgb) var n = "rgba(" + a.color.rgb.r + "," + a.color.rgb.g + "," + a.color.rgb.b + "," + s + ")";
        else var n = "hsla(" + a.color.hsl.h + "," + a.color.hsl.s + "%," + a.color.hsl.l + "%," + s + ")";
        switch (i.canvas.ctx.fillStyle = n, i.canvas.ctx.beginPath(), a.shape) {
            case "circle":
                i.canvas.ctx.arc(a.x, a.y, t, 0, 2 * Math.PI, !1);
                break;
            case "edge":
                i.canvas.ctx.rect(a.x - t, a.y - t, 2 * t, 2 * t);
                break;
            case "triangle":
                i.fn.vendors.drawShape(i.canvas.ctx, a.x - t, a.y + t / 1.66, 2 * t, 3, 2);
                break;
            case "polygon":
                i.fn.vendors.drawShape(i.canvas.ctx, a.x - t / (i.particles.shape.polygon.nb_sides / 3.5), a.y - t / .76, 2.66 * t / (i.particles.shape.polygon.nb_sides / 3), i.particles.shape.polygon.nb_sides, 1);
                break;
            case "star":
                i.fn.vendors.drawShape(i.canvas.ctx, a.x - 2 * t / (i.particles.shape.polygon.nb_sides / 4), a.y - t / 1.52, 2 * t * 2.66 / (i.particles.shape.polygon.nb_sides / 3), i.particles.shape.polygon.nb_sides, 2);
                break;
            case "image":
                if ("svg" == i.tmp.img_type) var r = a.img.obj;
                else var r = i.tmp.img_obj;
                r && e()
        }
        i.canvas.ctx.closePath(), i.particles.shape.stroke.width > 0 && (i.canvas.ctx.strokeStyle = i.particles.shape.stroke.color, i.canvas.ctx.lineWidth = i.particles.shape.stroke.width, i.canvas.ctx.stroke()), i.canvas.ctx.fill()
    }, i.fn.particlesCreate = function () {
        for (var e = 0; e < i.particles.number.value; e++) i.particles.array.push(new i.fn.particle(i.particles.color, i.particles.opacity.value))
    }, i.fn.particlesUpdate = function () {
        for (var e = 0; e < i.particles.array.length; e++) {
            var a = i.particles.array[e];
            if (i.particles.move.enable) {
                var t = i.particles.move.speed / 2;
                a.x += a.vx * t, a.y += a.vy * t
            }
            if (i.particles.opacity.anim.enable && (1 == a.opacity_status ? (a.opacity >= i.particles.opacity.value && (a.opacity_status = !1), a.opacity += a.vo) : (a.opacity <= i.particles.opacity.anim.opacity_min && (a.opacity_status = !0), a.opacity -= a.vo), a.opacity < 0 && (a.opacity = 0)), i.particles.size.anim.enable && (1 == a.size_status ? (a.radius >= i.particles.size.value && (a.size_status = !1), a.radius += a.vs) : (a.radius <= i.particles.size.anim.size_min && (a.size_status = !0), a.radius -= a.vs), a.radius < 0 && (a.radius = 0)), "bounce" == i.particles.move.out_mode) var s = {
                x_left: a.radius,
                x_right: i.canvas.w,
                y_top: a.radius,
                y_bottom: i.canvas.h
            };
            else var s = {
                x_left: -a.radius,
                x_right: i.canvas.w + a.radius,
                y_top: -a.radius,
                y_bottom: i.canvas.h + a.radius
            };
            switch (a.x - a.radius > i.canvas.w ? (a.x = s.x_left, a.y = Math.random() * i.canvas.h) : a.x + a.radius < 0 && (a.x = s.x_right, a.y = Math.random() * i.canvas.h), a.y - a.radius > i.canvas.h ? (a.y = s.y_top, a.x = Math.random() * i.canvas.w) : a.y + a.radius < 0 && (a.y = s.y_bottom, a.x = Math.random() * i.canvas.w), i.particles.move.out_mode) {
                case "bounce":
                    a.x + a.radius > i.canvas.w ? a.vx = -a.vx : a.x - a.radius < 0 && (a.vx = -a.vx), a.y + a.radius > i.canvas.h ? a.vy = -a.vy : a.y - a.radius < 0 && (a.vy = -a.vy)
            }
            if (isInArray("grab", i.interactivity.events.onhover.mode) && i.fn.modes.grabParticle(a), (isInArray("bubble", i.interactivity.events.onhover.mode) || isInArray("bubble", i.interactivity.events.onclick.mode)) && i.fn.modes.bubbleParticle(a), (isInArray("repulse", i.interactivity.events.onhover.mode) || isInArray("repulse", i.interactivity.events.onclick.mode)) && i.fn.modes.repulseParticle(a), i.particles.line_linked.enable || i.particles.move.attract.enable)
                for (var n = e + 1; n < i.particles.array.length; n++) {
                    var r = i.particles.array[n];
                    i.particles.line_linked.enable && i.fn.interact.linkParticles(a, r), i.particles.move.attract.enable && i.fn.interact.attractParticles(a, r), i.particles.move.bounce && i.fn.interact.bounceParticles(a, r)
                }
        }
    }, i.fn.particlesDraw = function () {
        i.canvas.ctx.clearRect(0, 0, i.canvas.w, i.canvas.h), i.fn.particlesUpdate();
        for (var e = 0; e < i.particles.array.length; e++) {
            var a = i.particles.array[e];
            a.draw()
        }
    }, i.fn.particlesEmpty = function () {
        i.particles.array = []
    }, i.fn.particlesRefresh = function () {
        cancelRequestAnimFrame(i.fn.checkAnimFrame), cancelRequestAnimFrame(i.fn.drawAnimFrame), i.tmp.source_svg = void 0, i.tmp.img_obj = void 0, i.tmp.count_svg = 0, i.fn.particlesEmpty(), i.fn.canvasClear(), i.fn.vendors.start()
    }, i.fn.interact.linkParticles = function (e, a) {
        var t = e.x - a.x,
            s = e.y - a.y,
            n = Math.sqrt(t * t + s * s);
        if (n <= i.particles.line_linked.distance) {
            var r = i.particles.line_linked.opacity - n / (1 / i.particles.line_linked.opacity) / i.particles.line_linked.distance;
            if (r > 0) {
                var c = i.particles.line_linked.color_rgb_line;
                i.canvas.ctx.strokeStyle = "rgba(" + c.r + "," + c.g + "," + c.b + "," + r + ")", i.canvas.ctx.lineWidth = i.particles.line_linked.width, i.canvas.ctx.beginPath(), i.canvas.ctx.moveTo(e.x, e.y), i.canvas.ctx.lineTo(a.x, a.y), i.canvas.ctx.stroke(), i.canvas.ctx.closePath()
            }
        }
    }, i.fn.interact.attractParticles = function (e, a) {
        var t = e.x - a.x,
            s = e.y - a.y,
            n = Math.sqrt(t * t + s * s);
        if (n <= i.particles.line_linked.distance) {
            var r = t / (1e3 * i.particles.move.attract.rotateX),
                c = s / (1e3 * i.particles.move.attract.rotateY);
            e.vx -= r, e.vy -= c, a.vx += r, a.vy += c
        }
    }, i.fn.interact.bounceParticles = function (e, a) {
        var t = e.x - a.x,
            i = e.y - a.y,
            s = Math.sqrt(t * t + i * i),
            n = e.radius + a.radius;
        n >= s && (e.vx = -e.vx, e.vy = -e.vy, a.vx = -a.vx, a.vy = -a.vy)
    }, i.fn.modes.pushParticles = function (e, a) {
        i.tmp.pushing = !0;
        for (var t = 0; e > t; t++) i.particles.array.push(new i.fn.particle(i.particles.color, i.particles.opacity.value, {
            x: a ? a.pos_x : Math.random() * i.canvas.w,
            y: a ? a.pos_y : Math.random() * i.canvas.h
        })), t == e - 1 && (i.particles.move.enable || i.fn.particlesDraw(), i.tmp.pushing = !1)
    }, i.fn.modes.removeParticles = function (e) {
        i.particles.array.splice(0, e), i.particles.move.enable || i.fn.particlesDraw()
    }, i.fn.modes.bubbleParticle = function (e) {
        function a() {
            e.opacity_bubble = e.opacity, e.radius_bubble = e.radius
        }

        function t(a, t, s, n, c) {
            if (a != t)
                if (i.tmp.bubble_duration_end) {
                    if (void 0 != s) {
                        var o = n - p * (n - a) / i.interactivity.modes.bubble.duration,
                            l = a - o;
                        d = a + l, "size" == c && (e.radius_bubble = d), "opacity" == c && (e.opacity_bubble = d)
                    }
                } else if (r <= i.interactivity.modes.bubble.distance) {
                    if (void 0 != s) var v = s;
                    else var v = n;
                    if (v != a) {
                        var d = n - p * (n - a) / i.interactivity.modes.bubble.duration;
                        "size" == c && (e.radius_bubble = d), "opacity" == c && (e.opacity_bubble = d)
                    }
                } else "size" == c && (e.radius_bubble = void 0), "opacity" == c && (e.opacity_bubble = void 0)
        }

        if (i.interactivity.events.onhover.enable && isInArray("bubble", i.interactivity.events.onhover.mode)) {
            var s = e.x - i.interactivity.mouse.pos_x,
                n = e.y - i.interactivity.mouse.pos_y,
                r = Math.sqrt(s * s + n * n),
                c = 1 - r / i.interactivity.modes.bubble.distance;
            if (r <= i.interactivity.modes.bubble.distance) {
                if (c >= 0 && "mousemove" == i.interactivity.status) {
                    if (i.interactivity.modes.bubble.size != i.particles.size.value)
                        if (i.interactivity.modes.bubble.size > i.particles.size.value) {
                            var o = e.radius + i.interactivity.modes.bubble.size * c;
                            o >= 0 && (e.radius_bubble = o)
                        } else {
                            var l = e.radius - i.interactivity.modes.bubble.size,
                                o = e.radius - l * c;
                            o > 0 ? e.radius_bubble = o : e.radius_bubble = 0
                        }
                    if (i.interactivity.modes.bubble.opacity != i.particles.opacity.value)
                        if (i.interactivity.modes.bubble.opacity > i.particles.opacity.value) {
                            var v = i.interactivity.modes.bubble.opacity * c;
                            v > e.opacity && v <= i.interactivity.modes.bubble.opacity && (e.opacity_bubble = v)
                        } else {
                            var v = e.opacity - (i.particles.opacity.value - i.interactivity.modes.bubble.opacity) * c;
                            v < e.opacity && v >= i.interactivity.modes.bubble.opacity && (e.opacity_bubble = v)
                        }
                }
            } else a();
            "mouseleave" == i.interactivity.status && a()
        } else if (i.interactivity.events.onclick.enable && isInArray("bubble", i.interactivity.events.onclick.mode)) {
            if (i.tmp.bubble_clicking) {
                var s = e.x - i.interactivity.mouse.click_pos_x,
                    n = e.y - i.interactivity.mouse.click_pos_y,
                    r = Math.sqrt(s * s + n * n),
                    p = ((new Date).getTime() - i.interactivity.mouse.click_time) / 1e3;
                p > i.interactivity.modes.bubble.duration && (i.tmp.bubble_duration_end = !0), p > 2 * i.interactivity.modes.bubble.duration && (i.tmp.bubble_clicking = !1, i.tmp.bubble_duration_end = !1)
            }
            i.tmp.bubble_clicking && (t(i.interactivity.modes.bubble.size, i.particles.size.value, e.radius_bubble, e.radius, "size"), t(i.interactivity.modes.bubble.opacity, i.particles.opacity.value, e.opacity_bubble, e.opacity, "opacity"))
        }
    }, i.fn.modes.repulseParticle = function (e) {
        function a() {
            var a = Math.atan2(d, p);
            if (e.vx = u * Math.cos(a), e.vy = u * Math.sin(a), "bounce" == i.particles.move.out_mode) {
                var t = {
                    x: e.x + e.vx,
                    y: e.y + e.vy
                };
                t.x + e.radius > i.canvas.w ? e.vx = -e.vx : t.x - e.radius < 0 && (e.vx = -e.vx), t.y + e.radius > i.canvas.h ? e.vy = -e.vy : t.y - e.radius < 0 && (e.vy = -e.vy)
            }
        }

        if (i.interactivity.events.onhover.enable && isInArray("repulse", i.interactivity.events.onhover.mode) && "mousemove" == i.interactivity.status) {
            var t = e.x - i.interactivity.mouse.pos_x,
                s = e.y - i.interactivity.mouse.pos_y,
                n = Math.sqrt(t * t + s * s),
                r = {
                    x: t / n,
                    y: s / n
                },
                c = i.interactivity.modes.repulse.distance,
                o = 100,
                l = clamp(1 / c * (-1 * Math.pow(n / c, 2) + 1) * c * o, 0, 50),
                v = {
                    x: e.x + r.x * l,
                    y: e.y + r.y * l
                };
            "bounce" == i.particles.move.out_mode ? (v.x - e.radius > 0 && v.x + e.radius < i.canvas.w && (e.x = v.x), v.y - e.radius > 0 && v.y + e.radius < i.canvas.h && (e.y = v.y)) : (e.x = v.x, e.y = v.y)
        } else if (i.interactivity.events.onclick.enable && isInArray("repulse", i.interactivity.events.onclick.mode))
            if (i.tmp.repulse_finish || (i.tmp.repulse_count++, i.tmp.repulse_count == i.particles.array.length && (i.tmp.repulse_finish = !0)), i.tmp.repulse_clicking) {
                var c = Math.pow(i.interactivity.modes.repulse.distance / 6, 3),
                    p = i.interactivity.mouse.click_pos_x - e.x,
                    d = i.interactivity.mouse.click_pos_y - e.y,
                    m = p * p + d * d,
                    u = -c / m * 1;
                c >= m && a()
            } else 0 == i.tmp.repulse_clicking && (e.vx = e.vx_i, e.vy = e.vy_i)
    }, i.fn.modes.grabParticle = function (e) {
        if (i.interactivity.events.onhover.enable && "mousemove" == i.interactivity.status) {
            var a = e.x - i.interactivity.mouse.pos_x,
                t = e.y - i.interactivity.mouse.pos_y,
                s = Math.sqrt(a * a + t * t);
            if (s <= i.interactivity.modes.grab.distance) {
                var n = i.interactivity.modes.grab.line_linked.opacity - s / (1 / i.interactivity.modes.grab.line_linked.opacity) / i.interactivity.modes.grab.distance;
                if (n > 0) {
                    var r = i.particles.line_linked.color_rgb_line;
                    i.canvas.ctx.strokeStyle = "rgba(" + r.r + "," + r.g + "," + r.b + "," + n + ")", i.canvas.ctx.lineWidth = i.particles.line_linked.width, i.canvas.ctx.beginPath(), i.canvas.ctx.moveTo(e.x, e.y), i.canvas.ctx.lineTo(i.interactivity.mouse.pos_x, i.interactivity.mouse.pos_y), i.canvas.ctx.stroke(), i.canvas.ctx.closePath()
                }
            }
        }
    }, i.fn.vendors.eventsListeners = function () {
        "window" == i.interactivity.detect_on ? i.interactivity.el = window : i.interactivity.el = i.canvas.el, (i.interactivity.events.onhover.enable || i.interactivity.events.onclick.enable) && (i.interactivity.el.addEventListener("mousemove", function (e) {
            if (i.interactivity.el == window) var a = e.clientX,
                t = e.clientY;
            else var a = e.offsetX || e.clientX,
                t = e.offsetY || e.clientY;
            i.interactivity.mouse.pos_x = a, i.interactivity.mouse.pos_y = t, i.tmp.retina && (i.interactivity.mouse.pos_x *= i.canvas.pxratio, i.interactivity.mouse.pos_y *= i.canvas.pxratio), i.interactivity.status = "mousemove"
        }), i.interactivity.el.addEventListener("mouseleave", function (e) {
            i.interactivity.mouse.pos_x = null, i.interactivity.mouse.pos_y = null, i.interactivity.status = "mouseleave"
        })), i.interactivity.events.onclick.enable && i.interactivity.el.addEventListener("click", function () {
            if (i.interactivity.mouse.click_pos_x = i.interactivity.mouse.pos_x, i.interactivity.mouse.click_pos_y = i.interactivity.mouse.pos_y, i.interactivity.mouse.click_time = (new Date).getTime(), i.interactivity.events.onclick.enable) switch (i.interactivity.events.onclick.mode) {
                case "push":
                    i.particles.move.enable ? i.fn.modes.pushParticles(i.interactivity.modes.push.particles_nb, i.interactivity.mouse) : 1 == i.interactivity.modes.push.particles_nb ? i.fn.modes.pushParticles(i.interactivity.modes.push.particles_nb, i.interactivity.mouse) : i.interactivity.modes.push.particles_nb > 1 && i.fn.modes.pushParticles(i.interactivity.modes.push.particles_nb);
                    break;
                case "remove":
                    i.fn.modes.removeParticles(i.interactivity.modes.remove.particles_nb);
                    break;
                case "bubble":
                    i.tmp.bubble_clicking = !0;
                    break;
                case "repulse":
                    i.tmp.repulse_clicking = !0, i.tmp.repulse_count = 0, i.tmp.repulse_finish = !1, setTimeout(function () {
                        i.tmp.repulse_clicking = !1
                    }, 1e3 * i.interactivity.modes.repulse.duration)
            }
        })
    }, i.fn.vendors.densityAutoParticles = function () {
        if (i.particles.number.density.enable) {
            var e = i.canvas.el.width * i.canvas.el.height / 1e3;
            i.tmp.retina && (e /= 2 * i.canvas.pxratio);
            var a = e * i.particles.number.value / i.particles.number.density.value_area,
                t = i.particles.array.length - a;
            0 > t ? i.fn.modes.pushParticles(Math.abs(t)) : i.fn.modes.removeParticles(t)
        }
    }, i.fn.vendors.checkOverlap = function (e, a) {
        for (var t = 0; t < i.particles.array.length; t++) {
            var s = i.particles.array[t],
                n = e.x - s.x,
                r = e.y - s.y,
                c = Math.sqrt(n * n + r * r);
            c <= e.radius + s.radius && (e.x = a ? a.x : Math.random() * i.canvas.w, e.y = a ? a.y : Math.random() * i.canvas.h, i.fn.vendors.checkOverlap(e))
        }
    }, i.fn.vendors.createSvgImg = function (e) {
        var a = i.tmp.source_svg,
            t = /#([0-9A-F]{3,6})/gi,
            s = a.replace(t, function (a, t, i, s) {
                if (e.color.rgb) var n = "rgba(" + e.color.rgb.r + "," + e.color.rgb.g + "," + e.color.rgb.b + "," + e.opacity + ")";
                else var n = "hsla(" + e.color.hsl.h + "," + e.color.hsl.s + "%," + e.color.hsl.l + "%," + e.opacity + ")";
                return n
            }),
            n = new Blob([s], {
                type: "image/svg+xml;charset=utf-8"
            }),
            r = window.URL || window.webkitURL || window,
            c = r.createObjectURL(n),
            o = new Image;
        o.addEventListener("load", function () {
            e.img.obj = o, e.img.loaded = !0, r.revokeObjectURL(c), i.tmp.count_svg++
        }), o.src = c
    }, i.fn.vendors.destroypJS = function () {
        cancelAnimationFrame(i.fn.drawAnimFrame), t.remove(), pJSDom = null
    }, i.fn.vendors.drawShape = function (e, a, t, i, s, n) {
        var r = s * n,
            c = s / n,
            o = 180 * (c - 2) / c,
            l = Math.PI - Math.PI * o / 180;
        e.save(), e.beginPath(), e.translate(a, t), e.moveTo(0, 0);
        for (var v = 0; r > v; v++) e.lineTo(i, 0), e.translate(i, 0), e.rotate(l);
        e.fill(), e.restore()
    }, i.fn.vendors.exportImg = function () {
        window.open(i.canvas.el.toDataURL("image/png"), "_blank")
    }, i.fn.vendors.loadImg = function (e) {
        if (i.tmp.img_error = void 0, "" != i.particles.shape.image.src)
            if ("svg" == e) {
                var a = new XMLHttpRequest;
                a.open("GET", i.particles.shape.image.src), a.onreadystatechange = function (e) {
                    4 == a.readyState && (200 == a.status ? (i.tmp.source_svg = e.currentTarget.response, i.fn.vendors.checkBeforeDraw()) : (console.log("Error pJS - Image not found"), i.tmp.img_error = !0))
                }, a.send()
            } else {
                var t = new Image;
                t.addEventListener("load", function () {
                    i.tmp.img_obj = t, i.fn.vendors.checkBeforeDraw()
                }), t.src = i.particles.shape.image.src
            }
        else console.log("Error pJS - No image.src"), i.tmp.img_error = !0
    }, i.fn.vendors.draw = function () {
        "image" == i.particles.shape.type ? "svg" == i.tmp.img_type ? i.tmp.count_svg >= i.particles.number.value ? (i.fn.particlesDraw(), i.particles.move.enable ? i.fn.drawAnimFrame = requestAnimFrame(i.fn.vendors.draw) : cancelRequestAnimFrame(i.fn.drawAnimFrame)) : i.tmp.img_error || (i.fn.drawAnimFrame = requestAnimFrame(i.fn.vendors.draw)) : void 0 != i.tmp.img_obj ? (i.fn.particlesDraw(), i.particles.move.enable ? i.fn.drawAnimFrame = requestAnimFrame(i.fn.vendors.draw) : cancelRequestAnimFrame(i.fn.drawAnimFrame)) : i.tmp.img_error || (i.fn.drawAnimFrame = requestAnimFrame(i.fn.vendors.draw)) : (i.fn.particlesDraw(), i.particles.move.enable ? i.fn.drawAnimFrame = requestAnimFrame(i.fn.vendors.draw) : cancelRequestAnimFrame(i.fn.drawAnimFrame))
    }, i.fn.vendors.checkBeforeDraw = function () {
        "image" == i.particles.shape.type ? "svg" == i.tmp.img_type && void 0 == i.tmp.source_svg ? i.tmp.checkAnimFrame = requestAnimFrame(check) : (cancelRequestAnimFrame(i.tmp.checkAnimFrame), i.tmp.img_error || (i.fn.vendors.init(), i.fn.vendors.draw())) : (i.fn.vendors.init(), i.fn.vendors.draw())
    }, i.fn.vendors.init = function () {
        i.fn.retinaInit(), i.fn.canvasInit(), i.fn.canvasSize(), i.fn.canvasPaint(), i.fn.particlesCreate(), i.fn.vendors.densityAutoParticles(), i.particles.line_linked.color_rgb_line = hexToRgb(i.particles.line_linked.color)
    }, i.fn.vendors.start = function () {
        isInArray("image", i.particles.shape.type) ? (i.tmp.img_type = i.particles.shape.image.src.substr(i.particles.shape.image.src.length - 3), i.fn.vendors.loadImg(i.tmp.img_type)) : i.fn.vendors.checkBeforeDraw()
    }, i.fn.vendors.eventsListeners(), i.fn.vendors.start()
};
Object.deepExtend = function (e, a) {
    for (var t in a) a[t] && a[t].constructor && a[t].constructor === Object ? (e[t] = e[t] || {}, arguments.callee(e[t], a[t])) : e[t] = a[t];
    return e
}, window.requestAnimFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (e) {
        window.setTimeout(e, 1e3 / 60)
    }
}(), window.cancelRequestAnimFrame = function () {
    return window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout
}(), window.pJSDom = [], window.particlesJS = function (e, a) {
    "string" != typeof e && (a = e, e = "particles-js"), e || (e = "particles-js");
    var t = document.getElementById(e),
        i = "particles-js-canvas-el",
        s = t.getElementsByClassName(i);
    if (s.length)
        for (; s.length > 0;) t.removeChild(s[0]);
    var n = document.createElement("canvas");
    n.className = i, n.style.width = "100%", n.style.height = "100%";
    var r = document.getElementById(e).appendChild(n);
    null != r && pJSDom.push(new pJS(e, a))
}, window.particlesJS.load = function (e, a, t) {
    var i = new XMLHttpRequest;
    i.open("GET", a), i.onreadystatechange = function (a) {
        if (4 == i.readyState)
            if (200 == i.status) {
                var s = JSON.parse(a.currentTarget.response);
                window.particlesJS(e, s), t && t()
            } else console.log("Error pJS - XMLHttpRequest status: " + i.status), console.log("Error pJS - File config not found")
    }, i.send()
};

/**
 * jQuery || Zepto Parallax Plugin
 * @author Matthew Wagerfield - @wagerfield
 * @description Creates a parallax effect between an array of layers,
 *              driving the motion from the gyroscope output of a smartdevice.
 *              If no gyroscope is available, the cursor position is used.
 */
;(function ($, window, document, undefined) {
    'use strict';
    var NAME = 'parallax';
    var MAGIC_NUMBER = 30;
    var DEFAULTS = {
        relativeInput: false,
        clipRelativeInput: false,
        calibrationThreshold: 100,
        calibrationDelay: 500,
        supportDelay: 500,
        calibrateX: false,
        calibrateY: true,
        invertX: true,
        invertY: true,
        limitX: false,
        limitY: false,
        scalarX: 10.0,
        scalarY: 10.0,
        frictionX: 0.1,
        frictionY: 0.1,
        originX: 0.5,
        originY: 0.5,
        pointerEvents: true,
        precision: 1
    };

    function Plugin(element, options) {
        this.element = element;
        this.$context = $(element).data('api', this);
        this.$layers = this.$context.find('.layer');
        var data = {
            calibrateX: this.$context.data('calibrate-x') || null,
            calibrateY: this.$context.data('calibrate-y') || null,
            invertX: this.$context.data('invert-x') || null,
            invertY: this.$context.data('invert-y') || null,
            limitX: parseFloat(this.$context.data('limit-x')) || null,
            limitY: parseFloat(this.$context.data('limit-y')) || null,
            scalarX: parseFloat(this.$context.data('scalar-x')) || null,
            scalarY: parseFloat(this.$context.data('scalar-y')) || null,
            frictionX: parseFloat(this.$context.data('friction-x')) || null,
            frictionY: parseFloat(this.$context.data('friction-y')) || null,
            originX: parseFloat(this.$context.data('origin-x')) || null,
            originY: parseFloat(this.$context.data('origin-y')) || null,
            pointerEvents: this.$context.data('pointer-events') || true,
            precision: parseFloat(this.$context.data('precision')) || 1
        };
        for (var key in data) {
            if (data[key] === null)
                delete data[key]
        }
        $.extend(this, DEFAULTS, options, data);
        this.calibrationTimer = null;
        this.calibrationFlag = true;
        this.enabled = false;
        this.depthsX = [];
        this.depthsY = [];
        this.raf = null;
        this.bounds = null;
        this.ex = 0;
        this.ey = 0;
        this.ew = 0;
        this.eh = 0;
        this.ecx = 0;
        this.ecy = 0;
        this.erx = 0;
        this.ery = 0;
        this.cx = 0;
        this.cy = 0;
        this.ix = 0;
        this.iy = 0;
        this.mx = 0;
        this.my = 0;
        this.vx = 0;
        this.vy = 0;
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onDeviceOrientation = this.onDeviceOrientation.bind(this);
        this.onOrientationTimer = this.onOrientationTimer.bind(this);
        this.onCalibrationTimer = this.onCalibrationTimer.bind(this);
        this.onAnimationFrame = this.onAnimationFrame.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);
        this.initialise()
    }

    Plugin.prototype.transformSupport = function (value) {
        var element = document.createElement('div');
        var propertySupport = false;
        var propertyValue = null;
        var featureSupport = false;
        var cssProperty = null;
        var jsProperty = null;
        for (var i = 0, l = this.vendors.length; i < l; i++) {
            if (this.vendors[i] !== null) {
                cssProperty = this.vendors[i][0] + 'transform';
                jsProperty = this.vendors[i][1] + 'Transform'
            } else {
                cssProperty = 'transform';
                jsProperty = 'transform'
            }
            if (element.style[jsProperty] !== undefined) {
                propertySupport = true;
                break
            }
        }
        switch (value) {
            case '2D':
                featureSupport = propertySupport;
                break;
            case '3D':
                if (propertySupport) {
                    var body = document.body || document.createElement('body');
                    var documentElement = document.documentElement;
                    var documentOverflow = documentElement.style.overflow;
                    var isCreatedBody = false;
                    if (!document.body) {
                        isCreatedBody = true;
                        documentElement.style.overflow = 'hidden';
                        documentElement.appendChild(body);
                        body.style.overflow = 'hidden';
                        body.style.background = ''
                    }
                    body.appendChild(element);
                    element.style[jsProperty] = 'translate3d(1px,1px,1px)';
                    propertyValue = window.getComputedStyle(element).getPropertyValue(cssProperty);
                    featureSupport = propertyValue !== undefined && propertyValue.length > 0 && propertyValue !== "none";
                    documentElement.style.overflow = documentOverflow;
                    body.removeChild(element);
                    if (isCreatedBody) {
                        body.removeAttribute('style');
                        body.parentNode.removeChild(body)
                    }
                }
                break
        }
        return featureSupport
    };
    Plugin.prototype.ww = null;
    Plugin.prototype.wh = null;
    Plugin.prototype.wcx = null;
    Plugin.prototype.wcy = null;
    Plugin.prototype.wrx = null;
    Plugin.prototype.wry = null;
    Plugin.prototype.portrait = null;
    Plugin.prototype.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i);
    Plugin.prototype.vendors = [null, ['-webkit-', 'webkit'], ['-moz-', 'Moz'], ['-o-', 'O'], ['-ms-', 'ms']];
    Plugin.prototype.motionSupport = !!window.DeviceMotionEvent;
    Plugin.prototype.orientationSupport = !!window.DeviceOrientationEvent;
    Plugin.prototype.orientationStatus = 0;
    Plugin.prototype.transform2DSupport = Plugin.prototype.transformSupport('2D');
    Plugin.prototype.transform3DSupport = Plugin.prototype.transformSupport('3D');
    Plugin.prototype.propertyCache = {};
    Plugin.prototype.initialise = function () {
        if (this.$context.css('position') === 'static') {
            this.$context.css({
                position: 'relative'
            })
        }
        if (!this.pointerEvents) {
            this.$context.css({
                pointerEvents: 'none'
            })
        }
        this.accelerate(this.$context);
        this.updateLayers();
        this.updateDimensions();
        this.enable();
        this.queueCalibration(this.calibrationDelay)
    };
    Plugin.prototype.updateLayers = function () {
        this.$layers = this.$context.find('.layer');
        this.depthsX = [];
        this.depthsY = [];
        this.$layers.css({
            position: 'absolute',
            display: 'block',
            left: 0,
            top: 0
        });
        this.$layers.first().css({
            position: 'relative'
        });
        this.accelerate(this.$layers);
        this.$layers.each($.proxy(function (index, element) {
            var depth = $(element).data('depth') || 0;
            this.depthsX.push($(element).data('depth-x') || depth);
            this.depthsY.push($(element).data('depth-y') || depth)
        }, this))
    };
    Plugin.prototype.updateDimensions = function () {
        this.ww = window.innerWidth;
        this.wh = window.innerHeight;
        this.wcx = this.ww * this.originX;
        this.wcy = this.wh * this.originY;
        this.wrx = Math.max(this.wcx, this.ww - this.wcx);
        this.wry = Math.max(this.wcy, this.wh - this.wcy)
    };
    Plugin.prototype.updateBounds = function () {
        this.bounds = this.element.getBoundingClientRect();
        this.ex = this.bounds.left;
        this.ey = this.bounds.top;
        this.ew = this.bounds.width;
        this.eh = this.bounds.height;
        this.ecx = this.ew * this.originX;
        this.ecy = this.eh * this.originY;
        this.erx = Math.max(this.ecx, this.ew - this.ecx);
        this.ery = Math.max(this.ecy, this.eh - this.ecy)
    };
    Plugin.prototype.queueCalibration = function (delay) {
        clearTimeout(this.calibrationTimer);
        this.calibrationTimer = setTimeout(this.onCalibrationTimer, delay)
    };
    Plugin.prototype.enable = function () {
        if (!this.enabled) {
            this.enabled = true;
            if (this.orientationSupport) {
                this.portrait = null;
                window.addEventListener('deviceorientation', this.onDeviceOrientation);
                setTimeout(this.onOrientationTimer, this.supportDelay)
            } else {
                this.cx = 0;
                this.cy = 0;
                this.portrait = false;
                window.addEventListener('mousemove', this.onMouseMove)
            }
            window.addEventListener('resize', this.onWindowResize);
            this.raf = requestAnimationFrame(this.onAnimationFrame)
        }
    };
    Plugin.prototype.disable = function () {
        if (this.enabled) {
            this.enabled = false;
            if (this.orientationSupport) {
                window.removeEventListener('deviceorientation', this.onDeviceOrientation)
            } else {
                window.removeEventListener('mousemove', this.onMouseMove)
            }
            window.removeEventListener('resize', this.onWindowResize);
            cancelAnimationFrame(this.raf)
        }
    };
    Plugin.prototype.calibrate = function (x, y) {
        this.calibrateX = x === undefined ? this.calibrateX : x;
        this.calibrateY = y === undefined ? this.calibrateY : y
    };
    Plugin.prototype.invert = function (x, y) {
        this.invertX = x === undefined ? this.invertX : x;
        this.invertY = y === undefined ? this.invertY : y
    };
    Plugin.prototype.friction = function (x, y) {
        this.frictionX = x === undefined ? this.frictionX : x;
        this.frictionY = y === undefined ? this.frictionY : y
    };
    Plugin.prototype.scalar = function (x, y) {
        this.scalarX = x === undefined ? this.scalarX : x;
        this.scalarY = y === undefined ? this.scalarY : y
    };
    Plugin.prototype.limit = function (x, y) {
        this.limitX = x === undefined ? this.limitX : x;
        this.limitY = y === undefined ? this.limitY : y
    };
    Plugin.prototype.origin = function (x, y) {
        this.originX = x === undefined ? this.originX : x;
        this.originY = y === undefined ? this.originY : y
    };
    Plugin.prototype.clamp = function (value, min, max) {
        value = Math.max(value, min);
        value = Math.min(value, max);
        return value
    };
    Plugin.prototype.css = function (element, property, value) {
        var jsProperty = this.propertyCache[property];
        if (!jsProperty) {
            for (var i = 0, l = this.vendors.length; i < l; i++) {
                if (this.vendors[i] !== null) {
                    jsProperty = $.camelCase(this.vendors[i][1] + '-' + property)
                } else {
                    jsProperty = property
                }
                if (element.style[jsProperty] !== undefined) {
                    this.propertyCache[property] = jsProperty;
                    break
                }
            }
        }
        element.style[jsProperty] = value
    };
    Plugin.prototype.accelerate = function ($element) {
        for (var i = 0, l = $element.length; i < l; i++) {
            var element = $element[i];
            this.css(element, 'transform', 'translate3d(0,0,0)');
            this.css(element, 'transform-style', 'preserve-3d');
            this.css(element, 'backface-visibility', 'hidden')
        }
    };
    Plugin.prototype.setPosition = function (element, x, y) {
        x += 'px';
        y += 'px';
        if (this.transform3DSupport) {
            this.css(element, 'transform', 'translate3d(' + x + ',' + y + ',0)')
        } else if (this.transform2DSupport) {
            this.css(element, 'transform', 'translate(' + x + ',' + y + ')')
        } else {
            element.style.left = x;
            element.style.top = y
        }
    };
    Plugin.prototype.onOrientationTimer = function (event) {
        if (this.orientationSupport && this.orientationStatus === 0) {
            this.disable();
            this.orientationSupport = false;
            this.enable()
        }
    };
    Plugin.prototype.onCalibrationTimer = function (event) {
        this.calibrationFlag = true
    };
    Plugin.prototype.onWindowResize = function (event) {
        this.updateDimensions()
    };
    Plugin.prototype.onAnimationFrame = function () {
        this.updateBounds();
        var dx = this.ix - this.cx;
        var dy = this.iy - this.cy;
        if ((Math.abs(dx) > this.calibrationThreshold) || (Math.abs(dy) > this.calibrationThreshold)) {
            this.queueCalibration(0)
        }
        if (this.portrait) {
            this.mx = this.calibrateX ? dy : this.iy;
            this.my = this.calibrateY ? dx : this.ix
        } else {
            this.mx = this.calibrateX ? dx : this.ix;
            this.my = this.calibrateY ? dy : this.iy
        }
        this.mx *= this.ew * (this.scalarX / 100);
        this.my *= this.eh * (this.scalarY / 100);
        if (!isNaN(parseFloat(this.limitX))) {
            this.mx = this.clamp(this.mx, -this.limitX, this.limitX)
        }
        if (!isNaN(parseFloat(this.limitY))) {
            this.my = this.clamp(this.my, -this.limitY, this.limitY)
        }
        this.vx += (this.mx - this.vx) * this.frictionX;
        this.vy += (this.my - this.vy) * this.frictionY;
        for (var i = 0, l = this.$layers.length; i < l; i++) {
            var depthX = this.depthsX[i];
            var depthY = this.depthsY[i];
            var layer = this.$layers[i];
            var xOffset = this.vx * (depthX * (this.invertX ? -1 : 1));
            var yOffset = this.vy * (depthY * (this.invertY ? -1 : 1));
            this.setPosition(layer, xOffset, yOffset)
        }
        this.raf = requestAnimationFrame(this.onAnimationFrame)
    };
    Plugin.prototype.onDeviceOrientation = function (event) {
        if (!this.desktop && event.beta !== null && event.gamma !== null) {
            this.orientationStatus = 1;
            var x = (event.beta || 0) / MAGIC_NUMBER;
            var y = (event.gamma || 0) / MAGIC_NUMBER;
            var portrait = window.innerHeight > window.innerWidth;
            if (this.portrait !== portrait) {
                this.portrait = portrait;
                this.calibrationFlag = true
            }
            if (this.calibrationFlag) {
                this.calibrationFlag = false;
                this.cx = x;
                this.cy = y
            }
            this.ix = x;
            this.iy = y
        }
    };
    Plugin.prototype.onMouseMove = function (event) {
        var clientX = event.clientX;
        var clientY = event.clientY;
        if (!this.orientationSupport && this.relativeInput) {
            if (this.clipRelativeInput) {
                clientX = Math.max(clientX, this.ex);
                clientX = Math.min(clientX, this.ex + this.ew);
                clientY = Math.max(clientY, this.ey);
                clientY = Math.min(clientY, this.ey + this.eh)
            }
            this.ix = (clientX - this.ex - this.ecx) / this.erx;
            this.iy = (clientY - this.ey - this.ecy) / this.ery
        } else {
            this.ix = (clientX - this.wcx) / this.wrx;
            this.iy = (clientY - this.wcy) / this.wry
        }
    };
    var API = {
        enable: Plugin.prototype.enable,
        disable: Plugin.prototype.disable,
        updateLayers: Plugin.prototype.updateLayers,
        calibrate: Plugin.prototype.calibrate,
        friction: Plugin.prototype.friction,
        invert: Plugin.prototype.invert,
        scalar: Plugin.prototype.scalar,
        limit: Plugin.prototype.limit,
        origin: Plugin.prototype.origin
    };
    $.fn[NAME] = function (value) {
        var args = arguments;
        return this.each(function () {
            var $this = $(this);
            var plugin = $this.data(NAME);
            if (!plugin) {
                plugin = new Plugin(this, value);
                $this.data(NAME, plugin)
            }
            if (API[value]) {
                plugin[value].apply(plugin, Array.prototype.slice.call(args, 1))
            }
        })
    }
})(window.jQuery || window.Zepto, window, document);
(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame']
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall)
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id
        }
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id)
        }
    }
}());

//https://github.com/jariz/vibrant.js
!function t(r, o, i) {
    function n(a, h) {
        if (!o[a]) {
            if (!r[a]) {
                var u = "function" == typeof require && require;
                if (!h && u) return u(a, !0);
                if (e) return e(a, !0);
                var s = new Error("Cannot find module '" + a + "'");
                throw s.code = "MODULE_NOT_FOUND", s
            }
            var c = o[a] = {
                exports: {}
            };
            r[a][0].call(c.exports, function (t) {
                var o = r[a][1][t];
                return n(o ? o : t)
            }, c, c.exports, t, r, o, i)
        }
        return o[a].exports
    }

    for (var e = "function" == typeof require && require, a = 0; a < i.length; a++) n(i[a]);
    return n
}({
    1: [function (t, r, o) {
        if (!i) var i = {
            map: function (t, r) {
                var o = {};
                return r ? t.map(function (t, i) {
                    return o.index = i, r.call(o, t)
                }) : t.slice()
            },
            naturalOrder: function (t, r) {
                return r > t ? -1 : t > r ? 1 : 0
            },
            sum: function (t, r) {
                var o = {};
                return t.reduce(r ? function (t, i, n) {
                    return o.index = n, t + r.call(o, i)
                } : function (t, r) {
                    return t + r
                }, 0)
            },
            max: function (t, r) {
                return Math.max.apply(null, r ? i.map(t, r) : t)
            }
        };
        var n = function () {
            function t(t, r, o) {
                return (t << 2 * s) + (r << s) + o
            }

            function r(t) {
                function r() {
                    o.sort(t), i = !0
                }

                var o = [],
                    i = !1;
                return {
                    push: function (t) {
                        o.push(t), i = !1
                    },
                    peek: function (t) {
                        return i || r(), void 0 === t && (t = o.length - 1), o[t]
                    },
                    pop: function () {
                        return i || r(), o.pop()
                    },
                    size: function () {
                        return o.length
                    },
                    map: function (t) {
                        return o.map(t)
                    },
                    debug: function () {
                        return i || r(), o
                    }
                }
            }

            function o(t, r, o, i, n, e, a) {
                var h = this;
                h.r1 = t, h.r2 = r, h.g1 = o, h.g2 = i, h.b1 = n, h.b2 = e, h.histo = a
            }

            function n() {
                this.vboxes = new r(function (t, r) {
                    return i.naturalOrder(t.vbox.count() * t.vbox.volume(), r.vbox.count() * r.vbox.volume())
                })
            }

            function e(r) {
                var o,
                    i,
                    n,
                    e,
                    a = 1 << 3 * s,
                    h = new Array(a);
                return r.forEach(function (r) {
                    i = r[0] >> c, n = r[1] >> c, e = r[2] >> c, o = t(i, n, e), h[o] = (h[o] || 0) + 1
                }), h
            }

            function a(t, r) {
                var i,
                    n,
                    e,
                    a = 1e6,
                    h = 0,
                    u = 1e6,
                    s = 0,
                    p = 1e6,
                    f = 0;
                return t.forEach(function (t) {
                    i = t[0] >> c, n = t[1] >> c, e = t[2] >> c, a > i ? a = i : i > h && (h = i), u > n ? u = n : n > s && (s = n), p > e ? p = e : e > f && (f = e)
                }), new o(a, h, u, s, p, f, r)
            }

            function h(r, o) {
                function n(t) {
                    var r,
                        i,
                        n,
                        e,
                        a,
                        h = t + "1",
                        u = t + "2",
                        c = 0;
                    for (s = o[h]; s <= o[u]; s++)
                        if (v[s] > A / 2) {
                            for (n = o.copy(), e = o.copy(), r = s - o[h], i = o[u] - s, a = i >= r ? Math.min(o[u] - 1, ~~(s + i / 2)) : Math.max(o[h], ~~(s - 1 - r / 2)); !v[a];) a++;
                            for (c = T[a]; !c && v[a - 1];) c = T[--a];
                            return n[u] = a, e[h] = n[u] + 1, [n, e]
                        }
                }

                if (o.count()) {
                    var e = o.r2 - o.r1 + 1,
                        a = o.g2 - o.g1 + 1,
                        h = o.b2 - o.b1 + 1,
                        u = i.max([e, a, h]);
                    if (1 == o.count()) return [o.copy()];
                    var s,
                        c,
                        p,
                        f,
                        l,
                        A = 0,
                        v = [],
                        T = [];
                    if (u == e)
                        for (s = o.r1; s <= o.r2; s++) {
                            for (f = 0, c = o.g1; c <= o.g2; c++)
                                for (p = o.b1; p <= o.b2; p++) l = t(s, c, p), f += r[l] || 0;
                            A += f, v[s] = A
                        }
                    else if (u == a)
                        for (s = o.g1; s <= o.g2; s++) {
                            for (f = 0, c = o.r1; c <= o.r2; c++)
                                for (p = o.b1; p <= o.b2; p++) l = t(c, s, p), f += r[l] || 0;
                            A += f, v[s] = A
                        }
                    else
                        for (s = o.b1; s <= o.b2; s++) {
                            for (f = 0, c = o.r1; c <= o.r2; c++)
                                for (p = o.g1; p <= o.g2; p++) l = t(c, p, s), f += r[l] || 0;
                            A += f, v[s] = A
                        }
                    return v.forEach(function (t, r) {
                        T[r] = A - t
                    }), n(u == e ? "r" : u == a ? "g" : "b")
                }
            }

            function u(t, o) {
                function u(t, r) {
                    for (var o, i = 1, n = 0; p > n;)
                        if (o = t.pop(), o.count()) {
                            var e = h(s, o),
                                a = e[0],
                                u = e[1];
                            if (!a) return;
                            if (t.push(a), u && (t.push(u), i++), i >= r) return;
                            if (n++ > p) return
                        } else t.push(o), n++
                }

                if (!t.length || 2 > o || o > 256) return !1;
                var s = e(t),
                    c = 0;
                s.forEach(function () {
                    c++
                });
                var l = a(t, s),
                    A = new r(function (t, r) {
                        return i.naturalOrder(t.count(), r.count())
                    });
                A.push(l), u(A, f * o);
                for (var v = new r(function (t, r) {
                    return i.naturalOrder(t.count() * t.volume(), r.count() * r.volume())
                }); A.size();) v.push(A.pop());
                u(v, o - v.size());
                for (var T = new n; v.size();) T.push(v.pop());
                return T
            }

            var s = 5,
                c = 8 - s,
                p = 1e3,
                f = .75;
            return o.prototype = {
                volume: function (t) {
                    var r = this;
                    return (!r._volume || t) && (r._volume = (r.r2 - r.r1 + 1) * (r.g2 - r.g1 + 1) * (r.b2 - r.b1 + 1)), r._volume
                },
                count: function (r) {
                    var o = this,
                        i = o.histo;
                    if (!o._count_set || r) {
                        var n,
                            e,
                            a,
                            h,
                            u = 0;
                        for (n = o.r1; n <= o.r2; n++)
                            for (e = o.g1; e <= o.g2; e++)
                                for (a = o.b1; a <= o.b2; a++) h = t(n, e, a), u += i[h] || 0;
                        o._count = u, o._count_set = !0
                    }
                    return o._count
                },
                copy: function () {
                    var t = this;
                    return new o(t.r1, t.r2, t.g1, t.g2, t.b1, t.b2, t.histo)
                },
                avg: function (r) {
                    var o = this,
                        i = o.histo;
                    if (!o._avg || r) {
                        var n,
                            e,
                            a,
                            h,
                            u,
                            c = 0,
                            p = 1 << 8 - s,
                            f = 0,
                            l = 0,
                            A = 0;
                        for (e = o.r1; e <= o.r2; e++)
                            for (a = o.g1; a <= o.g2; a++)
                                for (h = o.b1; h <= o.b2; h++) u = t(e, a, h), n = i[u] || 0, c += n, f += n * (e + .5) * p, l += n * (a + .5) * p, A += n * (h + .5) * p;
                        c ? o._avg = [~~(f / c), ~~(l / c), ~~(A / c)] : o._avg = [~~(p * (o.r1 + o.r2 + 1) / 2), ~~(p * (o.g1 + o.g2 + 1) / 2), ~~(p * (o.b1 + o.b2 + 1) / 2)]
                    }
                    return o._avg
                },
                contains: function (t) {
                    var r = this,
                        o = t[0] >> c;
                    return gval = t[1] >> c, bval = t[2] >> c, o >= r.r1 && o <= r.r2 && gval >= r.g1 && gval <= r.g2 && bval >= r.b1 && bval <= r.b2
                }
            }, n.prototype = {
                push: function (t) {
                    this.vboxes.push({
                        vbox: t,
                        color: t.avg()
                    })
                },
                palette: function () {
                    return this.vboxes.map(function (t) {
                        return t.color
                    })
                },
                size: function () {
                    return this.vboxes.size()
                },
                map: function (t) {
                    for (var r = this.vboxes, o = 0; o < r.size(); o++)
                        if (r.peek(o).vbox.contains(t)) return r.peek(o).color;
                    return this.nearest(t)
                },
                nearest: function (t) {
                    for (var r, o, i, n = this.vboxes, e = 0; e < n.size(); e++) o = Math.sqrt(Math.pow(t[0] - n.peek(e).color[0], 2) + Math.pow(t[1] - n.peek(e).color[1], 2) + Math.pow(t[2] - n.peek(e).color[2], 2)), (r > o || void 0 === r) && (r = o, i = n.peek(e).color);
                    return i
                },
                forcebw: function () {
                    var t = this.vboxes;
                    t.sort(function (t, r) {
                        return i.naturalOrder(i.sum(t.color), i.sum(r.color))
                    });
                    var r = t[0].color;
                    r[0] < 5 && r[1] < 5 && r[2] < 5 && (t[0].color = [0, 0, 0]);
                    var o = t.length - 1,
                        n = t[o].color;
                    n[0] > 251 && n[1] > 251 && n[2] > 251 && (t[o].color = [255, 255, 255])
                }
            }, {
                quantize: u
            }
        }();
        r.exports = n.quantize
    }, {}],
    2: [function (t, r, o) {
        (function () {
            var r,
                o,
                i,
                n = function (t, r) {
                    return function () {
                        return t.apply(r, arguments)
                    }
                },
                e = [].slice;
            window.Swatch = o = function () {
                function t(t, r) {
                    this.rgb = t, this.population = r
                }

                return t.prototype.hsl = void 0, t.prototype.rgb = void 0, t.prototype.population = 1, t.yiq = 0, t.prototype.getHsl = function () {
                    return this.hsl ? this.hsl : this.hsl = i.rgbToHsl(this.rgb[0], this.rgb[1], this.rgb[2])
                }, t.prototype.getPopulation = function () {
                    return this.population
                }, t.prototype.getRgb = function () {
                    return this.rgb
                }, t.prototype.getHex = function () {
                    return "#" + ((1 << 24) + (this.rgb[0] << 16) + (this.rgb[1] << 8) + this.rgb[2]).toString(16).slice(1, 7)
                }, t.prototype.getTitleTextColor = function () {
                    return this._ensureTextColors(), this.yiq < 200 ? "#fff" : "#000"
                }, t.prototype.getBodyTextColor = function () {
                    return this._ensureTextColors(), this.yiq < 150 ? "#fff" : "#000"
                }, t.prototype._ensureTextColors = function () {
                    return this.yiq ? void 0 : this.yiq = (299 * this.rgb[0] + 587 * this.rgb[1] + 114 * this.rgb[2]) / 1e3
                }, t
            }(), window.Vibrant = i = function () {
                function i(t, i, e) {
                    this.swatches = n(this.swatches, this);
                    var a,
                        h,
                        u,
                        s,
                        c,
                        p,
                        f,
                        l,
                        A,
                        v,
                        T,
                        g;
                    "undefined" == typeof i && (i = 64), "undefined" == typeof e && (e = 5), f = new r(t);
                    try {
                        for (l = f.getImageData(), T = l.data, v = f.getPixelCount(), h = [], p = 0; v > p;) A = 4 * p, g = T[A + 0], c = T[A + 1], u = T[A + 2], a = T[A + 3], a >= 125 && (g > 250 && c > 250 && u > 250 || h.push([g, c, u])), p += e;
                        s = this.quantize(h, i), this._swatches = s.vboxes.map(function (t) {
                            return function (t) {
                                return new o(t.color, t.vbox.count())
                            }
                        }(this)), this.maxPopulation = this.findMaxPopulation, this.generateVarationColors(), this.generateEmptySwatches()
                    } finally {
                        f.removeCanvas()
                    }
                }

                return i.prototype.quantize = t("quantize"), i.prototype._swatches = [], i.prototype.TARGET_DARK_LUMA = .26, i.prototype.MAX_DARK_LUMA = .45, i.prototype.MIN_LIGHT_LUMA = .55, i.prototype.TARGET_LIGHT_LUMA = .74, i.prototype.MIN_NORMAL_LUMA = .3, i.prototype.TARGET_NORMAL_LUMA = .5, i.prototype.MAX_NORMAL_LUMA = .7, i.prototype.TARGET_MUTED_SATURATION = .3, i.prototype.MAX_MUTED_SATURATION = .4, i.prototype.TARGET_VIBRANT_SATURATION = 1, i.prototype.MIN_VIBRANT_SATURATION = .35, i.prototype.WEIGHT_SATURATION = 3, i.prototype.WEIGHT_LUMA = 6, i.prototype.WEIGHT_POPULATION = 1, i.prototype.VibrantSwatch = void 0, i.prototype.MutedSwatch = void 0, i.prototype.DarkVibrantSwatch = void 0, i.prototype.DarkMutedSwatch = void 0, i.prototype.LightVibrantSwatch = void 0, i.prototype.LightMutedSwatch = void 0, i.prototype.HighestPopulation = 0, i.prototype.generateVarationColors = function () {
                    return this.VibrantSwatch = this.findColorVariation(this.TARGET_NORMAL_LUMA, this.MIN_NORMAL_LUMA, this.MAX_NORMAL_LUMA, this.TARGET_VIBRANT_SATURATION, this.MIN_VIBRANT_SATURATION, 1), this.LightVibrantSwatch = this.findColorVariation(this.TARGET_LIGHT_LUMA, this.MIN_LIGHT_LUMA, 1, this.TARGET_VIBRANT_SATURATION, this.MIN_VIBRANT_SATURATION, 1), this.DarkVibrantSwatch = this.findColorVariation(this.TARGET_DARK_LUMA, 0, this.MAX_DARK_LUMA, this.TARGET_VIBRANT_SATURATION, this.MIN_VIBRANT_SATURATION, 1), this.MutedSwatch = this.findColorVariation(this.TARGET_NORMAL_LUMA, this.MIN_NORMAL_LUMA, this.MAX_NORMAL_LUMA, this.TARGET_MUTED_SATURATION, 0, this.MAX_MUTED_SATURATION), this.LightMutedSwatch = this.findColorVariation(this.TARGET_LIGHT_LUMA, this.MIN_LIGHT_LUMA, 1, this.TARGET_MUTED_SATURATION, 0, this.MAX_MUTED_SATURATION), this.DarkMutedSwatch = this.findColorVariation(this.TARGET_DARK_LUMA, 0, this.MAX_DARK_LUMA, this.TARGET_MUTED_SATURATION, 0, this.MAX_MUTED_SATURATION)
                }, i.prototype.generateEmptySwatches = function () {
                    var t;
                    return void 0 === this.VibrantSwatch && void 0 !== this.DarkVibrantSwatch && (t = this.DarkVibrantSwatch.getHsl(), t[2] = this.TARGET_NORMAL_LUMA, this.VibrantSwatch = new o(i.hslToRgb(t[0], t[1], t[2]), 0)), void 0 === this.DarkVibrantSwatch && void 0 !== this.VibrantSwatch ? (t = this.VibrantSwatch.getHsl(), t[2] = this.TARGET_DARK_LUMA, this.DarkVibrantSwatch = new o(i.hslToRgb(t[0], t[1], t[2]), 0)) : void 0
                }, i.prototype.findMaxPopulation = function () {
                    var t,
                        r,
                        o,
                        i,
                        n;
                    for (o = 0, i = this._swatches, t = 0, r = i.length; r > t; t++) n = i[t], o = Math.max(o, n.getPopulation());
                    return o
                }, i.prototype.findColorVariation = function (t, r, o, i, n, e) {
                    var a,
                        h,
                        u,
                        s,
                        c,
                        p,
                        f,
                        l,
                        A;
                    for (s = void 0, c = 0, p = this._swatches, a = 0, h = p.length; h > a; a++) l = p[a], f = l.getHsl()[1], u = l.getHsl()[2], f >= n && e >= f && u >= r && o >= u && !this.isAlreadySelected(l) && (A = this.createComparisonValue(f, i, u, t, l.getPopulation(), this.HighestPopulation), (void 0 === s || A > c) && (s = l, c = A));
                    return s
                }, i.prototype.createComparisonValue = function (t, r, o, i, n, e) {
                    return this.weightedMean(this.invertDiff(t, r), this.WEIGHT_SATURATION, this.invertDiff(o, i), this.WEIGHT_LUMA, n / e, this.WEIGHT_POPULATION)
                }, i.prototype.invertDiff = function (t, r) {
                    return 1 - Math.abs(t - r)
                }, i.prototype.weightedMean = function () {
                    var t,
                        r,
                        o,
                        i,
                        n,
                        a;
                    for (n = 1 <= arguments.length ? e.call(arguments, 0) : [], r = 0, o = 0, t = 0; t < n.length;) i = n[t], a = n[t + 1], r += i * a, o += a, t += 2;
                    return r / o
                }, i.prototype.swatches = function () {
                    return {
                        Vibrant: this.VibrantSwatch,
                        Muted: this.MutedSwatch,
                        DarkVibrant: this.DarkVibrantSwatch,
                        DarkMuted: this.DarkMutedSwatch,
                        LightVibrant: this.LightVibrantSwatch,
                        LightMuted: this.LightMuted
                    }
                }, i.prototype.isAlreadySelected = function (t) {
                    return this.VibrantSwatch === t || this.DarkVibrantSwatch === t || this.LightVibrantSwatch === t || this.MutedSwatch === t || this.DarkMutedSwatch === t || this.LightMutedSwatch === t
                }, i.rgbToHsl = function (t, r, o) {
                    var i,
                        n,
                        e,
                        a,
                        h,
                        u;
                    if (t /= 255, r /= 255, o /= 255, a = Math.max(t, r, o), h = Math.min(t, r, o), n = void 0, u = void 0, e = (a + h) / 2, a === h)
                        n = u = 0; else {
                        switch (i = a - h, u = e > .5 ? i / (2 - a - h) : i / (a + h), a) {
                            case t:
                                n = (r - o) / i + (o > r ? 6 : 0);
                                break;
                            case r:
                                n = (o - t) / i + 2;
                                break;
                            case o:
                                n = (t - r) / i + 4
                        }
                        n /= 6
                    }
                    return [n, u, e]
                }, i.hslToRgb = function (t, r, o) {
                    var i,
                        n,
                        e,
                        a,
                        h,
                        u;
                    return u = void 0, n = void 0, i = void 0, e = function (t, r, o) {
                        return 0 > o && (o += 1), o > 1 && (o -= 1), 1 / 6 > o ? t + 6 * (r - t) * o : .5 > o ? r : 2 / 3 > o ? t + (r - t) * (2 / 3 - o) * 6 : t
                    }, 0 === r ? u = n = i = o : (h = .5 > o ? o * (1 + r) : o + r - o * r, a = 2 * o - h, u = e(a, h, t + 1 / 3), n = e(a, h, t), i = e(a, h, t - 1 / 3)), [255 * u, 255 * n, 255 * i]
                }, i
            }(), window.CanvasImage = r = function () {
                function t(t) {
                    this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), document.body.appendChild(this.canvas), this.width = this.canvas.width = t.width, this.height = this.canvas.height = t.height, this.context.drawImage(t, 0, 0, this.width, this.height)
                }

                return t.prototype.clear = function () {
                    return this.context.clearRect(0, 0, this.width, this.height)
                }, t.prototype.update = function (t) {
                    return this.context.putImageData(t, 0, 0)
                }, t.prototype.getPixelCount = function () {
                    return this.width * this.height
                }, t.prototype.getImageData = function () {
                    return this.context.getImageData(0, 0, this.width, this.height)
                }, t.prototype.removeCanvas = function () {
                    return this.canvas.parentNode.removeChild(this.canvas)
                }, t
            }()
        }).call(this)
    }, {
        quantize: 1
    }]
}, {}, [2]);

//jweixin-1.4.0.js
!function (e, n) {
    "function" == typeof define && (define.amd || define.cmd) ? define(function () {
        return n(e)
    }) : n(e, !0)
}(this, function (e, n) {
    function i(n, i, t) {
        e.WeixinJSBridge ? WeixinJSBridge.invoke(n, o(i), function (e) {
            c(n, e, t)
        }) : u(n, t)
    }

    function t(n, i, t) {
        e.WeixinJSBridge ? WeixinJSBridge.on(n, function (e) {
            t && t.trigger && t.trigger(e), c(n, e, i)
        }) : t ? u(n, t) : u(n, i)
    }

    function o(e) {
        return e = e || {}, e.appId = C.appId, e.verifyAppId = C.appId, e.verifySignType = "sha1", e.verifyTimestamp = C.timestamp + "", e.verifyNonceStr = C.nonceStr, e.verifySignature = C.signature, e
    }

    function r(e) {
        return {
            timeStamp: e.timestamp + "",
            nonceStr: e.nonceStr,
            package: e.package,
            paySign: e.paySign,
            signType: e.signType || "SHA1"
        }
    }

    function a(e) {
        return e.postalCode = e.addressPostalCode,
            delete e.addressPostalCode
            , e.provinceName = e.proviceFirstStageName,
            delete e.proviceFirstStageName
            , e.cityName = e.addressCitySecondStageName,
            delete e.addressCitySecondStageName
            , e.countryName = e.addressCountiesThirdStageName,
            delete e.addressCountiesThirdStageName
            , e.detailInfo = e.addressDetailInfo,
            delete e.addressDetailInfo
            , e
    }

    function c(e, n, i) {
        "openEnterpriseChat" == e && (n.errCode = n.err_code),
            delete n.err_code
            ,
            delete n.err_desc
            ,
            delete n.err_detail;
        var t = n.errMsg;
        t || (t = n.err_msg,
            delete n.err_msg
            , t = s(e, t), n.errMsg = t), (i = i || {})._complete && (i._complete(n),
                delete i._complete
        ), t = n.errMsg || "", C.debug && !i.isInnerInvoke && alert(JSON.stringify(n));
        var o = t.indexOf(":");
        switch (t.substring(o + 1)) {
            case "ok":
                i.success && i.success(n);
                break;
            case "cancel":
                i.cancel && i.cancel(n);
                break;
            default:
                i.fail && i.fail(n)
        }
        i.complete && i.complete(n)
    }

    function s(e, n) {
        var i = e,
            t = v[i];
        t && (i = t);
        var o = "ok";
        if (n) {
            var r = n.indexOf(":");
            "confirm" == (o = n.substring(r + 1)) && (o = "ok"), "failed" == o && (o = "fail"), -1 != o.indexOf("failed_") && (o = o.substring(7)), -1 != o.indexOf("fail_") && (o = o.substring(5)), "access denied" != (o = (o = o.replace(/_/g, " ")).toLowerCase()) && "no permission to execute" != o || (o = "permission denied"), "config" == i && "function not exist" == o && (o = "ok"), "" == o && (o = "fail")
        }
        return n = i + ":" + o
    }

    function d(e) {
        if (e) {
            for (var n = 0, i = e.length; n < i; ++n) {
                var t = e[n],
                    o = h[t];
                o && (e[n] = o)
            }
            return e
        }
    }

    function u(e, n) {
        if (!(!C.debug || n && n.isInnerInvoke)) {
            var i = v[e];
            i && (e = i), n && n._complete &&
            delete n._complete
                , console.log('"' + e + '",', n || "")
        }
    }

    function l(e) {
        if (!(k || w || C.debug || x < "6.0.2" || V.systemType < 0)) {
            var n = new Image;
            V.appId = C.appId, V.initTime = A.initEndTime - A.initStartTime, V.preVerifyTime = A.preVerifyEndTime - A.preVerifyStartTime, N.getNetworkType({
                isInnerInvoke: !0,
                success: function (e) {
                    V.networkType = e.networkType;
                    var i = "https://open.weixin.qq.com/sdk/report?v=" + V.version + "&o=" + V.isPreVerifyOk + "&s=" + V.systemType + "&c=" + V.clientVersion + "&a=" + V.appId + "&n=" + V.networkType + "&i=" + V.initTime + "&p=" + V.preVerifyTime + "&u=" + V.url;
                    n.src = i
                }
            })
        }
    }

    function p() {
        return (new Date).getTime()
    }

    function f(n) {
        T && (e.WeixinJSBridge ? n() : S.addEventListener && S.addEventListener("WeixinJSBridgeReady", n, !1))
    }

    function m() {
        N.invoke || (N.invoke = function (n, i, t) {
            e.WeixinJSBridge && WeixinJSBridge.invoke(n, o(i), t)
        }, N.on = function (n, i) {
            e.WeixinJSBridge && WeixinJSBridge.on(n, i)
        })
    }

    function g(e) {
        if ("string" == typeof e && e.length > 0) {
            var n = e.split("?")[0],
                i = e.split("?")[1];
            return n += ".html", void 0 !== i ? n + "?" + i : n
        }
    }

    if (!e.jWeixin) {
        var h = {
                config: "preVerifyJSAPI",
                onMenuShareTimeline: "menu:share:timeline",
                onMenuShareAppMessage: "menu:share:appmessage",
                onMenuShareQQ: "menu:share:qq",
                onMenuShareWeibo: "menu:share:weiboApp",
                onMenuShareQZone: "menu:share:QZone",
                previewImage: "imagePreview",
                getLocation: "geoLocation",
                openProductSpecificView: "openProductViewWithPid",
                addCard: "batchAddCard",
                openCard: "batchViewCard",
                chooseWXPay: "getBrandWCPayRequest",
                openEnterpriseRedPacket: "getRecevieBizHongBaoRequest",
                startSearchBeacons: "startMonitoringBeacons",
                stopSearchBeacons: "stopMonitoringBeacons",
                onSearchBeacons: "onBeaconsInRange",
                consumeAndShareCard: "consumedShareCard",
                openAddress: "editAddress"
            },
            v = function () {
                var e = {};
                for (var n in h) e[h[n]] = n;
                return e
            }(),
            S = e.document,
            I = S.title,
            y = navigator.userAgent.toLowerCase(),
            _ = navigator.platform.toLowerCase(),
            k = !(!_.match("mac") && !_.match("win")),
            w = -1 != y.indexOf("wxdebugger"),
            T = -1 != y.indexOf("micromessenger"),
            M = -1 != y.indexOf("android"),
            P = -1 != y.indexOf("iphone") || -1 != y.indexOf("ipad"),
            x = function () {
                var e = y.match(/micromessenger\/(\d+\.\d+\.\d+)/) || y.match(/micromessenger\/(\d+\.\d+)/);
                return e ? e[1] : ""
            }(),
            A = {
                initStartTime: p(),
                initEndTime: 0,
                preVerifyStartTime: 0,
                preVerifyEndTime: 0
            },
            V = {
                version: 1,
                appId: "",
                initTime: 0,
                preVerifyTime: 0,
                networkType: "",
                isPreVerifyOk: 1,
                systemType: P ? 1 : M ? 2 : -1,
                clientVersion: x,
                url: encodeURIComponent(location.href)
            },
            C = {},
            L = {
                _completes: []
            },
            B = {
                state: 0,
                data: {}
            };
        f(function () {
            A.initEndTime = p()
        });
        var O = !1,
            E = [],
            N = {
                config: function (e) {
                    C = e, u("config", e);
                    var n = !1 !== C.check;
                    f(function () {
                        if (n) i(h.config, {
                            verifyJsApiList: d(C.jsApiList)
                        }, function () {
                            L._complete = function (e) {
                                A.preVerifyEndTime = p(), B.state = 1, B.data = e
                            }, L.success = function (e) {
                                V.isPreVerifyOk = 0
                            }, L.fail = function (e) {
                                L._fail ? L._fail(e) : B.state = -1
                            };
                            var e = L._completes;
                            return e.push(function () {
                                l()
                            }), L.complete = function (n) {
                                for (var i = 0, t = e.length; i < t; ++i) e[i]();
                                L._completes = []
                            }, L
                        }()), A.preVerifyStartTime = p(); else {
                            B.state = 1;
                            for (var e = L._completes, t = 0, o = e.length; t < o; ++t) e[t]();
                            L._completes = []
                        }
                    }), m()
                },
                ready: function (e) {
                    0 != B.state ? e() : (L._completes.push(e), !T && C.debug && e())
                },
                error: function (e) {
                    x < "6.0.2" || (-1 == B.state ? e(B.data) : L._fail = e)
                },
                checkJsApi: function (e) {
                    var n = function (e) {
                        var n = e.checkResult;
                        for (var i in n) {
                            var t = v[i];
                            t && (n[t] = n[i],
                                    delete n[i]
                            )
                        }
                        return e
                    };
                    i("checkJsApi", {
                        jsApiList: d(e.jsApiList)
                    }, (e._complete = function (e) {
                        if (M) {
                            var i = e.checkResult;
                            i && (e.checkResult = JSON.parse(i))
                        }
                        e = n(e)
                    }, e))
                },
                onMenuShareTimeline: function (e) {
                    t(h.onMenuShareTimeline, {
                        complete: function () {
                            i("shareTimeline", {
                                title: e.title || I,
                                desc: e.title || I,
                                img_url: e.imgUrl || "",
                                link: e.link || location.href,
                                type: e.type || "link",
                                data_url: e.dataUrl || ""
                            }, e)
                        }
                    }, e)
                },
                onMenuShareAppMessage: function (e) {
                    t(h.onMenuShareAppMessage, {
                        complete: function (n) {
                            "favorite" === n.scene ? i("sendAppMessage", {
                                title: e.title || I,
                                desc: e.desc || "",
                                link: e.link || location.href,
                                img_url: e.imgUrl || "",
                                type: e.type || "link",
                                data_url: e.dataUrl || ""
                            }) : i("sendAppMessage", {
                                title: e.title || I,
                                desc: e.desc || "",
                                link: e.link || location.href,
                                img_url: e.imgUrl || "",
                                type: e.type || "link",
                                data_url: e.dataUrl || ""
                            }, e)
                        }
                    }, e)
                },
                onMenuShareQQ: function (e) {
                    t(h.onMenuShareQQ, {
                        complete: function () {
                            i("shareQQ", {
                                title: e.title || I,
                                desc: e.desc || "",
                                img_url: e.imgUrl || "",
                                link: e.link || location.href
                            }, e)
                        }
                    }, e)
                },
                onMenuShareWeibo: function (e) {
                    t(h.onMenuShareWeibo, {
                        complete: function () {
                            i("shareWeiboApp", {
                                title: e.title || I,
                                desc: e.desc || "",
                                img_url: e.imgUrl || "",
                                link: e.link || location.href
                            }, e)
                        }
                    }, e)
                },
                onMenuShareQZone: function (e) {
                    t(h.onMenuShareQZone, {
                        complete: function () {
                            i("shareQZone", {
                                title: e.title || I,
                                desc: e.desc || "",
                                img_url: e.imgUrl || "",
                                link: e.link || location.href
                            }, e)
                        }
                    }, e)
                },
                updateTimelineShareData: function (e) {
                    i("updateTimelineShareData", {
                        title: e.title,
                        link: e.link,
                        imgUrl: e.imgUrl
                    }, e)
                },
                updateAppMessageShareData: function (e) {
                    i("updateAppMessageShareData", {
                        title: e.title,
                        desc: e.desc,
                        link: e.link,
                        imgUrl: e.imgUrl
                    }, e)
                },
                startRecord: function (e) {
                    i("startRecord", {}, e)
                },
                stopRecord: function (e) {
                    i("stopRecord", {}, e)
                },
                onVoiceRecordEnd: function (e) {
                    t("onVoiceRecordEnd", e)
                },
                playVoice: function (e) {
                    i("playVoice", {
                        localId: e.localId
                    }, e)
                },
                pauseVoice: function (e) {
                    i("pauseVoice", {
                        localId: e.localId
                    }, e)
                },
                stopVoice: function (e) {
                    i("stopVoice", {
                        localId: e.localId
                    }, e)
                },
                onVoicePlayEnd: function (e) {
                    t("onVoicePlayEnd", e)
                },
                uploadVoice: function (e) {
                    i("uploadVoice", {
                        localId: e.localId,
                        isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                    }, e)
                },
                downloadVoice: function (e) {
                    i("downloadVoice", {
                        serverId: e.serverId,
                        isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                    }, e)
                },
                translateVoice: function (e) {
                    i("translateVoice", {
                        localId: e.localId,
                        isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                    }, e)
                },
                chooseImage: function (e) {
                    i("chooseImage", {
                        scene: "1|2",
                        count: e.count || 9,
                        sizeType: e.sizeType || ["original", "compressed"],
                        sourceType: e.sourceType || ["album", "camera"]
                    }, (e._complete = function (e) {
                        if (M) {
                            var n = e.localIds;
                            try {
                                n && (e.localIds = JSON.parse(n))
                            } catch (e) {
                            }
                        }
                    }, e))
                },
                getLocation: function (e) {
                },
                previewImage: function (e) {
                    i(h.previewImage, {
                        current: e.current,
                        urls: e.urls
                    }, e)
                },
                uploadImage: function (e) {
                    i("uploadImage", {
                        localId: e.localId,
                        isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                    }, e)
                },
                downloadImage: function (e) {
                    i("downloadImage", {
                        serverId: e.serverId,
                        isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                    }, e)
                },
                getLocalImgData: function (e) {
                    !1 === O ? (O = !0, i("getLocalImgData", {
                        localId: e.localId
                    }, (e._complete = function (e) {
                        if (O = !1, E.length > 0) {
                            var n = E.shift();
                            wx.getLocalImgData(n)
                        }
                    }, e))) : E.push(e)
                },
                getNetworkType: function (e) {
                    var n = function (e) {
                        var n = e.errMsg;
                        e.errMsg = "getNetworkType:ok";
                        var i = e.subtype;
                        if (
                            delete e.subtype
                                , i)
                            e.networkType = i; else {
                            var t = n.indexOf(":"),
                                o = n.substring(t + 1);
                            switch (o) {
                                case "wifi":
                                case "edge":
                                case "wwan":
                                    e.networkType = o;
                                    break;
                                default:
                                    e.errMsg = "getNetworkType:fail"
                            }
                        }
                        return e
                    };
                    i("getNetworkType", {}, (e._complete = function (e) {
                        e = n(e)
                    }, e))
                },
                openLocation: function (e) {
                    i("openLocation", {
                        latitude: e.latitude,
                        longitude: e.longitude,
                        name: e.name || "",
                        address: e.address || "",
                        scale: e.scale || 28,
                        infoUrl: e.infoUrl || ""
                    }, e)
                },
                getLocation: function (e) {
                    e = e || {}, i(h.getLocation, {
                        type: e.type || "wgs84"
                    }, (e._complete = function (e) {
                        delete e.type
                    }, e))
                },
                hideOptionMenu: function (e) {
                    i("hideOptionMenu", {}, e)
                },
                showOptionMenu: function (e) {
                    i("showOptionMenu", {}, e)
                },
                closeWindow: function (e) {
                    i("closeWindow", {}, e = e || {})
                },
                hideMenuItems: function (e) {
                    i("hideMenuItems", {
                        menuList: e.menuList
                    }, e)
                },
                showMenuItems: function (e) {
                    i("showMenuItems", {
                        menuList: e.menuList
                    }, e)
                },
                hideAllNonBaseMenuItem: function (e) {
                    i("hideAllNonBaseMenuItem", {}, e)
                },
                showAllNonBaseMenuItem: function (e) {
                    i("showAllNonBaseMenuItem", {}, e)
                },
                scanQRCode: function (e) {
                    i("scanQRCode", {
                        needResult: (e = e || {}).needResult || 0,
                        scanType: e.scanType || ["qrCode", "barCode"]
                    }, (e._complete = function (e) {
                        if (P) {
                            var n = e.resultStr;
                            if (n) {
                                var i = JSON.parse(n);
                                e.resultStr = i && i.scan_code && i.scan_code.scan_result
                            }
                        }
                    }, e))
                },
                openAddress: function (e) {
                    i(h.openAddress, {}, (e._complete = function (e) {
                        e = a(e)
                    }, e))
                },
                openProductSpecificView: function (e) {
                    i(h.openProductSpecificView, {
                        pid: e.productId,
                        view_type: e.viewType || 0,
                        ext_info: e.extInfo
                    }, e)
                },
                addCard: function (e) {
                    for (var n = e.cardList, t = [], o = 0, r = n.length; o < r; ++o) {
                        var a = n[o],
                            c = {
                                card_id: a.cardId,
                                card_ext: a.cardExt
                            };
                        t.push(c)
                    }
                    i(h.addCard, {
                        card_list: t
                    }, (e._complete = function (e) {
                        var n = e.card_list;
                        if (n) {
                            for (var i = 0, t = (n = JSON.parse(n)).length; i < t; ++i) {
                                var o = n[i];
                                o.cardId = o.card_id, o.cardExt = o.card_ext, o.isSuccess = !!o.is_succ,
                                    delete o.card_id
                                    ,
                                    delete o.card_ext
                                    ,
                                    delete o.is_succ
                            }
                            e.cardList = n,
                                delete e.card_list
                        }
                    }, e))
                },
                chooseCard: function (e) {
                    i("chooseCard", {
                        app_id: C.appId,
                        location_id: e.shopId || "",
                        sign_type: e.signType || "SHA1",
                        card_id: e.cardId || "",
                        card_type: e.cardType || "",
                        card_sign: e.cardSign,
                        time_stamp: e.timestamp + "",
                        nonce_str: e.nonceStr
                    }, (e._complete = function (e) {
                        e.cardList = e.choose_card_info,
                            delete e.choose_card_info
                    }, e))
                },
                openCard: function (e) {
                    for (var n = e.cardList, t = [], o = 0, r = n.length; o < r; ++o) {
                        var a = n[o],
                            c = {
                                card_id: a.cardId,
                                code: a.code
                            };
                        t.push(c)
                    }
                    i(h.openCard, {
                        card_list: t
                    }, e)
                },
                consumeAndShareCard: function (e) {
                    i(h.consumeAndShareCard, {
                        consumedCardId: e.cardId,
                        consumedCode: e.code
                    }, e)
                },
                chooseWXPay: function (e) {
                    i(h.chooseWXPay, r(e), e)
                },
                openEnterpriseRedPacket: function (e) {
                    i(h.openEnterpriseRedPacket, r(e), e)
                },
                startSearchBeacons: function (e) {
                    i(h.startSearchBeacons, {
                        ticket: e.ticket
                    }, e)
                },
                stopSearchBeacons: function (e) {
                    i(h.stopSearchBeacons, {}, e)
                },
                onSearchBeacons: function (e) {
                    t(h.onSearchBeacons, e)
                },
                openEnterpriseChat: function (e) {
                    i("openEnterpriseChat", {
                        useridlist: e.userIds,
                        chatname: e.groupName
                    }, e)
                },
                launchMiniProgram: function (e) {
                    i("launchMiniProgram", {
                        targetAppId: e.targetAppId,
                        path: g(e.path),
                        envVersion: e.envVersion
                    }, e)
                },
                miniProgram: {
                    navigateBack: function (e) {
                        e = e || {}, f(function () {
                            i("invokeMiniProgramAPI", {
                                name: "navigateBack",
                                arg: {
                                    delta: e.delta || 1
                                }
                            }, e)
                        })
                    },
                    navigateTo: function (e) {
                        f(function () {
                            i("invokeMiniProgramAPI", {
                                name: "navigateTo",
                                arg: {
                                    url: e.url
                                }
                            }, e)
                        })
                    },
                    redirectTo: function (e) {
                        f(function () {
                            i("invokeMiniProgramAPI", {
                                name: "redirectTo",
                                arg: {
                                    url: e.url
                                }
                            }, e)
                        })
                    },
                    switchTab: function (e) {
                        f(function () {
                            i("invokeMiniProgramAPI", {
                                name: "switchTab",
                                arg: {
                                    url: e.url
                                }
                            }, e)
                        })
                    },
                    reLaunch: function (e) {
                        f(function () {
                            i("invokeMiniProgramAPI", {
                                name: "reLaunch",
                                arg: {
                                    url: e.url
                                }
                            }, e)
                        })
                    },
                    postMessage: function (e) {
                        f(function () {
                            i("invokeMiniProgramAPI", {
                                name: "postMessage",
                                arg: e.data || {}
                            }, e)
                        })
                    },
                    getEnv: function (n) {
                        f(function () {
                            n({
                                miniprogram: "miniprogram" === e.__wxjs_environment
                            })
                        })
                    }
                }
            },
            b = 1,
            R = {};
        return S.addEventListener("error", function (e) {
            if (!M) {
                var n = e.target,
                    i = n.tagName,
                    t = n.src;
                if (("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) && -1 != t.indexOf("wxlocalresource://")) {
                    e.preventDefault(), e.stopPropagation();
                    var o = n["wx-id"];
                    if (o || (o = b++, n["wx-id"] = o), R[o]) return;
                    R[o] = !0, wx.ready(function () {
                        wx.getLocalImgData({
                            localId: t,
                            success: function (e) {
                                n.src = e.localData
                            }
                        })
                    })
                }
            }
        }, !0), S.addEventListener("load", function (e) {
            if (!M) {
                var n = e.target,
                    i = n.tagName;
                n.src;
                if ("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) {
                    var t = n["wx-id"];
                    t && (R[t] = !1)
                }
            }
        }, !0), n && (e.wx = e.jWeixin = N), N
    }
});

/**
 * jQuery Ripples plugin v0.6.2 / https://github.com/sirxemic/jquery.ripples
 * MIT License
 * @author sirxemic / https://sirxemic.com/
 */
!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], t) : t(e.$)
}(this, function (e) {
    "use strict";

    function t(e) {
        return "%" == e[e.length - 1]
    }

    function r(e) {
        var t = e.split(" ");
        if (1 !== t.length) return t.map(function (t) {
            switch (e) {
                case "center":
                    return "50%";
                case "top":
                case "left":
                    return "0";
                case "right":
                case "bottom":
                    return "100%";
                default:
                    return t
            }
        });
        switch (e) {
            case "center":
                return ["50%", "50%"];
            case "top":
                return ["50%", "0"];
            case "bottom":
                return ["50%", "100%"];
            case "left":
                return ["0", "50%"];
            case "right":
                return ["100%", "50%"];
            default:
                return [e, "50%"]
        }
    }

    function i(e, t, r) {
        function i(e, t) {
            var r = s.createShader(e);
            if (s.shaderSource(r, t), s.compileShader(r), !s.getShaderParameter(r, s.COMPILE_STATUS))
                throw new Error("compile error: " + s.getShaderInfoLog(r));
            return r
        }

        var o = {};
        if (o.id = s.createProgram(), s.attachShader(o.id, i(s.VERTEX_SHADER, e)), s.attachShader(o.id, i(s.FRAGMENT_SHADER, t)), s.linkProgram(o.id), !s.getProgramParameter(o.id, s.LINK_STATUS))
            throw new Error("link error: " + s.getProgramInfoLog(o.id));
        o.uniforms = {}, o.locations = {}, s.useProgram(o.id), s.enableVertexAttribArray(0);
        for (var n, a, u = /uniform (\w+) (\w+)/g, h = e + t; null != (n = u.exec(h));) a = n[2], o.locations[a] = s.getUniformLocation(o.id, a);
        return o
    }

    function o(e, t) {
        s.activeTexture(s.TEXTURE0 + (t || 0)), s.bindTexture(s.TEXTURE_2D, e)
    }

    function n(e) {
        var t = /url\(["']?([^"']*)["']?\)/.exec(e);
        return null == t ? null : t[1]
    }

    function a(e) {
        return e.match(/^data:/)
    }

    var s,
        u = (e = e && "default" in e ? e.default : e)(window),
        h = function () {
            function e(e, t, i) {
                var o = "OES_texture_" + e,
                    n = o + "_linear",
                    a = n in r,
                    s = [o];
                return a && s.push(n), {
                    type: t,
                    arrayType: i,
                    linearSupport: a,
                    extensions: s
                }
            }

            var t = document.createElement("canvas");
            if (!(s = t.getContext("webgl") || t.getContext("experimental-webgl"))) return null;
            var r = {};
            if (["OES_texture_float", "OES_texture_half_float", "OES_texture_float_linear", "OES_texture_half_float_linear"].forEach(function (e) {
                var t = s.getExtension(e);
                t && (r[e] = t)
            }), !r.OES_texture_float) return null;
            var i = [];
            i.push(e("float", s.FLOAT, Float32Array)), r.OES_texture_half_float && i.push(e("half_float", r.OES_texture_half_float.HALF_FLOAT_OES, null));
            var o = s.createTexture(),
                n = s.createFramebuffer();
            s.bindFramebuffer(s.FRAMEBUFFER, n), s.bindTexture(s.TEXTURE_2D, o), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_MIN_FILTER, s.NEAREST), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_MAG_FILTER, s.NEAREST), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_WRAP_S, s.CLAMP_TO_EDGE), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_WRAP_T, s.CLAMP_TO_EDGE);
            for (var a = null, u = 0; u < i.length; u++)
                if (s.texImage2D(s.TEXTURE_2D, 0, s.RGBA, 32, 32, 0, s.RGBA, i[u].type, null), s.framebufferTexture2D(s.FRAMEBUFFER, s.COLOR_ATTACHMENT0, s.TEXTURE_2D, o, 0), s.checkFramebufferStatus(s.FRAMEBUFFER) === s.FRAMEBUFFER_COMPLETE) {
                    a = i[u];
                    break
                }
            return a
        }(),
        c = function (e, t) {
            try {
                return new ImageData(e, t)
            } catch (r) {
                return document.createElement("canvas").getContext("2d").createImageData(e, t)
            }
        }(32, 32);
    e("head").prepend("<style>.jquery-ripples { position: relative; z-index: 0; }</style>");
    var d = function (t, r) {
        function i() {
            o.destroyed || (o.step(), requestAnimationFrame(i))
        }

        var o = this;
        this.$el = e(t), this.interactive = r.interactive, this.resolution = r.resolution, this.textureDelta = new Float32Array([1 / this.resolution, 1 / this.resolution]), this.perturbance = r.perturbance, this.dropRadius = r.dropRadius, this.crossOrigin = r.crossOrigin, this.imageUrl = r.imageUrl;
        var n = document.createElement("canvas");
        n.width = this.$el.innerWidth(), n.height = this.$el.innerHeight(), this.canvas = n, this.$canvas = e(n), this.$canvas.css({
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            zIndex: -1
        }), this.$el.addClass("jquery-ripples").append(n), this.context = s = n.getContext("webgl") || n.getContext("experimental-webgl"), h.extensions.forEach(function (e) {
            s.getExtension(e)
        }), e(window).on("resize", function () {
            o.updateSize()
        }), this.textures = [], this.framebuffers = [], this.bufferWriteIndex = 0, this.bufferReadIndex = 1;
        for (var a = h.arrayType, u = a ? new a(this.resolution * this.resolution * 4) : null, c = 0; c < 2; c++) {
            var d = s.createTexture(),
                f = s.createFramebuffer();
            s.bindFramebuffer(s.FRAMEBUFFER, f), s.bindTexture(s.TEXTURE_2D, d), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_MIN_FILTER, h.linearSupport ? s.LINEAR : s.NEAREST), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_MAG_FILTER, h.linearSupport ? s.LINEAR : s.NEAREST), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_WRAP_S, s.CLAMP_TO_EDGE), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_WRAP_T, s.CLAMP_TO_EDGE), s.texImage2D(s.TEXTURE_2D, 0, s.RGBA, this.resolution, this.resolution, 0, s.RGBA, h.type, u), s.framebufferTexture2D(s.FRAMEBUFFER, s.COLOR_ATTACHMENT0, s.TEXTURE_2D, d, 0), this.textures.push(d), this.framebuffers.push(f)
        }
        this.quad = s.createBuffer(), s.bindBuffer(s.ARRAY_BUFFER, this.quad), s.bufferData(s.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]), s.STATIC_DRAW), this.initShaders(), this.initTexture(), this.setTransparentTexture(), this.loadImage(), s.clearColor(0, 0, 0, 0), s.blendFunc(s.SRC_ALPHA, s.ONE_MINUS_SRC_ALPHA), this.visible = !0, this.running = !0, this.inited = !0, this.destroyed = !1, this.setupPointerEvents(), requestAnimationFrame(i)
    };
    d.DEFAULTS = {
        imageUrl: null,
        resolution: 256,
        dropRadius: 20,
        perturbance: .03,
        interactive: !0,
        crossOrigin: ""
    }, d.prototype = {
        setupPointerEvents: function () {
            function e() {
                return r.visible && r.running && r.interactive
            }

            function t(t, i) {
                e() && r.dropAtPointer(t, r.dropRadius * (i ? 1.5 : 1), i ? .14 : .01)
            }

            var r = this;
            this.$el.on("mousemove.ripples", function (e) {
                t(e)
            }).on("touchmove.ripples, touchstart.ripples", function (e) {
                for (var r = e.originalEvent.changedTouches, i = 0; i < r.length; i++) t(r[i])
            }).on("mousedown.ripples", function (e) {
                t(e, !0)
            })
        },
        loadImage: function () {
            var e = this;
            s = this.context;
            var t = this.imageUrl || n(this.originalCssBackgroundImage) || n(this.$el.css("backgroundImage"));
            if (t != this.imageSource)
                if (this.imageSource = t, this.imageSource) {
                    var r = new Image;
                    r.onload = function () {
                        function t(e) {
                            return 0 == (e & e - 1)
                        }

                        s = e.context;
                        var i = t(r.width) && t(r.height) ? s.REPEAT : s.CLAMP_TO_EDGE;
                        s.bindTexture(s.TEXTURE_2D, e.backgroundTexture), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_WRAP_S, i), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_WRAP_T, i), s.texImage2D(s.TEXTURE_2D, 0, s.RGBA, s.RGBA, s.UNSIGNED_BYTE, r), e.backgroundWidth = r.width, e.backgroundHeight = r.height, e.hideCssBackground()
                    }, r.onerror = function () {
                        s = e.context, e.setTransparentTexture()
                    }, r.crossOrigin = a(this.imageSource) ? null : this.crossOrigin, r.src = this.imageSource
                } else this.setTransparentTexture()
        },
        step: function () {
            s = this.context, this.visible && (this.computeTextureBoundaries(), this.running && this.update(), this.render())
        },
        drawQuad: function () {
            s.bindBuffer(s.ARRAY_BUFFER, this.quad), s.vertexAttribPointer(0, 2, s.FLOAT, !1, 0, 0), s.drawArrays(s.TRIANGLE_FAN, 0, 4)
        },
        render: function () {
            s.bindFramebuffer(s.FRAMEBUFFER, null), s.viewport(0, 0, this.canvas.width, this.canvas.height), s.enable(s.BLEND), s.clear(s.COLOR_BUFFER_BIT | s.DEPTH_BUFFER_BIT), s.useProgram(this.renderProgram.id), o(this.backgroundTexture, 0), o(this.textures[0], 1), s.uniform1f(this.renderProgram.locations.perturbance, this.perturbance), s.uniform2fv(this.renderProgram.locations.topLeft, this.renderProgram.uniforms.topLeft), s.uniform2fv(this.renderProgram.locations.bottomRight, this.renderProgram.uniforms.bottomRight), s.uniform2fv(this.renderProgram.locations.containerRatio, this.renderProgram.uniforms.containerRatio), s.uniform1i(this.renderProgram.locations.samplerBackground, 0), s.uniform1i(this.renderProgram.locations.samplerRipples, 1), this.drawQuad(), s.disable(s.BLEND)
        },
        update: function () {
            s.viewport(0, 0, this.resolution, this.resolution), s.bindFramebuffer(s.FRAMEBUFFER, this.framebuffers[this.bufferWriteIndex]), o(this.textures[this.bufferReadIndex]), s.useProgram(this.updateProgram.id), this.drawQuad(), this.swapBufferIndices()
        },
        swapBufferIndices: function () {
            this.bufferWriteIndex = 1 - this.bufferWriteIndex, this.bufferReadIndex = 1 - this.bufferReadIndex
        },
        computeTextureBoundaries: function () {
            var e,
                i = this.$el.css("background-size"),
                o = this.$el.css("background-attachment"),
                n = r(this.$el.css("background-position"));
            if ("fixed" == o ? ((e = {
                left: window.pageXOffset,
                top: window.pageYOffset
            }).width = u.width(), e.height = u.height()) : ((e = this.$el.offset()).width = this.$el.innerWidth(), e.height = this.$el.innerHeight()), "cover" == i) var a = Math.max(e.width / this.backgroundWidth, e.height / this.backgroundHeight),
                s = this.backgroundWidth * a,
                h = this.backgroundHeight * a;
            else if ("contain" == i) var a = Math.min(e.width / this.backgroundWidth, e.height / this.backgroundHeight),
                s = this.backgroundWidth * a,
                h = this.backgroundHeight * a; else {
                var s = (i = i.split(" "))[0] || "",
                    h = i[1] || s;
                t(s) ? s = e.width * parseFloat(s) / 100 : "auto" != s && (s = parseFloat(s)), t(h) ? h = e.height * parseFloat(h) / 100 : "auto" != h && (h = parseFloat(h)), "auto" == s && "auto" == h ? (s = this.backgroundWidth, h = this.backgroundHeight) : ("auto" == s && (s = this.backgroundWidth * (h / this.backgroundHeight)), "auto" == h && (h = this.backgroundHeight * (s / this.backgroundWidth)))
            }
            var c = n[0],
                d = n[1];
            c = t(c) ? e.left + (e.width - s) * parseFloat(c) / 100 : e.left + parseFloat(c), d = t(d) ? e.top + (e.height - h) * parseFloat(d) / 100 : e.top + parseFloat(d);
            var f = this.$el.offset();
            this.renderProgram.uniforms.topLeft = new Float32Array([(f.left - c) / s, (f.top - d) / h]), this.renderProgram.uniforms.bottomRight = new Float32Array([this.renderProgram.uniforms.topLeft[0] + this.$el.innerWidth() / s, this.renderProgram.uniforms.topLeft[1] + this.$el.innerHeight() / h]);
            var l = Math.max(this.canvas.width, this.canvas.height);
            this.renderProgram.uniforms.containerRatio = new Float32Array([this.canvas.width / l, this.canvas.height / l])
        },
        initShaders: function () {
            var e = ["attribute vec2 vertex;", "varying vec2 coord;", "void main() {", "coord = vertex * 0.5 + 0.5;", "gl_Position = vec4(vertex, 0.0, 1.0);", "}"].join("\n");
            this.dropProgram = i(e, ["precision highp float;", "const float PI = 3.141592653589793;", "uniform sampler2D texture;", "uniform vec2 center;", "uniform float radius;", "uniform float strength;", "varying vec2 coord;", "void main() {", "vec4 info = texture2D(texture, coord);", "float drop = max(0.0, 1.0 - length(center * 0.5 + 0.5 - coord) / radius);", "drop = 0.5 - cos(drop * PI) * 0.5;", "info.r += drop * strength;", "gl_FragColor = info;", "}"].join("\n")), this.updateProgram = i(e, ["precision highp float;", "uniform sampler2D texture;", "uniform vec2 delta;", "varying vec2 coord;", "void main() {", "vec4 info = texture2D(texture, coord);", "vec2 dx = vec2(delta.x, 0.0);", "vec2 dy = vec2(0.0, delta.y);", "float average = (", "texture2D(texture, coord - dx).r +", "texture2D(texture, coord - dy).r +", "texture2D(texture, coord + dx).r +", "texture2D(texture, coord + dy).r", ") * 0.25;", "info.g += (average - info.r) * 2.0;", "info.g *= 0.995;", "info.r += info.g;", "gl_FragColor = info;", "}"].join("\n")), s.uniform2fv(this.updateProgram.locations.delta, this.textureDelta), this.renderProgram = i(["precision highp float;", "attribute vec2 vertex;", "uniform vec2 topLeft;", "uniform vec2 bottomRight;", "uniform vec2 containerRatio;", "varying vec2 ripplesCoord;", "varying vec2 backgroundCoord;", "void main() {", "backgroundCoord = mix(topLeft, bottomRight, vertex * 0.5 + 0.5);", "backgroundCoord.y = 1.0 - backgroundCoord.y;", "ripplesCoord = vec2(vertex.x, -vertex.y) * containerRatio * 0.5 + 0.5;", "gl_Position = vec4(vertex.x, -vertex.y, 0.0, 1.0);", "}"].join("\n"), ["precision highp float;", "uniform sampler2D samplerBackground;", "uniform sampler2D samplerRipples;", "uniform vec2 delta;", "uniform float perturbance;", "varying vec2 ripplesCoord;", "varying vec2 backgroundCoord;", "void main() {", "float height = texture2D(samplerRipples, ripplesCoord).r;", "float heightX = texture2D(samplerRipples, vec2(ripplesCoord.x + delta.x, ripplesCoord.y)).r;", "float heightY = texture2D(samplerRipples, vec2(ripplesCoord.x, ripplesCoord.y + delta.y)).r;", "vec3 dx = vec3(delta.x, heightX - height, 0.0);", "vec3 dy = vec3(0.0, heightY - height, delta.y);", "vec2 offset = -normalize(cross(dy, dx)).xz;", "float specular = pow(max(0.0, dot(offset, normalize(vec2(-0.6, 1.0)))), 4.0);", "gl_FragColor = texture2D(samplerBackground, backgroundCoord + offset * perturbance) + specular;", "}"].join("\n")), s.uniform2fv(this.renderProgram.locations.delta, this.textureDelta)
        },
        initTexture: function () {
            this.backgroundTexture = s.createTexture(), s.bindTexture(s.TEXTURE_2D, this.backgroundTexture), s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL, 1), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_MAG_FILTER, s.LINEAR), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_MIN_FILTER, s.LINEAR)
        },
        setTransparentTexture: function () {
            s.bindTexture(s.TEXTURE_2D, this.backgroundTexture), s.texImage2D(s.TEXTURE_2D, 0, s.RGBA, s.RGBA, s.UNSIGNED_BYTE, c)
        },
        hideCssBackground: function () {
            var e = this.$el[0].style.backgroundImage;
            "none" != e && (this.originalInlineCss = e, this.originalCssBackgroundImage = this.$el.css("backgroundImage"), this.$el.css("backgroundImage", "none"))
        },
        restoreCssBackground: function () {
            this.$el.css("backgroundImage", this.originalInlineCss || "")
        },
        dropAtPointer: function (e, t, r) {
            var i = parseInt(this.$el.css("border-left-width")) || 0,
                o = parseInt(this.$el.css("border-top-width")) || 0;
            this.drop(e.pageX - this.$el.offset().left - i, e.pageY - this.$el.offset().top - o, t, r)
        },
        drop: function (e, t, r, i) {
            s = this.context;
            var n = this.$el.innerWidth(),
                a = this.$el.innerHeight(),
                u = Math.max(n, a);
            r /= u;
            var h = new Float32Array([(2 * e - n) / u, (a - 2 * t) / u]);
            s.viewport(0, 0, this.resolution, this.resolution), s.bindFramebuffer(s.FRAMEBUFFER, this.framebuffers[this.bufferWriteIndex]), o(this.textures[this.bufferReadIndex]), s.useProgram(this.dropProgram.id), s.uniform2fv(this.dropProgram.locations.center, h), s.uniform1f(this.dropProgram.locations.radius, r), s.uniform1f(this.dropProgram.locations.strength, i), this.drawQuad(), this.swapBufferIndices()
        },
        updateSize: function () {
            var e = this.$el.innerWidth(),
                t = this.$el.innerHeight();
            e == this.canvas.width && t == this.canvas.height || (this.canvas.width = e, this.canvas.height = t)
        },
        destroy: function () {
            this.$el.off(".ripples").removeClass("jquery-ripples").removeData("ripples"), this.$canvas.remove(), this.restoreCssBackground(), this.destroyed = !0
        },
        show: function () {
            this.visible = !0, this.$canvas.show(), this.hideCssBackground()
        },
        hide: function () {
            this.visible = !1, this.$canvas.hide(), this.restoreCssBackground()
        },
        pause: function () {
            this.running = !1
        },
        play: function () {
            this.running = !0
        },
        set: function (e, t) {
            switch (e) {
                case "dropRadius":
                case "perturbance":
                case "interactive":
                case "crossOrigin":
                    this[e] = t;
                    break;
                case "imageUrl":
                    this.imageUrl = t, this.loadImage()
            }
        }
    };
    var f = e.fn.ripples;
    e.fn.ripples = function (t) {
        if (!h)
            throw new Error("Your browser does not support WebGL, the OES_texture_float extension or rendering to floating point textures.");
        var r = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : void 0;
        return this.each(function () {
            var i = e(this),
                o = i.data("ripples"),
                n = e.extend({}, d.DEFAULTS, i.data(), "object" == typeof t && t);
            (o || "string" != typeof t) && (o ? "string" == typeof t && d.prototype[t].apply(o, r) : i.data("ripples", o = new d(this, n)))
        })
    }, e.fn.ripples.Constructor = d, e.fn.ripples.noConflict = function () {
        return e.fn.ripples = f, this
    }
});

//stars
function stars(selector, num, speed) {
    if ($(selector + ' #stars').length > 0) $(selector + ' #stars').remove();
    $(selector).append('<canvas id="stars" style="position:absolute;top:0;left:0;z-index:-1;width:100%;height:100%;opacity:0.75;"></canvas>');
    var canvas = $('canvas#stars')[0],
        ctx = canvas.getContext('2d'),
        w = canvas.width = window.innerWidth,
        h = canvas.height = window.innerHeight,
        hue = 217,
        stars = [],
        count = 0,
        maxStars = num || 400; // 星星数量

    var canvas2 = document.createElement('canvas'),
        ctx2 = canvas2.getContext('2d');
    canvas2.width = 100;
    canvas2.height = 100;
    var half = canvas2.width / 2,
        gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    gradient2.addColorStop(0.025, '#CCC');
    gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
    gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
    gradient2.addColorStop(1, 'transparent');

    ctx2.fillStyle = gradient2;
    ctx2.beginPath();
    ctx2.arc(half, half, half, 0, Math.PI * 2);
    ctx2.fill();

    // End cache

    function random(min, max) {
        if (arguments.length < 2) {
            max = min;
            min = 0;
        }

        if (min > max) {
            var hold = max;
            max = min;
            min = hold;
        }

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function maxOrbit(x, y) {
        var max = Math.max(x, y),
            diameter = Math.round(Math.sqrt(max * max + max * max));
        return diameter / 2;
        //星星移动范围，值越大范围越小，
    }

    var Star = function () {

        this.orbitRadius = random(maxOrbit(w, h));
        this.radius = random(60, this.orbitRadius) / 8;
        //星星大小
        this.orbitX = w / 2;
        this.orbitY = h / 2;
        this.timePassed = random(0, maxStars);
        this.speed = speed / 6000 || random(this.orbitRadius) / 60000;
        //星星移动速度
        this.alpha = random(2, 10) / 10;

        count++;
        stars[count] = this;
    }

    Star.prototype.draw = function () {
        var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
            y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
            twinkle = random(10);

        if (twinkle === 1 && this.alpha > 0) {
            this.alpha -= 0.05;
        } else if (twinkle === 2 && this.alpha < 1) {
            this.alpha += 0.05;
        }

        ctx.globalAlpha = this.alpha;
        ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
        this.timePassed += this.speed;
    }

    for (var i = 0; i < maxStars; i++) {
        new Star();
    }

    function animation() {
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 0.5; //尾巴
        ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)';
        ctx.fillRect(0, 0, w, h)

        ctx.globalCompositeOperation = 'lighter';
        for (var i = 1, l = stars.length; i < l; i++) {
            stars[i].draw();
        }
        ;

        window.requestAnimationFrame(animation);
    }

    animation();
} //end stars

//感谢 evanyou.me
function evanyou(selecter) {
    $(selecter).prepend('<canvas id="evanyou" style="position:fixed;z-index:-1;left:0;top:0;width:100%;height:100%;"></canvas>');
    var c = document.getElementById("evanyou"),
        x = c.getContext("2d"),
        pr = window.devicePixelRatio || 1,
        w = window.innerWidth,
        h = window.innerHeight,
        f = 90,
        q,
        m = Math,
        r = 0,
        u = m.PI * 2,
        v = m.cos,
        z = m.random;
    c.width = w * pr;
    c.height = h * pr;
    x.scale(pr, pr);
    x.globalAlpha = .6;

    function i() {
        x.clearRect(0, 0, w, h);
        q = [{
            x: 0,
            y: h * .7 + f
        }, {
            x: 0,
            y: h * .7 - f
        }];
        while (q[1].x < w + f) d(q[0], q[1]);
    }

    function d(i, j) {
        x.beginPath();
        x.moveTo(i.x, i.y);
        x.lineTo(j.x, j.y);
        var k = j.x + (z() * 2 - .25) * f,
            n = y(j.y);
        x.lineTo(k, n);
        x.closePath();
        r -= u / -50;
        x.fillStyle = "#" + (v(r) * 127 + 128 << 16 | v(r + u / 3) * 127 + 128 << 8 | v(r + u / 3 * 2) * 127 + 128).toString(16);
        x.fill();
        q[0] = q[1];
        q[1] = {
            x: k,
            y: n
        };
    }

    function y(p) {
        var t = p + (z() * 2 - 1.1) * f;
        return t > h || t < 0 ? y(p) : t;
    }

    document.onclick = i;
    document.ontouchstart = i;
    i();
}

//plusShare.js 依赖js.js
(function () {
    var plusReady = function (callback) {
        if (window.plus) {
            callback();
        } else {
            document.addEventListener('plusready', callback);
        }
    }
    var shareServices = {};
    var init = function () {
        plus.share.getServices(function (services) {
            for (var i = 0, len = services.length; i < len; i++) {
                shareServices[services[i].id] = services[i];
            }

        });
    };
    var isWechatInstalled = function () {
        return plus.runtime.isApplicationExist && plus.runtime.isApplicationExist({
            pname: 'com.tencent.mm',
            action: 'weixin://'
        });
    };

    function share(id, msg, callback) {
        var service = shareServices[id];
        if (!service) {
            callback && callback(false);
            return;
        }
        var _share = function () {
            service.send(msg, function () {
                plus.nativeUI.toast("分享到\"" + service.description + "\"成功！");
                callback && callback(true);
            }, function (e) {
                plus.nativeUI.toast("分享到\"" + service.description + "\"失败！");
                callback && callback(false);
            })
        };
        if (service.authenticated) {
            _share(service, msg, callback);
        } else {
            service.authorize(function () {
                _share(service, msg, callback);
            }, function (e) {
                console.log("认证授权失败");
                callback && callback(false);
            })
        }
    }
    ;

    function openSystem(msg, callback) {
        if (plus.share.sendWithSystem) {
            plus.share.sendWithSystem(msg, function () {
                //TODO 系统分享暂不支持回调
                //callback && callback(true);
            }, function () {
                //TODO 系统分享暂不支持回调
                //callback && callback(false);
            });
        } else {
            callback && callback(false);
        }
    }

    var open = function (msg, callback) {
        /**
         *如下情况直接打开系统分享
         * 1、未配置微信分享通道
         * 2、用户手机未安装威胁你
         * 3、360浏览器下
         */

        if (shareServices.weixin && isWechatInstalled() && !/360\sAphone/.test(navigator.userAgent)) {
            plus.nativeUI.actionSheet({
                title: ' ·  ·  ·  分 享  ·  ·  · ',
                cancel: "取消",
                buttons: [{
                    title: "微信朋友"
                }, {
                    title: " 发朋友圈"
                }, {
                    title: " 更多分享"
                }]
            }, function (e) {
                var index = e.index;
                switch (index) {
                    case 1: //分享到微信好友
                        msg.extra = {
                            scene: 'WXSceneSession'
                        };
                        share('weixin', msg, callback);
                        break;
                    case 2: //分享到微信朋友圈
                        msg.title = msg.title;
                        msg.extra = {
                            scene: 'WXSceneTimeline'
                        };
                        share('weixin', msg, callback);
                        break;
                    case 3: //更多分享
                        msg.content = '《' + msg.title + '》\n\n' + msg.content + '\n\n链接:';
                        openSystem(msg, callback);
                        break;
                }
            })
        } else {
            //系统分享
            msg.content = '《' + msg.title + '》\n\n' + msg.content + '\n\n链接:';
            openSystem(msg, callback);
        }
    };
    plusReady(init);
    window.plusShare = open;
})();

//plusShare分享
function myPlusShare() {
    if (navigator.userAgent.indexOf("Html5Plus") > -1) {
        //5+ 原生分享
        window.plusShare({
            title: shareData.title, //应用名字
            content: shareData.desc + '　\n\nMovie & Music & More',
            href: shareData.link, //分享出去后，点击跳转地址
            thumbs: [shareData.imgUrl] //分享缩略图
        }, function (result) {
            //分享回调
        });
    } else {
        //原有wap分享实现
    }
}

/*!
 *@name     jquery.barrager.js
 *@version  1.1
 *@author   yaseng@uauc.net
 *@url      https://github.com/yaseng/jquery.barrager.js
 */
(function ($) {
    $.fn.barrager = function (barrage) {
        barrage = $.extend({
            close: true,
            bottom: 0,
            max: 10,
            speed: 8,
            color: '#fff',
            old_ie_color: '#000000'
        }, barrage || {});
        var time = new Date().getTime();
        var barrager_id = 'barrage_' + time;
        var id = '#' + barrager_id;
        var div_barrager = $("<div class='barrage' id='" + barrager_id + "'></div>").appendTo($(this));
        var window_height = $(window).height() - 100;
        var this_height = (window_height > this.height()) ? this.height() : window_height;
        var window_width = $(window).width() + 500;
        var this_width = (window_width > this.width()) ? this.width() : window_width;
        var bottom = (barrage.bottom == 0) ? Math.floor(Math.random() * this_height + 40) : barrage.bottom;
        div_barrager.css("bottom", bottom + "px");
        div_barrager_box = $("<div class='barrage_box cl'></div>").appendTo(div_barrager);
        if (barrage.img) {
            div_barrager_box.append("<a class='portrait z' href='javascript:;'></a>");
            var img = $("<img src='' >").appendTo(id + " .barrage_box .portrait");
            img.attr('src', barrage.img)
        }
        div_barrager_box.append(" <div class='z p'></div>");
        if (barrage.close) {
            div_barrager_box.append(" <div class='close z'></div>")
        }
        var content = $("<a title='' href='' target='_blank'></a>").appendTo(id + " .barrage_box .p");
        content.attr({
            'href': barrage.href,
            'id': barrage.id
        }).empty().append(barrage.info);
        if (navigator.userAgent.indexOf("MSIE 6.0") > 0 || navigator.userAgent.indexOf("MSIE 7.0") > 0 || navigator.userAgent.indexOf("MSIE 8.0") > 0) {
            content.css('color', barrage.old_ie_color)
        } else {
            content.css('color', barrage.color)
        }
        var i = 0;
        div_barrager.css('margin-right', 0);
        $(id).animate({
            right: this_width
        }, barrage.speed * 1000, function () {
            $(id).remove()
        });
        div_barrager_box.mouseover(function () {
            $(id).stop(true)
        });
        div_barrager_box.mouseout(function () {
            $(id).animate({
                right: this_width
            }, barrage.speed * 1000, function () {
                $(id).remove()
            })
        });
        $(id + '.barrage .barrage_box .close').click(function () {
            $(id).remove()
        })
    };
    $.fn.barrager.removeAll = function () {
        $('.barrage').remove()
    }
})(jQuery);


//catchBall AD
function catchBall(url, speed) {
    if ($(".ball").length == 0) $("body").append('<div class="ball breath" onmouseover="catchBall(\'' + url + '\')" style="width: 48px;height: 48px;background: red;border-radius: 50%;position: fixed;z-index: 99999;bottom: 48px;right: 48px;color:white;font-size:32px;line-height:48px;text-align:center;cursor:pointer;">抢</div>');
    if (speed != undefined) return;
    var oBall = $(".ball")[0],
        leftNum = speed || 5;
    topNum = leftNum;
    var t1 = new Date().getTime();
    var dtime;
    ballcatched = false;
    oBall.onmouseover = function (e) {
        e.preventDefault();
        var t2 = new Date().getTime();
        if (!ballcatched)
            dtime = t2 - t1;
        //if(!ballcatched)alert('用时'+ Math.round(dtime/1000) +'秒！');
        if (confirm('用时' + Math.round(dtime / 1000) + '秒！是否打开活动页面？')) window.open(url);
        clearInterval(ballmove);
        $(".ball").addClass('shake shake-constant shake-slow');
        ballcatched = true;
    }

    //设置小球每次向下运动的像素值
    leftMax = document.documentElement.clientWidth - oBall.clientWidth;

    //浏览器窗口宽度减去小球的宽度等于小球能运动到的最大左边位置，下一行代码同理。
    topMax = document.documentElement.clientHeight - oBall.clientHeight;

    window.onresize = function () {
        //当浏览器窗口发生变化时，实时获取浏览器窗口的宽高
        leftMax = document.documentElement.clientWidth - oBall.clientWidth;
        topMax = document.documentElement.clientHeight - oBall.clientHeight;
    };

    ballmove = setInterval(function () {
        //为小球的运动新建一个计时器
        var Left = oBall.offsetLeft + leftNum, //小球每次运动完之后，距离浏览器左边边框的距离：上一次距离边框的距离加上这次运动的距离，下一行代码同理
            Top = oBall.offsetTop + topNum;
        //判断当小球向左移动的位置大于之前限定的最大距离或者小于0时，也就是超出浏览器窗口的左右边框时，
        //使他运动的方向取反leftNum = -leftNum，下面Top的判断同理。
        if (Left >= leftMax) {
            Left = leftMax;
            leftNum = -leftNum;
            ballBg(oBall);
        } else if (Left <= 0) {
            Left = 0;
            leftNum = -leftNum;
            ballBg(oBall);
        }
        if (Top >= topMax) {
            Top = topMax;
            topNum = -topNum;
            ballBg(oBall);
        } else if (Top <= 0) {
            Top = 0;
            topNum = -topNum;
            ballBg(oBall);
        }
        oBall.style.left = Left + "px";
        oBall.style.top = Top + "px";
    }, 10);

    //小球每次执行运动的时间
    function ballBg(obj) {
        //随机获取小球颜色
        var r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
        obj.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
    }
}
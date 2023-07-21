/*! @vimeo/player v2.15.3 | (c) 2021 Vimeo | MIT License | https://github.com/vimeo/player.js */
!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : (((e = "undefined" != typeof globalThis ? globalThis : e || self).Vimeo =
        e.Vimeo || {}),
      (e.Vimeo.Player = t()));
})(this, function () {
  "use strict";
  function e(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      (r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        "value" in r && (r.writable = !0),
        Object.defineProperty(e, r.key, r);
    }
  }
  var t =
    "undefined" != typeof global &&
    "[object global]" === {}.toString.call(global);
  function n(e, t) {
    return 0 === e.indexOf(t.toLowerCase())
      ? e
      : ""
          .concat(t.toLowerCase())
          .concat(e.substr(0, 1).toUpperCase())
          .concat(e.substr(1));
  }
  function r(e) {
    return /^(https?:)?\/\/((player|www)\.)?vimeo\.com(?=$|\/)/.test(e);
  }
  function o(e) {
    var t,
      n = 0 < arguments.length && void 0 !== e ? e : {},
      o = n.id,
      i = n.url,
      a = o || i;
    if (!a)
      throw new Error(
        "An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute."
      );
    if (((t = a), !isNaN(parseFloat(t)) && isFinite(t) && Math.floor(t) == t))
      return "https://vimeo.com/".concat(a);
    if (r(a)) return a.replace("http:", "https:");
    if (o) throw new TypeError("â€œ".concat(o, "â€ is not a valid video id."));
    throw new TypeError("â€œ".concat(a, "â€ is not a vimeo.com url."));
  }
  var i = void 0 !== Array.prototype.indexOf,
    a = "undefined" != typeof window && void 0 !== window.postMessage;
  if (!(t || (i && a)))
    throw new Error(
      "Sorry, the Vimeo Player API is not available in this browser."
    );
  var u,
    l,
    c,
    s =
      "undefined" != typeof globalThis
        ? globalThis
        : "undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : {};
  function f() {
    if (void 0 === this)
      throw new TypeError("Constructor WeakMap requires 'new'");
    if ((c(this, "_id", "_WeakMap_" + h() + "." + h()), 0 < arguments.length))
      throw new TypeError("WeakMap iterable is not supported");
  }
  function d(e, t) {
    if (!m(e) || !l.call(e, "_id"))
      throw new TypeError(
        t + " method called on incompatible receiver " + typeof e
      );
  }
  function h() {
    return Math.random().toString().substring(2);
  }
  function m(e) {
    return Object(e) === e;
  }
  (u =
    "undefined" != typeof self
      ? self
      : "undefined" != typeof window
      ? window
      : s).WeakMap ||
    ((l = Object.prototype.hasOwnProperty),
    (c = function (e, t, n) {
      Object.defineProperty
        ? Object.defineProperty(e, t, {
            configurable: !0,
            writable: !0,
            value: n,
          })
        : (e[t] = n);
    }),
    (u.WeakMap =
      (c(f.prototype, "delete", function (e) {
        if ((d(this, "delete"), !m(e))) return !1;
        var t = e[this._id];
        return !(!t || t[0] !== e || (delete e[this._id], 0));
      }),
      c(f.prototype, "get", function (e) {
        if ((d(this, "get"), m(e))) {
          var t = e[this._id];
          return t && t[0] === e ? t[1] : void 0;
        }
      }),
      c(f.prototype, "has", function (e) {
        if ((d(this, "has"), !m(e))) return !1;
        var t = e[this._id];
        return !(!t || t[0] !== e);
      }),
      c(f.prototype, "set", function (e, t) {
        if ((d(this, "set"), !m(e)))
          throw new TypeError("Invalid value used as weak map key");
        var n = e[this._id];
        return n && n[0] === e ? (n[1] = t) : c(e, this._id, [e, t]), this;
      }),
      c(f, "_polyfill", !0),
      f)));
  var v,
    p =
      ((function (e) {
        var t, n, r;
        (r = function () {
          var e,
            t,
            n,
            r,
            o,
            i,
            a = Object.prototype.toString,
            u =
              "undefined" != typeof setImmediate
                ? function (e) {
                    return setImmediate(e);
                  }
                : setTimeout;
          try {
            Object.defineProperty({}, "x", {}),
              (e = function (e, t, n, r) {
                return Object.defineProperty(e, t, {
                  value: n,
                  writable: !0,
                  configurable: !1 !== r,
                });
              });
          } catch (a) {
            e = function (e, t, n) {
              return (e[t] = n), e;
            };
          }
          function l(e, t) {
            (this.fn = e), (this.self = t), (this.next = void 0);
          }
          function c(e, r) {
            n.add(e, r), (t = t || u(n.drain));
          }
          function s(e) {
            var t,
              n = typeof e;
            return (
              null == e || ("object" != n && "function" != n) || (t = e.then),
              "function" == typeof t && t
            );
          }
          function f() {
            for (var e = 0; e < this.chain.length; e++)
              !(function (e, t, n) {
                var r, o;
                try {
                  !1 === t
                    ? n.reject(e.msg)
                    : (r = !0 === t ? e.msg : t.call(void 0, e.msg)) ===
                      n.promise
                    ? n.reject(TypeError("Promise-chain cycle"))
                    : (o = s(r))
                    ? o.call(r, n.resolve, n.reject)
                    : n.resolve(r);
                } catch (e) {
                  n.reject(e);
                }
              })(
                this,
                1 === this.state
                  ? this.chain[e].success
                  : this.chain[e].failure,
                this.chain[e]
              );
            this.chain.length = 0;
          }
          function d(e) {
            var t,
              n = this;
            if (!n.triggered) {
              (n.triggered = !0), n.def && (n = n.def);
              try {
                (t = s(e))
                  ? c(function () {
                      var r = new v(n);
                      try {
                        t.call(
                          e,
                          function () {
                            d.apply(r, arguments);
                          },
                          function () {
                            h.apply(r, arguments);
                          }
                        );
                      } catch (e) {
                        h.call(r, e);
                      }
                    })
                  : ((n.msg = e), (n.state = 1), 0 < n.chain.length && c(f, n));
              } catch (e) {
                h.call(new v(n), e);
              }
            }
          }
          function h(e) {
            var t = this;
            t.triggered ||
              ((t.triggered = !0),
              t.def && (t = t.def),
              (t.msg = e),
              (t.state = 2),
              0 < t.chain.length && c(f, t));
          }
          function m(e, t, n, r) {
            for (var o = 0; o < t.length; o++)
              !(function (o) {
                e.resolve(t[o]).then(function (e) {
                  n(o, e);
                }, r);
              })(o);
          }
          function v(e) {
            (this.def = e), (this.triggered = !1);
          }
          function p(e) {
            (this.promise = e),
              (this.state = 0),
              (this.triggered = !1),
              (this.chain = []),
              (this.msg = void 0);
          }
          function y(e) {
            if ("function" != typeof e) throw TypeError("Not a function");
            if (0 !== this.__NPO__) throw TypeError("Not a promise");
            this.__NPO__ = 1;
            var t = new p(this);
            (this.then = function (e, n) {
              var r = {
                success: "function" != typeof e || e,
                failure: "function" == typeof n && n,
              };
              return (
                (r.promise = new this.constructor(function (e, t) {
                  if ("function" != typeof e || "function" != typeof t)
                    throw TypeError("Not a function");
                  (r.resolve = e), (r.reject = t);
                })),
                t.chain.push(r),
                0 !== t.state && c(f, t),
                r.promise
              );
            }),
              (this.catch = function (e) {
                return this.then(void 0, e);
              });
            try {
              e.call(
                void 0,
                function (e) {
                  d.call(t, e);
                },
                function (e) {
                  h.call(t, e);
                }
              );
            } catch (e) {
              h.call(t, e);
            }
          }
          var g = e(
            {},
            "constructor",
            y,
            !(n = {
              add: function (e, t) {
                (i = new l(e, t)),
                  o ? (o.next = i) : (r = i),
                  (o = i),
                  (i = void 0);
              },
              drain: function () {
                var e = r;
                for (r = o = t = void 0; e; ) e.fn.call(e.self), (e = e.next);
              },
            })
          );
          return (
            e((y.prototype = g), "__NPO__", 0, !1),
            e(y, "resolve", function (e) {
              return e && "object" == typeof e && 1 === e.__NPO__
                ? e
                : new this(function (t, n) {
                    if ("function" != typeof t || "function" != typeof n)
                      throw TypeError("Not a function");
                    t(e);
                  });
            }),
            e(y, "reject", function (e) {
              return new this(function (t, n) {
                if ("function" != typeof t || "function" != typeof n)
                  throw TypeError("Not a function");
                n(e);
              });
            }),
            e(y, "all", function (e) {
              var t = this;
              return "[object Array]" != a.call(e)
                ? t.reject(TypeError("Not an array"))
                : 0 === e.length
                ? t.resolve([])
                : new t(function (n, r) {
                    if ("function" != typeof n || "function" != typeof r)
                      throw TypeError("Not a function");
                    var o = e.length,
                      i = Array(o),
                      a = 0;
                    m(
                      t,
                      e,
                      function (e, t) {
                        (i[e] = t), ++a === o && n(i);
                      },
                      r
                    );
                  });
            }),
            e(y, "race", function (e) {
              var t = this;
              return "[object Array]" != a.call(e)
                ? t.reject(TypeError("Not an array"))
                : new t(function (n, r) {
                    if ("function" != typeof n || "function" != typeof r)
                      throw TypeError("Not a function");
                    m(
                      t,
                      e,
                      function (e, t) {
                        n(t);
                      },
                      r
                    );
                  });
            }),
            y
          );
        }),
          ((n = s)[(t = "Promise")] = n[t] || r()),
          e.exports && (e.exports = n[t]);
      })((v = { exports: {} })),
      v.exports),
    y = new WeakMap();
  function g(e, t, n) {
    var r = y.get(e.element) || {};
    t in r || (r[t] = []), r[t].push(n), y.set(e.element, r);
  }
  function w(e, t) {
    return (y.get(e.element) || {})[t] || [];
  }
  function b(e, t, n) {
    var r = y.get(e.element) || {};
    if (!r[t]) return !0;
    if (!n) return (r[t] = []), y.set(e.element, r), !0;
    var o = r[t].indexOf(n);
    return (
      -1 !== o && r[t].splice(o, 1),
      y.set(e.element, r),
      r[t] && 0 === r[t].length
    );
  }
  var k = [
    "autopause",
    "autoplay",
    "background",
    "byline",
    "color",
    "controls",
    "dnt",
    "height",
    "id",
    "loop",
    "maxheight",
    "maxwidth",
    "muted",
    "playsinline",
    "portrait",
    "responsive",
    "speed",
    "texttrack",
    "title",
    "transparent",
    "url",
    "width",
  ];
  function E(e, t) {
    var n = 1 < arguments.length && void 0 !== t ? t : {};
    return k.reduce(function (t, n) {
      var r = e.getAttribute("data-vimeo-".concat(n));
      return (!r && "" !== r) || (t[n] = "" === r ? 1 : r), t;
    }, n);
  }
  function T(e, t) {
    var n = e.html;
    if (!t) throw new TypeError("An element must be provided");
    if (null !== t.getAttribute("data-vimeo-initialized"))
      return t.querySelector("iframe");
    var r = document.createElement("div");
    return (
      (r.innerHTML = n),
      t.appendChild(r.firstChild),
      t.setAttribute("data-vimeo-initialized", "true"),
      t.querySelector("iframe")
    );
  }
  function P(e, t, n) {
    var o = 1 < arguments.length && void 0 !== t ? t : {},
      i = 2 < arguments.length ? n : void 0;
    return new Promise(function (t, n) {
      if (!r(e))
        throw new TypeError("â€œ".concat(e, "â€ is not a vimeo.com url."));
      var a = "https://vimeo.com/api/oembed.json?url=".concat(
        encodeURIComponent(e)
      );
      for (var u in o)
        o.hasOwnProperty(u) &&
          (a += "&".concat(u, "=").concat(encodeURIComponent(o[u])));
      var l = new (
        "XDomainRequest" in window ? XDomainRequest : XMLHttpRequest
      )();
      l.open("GET", a, !0),
        (l.onload = function () {
          if (404 !== l.status)
            if (403 !== l.status)
              try {
                var r = JSON.parse(l.responseText);
                if (403 === r.domain_status_code)
                  return (
                    T(r, i),
                    void n(new Error("â€œ".concat(e, "â€ is not embeddable.")))
                  );
                t(r);
              } catch (r) {
                n(r);
              }
            else n(new Error("â€œ".concat(e, "â€ is not embeddable.")));
          else n(new Error("â€œ".concat(e, "â€ was not found.")));
        }),
        (l.onerror = function () {
          var e = l.status ? " (".concat(l.status, ")") : "";
          n(
            new Error(
              "There was an error fetching the embed code from Vimeo".concat(
                e,
                "."
              )
            )
          );
        }),
        l.send();
    });
  }
  function _(e) {
    if ("string" == typeof e)
      try {
        e = JSON.parse(e);
      } catch (e) {
        return console.warn(e), {};
      }
    return e;
  }
  function M(e, t, n) {
    var r, o;
    e.element.contentWindow &&
      e.element.contentWindow.postMessage &&
      ((r = { method: t }),
      void 0 !== n && (r.value = n),
      8 <=
        (o = parseFloat(
          navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/, "$1")
        )) &&
        o < 10 &&
        (r = JSON.stringify(r)),
      e.element.contentWindow.postMessage(r, e.origin));
  }
  function N(e, t) {
    var n,
      r,
      o = [];
    (t = _(t)).event
      ? ("error" === t.event &&
          w(e, t.data.method).forEach(function (n) {
            var r = new Error(t.data.message);
            (r.name = t.data.name), n.reject(r), b(e, t.data.method, n);
          }),
        (o = w(e, "event:".concat(t.event))),
        (n = t.data))
      : !t.method ||
        ((r = (function (e, t) {
          var n = w(e, t);
          if (n.length < 1) return !1;
          var r = n.shift();
          return b(e, t, r), r;
        })(e, t.method)) &&
          (o.push(r), (n = t.value))),
      o.forEach(function (t) {
        try {
          if ("function" == typeof t) return void t.call(e, n);
          t.resolve(n);
        } catch (t) {}
      });
  }
  var F,
    x,
    C,
    j = new WeakMap(),
    A = new WeakMap(),
    q = {},
    S = (function () {
      function t(e) {
        var n,
          i,
          a = this,
          u =
            1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
        if (
          ((function (e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, t),
          window.jQuery &&
            e instanceof jQuery &&
            (1 < e.length &&
              window.console &&
              console.warn &&
              console.warn(
                "A jQuery object with multiple elements was passed, using the first element."
              ),
            (e = e[0])),
          "undefined" != typeof document &&
            "string" == typeof e &&
            (e = document.getElementById(e)),
          (n = e),
          !Boolean(
            n &&
              1 === n.nodeType &&
              "nodeName" in n &&
              n.ownerDocument &&
              n.ownerDocument.defaultView
          ))
        )
          throw new TypeError(
            "You must pass either a valid element or a valid id."
          );
        if (
          ("IFRAME" === e.nodeName ||
            ((i = e.querySelector("iframe")) && (e = i)),
          "IFRAME" === e.nodeName && !r(e.getAttribute("src") || ""))
        )
          throw new Error("The player element passed isnâ€™t a Vimeo embed.");
        if (j.has(e)) return j.get(e);
        (this._window = e.ownerDocument.defaultView),
          (this.element = e),
          (this.origin = "*");
        var l,
          c = new p(function (t, n) {
            var i;
            (a._onMessage = function (e) {
              if (r(e.origin) && a.element.contentWindow === e.source) {
                "*" === a.origin && (a.origin = e.origin);
                var o = _(e.data);
                if (
                  o &&
                  "error" === o.event &&
                  o.data &&
                  "ready" === o.data.method
                ) {
                  var i = new Error(o.data.message);
                  return (i.name = o.data.name), void n(i);
                }
                var u = o && "ready" === o.event,
                  l = o && "ping" === o.method;
                if (u || l)
                  return a.element.setAttribute("data-ready", "true"), void t();
                N(a, o);
              }
            }),
              a._window.addEventListener("message", a._onMessage),
              "IFRAME" !== a.element.nodeName &&
                P(o((i = E(e, u))), i, e)
                  .then(function (t) {
                    var n,
                      r,
                      o,
                      i = T(t, e);
                    return (
                      (a.element = i),
                      (a._originalElement = e),
                      (n = e),
                      (r = i),
                      (o = y.get(n)),
                      y.set(r, o),
                      y.delete(n),
                      j.set(a.element, a),
                      t
                    );
                  })
                  .catch(n);
          });
        return (
          A.set(this, c),
          j.set(this.element, this),
          "IFRAME" === this.element.nodeName && M(this, "ping"),
          q.isEnabled &&
            ((l = function () {
              return q.exit();
            }),
            q.on("fullscreenchange", function () {
              (q.isFullscreen ? g : b)(a, "event:exitFullscreen", l),
                a.ready().then(function () {
                  M(a, "fullscreenchange", q.isFullscreen);
                });
            })),
          this
        );
      }
      var i, a;
      return (
        (i = t),
        (a = [
          {
            key: "callMethod",
            value: function (e, t) {
              var n = this,
                r = 1 < arguments.length && void 0 !== t ? t : {};
              return new p(function (t, o) {
                return n
                  .ready()
                  .then(function () {
                    g(n, e, { resolve: t, reject: o }), M(n, e, r);
                  })
                  .catch(o);
              });
            },
          },
          {
            key: "get",
            value: function (e) {
              var t = this;
              return new p(function (r, o) {
                return (
                  (e = n(e, "get")),
                  t
                    .ready()
                    .then(function () {
                      g(t, e, { resolve: r, reject: o }), M(t, e);
                    })
                    .catch(o)
                );
              });
            },
          },
          {
            key: "set",
            value: function (e, t) {
              var r = this;
              return new p(function (o, i) {
                if (((e = n(e, "set")), null == t))
                  throw new TypeError("There must be a value to set.");
                return r
                  .ready()
                  .then(function () {
                    g(r, e, { resolve: o, reject: i }), M(r, e, t);
                  })
                  .catch(i);
              });
            },
          },
          {
            key: "on",
            value: function (e, t) {
              if (!e) throw new TypeError("You must pass an event name.");
              if (!t) throw new TypeError("You must pass a callback function.");
              if ("function" != typeof t)
                throw new TypeError("The callback must be a function.");
              0 === w(this, "event:".concat(e)).length &&
                this.callMethod("addEventListener", e).catch(function () {}),
                g(this, "event:".concat(e), t);
            },
          },
          {
            key: "off",
            value: function (e, t) {
              if (!e) throw new TypeError("You must pass an event name.");
              if (t && "function" != typeof t)
                throw new TypeError("The callback must be a function.");
              b(this, "event:".concat(e), t) &&
                this.callMethod("removeEventListener", e).catch(function (
                  e
                ) {});
            },
          },
          {
            key: "loadVideo",
            value: function (e) {
              return this.callMethod("loadVideo", e);
            },
          },
          {
            key: "ready",
            value: function () {
              var e =
                A.get(this) ||
                new p(function (e, t) {
                  t(new Error("Unknown player. Probably unloaded."));
                });
              return p.resolve(e);
            },
          },
          {
            key: "addCuePoint",
            value: function (e, t) {
              var n = 1 < arguments.length && void 0 !== t ? t : {};
              return this.callMethod("addCuePoint", { time: e, data: n });
            },
          },
          {
            key: "removeCuePoint",
            value: function (e) {
              return this.callMethod("removeCuePoint", e);
            },
          },
          {
            key: "enableTextTrack",
            value: function (e, t) {
              if (!e) throw new TypeError("You must pass a language.");
              return this.callMethod("enableTextTrack", {
                language: e,
                kind: t,
              });
            },
          },
          {
            key: "disableTextTrack",
            value: function () {
              return this.callMethod("disableTextTrack");
            },
          },
          {
            key: "pause",
            value: function () {
              return this.callMethod("pause");
            },
          },
          {
            key: "play",
            value: function () {
              return this.callMethod("play");
            },
          },
          {
            key: "requestFullscreen",
            value: function () {
              return q.isEnabled
                ? q.request(this.element)
                : this.callMethod("requestFullscreen");
            },
          },
          {
            key: "exitFullscreen",
            value: function () {
              return q.isEnabled ? q.exit() : this.callMethod("exitFullscreen");
            },
          },
          {
            key: "getFullscreen",
            value: function () {
              return q.isEnabled
                ? p.resolve(q.isFullscreen)
                : this.get("fullscreen");
            },
          },
          {
            key: "requestPictureInPicture",
            value: function () {
              return this.callMethod("requestPictureInPicture");
            },
          },
          {
            key: "exitPictureInPicture",
            value: function () {
              return this.callMethod("exitPictureInPicture");
            },
          },
          {
            key: "getPictureInPicture",
            value: function () {
              return this.get("pictureInPicture");
            },
          },
          {
            key: "unload",
            value: function () {
              return this.callMethod("unload");
            },
          },
          {
            key: "destroy",
            value: function () {
              var e = this;
              return new p(function (t) {
                var n;
                A.delete(e),
                  j.delete(e.element),
                  e._originalElement &&
                    (j.delete(e._originalElement),
                    e._originalElement.removeAttribute(
                      "data-vimeo-initialized"
                    )),
                  e.element &&
                    "IFRAME" === e.element.nodeName &&
                    e.element.parentNode &&
                    (e.element.parentNode.parentNode &&
                    e._originalElement &&
                    e._originalElement !== e.element.parentNode
                      ? e.element.parentNode.parentNode.removeChild(
                          e.element.parentNode
                        )
                      : e.element.parentNode.removeChild(e.element)),
                  e.element &&
                    "DIV" === e.element.nodeName &&
                    e.element.parentNode &&
                    (e.element.removeAttribute("data-vimeo-initialized"),
                    (n = e.element.querySelector("iframe")) &&
                      n.parentNode &&
                      (n.parentNode.parentNode &&
                      e._originalElement &&
                      e._originalElement !== n.parentNode
                        ? n.parentNode.parentNode.removeChild(n.parentNode)
                        : n.parentNode.removeChild(n))),
                  e._window.removeEventListener("message", e._onMessage),
                  t();
              });
            },
          },
          {
            key: "getAutopause",
            value: function () {
              return this.get("autopause");
            },
          },
          {
            key: "setAutopause",
            value: function (e) {
              return this.set("autopause", e);
            },
          },
          {
            key: "getBuffered",
            value: function () {
              return this.get("buffered");
            },
          },
          {
            key: "getCameraProps",
            value: function () {
              return this.get("cameraProps");
            },
          },
          {
            key: "setCameraProps",
            value: function (e) {
              return this.set("cameraProps", e);
            },
          },
          {
            key: "getChapters",
            value: function () {
              return this.get("chapters");
            },
          },
          {
            key: "getCurrentChapter",
            value: function () {
              return this.get("currentChapter");
            },
          },
          {
            key: "getColor",
            value: function () {
              return this.get("color");
            },
          },
          {
            key: "setColor",
            value: function (e) {
              return this.set("color", e);
            },
          },
          {
            key: "getCuePoints",
            value: function () {
              return this.get("cuePoints");
            },
          },
          {
            key: "getCurrentTime",
            value: function () {
              return this.get("currentTime");
            },
          },
          {
            key: "setCurrentTime",
            value: function (e) {
              return this.set("currentTime", e);
            },
          },
          {
            key: "getDuration",
            value: function () {
              return this.get("duration");
            },
          },
          {
            key: "getEnded",
            value: function () {
              return this.get("ended");
            },
          },
          {
            key: "getLoop",
            value: function () {
              return this.get("loop");
            },
          },
          {
            key: "setLoop",
            value: function (e) {
              return this.set("loop", e);
            },
          },
          {
            key: "setMuted",
            value: function (e) {
              return this.set("muted", e);
            },
          },
          {
            key: "getMuted",
            value: function () {
              return this.get("muted");
            },
          },
          {
            key: "getPaused",
            value: function () {
              return this.get("paused");
            },
          },
          {
            key: "getPlaybackRate",
            value: function () {
              return this.get("playbackRate");
            },
          },
          {
            key: "setPlaybackRate",
            value: function (e) {
              return this.set("playbackRate", e);
            },
          },
          {
            key: "getPlayed",
            value: function () {
              return this.get("played");
            },
          },
          {
            key: "getQualities",
            value: function () {
              return this.get("qualities");
            },
          },
          {
            key: "getQuality",
            value: function () {
              return this.get("quality");
            },
          },
          {
            key: "setQuality",
            value: function (e) {
              return this.set("quality", e);
            },
          },
          {
            key: "getSeekable",
            value: function () {
              return this.get("seekable");
            },
          },
          {
            key: "getSeeking",
            value: function () {
              return this.get("seeking");
            },
          },
          {
            key: "getTextTracks",
            value: function () {
              return this.get("textTracks");
            },
          },
          {
            key: "getVideoEmbedCode",
            value: function () {
              return this.get("videoEmbedCode");
            },
          },
          {
            key: "getVideoId",
            value: function () {
              return this.get("videoId");
            },
          },
          {
            key: "getVideoTitle",
            value: function () {
              return this.get("videoTitle");
            },
          },
          {
            key: "getVideoWidth",
            value: function () {
              return this.get("videoWidth");
            },
          },
          {
            key: "getVideoHeight",
            value: function () {
              return this.get("videoHeight");
            },
          },
          {
            key: "getVideoUrl",
            value: function () {
              return this.get("videoUrl");
            },
          },
          {
            key: "getVolume",
            value: function () {
              return this.get("volume");
            },
          },
          {
            key: "setVolume",
            value: function (e) {
              return this.set("volume", e);
            },
          },
        ]) && e(i.prototype, a),
        t
      );
    })();
  return (
    t ||
      ((F = (function () {
        for (
          var e,
            t = [
              [
                "requestFullscreen",
                "exitFullscreen",
                "fullscreenElement",
                "fullscreenEnabled",
                "fullscreenchange",
                "fullscreenerror",
              ],
              [
                "webkitRequestFullscreen",
                "webkitExitFullscreen",
                "webkitFullscreenElement",
                "webkitFullscreenEnabled",
                "webkitfullscreenchange",
                "webkitfullscreenerror",
              ],
              [
                "webkitRequestFullScreen",
                "webkitCancelFullScreen",
                "webkitCurrentFullScreenElement",
                "webkitCancelFullScreen",
                "webkitfullscreenchange",
                "webkitfullscreenerror",
              ],
              [
                "mozRequestFullScreen",
                "mozCancelFullScreen",
                "mozFullScreenElement",
                "mozFullScreenEnabled",
                "mozfullscreenchange",
                "mozfullscreenerror",
              ],
              [
                "msRequestFullscreen",
                "msExitFullscreen",
                "msFullscreenElement",
                "msFullscreenEnabled",
                "MSFullscreenChange",
                "MSFullscreenError",
              ],
            ],
            n = 0,
            r = t.length,
            o = {};
          n < r;
          n++
        )
          if ((e = t[n]) && e[1] in document) {
            for (n = 0; n < e.length; n++) o[t[0][n]] = e[n];
            return o;
          }
        return !1;
      })()),
      (x = {
        fullscreenchange: F.fullscreenchange,
        fullscreenerror: F.fullscreenerror,
      }),
      (C = {
        request: function (e) {
          return new Promise(function (t, n) {
            function r() {
              C.off("fullscreenchange", r), t();
            }
            C.on("fullscreenchange", r);
            var o = (e = e || document.documentElement)[F.requestFullscreen]();
            o instanceof Promise && o.then(r).catch(n);
          });
        },
        exit: function () {
          return new Promise(function (e, t) {
            var n, r;
            C.isFullscreen
              ? ((n = function t() {
                  C.off("fullscreenchange", t), e();
                }),
                C.on("fullscreenchange", n),
                (r = document[F.exitFullscreen]()) instanceof Promise &&
                  r.then(n).catch(t))
              : e();
          });
        },
        on: function (e, t) {
          var n = x[e];
          n && document.addEventListener(n, t);
        },
        off: function (e, t) {
          var n = x[e];
          n && document.removeEventListener(n, t);
        },
      }),
      Object.defineProperties(C, {
        isFullscreen: {
          get: function () {
            return Boolean(document[F.fullscreenElement]);
          },
        },
        element: {
          enumerable: !0,
          get: function () {
            return document[F.fullscreenElement];
          },
        },
        isEnabled: {
          enumerable: !0,
          get: function () {
            return Boolean(document[F.fullscreenEnabled]);
          },
        },
      }),
      (q = C),
      (function (e) {
        function t(e) {
          "console" in window &&
            console.error &&
            console.error("There was an error creating an embed: ".concat(e));
        }
        var n = 0 < arguments.length && void 0 !== e ? e : document;
        [].slice
          .call(n.querySelectorAll("[data-vimeo-id], [data-vimeo-url]"))
          .forEach(function (e) {
            try {
              if (null !== e.getAttribute("data-vimeo-defer")) return;
              var n = E(e);
              P(o(n), n, e)
                .then(function (t) {
                  return T(t, e);
                })
                .catch(t);
            } catch (n) {
              t(n);
            }
          });
      })(),
      (function (e) {
        var t = 0 < arguments.length && void 0 !== e ? e : document;
        window.VimeoPlayerResizeEmbeds_ ||
          ((window.VimeoPlayerResizeEmbeds_ = !0),
          window.addEventListener("message", function (e) {
            if (r(e.origin) && e.data && "spacechange" === e.data.event)
              for (
                var n = t.querySelectorAll("iframe"), o = 0;
                o < n.length;
                o++
              )
                if (n[o].contentWindow === e.source) {
                  n[o].parentElement.style.paddingBottom = "".concat(
                    e.data.data[0].bottom,
                    "px"
                  );
                  break;
                }
          }));
      })()),
    S
  );
});

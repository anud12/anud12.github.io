var mainComponent = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // external-global-plugin:react
  var require_react = __commonJS({
    "external-global-plugin:react"(exports, module) {
      module.exports = globalThis.React;
    }
  });

  // index.tsx
  var src_exports = {};
  __export(src_exports, {
    default: () => src_default
  });
  var import_react8 = __toESM(require_react());

  // node_modules/anud12.github.io_ui_base/src/components/Page.tsx
  var import_react7 = __toESM(require_react());

  // node_modules/anud12.github.io_ui_base/src/components/Comment.tsx
  var import_react = __toESM(require_react());
  var Comment = ({ children }) => {
    return /* @__PURE__ */ import_react.default.createElement("div", { dangerouslySetInnerHTML: { __html: `<!-- ${children} -->` } });
  };

  // node_modules/anud12.github.io_ui_base/src/components/Header.tsx
  var import_react6 = __toESM(require_react());

  // node_modules/anud12.github.io_ui_base/src/components/Container.tsx
  var import_react2 = __toESM(require_react());
  var CardContainer = (props) => {
    return /* @__PURE__ */ import_react2.default.createElement("div", { className: "container-container" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: `container card-container ${props.className ?? ""}`.trim() }, props.children));
  };

  // node_modules/anud12.github.io_ui_base/src/components/atoms/Link.tsx
  var import_react3 = __toESM(require_react());

  // node_modules/anud12.github.io_ui_base/src/service/google/config.ts
  var config = {
    apiKey: "AIzaSyBtQ2WOyIUnaSWAhl3s5PA_LZkWtpWz5iA",
    clientId: "985280907031-ffvfnc8pi0ane99lso9dbl1m2l5oc9nn.apps.googleusercontent.com",
    scope: "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/userinfo.profile ",
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"]
  };

  // node_modules/anud12.github.io_ui_base/src/service/google/loadGoogleDependencies.ts
  var loadScript = (src) => new Promise((resolve, reject) => {
    if (!globalThis.document) {
      return;
    }
    resolve();
  });
  var loadGoogleDependencies = Promise.all([
    loadScript("https://apis.google.com/js/api.js"),
    loadScript("https://accounts.google.com/gsi/client")
  ]);

  // node_modules/anud12.github.io_ui_base/src/service/google/gapiClientPromise.ts
  var gapiClientPromise = new Promise(async (resolve) => {
    await loadGoogleDependencies;
    gapi.load("client", async () => {
      const client = await gapi.client.init({
        apiKey: config.apiKey,
        discoveryDocs: config.discoveryDocs
      });
      await new Promise((resolve2) => gapi.client.load("sheets", "v4", function() {
        resolve2();
      }));
      resolve(gapi);
    });
  });

  // node_modules/anud12.github.io_ui_base/src/service/google/getExpirationDate.ts
  var getExpirationDate = async () => {
    const gapi2 = await gapiClientPromise;
    const token = gapi2?.auth?.getToken();
    if (!token) {
      return new Promise((res) => res(void 0));
    }
    return fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token.access_token}`).then(async (res) => {
      if (res.status !== 200) {
        throw Error(`getExpirationDate status ${res.status}`);
      }
      return (await res.json())?.expires_in;
    });
  };

  // node_modules/anud12.github.io_ui_base/src/service/google/tokenClientPromise.ts
  var tokenClientPromise = new Promise(async (res) => {
    await loadGoogleDependencies;
    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: config.clientId,
      scope: config.scope,
      redirect_uri: "http://localhost:8080",
      callback: () => {
      }
    });
    res(tokenClient);
  });

  // node_modules/anud12.github.io_ui_base/src/service/impl/newApi.ts
  function addQueryParam(value) {
    const newUrl = new URL(window.location.href);
    newUrl.hash = JSON.stringify(value);
    window.history.replaceState(null, "", newUrl.href);
  }
  var newApi = {
    sessionName: () => new Promise(async (resolve) => {
      const gapi2 = await gapiClientPromise;
      gapi2.client.request({
        "path": "https://people.googleapis.com/v1/people/me?personFields=names",
        "method": "GET",
        "callback": function(response) {
          resolve(response?.names?.[0]?.displayName);
        }
      });
    }),
    loadFromUrl: async () => {
      const gapi2 = await gapiClientPromise;
      const credentialsFromUrl = decodeURI(window.location.hash.replace("#", ""));
      if (credentialsFromUrl) {
        const credentials = JSON.parse(credentialsFromUrl);
        await gapi2.client.init({});
        gapi2.client.setToken(credentials);
        document.dispatchEvent(new CustomEvent("newApi-onChange"));
      }
      return false;
    },
    onChange: (callback) => {
      const fn = (event) => {
        callback(event);
      };
      globalThis?.document?.addEventListener("newApi-onChange", fn);
      return () => globalThis?.document?.removeEventListener("newApi-onChange", fn);
    },
    logout: async () => {
      const gapi2 = await gapiClientPromise;
      gapi2.client.setToken(null);
      window.location.hash = "";
      document.dispatchEvent(new CustomEvent("newApi-onChange"));
    },
    login: async () => new Promise(async (resolve) => {
      const tokenClient = await tokenClientPromise;
      try {
        if (await newApi.loadFromUrl()) {
          await getExpirationDate();
          return;
        }
      } catch {
      }
      tokenClient.callback = (credentialsResponse) => {
        addQueryParam(credentialsResponse);
        document.dispatchEvent(new CustomEvent("newApi-onChange"));
        resolve();
      };
      tokenClient.requestAccessToken({ prompt: "consent" });
    })
  };

  // node_modules/anud12.github.io_ui_base/src/components/atoms/Link.tsx
  var Link = (props) => {
    const [searchParams, setSearchParams] = (0, import_react3.useState)("");
    (0, import_react3.useEffect)(() => {
      setSearchParams(window.location.hash);
      const fn = () => {
        setSearchParams(window.location.hash);
      };
      const subscription = newApi.onChange(() => {
        fn();
      });
      window.addEventListener("hashchange", fn);
      return () => {
        window.removeEventListener("hashchange", fn);
        subscription();
      };
    }, []);
    return /* @__PURE__ */ import_react3.default.createElement("a", { className: "link", href: props.href + searchParams }, props.children);
  };

  // node_modules/anud12.github.io_ui_base/src/components/api/signIn.tsx
  var import_react5 = __toESM(require_react());

  // node_modules/anud12.github.io_ui_base/src/components/atoms/Button.tsx
  var import_react4 = __toESM(require_react());
  var Button = (props) => {
    return /* @__PURE__ */ import_react4.default.createElement("button", { ...props, className: "button" }, props.children);
  };

  // node_modules/anud12.github.io_ui_base/src/components/api/signIn.tsx
  var SignIn = () => {
    const [state, setState] = (0, import_react5.useState)(void 0);
    const callback = (0, import_react5.useCallback)(() => {
      if (state) {
        newApi.logout();
        return;
      }
      newApi.login();
    }, [state]);
    (0, import_react5.useEffect)(() => {
      newApi.sessionName().then(setState);
      const unsubscribe = newApi.onChange(async (e) => {
        setState(await newApi.sessionName());
      });
      newApi.loadFromUrl();
      return unsubscribe;
    }, []);
    return /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, /* @__PURE__ */ import_react5.default.createElement(Button, { onClick: callback }, state ? `Logout of ${state}` : "Login"));
  };

  // node_modules/anud12.github.io_ui_base/src/components/Header.tsx
  var buildBack = (index) => new Array(index + 1).fill("..").join("/");
  var buildPath = () => {
    const href = globalThis?.window?.location.href;
    const url = href ? new URL(href) : void 0;
    const path = url?.pathname?.split("/").filter((e) => e) ?? [];
    path.reverse();
    path.splice(0, 1);
    path.reverse();
    return path;
  };
  var Header = (props) => {
    const path = buildPath();
    return /* @__PURE__ */ import_react6.default.createElement(import_react6.Fragment, null, /* @__PURE__ */ import_react6.default.createElement(CardContainer, null, /* @__PURE__ */ import_react6.default.createElement("div", { className: "header-content" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "header-title" }, props.children), /* @__PURE__ */ import_react6.default.createElement("div", { className: "header-login" }, /* @__PURE__ */ import_react6.default.createElement(SignIn, null))), /* @__PURE__ */ import_react6.default.createElement("div", { className: "border-top header-url-chips" }, /* @__PURE__ */ import_react6.default.createElement("div", null, /* @__PURE__ */ import_react6.default.createElement(Link, { href: "/" }, "Home")), path.reverse().map(
      (e, index) => /* @__PURE__ */ import_react6.default.createElement("div", { key: e }, /* @__PURE__ */ import_react6.default.createElement(Link, { href: buildBack(index) }, e))
    ).reverse())));
  };

  // node_modules/anud12.github.io_ui_base/src/components/Page.tsx
  var time = (/* @__PURE__ */ new Date()).toISOString();
  var Page = (props) => {
    const theme = props.theme ?? {};
    return /* @__PURE__ */ import_react7.default.createElement("html", null, /* @__PURE__ */ import_react7.default.createElement("head", null, /* @__PURE__ */ import_react7.default.createElement("link", { href: "https://anud.ro/ui_base/src/main.css", type: "text/css", rel: "stylesheet" }), /* @__PURE__ */ import_react7.default.createElement("link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,300,0,-25" }), /* @__PURE__ */ import_react7.default.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }), /* @__PURE__ */ import_react7.default.createElement("script", { src: "https://apis.google.com/js/api.js" }), /* @__PURE__ */ import_react7.default.createElement("script", { src: "https://accounts.google.com/gsi/client" }), /* @__PURE__ */ import_react7.default.createElement("script", { src: "https://izitoast.marcelodolza.com/js/iziToast.min.js?v=140b" }), /* @__PURE__ */ import_react7.default.createElement("link", { href: "https://izitoast.marcelodolza.com/css/iziToast.min.css?v=140a", rel: "stylesheet" }), /* @__PURE__ */ import_react7.default.createElement("link", { href: "https://fonts.googleapis.com/css2?family=Rajdhani&display=swap", rel: "stylesheet" }), /* @__PURE__ */ import_react7.default.createElement("link", { href: "https://fonts.googleapis.com/css2?family=Rajdhani:wght@500&display=swap", rel: "stylesheet" })), /* @__PURE__ */ import_react7.default.createElement("body", null, /* @__PURE__ */ import_react7.default.createElement(Comment, null, time), /* @__PURE__ */ import_react7.default.createElement("div", { className: "page", style: {
      "--primary": theme["--primary"] ?? "#0074cc",
      "--background-color": theme["--background-color"] ?? "white",
      "--border-color": theme["--border-color"] ?? "#c4c4c4"
    } }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "page-content" }, /* @__PURE__ */ import_react7.default.createElement(Header, null, props.title), props.children))));
  };

  // index.tsx
  var src_default = /* @__PURE__ */ import_react8.default.createElement(Page, { title: "anud12.github.io" }, /* @__PURE__ */ import_react8.default.createElement(Link, { href: "ui_base" }, "ui_base"), /* @__PURE__ */ import_react8.default.createElement(Link, { href: "boxes" }, "Boxes"));
  return __toCommonJS(src_exports);
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZXh0ZXJuYWwtZ2xvYmFsLXBsdWdpbjpyZWFjdCIsICJpbmRleC50c3giLCAibm9kZV9tb2R1bGVzL2FudWQxMi5naXRodWIuaW9fdWlfYmFzZS9zcmMvY29tcG9uZW50cy9QYWdlLnRzeCIsICJub2RlX21vZHVsZXMvYW51ZDEyLmdpdGh1Yi5pb191aV9iYXNlL3NyYy9jb21wb25lbnRzL0NvbW1lbnQudHN4IiwgIm5vZGVfbW9kdWxlcy9hbnVkMTIuZ2l0aHViLmlvX3VpX2Jhc2Uvc3JjL2NvbXBvbmVudHMvSGVhZGVyLnRzeCIsICJub2RlX21vZHVsZXMvYW51ZDEyLmdpdGh1Yi5pb191aV9iYXNlL3NyYy9jb21wb25lbnRzL0NvbnRhaW5lci50c3giLCAibm9kZV9tb2R1bGVzL2FudWQxMi5naXRodWIuaW9fdWlfYmFzZS9zcmMvY29tcG9uZW50cy9hdG9tcy9MaW5rLnRzeCIsICJub2RlX21vZHVsZXMvYW51ZDEyLmdpdGh1Yi5pb191aV9iYXNlL3NyYy9zZXJ2aWNlL2dvb2dsZS9jb25maWcudHMiLCAibm9kZV9tb2R1bGVzL2FudWQxMi5naXRodWIuaW9fdWlfYmFzZS9zcmMvc2VydmljZS9nb29nbGUvbG9hZEdvb2dsZURlcGVuZGVuY2llcy50cyIsICJub2RlX21vZHVsZXMvYW51ZDEyLmdpdGh1Yi5pb191aV9iYXNlL3NyYy9zZXJ2aWNlL2dvb2dsZS9nYXBpQ2xpZW50UHJvbWlzZS50cyIsICJub2RlX21vZHVsZXMvYW51ZDEyLmdpdGh1Yi5pb191aV9iYXNlL3NyYy9zZXJ2aWNlL2dvb2dsZS9nZXRFeHBpcmF0aW9uRGF0ZS50cyIsICJub2RlX21vZHVsZXMvYW51ZDEyLmdpdGh1Yi5pb191aV9iYXNlL3NyYy9zZXJ2aWNlL2dvb2dsZS90b2tlbkNsaWVudFByb21pc2UudHMiLCAibm9kZV9tb2R1bGVzL2FudWQxMi5naXRodWIuaW9fdWlfYmFzZS9zcmMvc2VydmljZS9pbXBsL25ld0FwaS50cyIsICJub2RlX21vZHVsZXMvYW51ZDEyLmdpdGh1Yi5pb191aV9iYXNlL3NyYy9jb21wb25lbnRzL2FwaS9zaWduSW4udHN4IiwgIm5vZGVfbW9kdWxlcy9hbnVkMTIuZ2l0aHViLmlvX3VpX2Jhc2Uvc3JjL2NvbXBvbmVudHMvYXRvbXMvQnV0dG9uLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxUaGlzLlJlYWN0IiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwiYW51ZDEyLmdpdGh1Yi5pb191aV9iYXNlL3NyYy9jb21wb25lbnRzL1BhZ2VcIlxuaW1wb3J0IHsgTGluayB9IGZyb20gXCJhbnVkMTIuZ2l0aHViLmlvX3VpX2Jhc2Uvc3JjL2NvbXBvbmVudHMvYXRvbXMvTGlua1wiO1xuZXhwb3J0IGRlZmF1bHQgKFxuICAgIDxQYWdlIHRpdGxlPVwiYW51ZDEyLmdpdGh1Yi5pb1wiPlxuICAgICAgICA8TGluayBocmVmPXtcInVpX2Jhc2VcIn0+dWlfYmFzZTwvTGluaz5cbiAgICAgICAgPExpbmsgaHJlZj17XCJib3hlc1wifT5Cb3hlczwvTGluaz5cbiAgICA8L1BhZ2U+XG4pIiwgImltcG9ydCBSZWFjdCwgeyBDU1NQcm9wZXJ0aWVzLCBQcm9wc1dpdGhDaGlsZHJlbiwgUmVhY3ROb2RlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBDb21tZW50IH0gZnJvbSBcIi4vQ29tbWVudFwiO1xuaW1wb3J0IHsgSGVhZGVyIH0gZnJvbSBcIi4vSGVhZGVyXCI7XG5cbnR5cGUgUHJvcHMgPSBQcm9wc1dpdGhDaGlsZHJlbjx7XG4gICAgdGl0bGU/OiBSZWFjdE5vZGUsXG4gICAgdGhlbWU/OiB7XG4gICAgICAgIFwiLS1wcmltYXJ5XCI/OiBzdHJpbmcsXG4gICAgICAgIFwiLS1iYWNrZ3JvdW5kLWNvbG9yXCI/OiBzdHJpbmcsXG4gICAgICAgIFwiLS1ib3JkZXItY29sb3JcIj86IHN0cmluZyxcbiAgICB9XG59PjtcbmNvbnN0IHRpbWUgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG5leHBvcnQgY29uc3QgUGFnZSA9IChwcm9wczogUHJvcHMpID0+IHtcbiAgICBjb25zdCB0aGVtZSA9IHByb3BzLnRoZW1lID8/IHt9O1xuICAgIHJldHVybiAoXG4gICAgICAgIDxodG1sPlxuICAgICAgICAgICAgPGhlYWQ+XG4gICAgICAgICAgICAgICAgPGxpbmsgaHJlZj17XCJodHRwczovL2FudWQucm8vdWlfYmFzZS9zcmMvbWFpbi5jc3NcIn0gdHlwZT1cInRleHQvY3NzXCIgcmVsPVwic3R5bGVzaGVldFwiIC8+XG4gICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PU1hdGVyaWFsK1N5bWJvbHMrT3V0bGluZWQ6b3Bzeix3Z2h0LEZJTEwsR1JBREA0OCwzMDAsMCwtMjVcIiAvPlxuICAgICAgICAgICAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MVwiIC8+XG5cbiAgICAgICAgICAgICAgICA8c2NyaXB0IHNyYz1cImh0dHBzOi8vYXBpcy5nb29nbGUuY29tL2pzL2FwaS5qc1wiPjwvc2NyaXB0PlxuICAgICAgICAgICAgICAgIDxzY3JpcHQgc3JjPVwiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL2dzaS9jbGllbnRcIj48L3NjcmlwdD5cbiAgICAgICAgICAgICAgICA8c2NyaXB0IHNyYz1cImh0dHBzOi8vaXppdG9hc3QubWFyY2Vsb2RvbHphLmNvbS9qcy9pemlUb2FzdC5taW4uanM/dj0xNDBiXCIgLz5cblxuICAgICAgICAgICAgICAgIDxsaW5rIGhyZWY9XCJodHRwczovL2l6aXRvYXN0Lm1hcmNlbG9kb2x6YS5jb20vY3NzL2l6aVRvYXN0Lm1pbi5jc3M/dj0xNDBhXCIgcmVsPVwic3R5bGVzaGVldFwiIC8+XG4gICAgICAgICAgICAgICAgPGxpbmsgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UmFqZGhhbmkmZGlzcGxheT1zd2FwXCIgcmVsPVwic3R5bGVzaGVldFwiIC8+XG4gICAgICAgICAgICAgICAgPGxpbmsgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UmFqZGhhbmk6d2dodEA1MDAmZGlzcGxheT1zd2FwXCIgcmVsPVwic3R5bGVzaGVldFwiIC8+XG5cbiAgICAgICAgICAgIDwvaGVhZD5cbiAgICAgICAgICAgIDxib2R5PlxuICAgICAgICAgICAgICAgIDxDb21tZW50Pnt0aW1lfTwvQ29tbWVudD5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhZ2VcIiBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICBcIi0tcHJpbWFyeVwiOiB0aGVtZVtcIi0tcHJpbWFyeVwiXSA/PyBcIiMwMDc0Y2NcIixcbiAgICAgICAgICAgICAgICAgICAgXCItLWJhY2tncm91bmQtY29sb3JcIjogdGhlbWVbXCItLWJhY2tncm91bmQtY29sb3JcIl0gPz8gXCJ3aGl0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBcIi0tYm9yZGVyLWNvbG9yXCI6IHRoZW1lWyctLWJvcmRlci1jb2xvciddID8/IFwiI2M0YzRjNFwiLFxuICAgICAgICAgICAgICAgIH0gYXMgQ1NTUHJvcGVydGllc30+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFnZS1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SGVhZGVyPntwcm9wcy50aXRsZX08L0hlYWRlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2JvZHk+XG4gICAgICAgIDwvaHRtbD5cblxuICAgIClcbn0iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgY29uc3QgQ29tbWVudCA9ICh7IGNoaWxkcmVuIH0pID0+IHtcbiAgICByZXR1cm4gPGRpdiBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IGA8IS0tICR7Y2hpbGRyZW59IC0tPmAgfX0gLz5cbn0iLCAiaW1wb3J0IFJlYWN0LCB7IEZyYWdtZW50LCBQcm9wc1dpdGhDaGlsZHJlbiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQ2FyZENvbnRhaW5lciB9IGZyb20gXCIuL0NvbnRhaW5lclwiO1xuaW1wb3J0IHsgTGluayB9IGZyb20gXCIuL2F0b21zL0xpbmtcIjtcbmltcG9ydCB7IERpdmlkZXJIIH0gZnJvbSBcIi4vRGl2aWRlckhcIjtcbmltcG9ydCB7IFNpZ25JbiB9IGZyb20gXCIuL2FwaS9zaWduSW5cIjtcbnR5cGUgUHJvcHMgPSBQcm9wc1dpdGhDaGlsZHJlbjx7fT47XG5cbmNvbnN0IGJ1aWxkQmFjayA9IGluZGV4ID0+IG5ldyBBcnJheShpbmRleCArIDEpLmZpbGwoXCIuLlwiKS5qb2luKFwiL1wiKVxuY29uc3QgYnVpbGRQYXRoID0gKCkgPT4ge1xuICAgIGNvbnN0IGhyZWYgPSBnbG9iYWxUaGlzPy53aW5kb3c/LmxvY2F0aW9uLmhyZWZcbiAgICBjb25zdCB1cmw6IFVSTCB8IHVuZGVmaW5lZCA9IGhyZWYgPyBuZXcgVVJMKGhyZWYpIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHBhdGggPSB1cmw/LnBhdGhuYW1lPy5zcGxpdChcIi9cIikuZmlsdGVyKGUgPT4gZSkgPz8gW107XG4gICAgcGF0aC5yZXZlcnNlKCk7XG4gICAgcGF0aC5zcGxpY2UoMCwgMSk7XG4gICAgcGF0aC5yZXZlcnNlKCk7XG4gICAgcmV0dXJuIHBhdGg7XG59XG5leHBvcnQgY29uc3QgSGVhZGVyID0gKHByb3BzOiBQcm9wcykgPT4ge1xuICAgIGNvbnN0IHBhdGggPSBidWlsZFBhdGgoKTtcbiAgICByZXR1cm4gPEZyYWdtZW50PlxuICAgICAgICA8Q2FyZENvbnRhaW5lcj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImhlYWRlci1jb250ZW50XCJ9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlci1sb2dpblwiPlxuICAgICAgICAgICAgICAgICAgICA8U2lnbkluIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9yZGVyLXRvcCBoZWFkZXItdXJsLWNoaXBzXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIEhvbWVcbiAgICAgICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHtwYXRoLnJldmVyc2UoKS5tYXAoKGUsIGluZGV4KSA9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17ZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TGluayBocmVmPXtidWlsZEJhY2soaW5kZXgpfT57ZX08L0xpbms+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkucmV2ZXJzZSgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvQ2FyZENvbnRhaW5lcj5cbiAgICA8L0ZyYWdtZW50PlxufSIsICJpbXBvcnQgUmVhY3QsIHsgUHJvcHNXaXRoQ2hpbGRyZW4gfSBmcm9tIFwicmVhY3RcIjtcbnR5cGUgUHJvcHMgPSBQcm9wc1dpdGhDaGlsZHJlbjx7fT4gJiB7XG4gICAgY2xhc3NOYW1lPzogc3RyaW5nXG59XG5leHBvcnQgY29uc3QgQ2FyZENvbnRhaW5lciA9IChwcm9wczogUHJvcHMpID0+IHtcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY29udGFpbmVyIGNhcmQtY29udGFpbmVyICR7cHJvcHMuY2xhc3NOYW1lID8/IFwiXCJ9YC50cmltKCl9PlxuICAgICAgICAgICAge3Byb3BzLmNoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbn1cblxuZXhwb3J0IGNvbnN0IENvbnRhaW5lciA9IChwcm9wczogUHJvcHNXaXRoQ2hpbGRyZW4pID0+IHtcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXItY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY29udGFpbmVyYH0+XG4gICAgICAgICAgICB7cHJvcHMuY2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxufSIsICJpbXBvcnQgUmVhY3QsIHsgUHJvcHNXaXRoQ2hpbGRyZW4sIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7bmV3QXBpfSBmcm9tIFwiLi4vLi4vc2VydmljZS9pbXBsL25ld0FwaVwiO1xudHlwZSBQcm9wcyA9IFByb3BzV2l0aENoaWxkcmVuPHt9PiAmIHtcbiAgICBocmVmOiBzdHJpbmcsXG59XG5cbmV4cG9ydCBjb25zdCBMaW5rID0gKHByb3BzOiBQcm9wcykgPT4ge1xuICAgIGNvbnN0IFtzZWFyY2hQYXJhbXMsIHNldFNlYXJjaFBhcmFtc10gPSB1c2VTdGF0ZTxzdHJpbmc+KFwiXCIpO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIHNldFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uaGFzaCk7XG4gICAgICAgIGNvbnN0IGZuID0gKCkgPT4ge1xuICAgICAgICAgICAgc2V0U2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5oYXNoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdWJzY3JpcHRpb24gPSBuZXdBcGkub25DaGFuZ2UoKCkgPT4ge1xuICAgICAgICAgICAgZm4oKVxuICAgICAgICB9KVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIGZuKTtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgZm4pO1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9LCBbXSk7XG4gICAgcmV0dXJuIDxhIGNsYXNzTmFtZT1cImxpbmtcIiBocmVmPXtwcm9wcy5ocmVmICsgc2VhcmNoUGFyYW1zfT5cbiAgICAgICAge3Byb3BzLmNoaWxkcmVufVxuICAgIDwvYT5cbn0iLCAiZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcbiAgICBhcGlLZXk6IFwiQUl6YVN5QnRRMldPeUlVbmFTV0FobDNzNVBBX0xaa1d0cFd6NWlBXCIsXG4gICAgY2xpZW50SWQ6IFwiOTg1MjgwOTA3MDMxLWZmdmZuYzhwaTBhbmU5OWxzbzlkYmwxbTJsNW9jOW5uLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tXCIsXG4gICAgc2NvcGU6IFwiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9kcml2ZSBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3NwcmVhZHNoZWV0cyBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3VzZXJpbmZvLnByb2ZpbGUgXCIsXG4gICAgZGlzY292ZXJ5RG9jczogWydodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9kaXNjb3ZlcnkvdjEvYXBpcy9kcml2ZS92My9yZXN0J10sXG59IiwgImNvbnN0IGxvYWRTY3JpcHQgPSAoc3JjOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+XG4gICAgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAoIWdsb2JhbFRoaXMuZG9jdW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIC8vIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICAvLyBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAgICAgICAvLyBzY3JpcHQuZGVmZXIgPSB0cnVlO1xuICAgICAgICAvLyBzY3JpcHQuc3JjID0gc3JjO1xuICAgICAgICAvLyBzY3JpcHQub25sb2FkID0gKCkgPT4gcmVzb2x2ZSgpO1xuICAgICAgICAvLyBzY3JpcHQub25lcnJvciA9IHJlamVjdDtcbiAgICAgICAgLy8gZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgIH0pXG5cbmV4cG9ydCBjb25zdCBsb2FkR29vZ2xlRGVwZW5kZW5jaWVzID0gUHJvbWlzZS5hbGwoW1xuICAgIGxvYWRTY3JpcHQoJ2h0dHBzOi8vYXBpcy5nb29nbGUuY29tL2pzL2FwaS5qcycpLFxuICAgIGxvYWRTY3JpcHQoJ2h0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9nc2kvY2xpZW50JyksXG5dKSIsICJpbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCB7IGxvYWRHb29nbGVEZXBlbmRlbmNpZXMgfSBmcm9tIFwiLi9sb2FkR29vZ2xlRGVwZW5kZW5jaWVzXCI7XG5cbmV4cG9ydCBjb25zdCBnYXBpQ2xpZW50UHJvbWlzZSA9IG5ldyBQcm9taXNlPGFueT4oYXN5bmMgcmVzb2x2ZSA9PiB7XG4gICAgYXdhaXQgbG9hZEdvb2dsZURlcGVuZGVuY2llcztcbiAgICBnYXBpLmxvYWQoJ2NsaWVudCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgY2xpZW50ID0gYXdhaXQgZ2FwaS5jbGllbnQuaW5pdCh7XG4gICAgICAgICAgICBhcGlLZXk6IGNvbmZpZy5hcGlLZXksXG4gICAgICAgICAgICBkaXNjb3ZlcnlEb2NzOiBjb25maWcuZGlzY292ZXJ5RG9jcyxcbiAgICAgICAgfSk7XG4gICAgICAgIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KHJlc29sdmUgPT4gZ2FwaS5jbGllbnQubG9hZCgnc2hlZXRzJywgJ3Y0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KSk7XG4gICAgICAgIHJlc29sdmUoZ2FwaSk7XG4gICAgfSk7XG59KSIsICJpbXBvcnQgeyBnYXBpQ2xpZW50UHJvbWlzZSB9IGZyb20gXCIuL2dhcGlDbGllbnRQcm9taXNlXCI7XG5cbmV4cG9ydCBjb25zdCBnZXRFeHBpcmF0aW9uRGF0ZSA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBnYXBpID0gYXdhaXQgZ2FwaUNsaWVudFByb21pc2U7XG4gICAgY29uc3QgdG9rZW4gPSBnYXBpPy5hdXRoPy5nZXRUb2tlbigpO1xuICAgIGlmICghdG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlcyA9PiByZXModW5kZWZpbmVkKSk7XG4gICAgfVxuICAgIHJldHVybiBmZXRjaChgaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vb2F1dGgyL3YxL3Rva2VuaW5mbz9hY2Nlc3NfdG9rZW49JHt0b2tlbi5hY2Nlc3NfdG9rZW59YClcbiAgICAgICAgLnRoZW4oYXN5bmMgcmVzID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihgZ2V0RXhwaXJhdGlvbkRhdGUgc3RhdHVzICR7cmVzLnN0YXR1c31gKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIChhd2FpdCByZXMuanNvbigpKT8uZXhwaXJlc19pbjtcbiAgICAgICAgfSk7XG59OyIsICJpbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCB7IGxvYWRHb29nbGVEZXBlbmRlbmNpZXMgfSBmcm9tIFwiLi9sb2FkR29vZ2xlRGVwZW5kZW5jaWVzXCI7XG5cbmV4cG9ydCBjb25zdCB0b2tlbkNsaWVudFByb21pc2UgPSBuZXcgUHJvbWlzZTxhbnk+KGFzeW5jIHJlcyA9PiB7XG4gICAgYXdhaXQgbG9hZEdvb2dsZURlcGVuZGVuY2llcztcbiAgICBjb25zdCB0b2tlbkNsaWVudCA9IGdvb2dsZS5hY2NvdW50cy5vYXV0aDIuaW5pdFRva2VuQ2xpZW50KHtcbiAgICAgICAgY2xpZW50X2lkOiBjb25maWcuY2xpZW50SWQsXG4gICAgICAgIHNjb3BlOiBjb25maWcuc2NvcGUsXG4gICAgICAgIHJlZGlyZWN0X3VyaTogXCJodHRwOi8vbG9jYWxob3N0OjgwODBcIixcbiAgICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmVzKHRva2VuQ2xpZW50KTtcbn0pIiwgImltcG9ydCB7IEFwaSB9IGZyb20gXCIuLi9hcGlcIjtcbmltcG9ydCB7IGdhcGlDbGllbnRQcm9taXNlIH0gZnJvbSBcIi4uL2dvb2dsZS9nYXBpQ2xpZW50UHJvbWlzZVwiO1xuaW1wb3J0IHsgZ2V0RXhwaXJhdGlvbkRhdGUgfSBmcm9tIFwiLi4vZ29vZ2xlL2dldEV4cGlyYXRpb25EYXRlXCI7XG5pbXBvcnQgeyB0b2tlbkNsaWVudFByb21pc2UgfSBmcm9tIFwiLi4vZ29vZ2xlL3Rva2VuQ2xpZW50UHJvbWlzZVwiO1xuZnVuY3Rpb24gYWRkUXVlcnlQYXJhbSh2YWx1ZSkge1xuICAgIGNvbnN0IG5ld1VybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgIG5ld1VybC5oYXNoID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCBcIlwiLCBuZXdVcmwuaHJlZik7XG59XG5cbmV4cG9ydCBjb25zdCBuZXdBcGk6IEFwaSA9IHtcbiAgICBzZXNzaW9uTmFtZTogKCkgPT4gbmV3IFByb21pc2UoYXN5bmMgcmVzb2x2ZSA9PiB7XG4gICAgICAgIGNvbnN0IGdhcGkgPSBhd2FpdCBnYXBpQ2xpZW50UHJvbWlzZTtcbiAgICAgICAgZ2FwaS5jbGllbnQucmVxdWVzdCh7XG4gICAgICAgICAgICAncGF0aCc6ICdodHRwczovL3Blb3BsZS5nb29nbGVhcGlzLmNvbS92MS9wZW9wbGUvbWU/cGVyc29uRmllbGRzPW5hbWVzJyxcbiAgICAgICAgICAgICdtZXRob2QnOiAnR0VUJyxcbiAgICAgICAgICAgICdjYWxsYmFjayc6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2U/Lm5hbWVzPy5bMF0/LmRpc3BsYXlOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSksXG4gICAgbG9hZEZyb21Vcmw6IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgZ2FwaSA9IGF3YWl0IGdhcGlDbGllbnRQcm9taXNlO1xuICAgICAgICBjb25zdCBjcmVkZW50aWFsc0Zyb21VcmwgPSBkZWNvZGVVUkkod2luZG93LmxvY2F0aW9uLmhhc2gucmVwbGFjZShcIiNcIiwgXCJcIikpO1xuICAgICAgICBpZiAoY3JlZGVudGlhbHNGcm9tVXJsKSB7XG4gICAgICAgICAgICBjb25zdCBjcmVkZW50aWFscyA9IEpTT04ucGFyc2UoY3JlZGVudGlhbHNGcm9tVXJsKTtcbiAgICAgICAgICAgIGF3YWl0IGdhcGkuY2xpZW50LmluaXQoe30pO1xuICAgICAgICAgICAgZ2FwaS5jbGllbnQuc2V0VG9rZW4oY3JlZGVudGlhbHMpO1xuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ25ld0FwaS1vbkNoYW5nZScpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICBvbkNoYW5nZTogKGNhbGxiYWNrKSA9PiB7XG4gICAgICAgIGNvbnN0IGZuID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjayhldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZ2xvYmFsVGhpcz8uZG9jdW1lbnQ/LmFkZEV2ZW50TGlzdGVuZXIoXCJuZXdBcGktb25DaGFuZ2VcIiwgZm4pO1xuICAgICAgICByZXR1cm4gKCkgPT4gZ2xvYmFsVGhpcz8uZG9jdW1lbnQ/LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJuZXdBcGktb25DaGFuZ2VcIiwgZm4pO1xuICAgIH0sXG4gICAgbG9nb3V0OiBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGdhcGkgPSBhd2FpdCBnYXBpQ2xpZW50UHJvbWlzZTtcbiAgICAgICAgZ2FwaS5jbGllbnQuc2V0VG9rZW4obnVsbClcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBcIlwiO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnbmV3QXBpLW9uQ2hhbmdlJykpXG4gICAgfSxcbiAgICBsb2dpbjogYXN5bmMgKCkgPT4gbmV3IFByb21pc2U8dm9pZD4oYXN5bmMgKHJlc29sdmUpID0+IHtcbiAgICAgICAgY29uc3QgdG9rZW5DbGllbnQgPSBhd2FpdCB0b2tlbkNsaWVudFByb21pc2U7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChhd2FpdCBuZXdBcGkubG9hZEZyb21VcmwoKSkge1xuICAgICAgICAgICAgICAgIGF3YWl0IGdldEV4cGlyYXRpb25EYXRlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIHtcblxuICAgICAgICB9XG4gICAgICAgIHRva2VuQ2xpZW50LmNhbGxiYWNrID0gKGNyZWRlbnRpYWxzUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGFkZFF1ZXJ5UGFyYW0oY3JlZGVudGlhbHNSZXNwb25zZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnbmV3QXBpLW9uQ2hhbmdlJykpXG4gICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgfVxuXG4gICAgICAgIHRva2VuQ2xpZW50LnJlcXVlc3RBY2Nlc3NUb2tlbih7IHByb21wdDogJ2NvbnNlbnQnIH0pO1xuICAgIH0pXG59IiwgImltcG9ydCBSZWFjdCwge3VzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVN0YXRlfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7bmV3QXBpfSBmcm9tIFwiLi4vLi4vc2VydmljZS9pbXBsL25ld0FwaVwiO1xuaW1wb3J0IHtCdXR0b259IGZyb20gXCIuLi9hdG9tcy9CdXR0b25cIjtcblxuZXhwb3J0IGNvbnN0IFNpZ25JbiA9ICgpID0+IHtcbiAgICBjb25zdCBbc3RhdGUsIHNldFN0YXRlXSA9IHVzZVN0YXRlPHN0cmluZyB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcbiAgICBjb25zdCBjYWxsYmFjayA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICBuZXdBcGkubG9nb3V0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbmV3QXBpLmxvZ2luKCk7XG4gICAgfSwgW3N0YXRlXSlcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBuZXdBcGkuc2Vzc2lvbk5hbWUoKS50aGVuKHNldFN0YXRlKTtcbiAgICAgICAgY29uc3QgdW5zdWJzY3JpYmUgPSBuZXdBcGkub25DaGFuZ2UoYXN5bmMgZSA9PiB7XG4gICAgICAgICAgICBzZXRTdGF0ZShhd2FpdCBuZXdBcGkuc2Vzc2lvbk5hbWUoKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBuZXdBcGkubG9hZEZyb21VcmwoKTtcbiAgICAgICAgcmV0dXJuIHVuc3Vic2NyaWJlO1xuICAgIH0sIFtdKTtcbiAgICByZXR1cm4gPD5cbiAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtjYWxsYmFja30+XG4gICAgICAgICAgICB7c3RhdGUgPyBgTG9nb3V0IG9mICR7c3RhdGV9YCA6IFwiTG9naW5cIn1cbiAgICAgICAgPC9CdXR0b24+XG4gICAgPC8+XG59IiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxuXG50eXBlIFByb3BzID0gUmVhY3QuRGV0YWlsZWRIVE1MUHJvcHM8UmVhY3QuQnV0dG9uSFRNTEF0dHJpYnV0ZXM8SFRNTEJ1dHRvbkVsZW1lbnQ+LCBIVE1MQnV0dG9uRWxlbWVudD5cblxuZXhwb3J0IGNvbnN0IEJ1dHRvbiA9IChwcm9wczogUHJvcHMpID0+IHtcbiAgICByZXR1cm4gPGJ1dHRvbiB7Li4ucHJvcHN9IGNsYXNzTmFtZT1cImJ1dHRvblwiPntwcm9wcy5jaGlsZHJlbn08L2J1dHRvbj5cbn0iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUEsYUFBTyxVQUFVLFdBQVc7QUFBQTtBQUFBOzs7QUNBNUI7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUFBQSxnQkFBa0I7OztBQ0FsQixNQUFBQyxnQkFBbUU7OztBQ0FuRSxxQkFBa0I7QUFFWCxNQUFNLFVBQVUsQ0FBQyxFQUFFLFNBQVMsTUFBTTtBQUNyQyxXQUFPLDZCQUFBQyxRQUFBLGNBQUMsU0FBSSx5QkFBeUIsRUFBRSxRQUFRLFFBQVEsZUFBZSxHQUFHO0FBQUEsRUFDN0U7OztBQ0pBLE1BQUFDLGdCQUFtRDs7O0FDQW5ELE1BQUFDLGdCQUF5QztBQUlsQyxNQUFNLGdCQUFnQixDQUFDLFVBQWlCO0FBQzNDLFdBQU8sOEJBQUFDLFFBQUEsY0FBQyxTQUFJLFdBQVUseUJBQ2xCLDhCQUFBQSxRQUFBLGNBQUMsU0FBSSxXQUFXLDRCQUE0QixNQUFNLGFBQWEsS0FBSyxLQUFLLEtBQ3BFLE1BQU0sUUFDWCxDQUNKO0FBQUEsRUFDSjs7O0FDVkEsTUFBQUMsZ0JBQThEOzs7QUNBdkQsTUFBTSxTQUFTO0FB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QUEsY0FBQyxjQUNHLDhCQUFBQSxRQUFBLGNBQUMsVUFBSyxNQUFNLHdDQUF3QyxNQUFLLFlBQVcsS0FBSSxjQUFhLEdBQ3JGLDhCQUFBQSxRQUFBLGNBQUMsVUFBSyxLQUFJLGNBQWEsTUFBSyx1R0FBc0csR0FDbEksOEJBQUFBLFFBQUEsY0FBQyxVQUFLLE1BQUssWUFBVyxTQUFRLHVDQUFzQyxHQUVwRSw4QkFBQUEsUUFBQSxjQUFDLFlBQU8sS0FBSSxxQ0FBb0MsR0FDaEQsOEJBQUFBLFFBQUEsY0FBQyxZQUFPLEtBQUksMENBQXlDLEdBQ3JELDhCQUFBQSxRQUFBLGNBQUMsWUFBTyxLQUFJLCtEQUE4RCxHQUUxRSw4QkFBQUEsUUFBQSxjQUFDLFVBQUssTUFBSyxpRUFBZ0UsS0FBSSxjQUFhLEdBQzVGLDhCQUFBQSxRQUFBLGNBQUMsVUFBSyxNQUFLLGtFQUFpRSxLQUFJLGNBQWEsR0FDN0YsOEJBQUFBLFFBQUEsY0FBQyxVQUFLLE1BQUssMkVBQTBFLEtBQUksY0FBYSxDQUUxRyxHQUNBLDhCQUFBQSxRQUFBLGNBQUMsY0FDRyw4QkFBQUEsUUFBQSxjQUFDLGVBQVMsSUFBSyxHQUNmLDhCQUFBQSxRQUFBLGNBQUMsU0FBSSxXQUFVLFFBQU8sT0FBTztBQUFBLE1BQ3pCLGFBQWEsTUFBTSxXQUFXLEtBQUs7QUFBQSxNQUNuQyxzQkFBc0IsTUFBTSxvQkFBb0IsS0FBSztBQUFBLE1BQ3JELGtCQUFrQixNQUFNLGdCQUFnQixLQUFLO0FBQUEsSUFDakQsS0FDSSw4QkFBQUEsUUFBQSxjQUFDLFNBQUksV0FBVSxrQkFDWCw4QkFBQUEsUUFBQSxjQUFDLGNBQVEsTUFBTSxLQUFNLEdBQ3BCLE1BQU0sUUFDWCxDQUNKLENBQ0osQ0FDSjtBQUFBLEVBR1I7OztBRDVDQSxNQUFPLGNBQ0gsOEJBQUFDLFFBQUEsY0FBQyxRQUFLLE9BQU0sc0JBQ1IsOEJBQUFBLFFBQUEsY0FBQyxRQUFLLE1BQU0sYUFBVyxTQUFPLEdBQzlCLDhCQUFBQSxRQUFBLGNBQUMsUUFBSyxNQUFNLFdBQVMsT0FBSyxDQUM5QjsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJSZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImltcG9ydF9yZWFjdCIsICJyZXNvbHZlIiwgImdhcGkiLCAiZ2FwaSIsICJSZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgIlJlYWN0IiwgIlJlYWN0IiwgIlJlYWN0IiwgIlJlYWN0Il0KfQo=

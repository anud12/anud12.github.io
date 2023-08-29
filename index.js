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
  var OnLoad = () => {
    (0, import_react8.useEffect)(() => {
      if (window) {
        console.log(window.location);
      }
    }, []);
    return /* @__PURE__ */ import_react8.default.createElement(import_react8.Fragment, null);
  };
  var src_default = /* @__PURE__ */ import_react8.default.createElement(Page, { title: "anud12.github.io" }, /* @__PURE__ */ import_react8.default.createElement(OnLoad, null), /* @__PURE__ */ import_react8.default.createElement(Link, { href: "wifi" }, "wifi"), /* @__PURE__ */ import_react8.default.createElement(Link, { href: "ui_base" }, "ui_base"), /* @__PURE__ */ import_react8.default.createElement(Link, { href: "boxes" }, "Boxes"));
  return __toCommonJS(src_exports);
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZXh0ZXJuYWwtZ2xvYmFsLXBsdWdpbjpyZWFjdCIsICJpbmRleC50c3giLCAibm9kZV9tb2R1bGVzL2FudWQxMi5naXRodWIuaW9fdWlfYmFzZS9zcmMvY29tcG9uZW50cy9QYWdlLnRzeCIsICJub2RlX21vZHVsZXMvYW51ZDEyLmdpdGh1Yi5pb191aV9iYXNlL3NyYy9jb21wb25lbnRzL0NvbW1lbnQudHN4IiwgIm5vZGVfbW9kdWxlcy9hbnVkMTIuZ2l0aHViLmlvX3VpX2Jhc2Uvc3JjL2NvbXBvbmVudHMvSGVhZGVyLnRzeCIsICJub2RlX21vZHVsZXMvYW51ZDEyLmdpdGh1Yi5pb191aV9iYXNlL3NyYy9jb21wb25lbnRzL0NvbnRhaW5lci50c3giLCAibm9kZV9tb2R1bGVzL2FudWQxMi5naXRodWIuaW9fdWlfYmFzZS9zcmMvY29tcG9uZW50cy9hdG9tcy9MaW5rLnRzeCIsICJub2RlX21vZHVsZXMvYW51ZDEyLmdpdGh1Yi5pb191aV9iYXNlL3NyYy9zZXJ2aWNlL2dvb2dsZS9jb25maWcudHMiLCAibm9kZV9tb2R1bGVzL2FudWQxMi5naXRodWIuaW9fdWlfYmFzZS9zcmMvc2VydmljZS9nb29nbGUvbG9hZEdvb2dsZURlcGVuZGVuY2llcy50cyIsICJub2RlX21vZHVsZXMvYW51ZDEyLmdpdGh1Yi5pb191aV9iYXNlL3NyYy9zZXJ2aWNlL2dvb2dsZS9nYXBpQ2xpZW50UHJvbWlzZS50cyIsICJub2RlX21vZHVsZXMvYW51ZDEyLmdpdGh1Yi5pb191aV9iYXNlL3NyYy9zZXJ2aWNlL2dvb2dsZS9nZXRFeHBpcmF0aW9uRGF0ZS50cyIsICJub2RlX21vZHVsZXMvYW51ZDEyLmdpdGh1Yi5pb191aV9iYXNlL3NyYy9zZXJ2aWNlL2dvb2dsZS90b2tlbkNsaWVudFByb21pc2UudHMiLCAibm9kZV9tb2R1bGVzL2FudWQxMi5naXRodWIuaW9fdWlfYmFzZS9zcmMvc2VydmljZS9pbXBsL25ld0FwaS50cyIsICJub2RlX21vZHVsZXMvYW51ZDEyLmdpdGh1Yi5pb191aV9iYXNlL3NyYy9jb21wb25lbnRzL2FwaS9zaWduSW4udHN4IiwgIm5vZGVfbW9kdWxlcy9hbnVkMTIuZ2l0aHViLmlvX3VpX2Jhc2Uvc3JjL2NvbXBvbmVudHMvYXRvbXMvQnV0dG9uLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxUaGlzLlJlYWN0IiwgImltcG9ydCBSZWFjdCwgeyBGcmFnbWVudCwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcImFudWQxMi5naXRodWIuaW9fdWlfYmFzZS9zcmMvY29tcG9uZW50cy9QYWdlXCJcbmltcG9ydCB7IExpbmsgfSBmcm9tIFwiYW51ZDEyLmdpdGh1Yi5pb191aV9iYXNlL3NyYy9jb21wb25lbnRzL2F0b21zL0xpbmtcIjtcblxuY29uc3QgT25Mb2FkID0gKCkgPT4ge1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICh3aW5kb3cpIHtcbiAgICAgIGNvbnNvbGUubG9nKHdpbmRvdy5sb2NhdGlvbilcbiAgICB9XG4gIH0sIFtdKTtcblxuICByZXR1cm4gPEZyYWdtZW50IC8+XG59XG5cbmV4cG9ydCBkZWZhdWx0IChcbiAgPFBhZ2UgdGl0bGU9XCJhbnVkMTIuZ2l0aHViLmlvXCI+XG4gICAgPE9uTG9hZCAvPlxuICAgIDxMaW5rIGhyZWY9e1wid2lmaVwifT53aWZpPC9MaW5rPlxuICAgIDxMaW5rIGhyZWY9e1widWlfYmFzZVwifT51aV9iYXNlPC9MaW5rPlxuICAgIDxMaW5rIGhyZWY9e1wiYm94ZXNcIn0+Qm94ZXM8L0xpbms+XG4gIDwvUGFnZT5cbikiLCAiaW1wb3J0IFJlYWN0LCB7IENTU1Byb3BlcnRpZXMsIFByb3BzV2l0aENoaWxkcmVuLCBSZWFjdE5vZGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IENvbW1lbnQgfSBmcm9tIFwiLi9Db21tZW50XCI7XG5pbXBvcnQgeyBIZWFkZXIgfSBmcm9tIFwiLi9IZWFkZXJcIjtcblxudHlwZSBQcm9wcyA9IFByb3BzV2l0aENoaWxkcmVuPHtcbiAgICB0aXRsZT86IFJlYWN0Tm9kZSxcbiAgICB0aGVtZT86IHtcbiAgICAgICAgXCItLXByaW1hcnlcIj86IHN0cmluZyxcbiAgICAgICAgXCItLWJhY2tncm91bmQtY29sb3JcIj86IHN0cmluZyxcbiAgICAgICAgXCItLWJvcmRlci1jb2xvclwiPzogc3RyaW5nLFxuICAgIH1cbn0+O1xuY29uc3QgdGltZSA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbmV4cG9ydCBjb25zdCBQYWdlID0gKHByb3BzOiBQcm9wcykgPT4ge1xuICAgIGNvbnN0IHRoZW1lID0gcHJvcHMudGhlbWUgPz8ge307XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGh0bWw+XG4gICAgICAgICAgICA8aGVhZD5cbiAgICAgICAgICAgICAgICA8bGluayBocmVmPXtcImh0dHBzOi8vYW51ZC5yby91aV9iYXNlL3NyYy9tYWluLmNzc1wifSB0eXBlPVwidGV4dC9jc3NcIiByZWw9XCJzdHlsZXNoZWV0XCIgLz5cbiAgICAgICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9TWF0ZXJpYWwrU3ltYm9scytPdXRsaW5lZDpvcHN6LHdnaHQsRklMTCxHUkFEQDQ4LDMwMCwwLC0yNVwiIC8+XG4gICAgICAgICAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xXCIgLz5cblxuICAgICAgICAgICAgICAgIDxzY3JpcHQgc3JjPVwiaHR0cHM6Ly9hcGlzLmdvb2dsZS5jb20vanMvYXBpLmpzXCI+PC9zY3JpcHQ+XG4gICAgICAgICAgICAgICAgPHNjcmlwdCBzcmM9XCJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vZ3NpL2NsaWVudFwiPjwvc2NyaXB0PlxuICAgICAgICAgICAgICAgIDxzY3JpcHQgc3JjPVwiaHR0cHM6Ly9peml0b2FzdC5tYXJjZWxvZG9semEuY29tL2pzL2l6aVRvYXN0Lm1pbi5qcz92PTE0MGJcIiAvPlxuXG4gICAgICAgICAgICAgICAgPGxpbmsgaHJlZj1cImh0dHBzOi8vaXppdG9hc3QubWFyY2Vsb2RvbHphLmNvbS9jc3MvaXppVG9hc3QubWluLmNzcz92PTE0MGFcIiByZWw9XCJzdHlsZXNoZWV0XCIgLz5cbiAgICAgICAgICAgICAgICA8bGluayBocmVmPVwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1SYWpkaGFuaSZkaXNwbGF5PXN3YXBcIiByZWw9XCJzdHlsZXNoZWV0XCIgLz5cbiAgICAgICAgICAgICAgICA8bGluayBocmVmPVwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1SYWpkaGFuaTp3Z2h0QDUwMCZkaXNwbGF5PXN3YXBcIiByZWw9XCJzdHlsZXNoZWV0XCIgLz5cblxuICAgICAgICAgICAgPC9oZWFkPlxuICAgICAgICAgICAgPGJvZHk+XG4gICAgICAgICAgICAgICAgPENvbW1lbnQ+e3RpbWV9PC9Db21tZW50PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFnZVwiIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIFwiLS1wcmltYXJ5XCI6IHRoZW1lW1wiLS1wcmltYXJ5XCJdID8/IFwiIzAwNzRjY1wiLFxuICAgICAgICAgICAgICAgICAgICBcIi0tYmFja2dyb3VuZC1jb2xvclwiOiB0aGVtZVtcIi0tYmFja2dyb3VuZC1jb2xvclwiXSA/PyBcIndoaXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiLS1ib3JkZXItY29sb3JcIjogdGhlbWVbJy0tYm9yZGVyLWNvbG9yJ10gPz8gXCIjYzRjNGM0XCIsXG4gICAgICAgICAgICAgICAgfSBhcyBDU1NQcm9wZXJ0aWVzfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYWdlLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxIZWFkZXI+e3Byb3BzLnRpdGxlfTwvSGVhZGVyPlxuICAgICAgICAgICAgICAgICAgICAgICAge3Byb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvYm9keT5cbiAgICAgICAgPC9odG1sPlxuXG4gICAgKVxufSIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBjb25zdCBDb21tZW50ID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuICAgIHJldHVybiA8ZGl2IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogYDwhLS0gJHtjaGlsZHJlbn0gLS0+YCB9fSAvPlxufSIsICJpbXBvcnQgUmVhY3QsIHsgRnJhZ21lbnQsIFByb3BzV2l0aENoaWxkcmVuIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBDYXJkQ29udGFpbmVyIH0gZnJvbSBcIi4vQ29udGFpbmVyXCI7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSBcIi4vYXRvbXMvTGlua1wiO1xuaW1wb3J0IHsgRGl2aWRlckggfSBmcm9tIFwiLi9EaXZpZGVySFwiO1xuaW1wb3J0IHsgU2lnbkluIH0gZnJvbSBcIi4vYXBpL3NpZ25JblwiO1xudHlwZSBQcm9wcyA9IFByb3BzV2l0aENoaWxkcmVuPHt9PjtcblxuY29uc3QgYnVpbGRCYWNrID0gaW5kZXggPT4gbmV3IEFycmF5KGluZGV4ICsgMSkuZmlsbChcIi4uXCIpLmpvaW4oXCIvXCIpXG5jb25zdCBidWlsZFBhdGggPSAoKSA9PiB7XG4gICAgY29uc3QgaHJlZiA9IGdsb2JhbFRoaXM/LndpbmRvdz8ubG9jYXRpb24uaHJlZlxuICAgIGNvbnN0IHVybDogVVJMIHwgdW5kZWZpbmVkID0gaHJlZiA/IG5ldyBVUkwoaHJlZikgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgcGF0aCA9IHVybD8ucGF0aG5hbWU/LnNwbGl0KFwiL1wiKS5maWx0ZXIoZSA9PiBlKSA/PyBbXTtcbiAgICBwYXRoLnJldmVyc2UoKTtcbiAgICBwYXRoLnNwbGljZSgwLCAxKTtcbiAgICBwYXRoLnJldmVyc2UoKTtcbiAgICByZXR1cm4gcGF0aDtcbn1cbmV4cG9ydCBjb25zdCBIZWFkZXIgPSAocHJvcHM6IFByb3BzKSA9PiB7XG4gICAgY29uc3QgcGF0aCA9IGJ1aWxkUGF0aCgpO1xuICAgIHJldHVybiA8RnJhZ21lbnQ+XG4gICAgICAgIDxDYXJkQ29udGFpbmVyPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiaGVhZGVyLWNvbnRlbnRcIn0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItdGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAge3Byb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLWxvZ2luXCI+XG4gICAgICAgICAgICAgICAgICAgIDxTaWduSW4gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3JkZXItdG9wIGhlYWRlci11cmwtY2hpcHNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8TGluayBocmVmPVwiL1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgSG9tZVxuICAgICAgICAgICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAge3BhdGgucmV2ZXJzZSgpLm1hcCgoZSwgaW5kZXgpID0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9e2J1aWxkQmFjayhpbmRleCl9PntlfTwvTGluaz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKS5yZXZlcnNlKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9DYXJkQ29udGFpbmVyPlxuICAgIDwvRnJhZ21lbnQ+XG59IiwgImltcG9ydCBSZWFjdCwgeyBQcm9wc1dpdGhDaGlsZHJlbiB9IGZyb20gXCJyZWFjdFwiO1xudHlwZSBQcm9wcyA9IFByb3BzV2l0aENoaWxkcmVuPHt9PiAmIHtcbiAgICBjbGFzc05hbWU/OiBzdHJpbmdcbn1cbmV4cG9ydCBjb25zdCBDYXJkQ29udGFpbmVyID0gKHByb3BzOiBQcm9wcykgPT4ge1xuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Bjb250YWluZXIgY2FyZC1jb250YWluZXIgJHtwcm9wcy5jbGFzc05hbWUgPz8gXCJcIn1gLnRyaW0oKX0+XG4gICAgICAgICAgICB7cHJvcHMuY2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxufVxuXG5leHBvcnQgY29uc3QgQ29udGFpbmVyID0gKHByb3BzOiBQcm9wc1dpdGhDaGlsZHJlbikgPT4ge1xuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Bjb250YWluZXJgfT5cbiAgICAgICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG59IiwgImltcG9ydCBSZWFjdCwgeyBQcm9wc1dpdGhDaGlsZHJlbiwgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtuZXdBcGl9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL2ltcGwvbmV3QXBpXCI7XG50eXBlIFByb3BzID0gUHJvcHNXaXRoQ2hpbGRyZW48e30+ICYge1xuICAgIGhyZWY6IHN0cmluZyxcbn1cblxuZXhwb3J0IGNvbnN0IExpbmsgPSAocHJvcHM6IFByb3BzKSA9PiB7XG4gICAgY29uc3QgW3NlYXJjaFBhcmFtcywgc2V0U2VhcmNoUGFyYW1zXSA9IHVzZVN0YXRlPHN0cmluZz4oXCJcIik7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgc2V0U2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5oYXNoKTtcbiAgICAgICAgY29uc3QgZm4gPSAoKSA9PiB7XG4gICAgICAgICAgICBzZXRTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLmhhc2gpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IG5ld0FwaS5vbkNoYW5nZSgoKSA9PiB7XG4gICAgICAgICAgICBmbigpXG4gICAgICAgIH0pXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgZm4pO1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCBmbik7XG4gICAgICAgICAgICBzdWJzY3JpcHRpb24oKTtcbiAgICAgICAgfVxuICAgIH0sIFtdKTtcbiAgICByZXR1cm4gPGEgY2xhc3NOYW1lPVwibGlua1wiIGhyZWY9e3Byb3BzLmhyZWYgKyBzZWFyY2hQYXJhbXN9PlxuICAgICAgICB7cHJvcHMuY2hpbGRyZW59XG4gICAgPC9hPlxufSIsICJleHBvcnQgY29uc3QgY29uZmlnID0ge1xuICAgIGFwaUtleTogXCJBSXphU3lCdFEyV095SVVuYVNXQWhsM3M1UEFfTFprV3RwV3o1aUFcIixcbiAgICBjbGllbnRJZDogXCI5ODUyODA5MDcwMzEtZmZ2Zm5jOHBpMGFuZTk5bHNvOWRibDFtMmw1b2M5bm4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb21cIixcbiAgICBzY29wZTogXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2RyaXZlIGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvc3ByZWFkc2hlZXRzIGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvdXNlcmluZm8ucHJvZmlsZSBcIixcbiAgICBkaXNjb3ZlcnlEb2NzOiBbJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2Rpc2NvdmVyeS92MS9hcGlzL2RyaXZlL3YzL3Jlc3QnXSxcbn0iLCAiY29uc3QgbG9hZFNjcmlwdCA9IChzcmM6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT5cbiAgICBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmICghZ2xvYmFsVGhpcy5kb2N1bWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgLy8gY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIC8vIHNjcmlwdC5hc3luYyA9IHRydWU7XG4gICAgICAgIC8vIHNjcmlwdC5kZWZlciA9IHRydWU7XG4gICAgICAgIC8vIHNjcmlwdC5zcmMgPSBzcmM7XG4gICAgICAgIC8vIHNjcmlwdC5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKCk7XG4gICAgICAgIC8vIHNjcmlwdC5vbmVycm9yID0gcmVqZWN0O1xuICAgICAgICAvLyBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgfSlcblxuZXhwb3J0IGNvbnN0IGxvYWRHb29nbGVEZXBlbmRlbmNpZXMgPSBQcm9taXNlLmFsbChbXG4gICAgbG9hZFNjcmlwdCgnaHR0cHM6Ly9hcGlzLmdvb2dsZS5jb20vanMvYXBpLmpzJyksXG4gICAgbG9hZFNjcmlwdCgnaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL2dzaS9jbGllbnQnKSxcbl0pIiwgImltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IHsgbG9hZEdvb2dsZURlcGVuZGVuY2llcyB9IGZyb20gXCIuL2xvYWRHb29nbGVEZXBlbmRlbmNpZXNcIjtcblxuZXhwb3J0IGNvbnN0IGdhcGlDbGllbnRQcm9taXNlID0gbmV3IFByb21pc2U8YW55Pihhc3luYyByZXNvbHZlID0+IHtcbiAgICBhd2FpdCBsb2FkR29vZ2xlRGVwZW5kZW5jaWVzO1xuICAgIGdhcGkubG9hZCgnY2xpZW50JywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBnYXBpLmNsaWVudC5pbml0KHtcbiAgICAgICAgICAgIGFwaUtleTogY29uZmlnLmFwaUtleSxcbiAgICAgICAgICAgIGRpc2NvdmVyeURvY3M6IGNvbmZpZy5kaXNjb3ZlcnlEb2NzLFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4ocmVzb2x2ZSA9PiBnYXBpLmNsaWVudC5sb2FkKCdzaGVldHMnLCAndjQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgcmVzb2x2ZShnYXBpKTtcbiAgICB9KTtcbn0pIiwgImltcG9ydCB7IGdhcGlDbGllbnRQcm9taXNlIH0gZnJvbSBcIi4vZ2FwaUNsaWVudFByb21pc2VcIjtcblxuZXhwb3J0IGNvbnN0IGdldEV4cGlyYXRpb25EYXRlID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGdhcGkgPSBhd2FpdCBnYXBpQ2xpZW50UHJvbWlzZTtcbiAgICBjb25zdCB0b2tlbiA9IGdhcGk/LmF1dGg/LmdldFRva2VuKCk7XG4gICAgaWYgKCF0b2tlbikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzID0+IHJlcyh1bmRlZmluZWQpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZldGNoKGBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9vYXV0aDIvdjEvdG9rZW5pbmZvP2FjY2Vzc190b2tlbj0ke3Rva2VuLmFjY2Vzc190b2tlbn1gKVxuICAgICAgICAudGhlbihhc3luYyByZXMgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKGBnZXRFeHBpcmF0aW9uRGF0ZSBzdGF0dXMgJHtyZXMuc3RhdHVzfWApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gKGF3YWl0IHJlcy5qc29uKCkpPy5leHBpcmVzX2luO1xuICAgICAgICB9KTtcbn07IiwgImltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IHsgbG9hZEdvb2dsZURlcGVuZGVuY2llcyB9IGZyb20gXCIuL2xvYWRHb29nbGVEZXBlbmRlbmNpZXNcIjtcblxuZXhwb3J0IGNvbnN0IHRva2VuQ2xpZW50UHJvbWlzZSA9IG5ldyBQcm9taXNlPGFueT4oYXN5bmMgcmVzID0+IHtcbiAgICBhd2FpdCBsb2FkR29vZ2xlRGVwZW5kZW5jaWVzO1xuICAgIGNvbnN0IHRva2VuQ2xpZW50ID0gZ29vZ2xlLmFjY291bnRzLm9hdXRoMi5pbml0VG9rZW5DbGllbnQoe1xuICAgICAgICBjbGllbnRfaWQ6IGNvbmZpZy5jbGllbnRJZCxcbiAgICAgICAgc2NvcGU6IGNvbmZpZy5zY29wZSxcbiAgICAgICAgcmVkaXJlY3RfdXJpOiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MFwiLFxuICAgICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXModG9rZW5DbGllbnQpO1xufSkiLCAiaW1wb3J0IHsgQXBpIH0gZnJvbSBcIi4uL2FwaVwiO1xuaW1wb3J0IHsgZ2FwaUNsaWVudFByb21pc2UgfSBmcm9tIFwiLi4vZ29vZ2xlL2dhcGlDbGllbnRQcm9taXNlXCI7XG5pbXBvcnQgeyBnZXRFeHBpcmF0aW9uRGF0ZSB9IGZyb20gXCIuLi9nb29nbGUvZ2V0RXhwaXJhdGlvbkRhdGVcIjtcbmltcG9ydCB7IHRva2VuQ2xpZW50UHJvbWlzZSB9IGZyb20gXCIuLi9nb29nbGUvdG9rZW5DbGllbnRQcm9taXNlXCI7XG5mdW5jdGlvbiBhZGRRdWVyeVBhcmFtKHZhbHVlKSB7XG4gICAgY29uc3QgbmV3VXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgbmV3VXJsLmhhc2ggPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIFwiXCIsIG5ld1VybC5ocmVmKTtcbn1cblxuZXhwb3J0IGNvbnN0IG5ld0FwaTogQXBpID0ge1xuICAgIHNlc3Npb25OYW1lOiAoKSA9PiBuZXcgUHJvbWlzZShhc3luYyByZXNvbHZlID0+IHtcbiAgICAgICAgY29uc3QgZ2FwaSA9IGF3YWl0IGdhcGlDbGllbnRQcm9taXNlO1xuICAgICAgICBnYXBpLmNsaWVudC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICdwYXRoJzogJ2h0dHBzOi8vcGVvcGxlLmdvb2dsZWFwaXMuY29tL3YxL3Blb3BsZS9tZT9wZXJzb25GaWVsZHM9bmFtZXMnLFxuICAgICAgICAgICAgJ21ldGhvZCc6ICdHRVQnLFxuICAgICAgICAgICAgJ2NhbGxiYWNrJzogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZT8ubmFtZXM/LlswXT8uZGlzcGxheU5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KSxcbiAgICBsb2FkRnJvbVVybDogYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBnYXBpID0gYXdhaXQgZ2FwaUNsaWVudFByb21pc2U7XG4gICAgICAgIGNvbnN0IGNyZWRlbnRpYWxzRnJvbVVybCA9IGRlY29kZVVSSSh3aW5kb3cubG9jYXRpb24uaGFzaC5yZXBsYWNlKFwiI1wiLCBcIlwiKSk7XG4gICAgICAgIGlmIChjcmVkZW50aWFsc0Zyb21VcmwpIHtcbiAgICAgICAgICAgIGNvbnN0IGNyZWRlbnRpYWxzID0gSlNPTi5wYXJzZShjcmVkZW50aWFsc0Zyb21VcmwpO1xuICAgICAgICAgICAgYXdhaXQgZ2FwaS5jbGllbnQuaW5pdCh7fSk7XG4gICAgICAgICAgICBnYXBpLmNsaWVudC5zZXRUb2tlbihjcmVkZW50aWFscyk7XG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnbmV3QXBpLW9uQ2hhbmdlJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICAgIG9uQ2hhbmdlOiAoY2FsbGJhY2spID0+IHtcbiAgICAgICAgY29uc3QgZm4gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBnbG9iYWxUaGlzPy5kb2N1bWVudD8uYWRkRXZlbnRMaXN0ZW5lcihcIm5ld0FwaS1vbkNoYW5nZVwiLCBmbik7XG4gICAgICAgIHJldHVybiAoKSA9PiBnbG9iYWxUaGlzPy5kb2N1bWVudD8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm5ld0FwaS1vbkNoYW5nZVwiLCBmbik7XG4gICAgfSxcbiAgICBsb2dvdXQ6IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgZ2FwaSA9IGF3YWl0IGdhcGlDbGllbnRQcm9taXNlO1xuICAgICAgICBnYXBpLmNsaWVudC5zZXRUb2tlbihudWxsKVxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IFwiXCI7XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCduZXdBcGktb25DaGFuZ2UnKSlcbiAgICB9LFxuICAgIGxvZ2luOiBhc3luYyAoKSA9PiBuZXcgUHJvbWlzZTx2b2lkPihhc3luYyAocmVzb2x2ZSkgPT4ge1xuICAgICAgICBjb25zdCB0b2tlbkNsaWVudCA9IGF3YWl0IHRva2VuQ2xpZW50UHJvbWlzZTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKGF3YWl0IG5ld0FwaS5sb2FkRnJvbVVybCgpKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgZ2V0RXhwaXJhdGlvbkRhdGUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2gge1xuXG4gICAgICAgIH1cbiAgICAgICAgdG9rZW5DbGllbnQuY2FsbGJhY2sgPSAoY3JlZGVudGlhbHNSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgYWRkUXVlcnlQYXJhbShjcmVkZW50aWFsc1Jlc3BvbnNlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCduZXdBcGktb25DaGFuZ2UnKSlcbiAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICB9XG5cbiAgICAgICAgdG9rZW5DbGllbnQucmVxdWVzdEFjY2Vzc1Rva2VuKHsgcHJvbXB0OiAnY29uc2VudCcgfSk7XG4gICAgfSlcbn0iLCAiaW1wb3J0IFJlYWN0LCB7dXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlU3RhdGV9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtuZXdBcGl9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL2ltcGwvbmV3QXBpXCI7XG5pbXBvcnQge0J1dHRvbn0gZnJvbSBcIi4uL2F0b21zL0J1dHRvblwiO1xuXG5leHBvcnQgY29uc3QgU2lnbkluID0gKCkgPT4ge1xuICAgIGNvbnN0IFtzdGF0ZSwgc2V0U3RhdGVdID0gdXNlU3RhdGU8c3RyaW5nIHwgdW5kZWZpbmVkPih1bmRlZmluZWQpO1xuICAgIGNvbnN0IGNhbGxiYWNrID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgICAgIG5ld0FwaS5sb2dvdXQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBuZXdBcGkubG9naW4oKTtcbiAgICB9LCBbc3RhdGVdKVxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIG5ld0FwaS5zZXNzaW9uTmFtZSgpLnRoZW4oc2V0U3RhdGUpO1xuICAgICAgICBjb25zdCB1bnN1YnNjcmliZSA9IG5ld0FwaS5vbkNoYW5nZShhc3luYyBlID0+IHtcbiAgICAgICAgICAgIHNldFN0YXRlKGF3YWl0IG5ld0FwaS5zZXNzaW9uTmFtZSgpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIG5ld0FwaS5sb2FkRnJvbVVybCgpO1xuICAgICAgICByZXR1cm4gdW5zdWJzY3JpYmU7XG4gICAgfSwgW10pO1xuICAgIHJldHVybiA8PlxuICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e2NhbGxiYWNrfT5cbiAgICAgICAgICAgIHtzdGF0ZSA/IGBMb2dvdXQgb2YgJHtzdGF0ZX1gIDogXCJMb2dpblwifVxuICAgICAgICA8L0J1dHRvbj5cbiAgICA8Lz5cbn0iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXG5cbnR5cGUgUHJvcHMgPSBSZWFjdC5EZXRhaWxlZEhUTUxQcm9wczxSZWFjdC5CdXR0b25IVE1MQXR0cmlidXRlczxIVE1MQnV0dG9uRWxlbWVudD4sIEhUTUxCdXR0b25FbGVtZW50PlxuXG5leHBvcnQgY29uc3QgQnV0dG9uID0gKHByb3BzOiBQcm9wcykgPT4ge1xuICAgIHJldHVybiA8YnV0dG9uIHsuLi5wcm9wc30gY2xhc3NOYW1lPVwiYnV0dG9uXCI+e3Byb3BzLmNoaWxkcmVufTwvYnV0dG9uPlxufSJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQSxhQUFPLFVBQVUsV0FBVztBQUFBO0FBQUE7OztBQ0E1QjtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BQUFBLGdCQUEyQzs7O0FDQTNDLE1BQUFDLGdCQUFtRTs7O0FDQW5FLHFCQUFrQjtBQUVYLE1BQU0sVUFBVSxDQUFDLEVBQUUsU0FBUyxNQUFNO0FBQ3JDLFdBQU8sNkJBQUFDLFFBQUEsY0FBQyxTQUFJLHlCQUF5QixFQUFFLFFBQVEsUUFBUSxlQUFlLEdBQUc7QUFBQSxFQUM3RTs7O0FDSkEsTUFBQUMsZ0JBQW1EOzs7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LGtCQUNYLDhCQUFBQSxRQUFBLGNBQUMsY0FBUSxNQUFNLEtBQU0sR0FDcEIsTUFBTSxRQUNYLENBQ0osQ0FDSixDQUNKO0FBQUEsRUFHUjs7O0FEM0NBLE1BQU0sU0FBUyxNQUFNO0FBQ25CLGlDQUFVLE1BQU07QUFDZCxVQUFJLFFBQVE7QUFDVixnQkFBUSxJQUFJLE9BQU8sUUFBUTtBQUFBLE1BQzdCO0FBQUEsSUFDRixHQUFHLENBQUMsQ0FBQztBQUVMLFdBQU8sOEJBQUFDLFFBQUEsY0FBQyw0QkFBUztBQUFBLEVBQ25CO0FBRUEsTUFBTyxjQUNMLDhCQUFBQSxRQUFBLGNBQUMsUUFBSyxPQUFNLHNCQUNWLDhCQUFBQSxRQUFBLGNBQUMsWUFBTyxHQUNSLDhCQUFBQSxRQUFBLGNBQUMsUUFBSyxNQUFNLFVBQVEsTUFBSSxHQUN4Qiw4QkFBQUEsUUFBQSxjQUFDLFFBQUssTUFBTSxhQUFXLFNBQU8sR0FDOUIsOEJBQUFBLFFBQUEsY0FBQyxRQUFLLE1BQU0sV0FBUyxPQUFLLENBQzVCOyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiUmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgInJlc29sdmUiLCAiZ2FwaSIsICJnYXBpIiwgIlJlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiUmVhY3QiLCAiUmVhY3QiLCAiUmVhY3QiLCAiUmVhY3QiLCAiUmVhY3QiXQp9Cg==

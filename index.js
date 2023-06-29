var mainComponent = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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

  // external-global-plugin:react
  var require_react = __commonJS({
    "external-global-plugin:react"(exports, module) {
      module.exports = globalThis.React;
    }
  });

  // node_modules/anud12.github.io_ui_base/src/components/Comment.tsx
  var import_react, Comment;
  var init_Comment = __esm({
    "node_modules/anud12.github.io_ui_base/src/components/Comment.tsx"() {
      import_react = __toESM(require_react());
      Comment = ({ children }) => {
        return /* @__PURE__ */ import_react.default.createElement("div", { dangerouslySetInnerHTML: { __html: `<!-- ${children} -->` } });
      };
    }
  });

  // node_modules/anud12.github.io_ui_base/src/components/Container.tsx
  var import_react2, CardContainer;
  var init_Container = __esm({
    "node_modules/anud12.github.io_ui_base/src/components/Container.tsx"() {
      import_react2 = __toESM(require_react());
      CardContainer = (props) => {
        return /* @__PURE__ */ import_react2.default.createElement("div", { className: "container-container" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: `container card-container ${props.className ?? ""}`.trim() }, props.children));
      };
    }
  });

  // node_modules/anud12.github.io_ui_base/src/components/atoms/Link.tsx
  var import_react3, Link;
  var init_Link = __esm({
    "node_modules/anud12.github.io_ui_base/src/components/atoms/Link.tsx"() {
      import_react3 = __toESM(require_react());
      Link = (props) => {
        const [searchParams, setSearchParams] = (0, import_react3.useState)("");
        (0, import_react3.useEffect)(() => {
          setSearchParams(window.location.hash);
          const fn = () => {
            setSearchParams(window.location.hash);
          };
          window.addEventListener("hashchange", fn);
          return () => {
            window.removeEventListener("hashchange", fn);
          };
        }, []);
        return /* @__PURE__ */ import_react3.default.createElement("a", { className: "link", href: props.href + searchParams }, props.children);
      };
    }
  });

  // node_modules/anud12.github.io_ui_base/src/service/google/config.ts
  var config;
  var init_config = __esm({
    "node_modules/anud12.github.io_ui_base/src/service/google/config.ts"() {
      config = {
        apiKey: "AIzaSyBtQ2WOyIUnaSWAhl3s5PA_LZkWtpWz5iA",
        clientId: "985280907031-ffvfnc8pi0ane99lso9dbl1m2l5oc9nn.apps.googleusercontent.com",
        scope: "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/userinfo.profile ",
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"]
      };
    }
  });

  // node_modules/anud12.github.io_ui_base/src/service/google/loadGoogleDependencies.ts
  var loadScript, loadGoogleDependencies;
  var init_loadGoogleDependencies = __esm({
    "node_modules/anud12.github.io_ui_base/src/service/google/loadGoogleDependencies.ts"() {
      loadScript = (src) => new Promise((resolve, reject) => {
        if (!globalThis.document) {
          return;
        }
        const script = document.createElement("script");
        script.async = true;
        script.defer = true;
        script.src = src;
        script.onload = () => resolve();
        script.onerror = reject;
        document.head.appendChild(script);
      });
      loadGoogleDependencies = Promise.all([
        loadScript("https://apis.google.com/js/api.js"),
        loadScript("https://accounts.google.com/gsi/client")
      ]);
    }
  });

  // node_modules/anud12.github.io_ui_base/src/service/google/gapiClientPromise.ts
  var gapiClientPromise;
  var init_gapiClientPromise = __esm({
    "node_modules/anud12.github.io_ui_base/src/service/google/gapiClientPromise.ts"() {
      init_config();
      init_loadGoogleDependencies();
      gapiClientPromise = new Promise(async (resolve) => {
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
    }
  });

  // node_modules/anud12.github.io_ui_base/src/service/google/getExpirationDate.ts
  var getExpirationDate;
  var init_getExpirationDate = __esm({
    "node_modules/anud12.github.io_ui_base/src/service/google/getExpirationDate.ts"() {
      init_gapiClientPromise();
      getExpirationDate = async () => {
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
    }
  });

  // node_modules/anud12.github.io_ui_base/src/service/google/tokenClientPromise.ts
  var tokenClientPromise;
  var init_tokenClientPromise = __esm({
    "node_modules/anud12.github.io_ui_base/src/service/google/tokenClientPromise.ts"() {
      init_config();
      init_loadGoogleDependencies();
      tokenClientPromise = new Promise(async (res) => {
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
    }
  });

  // node_modules/anud12.github.io_ui_base/src/service/impl/newApi.ts
  function addQueryParam(value) {
    const newUrl = new URL(window.location.href);
    newUrl.hash = JSON.stringify(value);
    window.history.replaceState(null, "", newUrl.href);
  }
  var newApi;
  var init_newApi = __esm({
    "node_modules/anud12.github.io_ui_base/src/service/impl/newApi.ts"() {
      init_gapiClientPromise();
      init_getExpirationDate();
      init_tokenClientPromise();
      newApi = {
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
    }
  });

  // node_modules/anud12.github.io_ui_base/src/components/atoms/Button.tsx
  var import_react4, Button;
  var init_Button = __esm({
    "node_modules/anud12.github.io_ui_base/src/components/atoms/Button.tsx"() {
      import_react4 = __toESM(require_react());
      Button = (props) => {
        return /* @__PURE__ */ import_react4.default.createElement("button", { ...props, className: "button" }, props.children);
      };
    }
  });

  // node_modules/anud12.github.io_ui_base/src/components/api/signIn.tsx
  var import_react5, SignIn;
  var init_signIn = __esm({
    "node_modules/anud12.github.io_ui_base/src/components/api/signIn.tsx"() {
      import_react5 = __toESM(require_react());
      init_newApi();
      init_Button();
      SignIn = () => {
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
    }
  });

  // node_modules/anud12.github.io_ui_base/src/components/Header.tsx
  var import_react6, buildBack, buildPath, Header;
  var init_Header = __esm({
    "node_modules/anud12.github.io_ui_base/src/components/Header.tsx"() {
      import_react6 = __toESM(require_react());
      init_Container();
      init_Link();
      init_signIn();
      buildBack = (index) => new Array(index + 1).fill("..").join("/");
      buildPath = () => {
        const href = globalThis?.window?.location.href;
        const url = href ? new URL(href) : void 0;
        const path = url?.pathname?.split("/").filter((e) => e) ?? [];
        path.reverse();
        path.splice(0, 1);
        path.reverse();
        return path;
      };
      Header = (props) => {
        const path = buildPath();
        return /* @__PURE__ */ import_react6.default.createElement(import_react6.Fragment, null, /* @__PURE__ */ import_react6.default.createElement(CardContainer, null, /* @__PURE__ */ import_react6.default.createElement("div", { className: "header-content" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "header-title" }, props.children), /* @__PURE__ */ import_react6.default.createElement("div", { className: "header-login" }, /* @__PURE__ */ import_react6.default.createElement(SignIn, null))), /* @__PURE__ */ import_react6.default.createElement("div", { className: "border-top header-url-chips" }, /* @__PURE__ */ import_react6.default.createElement("div", null, /* @__PURE__ */ import_react6.default.createElement(Link, { href: "/" }, "Home")), path.reverse().map(
          (e, index) => /* @__PURE__ */ import_react6.default.createElement("div", { key: e }, /* @__PURE__ */ import_react6.default.createElement(Link, { href: buildBack(index) }, e))
        ).reverse())));
      };
    }
  });

  // node_modules/anud12.github.io_ui_base/src/components/Page.tsx
  var import_react7, time, Page;
  var init_Page = __esm({
    "node_modules/anud12.github.io_ui_base/src/components/Page.tsx"() {
      import_react7 = __toESM(require_react());
      init_Comment();
      init_Header();
      time = (/* @__PURE__ */ new Date()).toISOString();
      Page = (props) => {
        const theme = props.theme ?? {};
        return /* @__PURE__ */ import_react7.default.createElement("html", null, /* @__PURE__ */ import_react7.default.createElement("head", null, /* @__PURE__ */ import_react7.default.createElement("link", { href: "https://anud.ro/ui_base/src/main.css", type: "text/css", rel: "stylesheet" }), /* @__PURE__ */ import_react7.default.createElement("link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,300,0,-25" }), /* @__PURE__ */ import_react7.default.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }), /* @__PURE__ */ import_react7.default.createElement("link", { href: "https://fonts.googleapis.com/css2?family=Rajdhani&display=swap", rel: "stylesheet" }), /* @__PURE__ */ import_react7.default.createElement("link", { href: "https://fonts.googleapis.com/css2?family=Rajdhani:wght@500&display=swap", rel: "stylesheet" })), /* @__PURE__ */ import_react7.default.createElement("body", null, /* @__PURE__ */ import_react7.default.createElement(Comment, null, time), /* @__PURE__ */ import_react7.default.createElement("div", { className: "page", style: {
          "--primary": theme["--primary"] ?? "#0074cc",
          "--background-color": theme["--background-color"] ?? "white",
          "--border-color": theme["--border-color"] ?? "#c4c4c4"
        } }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "page-content" }, /* @__PURE__ */ import_react7.default.createElement(Header, null, props.title), props.children))));
      };
    }
  });

  // index.tsx
  var require_src = __commonJS({
    "index.tsx"(exports, module) {
      var import_react8 = __toESM(require_react());
      init_Page();
      init_Link();
      module.exports = /* @__PURE__ */ import_react8.default.createElement(Page, { title: "anud12.github.io" }, /* @__PURE__ */ import_react8.default.createElement(Link, { href: "ui_base" }, "ui_base"), /* @__PURE__ */ import_react8.default.createElement(Link, { href: "boxes" }, "Boxes"));
    }
  });
  return require_src();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZXh0ZXJuYWwtZ2xvYmFsLXBsdWdpbjpyZWFjdCIsICJub2RlX21vZHVsZXMvYW51ZDEyLmdpdGh1Yi5pb191aV9iYXNlL3NyYy9jb21wb25lbnRzL0NvbW1lbnQudHN4IiwgIm5vZGVfbW9kdWxlcy9hbnVkMTIuZ2l0aHViLmlvX3VpX2Jhc2Uvc3JjL2NvbXBvbmVudHMvQ29udGFpbmVyLnRzeCIsICJub2RlX21vZHVsZXMvYW51ZDEyLmdpdGh1Yi5pb191aV9iYXNlL3NyYy9jb21wb25lbnRzL2F0b21zL0xpbmsudHN4IiwgIm5vZGVfbW9kdWxlcy9hbnVkMTIuZ2l0aHViLmlvX3VpX2Jhc2Uvc3JjL3NlcnZpY2UvZ29vZ2xlL2NvbmZpZy50cyIsICJub2RlX21vZHVsZXMvYW51ZDEyLmdpdGh1Yi5pb191aV9iYXNlL3NyYy9zZXJ2aWNlL2dvb2dsZS9sb2FkR29vZ2xlRGVwZW5kZW5jaWVzLnRzIiwgIm5vZGVfbW9kdWxlcy9hbnVkMTIuZ2l0aHViLmlvX3VpX2Jhc2Uvc3JjL3NlcnZpY2UvZ29vZ2xlL2dhcGlDbGllbnRQcm9taXNlLnRzIiwgIm5vZGVfbW9kdWxlcy9hbnVkMTIuZ2l0aHViLmlvX3VpX2Jhc2Uvc3JjL3NlcnZpY2UvZ29vZ2xlL2dldEV4cGlyYXRpb25EYXRlLnRzIiwgIm5vZGVfbW9kdWxlcy9hbnVkMTIuZ2l0aHViLmlvX3VpX2Jhc2Uvc3JjL3NlcnZpY2UvZ29vZ2xlL3Rva2VuQ2xpZW50UHJvbWlzZS50cyIsICJub2RlX21vZHVsZXMvYW51ZDEyLmdpdGh1Yi5pb191aV9iYXNlL3NyYy9zZXJ2aWNlL2ltcGwvbmV3QXBpLnRzIiwgIm5vZGVfbW9kdWxlcy9hbnVkMTIuZ2l0aHViLmlvX3VpX2Jhc2Uvc3JjL2NvbXBvbmVudHMvYXRvbXMvQnV0dG9uLnRzeCIsICJub2RlX21vZHVsZXMvYW51ZDEyLmdpdGh1Yi5pb191aV9iYXNlL3NyYy9jb21wb25lbnRzL2FwaS9zaWduSW4udHN4IiwgIm5vZGVfbW9kdWxlcy9hbnVkMTIuZ2l0aHViLmlvX3VpX2Jhc2Uvc3JjL2NvbXBvbmVudHMvSGVhZGVyLnRzeCIsICJub2RlX21vZHVsZXMvYW51ZDEyLmdpdGh1Yi5pb191aV9iYXNlL3NyYy9jb21wb25lbnRzL1BhZ2UudHN4IiwgImluZGV4LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxUaGlzLlJlYWN0IiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGNvbnN0IENvbW1lbnQgPSAoeyBjaGlsZHJlbiB9KSA9PiB7XG4gICAgcmV0dXJuIDxkaXYgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiBgPCEtLSAke2NoaWxkcmVufSAtLT5gIH19IC8+XG59IiwgImltcG9ydCBSZWFjdCwgeyBQcm9wc1dpdGhDaGlsZHJlbiB9IGZyb20gXCJyZWFjdFwiO1xudHlwZSBQcm9wcyA9IFByb3BzV2l0aENoaWxkcmVuPHt9PiAmIHtcbiAgICBjbGFzc05hbWU/OiBzdHJpbmdcbn1cbmV4cG9ydCBjb25zdCBDYXJkQ29udGFpbmVyID0gKHByb3BzOiBQcm9wcykgPT4ge1xuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Bjb250YWluZXIgY2FyZC1jb250YWluZXIgJHtwcm9wcy5jbGFzc05hbWUgPz8gXCJcIn1gLnRyaW0oKX0+XG4gICAgICAgICAgICB7cHJvcHMuY2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxufVxuXG5leHBvcnQgY29uc3QgQ29udGFpbmVyID0gKHByb3BzOiBQcm9wc1dpdGhDaGlsZHJlbikgPT4ge1xuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Bjb250YWluZXJgfT5cbiAgICAgICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG59IiwgImltcG9ydCBSZWFjdCwgeyBQcm9wc1dpdGhDaGlsZHJlbiwgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xudHlwZSBQcm9wcyA9IFByb3BzV2l0aENoaWxkcmVuPHt9PiAmIHtcbiAgICBocmVmOiBzdHJpbmcsXG59XG5cbmV4cG9ydCBjb25zdCBMaW5rID0gKHByb3BzOiBQcm9wcykgPT4ge1xuICAgIGNvbnN0IFtzZWFyY2hQYXJhbXMsIHNldFNlYXJjaFBhcmFtc10gPSB1c2VTdGF0ZTxzdHJpbmc+KFwiXCIpO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIHNldFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uaGFzaCk7XG4gICAgICAgIGNvbnN0IGZuID0gKCkgPT4ge1xuICAgICAgICAgICAgc2V0U2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5oYXNoKTtcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIGZuKTtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgZm4pO1xuICAgICAgICB9XG4gICAgfSwgW10pO1xuICAgIHJldHVybiA8YSBjbGFzc05hbWU9XCJsaW5rXCIgaHJlZj17cHJvcHMuaHJlZiArIHNlYXJjaFBhcmFtc30+XG4gICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICA8L2E+XG59IiwgImV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gICAgYXBpS2V5OiBcIkFJemFTeUJ0UTJXT3lJVW5hU1dBaGwzczVQQV9MWmtXdHBXejVpQVwiLFxuICAgIGNsaWVudElkOiBcIjk4NTI4MDkwNzAzMS1mZnZmbmM4cGkwYW5lOTlsc285ZGJsMW0ybDVvYzlubi5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbVwiLFxuICAgIHNjb3BlOiBcImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvZHJpdmUgaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9zcHJlYWRzaGVldHMgaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC91c2VyaW5mby5wcm9maWxlIFwiLFxuICAgIGRpc2NvdmVyeURvY3M6IFsnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vZGlzY292ZXJ5L3YxL2FwaXMvZHJpdmUvdjMvcmVzdCddLFxufSIsICJjb25zdCBsb2FkU2NyaXB0ID0gKHNyYzogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PlxuICAgIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKCFnbG9iYWxUaGlzLmRvY3VtZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIHNjcmlwdC5hc3luYyA9IHRydWU7XG4gICAgICAgIHNjcmlwdC5kZWZlciA9IHRydWU7XG4gICAgICAgIHNjcmlwdC5zcmMgPSBzcmM7XG4gICAgICAgIHNjcmlwdC5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKCk7XG4gICAgICAgIHNjcmlwdC5vbmVycm9yID0gcmVqZWN0O1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgfSlcblxuZXhwb3J0IGNvbnN0IGxvYWRHb29nbGVEZXBlbmRlbmNpZXMgPSBQcm9taXNlLmFsbChbXG4gICAgbG9hZFNjcmlwdCgnaHR0cHM6Ly9hcGlzLmdvb2dsZS5jb20vanMvYXBpLmpzJyksXG4gICAgbG9hZFNjcmlwdCgnaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL2dzaS9jbGllbnQnKSxcbl0pIiwgImltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IHsgbG9hZEdvb2dsZURlcGVuZGVuY2llcyB9IGZyb20gXCIuL2xvYWRHb29nbGVEZXBlbmRlbmNpZXNcIjtcblxuZXhwb3J0IGNvbnN0IGdhcGlDbGllbnRQcm9taXNlID0gbmV3IFByb21pc2U8YW55Pihhc3luYyByZXNvbHZlID0+IHtcbiAgICBhd2FpdCBsb2FkR29vZ2xlRGVwZW5kZW5jaWVzO1xuICAgIGdhcGkubG9hZCgnY2xpZW50JywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBnYXBpLmNsaWVudC5pbml0KHtcbiAgICAgICAgICAgIGFwaUtleTogY29uZmlnLmFwaUtleSxcbiAgICAgICAgICAgIGRpc2NvdmVyeURvY3M6IGNvbmZpZy5kaXNjb3ZlcnlEb2NzLFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4ocmVzb2x2ZSA9PiBnYXBpLmNsaWVudC5sb2FkKCdzaGVldHMnLCAndjQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgcmVzb2x2ZShnYXBpKTtcbiAgICB9KTtcbn0pIiwgImltcG9ydCB7IGdhcGlDbGllbnRQcm9taXNlIH0gZnJvbSBcIi4vZ2FwaUNsaWVudFByb21pc2VcIjtcblxuZXhwb3J0IGNvbnN0IGdldEV4cGlyYXRpb25EYXRlID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGdhcGkgPSBhd2FpdCBnYXBpQ2xpZW50UHJvbWlzZTtcbiAgICBjb25zdCB0b2tlbiA9IGdhcGk/LmF1dGg/LmdldFRva2VuKCk7XG4gICAgaWYgKCF0b2tlbikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzID0+IHJlcyh1bmRlZmluZWQpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZldGNoKGBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9vYXV0aDIvdjEvdG9rZW5pbmZvP2FjY2Vzc190b2tlbj0ke3Rva2VuLmFjY2Vzc190b2tlbn1gKVxuICAgICAgICAudGhlbihhc3luYyByZXMgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKGBnZXRFeHBpcmF0aW9uRGF0ZSBzdGF0dXMgJHtyZXMuc3RhdHVzfWApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gKGF3YWl0IHJlcy5qc29uKCkpPy5leHBpcmVzX2luO1xuICAgICAgICB9KTtcbn07IiwgImltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IHsgbG9hZEdvb2dsZURlcGVuZGVuY2llcyB9IGZyb20gXCIuL2xvYWRHb29nbGVEZXBlbmRlbmNpZXNcIjtcblxuZXhwb3J0IGNvbnN0IHRva2VuQ2xpZW50UHJvbWlzZSA9IG5ldyBQcm9taXNlPGFueT4oYXN5bmMgcmVzID0+IHtcbiAgICBhd2FpdCBsb2FkR29vZ2xlRGVwZW5kZW5jaWVzO1xuICAgIGNvbnN0IHRva2VuQ2xpZW50ID0gZ29vZ2xlLmFjY291bnRzLm9hdXRoMi5pbml0VG9rZW5DbGllbnQoe1xuICAgICAgICBjbGllbnRfaWQ6IGNvbmZpZy5jbGllbnRJZCxcbiAgICAgICAgc2NvcGU6IGNvbmZpZy5zY29wZSxcbiAgICAgICAgcmVkaXJlY3RfdXJpOiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MFwiLFxuICAgICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXModG9rZW5DbGllbnQpO1xufSkiLCAiaW1wb3J0IHsgcmVqZWN0cyB9IGZyb20gXCJhc3NlcnRcIjtcbmltcG9ydCB7IEFwaSB9IGZyb20gXCIuLi9hcGlcIjtcbmltcG9ydCB7IGdhcGlDbGllbnRQcm9taXNlIH0gZnJvbSBcIi4uL2dvb2dsZS9nYXBpQ2xpZW50UHJvbWlzZVwiO1xuaW1wb3J0IHsgZ2V0RXhwaXJhdGlvbkRhdGUgfSBmcm9tIFwiLi4vZ29vZ2xlL2dldEV4cGlyYXRpb25EYXRlXCI7XG5pbXBvcnQgeyB0b2tlbkNsaWVudFByb21pc2UgfSBmcm9tIFwiLi4vZ29vZ2xlL3Rva2VuQ2xpZW50UHJvbWlzZVwiO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBhc3luYyB9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQgeyB1cmwgfSBmcm9tIFwiaW5zcGVjdG9yXCI7XG5mdW5jdGlvbiBhZGRRdWVyeVBhcmFtKHZhbHVlKSB7XG4gICAgY29uc3QgbmV3VXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgbmV3VXJsLmhhc2ggPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIFwiXCIsIG5ld1VybC5ocmVmKTtcbn1cblxuZXhwb3J0IGNvbnN0IG5ld0FwaTogQXBpID0ge1xuICAgIHNlc3Npb25OYW1lOiAoKSA9PiBuZXcgUHJvbWlzZShhc3luYyByZXNvbHZlID0+IHtcbiAgICAgICAgY29uc3QgZ2FwaSA9IGF3YWl0IGdhcGlDbGllbnRQcm9taXNlO1xuICAgICAgICBnYXBpLmNsaWVudC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICdwYXRoJzogJ2h0dHBzOi8vcGVvcGxlLmdvb2dsZWFwaXMuY29tL3YxL3Blb3BsZS9tZT9wZXJzb25GaWVsZHM9bmFtZXMnLFxuICAgICAgICAgICAgJ21ldGhvZCc6ICdHRVQnLFxuICAgICAgICAgICAgJ2NhbGxiYWNrJzogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZT8ubmFtZXM/LlswXT8uZGlzcGxheU5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KSxcbiAgICBsb2FkRnJvbVVybDogYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBnYXBpID0gYXdhaXQgZ2FwaUNsaWVudFByb21pc2U7XG4gICAgICAgIGNvbnN0IGNyZWRlbnRpYWxzRnJvbVVybCA9IGRlY29kZVVSSSh3aW5kb3cubG9jYXRpb24uaGFzaC5yZXBsYWNlKFwiI1wiLCBcIlwiKSk7XG4gICAgICAgIGlmIChjcmVkZW50aWFsc0Zyb21VcmwpIHtcbiAgICAgICAgICAgIGNvbnN0IGNyZWRlbnRpYWxzID0gSlNPTi5wYXJzZShjcmVkZW50aWFsc0Zyb21VcmwpO1xuICAgICAgICAgICAgYXdhaXQgZ2FwaS5jbGllbnQuaW5pdCh7fSk7XG4gICAgICAgICAgICBnYXBpLmNsaWVudC5zZXRUb2tlbihjcmVkZW50aWFscyk7XG4gICAgICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnbmV3QXBpLW9uQ2hhbmdlJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICAgIG9uQ2hhbmdlOiAoY2FsbGJhY2spID0+IHtcbiAgICAgICAgY29uc3QgZm4gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBnbG9iYWxUaGlzPy5kb2N1bWVudD8uYWRkRXZlbnRMaXN0ZW5lcihcIm5ld0FwaS1vbkNoYW5nZVwiLCBmbik7XG4gICAgICAgIHJldHVybiAoKSA9PiBnbG9iYWxUaGlzPy5kb2N1bWVudD8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm5ld0FwaS1vbkNoYW5nZVwiLCBmbik7XG4gICAgfSxcbiAgICBsb2dvdXQ6IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgZ2FwaSA9IGF3YWl0IGdhcGlDbGllbnRQcm9taXNlO1xuICAgICAgICBnYXBpLmNsaWVudC5zZXRUb2tlbihudWxsKVxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IFwiXCI7XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCduZXdBcGktb25DaGFuZ2UnKSlcbiAgICB9LFxuICAgIGxvZ2luOiBhc3luYyAoKSA9PiBuZXcgUHJvbWlzZTx2b2lkPihhc3luYyAocmVzb2x2ZSkgPT4ge1xuICAgICAgICBjb25zdCB0b2tlbkNsaWVudCA9IGF3YWl0IHRva2VuQ2xpZW50UHJvbWlzZTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKGF3YWl0IG5ld0FwaS5sb2FkRnJvbVVybCgpKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgZ2V0RXhwaXJhdGlvbkRhdGUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2gge1xuXG4gICAgICAgIH1cbiAgICAgICAgdG9rZW5DbGllbnQuY2FsbGJhY2sgPSAoY3JlZGVudGlhbHNSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgYWRkUXVlcnlQYXJhbShjcmVkZW50aWFsc1Jlc3BvbnNlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCduZXdBcGktb25DaGFuZ2UnKSlcbiAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICB9XG5cbiAgICAgICAgdG9rZW5DbGllbnQucmVxdWVzdEFjY2Vzc1Rva2VuKHsgcHJvbXB0OiAnY29uc2VudCcgfSk7XG4gICAgfSlcbn0iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXG5cbnR5cGUgUHJvcHMgPSBSZWFjdC5EZXRhaWxlZEhUTUxQcm9wczxSZWFjdC5CdXR0b25IVE1MQXR0cmlidXRlczxIVE1MQnV0dG9uRWxlbWVudD4sIEhUTUxCdXR0b25FbGVtZW50PlxuXG5leHBvcnQgY29uc3QgQnV0dG9uID0gKHByb3BzOiBQcm9wcykgPT4ge1xuICAgIHJldHVybiA8YnV0dG9uIHsuLi5wcm9wc30gY2xhc3NOYW1lPVwiYnV0dG9uXCI+e3Byb3BzLmNoaWxkcmVufTwvYnV0dG9uPlxufSIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGdhcGlDbGllbnRQcm9taXNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvZ29vZ2xlL2dhcGlDbGllbnRQcm9taXNlXCI7XG5pbXBvcnQgeyBuZXdBcGkgfSBmcm9tIFwiLi4vLi4vc2VydmljZS9pbXBsL25ld0FwaVwiO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcIi4uL2F0b21zL0J1dHRvblwiO1xuXG5leHBvcnQgY29uc3QgU2lnbkluID0gKCkgPT4ge1xuICAgIGNvbnN0IFtzdGF0ZSwgc2V0U3RhdGVdID0gdXNlU3RhdGU8c3RyaW5nIHwgdW5kZWZpbmVkPih1bmRlZmluZWQpO1xuICAgIGNvbnN0IGNhbGxiYWNrID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgICAgIG5ld0FwaS5sb2dvdXQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBuZXdBcGkubG9naW4oKTtcbiAgICB9LCBbc3RhdGVdKVxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIG5ld0FwaS5zZXNzaW9uTmFtZSgpLnRoZW4oc2V0U3RhdGUpO1xuICAgICAgICBjb25zdCB1bnN1YnNjcmliZSA9IG5ld0FwaS5vbkNoYW5nZShhc3luYyBlID0+IHtcbiAgICAgICAgICAgIHNldFN0YXRlKGF3YWl0IG5ld0FwaS5zZXNzaW9uTmFtZSgpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIG5ld0FwaS5sb2FkRnJvbVVybCgpO1xuICAgICAgICByZXR1cm4gdW5zdWJzY3JpYmU7XG4gICAgfSwgW10pO1xuICAgIHJldHVybiA8PlxuICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e2NhbGxiYWNrfT5cbiAgICAgICAgICAgIHtzdGF0ZSA/IGBMb2dvdXQgb2YgJHtzdGF0ZX1gIDogXCJMb2dpblwifVxuICAgICAgICA8L0J1dHRvbj5cbiAgICA8Lz5cbn0iLCAiaW1wb3J0IFJlYWN0LCB7IEZyYWdtZW50LCBQcm9wc1dpdGhDaGlsZHJlbiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQ2FyZENvbnRhaW5lciB9IGZyb20gXCIuL0NvbnRhaW5lclwiO1xuaW1wb3J0IHsgTGluayB9IGZyb20gXCIuL2F0b21zL0xpbmtcIjtcbmltcG9ydCB7IERpdmlkZXJIIH0gZnJvbSBcIi4vRGl2aWRlckhcIjtcbmltcG9ydCB7IFNpZ25JbiB9IGZyb20gXCIuL2FwaS9zaWduSW5cIjtcbnR5cGUgUHJvcHMgPSBQcm9wc1dpdGhDaGlsZHJlbjx7fT47XG5cbmNvbnN0IGJ1aWxkQmFjayA9IGluZGV4ID0+IG5ldyBBcnJheShpbmRleCArIDEpLmZpbGwoXCIuLlwiKS5qb2luKFwiL1wiKVxuY29uc3QgYnVpbGRQYXRoID0gKCkgPT4ge1xuICAgIGNvbnN0IGhyZWYgPSBnbG9iYWxUaGlzPy53aW5kb3c/LmxvY2F0aW9uLmhyZWZcbiAgICBjb25zdCB1cmw6IFVSTCB8IHVuZGVmaW5lZCA9IGhyZWYgPyBuZXcgVVJMKGhyZWYpIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHBhdGggPSB1cmw/LnBhdGhuYW1lPy5zcGxpdChcIi9cIikuZmlsdGVyKGUgPT4gZSkgPz8gW107XG4gICAgcGF0aC5yZXZlcnNlKCk7XG4gICAgcGF0aC5zcGxpY2UoMCwgMSk7XG4gICAgcGF0aC5yZXZlcnNlKCk7XG4gICAgcmV0dXJuIHBhdGg7XG59XG5leHBvcnQgY29uc3QgSGVhZGVyID0gKHByb3BzOiBQcm9wcykgPT4ge1xuICAgIGNvbnN0IHBhdGggPSBidWlsZFBhdGgoKTtcbiAgICByZXR1cm4gPEZyYWdtZW50PlxuICAgICAgICA8Q2FyZENvbnRhaW5lcj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImhlYWRlci1jb250ZW50XCJ9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlci1sb2dpblwiPlxuICAgICAgICAgICAgICAgICAgICA8U2lnbkluIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9yZGVyLXRvcCBoZWFkZXItdXJsLWNoaXBzXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIEhvbWVcbiAgICAgICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHtwYXRoLnJldmVyc2UoKS5tYXAoKGUsIGluZGV4KSA9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17ZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TGluayBocmVmPXtidWlsZEJhY2soaW5kZXgpfT57ZX08L0xpbms+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkucmV2ZXJzZSgpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvQ2FyZENvbnRhaW5lcj5cbiAgICA8L0ZyYWdtZW50PlxufSIsICJpbXBvcnQgUmVhY3QsIHsgQ1NTUHJvcGVydGllcywgUHJvcHNXaXRoQ2hpbGRyZW4sIFJlYWN0Tm9kZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQ29tbWVudCB9IGZyb20gXCIuL0NvbW1lbnRcIjtcbmltcG9ydCB7IEhlYWRlciB9IGZyb20gXCIuL0hlYWRlclwiO1xuXG50eXBlIFByb3BzID0gUHJvcHNXaXRoQ2hpbGRyZW48e1xuICAgIHRpdGxlPzogUmVhY3ROb2RlLFxuICAgIHRoZW1lPzoge1xuICAgICAgICBcIi0tcHJpbWFyeVwiPzogc3RyaW5nLFxuICAgICAgICBcIi0tYmFja2dyb3VuZC1jb2xvclwiPzogc3RyaW5nLFxuICAgICAgICBcIi0tYm9yZGVyLWNvbG9yXCI/OiBzdHJpbmcsXG4gICAgfVxufT47XG5jb25zdCB0aW1lID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuZXhwb3J0IGNvbnN0IFBhZ2UgPSAocHJvcHM6IFByb3BzKSA9PiB7XG4gICAgY29uc3QgdGhlbWUgPSBwcm9wcy50aGVtZSA/PyB7fTtcbiAgICByZXR1cm4gKFxuICAgICAgICA8aHRtbD5cbiAgICAgICAgICAgIDxoZWFkPlxuICAgICAgICAgICAgICAgIDxsaW5rIGhyZWY9e1wiaHR0cHM6Ly9hbnVkLnJvL3VpX2Jhc2Uvc3JjL21haW4uY3NzXCJ9IHR5cGU9XCJ0ZXh0L2Nzc1wiIHJlbD1cInN0eWxlc2hlZXRcIiAvPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1NYXRlcmlhbCtTeW1ib2xzK091dGxpbmVkOm9wc3osd2dodCxGSUxMLEdSQURANDgsMzAwLDAsLTI1XCIgLz5cbiAgICAgICAgICAgICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTFcIiAvPlxuXG4gICAgICAgICAgICAgICAgPGxpbmsgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UmFqZGhhbmkmZGlzcGxheT1zd2FwXCIgcmVsPVwic3R5bGVzaGVldFwiIC8+XG4gICAgICAgICAgICAgICAgPGxpbmsgaHJlZj1cImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UmFqZGhhbmk6d2dodEA1MDAmZGlzcGxheT1zd2FwXCIgcmVsPVwic3R5bGVzaGVldFwiIC8+XG5cbiAgICAgICAgICAgIDwvaGVhZD5cbiAgICAgICAgICAgIDxib2R5PlxuICAgICAgICAgICAgICAgIDxDb21tZW50Pnt0aW1lfTwvQ29tbWVudD5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhZ2VcIiBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICBcIi0tcHJpbWFyeVwiOiB0aGVtZVtcIi0tcHJpbWFyeVwiXSA/PyBcIiMwMDc0Y2NcIixcbiAgICAgICAgICAgICAgICAgICAgXCItLWJhY2tncm91bmQtY29sb3JcIjogdGhlbWVbXCItLWJhY2tncm91bmQtY29sb3JcIl0gPz8gXCJ3aGl0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBcIi0tYm9yZGVyLWNvbG9yXCI6IHRoZW1lWyctLWJvcmRlci1jb2xvciddID8/IFwiI2M0YzRjNFwiLFxuICAgICAgICAgICAgICAgIH0gYXMgQ1NTUHJvcGVydGllc30+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFnZS1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SGVhZGVyPntwcm9wcy50aXRsZX08L0hlYWRlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2JvZHk+XG4gICAgICAgIDwvaHRtbD5cblxuICAgIClcbn0iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJhbnVkMTIuZ2l0aHViLmlvX3VpX2Jhc2Uvc3JjL2NvbXBvbmVudHMvUGFnZVwiXG5pbXBvcnQgeyBMaW5rIH0gZnJvbSBcImFudWQxMi5naXRodWIuaW9fdWlfYmFzZS9zcmMvY29tcG9uZW50cy9hdG9tcy9MaW5rXCI7XG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgICA8UGFnZSB0aXRsZT1cImFudWQxMi5naXRodWIuaW9cIj5cbiAgICAgICAgPExpbmsgaHJlZj17XCJ1aV9iYXNlXCJ9PnVpX2Jhc2U8L0xpbms+XG4gICAgICAgIDxMaW5rIGhyZWY9e1wiYm94ZXNcIn0+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QUE7QUFBQTs7O0FDM0NBLE1BQUFDLGVBWU0sTUFDTztBQWJiO0FBQUE7QUFBQSxNQUFBQSxnQkFBbUU7QUFDbkU7QUFDQTtBQVVBLE1BQU0sUUFBTyxvQkFBSSxLQUFLLEdBQUUsWUFBWTtBQUM3QixNQUFNLE9BQU8sQ0FBQyxVQUFpQjtBQUNsQyxjQUFNLFFBQVEsTUFBTSxTQUFTLENBQUM7QUFDOUIsZUFDSSw4QkFBQUMsUUFBQSxjQUFDLGNBQ0csOEJBQUFBLFFBQUEsY0FBQyxjQUNHLDhCQUFBQSxRQUFBLGNBQUMsVUFBSyxNQUFNLHdDQUF3QyxNQUFLLFlBQVcsS0FBSSxjQUFhLEdBQ3JGLDhCQUFBQSxRQUFBLGNBQUMsVUFBSyxLQUFJLGNBQWEsTUFBSyx1R0FBc0csR0FDbEksOEJBQUFBLFFBQUEsY0FBQyxVQUFLLE1BQUssWUFBVyxTQUFRLHVDQUFzQyxHQUVwRSw4QkFBQUEsUUFBQSxjQUFDLFVBQUssTUFBSyxrRUFBaUUsS0FBSSxjQUFhLEdBQzdGLDhCQUFBQSxRQUFBLGNBQUMsVUFBSyxNQUFLLDJFQUEwRSxLQUFJLGNBQWEsQ0FFMUcsR0FDQSw4QkFBQUEsUUFBQSxjQUFDLGNBQ0csOEJBQUFBLFFBQUEsY0FBQyxlQUFTLElBQUssR0FDZiw4QkFBQUEsUUFBQSxjQUFDLFNBQUksV0FBVSxRQUFPLE9BQU87QUFBQSxVQUN6QixhQUFhLE1BQU0sV0FBVyxLQUFLO0FBQUEsVUFDbkMsc0JBQXNCLE1BQU0sb0JBQW9CLEtBQUs7QUFBQSxVQUNyRCxrQkFBa0IsTUFBTSxnQkFBZ0IsS0FBSztBQUFBLFFBQ2pELEtBQ0ksOEJBQUFBLFFBQUEsY0FBQyxTQUFJLFdBQVUsa0JBQ1gsOEJBQUFBLFFBQUEsY0FBQyxjQUFRLE1BQU0sS0FBTSxHQUNwQixNQUFNLFFBQ1gsQ0FDSixDQUNKLENBQ0o7QUFBQSxNQUdSO0FBQUE7QUFBQTs7O0FDMUNBO0FBQUE7QUFBQSxVQUFBQyxnQkFBa0I7QUFDbEI7QUFDQTtBQUNBLGFBQU8sVUFDSCw4QkFBQUMsUUFBQSxjQUFDLFFBQUssT0FBTSxzQkFDUiw4QkFBQUEsUUFBQSxjQUFDLFFBQUssTUFBTSxhQUFXLFNBQU8sR0FDOUIsOEJBQUFBLFFBQUEsY0FBQyxRQUFLLE1BQU0sV0FBUyxPQUFLLENBQzlCO0FBQUE7QUFBQTsiLAogICJuYW1lcyI6IFsiUmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImltcG9ydF9yZWFjdCIsICJSZWFjdCIsICJyZXNvbHZlIiwgImdhcGkiLCAiZ2FwaSIsICJpbXBvcnRfcmVhY3QiLCAiUmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImltcG9ydF9yZWFjdCIsICJSZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiUmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIlJlYWN0Il0KfQo=

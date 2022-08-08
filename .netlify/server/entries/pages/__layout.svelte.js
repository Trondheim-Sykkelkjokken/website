var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => _layout
});
module.exports = __toCommonJS(stdin_exports);
var import_index_bfd96281 = require("../../_app/immutable/chunks/index-bfd96281.js");
var import_AiOutlineMenu = __toESM(require("svelte-icons-pack/ai/AiOutlineMenu.js"));
var import_AiOutlineGithub = __toESM(require("svelte-icons-pack/ai/AiOutlineGithub.js"));
var import_AiOutlineInstagram = __toESM(require("svelte-icons-pack/ai/AiOutlineInstagram.js"));
var import_AiOutlineFacebook = __toESM(require("svelte-icons-pack/ai/AiOutlineFacebook.js"));
var import_AiOutlineMail = __toESM(require("svelte-icons-pack/ai/AiOutlineMail.js"));
const Icon = (0, import_index_bfd96281.c)(($$result, $$props, $$bindings, slots) => {
  let { src } = $$props;
  let { size = "1em" } = $$props;
  let { color = void 0 } = $$props;
  let { title = void 0 } = $$props;
  let { className = "" } = $$props;
  let innerHtml;
  let attr;
  if ($$props.src === void 0 && $$bindings.src && src !== void 0)
    $$bindings.src(src);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  {
    {
      attr = {};
      if (color) {
        if (src.a.stroke !== "none") {
          attr.stroke = color;
        }
        if (src.a.fill !== "none") {
          attr.fill = color;
        }
      }
    }
  }
  {
    {
      innerHtml = (title ? `<title>${title}</title>` : "") + src.c;
    }
  }
  return `<svg${(0, import_index_bfd96281.a)(
    [
      { width: (0, import_index_bfd96281.e)(size) },
      { height: (0, import_index_bfd96281.e)(size) },
      { "stroke-width": "0" },
      { class: (0, import_index_bfd96281.e)(className) },
      (0, import_index_bfd96281.b)(src.a),
      (0, import_index_bfd96281.b)(attr),
      { xmlns: "http://www.w3.org/2000/svg" }
    ],
    {}
  )}><!-- HTML_TAG_START -->${innerHtml}<!-- HTML_TAG_END --></svg>`;
});
const getStores = () => {
  const stores = (0, import_index_bfd96281.g)("__svelte__");
  return {
    page: {
      subscribe: stores.page.subscribe
    },
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    get preloading() {
      console.error("stores.preloading is deprecated; use stores.navigating instead");
      return {
        subscribe: stores.navigating.subscribe
      };
    },
    session: stores.session,
    updated: stores.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
const NavLink_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: "a.svelte-1ttzct1,a.svelte-1ttzct1:visited,a.svelte-1ttzct1:active{color:#676a3e;text-decoration:none;text-transform:uppercase;flex-grow:1;font-size:1.2rem;align-self:baseline}a.active.svelte-1ttzct1{font-weight:bolder}.hidden.svelte-1ttzct1{display:none}@media(max-width: 720px){.hidden.svelte-1ttzct1{display:inline}}a.svelte-1ttzct1::after{display:block;content:attr(title);font-weight:bolder;height:1px;color:transparent;overflow:hidden;visibility:hidden}",
  map: null
};
const NavLink = (0, import_index_bfd96281.c)(($$result, $$props, $$bindings, slots) => {
  let isActive;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = (0, import_index_bfd96281.d)(page, (value) => $page = value);
  let { onClick } = $$props;
  let { href } = $$props;
  let { title } = $$props;
  if ($$props.onClick === void 0 && $$bindings.onClick && onClick !== void 0)
    $$bindings.onClick(onClick);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  $$result.css.add(css$3);
  isActive = () => {
    if ($page.path === "/" && $$props.href === "/") {
      return true;
    }
    return $page.path.startsWith($$props.href) && $$props.href.length > 1;
  };
  $$unsubscribe_page();
  return `<a${(0, import_index_bfd96281.f)("href", href, 0)}${(0, import_index_bfd96281.f)("title", title, 0)} class="${[
    "svelte-1ttzct1",
    (isActive() ? "active" : "") + " " + ($$props.href === "/" ? "hidden" : "")
  ].join(" ").trim()}">${slots.default ? slots.default({}) : ``}
</a>`;
});
const Header_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".heading-banner.svelte-4im3s1{background-color:white;width:100%;display:flex;flex-direction:row}.heading.svelte-4im3s1{height:5rem;max-height:4rem;width:auto;height:auto;margin:0 auto}.heading-link.svelte-4im3s1{display:inline-block;max-width:80%;max-height:4rem;margin:0 auto}#nav-wrapper.svelte-4im3s1{background-color:#efeb92}nav.svelte-4im3s1{padding:0.5rem 0 0.5rem 15rem;min-height:3rem;margin:auto;max-width:800px;display:flex;flex-direction:row;flex-wrap:wrap;align-content:center}button.svelte-4im3s1{font-size:1.5rem;margin-bottom:-1rem;border:0;background-color:transparent;display:none;cursor:pointer}@media(max-width: 720px){#nav-wrapper.svelte-4im3s1{position:absolute;width:100%}nav.svelte-4im3s1{flex-direction:column;padding-left:0;align-content:baseline;padding-left:1rem}button.svelte-4im3s1{display:inline-block}nav.hidden.svelte-4im3s1{display:none}.cog-wrapper.svelte-4im3s1{display:none}}.cog-wrapper.svelte-4im3s1{height:0;max-width:1000px;margin:auto}.cog.svelte-4im3s1{width:12rem}.info.svelte-4im3s1{background-color:#fcf6d2;padding:0.5rem}.infotext.svelte-4im3s1{text-align:center;margin:0 auto}",
  map: null
};
const Header = (0, import_index_bfd96281.c)(($$result, $$props, $$bindings, slots) => {
  let navOpen = false;
  let closeNav = () => navOpen = false;
  $$result.css.add(css$2);
  return `<header><div class="${"cog-wrapper svelte-4im3s1"}"><a href="${"/"}"><img class="${"cog svelte-4im3s1"}" alt="${""}" src="${"/logo.svg"}"></a></div>
	<div class="${"heading-banner svelte-4im3s1"}"><a href="${"/"}" class="${"heading-link svelte-4im3s1"}"><img class="${"heading svelte-4im3s1"}" src="${"/title.png"}" alt="${""}"></a>
		<button class="${"svelte-4im3s1"}">${(0, import_index_bfd96281.v)(Icon, "Icon").$$render($$result, { color: "black", src: import_AiOutlineMenu.default }, {}, {})}</button></div>
	<div id="${"nav-wrapper"}" class="${"svelte-4im3s1"}"><nav class="${["svelte-4im3s1", !navOpen ? "hidden" : ""].join(" ").trim()}">${(0, import_index_bfd96281.v)(NavLink, "NavLink").$$render(
    $$result,
    {
      title: "Home",
      onClick: closeNav,
      href: "/"
    },
    {},
    {
      default: () => {
        return `Home`;
      }
    }
  )}
			${(0, import_index_bfd96281.v)(NavLink, "NavLink").$$render(
    $$result,
    {
      title: "Events",
      onClick: closeNav,
      href: "/events"
    },
    {},
    {
      default: () => {
        return `Events`;
      }
    }
  )}
			${(0, import_index_bfd96281.v)(NavLink, "NavLink").$$render(
    $$result,
    {
      title: "Membership",
      onClick: closeNav,
      href: "/membership"
    },
    {},
    {
      default: () => {
        return `Membership`;
      }
    }
  )}
			${(0, import_index_bfd96281.v)(NavLink, "NavLink").$$render(
    $$result,
    {
      title: "Blog",
      onClick: closeNav,
      href: "/blog"
    },
    {},
    {
      default: () => {
        return `Blog`;
      }
    }
  )}
			${(0, import_index_bfd96281.v)(NavLink, "NavLink").$$render(
    $$result,
    {
      title: "Get involved",
      onClick: closeNav,
      href: "/getinvolved"
    },
    {},
    {
      default: () => {
        return `Get involved`;
      }
    }
  )}
			${(0, import_index_bfd96281.v)(NavLink, "NavLink").$$render(
    $$result,
    {
      title: "About",
      onClick: closeNav,
      href: "/about"
    },
    {},
    {
      default: () => {
        return `About`;
      }
    }
  )}
			${(0, import_index_bfd96281.v)(NavLink, "NavLink").$$render(
    $$result,
    {
      title: "Resources",
      onClick: closeNav,
      href: "/resources"
    },
    {},
    {
      default: () => {
        return `Resources`;
      }
    }
  )}</nav></div>
	<div class="${"info svelte-4im3s1"}"><p class="${"infotext svelte-4im3s1"}">We&#39;re open every <br><time>Wednesday 17:00 - 20:00!</time></p></div>
</header>`;
});
const Footer_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "a.svelte-1v681qy{color:whitesmoke;text-decoration:none}footer.svelte-1v681qy{padding-top:1rem;background-color:#efeb92;min-height:6rem}#footer-banner.svelte-1v681qy{background-color:#efa170;width:calc(100% - 2rem);padding:1rem 1rem}.flex-container.svelte-1v681qy{max-width:1000px;margin:0 auto;display:flex;flex-direction:row;justify-content:space-between}.footer-item.svelte-1v681qy{color:whitesmoke;align-self:center;flex-shrink:1;width:33.3%}.footer-item.svelte-1v681qy:nth-child(2){text-align:center}.footer-item.svelte-1v681qy:last-child{flex-shrink:2;text-align:right}.icons.svelte-1v681qy{display:inline-block}@media(max-width: 720px){footer.svelte-1v681qy{font-size:0.9rem}.icons.svelte-1v681qy{display:block}}",
  map: null
};
const iconProps = { size: "35px", color: "whitesmoke" };
const Footer = (0, import_index_bfd96281.c)(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<footer class="${"svelte-1v681qy"}"><div id="${"footer-banner"}" class="${"svelte-1v681qy"}"><div class="${"flex-container svelte-1v681qy"}"><div class="${"footer-item svelte-1v681qy"}"><a href="${"https://g.page/stammencafe?share"}" class="${"svelte-1v681qy"}">Stammen Caf\xE9 og Bar, <br> Kongens gate 55, <br> Trondheim, Norway</a></div>
			<div class="${"footer-item svelte-1v681qy"}">SLOGAN?</div>
			<div class="${"footer-item svelte-1v681qy"}"><div class="${"icons svelte-1v681qy"}"><a href="${"mailto:trondheimsykkelkjokken@gmail.com"}" class="${"svelte-1v681qy"}">${(0, import_index_bfd96281.v)(Icon, "Icon").$$render($$result, Object.assign(iconProps, { src: import_AiOutlineMail.default }), {}, {})}</a>
					<a href="${"https://www.facebook.com/trondheimsykkelkjokken"}" class="${"svelte-1v681qy"}">${(0, import_index_bfd96281.v)(Icon, "Icon").$$render($$result, Object.assign(iconProps, { src: import_AiOutlineFacebook.default }), {}, {})}</a></div>
				<div class="${"icons svelte-1v681qy"}"><a href="${"https://www.instagram.com/trondheimsykkelkjokken/"}" class="${"svelte-1v681qy"}">${(0, import_index_bfd96281.v)(Icon, "Icon").$$render($$result, Object.assign(iconProps, { src: import_AiOutlineInstagram.default }), {}, {})}</a>
					<a href="${"https://github.com/Trondheim-Sykkelkjokken"}" class="${"svelte-1v681qy"}">${(0, import_index_bfd96281.v)(Icon, "Icon").$$render($$result, Object.assign(iconProps, { src: import_AiOutlineGithub.default }), {}, {})}</a></div></div></div></div>
</footer>`;
});
const __layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "html, body{padding:0;font-size:105%;height:100%;margin:0;font-family:sans-serif}img{max-width:100%}#svelte{min-height:100%;display:flex;flex-direction:column;background-color:#a6d2d5}main.svelte-14zsrik{padding:1rem 1rem;max-width:800px;margin:0 auto;color:whitesmoke;flex-grow:1;width:calc(100% - 2rem)}",
  map: null
};
const _layout = (0, import_index_bfd96281.c)(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${(0, import_index_bfd96281.v)(Header, "Header").$$render($$result, {}, {}, {})}

<main class="${"svelte-14zsrik"}">${slots.default ? slots.default({}) : ``}</main>

${(0, import_index_bfd96281.v)(Footer, "Footer").$$render($$result, {}, {}, {})}`;
});

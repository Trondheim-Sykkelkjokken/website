var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => About
});
module.exports = __toCommonJS(stdin_exports);
var import_index_bfd96281 = require("../../_app/immutable/chunks/index-bfd96281.js");
const about_svelte_svelte_type_style_lang = "";
const css = {
  code: "h2.svelte-1912692{margin-top:2rem}ul.svelte-1912692{list-style-type:none;padding-left:0}li.svelte-1912692{margin:1rem 0}",
  map: null
};
const About = (0, import_index_bfd96281.c)(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<h1>About</h1>
<p>Trondheim Sykkelkj\xF8kken er et ideelt driftet sykkelverksted, hvor medlemmer f\xE5r tilgang p\xE5 verkt\xF8y
	og veiledning for \xE5 reparere sine egne sykler.
</p>

<h2 class="${"svelte-1912692"}">Contact us:</h2>
<ul class="${"svelte-1912692"}"><li class="${"svelte-1912692"}">You can find us on <a href="${"https://www.facebook.com/trondheimsykkelkjokken"}">Facebook.</a></li>
	<li class="${"svelte-1912692"}">We are on <a href="${"https://www.instagram.com/trondheimsykkelkjokken/"}">Instagram.</a></li>
	<li class="${"svelte-1912692"}">Or send us an email at <b>trondheimsykkelkjokken@gmail.com</b></li>
</ul>`;
});

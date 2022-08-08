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
  default: () => Blog,
  load: () => load
});
module.exports = __toCommonJS(stdin_exports);
var import_BlogPost_d4bf8699 = require("../../../_app/immutable/chunks/BlogPost-d4bf8699.js");
var import_index_bfd96281 = require("../../../_app/immutable/chunks/index-bfd96281.js");
const index_svelte_svelte_type_style_lang = "";
const css = {
  code: "ul.svelte-1ckut80{list-style:none;padding:0}li.svelte-1ckut80{padding-bottom:1rem;border-bottom:whitesmoke 1px dashed}li.svelte-1ckut80:last-child{border-style:none}a.svelte-1ckut80,a.svelte-1ckut80:visited,a.svelte-1ckut80:hover,a.svelte-1ckut80:active{color:inherit;text-decoration:none}",
  map: null
};
const allPosts = Object.assign({ "../../content/posts/foo.md": import_BlogPost_d4bf8699._, "../../content/posts/test.md": import_BlogPost_d4bf8699.a });
let posts = [];
for (let path in allPosts) {
  const post = allPosts[path];
  const slug = post.metadata.slug;
  const date = post.metadata.publication_date;
  const title = post.metadata.title;
  const p = { post, slug, date, title };
  posts.push(p);
}
posts = posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
async function load() {
  return { props: { posts } };
}
const Blog = (0, import_index_bfd96281.c)(($$result, $$props, $$bindings, slots) => {
  let { posts: posts2 } = $$props;
  if ($$props.posts === void 0 && $$bindings.posts && posts2 !== void 0)
    $$bindings.posts(posts2);
  $$result.css.add(css);
  return `<ul class="${"svelte-1ckut80"}">${(0, import_index_bfd96281.i)(posts2, (post) => {
    return `<li class="${"svelte-1ckut80"}"><a href="${"/blog/" + (0, import_index_bfd96281.h)(post.slug, true)}" class="${"svelte-1ckut80"}">${(0, import_index_bfd96281.v)(import_BlogPost_d4bf8699.B, "BlogPost").$$render($$result, { post }, {}, {})}</a>
		</li>`;
  })}
</ul>`;
});

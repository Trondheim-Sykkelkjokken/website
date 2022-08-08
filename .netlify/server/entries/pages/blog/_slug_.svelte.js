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
  default: () => U5Bslugu5D,
  load: () => load
});
module.exports = __toCommonJS(stdin_exports);
var import_BlogPost_d4bf8699 = require("../../../_app/immutable/chunks/BlogPost-d4bf8699.js");
var import_index_bfd96281 = require("../../../_app/immutable/chunks/index-bfd96281.js");
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
function load({ page }) {
  const { slug } = page.params;
  const filteredPost = posts.find((p) => {
    return p.slug.toLowerCase() === slug.toLowerCase();
  });
  return {
    props: {
      post: filteredPost
    }
  };
}
const U5Bslugu5D = (0, import_index_bfd96281.c)(($$result, $$props, $$bindings, slots) => {
  let { post } = $$props;
  if ($$props.post === void 0 && $$bindings.post && post !== void 0)
    $$bindings.post(post);
  return `${(0, import_index_bfd96281.v)(import_BlogPost_d4bf8699.B, "BlogPost").$$render($$result, { post }, {}, {})}`;
});

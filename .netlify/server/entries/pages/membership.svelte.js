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
  default: () => Membership
});
module.exports = __toCommonJS(stdin_exports);
var import_index_bfd96281 = require("../../_app/immutable/chunks/index-bfd96281.js");
const Membership = (0, import_index_bfd96281.c)(($$result, $$props, $$bindings, slots) => {
  return `<h1>Membership</h1>

<h2>Become a member:</h2>
<a href="${"https://docs.google.com/forms/d/e/1FAIpQLSfMpyJCKUkfD2hfunoOwGSJUcvM29RowHGlPGynwzdE3DaUMw/viewform"}">Fill out our membership form</a>`;
});

const { init } = require('../serverless.js');

exports.handler = init({
	appDir: "_app",
	assets: new Set(["admin/config.yml","admin/index.html","favicon.png","logo.svg","title.png","uploads/2011-04-22-16.43.24.jpg","uploads/23124852165_151e7d95da_c.jpg","uploads/valenbike.jpg"]),
	mimeTypes: {".yml":"text/yaml",".html":"text/html",".png":"image/png",".svg":"image/svg+xml",".jpg":"image/jpeg"},
	_: {
		entry: {"file":"_app/immutable/start-0726c2fe.js","imports":["_app/immutable/start-0726c2fe.js","_app/immutable/chunks/index-7c5f8e96.js"],"stylesheets":[]},
		nodes: [
			() => Promise.resolve().then(() => require('../server/nodes/0.js')),
			() => Promise.resolve().then(() => require('../server/nodes/1.js')),
			() => Promise.resolve().then(() => require('../server/nodes/7.js')),
			() => Promise.resolve().then(() => require('../server/nodes/2.js')),
			() => Promise.resolve().then(() => require('../server/nodes/4.js')),
			() => Promise.resolve().then(() => require('../server/nodes/5.js')),
			() => Promise.resolve().then(() => require('../server/nodes/6.js')),
			() => Promise.resolve().then(() => require('../server/nodes/8.js')),
			() => Promise.resolve().then(() => require('../server/nodes/9.js')),
			() => Promise.resolve().then(() => require('../server/nodes/3.js'))
		],
		routes: [
			{
				type: 'page',
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				path: "/",
				shadow: null,
				a: [0,2],
				b: [1]
			},
			{
				type: 'page',
				id: "about",
				pattern: /^\/about\/?$/,
				names: [],
				types: [],
				path: "/about",
				shadow: null,
				a: [0,3],
				b: [1]
			},
			{
				type: 'page',
				id: "blog",
				pattern: /^\/blog\/?$/,
				names: [],
				types: [],
				path: "/blog",
				shadow: null,
				a: [0,4],
				b: [1]
			},
			{
				type: 'page',
				id: "events",
				pattern: /^\/events\/?$/,
				names: [],
				types: [],
				path: "/events",
				shadow: null,
				a: [0,5],
				b: [1]
			},
			{
				type: 'page',
				id: "getinvolved",
				pattern: /^\/getinvolved\/?$/,
				names: [],
				types: [],
				path: "/getinvolved",
				shadow: null,
				a: [0,6],
				b: [1]
			},
			{
				type: 'page',
				id: "membership",
				pattern: /^\/membership\/?$/,
				names: [],
				types: [],
				path: "/membership",
				shadow: null,
				a: [0,7],
				b: [1]
			},
			{
				type: 'page',
				id: "resources",
				pattern: /^\/resources\/?$/,
				names: [],
				types: [],
				path: "/resources",
				shadow: null,
				a: [0,8],
				b: [1]
			},
			{
				type: 'page',
				id: "blog/[slug]",
				pattern: /^\/blog\/([^/]+?)\/?$/,
				names: ["slug"],
				types: [null],
				path: null,
				shadow: null,
				a: [0,9],
				b: [1]
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
});

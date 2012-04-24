/*routr.js - @jontyy - MIT licensed - https://github.com/Jontyy/routr.js*/

(function(exports) {
	"use strict";
	var routes = {},

		/**
		 * Makes regex out of a path
		 * e.g. user/:user/messages(/:filter) -> user/(\w+)/messages\/?(\w+)?
		 * @param  {[string]} route [the route]
		 * @return {[RegExp]}       [the regular expression]
		 */
		makeRegex = function(route) {
			var pattern = route;
			//turn (/:arg) into \/?:arg?
			pattern = pattern.replace(/\(\/(:\w+)\)/g, '\\/?$1?');
			//turn :int into (\d+)
			pattern = pattern.split(':int').join('(\\d+)');
			//turn :az into ([a-zA-Z]+)
			pattern = pattern.split(':az').join('([a-zA-Z]+)');
			//turn :arg into (\w+)
			pattern = pattern.replace(/:\w+/g, '(\\w+)');
			return new RegExp(pattern);
		},
		addRoute = function(route, callback) {
			if(typeof route === 'function'){
				callback = route;
				route = 'default';
			}
			routes[route] = callback;
		},
		run = function(route) {
			var i, args;
			for (i in routes) {
				if (routes.hasOwnProperty(i)) {
					args = route.match(makeRegex(i));
					if (args) {
						routes[i].apply({}, args.slice(1));
						routes = {};
						return;
					}
				}
			}
			routes['default'] && routes['default']();
			routes = {};
		};

	exports.route = function(route, callback) {
		//allow either just func or string and func arguments for adding a route
		if ((typeof route === 'function') || typeof route === 'string' && typeof callback === 'function') {
			return addRoute(route, callback);
		}
		//if just a string argument then run tests
		if (typeof route === 'string' && typeof callback === 'undefined') {
			run(route);
		}
	};
}(window));

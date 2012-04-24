(function(exports){
	"use strict";
	var routes = {},

	addRoute = function(route,callback){
		routes[route] = callback;
	},
	run = function(route){
		var i,reg, args;
		for(i in routes){if(routes.hasOwnProperty(i)){
			reg = i.replace(/:\w+/g,'(\\w+)');
			reg = new RegExp(reg);
			args = route.match(reg);
			if(args){
				routes[i].apply({}, args.slice(1));
				break;
			}
		}}
		routes = {};
	};

	exports.route = function(route,callback){
		//allow either just func or string and func arguments for adding a route
		if( (typeof route === 'function') || typeof route === 'string' && typeof callback === 'function'){
			return addRoute(route,callback);
		}
		//if just a string argument then run tests
		if(typeof route === 'string' && typeof callback === 'undefined'){
			run(route);
		}
	};
}(window));
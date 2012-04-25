module.exports = function(grunt) {

	grunt.initConfig({
		meta: {
			banner: '/*route.js - MIT licensed - https://github.com/Jontyy/route.js*/'
		},
		lint: {
			files: ['src/*.js']
		},
		concat: {
			'route.js': ['<banner>', 'src/*.js'],
		},
		min: {
			'route.min.js': ['<banner>', 'route.js']
		},
		qunit: {
			all: ['test/*.html']
		},
		watch: {
			files: ['src/*.js', 'test/*.js'],
			tasks: 'lint concat min qunit'
		},
		uglify: {},
		jshint: {
			options: {
				expr: true,
				browser: true,
				strict: true,
				undef: true,
				curly: true,
				eqeqeq: true,
				forin: true,
				immed: true,
				latedef: true,
				noarg: true,
				noempty: true,
				regexp: true,
				trailing: true,
				node: true,
				devel: true,
				smarttabs: true
			}
		}
	});
	grunt.registerTask('default', 'lint concat min qunit');
};
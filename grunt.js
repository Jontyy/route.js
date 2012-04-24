config.init({
	meta: {
		banner: '/*routr.js - @jontyy - MIT licensed - https://github.com/Jontyy/routr.js*/'
	},
	lint: {
		files: ['src/*.js']
	},
	concat: {
		'routr.js': ['<banner>','src/*.js'],
	},
	min: {
		'routr.min.js': ['<banner>', 'routr.js']
	},
	qunit : {
		all : ['test/*.html']
	},
	watch: {
		files: ['src/*.js','test/*.js'],
		tasks: 'lint concat min qunit' 
	},
	uglify: {},
	jshint: {
		options: {
			expr: true,
			browser: true,
			strict: true,
			undef : true,
			curly : true,
			eqeqeq : true,
			forin : true,
			immed : true,
			latedef : true,
			noarg : true,
			noempty:true,
			regexp:true,
			trailing : true,
			node : true,
			devel:true,
			smarttabs : true
		}
	}
});
task.registerTask('default', 'lint concat min qunit');
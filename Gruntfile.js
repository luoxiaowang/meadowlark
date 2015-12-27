module.exports = function(grunt){

	// load plugins
	[
		'grunt-cafe-mocha',
		'grunt-contrib-jshint',
		'grunt-exec',
	].forEach(function(task){
		grunt.loadNpmTasks(task);
	});

	// configure plugins
	grunt.initConfig({
        //逻辑测试
		cafemocha: {
			all: { src: 'qa/tests-*.js', options: { ui: 'tdd' } }
		},
        //去毛
		jshint: {
			app: ['meadowlark.js', 'public/js/**/*.js', 'lib/**/*.js'],
			qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js']
		},
        //链接检查(需要先安装linkchecker)
		exec: {
			linkchecker: { cmd: 'linkchecker http://localhost:3000' }
		}
	});	

	// register tasks
	grunt.registerTask('default', ['cafemocha','jshint'/*,'exec'*/]);
};

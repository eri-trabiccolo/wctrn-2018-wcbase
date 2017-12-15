module.exports = function (grunt) {

	// Load Grunt
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Sass + Susy
		sass: {
		  dist: {
		    options: {
					require: 'susy',
					style: 'compressed'
		    },
		    files: [{
		      'css/style.css' : 'scss/style.scss'
		  }]
		  }
		},

		// PostCSS
		postcss: {
		  options: {
				map: {
          inline: false, // save all sourcemaps as separate files...
          annotation: 'css' // ...to the specified directory
        },
		    processors: [
					// add vendor prefixes
		  		require('autoprefixer')({
		        browsers: ['last 2 versions']
		      })
				]
		  },
		  dist: {
		    src: 'css/style.css'
		  }
		},

		// CSS Minify
		cssmin: {
		  target: {
		    files: [{
		      'css/style.min.css' : 'css/style.css'
				}]
		  }
		},

		// Compile everything into one task with Watch Plugin
		watch: {
      css: {
        files: ['scss/*.scss', 'scss/*/*.scss', 'scss/*/*/*.scss'],
        tasks: ['sass', 'postcss']
      },
    }

	});

	// Load Grunt plugins
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-postcss');
	//grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Register Grunt tasks
	grunt.registerTask('default', ['watch']);
};
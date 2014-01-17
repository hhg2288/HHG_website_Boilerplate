module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    //global variables
    appFolder: 'source',
		buildFolder: 'build',
		port: 4567,

    // Tasks setup.
    clean: {
      prod: ['<%= buildFolder %>']
    },

    connect: {
      dev: {
        options: {
          port: '<%= port %>',
          base: '<%= appFolder %>/',
          hostname: 'localhost'
        }
      }
    },

    uglify: {
			prod: {
				files: {
				}
			}
		},

		haml: {
      prod: {
        files: {
          'main.html': 'main.haml',
          'widgets.html': 'widgets.haml'
        }
      },
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          'main.html': 'main.haml',
          'widgets.html': [
            'button.haml',
            'tab.haml',
            'debug.haml'  // Maybe you need one extra file in dev
          ]
        }
      }
    },

    ftpush: {
      build: {
        auth: {
          host: '',
          port: ,
          authKey: 'key1'
        },
        src: 'path/to/source/folder',
        dest: '/path/to/destination/folder',
        exclusions: [
          'path/to/source/folder/**/.DS_Store',
          'path/to/source/folder/**/Thumbs.db',
          'dist/tmp'
        ],
        keep: ['/important/images/at/server/*.jpg']
      }
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-haml');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-ftpush');

  // Default task.
  grunt.registerTask('default', []);
  grunt.registerTask('server', []);
  grunt.registerTask('build', []);
  grunt.registerTask('deploy', []);

};

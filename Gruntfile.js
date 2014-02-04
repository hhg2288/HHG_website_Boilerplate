module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    //global variables
    srcFolder: 'source',
    devFolder: 'dev',
		buildFolder: 'build',
		port: 4567,

    // Tasks setup.
    clean: {
      dev: ['<%= devFolder %>'],
      prod: ['<%= buildFolder %>']
    },

    concurrent: {
      dev: ['haml:dev', 'sass:dev'],
      prod: ['haml:prod', 'sass:prod']
    },

    connect: {
      dev: {
        options: {
          port: '<%= port %>',
          base: '<%= devFolder %>/',
          hostname: 'localhost'
        }
      }
    },

    copy: {
      dev: {
        files: [
          // includes files within path
          {expand: true, flatten: true, src: ['<%= srcFolder %>/assets/**'], dest: '<%= devFolder %>/assets/', filter: 'isFile'}
        ]
      },
      prod: {
        files: [
          // includes files within path
          {expand: true, flatten: true, src: ['<%= srcFolder %>/assets/**'], dest: '<%= buildFolder %>/assets/', filter: 'isFile'}
        ]
      }
    },

    open: {
      server: {
        path: 'http://localhost:<%= connect.dev.options.port %>'
      }
    },

    uglify: {
			prod: {
				files: {
				}
			}
		},

		haml: {
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          '<%= devFolder %>/index.html': '<%= srcFolder %>/index.haml'
        }
      },
      prod: {
        files: {
          '<%= buildFolder %>/index.html': '<%= srcFolder %>/index.haml'
        }
      }
    },

    sass: {
      dev: {
        options: {
          style: 'expanded',
          lineNumbers: true
        },
        files: {
          '<%= devFolder %>/css/main.css': '<%= srcFolder %>/css/main.scss'
        }
      },

      prod: {
        options: {
          style: 'compressed',
          lineNumbers: false
        },
        files: {
          '<%= buildFolder %>/css/main.min.css': '<%= srcFolder %>/css/main.scss'
        }
      }
    },

    watch: {
      html: {
        files: '**/*.haml',
        tasks: ['haml:dev'],
        options: {
          livereload: true,
        }
      },
      css: {
        files: '**/*.scss',
        tasks: ['sass:dev'],
        options: {
          livereload: true,
        }
      },
      assets: {
        files: ['**/*.jpg', '**/*.png'],
        tasks: ['copy:dev'],
        options: {
          livereload: true,
        }
      }
    },

    ftpush: {
      build: {
        auth: {
          host: '',
          port: '21',
          authKey: 'key1'
        },
        src: '<%= devFolder %>',
        dest: '',
        exclusions: [
          '<%= devFolder %>/components/',
          '<%= buildFolder %>/**/.DS_Store',
          '<%= buildFolder %>/**/Thumbs.db'
        ]
      }
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-haml');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-ftpush');

  // Default task.
  grunt.registerTask('default', []);
  grunt.registerTask('server', ['clean:dev', 'concurrent:dev', 'connect:dev', 'open', 'watch']);
  grunt.registerTask('build', ['clean:prod', 'concurrent:prod']);
  grunt.registerTask('deploy', ['ftpush']);

};

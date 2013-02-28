module.exports = function(grunt) {

    grunt.initConfig({
        dirs: {
            base: 'static/',
            js: 'static/js/',
            app: 'static/js/App/',
            css: 'static/css/',
            scss: 'static/scss/',
            jade: 'static/jade/',
            dist: 'static/dist/'
        },
        concat: {
            js: {
                src: [
                    '<%= dirs.js %>mixin.js',
                    '<%= dirs.app %>App.js',
                    '<%= dirs.app %>App.Tmpl.js'
                ],
                dest: '<%= dirs.dist %>app.concat.js'
            },
            css: {
                src: [
                    '<%= dirs.css %>base/reset.css',
                    '<%= dirs.css %>base/common.css',
                    '<%= dirs.css %>base/typography.css',
                    '<%= dirs.css %>layout/main.css'
                ],
                dest: '<%= dirs.dist %>app.concat.css'
            }
        },
        jade: {
            compile: {
                options: {
                    pretty: true
                },
                files: {
                    'index.html' : '<%= dirs.jade %>index.jade',
                    'tests.html' : '<%= dirs.jade %>tests.jade'
                }
            }
        },
        uglify: {
            files: {
                src: '<%= concat.js.dest %>',
                dest: '<%= dirs.dist %>app.min.js'
            }
        },
        cssmin: {
            files: {
                src: '<%= concat.css.dest %>',
                dest: '<%= dirs.dist %>app.min.css'
            }
        },
        compass: {
            dist: {
                options: {
                    config: '<%= dirs.base %>config.rb',
                    basePath: '<%= dirs.base %>'

                }
            }
        },
        undertmpl: {
            files: {
                src: '<%= dirs.base %>templates/*.html',
                dest: '<%= dirs.app %>App.Tmpl.js'
            }
        },
        watch: {
            scripts: {
                files: '<%= concat.js.src %>',
                tasks: 'js'
            },
            styles: {
                files: '<%= concat.css.src %>',
                tasks: 'css'
            },
            sass: {
                files: '<%= dirs.scss %>**/*.scss',
                tasks: 'sass'
            },
            jade: {
                files: '<%= dirs.jade %>/*.jade',
                tasks: 'jade'
            },
            templates: {
                files: '<%= dirs.base %>templates/*.html',
                tasks: 'tmpl'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-undertmpl');
    grunt.loadNpmTasks('grunt-welcome');

    grunt.registerTask('dev', ['js', 'css', 'jade']);
    grunt.registerTask('js', ['concat:js', 'uglify']);
    grunt.registerTask('css', ['concat:css', 'cssmin']);
    grunt.registerTask('sass', ['compass', 'css']);
    grunt.registerTask('tmpl', ['undertmpl', 'js']);

};

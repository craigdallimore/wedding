/*global module:false*/
module.exports = function(grunt) {

    var WEB_APP_STATIC = 'static/';

    // Project configuration.
    grunt.initConfig({

        watch: {
            scripts: {
                files: '<config:concat.js.src>',
                tasks: 'js'
            },
            css: {
                files: '<config:concat.css.src>',
                tasks: 'css'
            },
            scss: {
                files: WEB_APP_STATIC + 'scss/**/*.scss',
                tasks: 'scss'
            },
            templates: {
                files: '<config:undertmpl.tmpl.src>',
                tasks: 'tmpl'
            },
            haml: {
                files: '<config:hamltron.files>',
                tasks: 'hamltron'
            }
        },

        hamltron: {
            files: [
                WEB_APP_STATIC + 'haml/index.haml',
                WEB_APP_STATIC + 'haml/tests.haml'
            ]
        },

        undertmpl: {
            tmpl: {
                src: [ WEB_APP_STATIC + 'templates/*.html' ],
                dest: WEB_APP_STATIC + 'js/App/App.Tmpl.js'
            }
        },

        concat: {
            js: {
                src: [
                    WEB_APP_STATIC + 'js/mixin.js',
                    WEB_APP_STATIC + 'js/App/App.js',
                    WEB_APP_STATIC + 'js/App/App.Tmpl.js'
                ],
                dest: WEB_APP_STATIC + 'dist/app.concat.js'
            },
            css: {
                src: [
                    WEB_APP_STATIC + 'css/base/reset.css',
                    WEB_APP_STATIC + 'css/base/common.css',
                    WEB_APP_STATIC + 'css/base/typography.css'
                ],
                dest: WEB_APP_STATIC + 'dist/app.concat.css'
            }
        },

        min: {
            dist: {
                src: ['<config:concat.js.dest>'],
                dest: WEB_APP_STATIC + 'dist/app.min.js'
            }
        },

        mincss: {
            'static/dist/app.min.css': '<config:concat.css.dest>'
        },

        mocha: {
            tests: {
                src: ['./tests.html'],
                options: {
                    run: true
                }
            }
        },

        welcome: {
            'msg':
'                _/                                           \n' +
'               _/                                            \n' +
'          _/_/_/    _/_/      _/_/_/    _/_/    _/    _/     \n' +
'       _/    _/  _/_/_/_/  _/        _/    _/  _/    _/      \n' +
'      _/    _/  _/        _/        _/    _/  _/    _/       \n' +
'       _/_/_/    _/_/_/    _/_/_/    _/_/      _/_/_/        \n' +
'                                                  _/         \n' +
'                                               _/_/'
        }
    });


    grunt.loadNpmTasks('grunt-contrib');
    grunt.loadNpmTasks('grunt-welcome');
    grunt.loadNpmTasks('grunt-undertmpl');
    grunt.loadNpmTasks('grunt-hamltron');
    grunt.loadNpmTasks('grunt-mocha');

    grunt.registerTask('dev', 'undertmpl css  js hamltron mocha:tests');
    grunt.registerTask('css', 'concat:css mincss');
    grunt.registerTask('js', 'concat:js min');
    grunt.registerTask('tmpl', 'undertmpl js');

    var proc = require('child_process');

    grunt.registerTask("scss", "SCSS -> CSS", function() {
        proc.exec("compass compile ./static");
    });


};

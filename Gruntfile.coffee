#
# Grunt Configuration
#
# -----------------------------------------------------------------------------

module.exports = (grunt) ->

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-modernizr'


  grunt.initConfig
    dirs:
      app  : 'static/js/app'
      scss : 'static/scss/'
      dist : 'static/dist/'

    # Analyses the application code and finds references to modernizr feature
    # detection tests.
    # This will build a custom version of modernizr with just the tests that
    # are needed.
    # https://github.com/Modernizr/grunt-modernizr
    modernizr:
      dist:
        devFile    : 'remote'
        outputFile : '<%= dirs.dist %>modernizr.js'
        files      :
          src : ['<%= dirs.app %>**/*.js']

    sass:
      dist:
        files:
          '<%= dirs.dist %>app.css': '<%= dirs.scss %>main.scss'

    watch:
      sass:
        options:
          livereload: true
        files: '<%= dirs.scss %>**/*.scss'
        tasks: 'sass'

  grunt.registerTask 'default', ['sass', 'watch']
  grunt.registerTask 'deploy',  ['sass', 'modernizr']

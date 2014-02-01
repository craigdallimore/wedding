module.exports = (grunt) ->

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-mocha'

  grunt.initConfig
    dirs:
      base:     'static/'
      js:       'static/js/'
      app:      'static/js/App/'
      scss:     'static/scss/'
      jade:     'static/jade/'
      dist:     'static/dist/'
      jst:      'static/templates/'
      unittest: 'test/specrunner/'

    # Unit testing
    mocha:
      spec:
        src: ['<%= dirs.unittest %>runner.html']
        options:
          bail: true
          reporter: 'Spec'
          run: false

    sass:
      dist:
        options:
          sourcemap: true
        files:
          '<%= dirs.dist %>app.css': '<%= dirs.scss %>main.scss'

    watch:
      unittests:
        files: '<%= dirs.unittest %>coffee/*.coffee'
        tasks: 'mocha'
      sass:
        files: '<%= dirs.scss %>**/*.scss'
        tasks: 'sass'

  grunt.registerTask 'default', ['sass']

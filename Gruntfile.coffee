module.exports = (grunt) ->

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-compass'
  grunt.loadNpmTasks 'grunt-contrib-jade'
  grunt.loadNpmTasks 'grunt-contrib-jst'
  grunt.loadNpmTasks 'grunt-mocha'

  grunt.initConfig
    dirs:
      base:     'static/'
      js:       'static/js/'
      app:      'static/js/App/'
      css:      'static/css/'
      scss:     'static/scss/'
      jade:     'static/jade/'
      dist:     'static/dist/'
      jst:      'static/templates/'
      unittest: 'test/unit/'

    # Unit testing
    mocha:
      test1:
        src: ['<%= dirs.unittest %>test1.html']
        options:
          bail: true
          reporter: 'Spec'
          run: true

    coffee:
      glob_to_multiple:
        expand: true
        flatten: true
        cwd: '<%= dirs.unittest %>coffee/'
        src: ['*.coffee']
        dest: '<%= dirs.unittest %>js/'
        ext: '.js'

    # Styling
    compass:
      dist:
        options:
          config:  '<%= dirs.base %>config.rb'
          sassDir: '<%= dirs.scss %>'
          cssDir:  '<%= dirs.css %>'

    concat:
      css:
        src: [
          '<%= dirs.css %>base/common.css'
          '<%= dirs.css %>base/typography.css'
          '<%= dirs.css %>layout/main.css'
        ]
        dest: '<%= dirs.dist %>app.concat.css'

    cssmin:
      files:
        src:  '<%= concat.css.dest %>'
        dest: '<%= dirs.dist %>app.min.css'

    # Templates
    jst:
      compile:
        options:
          processName: (path) ->
            path.replace('<% dirs.jst %>', '').replace('.html', '')

          templateSettings:
            interpolate: /\{\{(.+?)\}\}/g

          namespace: 'App.Tmpl'
          prettify:  true
        files:
          '<%= dirs.app %>App.Tmpl.js': ['<%= dirs.jst %>*.html']

    jade:
      compile:
        options:
          pretty: true
        files:
          'index.html': '<%= dirs.jade %>index.jade'
          '<%= dirs.unittest %>test1.html': '<%= dirs.jade %>test1.jade'

    # Application
    uglify:
      dev:
        options:
          sourceMap:        '<%= dirs.dist %>app.min.js.map'
          sourceMappingURL: '/<%= dirs.dist %>app.min.js.map'
          sourceMapRoot:    '/'
          mangle:           false
        files:
          '<%= dirs.dist %>app.min.js': [
            '<%= dirs.js %>mixin.js'
            '<%= dirs.app %>App.js'
            '<%= dirs.app %>App.Tmpl.js'
            '<%= dirs.app %>Main.js'
          ]


    watch:
      javascript:
        files: '<%= dirs.js %>**/*.js'
        tasks: 'js'
      unittests:
        files: '<%= dirs.unittest %>coffee/*.coffee'
        tasks: 'unittest'
      css:
        files: '<%= concat.css.src %>'
        tasks: 'css'
      sass:
        files: '<%= dirs.scss %>**/*.scss'
        tasks: 'sass'
      jade:
        files: '<%= dirs.jade %>*.jade'
        tasks: 'jade'
      templates:
        files: '<%= dirs.base %>templates/*.html'
        tasks: 'tmpl'


  grunt.registerTask 'dev',      ['uglify', 'css', 'jade']
  grunt.registerTask 'js',       ['uglify', 'mocha']
  grunt.registerTask 'unittest', ['coffee', 'mocha']
  grunt.registerTask 'css',      ['concat:css', 'cssmin']
  grunt.registerTask 'sass',     ['compass', 'css']
  grunt.registerTask 'tmpl',     ['jst', 'uglify']

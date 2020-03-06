(function($) {
    "use strict"; // Start of use strict
  
    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: (target.offset().top - 56)
          }, 1000, "easeInOutExpo");
          return false;
        }
      }
    });
  
    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
      $('.navbar-collapse').collapse('hide');
    });
  
    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
      target: '#mainNav',
      offset: 56
    });
  
  })(jQuery); // End of use strict

  
  "use strict";

  // Load plugins
  const browsersync = require("browser-sync").create();
  const del = require("del");
  const gulp = require("gulp");
  const merge = require("merge-stream");
  
  // BrowserSync
  function browserSync(done) {
    browsersync.init({
      server: {
        baseDir: "./"
      },
      port: 3000
    });
    done();
  }
  
  // BrowserSync reload
  function browserSyncReload(done) {
    browsersync.reload();
    done();
  }
  
  // Clean vendor
  function clean() {
    return del(["./vendor/"]);
  }
  
  // Bring third party dependencies from node_modules into vendor directory
  function modules() {
    // Bootstrap
    var bootstrap = gulp.src('./node_modules/bootstrap/dist/**/*')
      .pipe(gulp.dest('./vendor/bootstrap'));
    // jQuery
    var jquery = gulp.src([
        './node_modules/jquery/dist/*',
        '!./node_modules/jquery/dist/core.js'
      ])
      .pipe(gulp.dest('./vendor/jquery'));
    // jQuery Easing
    var jqueryEasing = gulp.src('./node_modules/jquery.easing/*.js')
      .pipe(gulp.dest('./vendor/jquery-easing'));
    return merge(bootstrap, jquery, jqueryEasing);
  }
  
  // Watch files
  function watchFiles() {
    gulp.watch("./**/*.css", browserSyncReload);
    gulp.watch("./**/*.html", browserSyncReload);
  }
  
  // Define complex tasks
  const vendor = gulp.series(clean, modules);
  const build = gulp.series(vendor);
  const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));
  
  // Export tasks
  exports.clean = clean;
  exports.vendor = vendor;
  exports.build = build;
  exports.watch = watch;
  exports.default = build;
  
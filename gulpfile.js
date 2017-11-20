var gulp = require('gulp'),

browserSync = require('browser-sync');

gulp.task('default', function() {

    console.log('Hello Gulp');

});

gulp.task('browser-sync', function() {

    browserSync({

    // You can use wildcards in here.

    files: 'index.html, game-device.html, assets/styles/styles.css',
    
    "plugins": [ "../../../ubuntu/.nvm/versions/node/v6.11.2/lib/node_modules/browser-sync-client" ],
    
    ///home/ubuntu/.nvm/versions/node/v6.11.2/lib/browser-sync-tal@0.0.6 

    // We can pick port 8081 or 8082, if you are more of a 2's kind of guy, go for the 8082. Highly recommended.

    port: 8082,
    
   ghostMode: { clicks: true, forms: true, scroll: true },
    
    reloadOnRestart: true,
    
    scrollProportionally: true,
    
    codeSync: true

    });

});
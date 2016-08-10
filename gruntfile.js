/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        injector: {
            local_dependencies: {
                files: {
                    'www/index.html': [['www/lib/angular/angular.min.js', 'www/lib/angular/jquery.min.js'],
                                                  ['www/js/**/*.js', 'www/css/**/*.css']]
                },
                options:{
                    ignorePath:[
                        'www/'
                    ],
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-mocha-phantomjs');

    // Default task.
    grunt.registerTask('default', ['injector']);
    grunt.registerTask('unit', ['karma']);
    //grunt.registerTask('changes', ['watch']);
};

const gulp = require('gulp');
const webserver = require('gulp-webserver');
gulp.task('server', () => {
    return gulp.src('./src')
        .pipe(webserver({
            port: 9090,
            open: true,
            proxies: [{
                source: '/api/getData',
                target: 'http://localhost:3000/api/getData'
            }, {
                source: '/api/addBill',
                target: 'http://localhost:3000/api/addBill'
            }]
        }))
})
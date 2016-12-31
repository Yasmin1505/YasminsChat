// Include gulp
var gulp = require('gulp');

// Include Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('scripts', function () {
    return gulp.src([
            'React/Components/MessageItem.jsx',
            'React/Components/UserList.jsx',
            'React/Components/ChatWindow.jsx',
            'React/Components/YasminsChatRoom.jsx',
            'React/Components/RenderChat.jsx'
    ])
        .pipe(babel({
            presets: ['react', 'es2015']
        }))
        .pipe(concat('components.js'))
        .pipe(jshint())
        .pipe(rename('components.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('React/Components'));
});

gulp.task('scripts-debug', function () {
    return gulp.src([
            'React/Components/MessageItem.jsx',
            'React/Components/UserList.jsx',
            'React/Components/ChatWindow.jsx',
            'React/Components/YasminsChatRoom.jsx',
            'React/Components/RenderChat.jsx'
    ])
        .pipe(babel({
            presets: ['react', 'es2015']
        }))
        .pipe(concat('components.js'))
        .pipe(jshint())
        .pipe(uglify())
        .pipe(gulp.dest('React/Components'));
});

// Lint Task - Errors
gulp.task('lint', function () {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch([
            'React/Components/MessageItem.jsx',
            'React/Components/UserList.jsx',
            'React/Components/ChatWindow.jsx',
            'React/Components/YasminsChatRoom.jsx',
            'React/Components/RenderChat.jsx',
    ], ['scripts']);
});

// Default Task
gulp.task('default', ['scripts','scripts-debug', 'watch']);
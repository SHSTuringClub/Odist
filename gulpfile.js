var gulp = require("gulp");
var ts = require("gulp-typescript");

var ts_soul = ts.createProject("basic_law.json");

var src_filter = ['**', '!basic_law.json', '!gulpfile.js', '!memories.json', '!*/*.ts', '!*/*.map'];


gulp.task("default", ts_compile);
gulp.task("deploy", deploy);

function ts_compile() {
    return ts_soul.src().pipe(ts(ts_soul)).js.pipe(gulp.dest("."));
}

function deploy(){
    return gulp.src(src_filter)
        .pipe(gulp.dest('package.nw'))
}

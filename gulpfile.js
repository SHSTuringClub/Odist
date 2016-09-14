var gulp = require("gulp");
var ts = require("gulp-typescript");

var ts_soul = ts.createProject("basic_law.json");

gulp.task("default", function () {
    return ts_soul.src().pipe(ts(ts_soul)).js.pipe(gulp.dest("."));
});

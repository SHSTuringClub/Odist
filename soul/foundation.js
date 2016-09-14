"use strict";
var m = require("./memory");
var sep = require('path').sep;
var metrePrefix = ".." + sep + "metre" + sep + m.get_metre() + sep;
var head = document.getElementsByTagName('head')[0];
function load_theme(name) {
    // load theme global script
    var script_global = document.createElement("script");
    script_global.setAttribute("type", "text/javascript");
    script_global.setAttribute("src", metrePrefix + 'index.js');
    head.appendChild(script_global);
    // load page specific script
    var script_page = document.createElement("script");
    script_page.setAttribute("type", "text/javascript");
    script_page.setAttribute("src", metrePrefix + name + '.js');
    head.appendChild(script_page);
    // load page specific css
    var css_link = document.createElement("link");
    css_link.setAttribute("rel", "stylesheet");
    css_link.setAttribute("type", "text/css");
    css_link.setAttribute("href", metrePrefix + name + '.css');
    head.appendChild(css_link);
}
function load_js(name) {
    var js_script = document.createElement("script");
    js_script.setAttribute("type", "text/javascript");
    js_script.setAttribute("src", ".." + sep + "rhyme" + sep + name + ".js");
    head.appendChild(js_script);
}
function enlighten(name) {
    load_js(name);
    load_theme(name);
}
exports.enlighten = enlighten;
//# sourceMappingURL=foundation.js.map
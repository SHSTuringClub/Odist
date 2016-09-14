"use strict";
var m = require('../soul').memory;
var sep = require('path').sep;
var metrePrefix = '..' + sep + 'metre' + sep + m.get_metre() + sep;

function load_css(path){
    var css_link = document.createElement("link");
    css_link.setAttribute("rel", "stylesheet");
    css_link.setAttribute("type", "text/css");
    css_link.setAttribute("href", path);
    document.getElementsByTagName("head")[0].appendChild(css_link);
}


// load pure
var pure_path = metrePrefix + 'assets' + sep + 'pure-min.css';

// load global css
var css_g_path = metrePrefix + 'assets' + sep + 'global.css';

load_css(pure_path);
load_css(css_g_path);
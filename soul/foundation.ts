declare function require(moduleName: string): any;
import m = require("./memory");
let sep = require('path').sep;
let metrePrefix = `..${sep}metre${sep}${m.get_metre()}${sep}`;
let head = document.getElementsByTagName('head')[0];

function load_theme(name: string){
    // load theme global script
    let script_global = document.createElement("script");
    script_global.setAttribute("type","text/javascript");
    script_global.setAttribute("src", metrePrefix + 'index.js');
    head.appendChild(script_global);
    
    // load page specific script
    let script_page = document.createElement("script");
    script_page.setAttribute("type","text/javascript");
    script_page.setAttribute("src", metrePrefix + name + '.js');
    head.appendChild(script_page);

    // load page specific css
    let css_link = document.createElement("link");
    css_link.setAttribute("rel", "stylesheet");
    css_link.setAttribute("type", "text/css");
    css_link.setAttribute("href", metrePrefix + name + '.css');
    head.appendChild(css_link);
}


function load_js(name: string){
    let js_script = document.createElement("script");
    js_script.setAttribute("type","text/javascript");
    js_script.setAttribute("src", `..${sep}rhyme${sep}${name}.js`);
    head.appendChild(js_script);
}

export function enlighten(name: string){
    load_js(name);
    load_theme(name);
}
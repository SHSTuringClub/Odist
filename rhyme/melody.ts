declare function require(moduleName: string): any;
declare let nw: any;
let fs = require('fs-extra');
let lamu = require('lamu')();

let package_obj = fs.readJSONSync('package.json');


let v = nw.process.versions;
lamu.log({
    label: 'success',
    text: `LINK STARTED SUCCESSFULLY! Current Odist version: ${package_obj.version}\n`+
          `ENV info: nw.js: ${v.nw}, Chromium: ${v.chromium}, node: ${v.node}`
});
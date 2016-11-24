declare function require(moduleName: string): any;
let fs = require('fs-extra');
let lamu = require('lamu')();

let package_obj = fs.readJSONSync('package.json');

lamu.log({
    label: 'success',
    text: `LINK STARTED SUCCESSFULLY! Current Odist version: ${package_obj.version}`
});
"use strict";
var fs = require('fs-extra');
var chronicle_1 = require('./chronicle');
function init() {
    if (!fs.existsSync('memories.json')) {
        if (!fs.existsSync('memories.example.json')) {
            console.log('Neither memories.json nor example was found!');
        }
        else {
            fs.copySync('memories.example.json', 'memories.json');
        }
    }
    exports.config = fs.readJSONSync('memories.json');
    for (var i = 0; i < exports.config.chronicle.length; i++) {
        chronicle_1.Prayer.prayerify(exports.config.chronicle[i]);
    }
}
function save() {
    fs.writeJSONSync('memories.json', exports.config);
}
function get_metre() {
    return exports.config.metre;
}
exports.get_metre = get_metre;
function get_glimpse() {
    return exports.config.glimpse;
}
exports.get_glimpse = get_glimpse;
function get_chronicle() {
    return exports.config.chronicle;
}
exports.get_chronicle = get_chronicle;
function set_metre(str) {
    exports.config.metre = str;
    save();
}
exports.set_metre = set_metre;
function set_glimpse(num) {
    exports.config.glimpse = num; // At least 1 sec is required.
    save();
}
exports.set_glimpse = set_glimpse;
function set_chronicle(obj) {
    exports.config.chronicle = obj;
    save();
}
exports.set_chronicle = set_chronicle;
init();

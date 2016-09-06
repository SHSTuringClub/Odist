declare function require(moduleName: string): any;
var fs = require('fs-extra');
import {Chronicle, Prayer} from './chronicle';

interface Config {
    metre: string;
    glimpse: number;
    chronicle: Chronicle;
}

export var config: Config;

function init() {
    if (!fs.existsSync('memories.json')) {
        if (!fs.existsSync('memories.example.json')) {
            console.log('Neither memories.json nor example was found!');
        }
        else {
            fs.copySync('memories.example.json', 'memories.json');
        }
    }
    config = fs.readJSONSync('memories.json');
    for (let i = 0; i < config.chronicle.length; i++){
        Prayer.prayerify(config.chronicle[i]);
    }
}

function save(){
    fs.writeJSONSync('memories.json', config);
}

export function get_metre(){
    return config.metre;
}

export function get_glimpse(){
    return config.glimpse;
}

export function get_chronicle(){
    return config.chronicle
}

export function set_metre(str: string){
    config.metre = str;
    save();
}

export function set_glimpse(num: number){
    config.glimpse = num; // At least 1 sec is required.
    save();
}

export function set_chronicle(obj: Chronicle){
    config.chronicle = obj;
    save();
}

init();

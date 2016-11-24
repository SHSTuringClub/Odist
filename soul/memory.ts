declare function require(moduleName: string): any;
let fs = require('fs-extra');
let lamu = require('lamu')();
import {Chronicle, Prayer} from './chronicle';

interface Config {
    metre: string;
    glimpse: number;
    chronicle: Chronicle;
    apocalypto: Array<string>;
    aqi: number;
}

export let config: Config;

function init()
{
    if (!fs.existsSync('memories.json')) {
        if (!fs.existsSync('memories.example.json')) {
            lamu.log({label: 'error',
                text: 'Neither memories.json nor memories.example.json is found. Try reinstall.'})
        }
        else {
            fs.copySync('memories.example.json', 'memories.json');
            lamu.log({label: 'info',
                text: 'Seems to be first run, initiating config from memories.example.json'})
        }
    }
    config = fs.readJSONSync('memories.json');
    for (let i = 0; i < config.chronicle.length; i++){
        Prayer.prayerify(config.chronicle[i]);
    }
}

function save()
{
    fs.writeJSONSync('memories.json', config);
}

export function get_metre()
{
    return config.metre;
}

export function get_glimpse()
{
    return config.glimpse;
}

export function get_chronicle()
{
    return config.chronicle
}

export function get_apocalypto()
{
    return config.apocalypto;
}

export function get_aqi()
{
    return config.aqi;
}

export function set_metre(str: string)
{
    config.metre = str;
    save();
    lamu.log({label: 'success', text: `Metre setting success! Current metre: ${str}`});
}

export function set_glimpse(num: number)
{
    config.glimpse = num;
    save();
    lamu.log({label: 'success', text: `Glimpse setting success! Current glimpse: ${num}`});
}

export function set_chronicle(obj: Chronicle)
{
    config.chronicle = obj;
    save();
    lamu.log({label: 'success', text: `Chronicle setting success!`});
}

export function set_apocalypto(apo: Array<string>){
    config.apocalypto = apo;
    save();
    lamu.log({label: 'success', text: `Apocalypto setting success! Current apocalypto: ${apo}`});
}

export function set_aqi(aqi: number){
    config.aqi  = aqi;
    save();
    lamu.log({label: 'success', text: `AQI setting success! Current AQI: ${aqi}`});
}


init();

declare function require(moduleName: string): any;
import {Prayer, p_type} from "../soul/chronicle";
import {get_chronicle, get_aqi} from "../soul/memory";
import {enlighten} from "../soul/foundation";
declare var nw: any;
let mo = require('moment');


let win = nw.Window.get();
//win.resizeTo(1920, 1080);
win.enterKioskMode();
win.setAlwaysOnTop(true);

function quit(){
    win.hide();
    win.close(true);
    nw.App.unregisterGlobalHotKey(shortcut);
}

function update_info(){
    document.getElementById('date').innerHTML = mo().format('YYYY.MM.DD');
    document.getElementById('time').innerHTML = mo().format('HH:mm');
}


function check_prayer_type(current: Prayer){
    let now = Prayer.get_current_prayer(get_chronicle());
    if (now != current){
        win.reload();
    }
}

let shortcut = new nw.Shortcut({key: "Ctrl+Q"});
nw.App.registerGlobalHotKey(shortcut);
shortcut.on('active', quit);

let prayer = Prayer.get_current_prayer(get_chronicle());
let type: string;
switch (prayer.p_type){
    case p_type.新闻:
        type = 'news';
        break;

    case p_type.图片含描述:
        type = 'news';
        break;

    case p_type.图片不含描述:
        type = 'pic_wd';
        break;

    default:
        type = 'blackhole';
}
document.getElementById('aqi').innerHTML = `AQI: ${get_aqi()}`;
enlighten(type);



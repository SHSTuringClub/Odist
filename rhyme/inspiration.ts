declare function require(moduleName: string): any;
import {Prayer, p_type} from "../soul/chronicle";
import {get_chronicle, get_aqi, get_apocalypto} from "../soul/memory";
import {enlighten} from "../soul/foundation";
declare var nw: any;
let mo = require('moment');
let lamu = require('lamu')();

let win = nw.Window.get();
//win.resizeTo(1920, 1080);
win.enterKioskMode();
win.setAlwaysOnTop(true);

function get_apocalypto_iterator(){
    let apocalypto = get_apocalypto();
    let length: number = apocalypto.length;
    let current = 0;
    let func_ret = function (): string {
        if (length == 0){
            return "暂无通知";
        }

        let ret_val = apocalypto[current];

        current += 1;
        if (current == length){
            current = 0;
        }

        return ret_val
    };
    return func_ret
}

(<any>window).get_notification = get_apocalypto_iterator();

function quit(){
    win.hide();
    win.close(true);
    nw.App.unregisterGlobalHotKey(shortcut);
}

function update_info(){
    document.getElementById('date').innerHTML = mo().format('YYYY.MM.DD');
    document.getElementById('time').innerHTML = mo().format('HH:mm');
    document.getElementById('notification').innerHTML = (<any>window).get_notification();
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

    case p_type.视频:
        type = 'video';
        break;

    default:
        type = 'blackhole';
}

document.getElementById('aqi').innerHTML = `AQI: ${get_aqi()}`;
lamu.log({label: "info", text: `Enlightening type: ${type}`});
enlighten(type);



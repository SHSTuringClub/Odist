declare function check_prayer_type(current: Prayer): void;
declare function require(moduleName: string): any;
declare function quit(): void;
import {Prayer} from "../soul/chronicle";
import {get_chronicle, get_glimpse} from "../soul/memory";
let fs = require('fs-extra');
let sep = require('path').sep;

function endsWith(str: string, suffix: string): boolean{
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}


let current = Prayer.get_current_prayer(get_chronicle());
check_prayer_type(current);
let stat: any = {};
function init()
{
    stat.directory = current.p_path;
    stat.glimpse = get_glimpse();
    stat.index = 0;

    const pic_suffix = ['.png', '.jpg', '.bmp'];
    let file_list: Array<string> = [];

    try{
        let tmp: Array<string> = fs.readdirSync(stat.directory);
        for (var i of tmp){
            for (var j of pic_suffix){
                if (endsWith(i, j)){
                    file_list = file_list.concat(i);
                }
            }
        }
        stat.file_list = file_list.sort();
    }
    catch (e){
        quit();
    }
    main_loop();
    window.setInterval(main_loop, stat.glimpse * 1000);
}

function main_loop()
{
    let pic_path: string = stat.directory + sep + stat.file_list[stat.index];
    document.getElementById('image').setAttribute('style', `background-image: url('file://${pic_path}')`);
    if (stat.index == stat.file_list.length - 1){
        stat.index = 0;
    } else {
        stat.index++;
    }

    let t = new Date();
    let date = `${t.getFullYear()}.${t.getMonth() + 1}.${t.getDate()}`;
    let time = `${t.getHours()}:${t.getMinutes()}`;
    document.getElementById('date').innerHTML = date;
    document.getElementById('time').innerHTML = time;


    check_prayer_type(current);
}

init();
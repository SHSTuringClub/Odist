declare function check_prayer_type(current: Prayer): void;
declare function require(moduleName: string): any;
declare function quit(): void;
declare function update_info(): void;

import {Prayer} from "../soul/chronicle";
import {get_chronicle, get_glimpse} from "../soul/memory";
let fs = require('fs-extra');
let sep = '/';

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
        for (let i of tmp){
            for (let j of pic_suffix){
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
    let main_loop = function(){
        let pic_path: string = stat.directory + sep + stat.file_list[stat.index];
        let des_path: string = pic_path + '.txt';
        document.getElementById('image').setAttribute('style', `background-image: url('file://${pic_path}')`);
        document.getElementById('description').innerHTML = fs.readFileSync(des_path).toString();
        if (stat.index == stat.file_list.length - 1){
            stat.index = 0;
        } else {
            stat.index++;
        }

        update_info();
        check_prayer_type(current);

    };
    main_loop();
    window.setInterval(main_loop, stat.glimpse * 1000);
}


init();
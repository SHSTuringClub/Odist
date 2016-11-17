import soul = require('../soul');
import {set_apocalypto} from "../soul/memory";


function rewrite_history(){
    let apocalypto_string = (<HTMLTextAreaElement>document.getElementById('apocalypto-content')).value;
    if (apocalypto_string == ""){
        set_apocalypto([]);
        return;
    }
    let apocalypto = apocalypto_string.split('\n');
    set_apocalypto(apocalypto);
}
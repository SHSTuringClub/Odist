import {Prayer} from "../soul/chronicle";
import {get_chronicle, get_glimpse} from "../soul/memory";
declare function check_prayer_type(prayer: Prayer): void;
if (get_chronicle().length != 0){
    let current = Prayer.get_current_prayer(get_chronicle());
    check_prayer_type(current);
    (<any>window).interval_id = window.setInterval(check_prayer_type, get_glimpse() * 1000);
}

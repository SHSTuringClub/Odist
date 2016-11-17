import {Prayer} from "../soul/chronicle";
import {get_chronicle, get_glimpse} from "../soul/memory";
declare function check_prayer_type(prayer: Prayer): void;

let current = Prayer.get_current_prayer(get_chronicle());
check_prayer_type(current);
window.setInterval(check_prayer_type, get_glimpse() * 1000);
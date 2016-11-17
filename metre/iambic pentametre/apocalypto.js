"use strict";

function set_class_by_id(id, class_string){
    document.getElementById(id).setAttribute("class", class_string);
}

set_class_by_id("apocalypto-form", "pure-form");
set_class_by_id("apocalypto-submit", "pure-button pure-button-primary");
"use strict";
var win = nw.Window.get();
win.resizeTo(800, 700);

function set_class_by_id(id, class_string){
    document.getElementById(id).setAttribute("class", class_string);
}

function set_class_by_name(name, class_to_add){
    var i = document.getElementsByName(name);
    for (var j = 0; j < i.length; j++){
        i[j].setAttribute('class', class_to_add);
    }
}

set_class_by_id("glimpse-form", "pure-form");
set_class_by_id("timeline-view", "pure-form");
set_class_by_id("timeline-new", "pure-form pure-form-aligned");
set_class_by_id("glimpse-submit", "pure-button pure-button-primary");
set_class_by_id("timeline-table", "pure-table pure-table-horizontal");
set_class_by_name("delete-button", "button-delete pure-button");

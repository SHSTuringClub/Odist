import soul = require('../soul')
import Chronicle = soul.chronicle.Chronicle
import Prayer = soul.chronicle.Prayer

let p_type: {[index: string]: number} = {
    '新闻': 0,
    '图片含描述': 1,
    '图片不含描述': 2,
    '待机': 9
};

let day: {[index: string]: number} = {
    '周一': 0,
    '周二': 1,
    '周三': 2,
    '周四': 3,
    '周五': 4,
    '周六': 5,
    '周日': 6
};


let glimpse = soul.memory.get_glimpse();
let aqi = soul.memory.get_aqi();
let glimpse_element = <HTMLInputElement>document.getElementById('glimpse');
let aqi_element = <HTMLInputElement>document.getElementById('aqi');
let chronicle = <Chronicle>soul.memory.get_chronicle();
//chronicle = [
//    new Prayer(0, 5, 50, 0, 'D:\\test1'),
//    new Prayer(1, 6, 12, 1, 'D:\\test2'),
//    new Prayer(3, 5, 33, 2, 'D:\\test3')];


function glimpse_genesis(){
    glimpse_element.value = glimpse.toString();
}

function aqi_genesis(){
    aqi_element.value = aqi.toString();
}

function submit_glimpse(){
    let g = glimpse_element.value;
    soul.memory.set_glimpse(parseInt(g));
}

function submit_aqi(){
    let a = aqi_element.value;
    soul.memory.set_aqi(parseInt(a));
}

function generate_tr(_no: number, _pr: Prayer){
    let tr = document.createElement('tr');
    let strArr = _pr.to_string_array(_no);

    let th_no = document.createElement('th');
    th_no.innerHTML = strArr[0];
    let th_ty = document.createElement('th');
    th_ty.innerHTML = strArr[1];
    let th_pa = document.createElement('th');
    th_pa.innerHTML = strArr[2];
    let th_tm = document.createElement('th');
    th_tm.innerHTML = strArr[3];
    let th_btn = document.createElement('th');
    let btn_del = document.createElement('button');
    btn_del.innerHTML = '删除';
    tr.appendChild(th_no);
    tr.appendChild(th_ty);
    tr.appendChild(th_pa);
    tr.appendChild(th_tm);
    tr.appendChild(th_btn);
    th_btn.appendChild(btn_del);

    tr.setAttribute('id', `tr-prayer-${_no.toString()}`);
    btn_del.setAttribute('onclick', `prayer_ignite(${_no})`);
    btn_del.setAttribute('name', 'delete-button');
    return tr;
}

function timeline_genesis(): void{
    let len = chronicle.length;
    for (let i = 0; i < len; i++){
        let j = generate_tr(i, chronicle[i]);
        document.getElementById('timeline-table-body').appendChild(j);
    }
}

function prayer_ignite(_no: number): void{
    chronicle.splice(_no, 1);
    soul.memory.set_chronicle(chronicle);
}

function rewrite_history(){
    let new_type: string = (<HTMLSelectElement>document.getElementById('new_type')).value,
        ty: number = p_type[new_type],
        path: string = (<HTMLInputElement>document.getElementById('new_directory')).value,
        new_weekday: string = (<HTMLSelectElement>document.getElementById('new_weekday')).value,
        weekday: number = day[new_weekday],
        hh: number = parseInt((<HTMLInputElement>document.getElementById('HH')).value),
        mm: number = parseInt((<HTMLInputElement>document.getElementById('MM')).value);

    let prayer: Prayer = new Prayer(weekday, hh, mm, ty, path);

    for (let i = 0; i < chronicle.length; i++){
        if (chronicle[i].p_time.toTimestamp() == prayer.p_time.toTimestamp()){
            alert('不得有重复的起始时间!');
            return;
        }
    }

    chronicle = chronicle.concat(prayer);
    chronicle.sort(function (a: Prayer, b: Prayer){
        return a.p_time.toTimestamp() - b.p_time.toTimestamp();
    });
    soul.memory.set_chronicle(chronicle);
}

glimpse_genesis();
aqi_genesis();
timeline_genesis();
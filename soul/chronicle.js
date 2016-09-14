"use strict";
var Weektime = (function () {
    function Weektime(_day, _hour, _minute) {
        this.w_day = _day;
        this.w_hour = _hour;
        this.w_minute = _minute;
    }
    Weektime.prototype.toTimestamp = function () {
        return this.w_day * 24 * 60 + this.w_hour * 60 + this.w_minute;
    };
    Weektime.prototype.toString = function () {
        return Weektime.day[this.w_day] + " " + this.w_hour + ":" + this.w_minute;
    };
    Weektime.get_now = function () {
        var d = new Date();
        var day = d.getDay(), hh = d.getHours(), mm = d.getMinutes();
        return day * 24 * 60 + hh * 60 + mm;
    };
    Weektime.day = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return Weektime;
}());
(function (p_type) {
    p_type[p_type["新闻"] = 0] = "新闻";
    p_type[p_type["图片含描述"] = 1] = "图片含描述";
    p_type[p_type["图片不含描述"] = 2] = "图片不含描述";
    p_type[p_type["待机"] = 9] = "待机";
})(exports.p_type || (exports.p_type = {}));
var p_type = exports.p_type;
var Prayer = (function () {
    function Prayer(_day, _hour, _min, _type, _path) {
        this.p_path = _path;
        this.p_type = _type;
        this.p_time = new Weektime(_day, _hour, _min);
    }
    Prayer.prototype.to_string_array = function (_no) {
        return [_no.toString(), p_type[this.p_type], this.p_path, this.p_time.toString()];
    };
    Prayer.prayerify = function (obj) {
        obj.to_string_array = function (_no) { return [_no.toString(), p_type[this.p_type], this.p_path, this.p_time.toString()]; };
        obj.p_time.toString = function () { return Weektime.day[this.w_day] + " " + this.w_hour + ":" + this.w_minute; };
        obj.p_time.toTimestamp = function () { return this.w_day * 24 * 60 + this.w_hour * 60 + this.w_minute; };
    };
    Prayer.get_current_prayer = function (ch) {
        var i = 0, now = Weektime.get_now();
        if (ch.length == 0) {
            throw RangeError();
        }
        while (i < ch.length && ch[i].p_time.toTimestamp() <= now) {
            i++;
        }
        if (i == 0) {
            return ch[ch.length - 1];
        }
        return ch[i - 1];
    };
    return Prayer;
}());
exports.Prayer = Prayer;
//# sourceMappingURL=chronicle.js.map
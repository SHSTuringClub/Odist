class Weektime {
    private w_day: number;
    private w_hour: number;
    private w_minute: number;

    static day = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    constructor(_day: number, _hour: number, _minute: number)
    {
        this.w_day = _day;
        this.w_hour = _hour;
        this.w_minute = _minute;
    }

    toTimestamp(): number
    {
        return this.w_day * 24 * 60 + this.w_hour * 60 + this.w_minute;
    }

    toString(): string
    {
        return `${Weektime.day[this.w_day]} ${this.w_hour}:${this.w_minute}`;
    }

    static get_now(): number
    {
        let d = new Date();
        let day = d.getDay(),
            hh = d.getHours(),
            mm = d.getMinutes();
        return day * 24 * 60 + hh * 60 + mm;

    }
}


export enum p_type {
    新闻 = 0,
    图片含描述,
    图片不含描述,
    视频,
    待机 = 9
}

export class Prayer {
    p_time: Weektime;
    p_type: p_type;
    p_path: string;
    constructor(_day: number, _hour: number, _min: number, _type: p_type, _path: string){
        this.p_path = _path;
        this.p_type = _type;
        this.p_time = new Weektime(_day, _hour, _min);
    }

    to_string_array(_no: number): Array<string>
    {
        return [_no.toString(), p_type[this.p_type], this.p_path, this.p_time.toString()]
    }

    static prayerify(obj: any)
    {
        obj.to_string_array = function(_no: number)
        {return [_no.toString(), p_type[this.p_type], this.p_path, this.p_time.toString()]};
        obj.p_time.toString = function()
        {return `${Weektime.day[this.w_day]} ${this.w_hour}:${this.w_minute}`};
        obj.p_time.toTimestamp = function()
        {return this.w_day * 24 * 60 + this.w_hour * 60 + this.w_minute;};
    }

    static get_current_prayer(ch: Chronicle): Prayer
    {
        let i = 0, now = Weektime.get_now();

        if (ch.length == 0){
            throw RangeError();
        }

        while (ch[i].p_time.toTimestamp() <= now){
            i++;
            if(i == ch.length){
                return ch[i-1];
            }
        }

        if (i == 0){
            return ch[ch.length - 1];
        }

        return ch[i-1];

    }
}

export interface Chronicle extends Array<Prayer>{}
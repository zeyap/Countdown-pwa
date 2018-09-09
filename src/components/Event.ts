export default class Event {
    protected id:number;
    public date: Date;
    protected title: string;
    protected place: string;
    protected status: number;
    protected remain: object;
    constructor(date: Date, title: string, place: string, status: number) {
        this.id=-1;
        this.date = date;
        this.title = title;
        this.place = place;
        this.status = status;
        this.remain = {
            days: 0,
            hours: 0,
            minutes:0,
            seconds: 0
        };
    }

    toObject=()=>{
        return {
            id: this.id,
            date: this.date,
            title: this.title,
            place: this.place,
            status: this.status,
            remain: {
                days: (this.remain as any).days,
                hours: (this.remain as any).hours,
                minutes:(this.remain as any).minutes,
                seconds:(this.remain as any).seconds
            }
        }
    }
}

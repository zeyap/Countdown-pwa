export default class Event {
    protected date: Date;
    protected title: string;
    protected place: string;
    protected status: number;
    constructor(date: Date, title: string, place: string, status: number) {
        this.date = date;
        this.title = title;
        this.place = place;
        this.status = status;
    }
}

import { DayOfWeek, DayOfMonth, DayType } from "./day.module";

export class Interval {
    private daysBetween: number = 0

    constructor(private day: DayOfWeek | DayOfMonth,
                private untilDay: DayOfWeek | DayOfMonth = 0) {
        if(Interval.isValidDay(day) && Interval.isValidDay(untilDay)){
            this.day = day;
            this.untilDay = untilDay;
        } else {
            throw new TypeError("Day or until day: invalid type.");
        }
    }

    getDaysBeteween(): Array<number> {
        let total: number = 0;
        if(this.untilDay == 0){
            total = this.day;
        } else {
            total = (this.untilDay - this.day) + 1;
        }

        console.log(total);

        let days: Array<number> = new Array<number>();
        for (let count = this.day; count <= total; count++) {
            days.push(count);
        }
        return days;
    }

    getIntervalWithDay(day: number): Interval {
        return new Interval(day);
    }

    /**
     * Verify if day is valid (DayOfWeek or DayOfMonth)
     * Ps.: that function ignores day equals 0. Be careful.
     * @param day 
     */
    static isValidDay(day: number): boolean {
        return (!(DayOfWeek[day] == null && (DayOfMonth[day] == null && day > 0)));
    }
}
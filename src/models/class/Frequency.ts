import {
  Interval,
  DayOfWeek,
  DayOfMonth,
  TimeInterval,
  Duration
} from "../classes";

export class Frequency {
  constructor(
    private id: number,
    private interval: Interval,
    private timeInterval: TimeInterval,
    private duration: Duration,
    private times: number = 1,
    private untilDate: Date = null
  ) {}

  getInterval(day: number = null): Interval {
    if (day == null) return this.interval;
    else return this.interval.getIntervalWithDay(day);
  }

  getTimeInterval(): TimeInterval {
    return this.timeInterval;
  }

  getTimes(): number {
    return this.times;
  }

  getDuration(): Duration {
    return this.duration;
  }

  next(): boolean {
    let hasMoreTime: boolean = false;

    switch (this.duration) {
      case Duration.FOR_A_NUMBER_OF_TIMES:
        hasMoreTime = this.times == 0 ? false : true;
        break;

      case Duration.FOREVER:
        hasMoreTime = true;
        break;

      case Duration.UNTIL_A_DATE:
        hasMoreTime = this.untilDate <= new Date() ? false : true;
        break;

      default:
        break;
    }

    if (hasMoreTime) this.decreaseTime();

    return hasMoreTime;
  }

  decreaseTime(): number | boolean {
    if (this.times >= 1) {
      return --this.times;
    } else {
      return false;
    }
  }
}

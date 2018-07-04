import { Interval } from "../frequency/interval.model";
import { Frequency } from "../../classes";
import { TimeInterval } from "../frequency/time-interval.enum";
import { Duration } from "../frequency/duration.enum";
import { DayOfWeek, DayOfMonth } from "../frequency/day.module";

export const DIA_10_ONCE: Frequency = new Frequency(
  1,
  new Interval(DayOfMonth.TENTH),
  TimeInterval.DAILY,
  Duration.FOR_A_NUMBER_OF_TIMES
);

export const DIA_10_MENSALMENTE: Frequency = new Frequency(
  2,
  new Interval(DayOfMonth.TENTH),
  TimeInterval.MONTHLY,
  Duration.FOREVER
);

export const DE_1_A_9: Frequency = new Frequency(
  3,
  new Interval(DayOfMonth.FIRST, DayOfMonth.NINTH),
  TimeInterval.DAILY,
  Duration.FOR_A_NUMBER_OF_TIMES
);

export const TODAS_SEXTAS: Frequency = new Frequency(
  4,
  new Interval(DayOfWeek.FRIDAY),
  TimeInterval.MONTHLY,
  Duration.FOREVER
);

export const DE_SEGUNDA_A_SEXTA: Frequency = new Frequency(
  5,
  new Interval(DayOfWeek.MONDAY, DayOfWeek.FRIDAY),
  TimeInterval.MONTHLY,
  Duration.FOREVER
);

// console.log(DIA_10_ONCE);
// console.log(DE_1_A_9);
// console.log(TODAS_SEXTAS);
// console.log(DE_SEGUNDA_A_SEXTA);

// make error
// export const DIA_32: Frequency = new Frequency(3, new Interval(32), TimeInterval.MONTHLY, Duration.FOREVER);
// console.log(DIA_32);

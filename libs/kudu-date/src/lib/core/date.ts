import { DATE_PATTERNS, DAY_IN_MS, MONTH_FULL_NAMES } from '../constants';
import { KuduDateMonth } from './date-month';
import { KuduDateWeek } from './date-week';

export class KuduDate {
  protected date: Date;

  constructor(date: Date | string | number) {
    this.date = new Date(date);
  }

  public static now() {
    return new KuduDate(Date.now());
  }

  public static fromString(value: string) {
    for (const pattern of DATE_PATTERNS) {
      const match = value.match(pattern);
      if (match) {
        if (pattern.source.includes('\\/([0-9]{4})$')) {
          // MM/dd/yyyy format
          const [, month, day, year] = match;
          return new KuduDate(new Date(+year, +month - 1, +day));
        } else if (pattern.source.includes('^(\\d{4})-')) {
          // yyyy-MM-dd format
          const [, year, month, day] = match;
          return new KuduDate(new Date(+year, +month - 1, +day));
        } else if (pattern.source.includes('\\.(\\d{4})$')) {
          // dd.MM.yyyy format
          const [, day, month, year] = match;
          return new KuduDate(new Date(+year, +month - 1, +day));
        } else if (pattern.source.includes('-(\\d{4})$')) {
          // dd-MM-yyyy format
          const [, day, month, year] = match;
          return new KuduDate(new Date(+year, +month - 1, +day));
        }
      }
    }

    return null;
  }

  public getYear() {
    return this.date.getFullYear();
  }

  public getQuarter() {
    return Math.floor((this.date.getMonth() + 3) / 3);
  }

  public getMonth() {
    return this.date.getMonth();
  }

  public getMonthString() {
    return MONTH_FULL_NAMES[this.getMonth()];
  }

  public getWeek() {
    const date = new Date(
      Date.UTC(
        this.date.getFullYear(),
        this.date.getMonth(),
        this.date.getDate(),
      ),
    );

    const dayNumber = date.getUTCDay() || 7;

    date.setUTCDate(date.getUTCDate() + 4 - dayNumber);

    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));

    return Math.ceil(
      ((date.valueOf() - yearStart.valueOf()) / DAY_IN_MS + 1) / 7,
    );
  }

  public getDay() {
    return this.date.getDate();
  }

  public getHours() {
    return this.date.getHours();
  }

  public getMinutes() {
    return this.date.getMinutes();
  }

  public getSeconds() {
    return this.date.getSeconds();
  }

  public getMilliseconds() {
    return this.date.getMilliseconds();
  }

  public setDay(day: number | ((current: number) => number)) {
    if (typeof day === 'function') {
      this.date.setDate(day(this.getDay()));
    } else {
      this.date.setDate(day);
    }

    return this;
  }

  public setMonth(month: number | ((current: number) => number)) {
    if (typeof month === 'function') {
      this.date.setMonth(month(this.getMonth()));
    } else {
      this.date.setMonth(month);
    }

    return this;
  }

  public setYear(year: number | ((current: number) => number)) {
    if (typeof year === 'function') {
      this.date.setFullYear(year(this.getYear()));
    } else {
      this.date.setFullYear(year);
    }

    return this;
  }

  public setHours(hours: number | ((current: number) => number)) {
    if (typeof hours === 'function') {
      this.date.setHours(hours(this.getHours()));
    } else {
      this.date.setHours(hours);
    }

    return this;
  }

  public setMinutes(minutes: number | ((current: number) => number)) {
    if (typeof minutes === 'function') {
      this.date.setMinutes(minutes(this.getMinutes()));
    } else {
      this.date.setMinutes(minutes);
    }

    return this;
  }

  public setSeconds(seconds: number | ((current: number) => number)) {
    if (typeof seconds === 'function') {
      this.date.setSeconds(seconds(this.getSeconds()));
    } else {
      this.date.setSeconds(seconds);
    }

    return this;
  }

  public setMilliseconds(ms: number | ((current: number) => number)) {
    if (typeof ms === 'function') {
      this.date.setMilliseconds(ms(this.getMilliseconds()));
    } else {
      this.date.setMilliseconds(ms);
    }

    return this;
  }

  public startOf() {
    this.setHours(0).setMinutes(0).setSeconds(0).setMilliseconds(0);
    return this;
  }

  public endOf() {
    this.setHours(23).setMinutes(59).setSeconds(59).setMilliseconds(999);
    return this;
  }

  public clone() {
    return new KuduDate(this.date);
  }

  public toDate() {
    return this.date;
  }

  public toDateString() {
    return `${this.getYear()}-${this.getMonth() + 1}-${this.getDay()}`;
  }

  public toMonth() {
    return new KuduDateMonth(this);
  }

  public toWeek() {
    return new KuduDateWeek(this);
  }

  public valueOf() {
    return this.date.valueOf();
  }
}

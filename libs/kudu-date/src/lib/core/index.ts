import { DAY_IN_MS, MONTH_FULL_NAMES } from '../constants';

export enum Unit {
  Year = 'year',
  Month = 'month',
  Day = 'day',
  Minute = 'minute',
  Second = 'second',
  Millisecond = 'millisecond',
}

export class DateTime {
  protected date: Date;

  constructor(date: Date | string | number) {
    this.date = new Date(date);
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

  public getDayOfWeek() {
    const day = this.date.getDay();
    return day === 0 ? 7 : day;
  }

  public getFirstDayOfMonth() {
    return this.clone().setDay(1).getDayOfWeek();
  }

  public getDaysOfMonth() {
    return Array.from({ length: this.getTotalDaysOfMonth() }, (_, i) => i + 1);
  }

  public getTotalDaysOfMonth() {
    return this.clone()
      .setMonth((month) => month + 1)
      .setDay(0)
      .getDay();
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

  public clone() {
    return new DateTime(this.date);
  }

  public toDate() {
    return this.date;
  }

  public toDateString() {
    return `${this.getYear()}-${this.getMonth() + 1}-${this.getDay()}`;
  }

  public valueOf() {
    return this.date.valueOf();
  }

  static now() {
    return new DateTime(Date.now());
  }
}

export class DateTimePeriod {
  constructor(
    private from: DateTime,
    private to: DateTime,
  ) {}

  public getDays() {
    const from = this.from.valueOf();
    const to = this.to.valueOf();
    return (to - from) / DAY_IN_MS;
  }

  public getDates() {
    return [...Array(this.getDays())].map((_, day) =>
      this.from.clone().setDay((value) => value + day),
    );
  }

  public isBetween(date: DateTime): boolean {
    if (this.from <= date && date <= this.to) {
      return true;
    }

    return false;
  }
}

import { DAY_IN_MS, MONTHS } from '../constants';

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

  public getMonth() {
    return this.date.getMonth() + 1;
  }

  public getMonthString() {
    return MONTHS[this.getMonth() - 1];
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
      this.date.setMonth(month(this.getMonth()) - 1);
    } else {
      this.date.setMonth(month - 1);
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
    return `${this.getYear()}-${this.getMonth()}-${this.getDay()}`;
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
}

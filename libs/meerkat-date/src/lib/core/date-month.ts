import { MkDate } from './date';

export class MkDateMonth {
  constructor(private date: MkDate) {}

  public getTotalDays() {
    return this.date
      .clone()
      .setMonth((month) => month + 1)
      .setDay(0)
      .getDay();
  }

  public getDays() {
    return Array.from({ length: this.getTotalDays() }, (_, i) => i + 1);
  }

  public getFirstDay() {
    return this.date.clone().setDay(1).toWeek().getDay();
  }
}

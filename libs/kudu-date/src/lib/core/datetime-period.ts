import { DAY_IN_MS } from '../constants';
import { DateTime } from './datetime';

export class DateTimePeriod {
  constructor(
    private from: DateTime,
    private to: DateTime,
  ) {}

  public getDays() {
    const from = this.from.valueOf();
    const to = this.to.valueOf();
    return Math.floor((to - from) / DAY_IN_MS);
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

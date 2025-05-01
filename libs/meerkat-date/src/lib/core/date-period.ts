import { DAY_IN_MS } from '../constants';
import { MkDate } from './date';

export class MkDatePeriod {
  constructor(
    private from: MkDate,
    private to: MkDate,
  ) {}

  public getDays() {
    const from = this.from.valueOf();
    const to = this.to.valueOf();
    return Math.ceil((to - from) / DAY_IN_MS);
  }

  public getDates() {
    return [...Array(this.getDays())].map((_, day) =>
      this.from.clone().setDay((value) => value + day),
    );
  }

  public isBetween(date: MkDate): boolean {
    if (this.from <= date && date <= this.to) {
      return true;
    }

    return false;
  }
}

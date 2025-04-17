import { DAY_IN_MS } from '../constants';
import { KuduDate } from './date';

export class KuduDatePeriod {
  constructor(
    private from: KuduDate,
    private to: KuduDate,
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

  public isBetween(date: KuduDate): boolean {
    if (this.from <= date && date <= this.to) {
      return true;
    }

    return false;
  }
}

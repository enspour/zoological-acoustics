import { KuduDate } from './date';

export class KuduDateWeek {
  constructor(private date: KuduDate) {}

  public getDay() {
    const day = this.date.getDay();
    return day === 0 ? 7 : day;
  }
}

import { MkDate } from './date';

export class MkDateWeek {
  constructor(private date: MkDate) {}

  public getDay() {
    const day = this.date.toDate().getDay();
    return day === 0 ? 7 : day;
  }
}

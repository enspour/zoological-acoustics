import { DateTime, DateTimePeriod } from '@kudu-date';

export const getOffset = (
  startDate: DateTime | string,
  endDate: DateTime | string,
  columnWidth: number,
) => {
  if (typeof startDate === 'string') {
    startDate = new DateTime(startDate);
  }

  if (typeof endDate === 'string') {
    endDate = new DateTime(endDate);
  }

  const period = new DateTimePeriod(startDate, endDate);
  return period.getDays() * columnWidth;
};

import { DAY_IN_MS, KuduDate } from '@kudu-date';

export const getOffset = (
  startDate: KuduDate | string,
  endDate: KuduDate | string,
  columnWidth: number,
) => {
  if (typeof startDate === 'string') {
    startDate = new KuduDate(startDate);
  }

  if (typeof endDate === 'string') {
    endDate = new KuduDate(endDate);
  }

  const ms = endDate.valueOf() - startDate.valueOf();
  return (ms / DAY_IN_MS) * columnWidth;
};

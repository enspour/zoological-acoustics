import { DAY_IN_MS, MkDate } from '@meerkat-date';

export const getOffset = (
  startDate: MkDate | string,
  endDate: MkDate | string,
  columnWidth: number,
) => {
  if (typeof startDate === 'string') {
    startDate = new MkDate(startDate);
  }

  if (typeof endDate === 'string') {
    endDate = new MkDate(endDate);
  }

  const ms = endDate.valueOf() - startDate.valueOf();
  return (ms / DAY_IN_MS) * columnWidth;
};

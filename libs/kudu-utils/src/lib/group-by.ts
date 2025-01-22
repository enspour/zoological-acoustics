export const groupBy = <T, K extends string>(
  arr: T[],
  callback: (item: T, index: number) => K,
) => {
  return arr.reduce(
    (acc, item, index) => {
      const key = callback(item, index);

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(item);

      return acc;
    },
    {} as Record<K, T[]>,
  );
};

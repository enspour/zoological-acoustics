export const countBy = <T, K extends string>(
  arr: T[],
  callback: (item: T, index: number) => K,
) => {
  return arr.reduce(
    (acc, item, index) => {
      const key = callback(item, index);

      if (!acc[key]) {
        acc[key] = 0;
      }

      acc[key] += 1;

      return acc;
    },
    {} as Record<K, number>,
  );
};

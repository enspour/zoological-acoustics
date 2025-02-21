export const mapBy = <T, K extends string>(
  arr: T[],
  callback: (item: T, index: number) => K,
) => {
  return arr.reduce(
    (acc, item, index) => {
      const key = callback(item, index);
      acc[key] = item;

      return acc;
    },
    {} as Partial<Record<K, T>>,
  );
};

export const chunkArray = <T>(array: T[], size: number) =>
  array.reduce(
    (result, _, index) => (index % size === 0 ? [...result, array.slice(index, index + size)] : result),
    [] as T[][]
  );

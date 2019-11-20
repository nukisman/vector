import padStart from 'lodash/padStart';

/**********************************************************
 * Generic data structures and operations
 **********************************************************/

export type V2<T> = [T, T];
export type M2<T> = [V2<T>, V2<T>];

export type V3<T> = [T, T, T];
export type M3<T> = [V3<T>, V3<T>, V3<T>];

export const showLine = <T>(
  line: T[],
  padLengths: number[],
  toString: (item: T) => string = String
): string => line.map((n, i) => padStart(toString(n), padLengths[i])).join(' ');

export const columnPadLengths = <T>(
  m: M3<T>,
  toString: (item: T) => string = String
): V3<number> => {
  const strings = flip(map(m, toString));
  // console.log('columnPadLengths', strings);
  return strings.map(column =>
    column.reduce((acc, item) => Math.max(acc, item.length), 0)
  ) as V3<number>;
};

export const showM3 = <T>(
  t: M3<T>,
  toString: (item: T) => string = String
): string => {
  const padLengths: V3<number> = columnPadLengths(t, toString);
  // console.log('showTransform', { t, padLengths });
  return t.map(line => showLine(line, padLengths, toString)).join('\n');
};

export const flip = <T>(m: M3<T>): M3<T> => map(m, (_, i, k) => m[k][i]);

export const reduce = <T, R>(
  m: M3<T>,
  f: (acc: R, item: T, i: number, k: number) => R,
  initial: R
): R => {
  let acc: R = initial;
  m.forEach((line, i) =>
    line.forEach((item, k) => {
      acc = f(acc, item, i, k);
    })
  );
  return acc;
};

export const map = <T, U>(
  m: M3<T>,
  f: (item: T, i: number, k: number) => U
): M3<U> => {
  const r: U[][] = [[], [], []];
  for (let i = 0; i < 3; i++) {
    for (let k = 0; k < 3; k++) {
      r[i].push(f(m[i][k], i, k));
    }
  }
  return r as M3<U>;
};

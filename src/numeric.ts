/**********************************************************
 * Numeric data structures and operations
 **********************************************************/
import { V2, V3, M3, M2, flip, map } from './generic';

export type Point2 = V2<number>;
export type Point3 = V3<number>;

export const fixed = (n: number, fractionDigits = 2): number =>
  Number.parseFloat(n.toFixed(fractionDigits));
export const showFixed = (n: number, fractionDigits = 2): string =>
  n.toFixed(fractionDigits);
export const showFixed_ = (n: number): string => showFixed(n);
// todo: showFixedShort

export const showPoint = (v: number[]): string =>
  `(${v.map(item => fixed(item)).join(', ')})`;

export const isZero = (v: number[]): boolean =>
  v.reduce((acc: boolean, n) => acc && n === 0, true);

export const zeroV2: Point2 = [0, 0];
export const zeroM2: M2<number> = [zeroV2, zeroV2];
export const identity2: M2<number> = [
  [1, 0],
  [0, 1]
];

export const zeroV3: Point3 = [0, 0, 0];
export const zeroM3: M3<number> = [zeroV3, zeroV3, zeroV3];
export const identity3: M3<number> = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1]
];

export const sum = (a: Point2, b: Point2, ...rest: Point2[]): Point2 =>
  rest.reduce(add, add(a, b));
export const prod = (a: Point2, b: Point2, ...rest: Point2[]): Point2 =>
  rest.reduce(mult, mult(a, b));

export const add = (a: Point2, b: Point2): Point2 => [a[0] + b[0], a[1] + b[1]];
export const sub = (a: Point2, b: Point2): Point2 => [a[0] - b[0], a[1] - b[1]];
export const mult = (a: Point2, b: Point2): Point2 => [
  a[0] * b[0],
  a[1] * b[1]
];
export const multBy = (v: Point2, k: number): Point2 => [v[0] * k, v[1] * k];
export const neg = (v: Point2): Point2 => multBy(v, -1);

export const divide = (a: Point2, b: Point2): Point2 => [
  a[0] / b[0],
  a[1] / b[1]
];
export const divideHomo = (k: number, v: Point2): Point2 => divide([k, k], v);
export const divideBy = (v: Point2, k: number): Point2 => divide(v, [k, k]);

/** Скалярное произведение */
export const dotProduct = <T extends number[]>(a: T, b: T): number =>
  a.reduce((acc, ai, i) => acc + ai * b[i], 0);

export const productM3 = (a: M3<number>, b: M3<number>): M3<number> => {
  const b_: M3<number> = flip(b);
  return map(a, (item, i, k) => dotProduct(a[i], b_[k]));
};

//todo: productLine(line, m)
export const productColumn3 = (m: M3<number>, column: Point3): Point3 => [
  dotProduct(m[0], column),
  dotProduct(m[1], column),
  dotProduct(m[2], column)
];

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

export const add = (a: Point2, b: Point2): Point2 => [a[0] + b[0], a[1] + b[1]];
export const sub = (a: Point2, b: Point2): Point2 => [a[0] - b[0], a[1] - b[1]];
export const mult = (k: number, v: Point2): Point2 => [v[0] * k, v[1] * k];
export const neg = (v: Point2): Point2 => mult(-1, v);
export const divide = (k: number, v: Point2): Point2 => [k / v[0], k / v[1]];

/** Скалярное произведение 2D-векторов */
export const dotProduct2 = (a: Point2, b: Point2): number =>
  a[0] * b[0] + a[1] * b[1];
/** Скалярное произведение 3D-векторов */
export const dotProduct3 = (a: Point3, b: Point3): number =>
  a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

export const product3 = (a: M3<number>, b: M3<number>): M3<number> => {
  const b_: M3<number> = flip(b);
  return map(a, (item, i, k) => dotProduct3(a[i], b_[k]));
};

//todo: productLine(line, m)
export const productColumn3 = (m: M3<number>, column: Point3): Point3 => [
  dotProduct3(m[0], column),
  dotProduct3(m[1], column),
  dotProduct3(m[2], column)
];

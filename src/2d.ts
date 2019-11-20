import { V2, M3, V3, columnPadLengths, showLine, showM3 } from './generic';
import {
  productColumn3,
  product3,
  showPoint,
  Point2,
  showFixed_,
  neg
} from './numeric';
import { spy } from '@nukisman/utils';

/**********************************************************
 * Homogeneous coordinates transformation
 **********************************************************/

export const transform = (op: M3<number>, v: V2<number>): V2<number> => {
  const r = productColumn3(op, [v[0], v[1], 1]);
  return [r[0], r[1]];
};

export const compose = (op: M3<number>, ...ops: M3<number>[]): M3<number> =>
  spy(
    ops.reduce((acc, t) => product3(acc, t), op),
    res => ['compose\n' + showCompose([op, ...ops], res)]
  );

const showCompose = (ts: M3<number>[], result: M3<number>): string => {
  const padLens: V3<number>[] = ts.map(m => columnPadLengths(m, showFixed_));
  const resPadLens: V3<number> = columnPadLengths(result, showFixed_);
  return [
    `${showLines(ts, padLens, 0).join('   ')}   ${showLine(
      result[0],
      resPadLens,
      showFixed_
    )}`,
    `${showLines(ts, padLens, 1).join(' * ')} = ${showLine(
      result[1],
      resPadLens,
      showFixed_
    )}`,
    `${showLines(ts, padLens, 2).join('   ')}   ${showLine(
      result[2],
      resPadLens,
      showFixed_
    )}`
  ].join('\n');
};

const showLines = (
  ts: M3<number>[],
  padLengths: V3<number>[],
  lineIndex: number
) => ts.map((m, mi) => showLine(m[lineIndex], padLengths[mi], showFixed_));

export const spyM3 = (m: M3<number>, label: string) =>
  spy(m, m => [label, '\n' + showM3(m, showFixed_)]);

/**********************************************************
 * Affine transformation
 **********************************************************/

const affine = (a: V3<number>, b: V3<number>): M3<number> => [a, b, [0, 0, 1]];

export const translate = (to: V2<number>): M3<number> =>
  spy(affine([1, 0, to[0]], [0, 1, to[1]]), res => [
    'translate to ' + showPoint(to),
    '\n' + showM3(res, showFixed_)
  ]);

export const scale = (s: Point2): M3<number> =>
  spy(affine([s[0], 0, 0], [0, s[1], 0]), res => [
    'scale k = ' + showPoint(s),
    '\n' + showM3(res, showFixed_)
  ]);

export const scaleTo = (s: Point2, center: Point2): M3<number> =>
  compose(translate(center), scale(s), translate(neg(center)));

export const scaleHomo = (k: number): M3<number> => scale([k, k]);

export const scaleHomoTo = (k: number, center: V2<number>): M3<number> =>
  scaleTo([k, k], center);

// todo: rotate, shear, reflect

/**********************************************************
 * todo: Perspective projection
 **********************************************************/

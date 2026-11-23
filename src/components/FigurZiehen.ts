// FigurZiehen: four corners of a quadrilateral on a grid, which the learner drags. The logic names the figure and
// counts what stays the same. All coordinates are whole numbers, so every test is exact.

export interface Point {
  x: number;
  y: number;
}

export const MAX_X = 10;
export const MAX_Y = 8;

/** The corners the figure starts with: a parallelogram. */
export const START: readonly Point[] = [
  { x: 1, y: 1 },
  { x: 5, y: 1 },
  { x: 7, y: 4 },
  { x: 3, y: 4 },
];

export type Kind =
  | "quadrat"
  | "rechteck"
  | "raute"
  | "parallelogramm"
  | "drachen"
  | "trapez"
  | "viereck"
  | "kein-viereck";

/** The order of the names a page gives in `names`. */
export const KINDS: readonly Kind[] = [
  "quadrat",
  "rechteck",
  "raute",
  "parallelogramm",
  "drachen",
  "trapez",
  "viereck",
  "kein-viereck",
];

export interface Facts {
  kind: Kind;
  /** Pairs of opposite sides that are parallel (0 to 2). */
  parallelPairs: number;
  /** Corners with a right angle (0 to 4). */
  rightAngles: number;
  /** Pairs of opposite sides of equal length (0 to 2). */
  equalOppositePairs: number;
  /** Whether all four sides are equal. */
  allSidesEqual: boolean;
}

const sub = (a: Point, b: Point): Point => ({ x: a.x - b.x, y: a.y - b.y });
const cross = (a: Point, b: Point) => a.x * b.y - a.y * b.x;
const dot = (a: Point, b: Point) => a.x * b.x + a.y * b.y;
const len2 = (a: Point, b: Point) => dot(sub(a, b), sub(a, b));

/** The sign of the turn a → b → c. */
const turn = (a: Point, b: Point, c: Point) => Math.sign(cross(sub(b, a), sub(c, b)));

/** Whether the segments ab and cd cross (also touching counts). */
function cross2(a: Point, b: Point, c: Point, d: Point): boolean {
  const d1 = turn(a, b, c);
  const d2 = turn(a, b, d);
  const d3 = turn(c, d, a);
  const d4 = turn(c, d, b);
  return d1 * d2 <= 0 && d3 * d4 <= 0;
}

/** A quadrilateral: no three corners on a line, and opposite sides do not cross. */
export function isQuadrilateral(p: readonly Point[]): boolean {
  if (p.length !== 4) return false;
  const [a, b, c, d] = p as [Point, Point, Point, Point];
  if (turn(a, b, c) === 0 || turn(b, c, d) === 0 || turn(c, d, a) === 0 || turn(d, a, b) === 0) return false;
  return !cross2(a, b, c, d) && !cross2(b, c, d, a);
}

export function analyse(p: readonly Point[]): Facts {
  if (!isQuadrilateral(p)) {
    return { kind: "kein-viereck", parallelPairs: 0, rightAngles: 0, equalOppositePairs: 0, allSidesEqual: false };
  }
  const [a, b, c, d] = p as [Point, Point, Point, Point];
  const turns = [turn(a, b, c), turn(b, c, d), turn(c, d, a), turn(d, a, b)];
  const convex = turns.every((t) => t === turns[0]);
  const s = [len2(a, b), len2(b, c), len2(c, d), len2(d, a)] as const;
  const par0 = cross(sub(b, a), sub(c, d)) === 0;
  const par1 = cross(sub(c, b), sub(d, a)) === 0;
  const corners = [
    dot(sub(b, a), sub(d, a)),
    dot(sub(a, b), sub(c, b)),
    dot(sub(b, c), sub(d, c)),
    dot(sub(c, d), sub(a, d)),
  ];
  const rightAngles = corners.filter((v) => v === 0).length;
  const parallelPairs = (par0 ? 1 : 0) + (par1 ? 1 : 0);
  const equalOppositePairs = (s[0] === s[2] ? 1 : 0) + (s[1] === s[3] ? 1 : 0);
  const allSidesEqual = s[0] === s[1] && s[1] === s[2] && s[2] === s[3];
  let kind: Kind;
  if (allSidesEqual && rightAngles === 4) kind = "quadrat";
  else if (parallelPairs === 2 && rightAngles === 4) kind = "rechteck";
  else if (parallelPairs === 2 && s[0] === s[1]) kind = "raute";
  else if (parallelPairs === 2) kind = "parallelogramm";
  else if (convex && ((s[0] === s[1] && s[2] === s[3]) || (s[1] === s[2] && s[3] === s[0]))) kind = "drachen";
  else if (parallelPairs === 1) kind = "trapez";
  else kind = "viereck";
  return { kind, parallelPairs, rightAngles, equalOppositePairs, allSidesEqual };
}

/** A corner moved to a grid point inside the board. */
export function clampPoint(x: number, y: number): Point {
  return { x: Math.min(MAX_X, Math.max(0, Math.round(x))), y: Math.min(MAX_Y, Math.max(0, Math.round(y))) };
}

/** A text of the props with {n} filled in. */
export const fill = (text: string, n: number | string) => text.replace(/\{n\}/g, String(n));

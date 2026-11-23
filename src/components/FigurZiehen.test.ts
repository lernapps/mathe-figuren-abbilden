import { expect, test } from "vite-plus/test";
import { START, analyse, clampPoint, isQuadrilateral } from "./FigurZiehen.ts";

const P = (...c: number[]) => Array.from({ length: c.length / 2 }, (_, i) => ({ x: c[2 * i]!, y: c[2 * i + 1]! }));

test("the named quadrilaterals are recognised", () => {
  expect(analyse(START).kind).toBe("parallelogramm");
  expect(analyse(P(1, 1, 4, 1, 4, 4, 1, 4)).kind).toBe("quadrat");
  expect(analyse(P(1, 1, 6, 1, 6, 4, 1, 4)).kind).toBe("rechteck");
  expect(analyse(P(1, 1, 4, 5, 7, 1, 4, -3)).kind).toBe("raute");
  expect(analyse(P(1, 1, 5, 1, 4, 4, 2, 4)).kind).toBe("trapez");
  expect(analyse(P(0, 2, 2, 0, 5, 2, 2, 6)).kind).toBe("viereck");
});

test("a kite has two pairs of equal neighbouring sides", () => {
  expect(analyse(P(2, 0, 5, 3, 2, 8, 0, 3)).kind).toBe("viereck");
  expect(analyse(P(3, 0, 6, 4, 3, 8, 0, 4)).kind).toBe("raute");
  expect(analyse(P(4, 0, 6, 3, 4, 8, 2, 3)).kind).toBe("drachen");
});

test("crossing sides or three corners on a line are no quadrilateral", () => {
  expect(isQuadrilateral(P(1, 1, 5, 4, 5, 1, 1, 4))).toBe(false);
  expect(isQuadrilateral(P(1, 1, 3, 1, 5, 1, 3, 4))).toBe(false);
  expect(analyse(P(1, 1, 5, 4, 5, 1, 1, 4)).kind).toBe("kein-viereck");
});

test("facts count what stays", () => {
  const f = analyse(P(1, 1, 6, 1, 6, 4, 1, 4));
  expect(f).toMatchObject({ parallelPairs: 2, rightAngles: 4, equalOppositePairs: 2, allSidesEqual: false });
});

test("a corner stays on the board", () => {
  expect(clampPoint(-3, 20)).toEqual({ x: 0, y: 8 });
  expect(clampPoint(3.6, 2.2)).toEqual({ x: 4, y: 2 });
});

import { expect, test } from "vite-plus/test";
import { AXIS, CX, CY, check, describe, generate, mistakes, params, reason, solution, wrong } from "./Spielbrett.ts";
import type { Mode } from "./Spielbrett.ts";

const props = {
  task: "Setze das Schiff auf P({x} | {y}).",
  mistakes: [
    "Du hast x und y vertauscht: P({a} | {b}) liegt woanders.",
    "Du hast ab 1 gezählt. Die Zählung beginnt bei 0.",
    "x stimmt.",
    "y stimmt.",
  ],
};

test("every task has a point inside the board; the solution passes, the mistakes fail", () => {
  for (let seed = 1; seed <= 50; seed++) {
    const task = generate(seed, props);
    expect(task.x).toBeGreaterThanOrEqual(1);
    expect(task.x).toBeLessThanOrEqual(7);
    expect(task.y).toBeGreaterThanOrEqual(1);
    expect(task.y).toBeLessThanOrEqual(5);
    expect(task.x).not.toBe(task.y);
    expect(generate(seed, props)).toEqual(task);
    expect(check(task, solution(task))).toBe(true);
    expect(check(task, wrong(task))).toBe(false);
    for (const answer of mistakes(task)) if (answer !== undefined) expect(check(task, answer)).toBe(false);
    expect(params(task, props, "de")).toMatchObject({ x: task.x, y: task.y });
  }
});

test("each typical mistake gets its message", () => {
  const task = { x: 3, y: 2, px: 3, py: 2, dx: 0, dy: 0 };
  expect(describe(task, props, "de")).toEqual({
    task: "Setze das Schiff auf P(3 | 2).",
    solution: "P(3 | 2): 3 Schritte nach rechts, 2 Schritte nach oben.",
  });
  expect(reason(task, { x: 2, y: 3 }, props)).toBe("Du hast x und y vertauscht: P(2 | 3) liegt woanders.");
  expect(reason(task, { x: 2, y: 1 }, props)).toBe("Du hast ab 1 gezählt. Die Zählung beginnt bei 0.");
  expect(reason(task, { x: 3, y: 6 }, props)).toBe("x stimmt.");
  expect(reason(task, { x: 6, y: 2 }, props)).toBe("y stimmt.");
  expect(reason(task, { x: 6, y: 6 }, props)).toBeUndefined();
});

test("reflect, shift and rotate keep the target on the board and the mistakes wrong", () => {
  for (const mode of ["mirror", "shift", "rotate"] as Mode[]) {
    const p = { ...props, mode };
    for (let seed = 1; seed <= 50; seed++) {
      const task = generate(seed, p);
      for (const v of [task.x, task.px]) {
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThanOrEqual(8);
      }
      for (const v of [task.y, task.py]) {
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThanOrEqual(6);
      }
      expect(check(task, solution(task))).toBe(true);
      for (const m of mistakes(task, p)) if (m !== undefined) expect(check(task, m)).toBe(false);
      if (mode === "mirror") expect(task.x + task.px).toBe(2 * AXIS);
      if (mode === "shift") expect([task.px + task.dx, task.py + task.dy]).toEqual([task.x, task.y]);
      if (mode === "rotate") {
        // a quarter turn counter-clockwise about Z: (a, b) becomes (−b, a)
        const a = task.px - CX;
        const b = task.py - CY;
        expect([CX - b, CY + a]).toEqual([task.x, task.y]);
      }
    }
  }
});

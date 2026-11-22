import { expect, test } from "vite-plus/test";
import { check, describe, generate, mistakes, params, reason, solution, wrong } from "./Spielbrett.ts";

const props = {
  task: "Setze das Schiff auf P({x} | {y}).",
  mistakes: [
    "Du hast x und y vertauscht: P({a} | {b}) liegt woanders.",
    "Du hast ab 1 gezählt. Die Zählung beginnt bei 0.",
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
    expect(params(task, props, "de")).toEqual({ x: task.x, y: task.y });
  }
});

test("each typical mistake gets its message", () => {
  const task = { x: 3, y: 2 };
  expect(describe(task, props, "de")).toEqual({
    task: "Setze das Schiff auf P(3 | 2).",
    solution: "P(3 | 2): 3 Schritte nach rechts, 2 Schritte nach oben.",
  });
  expect(reason(task, { x: 2, y: 3 }, props)).toBe("Du hast x und y vertauscht: P(2 | 3) liegt woanders.");
  expect(reason(task, { x: 4, y: 3 }, props)).toBe("Du hast ab 1 gezählt. Die Zählung beginnt bei 0.");
  expect(reason(task, { x: 6, y: 6 }, props)).toBeUndefined();
});

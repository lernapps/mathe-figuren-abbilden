import { expect, test } from "vite-plus/test";
import { ANGLES, check, describe, generate, mistakes, reason, solution, wrong } from "./WinkelAblesen.ts";

const props = {
  task: "Lies den Winkel ab.",
  mistakes: ["Du hast die falsche Skala benutzt: {a}° statt {w}°.", "Fast: {a}° ist nah dran, lies genauer ab."],
};

test("every task has an angle on the scale; the other scale is wrong", () => {
  for (let seed = 1; seed <= 50; seed++) {
    const task = generate(seed, props);
    expect(ANGLES).toContain(task.w);
    expect(generate(seed, props)).toEqual(task);
    expect(check(task, solution(task))).toBe(true);
    expect(check(task, wrong(task))).toBe(false);
    expect(wrong(task)).not.toBe(task.w);
    for (const a of mistakes(task)) if (a !== undefined) expect(check(task, a)).toBe(false);
  }
});

test("typical mistakes get their message", () => {
  const task = { w: 40 };
  expect(describe(task, props, "de").solution).toContain("40°");
  expect(reason(task, 140, props)).toBe("Du hast die falsche Skala benutzt: 140° statt 40°.");
  expect(reason(task, 45, props)).toBe("Fast: 45° ist nah dran, lies genauer ab.");
  expect(reason(task, 90, props)).toBeUndefined();
});

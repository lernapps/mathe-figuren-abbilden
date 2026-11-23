// WinkelAblesen: a protractor scale with an angle drawn on it. The learner reads the angle off the scale and types
// the number of degrees. The first leg lies on the 0 of the outer scale (on the right).

export interface Props {
  /** The task, with {w} for nothing shown before the answer is checked: the text never names the angle. */
  task: string;
  /** The app's message for each typical mistake, in the order of about.mistakes, with {w} and {a} (the answer). */
  mistakes?: readonly string[];
}

export interface Task {
  /** The angle in degrees. */
  w: number;
}

/** The degrees the learner read off. */
export type Answer = number;

function random(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** The angles of the tasks: multiples of 10 from 20 to 160 except 90 (there the two scales agree). */
export const ANGLES = [20, 30, 40, 50, 60, 70, 80, 100, 110, 120, 130, 140, 150, 160];

export function generate(seed: number, _props?: Props): Task {
  const next = random(seed);
  return { w: ANGLES[Math.floor(next() * ANGLES.length)] ?? 40 };
}

export const check = (task: Task, answer: Answer) => answer === task.w;
export const solution = (task: Task): Answer => task.w;
/** A wrong answer: the other scale. */
export const wrong = (task: Task): Answer => 180 - task.w;

/** The answers of the typical mistakes: read on the wrong scale. */
export const mistakes = (task: Task): (Answer | undefined)[] => [180 - task.w, undefined];

export const fill = (text: string, task: Task, answer?: Answer) =>
  text.replace(/\{w\}/g, String(task.w)).replace(/\{a\}/g, String(answer ?? ""));

export function reason(task: Task, answer: Answer, props: Props, _lang?: string): string | undefined {
  if (answer === 180 - task.w)
    return props.mistakes?.[0] === undefined ? undefined : fill(props.mistakes[0], task, answer);
  if (Math.abs(answer - task.w) <= 10)
    return props.mistakes?.[1] === undefined ? undefined : fill(props.mistakes[1], task, answer);
  return undefined;
}

export const show = (answer: Answer, _task?: Task, _props?: Props, _lang?: string) => `${answer}°`;

export function describe(task: Task, props: Props, _lang: string): { task: string; solution: string } {
  return {
    task: fill(props.task, task),
    solution: `${task.w}°: Der Schenkel steht bei ${task.w} auf der Skala, die bei 0 am ersten Schenkel beginnt.`,
  };
}

export const template = (props: Props, _lang: string) => props.task;
export const params = (task: Task, _props: Props, _lang: string): Record<string, number> => ({ w: task.w });

export const about = {
  task: "Ein Winkel ist an einem Halbkreis mit zwei Skalen von 0 bis 180 Grad eingezeichnet. Der erste Schenkel liegt rechts auf der 0 der äußeren Skala. Das Kind liest den Winkel ab, tippt die Gradzahl ein und drückt „Prüfen“.",
  answer: "Die Gradzahl als ganze Zahl.",
  correct: "Richtig, wenn die Zahl genau der Winkel w ist (ein Vielfaches von 10).",
  mistakes: [
    "Auf der falschen Skala abgelesen: 180 minus w statt w.",
    "Fast richtig, aber die Zahl weicht um höchstens 10 ab: zu ungenau abgelesen.",
  ],
};

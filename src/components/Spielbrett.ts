// Spielbrett: a board of the first quadrant (x 0 to 8, y 0 to 6). The task names a point P(x | y); the learner
// sets a marker on it by click, arrow keys or by typing both numbers. The logic is pure: the build tests it over
// fixed seeds (the exercise contract).

export interface Props {
  /** The task, with {x} and {y}. */
  task: string;
  /** The app's message for each typical mistake, in the order of about.mistakes, with {x}, {y}, {a} and {b} (the point set). */
  mistakes?: readonly string[];
}

export interface Task {
  x: number;
  y: number;
}

/** The point the learner set. */
export interface Answer {
  x: number;
  y: number;
}

export const MAX_X = 8;
export const MAX_Y = 6;

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

/** The task of `seed`: x from 1 to 7, y from 1 to 5, x and y different (so a swap is a mistake). */
export function generate(seed: number, _props?: Props): Task {
  const next = random(seed);
  const x = 1 + Math.floor(next() * 7);
  let y = 1 + Math.floor(next() * 5);
  if (y === x) y = (y % 5) + 1;
  return { x, y };
}

export function check(task: Task, answer: Answer): boolean {
  return answer.x === task.x && answer.y === task.y;
}

export function solution(task: Task): Answer {
  return { x: task.x, y: task.y };
}

/** A wrong answer: x and y swapped. */
export function wrong(task: Task): Answer {
  return { x: task.y, y: task.x };
}

/** The answers of the typical mistakes: x and y swapped; both one too far (counted from 1 instead of 0). */
export function mistakes(task: Task): (Answer | undefined)[] {
  return [
    { x: task.y, y: task.x },
    task.x + 1 <= MAX_X && task.y + 1 <= MAX_Y ? { x: task.x + 1, y: task.y + 1 } : undefined,
  ];
}

export const fill = (text: string, task: Task, answer?: Answer) =>
  text
    .replace(/\{x\}/g, String(task.x))
    .replace(/\{y\}/g, String(task.y))
    .replace(/\{a\}/g, String(answer?.x ?? ""))
    .replace(/\{b\}/g, String(answer?.y ?? ""));

export function reason(task: Task, answer: Answer, props: Props, _lang?: string): string | undefined {
  const index = mistakes(task).findIndex((m) => m !== undefined && m.x === answer.x && m.y === answer.y);
  const message = index < 0 ? undefined : props.mistakes?.[index];
  return message === undefined ? undefined : fill(message, task, answer);
}

export const show = (answer: Answer, _task?: Task, _props?: Props, _lang?: string) => `P(${answer.x} | ${answer.y})`;

export function describe(task: Task, props: Props, _lang: string): { task: string; solution: string } {
  return {
    task: fill(props.task, task),
    solution: `${show(solution(task))}: ${task.x} Schritte nach rechts, ${task.y} Schritte nach oben.`,
  };
}

export const template = (props: Props, _lang: string) => props.task;

export const params = (task: Task, _props: Props, _lang: string): Record<string, number> => ({ x: task.x, y: task.y });

export const about = {
  task: "Ein Spielbrett mit Gitter, x-Achse von 0 bis 8 waagerecht, y-Achse von 0 bis 6 senkrecht. Das Kind setzt einen Marker auf den Punkt P(x | y) aus der Aufgabe: per Klick, mit den Pfeiltasten oder durch Eintippen beider Zahlen, dann „Prüfen“.",
  answer: "Der gesetzte Punkt mit seinen beiden Koordinaten.",
  correct: "Richtig, wenn der Marker genau auf P(x | y) steht.",
  mistakes: [
    "x und y vertauscht: erst nach oben, dann nach rechts gegangen.",
    "Ab 1 statt ab 0 gezählt: der Marker steht je einen Schritt zu weit rechts und oben.",
  ],
};

// Spielbrett: a board of the first quadrant (x 0 to 8, y 0 to 6). The learner sets a marker by click, arrow keys or by
// typing both numbers. Four kinds of task (`mode`): set a point P(x | y); reflect a point at the vertical axis x = 4;
// shift a point by an arrow; rotate a point by 90° counter-clockwise about Z(3 | 2). The target always lies on the
// board. The logic is pure: the build tests it over fixed seeds (the exercise contract).

export type Mode = "set" | "mirror" | "shift" | "rotate";

export interface Props {
  /** The task, with {x} {y} (set), {px} {py} (the given point), {dx} {dy} (the arrow), {m} (the axis), {cx} {cy} (the centre). */
  task: string;
  /** What to do on the board. */
  hint?: string | undefined;
  mode?: Mode | undefined;
  /** The app's message for each typical mistake, in the order of about.mistakes, with the placeholders above and {a} {b} (the point set). */
  mistakes?: readonly string[];
}

export interface Task {
  /** The target the learner has to set. */
  x: number;
  y: number;
  /** The given point (for `set` the target itself, not shown). */
  px: number;
  py: number;
  /** The arrow of a shift. */
  dx: number;
  dy: number;
}

/** The point the learner set. */
export interface Answer {
  x: number;
  y: number;
}

export const MAX_X = 8;
export const MAX_Y = 6;
/** The vertical axis of a reflection: x = 4. */
export const AXIS = 4;
/** The centre of a rotation: Z(3 | 2). */
export const CX = 3;
export const CY = 2;

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

const pick = (next: () => number, from: readonly number[]): number =>
  from[Math.floor(next() * from.length)] ?? from[0] ?? 0;

/** The task of `seed`. */
export function generate(seed: number, props?: Props): Task {
  const next = random(seed);
  const mode = props?.mode ?? "set";
  if (mode === "mirror") {
    const px = pick(next, [1, 2, 3, 5, 6, 7]);
    const py = 1 + Math.floor(next() * 5);
    return { x: 2 * AXIS - px, y: py, px, py, dx: 0, dy: 0 };
  }
  if (mode === "shift") {
    const dx = pick(next, [1, 2, 3]);
    const dy = pick(
      next,
      [1, 2, 3].filter((d) => d !== dx),
    );
    const px = 1 + Math.floor(next() * (MAX_X - dx));
    const py = 1 + Math.floor(next() * (MAX_Y - dy - 1));
    return { x: px + dx, y: py + dy, px, py, dx, dy };
  }
  if (mode === "rotate") {
    const a = pick(next, [1, 2, 3]);
    const horizontal = next() < 0.5;
    return horizontal
      ? { x: CX, y: CY + a, px: CX + a, py: CY, dx: 0, dy: 0 }
      : { x: CX - a, y: CY, px: CX, py: CY + a, dx: 0, dy: 0 };
  }
  const x = 1 + Math.floor(next() * 7);
  let y = 1 + Math.floor(next() * 5);
  if (y === x) y = (y % 5) + 1;
  return { x, y, px: x, py: y, dx: 0, dy: 0 };
}

export const check = (task: Task, answer: Answer) => answer.x === task.x && answer.y === task.y;
export const solution = (task: Task): Answer => ({ x: task.x, y: task.y });
/** A wrong answer: the target swapped (or, when that is the target, moved by one). */
export const wrong = (task: Task): Answer =>
  task.x === task.y ? { x: task.x + 1, y: task.y } : { x: task.y, y: task.x };

const inside = (a: Answer): Answer | undefined =>
  a.x >= 0 && a.x <= MAX_X && a.y >= 0 && a.y <= MAX_Y ? a : undefined;

/** The answers of the typical mistakes (undefined where one lies outside the board). */
export function mistakes(task: Task, props?: Props): (Answer | undefined)[] {
  const mode = props?.mode ?? "set";
  let list: (Answer | undefined)[];
  if (mode === "mirror")
    list = [
      { x: task.px, y: task.py },
      { x: AXIS, y: task.py },
    ];
  else if (mode === "shift")
    list = [{ x: task.px, y: task.py }, inside({ x: task.px + task.dy, y: task.py + task.dx })];
  else if (mode === "rotate") {
    const horizontal = task.px > CX;
    const a = horizontal ? task.px - CX : task.py - CY;
    list = horizontal
      ? [inside({ x: CX, y: CY - a }), inside({ x: CX - a, y: CY })]
      : [inside({ x: CX + a, y: CY }), inside({ x: CX, y: CY - a })];
  } else {
    list = [{ x: task.y, y: task.x }, inside({ x: task.x + 1, y: task.y + 1 })];
  }
  // never the solution
  list = list.map((m) => (m !== undefined && check(task, m) ? undefined : m));
  return [...list, undefined, undefined];
}

export const fill = (text: string, task: Task, answer?: Answer) =>
  text
    .replace(/\{x\}/g, String(task.x))
    .replace(/\{y\}/g, String(task.y))
    .replace(/\{px\}/g, String(task.px))
    .replace(/\{py\}/g, String(task.py))
    .replace(/\{dx\}/g, String(task.dx))
    .replace(/\{dy\}/g, String(task.dy))
    .replace(/\{m\}/g, String(AXIS))
    .replace(/\{cx\}/g, String(CX))
    .replace(/\{cy\}/g, String(CY))
    .replace(/\{a\}/g, String(answer?.x ?? ""))
    .replace(/\{b\}/g, String(answer?.y ?? ""));

export function reason(task: Task, answer: Answer, props: Props, _lang?: string): string | undefined {
  const index = mistakes(task, props).findIndex((m) => m !== undefined && m.x === answer.x && m.y === answer.y);
  const message =
    index >= 0
      ? props.mistakes?.[index]
      : answer.x === task.x
        ? props.mistakes?.[2]
        : answer.y === task.y
          ? props.mistakes?.[3]
          : undefined;
  return message === undefined ? undefined : fill(message, task, answer);
}

export const show = (answer: Answer, _task?: Task, _props?: Props, _lang?: string) => `P(${answer.x} | ${answer.y})`;

export function describe(task: Task, props: Props, _lang: string): { task: string; solution: string } {
  const mode = props.mode ?? "set";
  const how: Record<Mode, string> = {
    set: `${task.x} Schritte nach rechts, ${task.y} Schritte nach oben.`,
    mirror: `Der Abstand zur Achse x = ${AXIS} bleibt gleich, die y-Koordinate auch.`,
    shift: `${task.px} + ${task.dx} = ${task.x} und ${task.py} + ${task.dy} = ${task.y}.`,
    rotate: `Eine Vierteldrehung gegen den Uhrzeigersinn um Z(${CX} | ${CY}).`,
  };
  return { task: fill(props.task, task), solution: `${show(solution(task))}: ${how[mode]}` };
}

export const template = (props: Props, _lang: string) => props.task;

export const params = (task: Task, _props: Props, _lang: string): Record<string, number> => ({
  x: task.x,
  y: task.y,
  px: task.px,
  py: task.py,
  dx: task.dx,
  dy: task.dy,
  m: AXIS,
  cx: CX,
  cy: CY,
});

export const about = {
  task: "Ein Spielbrett mit Gitter, x-Achse von 0 bis 8 waagerecht, y-Achse von 0 bis 6 senkrecht. Das Kind setzt einen Marker auf den gesuchten Punkt: per Klick, mit den Pfeiltasten oder durch Eintippen beider Zahlen, dann „Prüfen“. Je nach Aufgabe liegt der Punkt P(x | y) vor, oder ein gegebener Punkt wird an der senkrechten Achse x = 4 gespiegelt, um einen Pfeil verschoben oder um Z(3 | 2) um 90° gegen den Uhrzeigersinn gedreht.",
  answer: "Der gesetzte Punkt mit seinen beiden Koordinaten.",
  correct: "Richtig, wenn der Marker genau auf dem gesuchten Punkt steht.",
  mistakes: [
    "Erster typischer Fehler der Aufgabe: bei P(x | y) x und y vertauscht; beim Spiegeln, Verschieben der Originalpunkt; beim Drehen in die falsche Richtung gedreht.",
    "Zweiter typischer Fehler: bei P(x | y) ab 1 statt ab 0 gezählt; beim Spiegeln nur bis auf die Achse; beim Verschieben Pfeil mit vertauschten Zahlen; beim Drehen um 180° statt 90°.",
    "x richtig, y falsch.",
    "y richtig, x falsch.",
  ],
};

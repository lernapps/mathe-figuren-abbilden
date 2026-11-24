<script setup lang="ts">
// A quadrilateral whose four corners the learner drags on a grid (mouse, touch or arrow keys). Beside it the page
// says what the figure is and what stays the same. The logic is in FigurZiehen.ts.
import { computed, ref } from "vue";
import { KINDS, MAX_X, MAX_Y, START, analyse, clampPoint, fill } from "./FigurZiehen.ts";

const props = defineProps<{
  /** The label of the board for screen readers. */
  board: string;
  /** What to do, shown above the board. */
  hint: string;
  /** The label of one corner for screen readers, with {n} for its letter. */
  corner: string;
  /** The names of the figures in the order quadrat, rechteck, raute, parallelogramm, drachen, trapez, viereck, kein-viereck. */
  names: string[];
  /** The line "this is a …", with {n} for the name. */
  is: string;
  /** The facts, with {n} for the number: parallel pairs, right angles. */
  parallel: string;
  right: string;
  /** The text of the button that puts the corners back, and the note shown instead of a working button at the start. */
  reset: string;
  resetDone: string;
}>();

const points = ref(START.map((p) => ({ ...p })));
const STEP = 32;
const PAD = 28;
const LETTERS = ["A", "B", "C", "D"];
const facts = computed(() => analyse(points.value));
const name = computed(() => props.names[KINDS.indexOf(facts.value.kind)] ?? "");
const dragging = ref<number | undefined>(undefined);

const px = (x: number) => PAD + x * STEP;
const py = (y: number) => PAD + (MAX_Y - y) * STEP;
const shape = computed(() => points.value.map((p) => `${px(p.x)},${py(p.y)}`).join(" "));

function move(index: number, x: number, y: number): void {
  points.value[index] = clampPoint(x, y);
}

function onDown(index: number, event: PointerEvent): void {
  dragging.value = index;
  (event.currentTarget as Element).setPointerCapture?.(event.pointerId);
}

function onMove(event: PointerEvent): void {
  if (dragging.value === undefined) return;
  const svg = (event.currentTarget as Element).closest("svg") as SVGSVGElement;
  const rect = svg.getBoundingClientRect();
  const scale = (PAD * 2 + MAX_X * STEP) / rect.width;
  move(
    dragging.value,
    ((event.clientX - rect.left) * scale - PAD) / STEP,
    (PAD + MAX_Y * STEP - (event.clientY - rect.top) * scale) / STEP,
  );
}

function onUp(): void {
  dragging.value = undefined;
}

function onKey(index: number, event: KeyboardEvent): void {
  const moves: Record<string, [number, number]> = {
    ArrowRight: [1, 0],
    ArrowLeft: [-1, 0],
    ArrowUp: [0, 1],
    ArrowDown: [0, -1],
  };
  const step = moves[event.key];
  if (step === undefined) return;
  event.preventDefault();
  const p = points.value[index]!;
  move(index, p.x + step[0], p.y + step[1]);
}

function back(): void {
  points.value = START.map((p) => ({ ...p }));
}

const atStart = computed(() => points.value.every((p, i) => p.x === START[i]?.x && p.y === START[i]?.y));
const width = PAD * 2 + MAX_X * STEP;
const height = PAD * 2 + MAX_Y * STEP;
</script>

<template>
  <div class="figur-ziehen">
    <p>{{ hint }}</p>
    <svg :viewBox="`0 0 ${width} ${height}`" class="fz-svg" role="group" :aria-label="board">
      <rect :width="width" :height="height" class="fz-bg" />
      <g class="fz-grid">
        <line v-for="i in MAX_X + 1" :key="'v' + i" :x1="px(i - 1)" :y1="py(0)" :x2="px(i - 1)" :y2="py(MAX_Y)" />
        <line v-for="j in MAX_Y + 1" :key="'h' + j" :x1="px(0)" :y1="py(j - 1)" :x2="px(MAX_X)" :y2="py(j - 1)" />
      </g>
      <polygon :points="shape" class="fz-shape" />
      <g v-for="(p, i) in points" :key="i">
        <circle
          :cx="px(p.x)"
          :cy="py(p.y)"
          r="11"
          class="fz-corner"
          tabindex="0"
          role="button"
          :aria-label="fill(corner, LETTERS[i] ?? '') + ' (' + p.x + ' | ' + p.y + ')'"
          @pointerdown="onDown(i, $event)"
          @pointermove="onMove"
          @pointerup="onUp"
          @pointercancel="onUp"
          @keydown="onKey(i, $event)"
        />
        <text :x="px(p.x) + 14" :y="py(p.y) - 12" class="fz-letter">{{ LETTERS[i] }}</text>
      </g>
    </svg>
    <ul class="fz-facts" aria-live="polite">
      <li>
        <strong>{{ fill(is, name) }}</strong>
      </li>
      <li>{{ fill(parallel, facts.parallelPairs) }}</li>
      <li>{{ fill(right, facts.rightAngles) }}</li>
    </ul>
    <p class="fz-reset-row">
      <button type="button" class="fz-reset" :disabled="atStart" @click="back">{{ reset }}</button>
      <span v-if="atStart" class="fz-reset-note">{{ resetDone }}</span>
    </p>
  </div>
</template>

<style scoped>
.fz-svg {
  display: block;
  width: 100%;
  max-width: 28rem;
  touch-action: none;
}
.fz-bg {
  fill: var(--page-surface);
}
.fz-grid line {
  stroke: var(--page-border);
}
.fz-shape {
  fill: var(--page-accent);
  fill-opacity: 0.25;
  stroke: var(--page-accent);
  stroke-width: 3;
}
.fz-corner {
  fill: var(--page-accent);
  stroke: var(--page-text);
  stroke-width: 2;
  cursor: grab;
}
.fz-corner:focus-visible {
  stroke-width: 4;
  outline: 2px solid var(--page-text);
  outline-offset: 2px;
}
.fz-letter {
  fill: var(--page-text);
  font-size: 15px;
  font-weight: bold;
  font-family: sans-serif;
}
.fz-facts {
  margin: 0.5rem 0;
  padding-left: 1.2rem;
}
.fz-reset-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1rem;
  margin: 0.25rem 0 0;
}
/* the look of the runtime's buttons: a frame in the accent colour, the page's background */
.fz-reset {
  font: inherit;
  min-height: 2.75rem;
  padding: 0.5rem 1rem;
  border: 2px solid var(--page-accent);
  border-radius: 0.375rem;
  background: var(--page-background);
  color: var(--page-accent);
  cursor: pointer;
}
.fz-reset:disabled {
  cursor: default;
  opacity: 0.6;
}
.fz-reset:focus-visible {
  outline: 3px solid var(--page-text);
  outline-offset: 2px;
}
.fz-reset-note {
  color: var(--page-muted);
}
</style>

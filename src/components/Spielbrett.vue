<script setup lang="ts">
// A board of the first quadrant for the task of the number seed. The learner sets a marker by click, with the
// arrow keys on the board, or with the two number fields; it emits the point with answer. The explainer draws
// "Prüfen" and gives the feedback (logic in Spielbrett.ts).
import { computed, ref } from "vue";
import { AXIS, CX, CY, MAX_X, MAX_Y, fill, generate } from "./Spielbrett.ts";

const props = defineProps<{
  /** The task, with {x} and {y}. */
  task: string;
  /** What to do on the board. */
  hint: string;
  /** The kind of task: set a point (default), reflect, shift or rotate a given point. */
  mode?: "set" | "mirror" | "shift" | "rotate";
  /** The app's message for each typical mistake, in the order of about.mistakes. */
  mistakes: string[];
  /** The label of the board for screen readers. */
  board: string;
  /** The label of the field for x and for y. */
  xLabel: string;
  yLabel: string;
  /** The line below the board, with {a} and {b} for the marker; and the one before a marker is set. */
  position: string;
  none: string;
  /** The task number, which the explainer gives. */
  seed: number;
  /** Whether the explainer checked the answer now set. */
  checked: boolean;
}>();
const emit = defineEmits<{ answer: [{ x: number; y: number }] }>();

const current = computed(() => generate(props.seed, props));
const x = ref<number | undefined>(undefined);
const y = ref<number | undefined>(undefined);
const typedX = ref("");
const typedY = ref("");
const STEP = 40;
const PAD = 30;

function set(nx: number, ny: number): void {
  x.value = Math.min(MAX_X, Math.max(0, Math.round(nx)));
  y.value = Math.min(MAX_Y, Math.max(0, Math.round(ny)));
  emit("answer", { x: x.value, y: y.value });
}

function sync(): void {
  typedX.value = String(x.value);
  typedY.value = String(y.value);
}

function onField(which: "x" | "y", event: Event): void {
  const raw = (event.target as HTMLInputElement).value;
  if (which === "x") typedX.value = raw;
  else typedY.value = raw;
  const a = Number(typedX.value);
  const b = Number(typedY.value);
  // a point is set only once both fields hold a number inside the board
  if (typedX.value === "" || typedY.value === "" || Number.isNaN(a) || Number.isNaN(b)) return;
  if (a < 0 || a > MAX_X || b < 0 || b > MAX_Y) return;
  x.value = a;
  y.value = b;
  emit("answer", { x: a, y: b });
}

function onClick(event: MouseEvent): void {
  const svg = event.currentTarget as SVGSVGElement;
  const rect = svg.getBoundingClientRect();
  const scale = (PAD * 2 + MAX_X * STEP) / rect.width;
  const mx = (event.clientX - rect.left) * scale;
  const my = (event.clientY - rect.top) * scale;
  set((mx - PAD) / STEP, (PAD + MAX_Y * STEP - my) / STEP);
  sync();
}

function onKey(event: KeyboardEvent): void {
  const moves: Record<string, [number, number]> = {
    ArrowRight: [1, 0],
    ArrowLeft: [-1, 0],
    ArrowUp: [0, 1],
    ArrowDown: [0, -1],
  };
  const move = moves[event.key];
  if (move === undefined) return;
  event.preventDefault();
  if (x.value === undefined || y.value === undefined) set(0, 0);
  else set(x.value + move[0], y.value + move[1]);
  sync();
}

const px = (v: number) => PAD + v * STEP;
const py = (v: number) => PAD + (MAX_Y - v) * STEP;
const width = PAD * 2 + MAX_X * STEP;
const height = PAD * 2 + MAX_Y * STEP;
const text = computed(() =>
  x.value === undefined || y.value === undefined
    ? props.none
    : props.position.replace(/\{a\}/g, String(x.value)).replace(/\{b\}/g, String(y.value)),
);
</script>

<template>
  <div class="spielbrett">
    <p>{{ fill(task, current) }}</p>
    <p>{{ hint }}</p>
    <svg
      :viewBox="`0 0 ${width} ${height}`"
      class="spielbrett-svg"
      :class="{ 'spielbrett-checked': checked }"
      role="application"
      tabindex="0"
      :aria-label="board"
      @click="onClick"
      @keydown="onKey"
    >
      <rect :width="width" :height="height" class="spielbrett-bg" />
      <g class="spielbrett-grid">
        <line
          v-for="i in MAX_X + 1"
          :key="'v' + i"
          :x1="PAD + (i - 1) * STEP"
          :y1="PAD"
          :x2="PAD + (i - 1) * STEP"
          :y2="PAD + MAX_Y * STEP"
        />
        <line
          v-for="j in MAX_Y + 1"
          :key="'h' + j"
          :x1="PAD"
          :y1="PAD + (j - 1) * STEP"
          :x2="PAD + MAX_X * STEP"
          :y2="PAD + (j - 1) * STEP"
        />
      </g>
      <g class="spielbrett-axes">
        <line :x1="PAD" :y1="PAD + MAX_Y * STEP" :x2="PAD + MAX_X * STEP + 10" :y2="PAD + MAX_Y * STEP" />
        <line :x1="PAD" :y1="PAD + MAX_Y * STEP" :x2="PAD" :y2="PAD - 10" />
        <text
          v-for="i in MAX_X + 1"
          :key="'tx' + i"
          :x="PAD + (i - 1) * STEP"
          :y="PAD + MAX_Y * STEP + 18"
          text-anchor="middle"
        >
          {{ i - 1 }}
        </text>
        <text v-for="j in MAX_Y" :key="'ty' + j" :x="PAD - 8" :y="PAD + (MAX_Y - j) * STEP + 5" text-anchor="end">
          {{ j }}
        </text>
      </g>
      <line
        v-if="mode === 'mirror'"
        :x1="px(AXIS)"
        :y1="PAD - 8"
        :x2="px(AXIS)"
        :y2="PAD + MAX_Y * STEP"
        class="spielbrett-axis"
      />
      <g v-if="mode === 'rotate'">
        <circle :cx="px(CX)" :cy="py(CY)" r="5" class="spielbrett-centre" />
        <text :x="px(CX) + 8" :y="py(CY) + 18" class="spielbrett-given">Z</text>
      </g>
      <g v-if="mode !== undefined && mode !== 'set'">
        <circle :cx="px(current.px)" :cy="py(current.py)" r="8" class="spielbrett-given-dot" />
        <text :x="px(current.px) + 10" :y="py(current.py) - 10" class="spielbrett-given">P</text>
      </g>
      <g v-if="x !== undefined && y !== undefined">
        <circle :cx="PAD + x * STEP" :cy="PAD + (MAX_Y - y) * STEP" r="8" class="spielbrett-marker" />
        <path
          :d="`M${PAD + x * STEP - 5} ${PAD + (MAX_Y - y) * STEP - 5} l10 10 m0 -10 l-10 10`"
          class="spielbrett-cross"
        />
      </g>
    </svg>
    <div class="spielbrett-fields">
      <label>
        {{ xLabel }}
        <input type="number" inputmode="numeric" min="0" :max="MAX_X" :value="typedX" @input="onField('x', $event)" />
      </label>
      <label>
        {{ yLabel }}
        <input type="number" inputmode="numeric" min="0" :max="MAX_Y" :value="typedY" @input="onField('y', $event)" />
      </label>
    </div>
    <p aria-live="polite">{{ text }}</p>
  </div>
</template>

<style scoped>
.spielbrett-svg {
  display: block;
  width: 100%;
  max-width: 24rem;
  touch-action: manipulation;
}
.spielbrett-bg {
  fill: var(--page-surface);
}
.spielbrett-grid line {
  stroke: var(--page-border);
}
.spielbrett-axes line {
  stroke: var(--page-text);
  stroke-width: 2;
}
.spielbrett-axes text {
  fill: var(--page-text);
  font-size: 14px;
  font-family: sans-serif;
}
.spielbrett-axis {
  stroke: var(--page-text);
  stroke-width: 3;
  stroke-dasharray: 8 5;
}
.spielbrett-given-dot {
  fill: var(--page-surface);
  stroke: var(--page-text);
  stroke-width: 3;
}
.spielbrett-centre {
  fill: var(--page-text);
}
.spielbrett-given {
  fill: var(--page-text);
  font-size: 15px;
  font-weight: bold;
  font-family: sans-serif;
}
.spielbrett-marker {
  fill: var(--page-accent);
  stroke: var(--page-text);
  stroke-width: 3;
}
.spielbrett-checked .spielbrett-marker {
  opacity: 0.75;
}
.spielbrett-fields {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  margin-top: 0.5rem;
}
.spielbrett-fields label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.spielbrett-fields input {
  min-height: 2.75rem;
  width: 5rem;
}
</style>

<script setup lang="ts">
// A protractor with an angle for the task of the number seed; the learner types the degrees. It emits the number
// with answer; the explainer draws "Prüfen". The logic is in WinkelAblesen.ts.
import { computed, ref } from "vue";
import { generate } from "./WinkelAblesen.ts";

const props = defineProps<{
  /** The task. */
  task: string;
  /** The label of the field. */
  label: string;
  /** What the picture shows for screen readers, without the angle. */
  picture: string;
  /** The app's message for each typical mistake, in the order of about.mistakes. */
  mistakes: string[];
  /** The task number, which the explainer gives. */
  seed: number;
  /** Whether the explainer checked the answer now typed. */
  checked: boolean;
}>();
const emit = defineEmits<{ answer: [number | undefined] }>();

const current = computed(() => generate(props.seed));
const typed = ref("");
const R = 130;
const cx = 160;
const cy = 150;
const pos = (deg: number, r: number) => ({
  x: cx + r * Math.cos((deg * Math.PI) / 180),
  y: cy - r * Math.sin((deg * Math.PI) / 180),
});
const ticks = Array.from({ length: 19 }, (_, i) => i * 10);
const leg = computed(() => pos(current.value.w, R + 10));

function onInput(event: Event): void {
  typed.value = (event.target as HTMLInputElement).value;
  // "110", "110°", "110 °" and "110 Grad" all count
  const match = /^\s*(\d{1,3})\s*(°|grad)?\s*$/i.exec(typed.value);
  emit("answer", match?.[1] === undefined ? undefined : Number(match[1]));
}
</script>

<template>
  <div class="winkel-ablesen">
    <p>{{ task }}</p>
    <svg viewBox="0 0 320 175" class="wa-svg" role="img" :aria-label="picture">
      <path :d="`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy} Z`" class="wa-body" />
      <line :x1="cx" :y1="cy" :x2="cx + R + 10" :y2="cy" class="wa-leg" />
      <line :x1="cx" :y1="cy" :x2="leg.x" :y2="leg.y" class="wa-leg wa-angle" />
      <g v-for="d in ticks" :key="d">
        <line
          :x1="pos(d, R).x"
          :y1="pos(d, R).y"
          :x2="pos(d, R - (d % 30 === 0 ? 14 : 8)).x"
          :y2="pos(d, R - (d % 30 === 0 ? 14 : 8)).y"
          class="wa-tick"
        />
        <text v-if="d % 30 === 0" :x="pos(d, R - 24).x" :y="pos(d, R - 24).y + 4" text-anchor="middle" class="wa-num">
          {{ d }}
        </text>
        <text
          v-if="d % 30 === 0 && d > 0 && d < 180"
          :x="pos(d, R - 40).x"
          :y="pos(d, R - 40).y + 4"
          text-anchor="middle"
          class="wa-num wa-inner"
        >
          {{ 180 - d }}
        </text>
      </g>
      <circle :cx="cx" :cy="cy" r="4" class="wa-center" />
    </svg>
    <label class="wa-field">
      {{ label }}
      <input type="text" inputmode="numeric" :value="typed" autocomplete="off" @input="onInput" />
    </label>
  </div>
</template>

<style scoped>
.wa-svg {
  display: block;
  width: 100%;
  max-width: 22rem;
}
.wa-body {
  fill: var(--page-surface);
  stroke: var(--page-border);
  stroke-width: 2;
}
.wa-leg {
  stroke: var(--page-text);
  stroke-width: 2;
}
.wa-angle {
  stroke: var(--page-accent);
  stroke-width: 4;
}
.wa-tick {
  stroke: var(--page-text);
}
.wa-num {
  fill: var(--page-text);
  font-size: 11px;
  font-family: sans-serif;
}
.wa-inner {
  fill: var(--page-muted);
}
.wa-center {
  fill: var(--page-text);
}
.wa-field {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.wa-field input {
  min-height: 2.75rem;
  width: 6rem;
}
</style>

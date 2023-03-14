<template>
  <main>
    <Meters :items="meters" />
    <button @click="toggleMaintenance">
      Toggle Maintenance Mode ({{ maintenanceMode ? 'on' : 'off' }})
    </button>
  </main>
</template>
<script lang="ts" setup>
// acceptable values
const temps = ['cold', 'cool', 'warm', 'hot', 'overheating'];
const huggables = ['friend', 'snake', 'cat', 'dog'];

// midnight (tonight)
const countdownTo = new Date();
countdownTo.setHours(23, 59, 59, 0);

// initialize values
const numValue = ref(100);
const tempValue = ref('cool');
const huggableValue = ref('friend');
const dateValue = ref(countdownTo);
const maintenanceMode = ref(false);
const dynamicHandler = ref(null);
const tick = ref(0);

let meters = [
  // value/ref, handler, label, tick (forces refresh)
  [tempValue, useTempToRange, 'TEMPURATURE (string)'],
  [huggableValue, useHuggableToRange, 'Hugability (string)'],
  [dateValue, useCountdownToRange, 'Time Remaining in Day (date)', tick],
  [numValue, null, 'Percent (number)'],
  [tempValue, dynamicHandler, 'TEMPURATURE (string w/ dynamic handler)'],
];

let otherHandler = function (input) {
  return { value: 1, color: '#111', text: 'OFFLINE / MAINTENANCE' };
};

setInterval(() => {
  // randomize number
  numValue.value = Math.round(Math.random() * 100);

  // randomize value
  tempValue.value = temps[Math.floor(Math.random() * temps.length)];

  // step through values
  huggableValue.value = huggables[tick.value % huggables.length];

  // update dynamic handler based on maintenance mode
  dynamicHandler.value = maintenanceMode.value ? otherHandler : useTempToRange;

  // step forward
  tick.value++;
}, 1000);

const toggleMaintenance = () => {
  maintenanceMode.value = !maintenanceMode.value;
};
</script>
<style lang="scss">
html,
body,
#__nuxt {
  height: 100%;
}
main {
  font-family: sans-serif;
  display: grid;
  justify-content: center;
  align-content: center;
  height: 100%;
}
div {
  display: grid;
  gap: 1rem;
}

@keyframes fade {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}
</style>

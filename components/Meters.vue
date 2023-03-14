<template>
  <div>
    <Meter
      v-for="[value, fn, label, tick, style] in items"
      :label="label"
      :value="value"
      :fn="fn"
      :tick="tick || 0"
      :style="style"
    />
  </div>
</template>
<script lang="ts" setup>
const { items } = defineProps<{ items: any[] }>();
</script>

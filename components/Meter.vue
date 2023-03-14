<template>
  <div class="meter">
    <div class="meter__label" v-if="label" v-html="label" />
    <div class="meter__indicator">
      <span
        class="meter__value"
        :style="labelStyles"
        v-html="valueLabel"
      ></span>
      <span class="meter__bar" :style="styleObject"></span>
    </div>
  </div>
</template>
<script lang="ts" setup>
let props = withDefaults(
  defineProps<{ fn?: any; value: any; label?: string; tick?: any }>(),
  {
    value: 0,
  }
);

let handler;

const meterConfig = ref();
const valueLabel = ref('');
const labelStyles = ref({ mixBlendMode: 'none' });

const styleObject = computed(() => {
  props.tick?.value; // force computation

  handler = typeof props.fn === 'function' ? props.fn : props.fn?.value;
  handler ||= (input) => ({ color: '#ffffff', value: input / 100 });

  meterConfig.value = handler(props.value?.value ?? props.value);
  if (meterConfig.value) {
    labelStyles.value = meterConfig.value?.labelStyles;
  }
  valueLabel.value =
    meterConfig?.value.text || props.value?.value || props.value;
  return {
    background: meterConfig.value?.color || '#ffffff',
    width: `${(meterConfig.value?.value || 0) * 100}%`,
    ...meterConfig.value?.styles,
  };
});
</script>
<style lang="scss">
.meter {
  &__indicator {
    box-sizing: border-box;
    position: relative;
    background: #333333;
    width: 100%;
    padding: 0.25rem;
    height: 1.9rem;
  }
  &__value {
    color: inherit;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    text-align: center;
    transform: translate(-50%, -50%);
    mix-blend-mode: difference;
    color: #fff;
    z-index: 2;
  }
  &__bar {
    transition: all 0.5s;
    box-sizing: border-box;
    display: inline-block;
    height: 100%;
    min-width: 1px;
    width: 0;
    padding: 0.25rem;
    background: #fafafa;
  }
}
</style>

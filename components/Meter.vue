<template>
  <div :data-tick="props.tick" class="meter" :class="[`meter--${style}`]">
    <div class="meter__label" v-if="label" v-html="label" />
    <div class="meter__indicator" v-if="props.style === 'horizontal'">
      <span
        class="meter__value"
        :style="labelStyles"
        v-html="valueLabel"
      ></span>
      <span class="meter__bar" :style="styleObject"></span>
    </div>
    <div class="meter__indicator" v-else-if="props.style === 'round'">
      <span
        class="meter__value"
        :style="labelStyles"
        v-html="valueLabel"
      ></span>
      <svg
        id="svg"
        class="meter__bar"
        viewBox="0 0 100 100"
        viewPort="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          id="bar"
          r="45"
          cx="50"
          cy="50"
          stroke-width="10"
          stroke-dasharray="280"
          :style="{
            strokeDashoffset: 0,
            strokeDashoffset: 280 - meterConfig.value * 280,
            stroke: meterConfig.color,
          }"
        ></circle>
      </svg>
    </div>
  </div>
</template>
<script lang="ts" setup>
let props = withDefaults(
  defineProps<{
    fn?: any;
    value: any;
    label?: string;
    tick?: any;
    style?: 'horizontal' | 'vertical' | 'round';
  }>(),
  {
    value: 0,
    style: 'horizontal',
  }
);

const defaultHandler = (input) => {
  let color = '#ffffff';
  switch (true) {
    case input < 25:
      color = 'red';
      break;
    case input < 50:
      color = 'orange';
      break;
    case input < 75:
      color = 'yellow';
      break;
    default:
      color = 'green';
  }
  return { color, value: input / 100 };
};

const valueLabel = computed(
  () => meterConfig?.value.text || props.value?.value || props.value
);
const labelStyles = computed(() => meterConfig.value?.labelStyles);
const strokeDashoffset = 10;

const meterConfig = computed(() => {
  return typeof handler?.value === 'function'
    ? handler.value(props.value?.value ?? props.value)
    : typeof handler === 'function'
    ? handler(props.value?.value ?? props.value)
    : {};
});

const handler = computed(() => {
  let h = typeof props.fn === 'function' ? props.fn : props.fn?.value;
  h ||= defaultHandler;
  return h;
});

const styleObject = computed(() => {
  if (props.style === 'round') {
    return {
      background: meterConfig.value?.color || '#ffffff',
      width: `${(meterConfig.value?.value || 0) * 100}%`,
      ...meterConfig.value?.styles,
    };
  } else {
    return {
      background: meterConfig.value?.color || '#ffffff',
      width: `${(meterConfig.value?.value || 0) * 100}%`,
      ...meterConfig.value?.styles,
    };
  }
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

  &--horizontal {
    .meter {
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
  }
  &--round {
    border-radius: 50%;
    width: 10rem;
    height: 10rem;
    position: relative;
    .meter {
      &__value {
        font-size: 3rem;
      }
      &__indicator {
        box-sizing: border-box;
        width: 10rem;
        height: 10rem;
        border-radius: 50%;
        overflow: hidden;
      }
      &__bar {
        transform: rotate(90deg);
        width: 100%;
        height: 100%;
        stroke-dasharray: 251;
        stroke-dashoffset: 251;
        circle {
          transition: all 0.5s;
        }
      }
    }
  }
}
</style>

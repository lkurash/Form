<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input type="text" v-model="field.value" />
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'

const props = defineProps<{ label?: string; path: string; modelValue: Record<string, string> }>()
const emit = defineEmits(['update:modelValue'])

const field = reactive<{ value: string }>({ value: props.modelValue[props.path] || '' })

watch(
  () => field.value,
  (newValue) => {
    console.log(props.modelValue);

    const updatedValue = { ...props.modelValue, [props.path]: newValue }
    emit('update:modelValue', updatedValue)
  }
)
</script>

<style scoped></style>

<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select v-model="field.value">
      <template v-for="option in options" :key="option">
        <option :value="option">{{ option }}</option>
      </template>
    </select>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'

const props = defineProps<{
  label?: string
  path: string
  modelValue: Record<string, string>
  options: string[]
}>()
const emit = defineEmits(['update:modelValue'])

const field = reactive<{ value: string }>({ value: props.modelValue[props.path] })

watch(
  () => field.value,
  (newValue) => {
    const updatedValue = { ...props.modelValue, [props.path]: newValue }
    emit('update:modelValue', updatedValue)
  }
)
</script>

<style scoped></style>

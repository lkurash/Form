<template>
  <text-field
    :label="props.label"
    :path="props.path"
    :modelValue="modelValue"
    @update:modelValue="updateModelValue"
    :rules="rules"
  ></text-field>
</template>

<script setup lang="ts">
import TextField from '../TextField.vue'

const props = defineProps<{
  path: string
  modelValue: {
    form: Record<string, string>
    errors: Record<string, { message: string }>
  }
}>()
const emit = defineEmits(['update:modelValue'])

function updateModelValue(updatedValue: Record<string, string>) {
  emit('update:modelValue', updatedValue)
}

function rules(value: any) {
  const normalizedValue = value.replace(/,/g, '.').trim()
  const numericValue = +normalizedValue

  if (isNaN(numericValue) || typeof numericValue !== 'number') {
    return { message: 'Please, input a valid number' }
  } else {
    return {}
  }
}
</script>

<style scoped></style>

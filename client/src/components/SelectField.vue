<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select v-model="field.value">
      <template v-for="option in options" :key="option">
        <option :value="option">{{ option }}</option>
      </template>
    </select>
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue'

const props = defineProps<{
  label?: string
  path: string
  modelValue: Record<string, string>
  options: string[]
}>()
const emit = defineEmits(['update:modelValue'])

const field = reactive<{ value: string }>({ value: props.modelValue.form[props.path] })

watch(
  () => field.value,
  (newValue) => {
    const updatedValue = { ...props.modelValue.form, [props.path]: newValue }
    emit('update:modelValue', updatedValue)
  }
)

const errorMessage = computed(() => {
  if (!props.modelValue.errors?.[props.path]) return ''

  return props.modelValue.errors[props.path].message
})
</script>

<style scoped></style>

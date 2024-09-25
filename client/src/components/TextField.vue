<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input type="text" v-model="field.value" :disabled="props.disabled" />
    <span v-if="maxValue">{{ remainingChars }}</span>
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
  modelValue: Record<string, any>
  maxValue: boolean
  disabled: boolean
  rules?: () => void
}>()

const emit = defineEmits(['update:modelValue'])
const field = reactive<{ value: string }>({
  value: props.modelValue.form[props.path] || ''
})

watch(
  () => field.value,
  (newValue, oldValue) => {
    if (props.maxValue && newValue.length > 255) {
      field.value = oldValue
    } else {
      if (props.rules && props.rules(newValue).message) {
        validateError(newValue)
      } else {
        const updatedValue = { ...props.modelValue.form, [props.path]: newValue }
        emit('update:modelValue', updatedValue)
      }
    }
  }
)

watch(
  () => props.modelValue.form[props.path],
  (newValue) => {
    field.value = newValue
  }
)

const remainingChars = computed(() => 255 - field.value.length)

const errorMessage = computed(() => {
  if (!props.modelValue.errors?.[props.path]) return ''

  return props.modelValue.errors[props.path].message
})

function validateError(newValue) {
  console.log(newValue)

  const updatedValue = { ...props.modelValue.errors, [props.path]: props.rules(newValue) }
  emit('update:modelValue', { errors: updatedValue })
}
</script>

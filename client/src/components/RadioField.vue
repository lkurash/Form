<template>
  <div>
    <label v-if="props.label">{{ props.label }}</label>
    <div>
      <input type="radio" id="yes" :value="true" v-model="field.value" :name="props.path" />
      <label for="yes">Yes</label>

      <input type="radio" id="no" :value="false" v-model="field.value" :name="props.path" />
      <label for="no">No</label>
    </div>
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue'

const props = defineProps<{ label?: string; path: string; modelValue: Record<string, boolean> }>()
const emit = defineEmits(['update:modelValue'])

const field = reactive<{ value: boolean | null }>({ value: props.modelValue.form[props.path] })

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

<template>
  <div>
    <label v-if="props.label">{{ props.label }}</label>
    <div>
      <input type="radio" id="yes" :value="true" v-model="field.value" :name="props.path" />
      <label for="yes">Yes</label>

      <input type="radio" id="no" :value="false" v-model="field.value" :name="props.path" />
      <label for="no">No</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'

const props = defineProps<{ label?: string; path: string; modelValue: Record<string, boolean> }>()
const emit = defineEmits(['update:modelValue'])

const field = reactive<{ value: boolean | null }>({ value: props.modelValue[props.path] })

watch(
  () => field.value,
  (newValue) => {
    const updatedValue = { ...props.modelValue, [props.path]: newValue }
    emit('update:modelValue', updatedValue)
  }
)
</script>

<style scoped></style>

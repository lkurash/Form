<template>
  <select-field
    label="VAT"
    :path="props.path"
    :modelValue="modelValue"
    @update:modelValue="updateModelValue"
    :options="['19%', '21%', '23%', '25%']"
  ></select-field>
</template>

<script setup lang="ts">
import SelectField from './SelectField.vue'

const props = defineProps<{
  path: string
  modelValue: Record<string, string>
}>()
const emit = defineEmits(['update:modelValue'])

function updateModelValue(updatedValue: Record<string, string>) {
  emit('update:modelValue', updatedValue)
}
</script>

<style scoped></style>

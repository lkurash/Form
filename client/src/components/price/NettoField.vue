<template>
  <text-field
    :label="props.label"
    :path="props.path"
    :modelValue="modelValue"
    @update:modelValue="updateModelValue"
  ></text-field>
</template>

<script setup lang="ts">
import TextField from '../TextField.vue'

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

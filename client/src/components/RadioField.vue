<template>
  <div>
    <label v-if="props.label">{{ props.label }}</label>
    <input type="radio" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ label?: string }>()
</script>

<style scoped></style>

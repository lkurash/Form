<template>
  <div>
    <label v-if="props.label">{{ props.label }}</label>
    <select>
      <option value=""></option>
    </select>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ label?: string }>()
</script>

<style scoped></style>

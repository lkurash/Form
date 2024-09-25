<template>
  <form ref="form">
    <slot name="default" :form="formData" :updateFormData="updateFormData"></slot>
    <div>
      <button type="button">Cancel</button>
      <button type="submit">Save</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const formData = reactive<{
  description: string
  confirmation: boolean | null
  vat: string
  netto: number | null
  brutto: number | null
}>({
  description: '',
  confirmation: null,
  vat: '',
  netto: null,
  brutto: null
})

function updateFormData(updatedValue: Record<string, any>) {
  Object.assign(formData, updatedValue)
}
console.log(formData)
</script>
<style scoped></style>

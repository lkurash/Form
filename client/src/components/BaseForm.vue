<template>
  <form @submit.prevent="submitForm">
    <slot
      name="default"
      :form="form.data"
      :updateFormData="updateFormData"
      :errors="form.errors"
    ></slot>
    <div>
      <button type="button">Cancel</button>
      <button type="submit">Save</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue'

const props = defineProps<{ rules: any }>()

const form = reactive<{
  errors: any
  data: {
    description: string
    confirmation: boolean | null
    vat: string
    netto: number | null
    brutto: number | null
  }
}>({
  errors: null,
  data: {
    description: '',
    confirmation: null,
    vat: '',
    netto: null,
    brutto: null
  }
})

const calculateBrutto = computed(() => {
  const { netto, vat } = form.data
  if (netto !== null && vat) {
    let brutto = (netto * parseFloat(vat)) / 100
    return brutto
  }
  return null
})

watch(
  () => form.data.netto,
  () => {
    form.data.brutto = calculateBrutto.value
  }
)

watch(
  () => form.data.vat,
  () => {
    form.data.brutto = calculateBrutto.value
  }
)

function submitForm() {
  form.errors = props.rules(form.data)
  if (form.errors.length) {
    console.log(form.errors)
  } else {
    console.log('ok')
  }
}

function updateFormData(updatedValue: Record<string, any>) {
  if (updatedValue.errors) {
    form.errors = updatedValue.errors
  }else{
    Object.assign(form.data, updatedValue)
  }
}
console.log(form);

</script>
<script lang="ts"></script>
<style scoped></style>

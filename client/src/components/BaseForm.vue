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
import axios from 'axios'

const props = defineProps<{ rules: any; afterSave: any }>()

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

async function submitForm() {
  form.errors = props.rules(form.data)
  if (Object.values(form.errors).length) {
    console.log(form.errors)
  } else {
    axios
      .post('http://localhost:3000/api/submit-financial-info', form.data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log('Response:', response.data)
        props.afterSave()
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }
}

function updateFormData(updatedValue: Record<string, any>) {
  if (updatedValue.errors) {
    form.errors = updatedValue.errors
  } else {
    Object.assign(form.data, updatedValue)
  }
}

</script>
<script lang="ts"></script>
<style scoped></style>

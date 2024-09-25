<template>
  <div class="form">
    <base-form v-slot="props" :rules="formRules">
      <text-field
        max-value
        path="description"
        :modelValue="props"
        @update:modelValue="props.updateFormData"
      >
      </text-field>
      <radio-field
        path="confirmation"
        :modelValue="props"
        @update:modelValue="props.updateFormData"
      ></radio-field>
      <vat-field
        path="vat"
        :modelValue="props"
        @update:modelValue="props.updateFormData"
      ></vat-field>
      <netto-field
        path="netto"
        :modelValue="props"
        @update:modelValue="props.updateFormData"
      ></netto-field>
      <brutto-field
        path="brutto"
        :modelValue="props"
        @update:modelValue="props.updateFormData"
        disabled
      ></brutto-field>
    </base-form>
  </div>
</template>

<script setup lang="ts">
import BaseForm from '../components/BaseForm.vue'
import TextField from '../components/TextField.vue'
import VatField from '../components/VatField.vue'
import BruttoField from '../components/price/BruttoField.vue'
import NettoField from '../components/price/NettoField.vue'
import RadioField from '../components/RadioField.vue'

function formRules(obj: any) {
  const errors = {}
  if (obj.description.length > 255) {
    console.log(' 255 ')
  }
  if (!obj.description.length) {
    errors.description = { message: 'Text is required' }
  }
  if (obj.confirmation === null) {
    errors.confirmation = { message: 'Text is required' }
  }
  if (!obj.vat) {
    errors.vat = { message: 'Text is required' }
  }
  if (!obj.netto) {
    errors.netto = { message: 'Text is required' }
  }
  return errors
}
</script>

<style>
.form {
  width: 50%;
  height: 50%;
  background-color: rgb(255, 253, 253);
}
.error-message {
  color: red;
  font-size: 12px;
}
</style>

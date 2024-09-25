<template>
  <div class="form">
    <base-form>
      <text-field></text-field>
      <vat-field></vat-field>
      <price-field></price-field>
      <select-field></select-field>
      <radio-field></radio-field>
    </base-form>
  </div>
</template>

<script setup lang="ts">
import BaseForm from '../components/BaseForm.vue'
import TextField from '../components/TextField.vue'
import VatField from '../components/VatField.vue'
import PriceField from '../components/PriceField.vue'
import SelectField from '../components/SelectField.vue'
import RadioField from '../components/RadioField.vue'
</script>

<style scoped>
.form {
  width: 50%;
  height: 50%;
  background-color: rgb(255, 253, 253);
}
</style>

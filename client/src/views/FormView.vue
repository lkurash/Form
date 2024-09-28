<template>
  <div class="form">
    <base-form v-slot="{ updateFormData }" :rules="formValidate">
      <description-field path="description" :updateFormData="updateFormData" />
      <radio-field
        path="confirmation"
        :updateFormData="updateFormData"
        label="CONFIRMATION"
      />
      <vat-field path="vat" :updateFormData="updateFormData" />
      <netto-field path="netto" :updateFormData="updateFormData" />
      <brutto-field path="brutto" :updateFormData="updateFormData" />
    </base-form>
  </div>
</template>

<script setup lang="ts">
import { formValidate } from "../helpers/functions";
import BaseForm from "../components/BaseForm.vue";
import VatField from "../components/Fields/VatField.vue";
import BruttoField from "../components/Fields/BruttoField.vue";
import NettoField from "../components/Fields/NettoField.vue";
import RadioField from "../components/BaseFields/RadioField.vue";
import DescriptionField from "../components/Fields/DescriptionField.vue";
</script>

<style>
.form {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

input,
select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 14px;
}

input:focus,
select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  margin-top: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.button:hover {
  background-color: #0056b3;
}

label,
span {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
  height: 20px;
}
</style>

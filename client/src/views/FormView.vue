<template>
  <div class="form">
    <base-form v-slot="props" :rules="formRules">
      <text-field
        max-value
        path="description"
        :modelValue="props.formData"
        @update:modelValue="props.updateFormData"
        label="DESCRIPTION"
      />
      <radio-field
        path="confirmation"
        :modelValue="props.formData"
        @update:modelValue="props.updateFormData"
        label="CONFIRMATION"
      />
      <vat-field
        path="vat"
        :modelValue="props.formData"
        @update:modelValue="props.updateFormData"
      />
      <netto-field
        path="netto"
        :modelValue="props.formData"
        @update:modelValue="props.updateFormData"
      />
      <brutto-field
        path="brutto"
        :modelValue="props.formData"
        @update:modelValue="props.updateFormData"
      />
    </base-form>
  </div>
</template>

<script setup lang="ts">
import BaseForm from "../components/BaseForm.vue";
import TextField from "../components/Fields/TextField.vue";
import VatField from "../components/Fields/VatField.vue";
import BruttoField from "../components/Fields/price/BruttoField.vue";
import NettoField from "../components/Fields/price/NettoField.vue";
import RadioField from "../components/Fields/RadioField.vue";
import formRules from "../helpers/functions";
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
  margin: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.button:hover {
  background-color: #0056b3;
}

label {
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

.form-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.congrats-message {
  background-color: #e0ffe0;
  border: 2px solid #4caf50;
  color: #2e7d32;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  width: 300px;
  margin: 20px auto;
  position: relative;
  animation: slide-in 0.5s ease-out;
}

@keyframes slide-in {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #2e7d32;
}

.close-btn:hover {
  color: #0b260d;
}
</style>

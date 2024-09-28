<template>
  <form @submit.prevent="submitForm" v-if="!isDataFetched.value">
    <slot
      name="default"
      :formData="form"
      :updateFormData="updateFormData"
    ></slot>
    <div>
      <button class="button" type="button" @click="clearForm">Clear</button>
      <button class="button" type="submit">Save</button>
    </div>
  </form>
  <div class="congrats-message" v-else>
    <button class="close-btn" @click="closeMessage">×</button>
    Congratulations! You've successfully completed the task!
  </div>
</template>

<script setup lang="ts">
import { computed, provide, reactive, watch } from "vue";
import { FormData, Errors } from "../helpers.ts/types";
import axios from "axios";

const props = defineProps<{ rules?: (value: any) => void }>();
const isDataFetched = reactive<{ value: boolean }>({ value: false });

const form = reactive<{
  errors?: Errors | null;
  values: FormData;
}>({
  errors: null,
  values: {
    description: "",
    confirmation: null,
    vat: "",
    netto: "",
    brutto: "",
  },
});

provide("formData", form);

const calculateBrutto = computed(() => {
  const { netto, vat } = form.values;
  if (netto && vat) {
    return netto + (netto * parseFloat(vat)) / 100;
  }
  return "";
});

watch(
  () => [form.values.netto, form.values.vat],
  () => {
    form.values.brutto = calculateBrutto.value;
  }
);

async function submitForm() {
  form.errors = props.rules!(form.values);

  if (Object.keys(form.errors).length === 0) {
    await sendData();
  }
}

async function sendData() {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/financial-info",
      form.values,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    isDataFetched.value = !!response;
    clearForm();
  } catch (error) {
    console.error(error);
  }
}

function updateFormData(updatedValue: any) {
  if (updatedValue.errors) {
    form.errors = updatedValue.errors;
  } else {
    Object.assign(form.values, updatedValue);
  }
}

function clearForm() {
  form.values.description = "";
  form.values.confirmation = null;
  form.values.vat = null;
  form.values.netto = "";
  form.values.brutto = "";
  form.errors = null;
}

function closeMessage() {
  return (isDataFetched.value = false);
}
</script>
<style scoped></style>

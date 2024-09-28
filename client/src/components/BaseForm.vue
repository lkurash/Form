<template>
  <div class="congrats-message" v-if="isMessageShow.value">
    Congratulations! You've successfully completed the task!
  </div>
  <form @submit.prevent="submitForm" v-else>
    <slot
      name="default"
      :formData="formData"
      :updateFormData="updateFormData"
    ></slot>
    <div>
      <button class="button" type="submit">Save</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, provide, reactive, watch } from "vue";
import { FormData, Errors } from "../helpers.ts/types";
import axios from "axios";

const props = defineProps<{ rules?: (value: any) => void }>();
const isMessageShow = reactive<{ value: boolean }>({ value: false });

const formData = reactive<{
  errors?: Errors | null;
  values: FormData;
  isClear: boolean;
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

provide("formData", formData);

const calculateBrutto = computed(() => {
  const { netto, vat } = formData.values;
  if (netto && vat) {
    return netto + (netto * parseFloat(vat)) / 100;
  }
  return "";
});

watch(
  () => [formData.values.netto, formData.values.vat],
  () => {
    formData.values.brutto = calculateBrutto.value;
  }
);

async function submitForm() {
  formData.errors = props.rules!(formData.values);

  if (Object.keys(formData.errors).length === 0) {
    await sendData();
  }
}

async function sendData() {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/financial-info",
      formData.values,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    isMessageShow.value = !!response;
  } catch (error) {
    console.error(error);
  }
}

function updateFormData(updatedValue: any) {
  formData.isClear = false;
  if (updatedValue.errors) {
    formData.errors = updatedValue.errors;
  } else {
    Object.assign(formData.values, updatedValue);
  }
}
</script>
<style scoped></style>

<template>
  <div class="congrats-message" v-if="isMessageShow.completed">
    Congratulations! You've successfully completed the task!
  </div>
  <div class="error-message" v-else-if="isMessageShow.error">
    Oops! Something went wrong.
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
import { FormData, Errors } from "../helpers/types";
import axios from "axios";

const props = defineProps<{ rules?: (value: any) => void }>();
const isMessageShow = reactive<{ completed: boolean; error: boolean }>({
  completed: false,
  error: false,
});

const formData = reactive<{
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
    isMessageShow.completed = !!response;
  } catch (error) {
    isMessageShow.error = !!error;
  }
}

function updateFormData(updatedValue: any) {
  if (updatedValue.errors) {
    formData.errors = updatedValue.errors;
  } else {
    Object.assign(formData.values, updatedValue);
  }
}
</script>
<style scoped>
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

.error-message {
  background-color: #e0ffe0;
  border: 2px solid #af4c4c;
  color: #0a0d0a;
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
</style>

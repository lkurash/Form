<template>
  <div class="congrats-message" v-if="isSuccessMessageShown.value">
    Congratulations! You've successfully completed the task!
  </div>
  <div class="error-message" v-else-if="isErrorMessageShown.value">
    Oops! Something went wrong.
  </div>
  <form @submit.prevent="submitForm" v-else>
    <slot name="default" :updateFormValues="updateFormValues"></slot>
    <div>
      <button class="button" type="submit">Save</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { provide, reactive } from "vue";

const props = defineProps<{
  formValues: any;
  sendFormData: (values: any) => void;
}>();

const isSuccessMessageShown = reactive<{ value: boolean }>({ value: false });
const isErrorMessageShown = reactive<{ value: boolean }>({ value: false });

const formValues = reactive(props.formValues);

provide("formValues", formValues);

async function submitForm() {
  formValues.errors = { ...props.formValues.validateForm() };
  if (!props.formValues.isValid) return formValues.errors;
  await sendData();
}

async function sendData() {
  try {
    props.sendFormData(formValues.values);
    const response = props.sendFormData(formValues.values);
    isSuccessMessageShown.value = !!response;
  } catch (error) {
    isErrorMessageShown.value = !!error;
  }
}

function updateFormValues(updatedFieldValue: any) {
  if (updatedFieldValue.errors) {
    formValues.errors = updatedFieldValue.errors;
  } else {
    Object.assign(formValues.values, updatedFieldValue);
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

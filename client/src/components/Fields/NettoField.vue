<template>
  <text-field
    label="Price netto EUR"
    :valueApply="valueApply"
    :updateFormData="updateFormData"
    :fieldValidate="fieldValidate"
    :path="props.path"
    :disabled="isDisabled.value"
  ></text-field>
</template>

<script setup lang="ts">
import { inject, reactive, watch } from "vue";
import { Form, UpdateFormData, FormData } from "../../helpers/types";
import TextField from "../BaseFields/TextField.vue";

const props = defineProps<{
  path: keyof FormData;
  updateFormData: UpdateFormData;
}>();
const isDisabled = reactive<{ value: boolean }>({ value: true });
const formData = inject<Form>("formData");

watch(
  () => formData?.values.vat,
  (newValue) => {
    isDisabled.value = !newValue;
  }
);

function valueApply(value: string) {
  return value.replace(/,/g, ".").trim();
}

function fieldValidate(value: string) {
  const numericValue = +value;

  if (isNaN(numericValue) || typeof numericValue !== "number") {
    return { message: "Please, input a valid number" };
  } else {
    return null;
  }
}
</script>

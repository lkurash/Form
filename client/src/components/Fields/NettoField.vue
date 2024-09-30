<template>
  <text-field
    label="Price netto EUR"
    :valueApply="valueApply"
    :updateFormValues="updateFormValues"
    :fieldValidate="fieldValidate"
    :path="props.path"
    :disabled="isDisabled.value"
  ></text-field>
</template>

<script setup lang="ts">
import { inject, reactive, watch } from "vue";
import { Form, UpdateFormValues, FormValues } from "@/helpers/types";
import TextField from "@/components/BaseFields/TextField.vue";

const props = defineProps<{
  path: keyof FormValues;
  updateFormValues: UpdateFormValues;
}>();
const isDisabled = reactive<{ value: boolean }>({ value: true });
const formValues = inject<Form>("formValues");

watch(
  () => formValues?.values.vat,
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

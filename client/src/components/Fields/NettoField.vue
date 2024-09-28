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
import { FormData, ModelValue } from "../../helpers.ts/types";
import TextField from "../BaseFields/TextField.vue";

const props = defineProps<{
  path: keyof FormData;
  updateFormData: (value: string) => void;
}>();
const isDisabled = reactive<{ value: boolean }>({ value: true });
const { values } = inject("formData");

watch(
  () => values.vat,
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

<style scoped></style>

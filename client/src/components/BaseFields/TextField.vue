<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input type="text" v-model="field.value" :disabled="props.disabled" />
    <p v-if="maxValue" class="max-value">
      You can enter {{ remainingChars }} characters
    </p>
    <div class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, reactive, watch } from "vue";
import { FormData, ModelValue } from "../helpers.ts/types";

const props = defineProps<{
  label?: string;
  path: keyof FormData;
  updateFormData: (value: string) => void;
  maxValue?: boolean;
  disabled?: boolean;
  fieldValidate?: (value: string) => { message?: string } | null;
  valueApply?: (value: string) => void;
}>();

const formData = inject("formData");

const field = reactive<{ value: string }>({
  value: "",
});

const fieldValue = computed({
  get() {
    return formData.values[props.path];
  },
  set(newValue) {
    emit("update:title", newValue);
  },
});

watch(
  () => field.value,
  (newValue) => {
    updateValue(newValue);
  }
);

const remainingChars = computed(() => props.maxValue - field.value.length);

const errorMessage = computed(() => {
  if (!formData.errors?.[props.path]) return "";

  return formData.errors[props.path]?.message;
});

function updateValue(newValue: string) {
  let value = props.valueApply ? props.valueApply(newValue) : newValue;
  field.value = value;

  if (props.maxValue && value.length > props.maxValue) {
    field.value = newValue.slice(0, 255);
  } else {
    validateField(value);
  }
}

function validateField(newValue: string) {
  const validationError = props.fieldValidate
    ? props.fieldValidate(newValue)
    : {};

  if (validationError?.message) {
    setError(validationError.message);
  } else {
    clearError();

    const updatedValue = { [props.path]: newValue };

    props.updateFormData(updatedValue);
  }
}

function setError(message: string) {
  const updatedErrors = {
    ...formData.errors,
    [props.path]: { message },
  };
  props.updateFormData({ errors: updatedErrors });
}

function clearError() {
  const errors = {
    ...formData.errors,
  };
  if (!errors[props.path]) return;

  delete errors[props.path];
  props.updateFormData({ errors: errors });
}
</script>
<style>
.max-value {
  color: grey;
  margin-top: 5px;
  margin-left: 5px;
  font-size: 13px;
}
</style>

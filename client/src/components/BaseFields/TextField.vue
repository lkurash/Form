<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input type="text" v-model="field.value" :disabled="props.disabled" />
    <div class="container-message">
      <div class="error-message">
        {{ errorMessage }}
      </div>
      <div v-if="maxValue" class="max-value">
        <span>You can enter {{ remainingChars }} characters</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, reactive, watch } from "vue";
import { UpdateFormData, FormData } from "@/helpers/types";

const props = defineProps<{
  label?: string;
  path: keyof FormData;
  updateFormData: UpdateFormData;
  maxValue?: string;
  disabled?: boolean;
  fieldValidate?: (value: string) => { message?: string } | null;
  valueApply?: (value: string) => void;
}>();

const formData = inject<FormData>("formData");

const field = reactive<{ value: string }>({
  value: "",
});

watch(
  () => field.value,
  (newValue) => {
    updateValue(newValue);
  }
);

const remainingChars = computed(() => {
  if (props.maxValue) {
    return Number(props.maxValue) - field.value.length;
  }
  return "";
});

const errorMessage = computed(() => {
  if (!formData.errors?.[props.path]) return "";

  return formData.errors[props.path]?.message;
});

function updateValue(newValue: string) {
  let value = props.valueApply ? props.valueApply(newValue) : newValue;
  field.value = String(value);

  if (props.maxValue && field.value.length > Number(props.maxValue)) {
    field.value = newValue.slice(0, 255);
  } else {
    validateField(field.value);
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
  margin: 0;
  color: grey;
  margin-top: 5px;
  font-size: 13px;
  height: 20px;
}
.container-message {
  display: flex;
  justify-content: space-between;
}
</style>

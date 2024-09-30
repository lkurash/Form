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
import { UpdateFormValues, FormValues } from "@/helpers/types";

const props = defineProps<{
  label?: string;
  path: keyof FormValues;
  updateFormValues: UpdateFormValues;
  maxValue?: string;
  disabled?: boolean;
  fieldValidate?: (value: string) => { message?: string } | null;
  valueApply?: (value: string) => void;
}>();

const formValues = inject<FormValues>("formValues");

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
  if (!formValues.errors?.[props.path]) return "";

  return formValues.errors[props.path]?.message;
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

    props.updateFormValues(updatedValue);
  }
}

function setError(message: string) {
  const updatedErrors = {
    ...formValues.errors,
    [props.path]: { message },
  };
  props.updateFormValues({ errors: updatedErrors });
}

function clearError() {
  const errors = {
    ...formValues.errors,
  };
  if (!errors[props.path]) return;

  delete errors[props.path];
  props.updateFormValues({ errors: errors });
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

.max-value span {
  text-transform: none;
}
</style>

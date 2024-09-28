<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input type="text" v-model="field.value" :disabled="props.disabled" />
    <p
      v-if="maxValue"
      style="color: grey; margin-top: 5px; margin-left: 5px; font-size: 13px"
    >
      You can enter {{ remainingChars }} characters
    </p>
    <div class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import { FormData, ModelValue } from "../helpers.ts/types";

const props = defineProps<{
  label?: string;
  path: keyof FormData;
  modelValue: ModelValue;
  maxValue?: boolean;
  disabled?: boolean;
  rules?: (value: string) => { message?: string } | null;
  valueApply?: (value: string) => void;
}>();

const emit = defineEmits(["update:modelValue"]);

const field = reactive<{ value: string }>({
  value: "",
});

watch(
  () => field.value,
  (newValue, oldValue) => {
    updateValue(newValue, oldValue);
  }
);

watch(
  () => props.modelValue.values[props.path],
  (newValue, oldValue) => {
    updateValue(String(newValue), oldValue);
  }
);

const remainingChars = computed(() => 255 - field.value.length);

const errorMessage = computed(() => {
  if (!props.modelValue.errors?.[props.path]) return "";

  return props.modelValue.errors[props.path]?.message;
});

function updateValue(newValue: string, oldValue: string) {
  let value = props.valueApply ? props.valueApply(newValue) : newValue;
  field.value = value;

  if (props.maxValue && value.length > 255) {
    field.value = oldValue;
  } else {
    validateField(value);
  }
}

function validateField(newValue: string) {
  const validationError = props.rules ? props.rules(newValue) : {};

  if (validationError?.message) {
    setError(validationError.message);
  } else {
    clearError();

    const updatedValue = { ...props.modelValue.values, [props.path]: newValue };
    emit("update:modelValue", updatedValue);
  }
}

function setError(message: string) {
  const updatedErrors = {
    ...props.modelValue.errors,
    [props.path]: { message },
  };
  emit("update:modelValue", { errors: updatedErrors });
}

function clearError() {
  const errors = {
    ...props.modelValue.errors,
  };
  if (!errors[props.path]) return;

  delete errors[props.path];
  emit("update:modelValue", { errors: errors });
}
</script>

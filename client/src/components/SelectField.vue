<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select v-model="field.value">
      <option value="" disabled selected></option>
      <template v-for="option in options" :key="option">
        <option :value="option">{{ option }}</option>
      </template>
    </select>
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
  options: string[];
}>();
const emit = defineEmits(["update:modelValue"]);

const field = reactive<{ value: string | null }>({
  value: ""
});

watch(
  () => field.value,
  (newValue) => {
    clearError();
    const updatedValue = { ...props.modelValue.values, [props.path]: newValue };
    emit("update:modelValue", updatedValue);
  }
);

watch(
  () => props.modelValue.values[props.path],
  (newValue) => {
    clearError();
    field.value = newValue;
  }
);

const errorMessage = computed(() => {
  if (!props.modelValue.errors?.[props.path]) return "";

  return props.modelValue.errors[props.path]?.message;
});

function clearError() {
  const errors = {
    ...props.modelValue.errors
  };
  if (!errors[props.path]) return;

  delete errors[props.path];
  emit("update:modelValue", { errors: errors });
}
</script>

<style scoped></style>

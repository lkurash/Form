<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select v-model="field.value" placeholder="Choose VAT">
      <option value="" disabled selected>Choose VAT</option>
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
import { computed, inject, reactive, watch } from "vue";
import { FormData, ModelValue } from "../helpers.ts/types";

const props = defineProps<{
  label?: string;
  path: keyof FormData;
  modelValue: ModelValue;
  options: string[];
}>();
const emit = defineEmits(["update:modelValue"]);
const formData = inject("formData");

const field = reactive<{ value: string | null }>({
  value: "",
});

watch(
  () => field.value,
  (newValue) => {
    clearError();
    const updatedValue = { ...formData.values, [props.path]: newValue };
    emit("update:modelValue", updatedValue);
  }
);

watch(
  () => formData.values[props.path],
  (newValue) => {
    clearError();
    field.value = newValue;
  }
);

const errorMessage = computed(() => {
  if (!formData.errors?.[props.path]) return "";

  return formData.errors[props.path]?.message;
});

function clearError() {
  const errors = {
    ...formData.errors,
  };
  if (!errors[props.path]) return;

  delete errors[props.path];
  emit("update:modelValue", { errors: errors });
}
</script>

<style scoped>
select {
  font-size: 12px;
  font-weight: 600;
  color: grey;
}
</style>

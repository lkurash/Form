<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select v-model="fieldValue" :placeholder="props.placeholder || ''">
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
import { computed, inject } from "vue";
import { FormValues, Form } from "@/helpers/types";
import { UpdateFormValues } from "@/helpers/types";

const props = defineProps<{
  label?: string;
  path: keyof FormValues;
  updateFormValues: UpdateFormValues;
  options: string[];
  placeholder?: string;
}>();

const formValues = inject<Form>("formValues");

const fieldValue = computed({
  get() {
    return formValues?.values[props.path];
  },
  set(newValue) {
    clearError();
    props.updateFormValues({ [props.path]: newValue });
  },
});

const errorMessage = computed(() => {
  if (!formValues?.errors?.[props.path]) return "";

  return formValues.errors[props.path]?.message;
});

function clearError() {
  const errors = {
    ...formValues?.errors,
  };
  if (!errors[props.path]) return;

  delete errors[props.path];
  props.updateFormValues({ errors });
}
</script>

<style scoped>
select {
  font-size: 12px;
  font-weight: 600;
  color: grey;
}
</style>

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
import { FormData, Form } from "../../helpers/types";
import { UpdateFormData } from "../../helpers/types";

const props = defineProps<{
  label?: string;
  path: keyof FormData;
  updateFormData: UpdateFormData;
  options: string[];
  placeholder?: string;
}>();

const formData = inject<Form>("formData");

const fieldValue = computed({
  get() {
    return formData?.values[props.path];
  },
  set(newValue) {
    clearError();
    props.updateFormData({ [props.path]: newValue });
  },
});

const errorMessage = computed(() => {
  if (!formData?.errors?.[props.path]) return "";

  return formData.errors[props.path]?.message;
});

function clearError() {
  const errors = {
    ...formData?.errors,
  };
  if (!errors[props.path]) return;

  delete errors[props.path];
  props.updateFormData({ errors });
}
</script>

<style scoped>
select {
  font-size: 12px;
  font-weight: 600;
  color: grey;
}
</style>

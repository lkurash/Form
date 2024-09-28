<template>
  <div>
    <label v-if="props.label">{{ props.label }}</label>
    <div style="display: flex; height: 50px">
      <div style="display: flex; justify-self: center; align-items: center">
        <input
          type="radio"
          id="yes"
          :value="true"
          v-model="field.value"
          :name="props.path"
          style="margin-left: 10px"
        />
        <label for="yes" style="margin-left: 10px">Yes</label>
      </div>
      <div style="display: flex; justify-self: center; align-items: center">
        <input
          type="radio"
          id="no"
          :value="false"
          v-model="field.value"
          :name="props.path"
          style="margin-left: 10px"
        />
        <label for="no" style="margin-left: 10px">No</label>
      </div>
    </div>
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
}>();
const emit = defineEmits(["update:modelValue"]);
const formData = inject("formData");

const field = reactive<{ value: boolean | null }>({
  value: null,
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
input,
label {
  margin: 0;
  padding: 0;
}
</style>

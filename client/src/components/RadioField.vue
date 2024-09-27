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
import { computed, reactive, watch } from "vue";
import { FormData, ModelValue } from "../helpers.ts/types";

const props = defineProps<{
  label?: string;
  path: keyof FormData;
  modelValue: ModelValue;
}>();
const emit = defineEmits(["update:modelValue"]);

const field = reactive<{ value: boolean | null }>({
  value: null
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

<style scoped>
input,
label {
  margin: 0;
  padding: 0;
}
</style>

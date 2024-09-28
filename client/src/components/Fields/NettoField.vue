<template>
  <text-field
    label="Price netto EUR"
    :modelValue="props.modelValue"
    :valueApply="valueApply"
    @update:modelValue="updateModelValue"
    :rules="rules"
    :path="props.path"
    :disabled="isDisabled.value"
  ></text-field>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import { FormData, ModelValue } from "../../helpers.ts/types";
import TextField from "./TextField.vue/TextField.vue";

const props = defineProps<{
  path: keyof FormData;
  modelValue: ModelValue;
}>();
const isDisabled = reactive<{ value: boolean }>({ value: true });
const emit = defineEmits(["update:modelValue"]);

function updateModelValue(updatedValue: string) {
  emit("update:modelValue", updatedValue);
}
watch(
  () => props.modelValue.values.vat,
  (newValue) => {
    isDisabled.value = !newValue;
  }
);

function valueApply(value: string) {
  return value.replace(/,/g, ".").trim();
}

function rules(value: string) {
  const numericValue = +value;

  if (isNaN(numericValue) || typeof numericValue !== "number") {
    return { message: "Please, input a valid number" };
  } else {
    return null;
  }
}
</script>

<style scoped></style>

<template>
  <text-field
    label="BRUTTO"
    :path="props.path"
    :modelValue="modelValue"
    @update:modelValue="updateModelValue"
    disabled
  ></text-field>
</template>

<script setup lang="ts">
import { FormData, ModelValue } from "@/src3/types";
import TextField from "../TextField.vue";

const props = defineProps<{
  path: keyof FormData;
  modelValue: ModelValue;
}>();
const emit = defineEmits(["update:modelValue"]);

function updateModelValue(updatedValue: string) {
  emit("update:modelValue", updatedValue);
}
</script>

<style scoped></style>

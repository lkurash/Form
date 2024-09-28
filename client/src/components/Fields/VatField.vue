<template>
  <select-field
    label="VAT"
    :path="props.path"
    :updateFormData="updateFormData"
    :options="['19%', '21%', '23%', '25%']"
  ></select-field>
</template>

<script setup lang="ts">
import { FormData, ModelValue } from "../helpers.ts/types";
import SelectField from "../BaseFields/SelectField.vue";

const props = defineProps<{
  path: keyof FormData;
  updateFormData: (value: string) => void;
}>();

</script>

<style scoped></style>

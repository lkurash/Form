<template>
  <select-field
    label="VAT"
    :path="props.path"
    :updateFormData="updateFormData"
    :options="['19%', '21%', '23%', '25%']"
    placeholder="Choose VAT"
  ></select-field>
</template>

<script setup lang="ts">
import { FormData, UpdateFormData } from "../../helpers/types";
import SelectField from "../BaseFields/SelectField.vue";

const props = defineProps<{
  path: keyof FormData;
  updateFormData: UpdateFormData;
}>();
</script>

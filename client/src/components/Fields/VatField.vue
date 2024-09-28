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
import { FormData } from "../helpers.ts/types";
import SelectField from "../BaseFields/SelectField.vue";
import { UpdateFormData } from "../../helpers/types";

const props = defineProps<{
  path: keyof FormData;
  updateFormData: UpdateFormData
}>();
</script>

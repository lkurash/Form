<template>
  <select-field
    label="VAT"
    :path="props.path"
    :updateFormValues="updateFormValues"
    :options="['19%', '21%', '23%', '25%']"
    placeholder="Choose VAT"
  ></select-field>
</template>

<script setup lang="ts">
import { FormValues, UpdateFormValues } from "@/helpers/types";
import SelectField from "@/components/BaseFields/SelectField.vue";

const props = defineProps<{
  path: keyof FormValues;
  updateFormValues: UpdateFormValues;
}>();
</script>

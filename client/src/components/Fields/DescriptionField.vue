<template>
  <text-field
    max-value="255"
    :path="props.path"
    :updateFormValues="updateFormValues"
    label="DESCRIPTION"
    :fieldValidate="fieldValidate"
  />
</template>
<script lang="ts" setup>
import { UpdateFormValues, FormValues } from "@/helpers/types";
import TextField from "@/components/BaseFields/TextField.vue";

const props = defineProps<{
  path: keyof FormValues;
  updateFormValues: UpdateFormValues;
}>();

function fieldValidate(value: string) {
  if (value.length >= 255) {
    return { message: "Text must not exceed 255 characters" };
  } else {
    return null;
  }
}
</script>

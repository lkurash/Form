<template>
  <text-field
    max-value="255"
    :path="props.path"
    :updateFormData="updateFormData"
    label="DESCRIPTION"
    :fieldValidate="fieldValidate"
  />
</template>
<script lang="ts" setup>
import { UpdateFormData, FormData } from "@/src1 copy/helpers/types";
import TextField from "../BaseFields/TextField.vue";

const props = defineProps<{
  path: keyof FormData;
  updateFormData: UpdateFormData;
}>();

function fieldValidate(value: string) {
  if (value.length >= 255) {
    return { message: "Text must not exceed 255 characters" };
  } else {
    return null;
  }
}
</script>

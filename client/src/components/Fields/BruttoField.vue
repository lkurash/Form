<template>
  <div>
    <label>Price brutto EUR</label>
    <input type="text" v-model="values[props.path]" disabled />
  </div>
</template>

<script setup lang="ts">
import { FormData } from "@/src3/types";
import { inject } from "vue";
import TextField from "../BaseFields/TextField.vue";

const props = defineProps<{
  path: keyof FormData;
}>();

const { values } = inject("formData");
</script>

<style scoped></style>

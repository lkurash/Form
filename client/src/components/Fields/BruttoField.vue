<template>
  <div>
    <label>Price brutto EUR</label>
    <input type="text" v-model="values[props.path]" disabled />
  </div>
</template>

<script setup lang="ts">
import { FormData } from "../../helpers/types";
import { inject } from "vue";

const props = defineProps<{
  path: keyof FormData;
}>();

const { values } = inject<FormData>("formData");
</script>

<template>
  <div>
    <span v-if="props.label">{{ props.label }}</span>
    <div class="container">
      <div class="field">
        <input
          type="radio"
          id="yes"
          :value="true"
          v-model="fieldValue"
          :name="props.path"
        />
        <label for="yes">Yes</label>
      </div>
      <div class="field">
        <input
          type="radio"
          id="no"
          :value="false"
          v-model="fieldValue"
          :name="props.path"
        />
        <label for="no">No</label>
      </div>
    </div>
    <div class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";
import { Form, UpdateFormData, FormData } from "@/helpers/types";

const props = defineProps<{
  label?: string;
  path: keyof FormData;
  updateFormData: UpdateFormData;
}>();

const formData = inject<Form>("formData");

const fieldValue = computed({
  get() {
    return formData?.values[props.path];
  },
  set(newValue) {
    clearError();
    props.updateFormData({ [props.path]: newValue });
  },
});

const errorMessage = computed(() => {
  if (!formData?.errors?.[props.path]) return "";

  return formData.errors[props.path]?.message;
});

function clearError() {
  const errors = {
    ...formData?.errors,
  };
  if (!errors[props.path]) return;

  delete errors[props.path];
  props.updateFormData({ errors: errors });
}
</script>

<style scoped>
.container {
  display: flex;
  height: 20px;
}

.field {
  display: flex;
  justify-self: center;
  align-items: center;
}
input,
label {
  margin: 0;
  padding: 0;
}

input {
  margin-left: 10px;
}

label {
  margin-left: 10px;
}
</style>

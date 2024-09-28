<template>
  <div>
    <label>Price brutto EUR</label>
    <input type="text" v-model="field.value" disabled />
  </div>
</template>

<script setup lang="ts">
import { Form, FormData, UpdateFormData } from "../../helpers/types";
import { inject, reactive, watch } from "vue";

const props = defineProps<{
  path: keyof FormData;
  updateFormData: UpdateFormData;
}>();
const brutto = reactive<{ value: string }>({ value: "" });
const formData = inject<Form>("formData");

watch(
  () => [formData?.values.netto, formData?.values.vat],
  () => {
    if (formData?.values) {
      const updatedValue = { [props.path]: calculateBrutto(formData.values) };
      props.updateFormData(updatedValue);
    }
  }
);

function calculateBrutto(values: FormData) {
  const { netto, vat } = values;
  if (netto && vat) {
    let result = Number(netto) + (Number(netto) * parseFloat(vat)) / 100;
    brutto.value = String(result);
    return brutto.value;
  }
  return "";
}
</script>

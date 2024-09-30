<template>
  <div>
    <label>Price brutto EUR</label>
    <input type="text" v-model="brutto.value" disabled />
  </div>
</template>

<script setup lang="ts">
import { Form, FormValues, UpdateFormValues } from "@/helpers/types";
import { inject, reactive, watch } from "vue";

const props = defineProps<{
  path: keyof FormValues;
  updateFormValues: UpdateFormValues;
}>();
const brutto = reactive<{ value: string }>({ value: "" });
const formValues = inject<Form>("formValues");

watch(
  () => [formValues?.values.netto, formValues?.values.vat],
  () => {
    if (formValues?.values) {
      const updatedValue = { [props.path]: calculateBrutto(formValues.values) };
      props.updateFormValues(updatedValue);
    }
  }
);

function calculateBrutto(values: FormValues) {
  const { netto, vat } = values;
  if (netto && vat) {
    let result = Number(netto) + (Number(netto) * parseFloat(vat)) / 100;
    brutto.value = String(result);
    return brutto.value;
  }
  return "";
}
</script>

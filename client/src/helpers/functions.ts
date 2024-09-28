export function formValidate(data: any) {
  const errors: Record<string, { message: string }> = {};

  if (!data.description || data.description.length === 0) {
    errors.description = { message: "Text is required" };
  }
  if (data.description.length >= 255) {
    errors.description = { message: "Text must not exceed 255 characters" };
  }

  if (data.confirmation === null) {
    errors.confirmation = { message: "Confirmation is required" };
  }

  if (!data.vat) {
    errors.vat = { message: "VAT is required" };
  }

  if (!data.netto) {
    errors.netto = { message: "Netto value is required" };
  }

  return errors;
}

export const invoiceForm = {
  errors: {} as Record<string, { message: string }>,
  values: {
    description: "",
    confirmation: null as boolean | null,
    vat: "",
    netto: "",
    brutto: "",
  },
};

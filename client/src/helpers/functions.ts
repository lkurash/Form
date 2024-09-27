export default function formRules(data: any) {
  const errors: Record<string, any> = {};

  if (!data.description || data.description.length === 0) {
    errors.description = { message: "Text is required" };
  } else if (data.description.length > 255) {
    errors.description = { message: "Text must not exceed 255 characters" };
  }

  if (data.confirmation === null) {
    errors.confirmation = { message: "Confirmation is required" };
  }
  console.log(data.vat);
  
  if (!data.vat) {
    errors.vat = { message: "VAT is required" };
  }

  if (!data.netto) {
    errors.netto = { message: "Netto value is required" };
  }

  return errors;
}

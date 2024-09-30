const { invoiceValidationRules } = require("../../helpers/functions");

const emptyFormData = {
  description: "",
  confirmation: null,
  vat: "",
  netto: "",
  brutto: "",
};

const formDataWithEmptyDescription = {
  description: "",
  confirmation: true,
  vat: "21%",
  netto: "111",
  brutto: "111",
};

const formDataWithLongDescription = {
  description:
    "12345678901234567890123456789012345678901234 5678901234567890123456 78901234567890123456789 01234567890123456789012345678901234567890123456789012 3456789012345678901234567890123456789012345678901234 5678901234567890123456789012345678901234567890123456789012345",
  confirmation: true,
  vat: "21%",
  netto: "111",
  brutto: "111",
};

const formDataWithEmptyConfirmation = {
  description: "text",
  confirmation: null,
  vat: "21%",
  netto: "111",
  brutto: "111",
};

const formDataWithEmptyVat = {
  description: "text",
  confirmation: false,
  vat: "",
  netto: "111",
  brutto: "111",
};

const formDataWithEmptyNetto = {
  description: "text",
  confirmation: false,
  vat: "21%",
  netto: "",
  brutto: "111",
};

describe("invoiceValidationRules", () => {
  test("should return errors for all fields when form is empty", () => {
    expect(invoiceValidationRules(emptyFormData)).toEqual({
      confirmation: { message: "Confirmation is required" },
      description: { message: "Text is required" },
      netto: { message: "Netto value is required" },
      vat: { message: "VAT is required" },
    });
  });

  test("should return error when description field is empty", () => {
    expect(invoiceValidationRules(formDataWithEmptyDescription)).toEqual({
      description: { message: "Text is required" },
    });
  });

  test("should return error when description field length > 255", () => {
    expect(invoiceValidationRules(formDataWithLongDescription)).toEqual({
      description: { message: "Text must not exceed 255 characters" },
    });
  });

  test("should return error when confirmation field is empty", () => {
    expect(invoiceValidationRules(formDataWithEmptyConfirmation)).toEqual({
      confirmation: { message: "Confirmation is required" },
    });
  });

  test("should return error when VAT field is empty", () => {
    expect(invoiceValidationRules(formDataWithEmptyVat)).toEqual({
      vat: { message: "VAT is required" },
    });
  });

  test("should return error when netto field is empty", () => {
    expect(invoiceValidationRules(formDataWithEmptyNetto)).toEqual({
      netto: { message: "Netto value is required" },
    });
  });
});

export type FormValues = {
  description: string;
  confirmation: boolean | null;
  vat: string | null;
  netto: string;
  brutto: string;
};

export type Errors = {
  [key in keyof FormValues]?: { message: string };
};

export type Form = {
  errors?: Errors | null;
  values: FormValues;
};

export type UpdateFormValues = (value: any) => void;

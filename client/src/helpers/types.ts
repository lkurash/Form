export type FormData = {
  description: string;
  confirmation: boolean | null;
  vat: string | null;
  netto: string;
  brutto: string;
};

export type Errors = {
  [key in keyof FormData]?: { message: string };
};

export type Form = {
  errors?: Errors | null;
  values: FormData;
};

export type UpdateFormData = (value: any) => void;

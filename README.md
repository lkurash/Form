# Invoice Details Form

This project implements a dynamic web form.

#### BaseForm

- **BaseForm** is the primary component that creates a dynamic form. It uses a slot for rendering, allowing easy external markup changes. This component can accept any data and process it.

- **Validation**: Before submitting the data, the form is validated using a function passed through `props.rules`. This enables the use of shared validation logic for different forms.

#### InvoiceForm

- **InvoiceForm** is a specific form that displays `BaseForm` and has fields with path attributes. Each path corresponds to a key in the form object, allowing the binding of entered values.

#### BaseFields

- **BaseFields** are reusable components for individual form fields. Each of them updates data and handles errors. `TextField` has a `props.valueApply`, which allows for modifying the entered data (for example, replacing commas with dots).

#### Fields

- **Fields** are special components that pass additional validation or data modification functions to `BaseFields`. This allows for the addition of specific logic for each field.

## Features:

1. **Description Textarea:**

   - A required textarea input with a maximum length of 255 characters.
   - Displays real-time character count while the user types.
   - Provides dynamic validation messages for empty input.

2. **Confirmation Radio Button:**

   - A required radio button for "Send confirmation" (Yes/No) with no default selection.
   - Displays a validation message if not selected during form submission.

3. **VAT Selector:**

   - A required select input for choosing VAT with options: 19%, 21%, 23%, and 25%.
   - Provides validation for unselected options on form submission.

4. **Price Netto EUR Input:**

   - A required text input for "Price netto EUR" that is disabled until a VAT value is selected.
   - Accepts float numbers with both comma and dot as decimal separators (e.g., 12,56 or 12.56).
   - Displays dynamic validation for invalid inputs.

5. **Price Brutto EUR Input:**

   - A disabled input that displays the dynamically calculated value based on "Price netto EUR" and the selected VAT.
   - Updates in real-time as the user modifies the corresponding fields.

6. **AJAX Form Submission:**
   - The form submits via AJAX to a specified REST API endpoint.
   - Displays success status upon valid submission.

## Technologies Used:

- Vue
- CSS
- TypeScript
- JavaScript
- Express.js

## Usage:

### Running the Project

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/lkurash/Invoice-Details-Form.git

   ```

2. **Start:**
   ```bash
   ./run
   ```

# Form Implementation

This project implements a dynamic web form with the following features:

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
- HTML
- CSS
- TypeScript
- JavaScript
- Express.js

## Usage:

### Running the Project

1. **Clone the Repository:**

   git clone https://github.com/lkurash/Form.git

   ./run

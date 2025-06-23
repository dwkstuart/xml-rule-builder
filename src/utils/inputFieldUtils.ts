import { InputFieldConfig } from '../types';

// Get the HTML input type based on the input field configuration
export function getInputType(inputField: InputFieldConfig): string {
  switch (inputField.type) {
    case 'string':
      return 'text';
    case 'number':
      return 'number';
    case 'date':
      return 'date';
    case 'currency':
      return 'number';
    case 'double':
      return 'number';
    default:
      return 'text';
  }
}

// Get input props for Material-UI TextField based on input field configuration
export function getInputProps(inputField: InputFieldConfig) {
  const props: Record<string, unknown> = {
    type: getInputType(inputField),
    placeholder: inputField.placeholder,
  };

  // Add numeric-specific props
  if (['number', 'currency', 'double'].includes(inputField.type)) {
    if (inputField.min !== undefined) props.min = inputField.min;
    if (inputField.max !== undefined) props.max = inputField.max;
    if (inputField.step !== undefined) props.step = inputField.step;
  }

  return props;
}

// Validate input value based on input field configuration
export function validateInput(value: string, inputField: InputFieldConfig): string {
  if (!inputField.validation) return '';

  const { validation } = inputField;

  // Check pattern validation
  if (validation.pattern && value) {
    const regex = new RegExp(validation.pattern);
    if (!regex.test(value)) {
      return 'Invalid format';
    }
  }

  // Check length validation
  if (validation.minLength && value.length < validation.minLength) {
    return `Minimum length is ${validation.minLength} characters`;
  }

  if (validation.maxLength && value.length > validation.maxLength) {
    return `Maximum length is ${validation.maxLength} characters`;
  }

  // Check custom validation
  if (validation.custom) {
    const customError = validation.custom(value);
    if (customError) return customError;
  }

  return '';
}

// Format value for display based on input field type
export function formatValue(value: string, inputField: InputFieldConfig): string {
  if (!value) return value;

  switch (inputField.type) {
    case 'currency': {
      const num = parseFloat(value);
      if (!isNaN(num)) {
        return num.toFixed(2);
      }
      return value;
    }
    case 'double': {
      const doubleNum = parseFloat(value);
      if (!isNaN(doubleNum)) {
        return doubleNum.toFixed(2);
      }
      return value;
    }
    default:
      return value;
  }
}

// Get currency symbol for currency input fields
export function getCurrencySymbol(inputField: InputFieldConfig): string | null {
  return inputField.type === 'currency' ? inputField.currency || '$' : null;
}

// Get step value for numeric inputs
export function getStepValue(inputField: InputFieldConfig): number {
  if (inputField.step !== undefined) return inputField.step;
  
  switch (inputField.type) {
    case 'number':
      return 1;
    case 'currency':
    case 'double':
      return 0.01;
    default:
      return 1;
  }
} 
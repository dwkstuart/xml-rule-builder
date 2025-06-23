import { loadXmlTypesFromFile, loadXmlTypesFromConfig } from '../src/xmlTypes';
import { XmlRuleType, InputFieldConfig } from '../src/types';

// Example 1: Using custom types with input field configurations
const customTypesWithInputFields: XmlRuleType[] = [
  {
    label: 'Product Price',
    value: 'product_price',
    comparators: [
      { label: 'Less Than', value: 'less_than' },
      { label: 'Greater Than', value: 'greater_than' },
      { label: 'Equals', value: 'equals' },
      { label: 'Between', value: 'between' }
    ],
    inputField: {
      type: 'currency',
      placeholder: 'Enter price',
      currency: '$',
      min: 0,
      step: 0.01,
      validation: {
        custom: (value: string) => {
          if (!/^\d+(\.\d{1,2})?$/.test(value)) return 'Price must be a valid number';
          const price = parseFloat(value);
          if (price < 0) return 'Price must be positive';
          if (price > 10000) return 'Price seems too high';
          return '';
        }
      }
    }
  },
  {
    label: 'Product Weight',
    value: 'product_weight',
    comparators: [
      { label: 'Less Than', value: 'less_than' },
      { label: 'Greater Than', value: 'greater_than' },
      { label: 'Equals', value: 'equals' },
      { label: 'Between', value: 'between' }
    ],
    inputField: {
      type: 'double',
      placeholder: 'Enter weight in kg',
      min: 0,
      step: 0.1,
      validation: {
        custom: (value: string) => {
          if (!/^\d+(\.\d{1,2})?$/.test(value)) return 'Weight must be a valid number';
          const weight = parseFloat(value);
          if (weight < 0) return 'Weight must be positive';
          if (weight > 1000) return 'Weight seems too high';
          return '';
        }
      }
    }
  },
  {
    label: 'Product Launch Date',
    value: 'product_launch_date',
    comparators: [
      { label: 'Before', value: 'before' },
      { label: 'After', value: 'after' },
      { label: 'On', value: 'on' },
      { label: 'Between', value: 'between' }
    ],
    inputField: {
      type: 'date',
      dateFormat: 'YYYY-MM-DD',
      validation: {
        custom: (value: string) => {
          if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return 'Date must be YYYY-MM-DD';
          const d = new Date(value);
          if (isNaN(d.getTime())) return 'Invalid date';
          return '';
        }
      }
    }
  },
  {
    label: 'Product Category',
    value: 'product_category',
    comparators: [
      { label: 'Equals', value: 'equals' },
      { label: 'Not Equals', value: 'not_equals' },
      { label: 'In', value: 'in' }
    ],
    inputField: {
      type: 'string',
      placeholder: 'Enter category',
      validation: {
        minLength: 2,
        maxLength: 50,
        custom: (value: string) => {
          const validCategories = ['electronics', 'clothing', 'books', 'home', 'sports', 'beauty'];
          if (value && !validCategories.includes(value.toLowerCase())) {
            return `Please enter a valid category: ${validCategories.join(', ')}`;
          }
          return '';
        }
      }
    }
  }
];

// Example 2: Loading types from a configuration file
async function loadCustomTypesFromFile() {
  try {
    await loadXmlTypesFromFile('./examples/custom-types-with-input-fields.json');
    console.log('Custom types loaded successfully from file');
  } catch (error) {
    console.error('Error loading custom types:', error);
  }
}

// Example 3: Loading types from a configuration object
function loadCustomTypesFromObject() {
  try {
    loadXmlTypesFromConfig({
      ruleTypes: customTypesWithInputFields
    });
    console.log('Custom types loaded successfully from object');
  } catch (error) {
    console.error('Error loading custom types:', error);
  }
}

// Example 4: Demonstrating different input field types
const inputFieldTypeExamples: Record<string, InputFieldConfig> = {
  string: {
    type: 'string',
    placeholder: 'Enter text',
    validation: {
      minLength: 1,
      maxLength: 100
    }
  },
  number: {
    type: 'number',
    placeholder: 'Enter whole number',
    min: 0,
    max: 100,
    step: 1,
    validation: {
      custom: (value: string) => {
        if (!/^\d+$/.test(value)) return 'Must be a whole number';
        return '';
      }
    }
  },
  date: {
    type: 'date',
    dateFormat: 'YYYY-MM-DD',
    validation: {
      custom: (value: string) => {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return 'Date must be YYYY-MM-DD';
        const d = new Date(value);
        if (isNaN(d.getTime())) return 'Invalid date';
        return '';
      }
    }
  },
  currency: {
    type: 'currency',
    placeholder: 'Enter amount',
    currency: '€',
    min: 0,
    step: 0.01,
    validation: {
      custom: (value: string) => {
        if (!/^\d+(\.\d{1,2})?$/.test(value)) return 'Must be a valid currency amount';
        return '';
      }
    }
  },
  double: {
    type: 'double',
    placeholder: 'Enter decimal number',
    min: 0,
    max: 1000,
    step: 0.01,
    validation: {
      custom: (value: string) => {
        if (!/^\d+(\.\d{1,2})?$/.test(value)) return 'Must be a valid decimal number';
        return '';
      }
    }
  }
};

// Example 5: Creating a rule type with advanced validation
const advancedValidationExample: XmlRuleType = {
  label: 'Email Address',
  value: 'email_address',
  comparators: [
    { label: 'Equals', value: 'equals' },
    { label: 'Contains', value: 'contains' },
    { label: 'Domain', value: 'domain' }
  ],
  inputField: {
    type: 'string',
    placeholder: 'Enter email address',
    validation: {
      pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
      custom: (value: string) => {
        if (value && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          return 'Please enter a valid email address';
        }
        // Additional validation: check for common disposable email domains
        const disposableDomains = ['tempmail.com', 'throwaway.com', 'test.com'];
        const domain = value.split('@')[1];
        if (domain && disposableDomains.includes(domain.toLowerCase())) {
          return 'Please use a non-disposable email address';
        }
        return '';
      }
    }
  }
};

export {
  customTypesWithInputFields,
  loadCustomTypesFromFile,
  loadCustomTypesFromObject,
  inputFieldTypeExamples,
  advancedValidationExample
}; 
// xmlTypes.ts
// Contains the xmlTypes array and related export for use throughout the app
// This can be configured with custom types

import { XmlRuleType, XmlTypesConfig } from './types';

// Default XML types
const defaultXmlTypes: XmlRuleType[] = [
  {
    label: 'Age',
    value: 'age',
    comparators: [
      { label: 'Equals', value: 'equals' },
      { label: 'Less Than', value: 'less_than' },
      { label: 'Greater Than', value: 'greater_than' },
      { label: 'Between', value: 'between' }
    ],
    inputField: {
      type: 'number',
      placeholder: 'Enter age',
      min: 0,
      max: 150,
      step: 1,
      validation: {
        custom: (value: string) => {
          if (!/^\d+$/.test(value)) return 'Age must be a whole number';
          const age = parseInt(value, 10);
          if (age < 0) return 'Age must be positive';
          if (age > 150) return 'Age must be less than 150';
          return '';
        }
      }
    }
  },
  {
    label: 'Date of Birth',
    value: 'dob',
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
          const today = new Date();
          if (d > today) return 'Date cannot be in the future';
          return '';
        }
      }
    }
  },
  {
    label: 'Email',
    value: 'email',
    comparators: [
      { label: 'Equals', value: 'equals' },
      { label: 'Contains', value: 'contains' },
      { label: 'Ends With', value: 'ends_with' },
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
          return '';
        }
      }
    }
  },
  {
    label: 'Postcode',
    value: 'postcode',
    comparators: [
      { label: 'Equals', value: 'equals' },
      { label: 'Starts With', value: 'starts_with' },
      { label: 'In Area', value: 'in_area' }
    ],
    inputField: {
      type: 'string',
      placeholder: 'Enter postcode',
      validation: {
        pattern: '^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$',
        custom: (value: string) => {
          if (value && !/^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i.test(value)) {
            return 'Please enter a valid UK postcode';
          }
          return '';
        }
      }
    }
  },
  {
    label: 'Zipcode',
    value: 'zipcode',
    comparators: [
      { label: 'Equals', value: 'equals' },
      { label: 'Starts With', value: 'starts_with' },
      { label: 'In Area', value: 'in_area' }
    ],
    inputField: {
      type: 'string',
      placeholder: 'Enter zipcode',
      validation: {
        pattern: '^\\d{5}(-\\d{4})?$',
        custom: (value: string) => {
          if (value && !/^\d{5}(-\d{4})?$/.test(value)) {
            return 'Please enter a valid US zipcode';
          }
          return '';
        }
      }
    }
  },
  {
    label: 'Income',
    value: 'income',
    comparators: [
      { label: 'Less Than', value: 'less_than' },
      { label: 'Greater Than', value: 'greater_than' },
      { label: 'Equals', value: 'equals' },
      { label: 'Between', value: 'between' }
    ],
    inputField: {
      type: 'currency',
      placeholder: 'Enter income',
      currency: '£',
      min: 0,
      step: 0.01,
      validation: {
        custom: (value: string) => {
          if (!/^\d+(\.\d{1,2})?$/.test(value)) return 'Income must be a valid number';
          const income = parseFloat(value);
          if (income < 0) return 'Income must be positive';
          if (income > 1000000) return 'Income seems too high';
          return '';
        }
      }
    }
  },
  {
    label: 'Salary',
    value: 'salary',
    comparators: [
      { label: 'Less Than', value: 'less_than' },
      { label: 'Greater Than', value: 'greater_than' },
      { label: 'Equals', value: 'equals' },
      { label: 'Between', value: 'between' }
    ],
    inputField: {
      type: 'currency',
      placeholder: 'Enter salary',
      currency: '$',
      min: 0,
      step: 0.01,
      validation: {
        custom: (value: string) => {
          if (!/^\d+(\.\d{1,2})?$/.test(value)) return 'Salary must be a valid number';
          const salary = parseFloat(value);
          if (salary < 0) return 'Salary must be positive';
          if (salary > 1000000) return 'Salary seems too high';
          return '';
        }
      }
    }
  },
  {
    label: 'Price',
    value: 'price',
    comparators: [
      { label: 'Less Than', value: 'less_than' },
      { label: 'Greater Than', value: 'greater_than' },
      { label: 'Equals', value: 'equals' },
      { label: 'Between', value: 'between' }
    ],
    inputField: {
      type: 'double',
      placeholder: 'Enter price',
      min: 0,
      step: 0.01,
      validation: {
        custom: (value: string) => {
          if (!/^\d+(\.\d{1,2})?$/.test(value)) return 'Price must be a valid number';
          const price = parseFloat(value);
          if (price < 0) return 'Price must be positive';
          return '';
        }
      }
    }
  },
  {
    label: 'Gender',
    value: 'gender',
    comparators: [
      { label: 'Equals', value: 'equals' },
      { label: 'Not Equals', value: 'not_equals' },
      { label: 'In', value: 'in' }
    ],
    inputField: {
      type: 'select',
      placeholder: 'Select gender',
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
        { label: 'Prefer not to say', value: 'prefer_not_to_say' }
      ]
    }
  },
  {
    label: 'Relationship Status',
    value: 'relationship_status',
    comparators: [
      { label: 'Equals', value: 'equals' },
      { label: 'Not Equals', value: 'not_equals' },
      { label: 'In', value: 'in' }
    ],
    inputField: {
      type: 'select',
      placeholder: 'Select status',
      options: [
        { label: 'Single', value: 'single' },
        { label: 'Married', value: 'married' },
        { label: 'Divorced', value: 'divorced' },
        { label: 'Widowed', value: 'widowed' },
        { label: 'Separated', value: 'separated' }
      ]
    }
  },
  {
    label: 'Nationality',
    value: 'nationality',
    comparators: [
      { label: 'Equals', value: 'equals' },
      { label: 'Not Equals', value: 'not_equals' },
      { label: 'In', value: 'in' }
    ],
    inputField: {
      type: 'string',
      placeholder: 'Enter nationality',
      validation: {
        minLength: 2,
        maxLength: 50,
        custom: (value: string) => {
          if (value && !/^[a-zA-Z\s]+$/.test(value)) {
            return 'Nationality should only contain letters and spaces';
          }
          return '';
        }
      }
    }
  },
  {
    label: 'Disabilities',
    value: 'disabilities',
    comparators: [
      { label: 'Has', value: 'has' },
      { label: 'Does Not Have', value: 'does_not_have' },
      { label: 'Count', value: 'count' }
    ],
    inputField: {
      type: 'number',
      placeholder: 'Enter number of disabilities',
      min: 0,
      max: 10,
      step: 1,
      validation: {
        custom: (value: string) => {
          if (!/^\d+$/.test(value)) return 'Must be a whole number';
          const count = parseInt(value, 10);
          if (count < 0) return 'Count must be positive';
          if (count > 10) return 'Count must be 10 or less';
          return '';
        }
      }
    }
  }
];

// Mutable array that can be updated with custom types
let xmlTypes: XmlRuleType[] = [...defaultXmlTypes];

// Function to set custom XML types
export function setXmlTypes(customTypes: XmlRuleType[]): void {
  xmlTypes = [...customTypes];
}

// Function to reset to default types
export function resetToDefaultTypes(): void {
  xmlTypes = [...defaultXmlTypes];
}

// Function to add custom types to existing ones
export function addXmlTypes(additionalTypes: XmlRuleType[]): void {
  xmlTypes = [...xmlTypes, ...additionalTypes];
}

// Function to load types from a configuration file
export async function loadXmlTypesFromFile(filePath: string): Promise<void> {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load config file: ${response.statusText}`);
    }
    const config: XmlTypesConfig = await response.json();
    
    if (!config.ruleTypes || !Array.isArray(config.ruleTypes)) {
      throw new Error('Invalid config file format: ruleTypes array is required');
    }
    
    // Validate the structure of each rule type
    for (const ruleType of config.ruleTypes) {
      if (!ruleType.label || !ruleType.value || !Array.isArray(ruleType.comparators)) {
        throw new Error(`Invalid rule type structure: ${JSON.stringify(ruleType)}`);
      }
      
      for (const comparator of ruleType.comparators) {
        if (!comparator.label || !comparator.value) {
          throw new Error(`Invalid comparator structure: ${JSON.stringify(comparator)}`);
        }
      }
    }
    
    xmlTypes = [...config.ruleTypes];
  } catch (error) {
    console.error('Error loading XML types from file:', error);
    throw error;
  }
}

// Function to load types from a configuration object
export function loadXmlTypesFromConfig(config: XmlTypesConfig): void {
  if (!config.ruleTypes || !Array.isArray(config.ruleTypes)) {
    throw new Error('Invalid config: ruleTypes array is required');
  }
  
  // Validate the structure of each rule type
  for (const ruleType of config.ruleTypes) {
    if (!ruleType.label || !ruleType.value || !Array.isArray(ruleType.comparators)) {
      throw new Error(`Invalid rule type structure: ${JSON.stringify(ruleType)}`);
    }
    
    for (const comparator of ruleType.comparators) {
      if (!comparator.label || !comparator.value) {
        throw new Error(`Invalid comparator structure: ${JSON.stringify(comparator)}`);
      }
    }
  }
  
  xmlTypes = [...config.ruleTypes];
}

// Export the current xmlTypes array
export { xmlTypes };

// Backward compatibility - readonly version
export const xmlTypesConst = xmlTypes;

// Type for the xmlTypes array
export type XmlTypesArray = typeof xmlTypes;
export type XmlType = XmlTypesArray[number];

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
    ]
  },
  {
    label: 'Date of Birth',
    value: 'dob',
    comparators: [
      { label: 'Before', value: 'before' },
      { label: 'After', value: 'after' },
      { label: 'On', value: 'on' },
      { label: 'Between', value: 'between' }
    ]
  },
  {
    label: 'Household Income',
    value: 'income',
    comparators: [
      { label: 'Less Than', value: 'less_than' },
      { label: 'Greater Than', value: 'greater_than' },
      { label: 'Equals', value: 'equals' },
      { label: 'Between', value: 'between' }
    ]
  },
  {
    label: 'Enrolment Status',
    value: 'enrolment_status',
    comparators: [
      { label: 'Equals', value: 'equals' },
      { label: 'Not Equals', value: 'not_equals' }
    ]
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

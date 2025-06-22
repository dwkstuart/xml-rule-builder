// xmlTypes.ts
// Contains the xmlTypes array and related export for use throughout the app
// This is configurable by users

export interface XmlRuleType {
  label: string;
  value: string;
  comparators: XmlComparator[];
}

export interface XmlComparator {
  label: string;
  value: string;
}

// Default xmlTypes that can be modified by users
export let xmlTypes: XmlRuleType[] = [
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

// Functions to configure xmlTypes
export function setXmlTypes(types: XmlRuleType[]): void {
  xmlTypes = [...types];
}

export function addXmlType(type: XmlRuleType): void {
  xmlTypes.push(type);
}

export function removeXmlType(value: string): void {
  xmlTypes = xmlTypes.filter(t => t.value !== value);
}

export function updateXmlType(value: string, updatedType: XmlRuleType): void {
  const index = xmlTypes.findIndex(t => t.value === value);
  if (index !== -1) {
    xmlTypes[index] = updatedType;
  }
}

export function getXmlTypes(): XmlRuleType[] {
  return [...xmlTypes];
}

// Backward compatibility - readonly version (deprecated)
export const xmlTypesConst = xmlTypes;

// Type for the xmlTypes array
export type XmlTypesArray = typeof xmlTypes;
export type XmlType = XmlTypesArray[number];

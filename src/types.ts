import { xmlTypes } from './xmlTypes';

// Input field types
export type InputFieldType = 'string' | 'number' | 'date' | 'currency' | 'double' | 'select';

// Input field configuration
export interface InputFieldConfig {
  type: InputFieldType;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  currency?: string;
  dateFormat?: string;
  options?: { label: string; value: string }[]; // For select type
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    custom?: (value: string) => string; // Returns error message or empty string
  };
}

export type RuleBlock =
  | {
      type: 'rule';
      ruleType: typeof xmlTypes[number];
      comparator: { label: string; value: string };
      value: string;
    }
  | {
      type: 'group';
      logic: 'AND' | 'OR';
      children: RuleBlock[];
    };

export interface RuleBuilderState {
  root: RuleBlock;
  xml: string;
  error: string;
}

export interface XmlBuilderOptions {
  indent?: boolean;
  prettyPrint?: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface XmlRuleType {
  label: string;
  value: string;
  comparators: XmlComparator[];
  inputField?: InputFieldConfig;
}

export interface XmlComparator {
  label: string;
  value: string;
}

// Configuration types for custom XML types
export interface XmlTypesConfig {
  ruleTypes: XmlRuleType[];
}

export interface XmlRuleBuilderConfig {
  xmlTypes?: XmlRuleType[];
  configFile?: string;
} 
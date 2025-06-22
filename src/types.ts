import { xmlTypes } from './xmlTypes';

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
}

export interface XmlComparator {
  label: string;
  value: string;
} 
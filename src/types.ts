import { XmlRuleType, XmlComparator } from './xmlTypes';

export type RuleBlock =
  | {
      type: 'rule';
      ruleType: XmlRuleType;
      comparator: XmlComparator;
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

// Re-export for convenience
export type { XmlRuleType, XmlComparator }; 
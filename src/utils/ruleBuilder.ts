import { RuleBlock } from '../types';
import { xmlTypes } from '../xmlTypes';

export function createDefaultRule(): RuleBlock {
  return {
    type: 'rule',
    ruleType: xmlTypes[0],
    comparator: xmlTypes[0].comparators[0],
    value: ''
  };
}

export function createDefaultGroup(): RuleBlock {
  return {
    type: 'group',
    logic: 'AND',
    children: [createDefaultRule()]
  };
}

// Function to create a rule with a specific rule type
export function createRuleWithType(ruleTypeValue: string): RuleBlock {
  const ruleType = xmlTypes.find(t => t.value === ruleTypeValue);
  if (!ruleType) {
    throw new Error(`Rule type '${ruleTypeValue}' not found in configured types`);
  }
  
  return {
    type: 'rule',
    ruleType,
    comparator: ruleType.comparators[0],
    value: ''
  };
} 
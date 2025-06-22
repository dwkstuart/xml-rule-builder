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
// Core types and interfaces
export type { RuleBlock, RuleBuilderState, XmlBuilderOptions, ValidationResult, XmlRuleType, XmlComparator } from './types';

// Core utilities
export { xmlToRules } from './utils/xmlToRules';
export { rulesToXml } from './utils/rulesToXml';
export { validateRuleBlock } from './utils/validation';

// Rule builder utilities
export { createDefaultRule, createDefaultGroup } from './utils/ruleBuilder';
export { 
  updateBlockByPath, 
  addRuleToGroup, 
  addGroupToGroup, 
  removeBlockFromGroup 
} from './utils/blockOperations';

// React components (optional - for UI usage)
export { default as XmlRuleBuilder } from './components/XmlRuleBuilder';

// Constants and configuration
export { xmlTypes } from './xmlTypes';
export { 
  setXmlTypes, 
  addXmlType, 
  removeXmlType, 
  updateXmlType, 
  getXmlTypes 
} from './xmlTypes';
export type { XmlTypesArray, XmlType } from './xmlTypes'; 
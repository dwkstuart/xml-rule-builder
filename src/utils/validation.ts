import { RuleBlock, ValidationResult } from '../types';

export function validateRuleBlock(block: RuleBlock): ValidationResult {
  const errors: string[] = [];
  
  function validateBlock(block: RuleBlock, path: string = 'root'): void {
    if (block.type === 'rule') {
      if (!block.value || block.value.trim() === '') {
        errors.push(`${path}: Rule value is required`);
      }
      
      // Type-specific validation
      if (block.ruleType.value === 'age') {
        if (!/^\d+$/.test(block.value)) {
          errors.push(`${path}: Age must be a whole number`);
        }
        if (parseInt(block.value, 10) < 0) {
          errors.push(`${path}: Age must be positive`);
        }
      }
      
      if (block.ruleType.value === 'dob') {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(block.value)) {
          errors.push(`${path}: Date must be in YYYY-MM-DD format`);
        }
        const date = new Date(block.value);
        if (isNaN(date.getTime())) {
          errors.push(`${path}: Invalid date`);
        }
      }
      
      if (block.ruleType.value === 'income') {
        if (!/^\d+(\.\d{1,2})?$/.test(block.value)) {
          errors.push(`${path}: Income must be a valid number`);
        }
        if (parseFloat(block.value) < 0) {
          errors.push(`${path}: Income must be positive`);
        }
      }
    } else {
      if (block.children.length === 0) {
        errors.push(`${path}: Group must have at least one child`);
      }
      
      block.children.forEach((child, index) => {
        validateBlock(child, `${path}.children[${index}]`);
      });
    }
  }
  
  validateBlock(block);
  
  return {
    isValid: errors.length === 0,
    errors
  };
} 
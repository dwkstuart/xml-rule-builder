import { 
  xmlToRules, 
  rulesToXml, 
  validateRuleBlock, 
  createDefaultGroup
} from '../src/index';

// Example 1: Parse XML to rules
const xmlString = `
<rules>
  <group logic="AND">
    <age comparator="greater_than">18</age>
    <income comparator="less_than">50000</income>
  </group>
</rules>
`;

const rules = xmlToRules(xmlString);
console.log('Parsed rules:', JSON.stringify(rules, null, 2));

// Example 2: Convert rules back to XML
const generatedXml = rulesToXml(rules);
console.log('Generated XML:', generatedXml);

// Example 3: Validate rules
const validation = validateRuleBlock(rules);
console.log('Validation result:', validation);

// Example 4: Create default rules
const defaultRules = createDefaultGroup();
console.log('Default rules:', JSON.stringify(defaultRules, null, 2));

// Example 5: Validate default rules (should have validation errors)
const defaultValidation = validateRuleBlock(defaultRules);
console.log('Default validation:', defaultValidation); 
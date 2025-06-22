import { 
  setXmlTypes,
  resetToDefaultTypes,
  addXmlTypes,
  loadXmlTypesFromConfig,
  loadXmlTypesFromFile,
  createDefaultGroup,
  rulesToXml,
  validateRuleBlock,
  type XmlRuleType,
  type XmlTypesConfig
} from '../src/index';

// Example 1: Set custom types directly
const customTypes: XmlRuleType[] = [
  {
    label: 'GPA',
    value: 'gpa',
    comparators: [
      { label: 'Greater Than', value: 'greater_than' },
      { label: 'Less Than', value: 'less_than' },
      { label: 'Equals', value: 'equals' },
      { label: 'Between', value: 'between' }
    ]
  },
  {
    label: 'Course Level',
    value: 'course_level',
    comparators: [
      { label: 'Equals', value: 'equals' },
      { label: 'Not Equals', value: 'not_equals' },
      { label: 'In', value: 'in' }
    ]
  }
];

setXmlTypes(customTypes);
console.log('Custom types set:', customTypes);

// Example 2: Load from configuration object
const config: XmlTypesConfig = {
  ruleTypes: [
    {
      label: 'Age',
      value: 'age',
      comparators: [
        { label: 'Equals', value: 'equals' },
        { label: 'Less Than', value: 'less_than' },
        { label: 'Greater Than', value: 'greater_than' }
      ]
    },
    {
      label: 'Income',
      value: 'income',
      comparators: [
        { label: 'Less Than', value: 'less_than' },
        { label: 'Greater Than', value: 'greater_than' }
      ]
    }
  ]
};

loadXmlTypesFromConfig(config);
console.log('Types loaded from config');

// Example 3: Add additional types to existing ones
const additionalTypes: XmlRuleType[] = [
  {
    label: 'Test Score',
    value: 'test_score',
    comparators: [
      { label: 'Greater Than', value: 'greater_than' },
      { label: 'Less Than', value: 'less_than' }
    ]
  }
];

addXmlTypes(additionalTypes);
console.log('Additional types added');

// Example 4: Create rules with custom types
const rules = createDefaultGroup();
console.log('Rules with custom types:', JSON.stringify(rules, null, 2));

// Example 5: Generate XML with custom types
const xml = rulesToXml(rules);
console.log('Generated XML:', xml);

// Example 6: Validate rules
const validation = validateRuleBlock(rules);
console.log('Validation result:', validation);

// Example 7: Reset to default types
resetToDefaultTypes();
console.log('Reset to default types');

// Example 8: Load from file (async)
async function loadFromFile() {
  try {
    await loadXmlTypesFromFile('./examples/custom-types-config.json');
    console.log('Types loaded from file');
    
    const rulesWithFileTypes = createDefaultGroup();
    const xmlFromFile = rulesToXml(rulesWithFileTypes);
    console.log('XML with file types:', xmlFromFile);
  } catch (error) {
    console.error('Error loading from file:', error);
  }
}

// Call the function to demonstrate file loading
loadFromFile();

// Example 9: React component usage (for reference)
// In a React component, you would use it like this:
/*
import { XmlRuleBuilder } from 'xml-rules-builder';

function MyComponent() {
  const customConfig = {
    xmlTypes: [
      {
        label: 'Custom Field',
        value: 'custom_field',
        comparators: [
          { label: 'Equals', value: 'equals' },
          { label: 'Not Equals', value: 'not_equals' }
        ]
      }
    ]
  };

  return (
    <XmlRuleBuilder 
      config={customConfig}
      onXmlChange={(xml) => console.log('Generated XML:', xml)}
    />
  );
}
*/ 
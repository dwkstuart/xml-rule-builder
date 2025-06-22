import { 
  setXmlTypes, 
  addXmlType, 
  removeXmlType, 
  updateXmlType, 
  getXmlTypes,
  createDefaultGroup,
  rulesToXml,
  type XmlRuleType 
} from '../src/index';

// Example 1: Replace all rule types with custom ones
const customTypes: XmlRuleType[] = [
  {
    label: 'Score',
    value: 'score',
    comparators: [
      { label: 'Greater Than', value: 'greater_than' },
      { label: 'Less Than', value: 'less_than' },
      { label: 'Equals', value: 'equals' },
      { label: 'Between', value: 'between' }
    ]
  },
  {
    label: 'Category',
    value: 'category',
    comparators: [
      { label: 'Equals', value: 'equals' },
      { label: 'Not Equals', value: 'not_equals' }
    ]
  },
  {
    label: 'Priority',
    value: 'priority',
    comparators: [
      { label: 'High', value: 'high' },
      { label: 'Medium', value: 'medium' },
      { label: 'Low', value: 'low' }
    ]
  }
];

setXmlTypes(customTypes);
console.log('Custom types set:', getXmlTypes());

// Example 2: Add a new rule type
addXmlType({
  label: 'Status',
  value: 'status',
  comparators: [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Pending', value: 'pending' }
  ]
});
console.log('After adding status:', getXmlTypes());

// Example 3: Remove a rule type
removeXmlType('priority');
console.log('After removing priority:', getXmlTypes());

// Example 4: Update an existing rule type
updateXmlType('score', {
  label: 'Test Score',
  value: 'score',
  comparators: [
    { label: 'Pass', value: 'pass' },
    { label: 'Fail', value: 'fail' },
    { label: 'Excellent', value: 'excellent' }
  ]
});
console.log('After updating score:', getXmlTypes());

// Example 5: Create rules with the new types
const rules = createDefaultGroup();
console.log('Default rules with custom types:', JSON.stringify(rules, null, 2));

// Example 6: Generate XML with custom types
const xml = rulesToXml(rules);
console.log('Generated XML with custom types:', xml); 
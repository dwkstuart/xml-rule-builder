# XML Rules Builder

A TypeScript library for building and managing XML-based rule systems, with optional React components for UI integration.

## Features

- **Pure TypeScript API** for XML rule manipulation
- **React Components** for easy UI integration
- **Validation** with detailed error reporting
- **Type Safety** with full TypeScript support
- **Configurable Rule Types** - users can define and modify rule types
- **Flexible Rule Structure** supporting nested groups with AND/OR logic

## Installation

```bash
npm install xml-rules-builder
```

## Usage

### Core API (TypeScript)

```typescript
import { 
  xmlToRules, 
  rulesToXml, 
  validateRuleBlock, 
  createDefaultGroup,
  type RuleBlock 
} from 'xml-rules-builder';

// Convert XML to rule structure
const xmlString = `<rules><group logic="AND"><age comparator="greater_than">18</age></group></rules>`;
const rules = xmlToRules(xmlString);

// Convert rules back to XML
const xml = rulesToXml(rules);

// Validate rules
const validation = validateRuleBlock(rules);
if (!validation.isValid) {
  console.log('Validation errors:', validation.errors);
}

// Create default rule structure
const defaultRules = createDefaultGroup();
```

### Configuring Rule Types

The library comes with default rule types, but you can configure them to match your needs:

```typescript
import { 
  setXmlTypes, 
  addXmlType, 
  removeXmlType, 
  updateXmlType, 
  getXmlTypes,
  type XmlRuleType 
} from 'xml-rules-builder';

// Replace all rule types
const customTypes: XmlRuleType[] = [
  {
    label: 'Score',
    value: 'score',
    comparators: [
      { label: 'Greater Than', value: 'greater_than' },
      { label: 'Less Than', value: 'less_than' },
      { label: 'Equals', value: 'equals' }
    ]
  },
  {
    label: 'Category',
    value: 'category',
    comparators: [
      { label: 'Equals', value: 'equals' },
      { label: 'Not Equals', value: 'not_equals' }
    ]
  }
];

setXmlTypes(customTypes);

// Add a new rule type
addXmlType({
  label: 'Priority',
  value: 'priority',
  comparators: [
    { label: 'High', value: 'high' },
    { label: 'Medium', value: 'medium' },
    { label: 'Low', value: 'low' }
  ]
});

// Remove a rule type
removeXmlType('age');

// Update an existing rule type
updateXmlType('score', {
  label: 'Test Score',
  value: 'score',
  comparators: [
    { label: 'Pass', value: 'pass' },
    { label: 'Fail', value: 'fail' }
  ]
});

// Get current rule types
const currentTypes = getXmlTypes();
```

### React Components

```typescript
import { XmlRuleBuilder } from 'xml-rules-builder';

function MyComponent() {
  const handleXmlChange = (xml: string) => {
    console.log('Generated XML:', xml);
  };

  const handleValidationChange = (isValid: boolean, errors: string[]) => {
    if (!isValid) {
      console.log('Validation errors:', errors);
    }
  };

  return (
    <XmlRuleBuilder 
      onXmlChange={handleXmlChange}
      onValidationChange={handleValidationChange}
      initialRules={defaultRules}
    />
  );
}
```

## API Reference

### Core Functions

#### `xmlToRules(xmlString: string): RuleBlock`
Parse XML string to rule structure.

#### `rulesToXml(rules: RuleBlock, options?: XmlBuilderOptions): string`
Convert rules to XML string.

**Options:**
- `indent?: boolean` - Enable pretty printing (default: true)
- `prettyPrint?: boolean` - Enable indentation (default: true)

#### `validateRuleBlock(block: RuleBlock): ValidationResult`
Validate rule structure and return validation result.

#### `createDefaultRule(): RuleBlock`
Create a default rule with the first available rule type.

#### `createDefaultGroup(): RuleBlock`
Create a default group containing one default rule.

### Rule Type Configuration

#### `setXmlTypes(types: XmlRuleType[]): void`
Replace all rule types with the provided array.

#### `addXmlType(type: XmlRuleType): void`
Add a new rule type to the existing list.

#### `removeXmlType(value: string): void`
Remove a rule type by its value.

#### `updateXmlType(value: string, updatedType: XmlRuleType): void`
Update an existing rule type.

#### `getXmlTypes(): XmlRuleType[]`
Get a copy of the current rule types array.

### Block Operations

#### `updateBlockByPath(root: RuleBlock, path: number[], updater: (block: RuleBlock) => RuleBlock): RuleBlock`
Update a block at a specific path using an updater function.

#### `addRuleToGroup(group: RuleBlock, index: number): RuleBlock`
Add a new rule to a group at the specified index.

#### `addGroupToGroup(group: RuleBlock, index: number): RuleBlock`
Add a new group to a group at the specified index.

#### `removeBlockFromGroup(group: RuleBlock, index: number): RuleBlock`
Remove a block from a group at the specified index.

### Types

#### `RuleBlock`
Union type representing either a rule or a group:

```typescript
type RuleBlock = 
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
```

#### `XmlRuleType`
Represents a rule type with its comparators:

```typescript
interface XmlRuleType {
  label: string;
  value: string;
  comparators: XmlComparator[];
}
```

#### `XmlComparator`
Represents a comparator for a rule type:

```typescript
interface XmlComparator {
  label: string;
  value: string;
}
```

#### `ValidationResult`
Result of rule validation:

```typescript
interface ValidationResult {
  isValid: boolean;
  errors: string[];
}
```

### React Components

#### `XmlRuleBuilder`

A React component for building XML rules with a visual interface.

**Props:**
- `onXmlChange?: (xml: string) => void` - Callback when XML changes
- `initialRules?: RuleBlock | null` - Initial rule structure
- `onValidationChange?: (isValid: boolean, errors: string[]) => void` - Callback when validation changes

## Default Rule Types

The library includes these default rule types that can be modified:

- **Age**: Equals, Less Than, Greater Than, Between
- **Date of Birth**: Before, After, On, Between
- **Household Income**: Less Than, Greater Than, Equals, Between
- **Enrolment Status**: Equals, Not Equals

## Example XML Output

```xml
<rules>
  <group logic="AND">
    <age comparator="greater_than">18</age>
    <income comparator="less_than">50000</income>
    <group logic="OR">
      <dob comparator="after">2000-01-01</dob>
      <enrolment_status comparator="equals">full_time</enrolment_status>
    </group>
  </group>
</rules>
```

## Development

### Building the Library

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

### Linting

```bash
npm run lint
```

### Testing

```bash
npm test
```

## License

MIT

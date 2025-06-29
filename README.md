# XML Rule Builder

A TypeScript library for building and managing XML-based rule systems, with optional React components for UI integration.

## Features

- **Pure TypeScript API** for XML rule manipulation
- **React Components** for easy UI integration
- **Validation** with detailed error reporting
- **Type Safety** with full TypeScript support
- **Configurable Rule Types** - define your own custom rule types
- **Flexible Rule Structure** supporting nested groups with AND/OR logic

## Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0
- React >= 18.0.0 (for React components)
- Material-UI >= 7.0.0 (for React components)

## Installation

```bash
npm install xml-rule-builder
```

## Quick Start

1. Install the package:
   ```bash
   npm install xml-rule-builder
   ```

2. Import and use:
   ```typescript
   import { XmlRuleBuilder } from 'xml-rule-builder';
   ```

3. Add to your React component:
   ```typescript
   <XmlRuleBuilder onXmlChange={(xml) => console.log(xml)} />
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
} from 'xml-rule-builder';

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

### Configurable XML Types

The library allows you to define custom rule types and comparators:

#### Method 1: Set custom types directly

```typescript
import { setXmlTypes, type XmlRuleType } from 'xml-rule-builder';

const customTypes: XmlRuleType[] = [
  {
    label: 'GPA',
    value: 'gpa',
    comparators: [
      { label: 'Greater Than', value: 'greater_than' },
      { label: 'Less Than', value: 'less_than' },
      { label: 'Equals', value: 'equals' }
    ]
  },
  {
    label: 'Course Level',
    value: 'course_level',
    comparators: [
      { label: 'Equals', value: 'equals' },
      { label: 'Not Equals', value: 'not_equals' }
    ]
  }
];

setXmlTypes(customTypes);
```

#### Method 2: Load from configuration object

```typescript
import { loadXmlTypesFromConfig, type XmlTypesConfig } from 'xml-rule-builder';

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
    }
  ]
};

loadXmlTypesFromConfig(config);
```

#### Method 3: Load from configuration file

```typescript
import { loadXmlTypesFromFile } from 'xml-rule-builder';

// Load from a JSON file
await loadXmlTypesFromFile('./config/xml-types.json');
```

Configuration file format (`xml-types.json`):
```json
{
  "ruleTypes": [
    {
      "label": "Age",
      "value": "age",
      "comparators": [
        { "label": "Equals", "value": "equals" },
        { "label": "Less Than", "value": "less_than" },
        { "label": "Greater Than", "value": "greater_than" }
      ]
    },
    {
      "label": "GPA",
      "value": "gpa",
      "comparators": [
        { "label": "Greater Than", "value": "greater_than" },
        { "label": "Less Than", "value": "less_than" }
      ]
    }
  ]
}
```

#### Method 4: Add to existing types

```typescript
import { addXmlTypes } from 'xml-rule-builder';

const additionalTypes = [
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
```

#### Reset to default types

```typescript
import { resetToDefaultTypes } from 'xml-rule-builder';

resetToDefaultTypes();
```

### React Components

```typescript
import { XmlRuleBuilder } from 'xml-rule-builder';

function MyComponent() {
  const handleXmlChange = (xml: string) => {
    console.log('Generated XML:', xml);
  };

  const handleValidationChange = (isValid: boolean, errors: string[]) => {
    if (!isValid) {
      console.log('Validation errors:', errors);
    }
  };

  // Use with custom types
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
      onXmlChange={handleXmlChange}
      onValidationChange={handleValidationChange}
      config={customConfig}
    />
  );
}
```

## Examples

### Basic Usage
See [examples/basic-usage.ts](./examples/basic-usage.ts) for a simple implementation.

### Custom Types
See [examples/configurable-types-usage.ts](./examples/configurable-types-usage.ts) for custom type configuration.

### Demo Page
See [examples/demo-page.html](./examples/demo-page.html) for a complete interactive demo.

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

#### `createRuleWithType(ruleTypeValue: string): RuleBlock`
Create a rule with a specific rule type.

### Configuration Functions

#### `setXmlTypes(customTypes: XmlRuleType[]): void`
Replace all XML types with custom types.

#### `loadXmlTypesFromConfig(config: XmlTypesConfig): void`
Load XML types from a configuration object.

#### `loadXmlTypesFromFile(filePath: string): Promise<void>`
Load XML types from a JSON configuration file.

#### `addXmlTypes(additionalTypes: XmlRuleType[]): void`
Add additional types to existing ones.

#### `resetToDefaultTypes(): void`
Reset to the default XML types.

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

#### `XmlTypesConfig`
Configuration object for XML types:

```typescript
interface XmlTypesConfig {
  ruleTypes: XmlRuleType[];
}
```

#### `XmlRuleBuilderConfig`
Configuration for the React component:

```typescript
interface XmlRuleBuilderConfig {
  xmlTypes?: XmlRuleType[];
  configFile?: string;
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
- `config?: XmlRuleBuilderConfig` - Configuration for custom types

## Default Rule Types

The library includes default rule types that can be replaced or extended:

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

## Troubleshooting

### Common Issues

**TypeScript errors with Material-UI components**
- Ensure you have `@mui/material` installed as a peer dependency
- Make sure you're using compatible versions of React and Material-UI

**Build errors**
- Run `npm run build:clean` to ensure a clean build
- Check that all dependencies are properly installed

**Validation errors**
- Use the `onValidationChange` callback to get detailed error messages
- Ensure your rule structure follows the expected format

**ESLint configuration issues**
- The project uses ESLint 9+ with flat config format
- Ensure `eslint.config.mjs` is properly configured
- Check that all required ESLint plugins are installed

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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

### Development Setup

```bash
git clone https://github.com/dwkstuart/xml-rule-builder.git
cd xml-rule-builder
npm install
npm run dev
```

### Code Style

- Follow TypeScript best practices
- Avoid using `any` type (use proper type definitions)
- Create small, reusable components where possible
- Ensure properties are correctly passed between components
- Write tests for new functionality

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a list of changes and version history.

## Support

- **Issues**: [GitHub Issues](https://github.com/dwkstuart/xml-rule-builder/issues)
- **Documentation**: [GitHub Wiki](https://github.com/dwkstuart/xml-rule-builder/wiki)

## License

GPL-3.0

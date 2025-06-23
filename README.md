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

### Input Field Types

The library supports different input field types for rule values, providing appropriate validation and UI components:

#### Supported Input Field Types

- **`string`**: Text input with optional pattern and length validation
- **`number`**: Integer input with min/max constraints
- **`date`**: Date picker with format validation
- **`currency`**: Numeric input with currency symbol and decimal formatting
- **`double`**: Decimal number input with precision control

#### Input Field Configuration

Each rule type can specify an `inputField` configuration:

```typescript
interface InputFieldConfig {
  type: 'string' | 'number' | 'date' | 'currency' | 'double';
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  currency?: string;
  dateFormat?: string;
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    custom?: (value: string) => string; // Returns error message or empty string
  };
}
```

#### Example: Custom Types with Input Fields

```typescript
const customTypesWithInputFields: XmlRuleType[] = [
  {
    label: 'Product Price',
    value: 'product_price',
    comparators: [
      { label: 'Less Than', value: 'less_than' },
      { label: 'Greater Than', value: 'greater_than' },
      { label: 'Equals', value: 'equals' }
    ],
    inputField: {
      type: 'currency',
      placeholder: 'Enter price',
      currency: '$',
      min: 0,
      step: 0.01,
      validation: {
        custom: (value: string) => {
          if (!/^\d+(\.\d{1,2})?$/.test(value)) return 'Price must be a valid number';
          const price = parseFloat(value);
          if (price < 0) return 'Price must be positive';
          if (price > 10000) return 'Price seems too high';
          return '';
        }
      }
    }
  },
  {
    label: 'Product Launch Date',
    value: 'product_launch_date',
    comparators: [
      { label: 'Before', value: 'before' },
      { label: 'After', value: 'after' },
      { label: 'On', value: 'on' }
    ],
    inputField: {
      type: 'date',
      dateFormat: 'YYYY-MM-DD',
      validation: {
        custom: (value: string) => {
          if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return 'Date must be YYYY-MM-DD';
          const d = new Date(value);
          if (isNaN(d.getTime())) return 'Invalid date';
          return '';
        }
      }
    }
  },
  {
    label: 'Product Category',
    value: 'product_category',
    comparators: [
      { label: 'Equals', value: 'equals' },
      { label: 'Not Equals', value: 'not_equals' }
    ],
    inputField: {
      type: 'string',
      placeholder: 'Enter category',
      validation: {
        minLength: 2,
        maxLength: 50,
        custom: (value: string) => {
          const validCategories = ['electronics', 'clothing', 'books', 'home'];
          if (value && !validCategories.includes(value.toLowerCase())) {
            return `Please enter a valid category: ${validCategories.join(', ')}`;
          }
          return '';
        }
      }
    }
  }
];
```

#### Loading from Configuration File

You can also define input field types in JSON configuration files:

```json
{
  "ruleTypes": [
    {
      "label": "Product Price",
      "value": "product_price",
      "comparators": [
        { "label": "Less Than", "value": "less_than" },
        { "label": "Greater Than", "value": "greater_than" },
        { "label": "Equals", "value": "equals" }
      ],
      "inputField": {
        "type": "currency",
        "placeholder": "Enter price",
        "currency": "$",
        "min": 0,
        "step": 0.01,
        "validation": {
          "custom": "function(value) { if (!/^\\d+(\\.\\d{1,2})?$/.test(value)) return 'Price must be a valid number'; const price = parseFloat(value); if (price < 0) return 'Price must be positive'; return ''; }"
        }
      }
    }
  ]
}
```

See [examples/custom-types-with-input-fields.json](./examples/custom-types-with-input-fields.json) for a complete example configuration file.

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

- **Age**: Equals, Less Than, Greater Than, Between (number input)
- **Date of Birth**: Before, After, On, Between (date input)
- **Email**: Equals, Contains, Ends With, Domain (string input with email validation)
- **Postcode**: Equals, Starts With, In Area (string input with UK postcode validation)
- **Zipcode**: Equals, Starts With, In Area (string input with US zipcode validation)
- **Income**: Less Than, Greater Than, Equals, Between (currency input with £ symbol)
- **Salary**: Less Than, Greater Than, Equals, Between (currency input with $ symbol)
- **Price**: Less Than, Greater Than, Equals, Between (double input for decimal numbers)
- **Gender**: Equals, Not Equals, In (string input with predefined options)
- **Relationship Status**: Equals, Not Equals, In (string input with predefined options)
- **Nationality**: Equals, Not Equals, In (string input with letter validation)
- **Disabilities**: Has, Does Not Have, Count (number input for counting)

## Example XML Output

```xml
<rules>
  <group logic="AND">
    <age comparator="greater_than">18</age>
    <income comparator="less_than">50000</income>
    <group logic="OR">
      <dob comparator="after">2000-01-01</dob>
      <gender comparator="equals">male</gender>
    </group>
  </group>
</rules>
```

## Examples

### Basic Usage
See [examples/basic-usage.ts](./examples/basic-usage.ts) for a simple implementation.

### Custom Types
See [examples/configurable-types-usage.ts](./examples/configurable-types-usage.ts) for custom type configuration.

### Input Field Types
See [examples/input-field-types-usage.ts](./examples/input-field-types-usage.ts) for examples of different input field types.

### Demo Page
See [examples/demo-page.html](./examples/demo-page.html) for a complete interactive demo.

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

## Mini App Demo (UMD Bundle)

You can try the real XML Rule Builder UI in a browser using the mini app demo:

1. **Build the library as a UMD bundle** (so it exposes `window.XmlRuleBuilder`):
   
   ```bash
   npm run build
   # or if you use a custom script for UMD:
   npm run build:umd
   ```
   This will output a UMD bundle in the `dist/` directory (e.g. `dist/xml-rule-builder.umd.js`).

2. **Serve the project locally** (do not use `file://`):
   
   ```bash
   npx serve .
   # or
   npx http-server .
   ```

3. **Open the mini app**:
   
   Go to [http://localhost:5000/examples/mini-app.html](http://localhost:5000/examples/mini-app.html) (or the port your server uses).

The mini app will use the actual built library and always reflect the latest features and input field types.
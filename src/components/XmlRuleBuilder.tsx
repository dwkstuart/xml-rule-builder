import React from 'react';
import { RuleBlock, XmlRuleBuilderConfig } from '../types';
import { xmlTypes } from '../xmlTypes';
import { createDefaultGroup } from '../utils/ruleBuilder';
import { addRuleToGroup, addGroupToGroup, removeBlockFromGroup, updateBlockByPath } from '../utils/blockOperations';
import { validateRuleBlock } from '../utils/validation';
import { rulesToXml } from '../utils/rulesToXml';
import { getInputProps, validateInput, getCurrencySymbol } from '../utils/inputFieldUtils';
// Material UI imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

interface XmlRuleBuilderProps {
  onXmlChange?: (xml: string) => void;
  initialRules?: RuleBlock | null;
  onValidationChange?: (isValid: boolean, errors: string[]) => void;
  config?: XmlRuleBuilderConfig;
}

const GroupBlock: React.FC<{
  block: RuleBlock;
  path: number[];
  parent: RuleBlock | null;
  onUpdate: (path: number[], updater: (block: RuleBlock) => RuleBlock) => void;
  onAddRule: (path: number[], index: number) => void;
  onAddGroup: (path: number[], index: number) => void;
  onRemoveBlock: (path: number[], index: number) => void;
  availableTypes: typeof xmlTypes;
}> = ({ block, path, parent, onUpdate, onAddRule, onAddGroup, onRemoveBlock, availableTypes }) => {
  const [inputError, setInputError] = React.useState<string>('');

  if (block.type === 'rule') {
    const inputField = block.ruleType.inputField;
    const inputProps = inputField ? getInputProps(inputField) : { type: 'text' };
    const currencySymbol = inputField ? getCurrencySymbol(inputField) : null;

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let val = e.target.value;
      let error = '';

      // Apply formatting for currency and double types
      if (inputField?.type === 'currency' && val) {
        const num = parseFloat(val);
        if (!isNaN(num)) {
          val = num.toFixed(2);
        }
      } else if (inputField?.type === 'double' && val) {
        const num = parseFloat(val);
        if (!isNaN(num)) {
          val = num.toFixed(2);
        }
      }

      // Validate the input
      if (inputField) {
        error = validateInput(val, inputField);
      }

      setInputError(error);
      onUpdate(path, (block) => {
        if (block.type !== 'rule') return block;
        return { ...block, value: val };
      });
    };

    return (
      <Paper elevation={2} sx={{ p: 2, m: 1, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Select
          value={block.ruleType.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement> | (Event & { target: { value: unknown; name: string } })) => onUpdate(path, (block) => {
            if (block.type !== 'rule') return block;
            const ruleType = availableTypes.find(t => t.value === e.target.value as string)!;
            return {
              ...block,
              ruleType,
              comparator: ruleType.comparators[0],
              value: ''
            };
          })}
          size="small"
          sx={{ minWidth: 140 }}
        >
          {availableTypes.map(type => (
            <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
          ))}
        </Select>
        <Select
          value={block.comparator?.value || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement> | (Event & { target: { value: unknown; name: string } })) => onUpdate(path, (block) => {
            if (block.type !== 'rule') return block;
            const ruleType = block.ruleType;
            return {
              ...block,
              comparator: ruleType.comparators.find(c => c.value === e.target.value as string)!
            };
          })}
          size="small"
          sx={{ minWidth: 140 }}
        >
          {Array.isArray(block.ruleType?.comparators)
            ? (block.ruleType.comparators as { label: string; value: string }[]).map((comp) => (
                <MenuItem key={comp.value} value={comp.value}>{comp.label}</MenuItem>
              ))
            : null}
        </Select>
        <TextField
          {...inputProps}
          value={block.value}
          onChange={handleValueChange}
          size="small"
          error={!!inputError}
          helperText={inputError}
          sx={{ minWidth: 120 }}
          InputProps={currencySymbol ? { 
            startAdornment: <InputAdornment position="start">{currencySymbol}</InputAdornment> 
          } : undefined}
        />
        {parent && (
          <Button 
            onClick={() => onRemoveBlock(path.slice(0, -1), path[path.length - 1])} 
            color="error" 
            variant="outlined" 
            size="small" 
            sx={{ ml: 1 }}
          >
            Remove Rule
          </Button>
        )}
      </Paper>
    );
  }

  // group
  return (
    <Paper elevation={3} sx={{ p: 2, m: 2, borderRadius: 2 }}>
      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
        <Select
          value={block.logic}
          onChange={(e: React.ChangeEvent<HTMLInputElement> | (Event & { target: { value: unknown; name: string } })) => onUpdate(path, (block) => {
            if (block.type !== 'group') return block;
            return { ...block, logic: e.target.value as 'AND' | 'OR' };
          })}
          size="small"
        >
          <MenuItem value="AND">ALL MATCH</MenuItem>
          <MenuItem value="OR">ONE MATCHES</MenuItem>
        </Select>
        {parent && (
          <Button 
            onClick={() => onRemoveBlock(path.slice(0, -1), path[path.length - 1])} 
            color="error" 
            variant="outlined" 
            size="small"
          >
            Remove Group
          </Button>
        )}
      </Stack>
      <Box ml={2}>
        {block.children.map((child, i) => (
          <GroupBlock 
            key={i} 
            block={child} 
            path={[...path, i]} 
            parent={block}
            onUpdate={onUpdate}
            onAddRule={onAddRule}
            onAddGroup={onAddGroup}
            onRemoveBlock={onRemoveBlock}
            availableTypes={availableTypes}
          />
        ))}
      </Box>
      <Stack direction="row" spacing={2} mt={2}>
        <Button 
          onClick={() => onAddRule(path, block.children.length - 1)} 
          variant="contained" 
          size="small"
        >
          Add Rule
        </Button>
        <Button 
          onClick={() => onAddGroup(path, block.children.length - 1)} 
          variant="contained" 
          size="small"
        >
          Add Group
        </Button>
      </Stack>
    </Paper>
  );
};

const XmlRuleBuilder: React.FC<XmlRuleBuilderProps> = ({ 
  onXmlChange, 
  initialRules, 
  onValidationChange,
  config
}) => {
  const [root, setRoot] = React.useState<RuleBlock>(initialRules || createDefaultGroup());
  const [xml, setXml] = React.useState<string>('');
  const [validation, setValidation] = React.useState<{ isValid: boolean; errors: string[] }>({ isValid: false, errors: [] });

  // Use custom types if provided in config, otherwise use default types
  const availableTypes = config?.xmlTypes || xmlTypes;

  React.useEffect(() => {
    if (initialRules) {
      setRoot(initialRules);
    }
  }, [initialRules]);

  React.useEffect(() => {
    const validationResult = validateRuleBlock(root);
    setValidation(validationResult);
    if (onValidationChange) {
      onValidationChange(validationResult.isValid, validationResult.errors);
    }
  }, [root, onValidationChange]);

  React.useEffect(() => {
    if (validation.isValid) {
      const generatedXml = rulesToXml(root);
      setXml(generatedXml);
      if (onXmlChange) {
        onXmlChange(generatedXml);
      }
    }
  }, [root, validation.isValid, onXmlChange]);

  const handleUpdate = (path: number[], updater: (block: RuleBlock) => RuleBlock) => {
    setRoot(updateBlockByPath(root, path, updater));
  };

  const handleAddRule = (path: number[], index: number) => {
    setRoot(updateBlockByPath(root, path, (block) => {
      if (block.type !== 'group') return block;
      return addRuleToGroup(block, index);
    }));
  };

  const handleAddGroup = (path: number[], index: number) => {
    setRoot(updateBlockByPath(root, path, (block) => {
      if (block.type !== 'group') return block;
      return addGroupToGroup(block, index);
    }));
  };

  const handleRemoveBlock = (path: number[], index: number) => {
    setRoot(updateBlockByPath(root, path.slice(0, -1), (block) => {
      if (block.type !== 'group') return block;
      return removeBlockFromGroup(block, index);
    }));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        XML Rule Builder
      </Typography>
      
      {!validation.isValid && validation.errors.length > 0 && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Validation Errors:
          </Typography>
          {validation.errors.map((error, index) => (
            <Typography key={index} variant="body2">
              • {error}
            </Typography>
          ))}
        </Alert>
      )}

      <GroupBlock 
        block={root} 
        path={[]} 
        parent={null}
        onUpdate={handleUpdate}
        onAddRule={handleAddRule}
        onAddGroup={handleAddGroup}
        onRemoveBlock={handleRemoveBlock}
        availableTypes={availableTypes}
      />

      {validation.isValid && xml && (
        <Paper elevation={1} sx={{ p: 2, mt: 2, backgroundColor: '#f5f5f5' }}>
          <Typography variant="h6" gutterBottom>
            Generated XML:
          </Typography>
          <Box component="pre" sx={{ 
            backgroundColor: '#fff', 
            p: 2, 
            borderRadius: 1, 
            overflow: 'auto',
            fontSize: '0.875rem',
            border: '1px solid #ddd'
          }}>
            {xml}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default XmlRuleBuilder; 
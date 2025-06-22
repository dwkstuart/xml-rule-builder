import { create } from 'xmlbuilder2';
import { RuleBlock, XmlBuilderOptions } from '../types';

export function rulesToXml(root: RuleBlock, options: XmlBuilderOptions = {}): string {
  const { indent = true, prettyPrint = true } = options;
  
  const doc = create({ version: '1.0', encoding: 'UTF-8' });
  const rules = doc.ele('rules');
  
  buildXmlBlock(root, rules);
  
  return doc.end({ prettyPrint: indent && prettyPrint });
}

function buildXmlBlock(block: RuleBlock, parent: ReturnType<typeof create>): void {
  if (block.type === 'rule') {
    const ruleElement = parent.ele(block.ruleType.value);
    ruleElement.att('comparator', block.comparator.value);
    ruleElement.txt(block.value);
  } else {
    const groupElement = parent.ele('group');
    groupElement.att('logic', block.logic);
    
    block.children.forEach(child => {
      buildXmlBlock(child, groupElement);
    });
  }
} 
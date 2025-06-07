import { XMLParser } from 'fast-xml-parser';
import { xmlTypes } from '../ruleBuilderSlice';

export function xmlToRules(xmlString: string) {
  const parser = new XMLParser({ ignoreAttributes: false });
  const jsObj = parser.parse(xmlString);

  // Helper to recursively convert XML to your rule/group format
  function convertGroup(group: any) {
    const logic = group.logic || (group['logic'] && group['logic']['#text']) || 'AND';
    let children: any[] = [];

    if (Array.isArray(group.rule)) {
      children = group.rule.map(convertRule);
    } else if (group.rule) {
      children = [convertRule(group.rule)];
    }

    if (Array.isArray(group.group)) {
      children = children.concat(group.group.map(convertGroup));
    } else if (group.group) {
      children.push(convertGroup(group.group));
    }

    return {
      type: 'group',
      logic,
      children,
    };
  }

  function convertRule(rule: any) {
    // Map ruleType and comparator to the correct objects from xmlTypes
    const ruleTypeObj = xmlTypes.find(t => t.value === rule.name) || xmlTypes[0];
    const comparatorObj = ruleTypeObj.comparators.find(c => c.value === rule.comparator) || ruleTypeObj.comparators[0];
    return {
      type: 'rule',
      ruleType: ruleTypeObj,
      comparator: comparatorObj,
      value: rule.value,
    };
  }

  // Your XML root might be <rules> or <group>
  const rootGroup = jsObj.rules?.group || jsObj.group;
  return convertGroup(rootGroup);
}
import { RuleBlock } from '../types';
import { createDefaultRule, createDefaultGroup } from './ruleBuilder';

export function updateBlockByPath(
  root: RuleBlock, 
  path: number[], 
  updater: (block: RuleBlock) => RuleBlock
): RuleBlock {
  if (path.length === 0) return updater(root);
  if (root.type !== 'group') return root;
  
  const [head, ...rest] = path;
  return {
    ...root,
    children: root.children.map((child, idx) =>
      idx === head ? updateBlockByPath(child, rest, updater) : child
    )
  };
}

export function addRuleToGroup(group: RuleBlock, index: number): RuleBlock {
  if (group.type !== 'group') return group;
  
  const children = [...group.children];
  children.splice(index + 1, 0, createDefaultRule());
  
  return { ...group, children };
}

export function addGroupToGroup(group: RuleBlock, index: number): RuleBlock {
  if (group.type !== 'group') return group;
  
  const children = [...group.children];
  children.splice(index + 1, 0, createDefaultGroup());
  
  return { ...group, children };
}

export function removeBlockFromGroup(group: RuleBlock, index: number): RuleBlock {
  if (group.type !== 'group' || group.children.length <= 1) return group;
  
  const children = group.children.filter((_, i) => i !== index);
  return { ...group, children };
} 
import React from 'react';

interface LogicSelectorProps {
  logic: 'AND' | 'OR';
  onChange: (logic: 'AND' | 'OR') => void;
}

const LogicSelector: React.FC<LogicSelectorProps> = ({ logic, onChange }) => (
  <div style={{ marginBottom: 20 }}>
    <label>
      Match Logic:
      <select value={logic} onChange={e => onChange(e.target.value as 'AND' | 'OR')} style={{ marginLeft: 8 }}>
        <option value="AND">ALL MATCH</option>
        <option value="OR">ONE MATCHES</option>
      </select>
    </label>
  </div>
);

export default LogicSelector;

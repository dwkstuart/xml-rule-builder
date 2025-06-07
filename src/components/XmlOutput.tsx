import React from 'react';

const XmlOutput: React.FC<{ xml: string }> = ({ xml }) => (
  xml ? (
    <pre style={{ textAlign: 'left', margin: '0 auto', maxWidth: 500, background: '#f4f4f4', padding: 16, borderRadius: 8 }}>{xml}</pre>
  ) : null
);

export default XmlOutput;

import React from 'react';

const ErrorMessage: React.FC<{ error: string }> = ({ error }) => (
  error ? <div style={{ color: 'red', marginBottom: 12 }}>{error}</div> : null
);

export default ErrorMessage;

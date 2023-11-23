import React from 'react';

const TextArea = ({ value, onChange }) => (
  <textarea value={value} onChange={onChange} rows="4" cols="50" />
);

export default TextArea;
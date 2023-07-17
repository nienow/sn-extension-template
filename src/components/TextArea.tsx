import React, {useState} from 'react';
import snApi from "sn-extension-api";

const TextArea = () => {
  const [value, setValue] = useState(snApi.text);

  const onLocalChange = (e) => {
    setValue(e.target.value);
    snApi.text = e.target.value;
  };

  const rows = snApi.meta?.rows;
  return (
    <textarea rows={rows || 3} disabled={snApi.locked} value={value} onChange={onLocalChange}></textarea>
  );
}

export default TextArea

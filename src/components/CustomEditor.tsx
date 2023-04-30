import React from 'react';
import TextArea from "./TextArea";
import RowControl from "./RowControl";

const CustomEditor = () => {
  return (
    <div className="main">
      <h1>Custom Editor</h1>
      <RowControl/>
      <TextArea/>
    </div>
  );
}

export default CustomEditor

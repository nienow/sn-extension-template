import React from 'react';
import TextArea from "./TextArea";
import RowControl from "./RowControl";
import SpacingControl from "./SpacingControl";
import snApi from "sn-extension-api";

const CustomEditor = () => {
  const spacing = snApi.extensionMeta?.spacing || 'Default';

  return (
    <div className={'main__' + spacing}>
      <h2>Editor Extension Template</h2>
      <SpacingControl/>
      <RowControl/>
      <TextArea/>
    </div>
  );
}

export default CustomEditor

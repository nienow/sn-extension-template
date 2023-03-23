import React from 'react';

import './stylesheets/main.scss';
import {createRoot} from "react-dom/client";
import EditorHelper from "./editor-helper";
import {EditorProvider} from "./providers/EditorProvider";


const save = (data: any) => {
  const text = JSON.stringify(data);
  try {
    editor.save(text, data.text);
  } catch (error) {
    console.log('Error saving note:', error);
  }
};

const editor = new EditorHelper();
editor.connect((text, isLocked) => {
  createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <EditorProvider text={text} save={save} isLocked={isLocked}/>
    </React.StrictMode>
  );
});

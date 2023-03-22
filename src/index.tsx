import React from 'react';

import App from './App';
import './stylesheets/main.scss';
import {createRoot} from "react-dom/client";
import EditorHelper from "./editor-helper";


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
      <App text={text} save={save} editorIsLocked={isLocked}/>
    </React.StrictMode>
  );
});

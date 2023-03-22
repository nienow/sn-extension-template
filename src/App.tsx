import React from 'react';
import {setup} from 'goober';
import {DialogProvider} from "./providers/DialogProvider";
import {PopoverProvider} from "./providers/PopoverProvider";
import {EditorProvider} from "./providers/EditorProvider";

setup(React.createElement);

const App = ({text, save, editorIsLocked}) => {
  return (
    <DialogProvider>
      <PopoverProvider>
        <EditorProvider text={text} save={save} isLocked={editorIsLocked}/>
      </PopoverProvider>
    </DialogProvider>
  );
}

export default App

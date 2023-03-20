import React, {createContext, useContext, useEffect, useState} from 'react';
import Unsupported from "../components/Unsupported";
import CustomEditor from "../components/CustomEditor";
import {createNewData, parseEditorData} from "../utils";

interface IEditorContext {
  data: any;
  saveNote: () => void;
  saveNoteAndRefresh: () => void;
}

const EditorContext = createContext<IEditorContext>({
  data: null,
  saveNote: null,
  saveNoteAndRefresh: null
});

export const useEditor = () => useContext(EditorContext);

export const EditorProvider = ({text, save}) => {
  const [data, setData] = useState(null);
  const [unsupported, setUnsupported] = useState(false);

  const eraseDataAndStartNewNote = () => {
    setUnsupported(false);
    const newData = createNewData();
    setData(newData);
    saveNote(newData);
  };

  const saveNote = (dataToSave = data) => {
    save(dataToSave);
  };

  const saveNoteAndRefresh = () => {
    setData({...data});
    saveNote();
  };

  useEffect(() => {
    if (text) {
      const parsedData = parseEditorData(text);
      if (parsedData) {
        setData(parsedData);
        setUnsupported(false);
      } else {
        setData(null);
        setUnsupported(true);
      }
    } else {
      const newData = createNewData();
      setData(newData);
      setUnsupported(false);
      saveNote(newData);
    }
  }, [text]);

  const renderContent = () => {
    if (data) {
      return <CustomEditor/>;
    } else if (unsupported) {
      return <Unsupported eraseFn={eraseDataAndStartNewNote}></Unsupported>;
    } else {
      return <div>Loading...</div>
    }
  };

  return (
    <EditorContext.Provider value={{data, saveNote, saveNoteAndRefresh}}>
      {renderContent()}
    </EditorContext.Provider>
  );
};

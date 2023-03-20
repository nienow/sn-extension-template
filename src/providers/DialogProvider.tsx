import React, {createContext, useContext, useState} from 'react';
import {styled} from "goober";
import {createPortal} from "react-dom";

const DialogBackground = styled('div')`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
`

const DialogContainer = styled('div')`
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  max-width: 300px;
  background-color: #ccc;
  padding: 20px 50px;
`

const DialogButton = styled('button')`
  padding: 5px 10px;
  cursor: pointer;
  width: 100%;
  outline: none;

  &:not(:first-child) {
    margin-left: 10px;
  }
`

const DialogActions = styled('div')`
  display: flex;
  margin-top: 20px;
`

const SimpleDialog = ({children, open}) => {
  if (open) {
    return createPortal(
      <DialogBackground>
        <DialogContainer>
          {children}
        </DialogContainer>
      </DialogBackground>,
      document.body
    );
  }
}

interface IDialogContext {
  confirm: (text: string, action: () => void) => void;
  alert: (text: string) => void;
}

const DialogContext = createContext<IDialogContext>({
  confirm: null,
  alert: null
});

export const useDialog = () => useContext(DialogContext);

export const DialogProvider = ({children}) => {
  const [contents, setContents] = useState(null);

  const confirm = (text, action) => {
    const confirmContents = (
      <>
        <div>{text}</div>
        <DialogActions>
          <DialogButton onClick={() => {
            action();
            closeDialog()
          }}>OK
          </DialogButton>
          <DialogButton onClick={closeDialog}>Cancel</DialogButton>
        </DialogActions>
      </>
    )

    setContents(confirmContents);
  };

  const alert = (text) => {
    const confirmContents = (
      <>
        <div>{text}</div>
        <DialogActions>
          <DialogButton onClick={closeDialog}>OK
          </DialogButton>
        </DialogActions>
      </>
    )

    setContents(confirmContents);
  };

  const closeDialog = () => {
    setContents(null);
  }

  return (
    <DialogContext.Provider value={{confirm, alert}}>
      <SimpleDialog open={!!contents}>{contents}</SimpleDialog>
      {children}
    </DialogContext.Provider>
  );
};

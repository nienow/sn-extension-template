import React, {createContext, ReactNode, useContext, useEffect, useRef, useState} from 'react';
import {createPortal} from "react-dom";
import {styled} from "goober";

const PopoverContainer = styled('div')`
  background-color: white;
  padding: 5px;
  border: 1px solid black;
  position: fixed;
  top: 100px;
  left: 100px;
  //width: 200px;
`;

interface IPopoverContext {
  popover: (parent: Element, contents: ReactNode, onClose: () => void) => () => void;
}

const PopoverContext = createContext<IPopoverContext>({
  popover: null,
});

export const usePopover = () => useContext(PopoverContext);

let currentParent;
let currentOnClose;
export const PopoverProvider = ({children}) => {
  const [contents, setContents] = useState(null);
  const popoverRef = useRef<HTMLDivElement>();

  const handleBodyClick = (e) => {
    if (!popoverRef.current.contains(e.target)) {
      closePopover();
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      closePopover();
    }
  };

  useEffect(() => {
    if (contents) {

      setTimeout(() => {
        document.addEventListener("click", handleBodyClick);
        document.addEventListener("keyup", handleKey);
      });

      return () => {
        document.removeEventListener("click", handleBodyClick)
        document.removeEventListener("keyup", handleKey)
      };
    }

  }, [contents]);

  const closePopover = () => {
    if (currentOnClose) {
      currentOnClose();
    }
    setContents(null);
    currentOnClose = null;
    currentParent = null;
  };

  const popover = (parent: Element, contents: ReactNode, onClose: () => void) => {
    currentParent = parent;
    currentOnClose = onClose;
    setContents(contents);
    return () => {
      currentOnClose = null;
      closePopover();
    };
  };

  const renderPopover = () => {

    if (contents) {
      const bb = currentParent.getBoundingClientRect();

      return createPortal(
        <PopoverContainer ref={popoverRef} style={{'top': bb.bottom + 'px', 'left': bb.left + 'px'}}>
          {contents}
        </PopoverContainer>,
        document.body
      );
    }
  };

  return (
    <PopoverContext.Provider value={{popover}}>
      {renderPopover()}
      {children}
    </PopoverContext.Provider>
  );
};

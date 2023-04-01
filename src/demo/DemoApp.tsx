import React, {useRef, useState} from 'react';
import {DATA_ONE, DATA_TWO, DATA_UNSUPPORTED} from "./test-data";
import {MockStandardNotes} from "./mock-notes";

const EXAMPLES = [
  {title: 'One', data: DATA_ONE},
  {title: 'Two', data: DATA_TWO},
  {title: 'Unsupported', data: DATA_UNSUPPORTED}
]

const mock = new MockStandardNotes(DATA_ONE, () => {
  const el = document.getElementById('last-saved');
  if (el) {
    el.textContent = `Last Saved: ${new Date().toLocaleTimeString()}`;
  }
});

const DemoApp = () => {
  const iframeRef = useRef<HTMLIFrameElement>();
  const [selected, setSelected] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [theme, setTheme] = useState('light');

  const changeMenuItem = (i) => {
    setSelected(i);
    mock.changeData(EXAMPLES[i].data);
  };

  const renderMenuItem = (_, i) => {
    return <div className={selected === i ? 'menu-item selected' : 'menu-item'} onClick={() => changeMenuItem(i)}>{EXAMPLES[i].title}</div>;
  };

  const onToggleDisabled = (e) => {
    setDisabled(e.target.checked);
    mock.toggleLock(e.target.checked);
  };

  const onChangeTheme = (e) => {
    setTheme(e.target.checked ? 'dark' : 'light');
    mock.toggleTheme(e.target.checked);
  };

  const onFrameLoad = () => {
    mock.onReady(iframeRef.current.contentWindow);
  };
  return (
    <div className="demo">
      <div className="menu">
        {
          EXAMPLES.map(renderMenuItem)
        }
      </div>
      <div className="content">
        <div className="content-header">
          <div><input id="editingDisabled" type="checkbox" checked={disabled} onChange={onToggleDisabled}></input><label
            htmlFor="editingDisabled"> Editing Disabled</label></div>
          <div><input id="isDark" type="checkbox" checked={theme === 'dark'} onChange={onChangeTheme}></input><label
            htmlFor="isDark"> Dark Theme</label></div>
          <div id="last-saved"></div>
        </div>
        <iframe key={selected} ref={iframeRef} src="index.html" onLoad={onFrameLoad}/>
      </div>
    </div>
  );
}

export default DemoApp

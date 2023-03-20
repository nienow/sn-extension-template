import React, {useState} from 'react';
import {DialogProvider} from "../providers/DialogProvider";
import {PopoverProvider} from "../providers/PopoverProvider";
import {EditorProvider} from "../providers/EditorProvider";
import {DATA_ONE, DATA_TWO, DATA_UNSUPPORTED} from "./test-data";
import {setup, styled} from "goober";

setup(React.createElement);


const Container = styled('div')`
  display: flex;
`;

const Menu = styled('div')`
  width: 200px;
  flex: 0 0 auto;
  border-right: 1px solid var(--sn-stylekit-border-color);
`;

const Content = styled('div')`
  flex: 1 1 auto;
`;

const ContentHeader = styled('div')`
  border-bottom: 1px solid var(--sn-stylekit-border-color);
  padding: 5px 20px;
`;

const Status = styled('div')`
  font-weight: bold;
  padding: 20px;
  border-bottom: 1px solid var(--sn-stylekit-border-color);
`

const MenuItem = styled('div')`
  padding: 20px;
  cursor: pointer;
  border-bottom: 1px solid var(--sn-stylekit-border-color);

  &.selected {
    background-color: var(--sn-stylekit-secondary-background-color);
  }
`;

const EXAMPLES = [
  {title: 'One', data: DATA_ONE},
  {title: 'Two', data: DATA_TWO},
  {title: 'Unsupported', data: DATA_UNSUPPORTED}
]

const DemoApp = () => {
  const [lastSaved, setLastSaved] = useState(null);
  const [selected, setSelected] = useState(0);

  const renderMenuItem = (_, i) => {
    return <MenuItem className={selected === i ? 'selected' : ''} onClick={() => setSelected(i)}>{EXAMPLES[i].title}</MenuItem>;
  };

  const save = () => {
    setLastSaved(new Date());
  };
  return (
    <DialogProvider>
      <PopoverProvider>
        <Container>
          <Menu>
            <Status>Demos</Status>
            {
              EXAMPLES.map(renderMenuItem)
            }
          </Menu>
          <Content>
            <ContentHeader>{`Last Saved: ${lastSaved?.toLocaleTimeString()}`}</ContentHeader>
            <EditorProvider text={EXAMPLES[selected].data} save={save}/>
          </Content>
        </Container>
      </PopoverProvider>
    </DialogProvider>
  );
}

export default DemoApp

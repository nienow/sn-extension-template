import React, {useState} from 'react';
import {rerenderRoot} from "../index";
import snApi from "sn-extension-api";

const options = ['Cozy', 'Default', 'Comfortable'];

const SpacingControl = () => {
  const [spacing, setSpacing] = useState(snApi.extensionMeta?.spacing || 'Default');

  const changeSpacing = (e) => {
    const newSpacing = e.target.value;
    setSpacing(newSpacing);
    snApi.extensionMeta = {spacing: newSpacing};
    rerenderRoot();
  };

  return (
    <div>
      <span>Spacing: </span>
      <select onChange={changeSpacing}>
        {
          options.map(o => {
            if (spacing === o) {
              return <option selected>{o}</option>
            } else {
              return <option>{o}</option>
            }
          })
        }
      </select>
      <span> (This is an example of saving extension metadata).</span>
    </div>
  );
}

export default SpacingControl

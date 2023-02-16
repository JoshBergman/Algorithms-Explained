import React, { useContext } from 'react';
import { StyleContext } from '../../../../Store/ThemeContext';

export default function DarkModeButton() {
    const styleCTX = useContext(StyleContext);

  return (
    <button onClick={styleCTX.toggleDark}>Toggle Dark</button>
  )
}

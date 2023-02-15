import React, { Suspense, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import { StyleContext } from './Store/ThemeContext';

import Landing from './Pages/Landing/Landing'; //TODO Switch to lazy loading once dynamic imports are added

// TODO Replace loading placeholder with actual loading spinner

function App() {
  const styleCTX = useContext(StyleContext);
  return (
    <div style={styleCTX.theme.pageColor} className="page" >
    <Suspense fallback={<p>Loading Placeholder</p>}>
      <Routes>
        <Route
         path="/"
         element={<Landing />}
        />
        <Route
         path="/test"
         element={<p>Test page</p>}
        />
        <Route 
         path="*"
         element={<Navigate to="/" replace/>}
        />
      </Routes>
    </Suspense> 
    </div>
  );
}

export default App;
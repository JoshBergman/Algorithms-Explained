import React, { Suspense, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import { StyleContext } from './Store/ThemeContext';

import Landing from './Pages/Landing/Landing'; //TODO Switch to lazy loading once dynamic imports are added
import Algorithms from './Pages/Landing/Algorithms';
import Header from './Components/UI/PageComponents/Header/Header';

import Array from './Pages/Algorithms/Data-Structures/Array/Array'; //todo automatically import routes as from linkscontext
import ExamplePage from './Pages/Algorithms/Data-Structures/ExamplePage/ExamplePage';

// TODO Replace loading placeholder with actual loading spinner

function App() {
  const styleCTX = useContext(StyleContext);
  return (
    <div style={styleCTX.theme.pageColor} className="page" >
    <Header />
    <Suspense fallback={<p>Loading Placeholder</p>}>
      <Routes>
        <Route
         path="/"
         element={<Landing />}
        />
        <Route
         path="/algorithms"
         element={<Algorithms />}
        />
        <Route
         path="/array"
         element={<Array />}
        />
        <Route
         path="/example"
         element={<ExamplePage />}
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
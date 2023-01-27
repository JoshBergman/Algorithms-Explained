import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Landing from './Pages/Landing/Landing'; //! Switch to lazy loading once dynamic imports are added
import './App.css';

function App() {
  return (
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
  );
}

export default App;
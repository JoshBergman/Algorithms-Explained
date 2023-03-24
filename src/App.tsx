import React, { Suspense, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import { StyleContext } from "./Store/ThemeContext";
import { LinksContext } from "./Store/LinksContext";

import Landing from "./Pages/Landing/Landing";
import Header from "./Components/UI/PageComponents/Header/Header";
import Footer from "./Components/UI/PageComponents/Footer/Footer";
import AESpinner from "./Components/UI/Spinners/AESpinner";

// TODO Replace loading placeholder with actual loading spinner

function App() {
  const styleCTX = useContext(StyleContext);
  const linksCTX = useContext(LinksContext);
  const allLinks = linksCTX.allLinks.links;

  const Algorithms = React.lazy(() => import("./Pages/Landing/Algorithms"));

  //generates a lazy-loaded renderable for each stored page in links context | access by using the page title in the elements object ex: elements["title"]
  const elements: any = {};
  allLinks.forEach((link) => {
    elements[link[0]] = React.lazy(
      () => import("./Pages/Algorithms/" + link[3])
    );
  });

  return (
    <div style={styleCTX.theme.pageColor} className="page">
      <Header />
      <Suspense fallback={<AESpinner />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          {
            //Makes a route for each page stored in linksContext
            allLinks.map((link) => {
              const thisPath = link[1];
              const ThisElement: JSX.Element | any = elements[link[0]];
              return (
                <Route
                  path={thisPath}
                  element={<ThisElement />}
                  key={link[0]}
                />
              );
            })
          }
          <Route path="/algorithms" element={<Algorithms />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;

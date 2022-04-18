import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // react-router-dom v6!
import Header from "./components/Header";
import GlobalStyles from "./components/GlobalStyles";
import DoorsList from "./pages/DoorsList";
import DoorDetail from "./pages/DoorDetail";

function App() {
  return (
    <div>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <DoorsList />
              </>
            }
          />
          <Route
            path="/door/:id"
            element={
              <>
                <Header />
                <DoorDetail />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

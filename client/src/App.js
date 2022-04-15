import React from "react";

import Header from "./components/Header";
import GlobalStyles from "./components/GlobalStyles";
import DoorsList from "./pages/DoorsList";

function App() {
  return (
    <div>
      <GlobalStyles />
      <Header />
      <DoorsList />
    </div>
  );
}

export default App;

import React from "react";
import RootNavigation from "./routes/RootNavigation";
import "./App.css";
import "./assets/styles/styles.scss";
import { DatasetContextProvider } from "./contexts/DatasetContext";

function App() {
  return (
    <div className="App">
      <DatasetContextProvider>
        <RootNavigation />
      </DatasetContextProvider>
    </div>
  );
}

export default App;

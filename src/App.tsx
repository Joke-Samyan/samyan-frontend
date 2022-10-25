import React from "react";
import RootNavigation from "./routes/RootNavigation";
import "./App.css";
import "./assets/styles/styles.scss";
import { DatasetContextProvider } from "./contexts/DatasetContext";
import { UserInfoContextProvider } from "./contexts/UserContext";

function App() {
  return (
    <div className="App">
      <UserInfoContextProvider>
        <DatasetContextProvider>
          <RootNavigation />
        </DatasetContextProvider>
      </UserInfoContextProvider>
    </div>
  );
}

export default App;

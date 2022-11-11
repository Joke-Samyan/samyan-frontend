import "./App.css";
import "./assets/styles/styles.scss";
import { DatasetContextProvider } from "./contexts/DatasetContext";
import { UserInfoContextProvider } from "./contexts/UserInfoContext";
import Router from "./routes/Router";

function App() {
  return (
    <div className="App">
      <UserInfoContextProvider>
        <DatasetContextProvider>
          <Router />
        </DatasetContextProvider>
      </UserInfoContextProvider>
    </div>
  );
}

export default App;

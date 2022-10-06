import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateDatasetLanding from "../pages/createDataset/CreateDatasetLanding";
import HomeScreen from "../pages/homeScreen/HomeScreen";
import Landing from "../pages/landing/Landing";

const RootNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create-dataset" element={<CreateDatasetLanding />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/" element={<HomeScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RootNavigation;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateDatasetLanding from "../pages/createDataset/CreateDatasetLanding";
import Landing from "../pages/Landing";

const RootNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create-dataset" element={<CreateDatasetLanding />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RootNavigation;

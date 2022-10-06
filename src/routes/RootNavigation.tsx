import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateDatasetLanding from "../pages/createDataset/CreateDatasetLanding";
import LabelImage from "../pages/labelDataset/LabelImage";
import Landing from "../pages/Landing";

const RootNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/create-dataset" element={<CreateDatasetLanding />} />
        
        <Route path="/label-image" element={<LabelImage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RootNavigation;

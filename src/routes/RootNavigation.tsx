import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateDatasetLanding from "../pages/createDataset/CreateDatasetLanding";
import LabelImage from "../pages/labelDataset/LabelImage";
import HomeScreen from "../pages/homeScreen/HomeScreen";
import Landing from "../pages/landing/Landing";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import Topup from "../pages/topup/Topup";

const RootNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create-dataset" element={<CreateDatasetLanding />} />

        <Route
          path="/label-image/:dataset_id/:description"
          element={<LabelImage />}
        />
        <Route path="/label-image/" element={<LabelImage />} />
        <Route path="/landing" element={<HomeScreen />} />
        <Route path="/create-dataset" element={<CreateDatasetLanding />} />
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/topup" element={<Topup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RootNavigation;

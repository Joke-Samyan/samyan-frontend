import { lazy } from "react";

const LazyLanding = lazy(() => import("../pages/landing/Landing"));
const LazyCreatedDataset = lazy(
  () => import("../pages/createDataset/CreateDatasetLanding")
);
const LazyLabelImage = lazy(() => import("../pages/labelDataset/LabelImage"));
const LabelText = lazy(() => import("../pages/labelDataset/LabelText"));
const LazyTopUp = lazy(() => import("../pages/topup/Topup"));
const LazyDashboard = lazy(() => import("../pages/dashboard/Dashboard"));

const UserRouter = [
  {
    path: "/",
    element: <LazyLanding />,
  },
  {
    path: "/create-dataset",
    element: <LazyCreatedDataset />,
  },
  {
    path: "/label-image/:dataset_id/:description",
    element: <LazyLabelImage />,
  },
  {
    path: "/label-text",
    element: <LabelText />,
  },
  {
    path: "/topup",
    element: <LazyTopUp />,
  },
  {
    path: "/dashboard",
    element: <LazyDashboard />,
  },
];

export default UserRouter;

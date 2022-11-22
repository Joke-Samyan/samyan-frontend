import { lazy } from "react";

const LazyLanding = lazy(() => import("../pages/landing/Landing"));
const LazyCreatedDataset = lazy(
  () => import("../pages/createDataset/CreateDatasetLanding")
);
const LabelEntry = lazy(() => import("../pages/labelDataset/LabelEntry"));
const LazyTopUp = lazy(() => import("../pages/topup/Topup"));
const LazyDashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const LazyDatasetSummary = lazy(
  () => import("../pages/dashboard/DatasetSummary")
);

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
    path: "/label-entry/:dataset_id/:description",
    element: <LabelEntry />,
  },
  {
    path: "/topup",
    element: <LazyTopUp />,
  },
  {
    path: "/dashboard",
    element: <LazyDashboard />,
  },
  {
    path: "/dashboard/:dataset_id",
    element: <LazyDatasetSummary />,
  },
];

export default UserRouter;

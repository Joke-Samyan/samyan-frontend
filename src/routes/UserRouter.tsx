import { lazy } from "react";

const LazyLanding = lazy(() => import("../pages/landing/Landing"));
const LazyCreatedDataset = lazy(
  () => import("../pages/createDataset/CreateDatasetLanding")
);
const LazyLabelImage = lazy(() => import("../pages/labelDataset/LabelImage"));
const LazyTopUp = lazy(() => import("../pages/topup/Topup"));

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
    path: "/topup",
    element: <LazyTopUp />,
  },
];

export default UserRouter;

import { useContext, useEffect } from "react";
import DatasetCard from "../../components/datasetCard/DatasetCard";
import { IDataset, IEntry } from "../../interfaces/IDataset";
import "./landing.scss";
// import FlipMove from "react-flip-move";
import { DatasetContext } from "../../contexts/DatasetContext";
import { getAllDataset } from "../../apis/dataset";
import Navbar from "../../components/navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";

const Landing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { datasetContext, setDatasetContext } = useContext(DatasetContext);

  useEffect(() => {
    let isSubscribed = true;
    handleGetAllDataset().then((response: IDataset[]) => {
      console.log(response);

      if (isSubscribed && Array.isArray(response)) {
        setDatasetContext(response);
      }
    });

    return () => {
      isSubscribed = false;
    };
    // eslint-disable-next-line
  }, []);

  async function handleGetAllDataset(): Promise<any> {
    try {
      return await getAllDataset();
    } catch (error: any) {
      console.error(error.message);
    }
  }

  function navigateToCreateDataset() {
    if (location.pathname !== "/create-dataset") {
      navigate("/create-dataset");
    }
  }

  function isLabeled(entry: IEntry) {
    return entry.label;
  }

  function isAllEntryLabeled(dataset: IDataset) {
    return dataset.entries.every(isLabeled);
  }

  return (
    <div className="landing-container">
      <Navbar />
      <div className="landing-body">
        <div className="filter-container">
          <button
            className="create-dataset-btn"
            onClick={navigateToCreateDataset}
          >
            สร้างชุดข้อมูล
          </button>
          <button
            className="create-dataset-btn"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Dataset ทั้งหมด
          </button>
        </div>
        <div className="dataset-grid-container">
          {datasetContext
            ?.filter((dataset) => !isAllEntryLabeled(dataset))
            .map((dataset: IDataset) => (
              <DatasetCard key={dataset.dataset_id} {...dataset} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;

import { FilterAlt } from "@mui/icons-material";
import { FC, useContext, useEffect, useState } from "react";
import DatasetCard from "../../components/datasetCard/DatasetCard";
import Navbar from "../../components/navbar/Navbar";
import { IDataset } from "../../interfaces/IDataset";
import "./landing.scss";
import FlipMove from "react-flip-move";
import { DatasetContext } from "../../contexts/DatasetContext";
import { getAllDataset } from "../../apis/dataset";

const Landing: FC = () => {
  const { datasetContext, setDatasetContext } = useContext(DatasetContext);

  useEffect(() => {
    let isSubscribed = true;
    handleGetAllDataset().then((response: IDataset[]) => {
      if (isSubscribed) {
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

  return (
    <div className="landing-container">
      <Navbar />
      <div className="landing-body">
        <div className="filter-container">
          <button
          // onClick={() => {
          //   handleSortDataset();
          // }}
          >
            <FilterAlt />
            ตัวกรอง
          </button>
        </div>
        <FlipMove typeName="div" className="dataset-grid-container">
          {datasetContext?.map((dataset: IDataset) => (
            <DatasetCard key={dataset.dataset_id} {...dataset} />
          ))}
        </FlipMove>
      </div>
    </div>
  );
};

export default Landing;

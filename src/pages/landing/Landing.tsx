import { FilterAlt } from "@mui/icons-material";
import { FC, useState } from "react";
import DatasetCard from "../../components/datasetCard/DatasetCard";
import Navbar from "../../components/navbar/Navbar";
import { IDataset } from "../../interfaces/IDataset";
import "./landing.scss";
import FlipMove from "react-flip-move";

const Landing: FC = () => {
  const [datasetList, setDatasetList] = useState<IDataset[]>([
    {
      uuid: "a",
      question: "ใช่สิงโตรึเปล่า ?",
      labelType: "image",
      pricePerTask: 0.285,
    },
    {
      uuid: "h",
      question: "คำเหมือน",
      labelType: "word",
      pricePerTask: 1.51,
    },
    {
      uuid: "b",
      question: "เสียงนี้คืออะไร",
      labelType: "sound",
      pricePerTask: 1.52,
    },
    {
      uuid: "c",
      question: "คำอ่านภาษาไทย",
      labelType: "speech",
      pricePerTask: 1.45,
    },
    {
      uuid: "d",
      question: "คำเหมือน",
      labelType: "word",
      pricePerTask: 1.55,
    },
    {
      uuid: "e",
      question: "ใช่สิงโตรึเปล่า ?",
      labelType: "image",
      pricePerTask: 0.425,
    },
    {
      uuid: "f",
      question: "เสียงนี้คืออะไร",
      labelType: "sound",
      pricePerTask: 1.5,
    },
    {
      uuid: "g",
      question: "คำอ่านภาษาไทย",
      labelType: "speech",
      pricePerTask: 1.56,
    },
  ]);

  // function handleAddDataset(): void {
  //   setDatasetList([
  //     {
  //       uuid: new Date().toISOString(),
  //       question: "คำอ่านภาษาไทย",
  //       labelType: "speech",
  //       pricePerTask: 1.5,
  //     },
  //     ...datasetList,
  //   ]);
  // }

  function handleSortDataset(): void {
    const newDataset = datasetList.sort(
      (lhs, rhs) => lhs.pricePerTask - rhs.pricePerTask
    );

    setDatasetList([...newDataset]);
  }

  return (
    <div className="landing-container">
      <Navbar />
      <div className="landing-body">
        <div className="filter-container">
          <button
            onClick={() => {
              handleSortDataset();
            }}
          >
            <FilterAlt />
            ตัวกรอง
          </button>
        </div>
        <FlipMove typeName="div" className="dataset-grid-container">
          {datasetList.map((dataset: IDataset) => (
            <DatasetCard key={dataset.question + dataset.uuid} {...dataset} />
          ))}
        </FlipMove>
      </div>
    </div>
  );
};

export default Landing;

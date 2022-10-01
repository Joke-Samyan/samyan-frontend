import {
  Chat,
  FilterAlt,
  Image,
  KeyboardVoice,
  QuestionMark,
  VolumeUp,
} from "@mui/icons-material";
import { FC, ReactNode } from "react";
import Navbar from "../components/navbar/Navbar";
import { IDataset, TLabelType } from "../interfaces/IDataset";
import "./landing.scss";

const DATASET: IDataset[] = [
  {
    question: "ใช่สิงโตรึเปล่า ?",
    labelType: "image",
    pricePerTask: 0.25,
  },
  {
    question: "เสียงนี้คืออะไร",
    labelType: "sound",
    pricePerTask: 1.5,
  },
  {
    question: "คำอ่านภาษาไทย",
    labelType: "speech",
    pricePerTask: 1.5,
  },
  {
    question: "คำเหมือน",
    labelType: "word",
    pricePerTask: 1.5,
  },
];

function getLabelTypeIcon(labelType: TLabelType): ReactNode {
  const iconStyle: object = {
    fontSize: "60px",
  };
  switch (labelType) {
    case "image":
      return <Image sx={iconStyle} />;
    case "sound":
      return <VolumeUp sx={iconStyle} />;
    case "speech":
      return <KeyboardVoice sx={iconStyle} />;
    case "word":
      return <Chat sx={iconStyle} />;
    default:
      return <QuestionMark sx={iconStyle} />;
  }
}

function getAnswerType(labelType: TLabelType): string {
  switch (labelType) {
    case "image":
      return "รูป";
    case "sound":
      return "ฟัง";
    case "speech":
      return "เสียง";
    case "word":
      return "คำตอบ";
    default:
      return "อะไรเอ่ยย";
  }
}

const Landing: FC = () => {
  return (
    <div className="landing-container">
      <Navbar />
      <div className="body">
        <div className="filter-container">
          <button>
            <FilterAlt />
            ตัวกรอง
          </button>
        </div>
        <div className="dataset-grid-container">
          {DATASET.map((dataset: IDataset, datasetIndex: number) => (
            <div key={datasetIndex} className="card-container">
              <div className="header">{dataset.question}</div>
              <div className="type-image">
                {getLabelTypeIcon(dataset.labelType)}
              </div>
              <div className="price-container">
                <div className="price">
                  <div>1.5 บาท</div>
                  <div>/</div>
                  <div>{getAnswerType(dataset.labelType)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;

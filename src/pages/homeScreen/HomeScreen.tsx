//import { FilterAlt } from "@mui/icons-material";
import { FC, useState } from "react";
//import DatasetCard from "../../components/datasetCard/DatasetCard";
import HomeScreenNavbar from "../../components/navbar/HomeScreenNavbar";
import { IDataset } from "../../interfaces/IDataset";
import "./homeScreen.scss";
//import FlipMove from "react-flip-move";

const HomeScreen: FC = () => {
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
  ]);

  function handleSortDataset(): void {
    const newDataset = datasetList.sort(
      (lhs, rhs) => lhs.pricePerTask - rhs.pricePerTask
    );

    setDatasetList([...newDataset]);
  }

  return (
    <div className="landing-container1">
      <HomeScreenNavbar />
      <h2 className="card-header">สมัครเป็นคน โคตรว่าง</h2>
      <h2 className="card-header">เพื่อหารายได้ในตอนที่คุณโคตรว่างจริงๆ</h2>
      <div className="login-registerButton">
          <button
            onClick={() => {
                //login
            }}
          >
            เข้าสู่ระบบ            
          </button>
          <button
            onClick={() => {
                //register
            }}
          >
            สมัครสมาชิก
          </button>
        </div>
        
    </div>
  );
};

export default HomeScreen;

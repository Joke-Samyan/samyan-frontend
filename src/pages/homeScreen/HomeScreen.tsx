//import { FilterAlt } from "@mui/icons-material";
import { FC, useState } from "react";
//import DatasetCard from "../../components/datasetCard/DatasetCard";
import HomeScreenNavbar from "../../components/navbar/HomeScreenNavbar";
import { IDataset } from "../../interfaces/IDataset";
import "./homeScreen.scss";
//import FlipMove from "react-flip-move";

const HomeScreen: FC = () => {
  return (
    <div className="landing-container1">
      <HomeScreenNavbar />
      <h2 className="card-header">สมัครเป็นคน โคตรว่าง</h2>
      <h2 className="card-header">เพื่อหารายได้ในตอนที่คุณโคตรว่างจริงๆ</h2>
      <div className="registerButton">
        <button
          onClick={() => {
            //login
          }}
        >
          สมัครเลย!
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;

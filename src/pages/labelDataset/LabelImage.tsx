import { Image } from "@mui/icons-material";
import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "./labelImage.scss";

const LabelImage = () => {
  return (
    <div className="label-image-container">
      <Navbar />
      <div className="label-image-body">
        <div className="label-image-body-header">
          <header>
            ชุดข้อมูล {"ใช่สิงโตหรือเปล่า ?"} <Image />
          </header>
        </div>
        <div className="label-image-body-content">
          <img
            src={"https://media.tenor.com/FCONEtZs4tgAAAAM/yawn-cat.gif"}
            alt="dataset not found"
          />
        </div>
        <div className="label-image-body-answer">answer</div>
      </div>
    </div>
  );
};

export default LabelImage;

import { Image } from "@mui/icons-material";
import { padding } from "@mui/system";
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
        <label htmlFor="dataset-name-input"></label>
          <input
              //input answer here
          />
        <button className="correct-answer"
        >
          ตอบ
        </button>
        <button className="correct-answer"
        >
          ใช่
        </button>
        <button className="correct-answer"
        >
          ไม่ใช่
        </button>
      </div>
    </div>
  );
};

export default LabelImage;

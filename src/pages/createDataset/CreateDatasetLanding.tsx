import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useDropzone } from "react-dropzone";
import "./createDataset.scss";
import { UploadFile } from "@mui/icons-material";

const CreateDatasetLanding = () => {
  const [files, setFiles] = useState([]);
  return (
    <div className="create-dataset-container">
      <Navbar />
      <div className="body">
        <form className="card-container">
          <h2 className="card-header">สร้างชุดข้อมูล</h2>
          <label htmlFor="dataset-name-input">ชื่อชุดข้อมูล</label>
          <input id="dataset-name-input" name="email" />

          <label htmlFor="question-input">คำถาม</label>
          <input id="question-input" name="email" />

          <label htmlFor="answer-input">ช่องคำตอบ</label>
          <input id="answer-input" name="email" />

          <label htmlFor="price-per-task-input">ราคาต่อ 1 ข้อมูล</label>
          <input id="price-per-task-input" name="email" />

          <div className="drag-over-container">
            <UploadFile sx={{ fontSize: "60px" }} />
            <p>Upload Data By Drag And Drop</p>
          </div>

          <div className="submit-btn-container">
            <button type="submit">สร้างชุดข้อมูล</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDatasetLanding;

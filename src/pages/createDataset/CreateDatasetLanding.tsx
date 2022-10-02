import { ChangeEvent, FormEvent, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
// import { useDropzone } from "react-dropzone";
import "./createDataset.scss";
import { UploadFile } from "@mui/icons-material";
import {
  answerTypeArray,
  INewDataset,
  labelTypeArray,
} from "../../interfaces/IDataset";
import { Divider } from "@mui/material";

const CreateDatasetLanding = () => {
  // const [files, setFiles] = useState([]);

  const [newDataset, setNewDataset] = useState<INewDataset>({
    datasetName: "",
    question: "",
    labelType: "image",
    pricePerTask: 0.5,
    answerType: "multiple choice",
  });

  const { datasetName, question, labelType, pricePerTask, answerType } =
    newDataset;

  function onNewDatasetChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void {
    setNewDataset({
      ...newDataset,
      [event.target.name]: event.target.value,
    });
  }

  async function handleFormSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    const requestBody: INewDataset = {
      datasetName,
      question,
      labelType,
      pricePerTask,
      answerType,
    };
    const request = JSON.stringify(requestBody);

    console.log(request);
  }

  return (
    <div className="create-dataset-container">
      <Navbar />
      <div className="create-dataset-body">
        <form
          className="create-dataset-card-container"
          onSubmit={handleFormSubmit}
        >
          <h2 className="card-header">สร้างชุดข้อมูล</h2>
          <label htmlFor="dataset-name-input">ชื่อชุดข้อมูล</label>
          <input
            id="dataset-name-input"
            name="datasetName"
            value={datasetName}
            onChange={(event) => onNewDatasetChange(event)}
          />

          <label htmlFor="question-input">คำถาม</label>
          <input
            id="question-input"
            name="question"
            value={question}
            onChange={(event) => onNewDatasetChange(event)}
          />

          <div className="drag-over-container">
            <UploadFile sx={{ fontSize: "60px" }} />
            <p>Upload Data By Drag And Drop</p>
          </div>

          <label htmlFor="label-type-select">Label Type</label>
          <select
            id="label-type-select"
            name="labelType"
            value={labelType}
            onChange={(event) => {
              onNewDatasetChange(event);
            }}
          >
            {labelTypeArray.map((labelType, labelTypeIndex) => (
              <option key={labelTypeIndex} value={labelType}>
                {labelType}
              </option>
            ))}
          </select>

          <label htmlFor="answer-type-select">Label Type</label>
          <select
            id="answer-type-select"
            name="answerType"
            value={answerType}
            onChange={(event) => {
              onNewDatasetChange(event);
            }}
          >
            {answerTypeArray.map((answerType, answerTypeIndex) => (
              <option key={answerTypeIndex} value={answerType}>
                {answerType}
              </option>
            ))}
          </select>

          <label htmlFor="price-per-task-input">ราคาต่อ 1 ข้อมูล</label>
          <input
            id="price-per-task-input"
            name="pricePerTask"
            value={pricePerTask}
            type="number"
            onChange={(event) => onNewDatasetChange(event)}
          />

          <div style={{ width: "100%", padding: "20px 0 20px 0" }}>
            <Divider sx={{ borderBottomWidth: "2px", bgcolor: "#777" }} />
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

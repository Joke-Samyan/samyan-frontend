import { ChangeEvent, FormEvent, Fragment, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import ReactS3Client from "react-aws-s3-typescript";
import "./createDataset.scss";
import { AddCircle, Delete } from "@mui/icons-material";
import { IDataset, IEntry } from "../../interfaces/IDataset";
import { Divider, TextField } from "@mui/material";
import { createDataset } from "../../apis/dataset";

const s3Config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME || "test",
  dirName: "images",
  region: process.env.REACT_APP_REGION || "test",
  accessKeyId: process.env.REACT_APP_ACCESS || "test",
  secretAccessKey: process.env.REACT_APP_SECRET || "test",
};

const CreateDatasetLanding = () => {
  const [newDataset, setNewDataset] = useState<IDataset>({
    description: "",
    reward_dataset: 0,
    prelabel: "IC",
    entries: [],
  });

  const { description, reward_dataset, entries } = newDataset;

  function onNewDatasetChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setNewDataset({
      ...newDataset,
      [event.target.name]:
        event.target.name === "reward_dataset"
          ? parseFloat(event.target.value)
          : event.target.value,
    });
  }

  function handleAddEntry() {
    setNewDataset({
      ...newDataset,
      entries: [...entries, { entry: "", entry_type: "multipleChoice" }],
    });
  }

  async function handleUploadEntry(
    event: ChangeEvent<HTMLInputElement>,
    entryIndex: number
  ) {
    const s3 = new ReactS3Client(s3Config);
    const files = event.currentTarget.files;

    if (files) {
      try {
        const res = await s3.uploadFile(files[0], files[0].name);

        const oldEntries: IEntry[] = newDataset.entries;
        oldEntries[entryIndex].entry = res.location;
        oldEntries[entryIndex].entry_type = "image";
        setNewDataset({ ...newDataset, entries: oldEntries });
      } catch (exception) {
        console.log(exception);
      }
    } else {
      console.log("file cannot be null");
    }
  }

  async function handleFormSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    try {
      const requestBody = JSON.stringify(newDataset);

      await createDataset(requestBody).then((response) => {
        console.log(response);
      });
    } catch (error: any) {
      console.error(error.message);
    }
  }

  function handleRemoveEntry(entryIndex: number) {
    setNewDataset({
      ...newDataset,
      entries: [
        ...newDataset.entries.slice(0, entryIndex),
        ...newDataset.entries.slice(entryIndex + 1),
      ],
    });
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
          <div style={{ padding: "10px" }}>
            <TextField
              // style={{ width: "30%" }}
              className="login-input"
              id="outlined-basic"
              label="ชื่อชุดข้อมูล"
              variant="outlined"
              size="small"
              value={description}
              name={"description"}
              onChange={(event) => onNewDatasetChange(event)}
            />
          </div>
          <div style={{ padding: "10px" }}>
            <TextField
              // style={{ width: "30%" }}
              className="login-input"
              id="outlined-basic"
              label="prelabel"
              variant="outlined"
              size="small"
              value={"IC"}
              disabled
              // name={"description"}
              // onChange={(event) => onNewDatasetChange(event)}
            />
          </div>
          <div
            style={{ display: "flex", alignItems: "center" }}
            onClick={handleAddEntry}
          >
            <AddCircle />
            เพิ่ม Data Entry
          </div>
          {newDataset.entries.map((entry: IEntry, entryIndex) => (
            <div key={entryIndex} className="new-entry">
              {entry.entry && (
                <Fragment>
                  <img
                    src={entry.entry}
                    alt={"entry link"}
                    className="entry-image"
                  />
                  <p>{entry.entry.slice(0, 60)}</p>
                </Fragment>
              )}
              {!entry.entry && (
                <input
                  type="file"
                  onChange={(event) => {
                    handleUploadEntry(event, entryIndex);
                  }}
                />
              )}
              <Delete
                onClick={() => {
                  handleRemoveEntry(entryIndex);
                }}
              />
            </div>
          ))}
          <div style={{ padding: "10px" }}>
            <TextField
              // style={{ width: "30%" }}
              type="number"
              className="login-input"
              id="outlined-basic"
              label="ค่าตอบแทน"
              variant="outlined"
              size="small"
              value={reward_dataset}
              name={"reward_dataset"}
              onChange={(event) => onNewDatasetChange(event)}
            />
          </div>

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

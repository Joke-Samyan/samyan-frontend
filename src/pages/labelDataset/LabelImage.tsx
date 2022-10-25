import { CheckCircle, Image } from "@mui/icons-material";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { labelData } from "../../apis/annotate";
import { getDatasetById } from "../../apis/dataset";
import Navbar from "../../components/navbar/Navbar";
import { IEntry, ILabelEntrySchema } from "../../interfaces/IDataset";
import "./labelImage.scss";

const LabelImage = () => {
  const { dataset_id, description } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState<IEntry>({
    entry_type: "multipleChoice",
    entry: "temp",
    reward: 50,
    entry_id: "temp",
  });

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [outOfEntry, setOutOfEntry] = useState<boolean>(false);
  // let isSaving = false;

  useEffect(() => {
    try {
      console.log("fecth data");

      if (dataset_id) {
        getDatasetById(dataset_id).then((response) => {
          console.log(response);
          if (response) {
            setEntry(response);
          } else {
            setOutOfEntry(true);
          }
        });
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }, [isSaving, dataset_id]);

  async function handleLabelData(label: string): Promise<void> {
    try {
      setIsSaving(true);

      if (dataset_id) {
        const request: ILabelEntrySchema = {
          dataset_id: dataset_id,
          entry_id: entry.entry_id || "none",
          labeler_id: "63583a4a520b7e42d85783b2",
          label: label,
        };
        const requestBody: string = JSON.stringify(request);

        await labelData(requestBody).then((response) => {
          if (response) {
            setIsSaving(false);
            console.log("label success");
          }
        });
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  return (
    <div className="label-image-container">
      <Navbar />
      {!outOfEntry && (
        <div className="label-image-body">
          <div className="label-image-body-header">
            <header>
              ชุดข้อมูล {description} <Image />
            </header>
          </div>
          <div className="label-image-body-content">
            <img src={entry.data} alt="dataset not found" />
          </div>
          {/* <h2 className="label-image-body-answer">answer</h2> */}
          {entry.data_type === "text" && (
            <Fragment>
              <label htmlFor="dataset-name-input"></label>
              <input
              //input answer here
              />
              <button className="correct-answer">ตอบ</button>
            </Fragment>
          )}
          {entry.data_type === "image" && (
            <Fragment>
              <div className="multiple-choice-container">
                <button
                  disabled={isSaving}
                  className="correct-answer"
                  onClick={() => handleLabelData("ใช่")}
                >
                  ใช่
                </button>
                <button
                  disabled={isSaving}
                  className="correct-answer"
                  onClick={() => handleLabelData("ไม่ใช่")}
                >
                  ไม่ใช่
                </button>
              </div>
              {isSaving && (
                <div
                  style={{
                    height: "60px",
                    width: "100%",
                  }}
                >
                  <ClipLoader size={60} color="#004BBC" />
                </div>
              )}
            </Fragment>
          )}
        </div>
      )}

      {outOfEntry && (
        <div style={{ marginTop: 40 }}>
          <CheckCircle sx={{ fontSize: 120, color: "#004BBC" }} />
          <h1>Done !</h1>
          <header style={{ marginBottom: "20px" }}>
            You just got{" "}
            <p style={{ fontSize: "32px", fontWeight: 700, color: "#004BBC" }}>
              {entry.reward}฿
            </p>{" "}
            added to your pocket
          </header>
          <button
            onClick={() => {
              navigate("/landing");
            }}
          >
            GO BACK
          </button>
        </div>
      )}
    </div>
  );
};

export default LabelImage;

import { CheckCircle, Image } from "@mui/icons-material";
import { padding } from "@mui/system";
import { Fragment, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { labelData } from "../../apis/annotate";
import Navbar from "../../components/navbar/Navbar";
import { IDataset, ILabelEntrySchema } from "../../interfaces/IDataset";
import "./labelImage.scss";

const LabelImage = () => {
  const dataset: IDataset = useLocation().state;
  const navigate = useNavigate();
  const [entryIndex, setEntryIndex] = useState<number>(0);

  const [isSaving, setIsSaving] = useState<boolean>(false);
  // let isSaving = false;

  async function handleLabelData(label: string): Promise<void> {
    try {
      setIsSaving(true);

      const request: ILabelEntrySchema = {
        dataset_id: dataset.dataset_id,
        entry_id: dataset.entries[entryIndex].entry_id,
        labeler_id: "634562169a474468c741f4a2",
        label: label,
      };
      const requestBody: string = JSON.stringify(request);

      await labelData(requestBody).then((response) => {
        if (response) {
          setIsSaving(false);
          setEntryIndex((prev) => prev + 1);
          console.log("label success");
        }
      });
    } catch (error: any) {
      console.error(error.message);
    }
  }

  return (
    <div className="label-image-container">
      <Navbar />
      <div className="label-image-body">
        <div className="label-image-body-header">
          <header>
            ชุดข้อมูล {dataset.description} <Image />
          </header>
        </div>
        {entryIndex !== dataset.entries.length && (
          <Fragment>
            <div className="label-image-body-content">
              <img
                src={dataset.entries[entryIndex].entry}
                alt="dataset not found"
              />
            </div>
            {/* <h2 className="label-image-body-answer">answer</h2> */}
            {dataset.entries[entryIndex].entry_type === "text" && (
              <Fragment>
                <label htmlFor="dataset-name-input"></label>
                <input
                //input answer here
                />
                <button className="correct-answer">ตอบ</button>
              </Fragment>
            )}
            {dataset.entries[entryIndex].entry_type === "multipleChoice" && (
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
          </Fragment>
        )}
        {entryIndex === dataset.entries.length && (
          <div style={{ marginTop: 40 }}>
            <CheckCircle sx={{ fontSize: 120, color: "#004BBC" }} />
            <h1>Done !</h1>
            <header style={{ marginBottom: "20px" }}>
              You just got{" "}
              <p
                style={{ fontSize: "32px", fontWeight: 700, color: "#004BBC" }}
              >
                {dataset.reward_dataset}฿
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
    </div>
  );
};

export default LabelImage;

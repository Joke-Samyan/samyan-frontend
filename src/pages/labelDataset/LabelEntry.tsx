import { CheckCircle, Image } from "@mui/icons-material";
import { Box, TextField } from "@mui/material";
import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { topup } from "../../apis/account";
import { labelData } from "../../apis/annotate";
import { getDatasetById } from "../../apis/dataset";
import Navbar from "../../components/navbar/Navbar";
import { UserInfoContext } from "../../contexts/UserInfoContext";
import { IEntry, ILabelEntrySchema } from "../../interfaces/IDataset";
import "./labelImage.scss";

function LabelEntry() {
  const { dataset_id, description } = useParams();
  const navigate = useNavigate();
  const { userInfoContext, setUserInfoContext } = useContext(UserInfoContext);
  const [entry, setEntry] = useState<IEntry>({
    entry_type: "multipleChoice",
    entry:
      "https://camo.githubusercontent.com/9f57f423e30cbe6a433ac11c365f379ec8eff41074aeaeab24db3bcd2e299256/68747470733a2f2f70726f746f6275666a732e6769746875622e696f2f70726f746f6275662e6a732f746f6f6c7365742e737667",
    reward: 50,
    prelabel: "ใช่",
    entry_id: "temp",
  });

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [outOfEntry, setOutOfEntry] = useState<boolean>(false);
  const [textAnswer, setTextAnswer] = useState<string>("");
  // let isSaving = false;

  useEffect(() => {
    try {
      if (dataset_id) {
        getDatasetById(dataset_id).then((response) => {
          // console.log(response);
          if (response && response.message !== "Something Error") {
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
          labeler_id: userInfoContext.user_id,
          label: label,
        };
        const requestBody: string = JSON.stringify(request);

        await labelData(requestBody).then(async (response) => {
          if (response) {
            const request = {
              user_id: userInfoContext.user_id,
              amount: response.reward,
            };

            const requestBody = JSON.stringify(request);
            await topup(requestBody).then((response) => {
              if (response.status === "success") {
                setUserInfoContext({
                  ...userInfoContext,
                  balance: response.data.balance,
                });
              }
            });
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
            <img src={entry.entry} alt="dataset not found" />
          </div>
          {/* <h2 className="label-image-body-answer">answer</h2> */}
          {entry.entry_type === "textInput" && (
            <Fragment>
              <Box
                sx={{
                  width: 1,
                }}
              >
                <Box
                  sx={{
                    maxWidth: 720,
                    mx: "auto",
                  }}
                >
                  {entry.prelabel && (
                    <Fragment>
                      <p style={{ textAlign: "left", marginLeft: "10%" }}>
                        Answer with prelabel
                      </p>
                      <button
                        type="button"
                        style={{ width: "80%" }}
                        onClick={() => {
                          if (entry.prelabel) {
                            handleLabelData(entry.prelabel);
                          }
                        }}
                      >
                        {entry.prelabel}
                      </button>
                      <p style={{ textAlign: "left", marginLeft: "10%" }}>
                        If prelabel is not the answer, please type your answer
                        below
                      </p>
                    </Fragment>
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: 1,
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 0.8,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        fullWidth
                        id="text_answer"
                        label="Your answer"
                        variant="outlined"
                        size="small"
                        sx={{ mr: 2 }}
                        onChange={(event) => {
                          setTextAnswer(event.target.value);
                        }}
                      />
                      <button
                        style={{ width: "10%" }}
                        disabled={isSaving}
                        className="correct-answer"
                        onClick={() => {
                          handleLabelData(textAnswer);
                        }}
                      >
                        ส่ง
                      </button>
                    </Box>
                  </Box>
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
                </Box>
              </Box>
            </Fragment>
          )}
          {entry.entry_type === "multipleChoice" && (
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
          <p>No more entry to label</p>
          {/* <header style={{ marginBottom: "20px" }}>
            You just got{" "}
            <p style={{ fontSize: "32px", fontWeight: 700, color: "#004BBC" }}>
              {entry.reward}฿
            </p>{" "}
            added to your pocket
          </header> */}
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            GO BACK
          </button>
        </div>
      )}
    </div>
  );
}

export default LabelEntry;

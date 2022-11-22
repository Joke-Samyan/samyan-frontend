import { ChangeEvent, FormEvent, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./createDataset.scss";
import { IDataset } from "../../interfaces/IDataset";
import { Autocomplete, Box, Divider, TextField } from "@mui/material";
import { createDataset } from "../../apis/dataset";
import CreateDatasetTable from "../../components/table/CreateDataset/CreateDatasetTable";
import { ClipLoader } from "react-spinners";
import { CheckCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const PRELABEL_OPTIONS = [
  { value: "IC", label: "IC" },
  { value: "OCR", label: "OCR" },
];

const CreateDatasetLanding = () => {
  const navigate = useNavigate();
  const [newDataset, setNewDataset] = useState<IDataset>({
    description: "",
    reward_dataset: 0,
    prelabel: "IC",
    entries: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const { description, reward_dataset } = newDataset;

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

  // function handleAddEntry() {
  //   setNewDataset({
  //     ...newDataset,
  //     entries: [...entries, { entry: "", entry_type: "multipleChoice" }],
  //   });
  // }

  async function handleFormSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    setIsLoading(true);

    try {
      const requestBody = JSON.stringify(newDataset);

      await createDataset(requestBody).then((response) => {
        console.log(response);
        setIsSuccess(true);
      });
    } catch (error: any) {
      console.error(error.message);
    }

    setIsLoading(false);
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
          <div className="create-dataset-input-field">
            <TextField
              sx={{ mr: 1 }}
              className="login-input"
              id="outlined-basic"
              label="ชื่อชุดข้อมูล"
              variant="outlined"
              size="small"
              value={description}
              name={"description"}
              onChange={(event) => onNewDatasetChange(event)}
              fullWidth
              required
            />
            <Autocomplete
              disablePortal
              id="prelabel-autocomplete"
              options={PRELABEL_OPTIONS}
              sx={{ minWidth: 120 }}
              size={"small"}
              renderInput={(params) => (
                <TextField {...params} label="Prelabel" />
              )}
              value={{
                value: newDataset.prelabel,
                label: newDataset.prelabel,
              }}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              onChange={(event, newValue) => {
                if (newValue) {
                  setNewDataset({ ...newDataset, prelabel: newValue.value });
                }
              }}
            />
          </div>
          <CreateDatasetTable
            newDataset={newDataset}
            setNewDataset={setNewDataset}
          />
          <Box
            sx={{
              display: "flex",
              width: 1,
              maxWidth: 720,
              justifyContent: "flex-end",
            }}
          >
            <TextField
              type="number"
              sx={{ width: 120 }}
              className="login-input"
              id="outlined-basic"
              label="ค่าตอบแทน"
              variant="outlined"
              size="small"
              value={reward_dataset}
              name={"reward_dataset"}
              onChange={(event) => onNewDatasetChange(event)}
            />
          </Box>

          <div style={{ width: "100%", padding: "20px 0 20px 0" }}>
            <Divider sx={{ borderBottomWidth: "2px", bgcolor: "#777" }} />
          </div>

          <div className="submit-btn-container">
            {!isLoading && !isSuccess && (
              <button type="submit">สร้างชุดข้อมูล</button>
            )}
            {!isLoading && isSuccess && (
              <Box>
                <CheckCircle sx={{ fontSize: 60, color: "#004BBC" }} />
                <p>Done !</p>
                <button
                  type="button"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  GO BACK
                </button>
              </Box>
            )}
            {isLoading && !isSuccess && (
              <ClipLoader size={60} color="#004BBC" />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDatasetLanding;

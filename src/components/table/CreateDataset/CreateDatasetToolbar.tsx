import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  ChangeEvent,
  Dispatch,
  Fragment,
  RefObject,
  SetStateAction,
  useRef,
} from "react";
import { TableToolbarProps } from "../../../interfaces/table.interface";
import ReactS3Client from "react-aws-s3-typescript";
import { IDataset } from "../../../interfaces/IDataset";

const s3Config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME || "test",
  dirName: "images",
  region: process.env.REACT_APP_REGION || "test",
  accessKeyId: process.env.REACT_APP_ACCESS || "test",
  secretAccessKey: process.env.REACT_APP_SECRET || "test",
};

interface createNewDatasetToolbarProps extends TableToolbarProps {
  newDataset: IDataset;
  setNewDataset: Dispatch<SetStateAction<IDataset>>;
}

export default function CreateDatasetToolbar(
  props: createNewDatasetToolbarProps
) {
  const { numSelected, newDataset, setNewDataset } = props;
  const fileInputRef: RefObject<HTMLInputElement> = useRef(null);

  const handleAddEntryClick = () => {
    // 👇️ open file input box on click of other element
    if (fileInputRef.current !== null) {
      fileInputRef.current.click();
    }
  };

  async function handleUploadEntry(event: ChangeEvent<HTMLInputElement>) {
    const s3 = new ReactS3Client(s3Config);
    const files = event.currentTarget.files;

    if (files) {
      try {
        const res = await s3.uploadFile(
          files[0],
          files[0].name.split(".")[0].replace(" ", "_").replace(/ /g, "_")
        );

        setNewDataset({
          ...newDataset,
          entries: [
            ...newDataset.entries,
            { entry: res.location, entry_type: "textInput" },
          ],
        });
      } catch (exception) {
        console.log(exception);
      }
    } else {
      console.log("file cannot be null");
    }
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        color: "black",
        bgcolor: "white",
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha("#004bbc", 0.5),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
          textAlign={"left"}
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
          textAlign={"left"}
        >
          Add Entry
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Fragment>
          <IconButton
            onClick={() => {
              handleAddEntryClick();
            }}
          >
            <AddCircleIcon sx={{ color: "#004bbc" }} />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(event) => {
                handleUploadEntry(event);
              }}
            />
          </IconButton>
        </Fragment>
      )}
    </Toolbar>
  );
}

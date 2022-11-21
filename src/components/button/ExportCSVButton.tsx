import { Download } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { MouseEventHandler } from "react";
import { CSVLink } from "react-csv";
import { IDataset, IEntry } from "../../interfaces/IDataset";

interface Props {
  selectedDataset: IDataset | null;
  onClick: MouseEventHandler<any>;
}

interface IExportType {
  entry_id?: string;
  entry: string;
  prelabel?: string | number;
  label?: string;
}

function ExportCSVButton({ selectedDataset, onClick }: Props) {
  let headers = [
    {
      label: "Entry Id",
      key: "entry_id",
    },
    {
      label: "Entry",
      key: "entry",
    },
    {
      label: "Prelabel",
      key: "prelabel",
    },
    {
      label: "Label",
      key: "label",
    },
  ];
  let data: IExportType[] = [];
  if (selectedDataset !== null) {
    selectedDataset.entries.forEach((each: IEntry) => {
      data.push({
        entry_id: each.entry_id,
        entry: each.entry,
        prelabel: each.reward,
        label: each.label,
      });
    });
  }
  return (
    <CSVLink
      headers={headers}
      data={data}
      filename={`${selectedDataset?.description}.csv`}
      style={{
        textDecoration: "none",
        color: "white",
      }}
    >
      <Tooltip title="Download CSV">
        <IconButton onClick={onClick}>
          <Download sx={{ color: "#004bbc" }} />
        </IconButton>
      </Tooltip>
    </CSVLink>
  );
}

export default ExportCSVButton;

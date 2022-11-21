import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Fragment } from "react";
import TextField from "@mui/material/TextField";
import { TableToolbarProps } from "../../../interfaces/table.interface";

interface DatasetTableToolbarProps extends TableToolbarProps {
  description: string;
}

export default function DatasetTableToolbar(props: DatasetTableToolbarProps) {
  const { numSelected, setSearchInput, description } = props;

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
          {description}
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
          <TextField
            size={"small"}
            label={"Search"}
            onChange={(event) => {
              setSearchInput(event.target.value);
            }}
          />
          <Tooltip title="Show Filter">
            <IconButton>
              <FilterListIcon sx={{ color: "#004bbc" }} />
            </IconButton>
          </Tooltip>
        </Fragment>
      )}
    </Toolbar>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import { StyledTableCell, StyledTableRow } from "../TableStyle";
import { TableProps } from "../../../interfaces/table.interface";

const headCells = [
  {
    id: "entry",
    numeric: false,
    disablePadding: true,
    label: "Entry",
  },
  {
    id: "type",
    numeric: true,
    disablePadding: false,
    label: "Type",
  },
  {
    id: "prelabel",
    numeric: true,
    disablePadding: false,
    label: "Prelabel",
  },
  {
    id: "label",
    numeric: true,
    disablePadding: false,
    label: "Label",
  },
];

export default function DatasetTableHead(props: TableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <StyledTableRow>
        <StyledTableCell padding="checkbox">
          <Checkbox
            sx={{
              "&.Mui-checked": {
                color: "#004bbc",
              },
            }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              // sx={{
              //   "&.MuiTableSortLabel-root": {
              //     color: "white",
              //   },
              //   "&.MuiTableSortLabel-root:hover": {
              //     color: "#ccc",
              //   },
              //   "&.Mui-active": {
              //     color: "white",
              //   },
              //   "& .MuiTableSortLabel-icon": {
              //     color: "white !important",
              //   },
              // }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
}

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import { StyledTableCell, StyledTableRow } from "../TableStyle";
import { getComparator, stableSort } from "../tableFunction";
import { Order } from "../../../interfaces/table.interface";
import { IDataset } from "../../../interfaces/IDataset";
import CreateDatasetTableToolbar from "./CreateDatasetToolbar";
import CreateDatasetTableHead from "./CreateDatasetHeader";
import { useNavigate } from "react-router-dom";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

const ENTRY_TYPE_OPTIONS = [
  // {
  //   value: "textInput",
  //   label: "textInput",
  // },
  // {
  //   value: "multipleChoice",
  //   label: "multipleChoice",
  // },
  "textInput",
  "multipleChoice",
];

interface Props {
  newDataset: IDataset;
  setNewDataset: Dispatch<SetStateAction<IDataset>>;
}

export default function CreateDatasetTable({
  newDataset,
  setNewDataset,
}: Props) {
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>("description");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = newDataset.entries.map((n) => n.entry);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  function handleRemoveEntry(entryIndex: number) {
    setNewDataset({
      ...newDataset,
      entries: [
        ...newDataset.entries.slice(0, entryIndex),
        ...newDataset.entries.slice(entryIndex + 1),
      ],
    });
  }

  function onEntryTypeChange(
    event: SelectChangeEvent<string>,
    entryIndex: number
  ) {
    const tempNewDataset = { ...newDataset };
    tempNewDataset.entries[entryIndex].entry_type = event.target.value;
    setNewDataset(tempNewDataset);
  }

  function truncate(source: string, size: number) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty dataset.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - newDataset.entries.length)
      : 0;

  return (
    <Box
      sx={{
        width: 1,
        maxWidth: 720,
      }}
    >
      <Paper sx={{ width: "100%", mb: 2 }}>
        <CreateDatasetTableToolbar
          numSelected={selected.length}
          setSearchInput={setSearchInput}
          newDataset={newDataset}
          setNewDataset={setNewDataset}
        />
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            // size={dense ? "small" : "medium"}
            size={"small"}
          >
            <CreateDatasetTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={newDataset.entries.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
              {stableSort(newDataset.entries, getComparator(order, orderBy))
                .filter((arr) => {
                  return (
                    arr.entry
                      .toLowerCase()
                      .indexOf(searchInput.toLowerCase()) >= 0
                  );
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.entry);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <StyledTableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.entry}
                      selected={isItemSelected}
                    >
                      <StyledTableCell component="th" id={labelId} scope="row">
                        {truncate(row.entry.split("/")[4], 17)}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Stack direction={"row"} justifyContent={"flex-end"}>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img
                              src={row.entry}
                              alt={"entry image url"}
                              style={{
                                height: 42,
                                objectFit: "contain",
                              }}
                            />
                          </div>
                        </Stack>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Stack
                          direction={"row"}
                          justifyContent={"flex-end"}
                          sx={{ minWidth: 160 }}
                        >
                          <Select
                            value={newDataset.entries[index].entry_type}
                            onChange={(event) => {
                              onEntryTypeChange(event, index);
                            }}
                            size={"small"}
                            sx={{ minWidth: 160 }}
                          >
                            {ENTRY_TYPE_OPTIONS.map((item, index) => (
                              <MenuItem key={index} value={item}>
                                {item}
                              </MenuItem>
                            ))}
                          </Select>
                        </Stack>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Tooltip title="Remove Entry">
                          <IconButton
                            onClick={() => {
                              handleRemoveEntry(index);
                            }}
                          >
                            <DeleteIcon sx={{ color: "#004bbc" }} />
                          </IconButton>
                        </Tooltip>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

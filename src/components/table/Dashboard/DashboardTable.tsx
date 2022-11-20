import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import { StyledTableCell, StyledTableRow } from "../TableStyle";
import { getComparator, stableSort } from "../tableFunction";
import { Order } from "../../../interfaces/table.interface";
import { IDataset, IEntry } from "../../../interfaces/IDataset";
import DashboardTableToolbar from "./DashboardTableToolbar";
import DashboardTableHead from "./DashboardTableHead";
import { datasetData } from "../../../data/datasetData";

export default function DashboardTable() {
  const [dataset] = useState<IDataset[]>(datasetData);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>("description");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    // handleGetAllLeaderboard().then((response) => {
    //   if (response.status === "success") {
    //     setLeaderboards(response.data);
    //   } else if (response.status === "error") {
    //     console.error(response.message);
    //   }
    // });
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
      const newSelected = dataset.map((n) => n.description);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty dataset.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataset.length) : 0;

  function countLabeledEntry(entries: IEntry[]): number {
    return entries.filter((_entry) => _entry.label).length;
  }

  return (
    <Box
      sx={{
        maxWidth: 1200,
      }}
    >
      <Paper sx={{ width: "100%", mb: 2 }}>
        <DashboardTableToolbar
          numSelected={selected.length}
          setSearchInput={setSearchInput}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            // size={dense ? "small" : "medium"}
            size={"small"}
          >
            <DashboardTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={dataset.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
              {stableSort(dataset, getComparator(order, orderBy))
                .filter((arr) => {
                  return (
                    arr.description
                      .toString()
                      .toLowerCase()
                      .indexOf(searchInput.toLowerCase()) >= 0
                  );
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.description.toString());
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <StyledTableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.description.toString()}
                      selected={isItemSelected}
                    >
                      <StyledTableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                          sx={{
                            "&.Mui-checked": {
                              color: "#004bbc",
                            },
                          }}
                          onClick={(event) =>
                            handleClick(event, row.description.toString())
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.description.toString()}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.prelabel}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Stack direction={"row"} justifyContent={"flex-end"}>
                          {countLabeledEntry(row.entries)}/{row.entries.length}
                        </Stack>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Tooltip title="Export">
                          <IconButton>
                            <DownloadIcon sx={{ color: "#004bbc" }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton>
                            <EditIcon sx={{ color: "#004bbc" }} />
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
        <TablePagination
          rowsPerPageOptions={[5, 20, 30]}
          component="div"
          count={dataset.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

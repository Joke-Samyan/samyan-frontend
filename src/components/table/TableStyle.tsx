import { styled } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
// import tableCellClasses from "@mui/material/TableCell/tableCellClasses";
import TableRow from "@mui/material/TableRow";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  // [`&.${tableCellClasses.head}`]: {
  //   backgroundColor: theme.palette.common.white,
  //   // color: "#FF5B4A",
  //   color: theme.palette.common.black,
  //   // fontSize: "1.2rem",
  // },
  // [`&.${tableCellClasses.body}`]: {
  //   // color: "#ffffff",
  //   // fontWeight: 800,
  //   fontSize: 15,
  //   fontStyle: "normal",
  //   flex: "none",
  //   order: 1,
  //   // backgroundColor: "#242424",
  //   background: theme.palette.common.white,
  //   color: theme.palette.common.black,
  // },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // "&:nth-of-type(odd)": {
  //   // backgroundColor: "#242424",
  // },
  // "&:last-child td, &:last-child th": {
  //   border: 0,
  // },
}));

export { StyledTableCell, StyledTableRow };

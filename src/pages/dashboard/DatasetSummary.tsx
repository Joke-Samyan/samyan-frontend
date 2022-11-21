import { Box } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import DatasetTable from "../../components/table/Dataset.tsx/DatasetTable";

function DatasetSummary() {
  return (
    <div>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
          // bgcolor: "red",
        }}
      >
        <DatasetTable />
      </Box>
    </div>
  );
}

export default DatasetSummary;

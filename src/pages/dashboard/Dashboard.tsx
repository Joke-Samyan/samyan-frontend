import { Box } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import DashboardTable from "../../components/table/Dashboard/DashboardTable";

function Dashboard() {
  return (
    <Box>
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
        <DashboardTable />
      </Box>
    </Box>
  );
}

export default Dashboard;

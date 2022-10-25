import { FormEvent } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./topup.scss";

import { Divider, TextField } from "@mui/material";

const TopupLanding = () => {
  

  async function handleFormSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
  }

  return (
    <div className="login-container">
    <Navbar />
    <div className="login-body">
      <form
        className="login-card-container"
        onSubmit={handleFormSubmit}
      >
        <h2 className="card-header">กระเป๋าตังของคุณ</h2>
        <h2 className="card-header">5 บาท</h2>
        <div style={{ padding: "10px"}}>
            <TextField style={{ width: "30%"}} className="login-input" id="outlined-basic" label="จำนวนเงิน" variant="outlined" size="small" />
        </div>

        <div className="login-btn-container">
        <button style={{ width: "10%", marginRight: "50px"}} type="submit">ถอนเงิน</button>
        <button style={{ width: "10%", marginLeft: "50px"}} type="submit">ฝากเงิน</button>
        </div>
        
      </form>
    </div>
  </div>
  );
};

export default TopupLanding;

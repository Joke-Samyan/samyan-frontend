import { FormEvent } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./login.scss";

import { Divider, TextField } from "@mui/material";

const LoginLanding = () => {

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
          <h2 className="card-header">เข้าสู่ระบบ</h2>
          
          <div style={{ padding: "10px"}}>
            <TextField style={{ width: "50%"}} className="login-input" id="outlined-basic" label="อีเมล" variant="outlined" size="small" />
          </div>
          <div style={{ padding: "10px"}}>
            <TextField style={{ width: "50%"}} id="outlined-basic" label="รหัสผ่าน" variant="outlined" size="small"/>
          </div>

          <div className="login-btn-container">
            <button style={{ width: "20%"}} type="submit">เข้าสู่ระบบ</button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default LoginLanding;

import { FormEvent } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./register.scss";

import { Divider, TextField } from "@mui/material";

const RegisterLanding = () => {

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
        <h2 className="card-header">สมัครสมาชิก</h2>
        
        <div style={{ padding: "10px"}}>
          <TextField style={{ marginRight: "2%", width:"24%"}} id="outlined-basic" label="ชื่อ" variant="outlined" size="small" />
          <TextField style={{width:"24%"}}id="outlined-basic" label="นามสกุล" variant="outlined" size="small"/>
        </div>
        <div style={{ padding: "10px"}}>
          <TextField style={{ width: "50%"}} id="outlined-basic" label="รหัสผ่าน" variant="outlined" size="small"/>
        </div>
        <div style={{ padding: "10px"}}>
          <TextField style={{ width: "50%"}} id="outlined-basic" label="ยืนยันรหัสผ่าน" variant="outlined" size="small"/>
        </div>
        <div style={{ padding: "10px"}}>
          <TextField style={{ width: "50%"}} id="outlined-basic" label="เบอร์โทร" variant="outlined" size="small"/>
        </div>


        <div className="login-btn-container">
        <button style={{ width: "20%"}} type="submit">สมัครสมาชิก</button>
        </div>
        
      </form>
    </div>
  </div>
  );
};

export default RegisterLanding;

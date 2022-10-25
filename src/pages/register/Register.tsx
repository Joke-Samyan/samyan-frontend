import { ChangeEvent, FormEvent, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./register.scss";

import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IRegister } from "../../interfaces/IUser";

const RegisterLanding = () => {
  const navigate = useNavigate();
  const [submission, setSubmission] = useState<IRegister>({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  async function handleFormSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    console.log(submission);

    navigate("/login");
  }

  function onSubmissionChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setSubmission({ ...submission, [event.target.name]: event.target.value });
  }

  return (
    <div className="login-container">
      <Navbar />
      <div className="login-body">
        <form className="login-card-container" onSubmit={handleFormSubmit}>
          <h2 className="card-header">สมัครสมาชิก</h2>

          <div style={{ padding: "10px" }}>
            <TextField
              style={{ marginRight: "2%", width: "24%" }}
              id="outlined-basic"
              label="ชื่อ"
              variant="outlined"
              size="small"
              name="name"
              onChange={(event) => {
                onSubmissionChange(event);
              }}
            />
            <TextField
              style={{ width: "24%" }}
              id="outlined-basic"
              label="นามสกุล"
              variant="outlined"
              size="small"
              name="surname"
              onChange={(event) => {
                onSubmissionChange(event);
              }}
            />
          </div>
          <div style={{ padding: "10px" }}>
            <TextField
              style={{ width: "50%" }}
              id="outlined-basic"
              label="อีเมล"
              variant="outlined"
              size="small"
              name="email"
              onChange={(event) => {
                onSubmissionChange(event);
              }}
            />
          </div>
          <div style={{ padding: "10px" }}>
            <TextField
              style={{ width: "50%" }}
              id="outlined-basic"
              label="รหัสผ่าน"
              variant="outlined"
              size="small"
              name="password"
              onChange={(event) => {
                onSubmissionChange(event);
              }}
            />
          </div>
          <div style={{ padding: "10px" }}>
            <TextField
              style={{ width: "50%" }}
              id="outlined-basic"
              label="ยืนยันรหัสผ่าน"
              variant="outlined"
              size="small"
              name="confirmPassword"
              onChange={(event) => {
                onSubmissionChange(event);
              }}
            />
          </div>
          <div style={{ padding: "10px" }}>
            <TextField
              style={{ width: "50%" }}
              id="outlined-basic"
              label="เบอร์โทร"
              variant="outlined"
              size="small"
              name="phone"
              onChange={(event) => {
                onSubmissionChange(event);
              }}
            />
          </div>

          <div className="login-btn-container">
            <button style={{ width: "20%" }} type="submit">
              สมัครสมาชิก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterLanding;

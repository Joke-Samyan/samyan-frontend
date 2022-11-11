import { ChangeEvent, FormEvent, useState } from "react";
import "./register.scss";

import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IRegister } from "../../interfaces/IUser";
import { register } from "../../apis/auth";
import Navbar from "../../components/navbar/Navbar";

const RegisterLanding = () => {
  const navigate = useNavigate();
  const [submission, setSubmission] = useState<IRegister>({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  async function handleFormSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    const requestBody: string = JSON.stringify(submission);
    handleRegister(requestBody).then((response) => {
      if (response.ok) {
        navigate("/login");
      } else {
        console.error(response);
      }
    });
  }

  async function handleRegister(requestBody: string): Promise<any> {
    return await register(requestBody);
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
              id="register-name"
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
              id="register-surname"
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
              id="register-email"
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
              id="register-password"
              label="รหัสผ่าน"
              variant="outlined"
              size="small"
              name="password"
              type="password"
              onChange={(event) => {
                onSubmissionChange(event);
              }}
            />
          </div>
          <div style={{ padding: "10px" }}>
            <TextField
              style={{ width: "50%" }}
              id="register-comfirm-password"
              label="ยืนยันรหัสผ่าน"
              variant="outlined"
              size="small"
              name="confirmPassword"
              type="password"
              onChange={(event) => {
                onSubmissionChange(event);
              }}
            />
          </div>

          <div className="login-btn-container">
            <button style={{ width: "30%" }} type="submit">
              สมัครสมาชิก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterLanding;

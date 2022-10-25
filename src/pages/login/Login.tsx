import { ChangeEvent, FormEvent, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./login.scss";

import { TextField } from "@mui/material";
import { ILogin } from "../../interfaces/IUser";
import { useNavigate } from "react-router-dom";

const LoginLanding = () => {
  const navigate = useNavigate();
  const [submission, setSubmission] = useState<ILogin>({
    email: "",
    password: "",
  });
  async function handleFormSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    console.log(submission);

    navigate("/");
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
          <h2 className="card-header">เข้าสู่ระบบ</h2>

          <div style={{ padding: "10px" }}>
            <TextField
              style={{ width: "50%" }}
              className="login-input"
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

          <div className="login-btn-container">
            <button style={{ width: "20%" }} type="submit">
              เข้าสู่ระบบ
            </button>
            <button
              style={{ width: "20%" }}
              type="button"
              onClick={() => {
                navigate("/register");
              }}
            >
              สมัครสมาชิก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginLanding;

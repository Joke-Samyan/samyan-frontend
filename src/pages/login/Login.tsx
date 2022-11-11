import { ChangeEvent, FormEvent, useContext, useState } from "react";
import "./login.scss";

import { TextField } from "@mui/material";
import { ILogin } from "../../interfaces/IUser";
import { useNavigate } from "react-router-dom";
import { login } from "../../apis/auth";
import Navbar from "../../components/navbar/Navbar";
import { UserInfoContext } from "../../contexts/UserInfoContext";

const LoginLanding = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(UserInfoContext);
  const [submission, setSubmission] = useState<ILogin>({
    email: "",
    password: "",
  });
  async function handleFormSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    const requestBody: string = JSON.stringify(submission);
    handleLogin(requestBody).then((response) => {
      if (response.token) {
        localStorage.setItem("token", response.token);
        setIsAuthenticated(true);
        navigate("/");
      } else {
        console.error(response);
      }
    });
  }

  async function handleLogin(requestBody: string): Promise<any> {
    return await login(requestBody);
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
              id="login-email"
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
              id="login-password"
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

          <div className="login-btn-container">
            <button style={{ width: "30%" }} type="submit">
              เข้าสู่ระบบ
            </button>
            <button
              style={{ width: "30%" }}
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

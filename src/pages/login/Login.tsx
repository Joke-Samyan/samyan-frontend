import { ChangeEvent, FormEvent, useContext, useState } from "react";
import "./login.scss";

import { Box, TextField } from "@mui/material";
import { ILogin } from "../../interfaces/IUser";
import { useNavigate } from "react-router-dom";
import { login } from "../../apis/auth";
import Navbar from "../../components/navbar/Navbar";
import { UserInfoContext } from "../../contexts/UserInfoContext";
import { ClipLoader } from "react-spinners";

const LoginLanding = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(UserInfoContext);
  const [submission, setSubmission] = useState<ILogin>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  async function handleFormSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    setIsLoading(true);

    const requestBody: string = JSON.stringify(submission);
    handleLogin(requestBody).then((response) => {
      if (response && response.token) {
        localStorage.setItem("token", response.token);
        setIsAuthenticated(true);
        setHasError(false);
        navigate("/");
      } else {
        setHasError(true);
        console.error(response);
      }
      setIsLoading(false);
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
          {isLoading && (
            <Box
              sx={{
                height: 40,
              }}
            >
              <ClipLoader size={40} color="#004BBC" />
            </Box>
          )}
          {!isLoading && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: 40,
              }}
            >
              {hasError && (
                <Box sx={{ color: "red" }}>อีเมลหรือรหัสผ่านไม่ถูกต้อง</Box>
              )}
            </Box>
          )}

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

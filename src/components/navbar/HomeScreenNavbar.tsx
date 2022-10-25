import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./homeScreenNavbar.scss";

const HomeScreenNavbar: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  function navigateToLogin() {
    if (location.pathname !== "/login") {
      navigate("/login");
    }
  }
  return (
    <div className="navbar-container">
      <h2>KODWANG </h2>
      <img
        className="logo"
        src={require("../../assets/images/kodwang-logo.png")}
        alt="kod wang logo not found"
      />
      <div className="right-contentt">
        <button
          className="create-dataset-btn"
          onClick={navigateToLogin}
        >
          เข้าสู่ระบบ
        </button>
        <button
          className="create-dataset-btn-icon"
          onClick={navigateToLogin}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default HomeScreenNavbar;

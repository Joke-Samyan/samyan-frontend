import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./navbar.scss";

const LandingNavbar: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  function navigateToCreateDataset() {
    if (location.pathname !== "/create-dataset") {
      navigate("/create-dataset");
    }
  }

  function navigateToTopup() {
    if (location.pathname !== "/topup") {
      navigate("/topup");
    }
  }

  function navigateToLabel() {
    if (location.pathname !== "/label-image") {
      navigate("/label-image");
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
      <div className="right-content">
        <div className="btn-container">
          <p>{5} บาท</p>
          <button onClick={navigateToTopup}>กระเป๋าตัง</button>
        </div>
        <button
          className="create-dataset-btn"
          onClick={navigateToCreateDataset}
        >
          สร้างชุดข้อมูล
        </button>
        <button className="create-dataset-btn" onClick={navigateToLabel}>
          label data
        </button>
      </div>
    </div>
  );
};

export default LandingNavbar;

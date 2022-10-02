import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./navbar.scss";

const Navbar: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  function navigateToCreateDataset() {
    if (location.pathname !== "/create-dataset") {
      navigate("/create-dataset");
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
          <button>ถอนเงิน</button>
        </div>
        <button
          className="create-dataset-btn"
          onClick={navigateToCreateDataset}
        >
          สร้างชุดข้อมูล
        </button>
        <button
          className="create-dataset-btn-icon"
          onClick={navigateToCreateDataset}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Navbar;

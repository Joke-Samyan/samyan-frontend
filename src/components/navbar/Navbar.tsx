import React from "react";
import "./navbar.scss";

const Navbar = () => {
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
        <button className="create-dataset-btn">สร้างชุดข้อมูล</button>
        <button className="create-dataset-btn-icon">+</button>
      </div>
    </div>
  );
};

export default Navbar;

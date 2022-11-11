import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserInfoContext } from "../../contexts/UserInfoContext";
import "./navbar.scss";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { userInfoContext, isAuthenticated, setIsAuthenticated } =
    useContext(UserInfoContext);

  // function navigateToLanding() {
  //   if (location.pathname !== "/") {
  //     navigate("/");
  //   }
  // }

  function navigateToTopup() {
    if (location.pathname !== "/topup") {
      navigate("/topup");
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  }

  return (
    <div className="navbar-container">
      <h2>KODWANG </h2>
      <img
        className="logo"
        src={require("../../assets/images/kodwang-logo.png")}
        alt="kod wang logo not found"
      />
      {isAuthenticated && (
        <div className="right-content">
          <div className="btn-container">
            <p>{userInfoContext.balance} บาท</p>
            <button onClick={navigateToTopup}>กระเป๋าตัง</button>
          </div>
          <button
            className="create-dataset-btn"
            onClick={() => {
              handleLogout();
            }}
          >
            ออกจากระบบ
          </button>
        </div>
      )}
      {/* <button className="create-dataset-btn" onClick={navigateToLanding}>
          หน้าแรก
        </button> */}
    </div>
  );
};

export default Navbar;

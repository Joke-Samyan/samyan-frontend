import { FC } from "react";
import HomeScreenNavbar from "../../components/navbar/HomeScreenNavbar";
import "./homeScreen.scss";

const HomeScreen: FC = () => {
  return (
    <div className="landing-container1">
      <HomeScreenNavbar />
      <h2 className="card-header">สมัครเป็นคน โคตรว่าง</h2>
      <h2 className="card-header">เพื่อหารายได้ในตอนที่คุณโคตรว่างจริงๆ</h2>
      <div className="registerButton">
        <button
          onClick={() => {
            //login
          }}
        >
          สมัครเลย!
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;

import { ChangeEvent, useContext, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./topup.scss";

import { TextField } from "@mui/material";
import { UserInfoContext } from "../../contexts/UserInfoContext";
import { topup, withdraw } from "../../apis/account";

const TopupLanding = () => {
  const { userInfoContext, setUserInfoContext } = useContext(UserInfoContext);
  const [amount, setAmount] = useState<number>(0);

  function handleChangeAmount(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setAmount(parseFloat(event.target.value));
  }

  async function handleTopup() {
    try {
      const request = {
        user_id: userInfoContext.user_id,
        amount: amount,
      };

      const requestBody = JSON.stringify(request);
      await topup(requestBody).then((response) => {
        if (response.status === "success") {
          setUserInfoContext({
            ...userInfoContext,
            balance: response.data.balance,
          });
        }
      });
    } catch (exception) {
      console.error(exception);
    }
  }

  async function handleWithdraw() {
    try {
      const request = {
        user_id: userInfoContext.user_id,
        amount: amount,
      };

      const requestBody = JSON.stringify(request);
      await withdraw(requestBody).then((response) => {
        if (response.status === "success") {
          setUserInfoContext({
            ...userInfoContext,
            balance: response.data.balance,
          });
        }
      });
    } catch (exception) {
      console.error(exception);
    }
  }

  return (
    <div className="login-container">
      <Navbar />
      <div className="login-body">
        <div className="login-card-container">
          <h2 className="card-header">กระเป๋าตังของคุณ</h2>
          <h2 className="card-header">{userInfoContext.balance} บาท</h2>
          <div style={{ padding: "10px" }}>
            <TextField
              style={{ width: "30%" }}
              type="number"
              label="จำนวนเงิน"
              variant="outlined"
              size="small"
              onChange={(event) => handleChangeAmount(event)}
              value={amount}
            />
          </div>

          <div className="topup-btn-container">
            <button
              style={{ width: "10%", marginRight: "50px" }}
              onClick={() => {
                handleWithdraw();
              }}
            >
              ถอนเงิน
            </button>
            <button
              style={{ width: "10%", marginLeft: "50px" }}
              onClick={() => {
                handleTopup();
              }}
            >
              ฝากเงิน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopupLanding;

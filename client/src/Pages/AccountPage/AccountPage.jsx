import React, { useContext } from "react";
import { Link, Route, Routes } from "react-router-dom";
import AccountLogin from "../../Components/AccountLogin/AccountLogin";
import AccountOverview from "../../Components/AccountOverview/AccountOverview";
import AccountRegister from "../../Components/AccountRegister/AccountRegister";
import { AuthContext } from "../../Helpers/AuthContext";

const AccountPage = () => {
  const { logout, user } = useContext(AuthContext);

  const handleClick = async () => {
    try {
      await logout(user);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="account-page-container">
      <div className="account-page-container__left">
        <h3>My account</h3>
        <ul>
          <Routes>
            <Route
              path={"/"}
              element={
                <>
                  <li>
                    <Link
                      onClick={() =>
                        document
                          .querySelector("#personal-information")
                          .scrollIntoView({ behavior: "smooth" })
                      }
                      to="#personal-information"
                    >
                      Account Information
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() =>
                        document
                          .querySelector("#address")
                          .scrollIntoView({ behavior: "smooth" })
                      }
                      to="#address"
                    >
                      Address book
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() =>
                        document
                          .querySelector("#orders")
                          .scrollIntoView({ behavior: "smooth" })
                      }
                      to="#orders"
                    >
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link onClick={() => handleClick()} to="/account/logout">
                      Logout
                    </Link>
                  </li>
                </>
              }
            ></Route>
            <Route
              path={"login"}
              element={
                <li>
                  <Link to={"/account/register"}>Create an account</Link>
                </li>
              }
            ></Route>
            <Route
              path={"register"}
              element={
                <li>
                  <Link to={"/account/login"}>I already have an account</Link>
                </li>
              }
            ></Route>
          </Routes>
        </ul>
      </div>
      <div className="account-page-container__right">
        <Routes>
          <Route path={"/"} element={<AccountOverview />} />
          <Route path={"register"} element={<AccountRegister />} />
          <Route path={"login"} element={<AccountLogin />} />
        </Routes>
      </div>
    </div>
  );
};

export default AccountPage;

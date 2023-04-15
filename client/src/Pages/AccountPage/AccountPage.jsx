import React, { useContext } from "react";
import { Link, Route, useHistory } from "react-router-dom";
import AccountLogin from "../../Components/AccountLogin/AccountLogin";
import AccountOverview from "../../Components/AccountOverview/AccountOverview";
import AccountRegister from "../../Components/AccountRegister/AccountRegister";
import { AuthContext } from "../../Helpers/AuthContext";

const AccountPage = () => {
  const history = useHistory();
  const { logout, user } = useContext(AuthContext);

  const handleClick = async () => {
    try {
      await logout(user);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="account-page-container">
      <div className="account-page-container__left">
        <h3>My account</h3>
        <ul>
          <Route path={"/account"} exact>
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
          </Route>
          <Route path={"/account/login"}>
            <li>
              <Link to={"/account/register"}>Create an account</Link>
            </li>
          </Route>
          <Route path={"/account/register"}>
            <li>
              <Link to={"/account/login"}>I already have an account</Link>
            </li>
          </Route>
        </ul>
      </div>
      <div className="account-page-container__right">
        <Route path={"/account"} exact component={AccountOverview} />
        <Route path={"/account/register"} component={AccountRegister} />
        <Route path={"/account/login"} component={AccountLogin} />
      </div>
    </div>
  );
};

export default AccountPage;

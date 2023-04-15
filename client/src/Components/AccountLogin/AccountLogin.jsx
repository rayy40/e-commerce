import React, { useContext } from "react";
import { AuthContext } from "../../Helpers/AuthContext";
import { useHistory } from "react-router";

const AccountLogin = () => {
  const { login, authState, user, setUser, loading } = useContext(AuthContext);
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(user);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(loading);
  return (
    <div>
      <div className="form-header">
        <h3>{loading ? "Logging in." : "Login"}</h3>
      </div>
      {authState?.loginStatus === "error" && (
        <div
          style={{ padding: "2.5em 0 2em", fontSize: "0.925rem" }}
          className="error"
        >
          <p>Incorrect email or password.</p>
        </div>
      )}
      {loading ? (
        <div className="loading-container">
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div className="form">
          <form
            onSubmit={handleSubmit}
            method="post"
            action="/account/login"
            className="login__form"
          >
            <input type="hidden" name="form_type" value="customer_login" />
            <input type="hidden" name="utf8" value="✓" />
            <div className="login__form-container">
              <label className="login__form-label" htmlFor="email">
                Email Address*
              </label>
              <input
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="login__form-input"
                id="email"
                name="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                required=""
                size="30"
                type="email"
              />
            </div>
            <div className="login__form-container">
              <label className="login__form-label" htmlFor="password">
                Password*
              </label>
              <input
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="login__form-input"
                id="password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                name="password"
                required=""
                size="30"
                type="password"
              />
            </div>
            <div className="login__form-container">
              <button className="login-btn" type="submit">
                Sign in
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AccountLogin;

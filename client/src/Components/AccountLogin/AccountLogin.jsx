import React, { useContext, useState } from "react";
import { AuthContext } from "../../Helpers/AuthContext";
import { useNavigate } from "react-router";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AccountLogin = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, authState, user, setUser, loading, setAuthState } =
    useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthState({
      ...authState,
      loginStatus: "",
      loginError: "",
    });
    try {
      setIsSubmitting(true);
      await login(user);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <p style={{ color: "rgb(235, 87, 87)", fontSize: "1rem" }}>
            Incorrect email or password.
          </p>
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
                name="password"
                required=""
                size="30"
                type="password"
              />
            </div>
            <div className="login__form-container">
              <button
                disabled={isSubmitting}
                style={{ opacity: isSubmitting ? 0.8 : 1 }}
                type="submit"
                className="login-btn"
              >
                {isSubmitting ? (
                  <div className="loading-container spinner-container">
                    <div className="lds-ring">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                ) : (
                  <>
                    Sign In
                    <FontAwesomeIcon className="icon" icon={faArrowRightLong} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AccountLogin;

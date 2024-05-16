import React, { useContext, useState } from "react";
import { AuthContext } from "../../Helpers/AuthContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

const AccountRegister = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { registerUser, authState, user, setUser, loading } =
    useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await registerUser(user);
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
        <h3>Create account</h3>
      </div>
      {authState?.registerStatus === "error" && (
        <div
          style={{ padding: "2.5em 0 2em", fontSize: "0.925rem" }}
          className="error"
        >
          <p>This email address is already associated with an account.</p>
        </div>
      )}
      {loading ? (
        <div className="loading-conatiner">
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
            action="/account"
            className="register__form"
          >
            <input type="hidden" name="form_type" value="create_customer" />
            <input type="hidden" name="utf8" value="✓" />
            <div className="register__form-row">
              <div className="register__field-container">
                <label className="register__form-label" htmlFor="firstName">
                  First name*
                </label>
                <input
                  onChange={(e) =>
                    setUser({ ...user, firstName: e.target.value })
                  }
                  className="register__form-input"
                  id="firstName"
                  name="first_name"
                  pattern="[A-Za-z]{3,}"
                  required=""
                  size="30"
                  type="text"
                  onInvalid={(e) =>
                    e.target.setCustomValidity(
                      "Please input at least 3 characters."
                    )
                  }
                  onBlur={(e) => e.target.setCustomValidity("")}
                />
                <span></span>
              </div>
              <div className="register__field-container">
                <label className="register__form-label" htmlFor="lastName">
                  Last Name*
                </label>
                <input
                  onChange={(e) =>
                    setUser({ ...user, lastName: e.target.value })
                  }
                  className="register__form-input"
                  id="lastName"
                  name="last_name"
                  pattern="[A-Za-z]{3,}"
                  required=""
                  size="30"
                  type="text"
                  onInvalid={(e) =>
                    e.target.setCustomValidity(
                      "Please input at least 3 characters."
                    )
                  }
                  onBlur={(e) => e.target.setCustomValidity("")}
                />
              </div>
            </div>
            <div className="register__form-row">
              <div className="register__field-container">
                <label className="register__form-label" htmlFor="birthday">
                  Birthday*
                </label>
                <input
                  onChange={(e) =>
                    setUser({ ...user, birthday: e.target.value })
                  }
                  className="register__form-input register__form-input--birthday"
                  id="birthday"
                  maxLength="10"
                  name="birthday"
                  pattern="(0[1-9]|1[0-9]|2[0-9]|3[01])/(0[1-9]|1[012])/[0-9]{4}"
                  placeholder="dd/mm/yyyy"
                  title="Please enter a valid format."
                  required=""
                  type="date"
                  onBlur={(e) => e.target.setCustomValidity("")}
                />
              </div>
              <div className="register__field-container register__field-container--radio">
                <div className="register__field-heading">Gender*</div>
                <div className="register__form-radio-group">
                  <label className="register__form-label register__form-label--radio">
                    <input
                      onChange={(e) =>
                        setUser({ ...user, gender: e.target.value })
                      }
                      className="register__form-input register__form-input--radio"
                      name="gender"
                      required=""
                      type="radio"
                      value="Male"
                      onBlur={(e) => e.target.setCustomValidity("")}
                    />
                    <span className="register__form-label-text">Male</span>
                  </label>
                  <label className="register__form-label register__form-label--radio">
                    <input
                      onChange={(e) =>
                        setUser({ ...user, gender: e.target.value })
                      }
                      className="register__form-input register__form-input--radio"
                      name="gender"
                      required=""
                      type="radio"
                      value="Female"
                      onBlur={(e) => e.target.setCustomValidity("")}
                    />
                    <span className="register__form-label-text">Female</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="register__form-row">
              <div className="register__field-container">
                <label className="register__form-label" htmlFor="email">
                  Email Address*
                </label>
                <input
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="register__form-input"
                  id="email"
                  name="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  required=""
                  size="30"
                  type="email"
                  onBlur={(e) => e.target.setCustomValidity("")}
                />
              </div>
              <div className="register__field-container">
                <label className="register__form-label" htmlFor="password">
                  Password*
                </label>
                <input
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  className="register__form-input"
                  id="password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  name="password"
                  required=""
                  size="30"
                  type="password"
                  onFocus={(e) => e.target.setCustomValidity("")}
                  onInvalid={(e) => {
                    e.target.setCustomValidity("");
                    if (!e.target.validity.valid) {
                      if (e.target.value.length < 8) {
                        e.target.setCustomValidity(
                          "Password should be at least 8 characters long."
                        );
                      } else if (!/(?=.*[A-Z])/.test(e.target.value)) {
                        e.target.setCustomValidity(
                          "Password should contain at least one uppercase character."
                        );
                      } else if (!/\d/.test(e.target.value)) {
                        e.target.setCustomValidity(
                          "Password should contain at least one number."
                        );
                      } else if (!/\W/.test(e.target.value)) {
                        e.target.setCustomValidity(
                          "Password should contain at least one special character."
                        );
                      }
                    }
                  }}
                />
              </div>
            </div>
            <div className="register__form-row">
              <button
                disabled={isSubmitting}
                style={{ opacity: isSubmitting ? 0.8 : 1 }}
                type="submit"
                className="create-account-btn"
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
                    Create Account
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

export default AccountRegister;

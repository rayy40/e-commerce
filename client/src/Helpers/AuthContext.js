import React, { createContext, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

const token = localStorage.getItem("token");
const decodedToken = token ? jwtDecode(token) : {};

const initialState = {
  token: token || "",
  firstName: decodedToken.firstName || "",
  lastName: decodedToken.lastName || "",
  birthday: decodedToken.birthday || "",
  gender: decodedToken.gender || "",
  email: decodedToken.email || "",
  _id: decodedToken._id || "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(initialState);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    gender: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const setHeaders = () => {
    const headers = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    return headers;
  };

  const registerUser = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://e-commerce-c8nd.onrender.com/account/register`,
        {
          firstName: values.firstName,
          lastName: values.lastName,
          birthday: values.birthday,
          gender: values.gender,
          email: values.email,
          password: values.password,
        }
      );

      localStorage.setItem("token", response.data);
      const decodedToken = jwtDecode(response.data);

      setAuthState({
        token: response.data,
        firstName: decodedToken.firstName,
        lastName: decodedToken.lastName,
        birthday: decodedToken.birthday,
        gender: decodedToken.gender,
        email: decodedToken.email,
        _id: decodedToken._id,
        registerStatus: "success",
        registerError: "",
        loginStatus: "",
        loginError: "",
        userLoaded: true,
      });

      setLoading(false);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      setAuthState({
        ...authState,
        registerStatus: "error",
        registerError: error.response.data,
      });
      return Promise.reject(error.response.data);
    }
  };

  const login = async (values) => {
    try {
      setLoading(true);
      const token = await axios.post(
        `https://e-commerce-c8nd.onrender.com/account/login`,
        {
          email: values.email,
          password: values.password,
        }
      );

      localStorage.setItem("token", token.data);
      const decodedToken = jwtDecode(token.data);

      setAuthState({
        token: token.data,
        firstName: decodedToken.firstName,
        lastName: decodedToken.lastName,
        birthday: decodedToken.birthday,
        gender: decodedToken.gender,
        email: decodedToken.email,
        _id: decodedToken._id,
        registerStatus: "",
        registerError: "",
        loginStatus: "success",
        loginError: "",
        userLoaded: true,
      });

      setLoading(false);

      return token.data;
    } catch (error) {
      console.log(error.response.data);
      setAuthState({
        ...authState,
        loginStatus: "error",
        loginError: error.response.data,
      });
      return Promise.reject(error.response.data);
    }
  };

  const getUser = async (id) => {
    try {
      const token = await axios.get(
        `https://e-commerce-c8nd.onrender.com/user/${id}`,
        setHeaders()
      );

      localStorage.setItem("token", token.data);
      const decodedToken = jwtDecode(token.data);

      setAuthState({
        token: token.data,
        firstName: decodedToken.firstName,
        lastName: decodedToken.lastName,
        birthday: decodedToken.birthday,
        gender: decodedToken.gender,
        email: decodedToken.email,
        _id: decodedToken._id,
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
        userLoaded: true,
      });

      return token.data;
    } catch (error) {
      console.log(error.response.data);
      setAuthState({
        ...authState,
        userLoaded: false,
      });
      return Promise.reject(error.response.data);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthState(initialState);
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        registerUser,
        getUser,
        login,
        logout,
        loading,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

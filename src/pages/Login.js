import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as yup from "yup";
import _ from "lodash";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux";
import { FaSpinner } from "react-icons/fa";
import { FormRow } from "../components";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (user && Cookies.get("XSRF-TOKEN")) {
      navigate("/tasks");
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="loading d-flex justify-content-center align-items-center mt-5">
        <FaSpinner icon="spinner" className="spinner" />
      </div>
    );
  }

  const initialValues = { email: "", password: "" };
  const validationSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password is too short - should be 6 chars minimum"),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(loginUser(values));
        }}
      >
        {() => (
          <Form className="col-4 offset-4">
            <h1>Login</h1>

            <FormRow labelText="Email" name="email" type="text" />
            <FormRow labelText="Password" name="password" type="password" />

            <button
              type="submit"
              className="btn btn-outline-primary mt-2"
              disabled={isLoading}
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;

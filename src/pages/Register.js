import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux";
import _ from "lodash";
import Cookies from "js-cookie";
import { FaSpinner } from "react-icons/fa";
import { FormRow } from "../components";

const Register = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.userReducer);

  const navigate = useNavigate();

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

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(2, "Too Short!")
      .max(99, "Too Long!")
      .required("First Name is required"),
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
          dispatch(signupUser(values));
        }}
      >
        {({ dirty, errors }) => (
          <Form className="col-4 offset-4">
            <h1>Register</h1>
            <FormRow labelText="Name" name="name" type="text" />
            <FormRow labelText="Email" name="email" type="email" />
            <FormRow labelText="Password" name="password" type="password" />
            <button
              type="submit"
              className="btn btn-outline-primary mt-2"
              disabled={isLoading || !_.isEmpty(errors) || !dirty}
            >
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Register;

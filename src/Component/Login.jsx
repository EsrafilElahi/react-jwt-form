import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

function Login() {
  const navigate = useNavigate();
  const handleLogout = () => {
    // statement
  };

  return (
    <div className="login">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string().email("email not").required("required"),
          password: Yup.string().min(4, "4 character").required("required"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            const { email, password } = values;
            const user = { email, password };

            axios
              .post("http://localhost:5000/api/auth/login", user, {
                headers: {
                  "content-type": "application/json",
                },
              })
              .then((response) => {
                console.log("response login :", response);
                localStorage.setItem(
                  "token",
                  JSON.stringify({
                    userLogin: true,
                    token: response.data.access_token,
                  })
                );
                if (response.status === 200) {
                  alert(JSON.stringify(values, null, 2));
                  navigate("/profile");
                  resetForm();
                } else {
                  alert("something went wrong!!");
                }
              })
              .catch((err) => {
                console.log(err);
                alert("oops error!!!");
              });
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          {/* Email */}
          <label htmlFor="email">email</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" />

          {/* Password */}
          <label htmlFor="password">password</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" />

          {/* Button */}
          <button className="btn" type="submit">
            submit
          </button>

          {/* Go To Register */}
          <p>
            {" "}
            go to <Link to="/register">register</Link>
          </p>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;

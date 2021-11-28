import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Register() {
  const navigate = useNavigate();
  return (
    <div className="register">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          password2: "",
          privacy: false,
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "must be 15 character")
            .required("required"),
          lastName: Yup.string()
            .min(3, "least 3 character")
            .required("required"),
          email: Yup.string().email("not email").required("required"),
          password: Yup.string().min(4, "4 character").required("required"),
          password2: Yup.string()
            .required("required")
            .oneOf([Yup.ref("password"), null], "must be match"),
          privacy: Yup.boolean()
            .required("required")
            .oneOf([true], "must be true"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            const { firstName, lastName, email, password } = values;
            const user = { firstName, lastName, email, password };
            axios
              .post("http://localhost:5000/api/auth/register", user, {
                headers: {
                  "content-type": "application/json",
                },
              })
              .then((response) => {
                console.log("response register :", response);
                // localStorage.setItem("register", response.data.access_token);
                if (response.status === 200) {
                  alert(JSON.stringify(values, null, 2));
                  navigate("/login");
                  resetForm();
                } else {
                  alert("something went wrong!!");
                }
              })
              .catch((err) => {
                console.log(err);
                alert("oops error!!");
              });
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          {/* First Naem */}
          <label htmlFor="firstName">first name</label>
          <Field name="firstName" type="text" />
          <ErrorMessage name="firstName" />

          {/* Last Name */}
          <label htmlFor="lastName">last name</label>
          <Field name="lastName" type="text" />
          <ErrorMessage name="lastName" />

          {/* Email */}
          <label htmlFor="email">email</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" />

          {/* Password */}
          <label htmlFor="password">password</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" />

          {/* Password 2 */}
          <label htmlFor="password2">password 2</label>
          <Field name="password2" type="password" />
          <ErrorMessage name="password2" />

          {/* Privacy */}
          <label htmlFor="privacy">privacy</label>
          <Field name="privacy" type="checkbox" />
          <ErrorMessage name="privacy" />

          {/* Submit Button */}
          <button className="btn" type="submit">
            submit
          </button>

          {/* Go To Login */}
          <p>
            {" "}
            go to <Link to="/login">login</Link>
          </p>
        </Form>
      </Formik>
    </div>
  );
}

export default Register;

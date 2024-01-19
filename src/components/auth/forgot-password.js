import { Fragment, useEffect, useState } from "react";
import Header from "components/shared/header";
import Head from "next/head";
import Link from "next/link";
import { Container, Row } from "react-bootstrap";
import { Router } from "react-bootstrap-icons";
import { useRouter } from "next/router";
import { BASE_URL } from "constants/constants";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/authActions";
import { Formik } from "formik";

const initialValues = {
  email: "",
};
const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPasswordForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { nextStep, entity } = useSelector(({ AuthReducer }) => AuthReducer);
  const handleSubmit = (values) => {
    const requestPayload = {
      email: values.email,
    };
    dispatch(actions.SignupCheckContact(requestPayload));
  };
  useEffect(() => {
    if (nextStep === "verifyTheOtp") {
      router.push("/verifyForgotPassword");
    }
  }, [nextStep]);
  return (
    <Fragment>
      <Head>
        <title>ApplyKart</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header styleClass="" logoUrl="" />
      <section className="section-padding">
        <div className="forgot-password-container">
          <Row className="">
            <div className="col-md-7">
              <div className="block_box forgot-password-p-0">
                <div className="forgot-password-bg">
                  {/* <img
                  src="/assets/images/auth/register.png"
                  className="image-fit-contain mb-xl-30"
                  alt=""
                /> */}
                </div>
                <div className="text_box">
                  <h4 className="title">Start with creating your V-Card</h4>
                  <p className="mb-0">
                    {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore */}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="form_box px-3">
                <div className="section-header">
                  <h3 className="title">Forgot Password?</h3>
                  <p className="text mb-0">
                    Enter the email address associated with your account. We’ll
                    send you an email with instructions on resetting your
                    password.
                  </p>
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={forgotPasswordSchema}
                  onSubmit={(values) => {
                    handleSubmit(values);
                  }}
                >
                  {(formik) => {
                    return (
                      <form>
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formik.values.email}
                            onChange={(e) =>
                              formik.setFieldValue("email", e.target.value)
                            }
                            placeholder="Email Id"
                            required
                          />
                        </div>
                        <div className="form-group text-center mt- 4">
                          <button
                            onClick={formik.handleSubmit}
                            className="btn btn-warning w-50"
                          >
                            Send <i className="fal fa-long-arrow-right"></i>
                          </button>
                        </div>
                      </form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </Row>
        </div>
      </section>
    </Fragment>
  );
};

export default ForgotPasswordForm;

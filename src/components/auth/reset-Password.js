import { Fragment, useEffect, useState } from "react";
import Header from "components/shared/header";
import Head from "next/head";
import Link from "next/link";
import { Container, Row } from "react-bootstrap";
import { BASE_URL } from "constants/constants";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/authActions";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const initialValues = {
  password: "",
};

const ResetPasswordForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { nextStep, entity, otp } = useSelector(
    ({ AuthReducer }) => AuthReducer
  );
  // console.log("@@@", entity);
  // console.log("@@@@OTP", otp);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);
  const handleSubmit = (values) => {
    // console.log("values ==>>", values)
    const { password, passwordVerify } = values;

    if(!password) {
      Swal.fire({
        icon: 'error',
        text: "Password field can not be blank!"
      })
      return;
    } else if(!passwordVerify) {
      Swal.fire({
        icon: 'error',
        text: "Confirm Password field can not be blank!"
      })
      return;
    } else if(password && passwordVerify && password != passwordVerify) {
      Swal.fire({
        icon: 'error',
        text: "Password and Confirm Password are not matching!"
      })
    } else {
      const requestPayload = {
        OTP: otp,
        email: entity.email,
        NewPassword: values.passwordVerify,
      };

      // console.log("request payload ==>>", requestPayload)
      dispatch(actions.resetPassword(requestPayload));
    }
  };
  function togglePassword() {
    setShowPassword(!showPassword);
  }
  function togglePasswordTwo() {
    setShowPasswordTwo(!showPasswordTwo);
  }
  useEffect(() => {
    if (nextStep === "resetPassword") {
      router.push("/login");
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
        <div className="reset-password-cont">
          <Row className="">
            <div className="col-md-7">
              <div className="block_box reset-password-p-0">
                <div className="reset-password-bg"></div>
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
                  <h3 className="title">Create New Password</h3>
                  <p className="text mb-0">
                    Your new password must be different from the previously used
                    passwords
                  </p>
                </div>
                <Formik
                  initialValues={initialValues}
                  //validationSchema={createNewPasswordSchema}
                  onSubmit={(values) => {
                    handleSubmit(values);
                  }}
                >
                  {(formik) => {
                    return (
                      <form>
                        <div className="form-group password_icon">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            name="password"
                            value={formik.values.password}
                            onChange={(e) =>
                              formik.setFieldValue("password", e.target.value)
                            }
                            placeholder="Password"
                            required
                          />
                          <button
                            type="button"
                            className="button"
                            onClick={togglePassword}
                          >
                            <i
                              className={
                                showPassword ? "fal fa-eye-slash" : "fal fa-eye"
                              }
                            />
                          </button>
                        </div>
                        <div className="form-group password_icon">
                          <input
                            type={showPasswordTwo ? "text" : "password"}
                            className="form-control"
                            name="passwordVerify"
                            value={formik.values.passwordVerify}
                            onChange={(e) =>
                              formik.setFieldValue(
                                "passwordVerify",
                                e.target.value
                              )
                            }
                            placeholder="Confirm Password"
                            required
                          />
                          <button
                            type="button"
                            className="button"
                            onClick={togglePasswordTwo}
                          >
                            <i
                              className={
                                showPasswordTwo
                                  ? "fal fa-eye-slash"
                                  : "fal fa-eye"
                              }
                            />
                          </button>
                        </div>
                        <div className="form-group text-center mt-4">
                          <button
                            type="submit"
                            onClick={formik.handleSubmit}
                            className="btn btn-warning w-50"
                          >
                            Send <i className="fal fa-long-arrow-right" />
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

export default ResetPasswordForm;

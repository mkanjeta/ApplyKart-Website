import { Fragment, useEffect, useState } from "react";
import Header from "components/shared/header";
import Head from "next/head";
import Link from "next/link";
import { Container, Row } from "react-bootstrap";
import Router from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/authActions";
import { useRouter } from "next/router";
import GoogleLogins from "./googleLogin";
import FacebookLogins from "./facebookLogin";
import Loader from "components/shared/loader";
// import { fetchToken } from "../../WebPush";
import AppleLogin from "react-apple-login";
import AppleAuth from "./AppleLogin";

let loginObj = {};
const initialValues = {
  email: "",
  password: "",
};
const SignupSchema = Yup.object().shape({
  email: Yup.string().email("invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Password must be 8 characters, atleast one uppercase, lowercase letter and number"
    ),
});
const UserLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    // isLoggedIn,
    // message,
    encryptedToken,
    // checkContactSuccess,
    // verifyContactSuccess,
    // socialMediaData,
    // loginType,
    // isCompleted,
    loading,
  } = useSelector(({ AuthReducer }) => AuthReducer);
  const { search } = useSelector(({ jobBrowseReducer }) => jobBrowseReducer)
  // const [deviceToken, setDeviceToken] = useState("");
  const [isTokenFound, setTokenFound] = useState(false);
  const [social, setSocial] = useState(() => false);

  useEffect(() => { }, []);

  useEffect(() => {
    if (isTokenFound) {
      console.log(
        localStorage.getItem("deviceToken"),

        "checking local storage"
      );
    }

    if (!isTokenFound) {
    }
  }, [isTokenFound]);

  const [showPassword, setShowPassword] = useState(false);

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  const history = Router;
  const onClick = () => history.push("/forgot-password");
  const handleSubmit = (values) => {
    const loginObj = {
      email: values.email,
      password: values.password,
      device_type: "web",
      device_token: localStorage.getItem("deviceToken")
        ? localStorage.getItem("deviceToken")
        : null,
    };

    dispatch(actions.LoggedIn(loginObj));
  };

  useEffect(() => {
    if (encryptedToken) {
      // if (isCompleted == 1) {
      //   router.push("/timeline");
      // }
      // if (isCompleted == 0) {
      //   router.push("/vcard");
      // }
      router.push("/timeline")
    }
  }, [encryptedToken, router]);

  const appleResponse = (response) => {
    // console.log(response);
  };


  return (
    <Fragment>
      <Head>
        <title>ApplyKart</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header styleClass="register" logoUrl="" />
      <section className="section-padding overflow-hidden">
        <Row className="">
          {loading && <Loader />}
          <div className=" col-md-7">
            <div className="block_box block-box-container">
              <div className="block_box_login_bg">
              <video  loop autoPlay muted control="0" playsinline="true">
                  <source src=".\assets\videos\job-seeker.mp4" type="video/mp4"/>
                  <source src=".\assets\videos\job-seeker.avi" type="video/avi"/>
                  {/* <source src="movie.ogg" type="video/ogg"> */}
                Your browser does not support the video tag.
                </video>
                <div className="text_box">
                  <h4 className="title">
                    Are you a <b>business owner</b> or a <b>recruiter</b>{" "}
                    looking for staff?
                  </h4>
                  <p className="mb-0">
                    Create a business account in under 5 minutes and start
                    posting jobs for FREE! We've got you covered.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="form_box px-3">
              <div className="section-header">
                <h3 className="title">Login</h3>
                <p className="text mb-0">
                  Please login via credentials or continue with social account.
                </p>
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={SignupSchema}
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
                          onBlur={formik.handleBlur}
                        />
                      </div>
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
                          onBlur={formik.handleBlur}
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
                          ></i>
                        </button>
                      </div>
                      <div className="form-group text-center mt-3">
                        <button
                          type="button"
                          className="d-flex forgot_pass ms-auto fs-6 my-3"
                          onClick={onClick}
                        >
                          <strong>Forgot Password ?</strong>
                        </button>
                        <button
                          type="submit"
                          onClick={formik.handleSubmit}
                          className="btn btn-warning w-50"
                        >
                          Login <i className="fal fa-long-arrow-right"></i>
                        </button>
                      </div>

                      <div className="spacer section" />
                        <p className="other_authtext">Or Login with</p>
                        <div className="auth_btns">
                          <GoogleLogins
                            type="login"
                            social={social}
                            setSocial={setSocial}
                          />
                          <FacebookLogins
                            social={social}
                            setSocial={setSocial}
                          />
                          {/* <button type="button" className="btn-circle">
                            <img
                              src="assets/images/icons/google.svg"
                              alt="icon"
                            />
                          </button> */}
                          {/* <button type="button" className="btn-circle">
                            <img src="assets/images/icons/facebook.svg" alt="icon" />
                          </button> */}
                          <AppleAuth
                            social={social}
                            setSocial={setSocial}
                            type="login"
                          />
                        </div>
                      <p className="text-black text-center">
                        Don't have any account?{" "}
                        <strong>
                          <Link href="/register"> Register Now</Link>
                        </strong>
                      </p>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </Row>
      </section>
    </Fragment>
  );
};

export default UserLogin;

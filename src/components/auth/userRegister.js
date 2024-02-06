import { Fragment, useEffect, useState } from "react";
import Header from "components/shared/header";
import Head from "next/head";
import Link from "next/link";
import { Container, Row } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/authActions";
import { Router } from "react-bootstrap-icons";
import { useRouter } from "next/router";
import FacebookLogins from "./facebookLogin";
import GoogleLogins from "./googleLogin";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import PhoneInput from "react-phone-input-2";
import Loader from "../shared/loader";

import { BASE_URL } from "constants/constants";
import { values } from "lodash";
import Swal from "sweetalert2";

import { Mixpanel } from "helper/MixPanel";
import AppleLogin from "react-apple-login";
import AppleAuth from "./AppleLogin";
import { RESET_NEXT_STEP } from "redux/actionTypes/auth.actionTypes";
import { clientSecret } from "api/constant";

let requestPayloadForSignup = {};
let requestPayloadForCheckContact = {};
let requestPayloadForVerifyContact = {};
const initialValues = {
  email: "",
  phone: "",
  password: "",
  countryCode: "",
  landline: ''
};

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Password must be 8 characters, atleast one uppercase, lowercase letter and number"
    ),
  phone: Yup.string()
    .min(10, "Invalid number")
    .max(15, "Invalid number"),
  landline: Yup.string().min(11).max(11)

}).test('oneRequired', 'Either Phone no or Landline is required', function (value) {
  const { phone, landline } = value;
  return !!phone || !!landline;
});

const UserRegister = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formValue, setFormValue] = useState(null);
  // localStorage.clear();
  // console.log("router ==>>", router)

  const [showPassword, setShowPassword] = useState(false);
  function togglePassword() {
    setShowPassword(!showPassword);
  }
  const { signupSucces, userData, email, phone_no, nextStep, entity, loading, checkContactSuccess, signUpData } =
    useSelector(({ AuthReducer }) => AuthReducer);
  const [social, setSocial] = useState(() => false);

  // console.log("signupSucces ==>>", signupSucces);
  // console.log("nextStep =>>", nextStep);

  useEffect(() => {
    dispatch({ type: RESET_NEXT_STEP });
    dispatch({ type: "LOGGED_IN_FALSE" });
  }, []);

  //const auth= useSelector(({ AuthReducer }) => AuthReducer)

  const handleFormSubmit = (values) => {

    if (!values?.phone) {
      Swal.fire({
        title: 'Enter phone number',
        icon: 'error'
      })
      return;
    }

    let payload = {
      "email": values?.email,
      "password": values?.password,
      "phone_no": values?.landline ? values?.landline : values?.phone?.split(values?.countryCode)[1],
      "countryCode": values?.countryCode,
      "isLandline": values?.landline ? 1 : 0,
      "client_secret": clientSecret
    }
    dispatch(actions.SignupSubmit(payload));
  };

  useEffect(() => {
    if (signupSucces) {
      // navigate.push('/otp-verification');
      const requestPayloadForCheckContact = {
        "countryCode": signUpData?.countryCode,
        "phone_no": signUpData?.phone,
        "isLandline": signUpData?.isLandline,
        "email": signUpData?.email,
        "countryCode": signUpData?.countryCode
      };
      dispatch(actions.SignupCheckContact(requestPayloadForCheckContact));
      localStorage.setItem("phone_no", phone_no);
      localStorage.setItem("countryCode", signUpData?.countryCode);
      Mixpanel.track(`User Registered Website`, {
        type: "Job Seeker",
      });
      // dispatch(actions.SignupCheckContact(requestPayloadForCheckContact));

      const routerComponents = router.components;
      const routerComponentsKeys = Object.keys(routerComponents);
      if (routerComponentsKeys.includes('/otp-verification')) {
        window.location.href = '/register'
      } else {
        router.push("/otp-verification");
      }
    }
  }, [nextStep, signupSucces]);


  // useEffect(() => {
  //   // console.log("checkContactSuccess ==>>", checkContactSuccess)
  //   if (checkContactSuccess) {
  //     // dispatch({ type: "AUTH_SIGNIN_RESET" });
  //     // router.push("/otp-verification");

  //     let payload = {
  //       "email": formValue?.email,
  //       "password": formValue?.password,
  //       "phone_no": formValue?.landline ? formValue?.landline : formValue?.phone?.split(formValue?.countryCode)[1],
  //       "countryCode": formValue?.countryCode,
  //       "isLandline": formValue?.landline ? 1 : 0,
  //       "client_secret": clientSecret,
  //       "user_type_id": 4
  //     }
  //     dispatch(actions.SignupSubmit(payload));

  //     localStorage.setItem("phone_no", phone_no);
  //     Mixpanel.track(`User Registered Website`, {
  //       type: userTypesId == 3 ? "Job Poster" : "Job Seeker",
  //     });
  //   }
  // }, [checkContactSuccess])

  return (
    <Fragment>
      <Head>
        <title>ApplyKart</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header styleClass="register" logoUrl="" />
      <section className="section-padding overflow-hidden">
        <div className="register-users">
          <Row className="">
            {loading && <Loader />}
            <div className="col-md-7">
              <div className="block_box user-register-p0">
                <div className="user-register-bg">
                {/* <iframe width="420" height="315" loop autoPlay muted controls
                    src=".\assets\videos\Register.mp4?controls=0&autoplay=1&mute=1&loop=1">
                    </iframe> */}
                 <video  loop autoPlay muted playsInline="true">
                  <source src=".\assets\videos\Register.mp4"  type="video/mp4"/>
                  <source src=".\assets\videos\Register.avi" type="video/avi"/>
                 
                Your browser does not support the video tag.
                </video> 
                  <div className="text_box">
                    <h4 className="title">
                      Hi Mate! Are you looking for your next full-time work
                      opportunity or a one-time gig?
                    </h4>
                    <p className="mb-0">
                      Join ApplyKart today and start finding work.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="form_box px-3">
                <div className="section-header">
                  <h3 className="title">Register Account</h3>
                  <p className="text mb-0">
                    Please fill your detail and find a job & grow your career
                  </p>
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={SignupSchema}
                  onSubmit={(values) => {
                    handleFormSubmit(values);
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

                          <ErrorMessage
                            component="div"
                            className="form-text error-message"
                            name="email"
                          />
                        </div>
                        <div className="form-group">
                          <PhoneInput
                            country={'au'}
                            onlyCountries={["au", "in"]}
                            // onlyCountries={["au"]}
                            countryCodeEditable={false}
                            placeholder="Enter contact number"
                            inputClass="form-control phnInput"
                            onChange={(phone, code) => {
                              // console.log(code);
                              formik.setFieldValue("phone", phone);
                              formik.setFieldValue(
                                "countryCode",
                                code.dialCode
                              );
                            }}
                            // value={values.phone}
                            inputProps={{
                              name: "phone",
                            }}
                          />
                          {/* <span style={{ color: "red" }}>
                            <sup>*</sup>Don't Enter 0 Before Your Number
                          </span> */}
                          <ErrorMessage component="div" className="form-text error-message" name="phone" />
                          {/* {formik.errors.phone && formik.touched.phone ? (
                            <div style={{ color: "tomato" }}>
                              {formik.errors.phone}
                            </div>
                          ) : null} */}
                        </div>
                        {/* <p className="other_authtext">OR</p> */}
                        <div className="form-group">
                          {/* <PhoneInput
                            country={"au"}
                            onlyCountries={["au", "in"]}
                            // countryCodeEditable={false}
                            placeholder="Enter Landline Number"
                            inputClass="form-control phnInput"
                            onChange={(phone, code) => {
                              console.log(code);
                              const cleanedInput = event.target.value.replace(/\D/g, '');
                              setPhoneNumber(cleanedInput);
                              formik.setFieldValue("landline", phone);
                              formik.setFieldValue(
                                "countryCode",
                                code.dialCode
                              );
                            }}
                            enableAreaCodes={true}
                            // value={values.phone}
                            inputProps={{
                              name: "phone",
                            }}
                          /> */}
                          {/* <div className=" react-tel-input ">
                            <input
                              id="reg-input"
                              type="number"
                              className="form-control phnInput"
                              placeholder="Enter Landline Number"
                              style={{ paddingLeft: "20px", fontSize: '15px', fontFamily: "'Roboto',sans-serif" }}
                              value={values?.landline}
                              onChange={(e) => {
                                const cleanedInput = event.target.value.replace(/\D/g, '');
                                // setPhoneNumber(cleanedInput);
                                formik.setFieldValue("landline", cleanedInput);
                              }}
                            />
                            <ErrorMessage component="div" className="form-text error-message" name="landline" />
                          </div> */}
                        </div>
                        <div className="form-group password_icon">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            name="password"
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                            onChange={(e) => {
                              formik.setFieldValue("password", e.target.value);
                            }}
                            placeholder="Password"
                            required
                          />

                          <ErrorMessage
                            component="div"
                            className="form-text error-message"
                            name="password"
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
                        <div className="form-group text-center mt-4">
                          <button
                            onClick={formik.handleSubmit}
                            className="btn btn-warning w-50"
                            type="submit"
                          >
                            Continue <i className="fal fa-long-arrow-right"></i>
                          </button>
                        </div>
                        <p className="other_authtext">Or register with</p>
                        <div className="auth_btns">
                          <GoogleLogins
                            type="register"
                            social={social}
                            setSocial={setSocial}
                          />
                          <FacebookLogins
                            type="register"
                            social={social}
                            setSocial={setSocial}
                          />
                          <AppleAuth
                            social={social}
                            setSocial={setSocial}
                            type="register"
                          />
                        </div>
                        <p className="text-black text-center">
                          Already on Applykart?{" "}
                          <strong>
                            <Link href="/login"> Login Now</Link>
                          </strong>
                        </p>
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

export default UserRegister;

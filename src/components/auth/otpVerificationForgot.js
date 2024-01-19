import { Fragment, useEffect, useState } from "react";
import Header from "components/shared/header";
import Head from "next/head";
import { Container, Row } from "react-bootstrap";
import OtpInput from "react-otp-input";
import CountDown from "./counter";
import * as actions from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { Router } from "react-bootstrap-icons";
import { useRouter } from "next/router";

let requestPayloadForVerifyContact = {};

const OtpVerification = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const { signupSucces, userData, email, phone_no, nextStep, entity, user_Id } =
    useSelector(({ AuthReducer }) => AuthReducer);
  const [otpResend, setOtpResend] = useState(false);
  const [counterDone, setCounterDone] = useState(true);

  const handleSubmit = (value) => {
    // otp;
    // console.log(otp);
    //e.preventDefault();

    requestPayloadForVerifyContact = {
      userid: entity?.user_Id,
      otp: otp,
    };
    // console.log("@@otpverification", requestPayloadForVerifyContact);

    dispatch(actions.ForgotPasswordVerify(requestPayloadForVerifyContact));

    // if(nextStep === "forgotPasswordSuccess"
    // ){
    //   router.push("/reset-password");
    // }
  };
  useEffect(() => {
    if (nextStep === "forgotPasswordSuccess") {
      router.push("/reset-password");
    }
  }, [nextStep]);
  let onTimesup = () => {
    setOtpResend(true);
    setCounterDone(false);
  };
  const handleResendOTP = () => {
    setOtpResend(false);
    setCounterDone(true);
    const requestPayload = {
      email: email,
    };
    dispatch(actions.SignupCheckContact(requestPayload));
  };

  return (
    <Fragment>
      <Head>
        <title>ApplyKart</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header styleClass="" logoUrl="" />
      <section className="section-padding">
        <div className="otp_verification_container">
          <Row className="">
            <div className=" col-md-7">
              <div className="block_box block_box_otp_register">
                <div className="block_box_otp_register_bg">
                  {/* <img
                    src="/assets/images/auth/main_login.png"
                    className="image-fit-contain mb-xl-30"
                    alt=""
                  /> */}
                  <div className="text_box">
                    <h4 className="title">A better way to success</h4>
                    <p className="mb-0">
                      {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className=" col-md-5">
              <div className="form_box px-3">
                <div className="section-header p-3">
                  <h3 className="title ">OTP Verification</h3>
                  <p className="text mb-0">
                    Please enter the One Time Password (OTP) received on your
                    mobile number and email.
                  </p>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e.target.value);
                  }}
                >
                  <div className="form-group">
                    <div className="otpBox">
                      <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        separator={null}
                        inputStyle="form-control circle"
                      />
                      <div className="form-group text-end text-black">
                        {counterDone && (
                          <CountDown onTimesup={onTimesup} duration={30} />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="form-group text-center mt-4">
                    <button className="btn btn-warning w-50">
                      Verify <i className="fal fa-long-arrow-right" />
                    </button>
                  </div>
                  <div className="spacer section" />
                  {otpResend && (
                    <p className="text-black text-center">
                      Didn't receive the OTP?{" "}
                      <button type="button" onClick={() => handleResendOTP()}>
                        <strong>Resend</strong>
                      </button>
                    </p>
                  )}
                </form>
              </div>
            </div>
          </Row>
        </div>
      </section>
    </Fragment>
  );
};

export default OtpVerification;

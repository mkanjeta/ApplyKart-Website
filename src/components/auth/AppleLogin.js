import AppleLogin from "react-apple-login";
import * as actions from "../../redux/actions/authActions";
import { Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Router, { useRouter } from "next/router";
import { useState, useEffect } from "react";

const AppleAuth = ({ social, setSocial, type }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { signupSucces, nextStep } = useSelector(
    ({ AuthReducer }) => AuthReducer
  );
  const {
    isLoggedIn,
    message,
    encryptedToken,
    checkContactSuccess,
    verifyContactSuccess,
    socialMediaData,
    loginType,
    isCompleted,
    loading,
  } = useSelector(({ AuthReducer }) => AuthReducer);

  // useEffect(() => {
  //   if (encryptedToken) {
  //     router.push("/timeline");
  //   }
  // }, [encryptedToken, isCompleted, router]);

  useEffect(() => {
    if (signupSucces && social) {
      router.push("/vcard");
      dispatch({ type: "AUTH_SIGNIN_RESET" });
    }
  }, [signupSucces]);

  const appleResponse = (response) => {
    // console.log(response);
    setSocial(true);
    try {
      const socialMediaData = {
        username: response?.user?.name?.firstName,
        email: response?.user?.email,
        profile_pic: "",
        facebook_id: null,
        twitter_id: null,
        phone_no: null,
        social_token: response?.authorization?.id_token,
        social_type: 3,
        device_type: 3,
        device_token: null,
        device_id: null
      };
      if (type == "register") {
        dispatch(actions.SocialSignupSubmit(socialMediaData));
      } else if (type == "login") {
        dispatch(actions.SocialLoggedIn(socialMediaData));
      }
    } catch (error) {
      console.log("Looks like there was a problem: ", error);
    }
  };

  return (
    <AppleLogin
      clientId="co.applykart.auth.client"
      redirectURI={
        type == "login"
          ? "https://applykart.co/login"
          : "https://applykart.co/register"
      }
      usePopup={true}
      callback={appleResponse} // Catch the response
      scope="email name"
      responseMode="query"
      render={(
        renderProps //Custom Apple Sign in Button
      ) => (
        <button
          type="button"
          className="btn-circle"
          onClick={renderProps.onClick}
        >
          <img src="/assets/images/icons/apple.svg" alt="icon" />
        </button>
      )}
    />
  );
};
export default AppleAuth;

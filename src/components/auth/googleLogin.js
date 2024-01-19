import React, { useEffect, useState } from "react";
//import GoogleLogin from "react-google-login";
import * as actions from "../../redux/actions/authActions";
import { Image } from "react-bootstrap";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import Router, { useRouter } from "next/router";
import { useSelector } from "react-redux";

const GoogleLogins = ({ type, social, setSocial }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { signupSucces, nextStep } = useSelector(
    ({ AuthReducer }) => AuthReducer
  );


  // console.log("signupSuccess ==>>", signupSucces)
  // console.log("social ==>>", social)

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
  //     router.push("/timeline")
  //   }
  // }, [encryptedToken, isCompleted, router]);

  useEffect(() => {
    if (signupSucces && social) {
      router.push("/vcard");
      dispatch({ type: "AUTH_SIGNIN_RESET" });
    }
  }, [signupSucces]);

  const credentialResponse = async (response) => {
    // console.log("@@GoogleResponse", response);
    setSocial(true);
    const { credential } = response;
    try {
      const response = await fetch(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`
      );
      const json = await response.json();
      // console.log("@@@response", json);
      const { name, email, picture } = json;
      const socialMediaData = {
        username: name,
        email: email,
        profile_pic: picture,
        facebook_id: null,
        twitter_id: null,
        phone_no: null,
        social_token: credential,
        social_type: 2,
        device_type: 3,
        device_token: null,
        device_id: null
      };
      if (json && type == "register") {
        dispatch(actions.SocialSignupSubmit(socialMediaData));
        // const payload = {
        //   ...socialMediaData,
        // };
        // dispatch(actions.SocialLoggedIn(payload));
        // router.push("/vcard");
      } else if (json && type == "login") {
        dispatch(actions.SocialLoggedIn(socialMediaData));
        // router.push("/vcard");
      }
    } catch (error) {
      console.log("Looks like there was a problem: ", error);
    }
  };

  return (
    <>
      <GoogleOAuthProvider 
        clientId="503253968811-igst1trmpq2cfq12hrtsvovo1q8gcmv2.apps.googleusercontent.com"
      >
        <GoogleLogin
          onSuccess={credentialResponse}
          defaultStyle={false}
          type="icon"
          shape="circle"
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
    </>
  );
};

export default GoogleLogins;

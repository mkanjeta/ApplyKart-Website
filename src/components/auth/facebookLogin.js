import React, { useEffect, useState } from "react";
import FacebookLogin from "react-facebook-login";
import * as actions from "../../redux/actions/authActions";
import { Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Router, { useRouter } from "next/router";
const FacebookLogins = ({ social, setSocial, type = "login" }) => {
  const { signupSucces, nextStep } = useSelector(
    ({ AuthReducer }) => AuthReducer
  );
  const dispatch = useDispatch();
  const router = useRouter();

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
    // console.log("signup successs", signupSucces);
    if (signupSucces && social) {
      router.push("/vcard");
      dispatch({ type: "AUTH_SIGNIN_RESET" });
    }
  }, [signupSucces]);
  const responseFacebook = (response) => {
    setSocial(true);
    if (response.status == "unknown") {
      return;
    }
    const { name, email, id, picture } = response;
    const firstName = name.split(" ")[0];
    const lastName = name.split(" ")[1];

    const socialMediaData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      profile_pic: picture?.data?.url,
      social_media_id: id,
      social_media_type: "1",
    };

    const payload = {
      ...socialMediaData,
      device_type: 3,
      type: 1,
    };

    if (type == "register") {
      dispatch(actions.SocialSignupSubmit(socialMediaData));
    } else {
      dispatch(actions.SocialLoggedIn(payload));
    }
  };
  return (
    <>
      <FacebookLogin
        appId={process.env.NEXT_PUBLIC_FACEBOOK_ID}
        // appId={365091062637155}
        // appId={1285749348804922}
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        textButton={""}
        cssClass="btn-circle"
        icon={
          <Image
            src={`/assets/images/icons/facebook.svg`}
            width="35"
            height="35"
            alt="Facebook"
          />
        }
      />
    </>
  );
};

export default FacebookLogins;

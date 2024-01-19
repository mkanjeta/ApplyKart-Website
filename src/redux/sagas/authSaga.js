import { getAuthorizedApi, getNonAuthorizedApi } from "../../api/apiInstance";
import { baseUrl } from "../../api/constant";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  AUTH_LOGGEDIN_INIT,
  AUTH_LOGGEDIN_SUCCESS,
  AUTH_LOGGEDIN_FAILED,
  AUTH_SIGNUP_INIT,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_FAILED,
  SOCIAL_AUTH_SIGNUP_SUCCESS,
  SOCIAL_AUTH_SIGNUP_FAILED,
  SOCIAL_AUTH_LOGGEDIN_SUCCESS,
  SOCIAL_AUTH_LOGGEDIN_FAILED,
  // AUTH_SIGNOUT_INIT,
  // AUTH_SIGNOUT_SUCCESS,
  // AUTH_SIGNOUT_FAILED,
  AUTH_CHECK_CONTACT_INIT,
  AUTH_CHECK_CONTACT_SUCCESS,
  AUTH_CHECK_CONTACT_FAILED,
  AUTH_VERIFY_CONTACT_INIT,
  AUTH_VERIFY_CONTACT_SUCCESS,
  AUTH_VERIFY_CONTACT_FAILED,
  AUTH_FORGOT_PASSWORD_INIT,
  AUTH_FORGOT_PASSWORD_SUCCESS,
  AUTH_FORGOT_PASSWORD_FAILED,
  AUTH_SOCIAL_SIGN_IN_INIT,
  AUTH_SOCIAL_SIGN_IN_SUCCESS,
  AUTH_SOCIAL_SIGN_IN_FAILED,
  AUTH_RESET_PASSWORD_SUCCESS,
  AUTH_RESET_PASSWORD_FAILED,
  AUTH_RESET_PASSWORD_INIT,
  SOCIAL_AUTH_SIGNUP_INIT,
  SOCIAL_AUTH_LOGGEDIN_INIT,
  AUTH_SIGNOUT_INIT,
  AUTH_SIGNOUT_SUCCESS,
  AUTH_SIGNOUT_FAILED,
  CHANGE_PASSWORD_INIT,
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_SUCCESS,
  GET_CURRENT_PLAN_FAILED,
  GET_CURRENT_PLAN_INIT,
  GET_CURRENT_PLAN_SUCCESS,
  VALIDATE_SESSION_INIT,
  VALIDATE_SESSION_STATUS,
  VALIDATE_SESSION_SUCCESS,
  VALIDATE_SESSION_FAILED,
  UPDATE_QR_TYPE_INIT,
  UPDATE_QR_TYPE_SUCCESS,
  UPDATE_QR_TYPE_FAILED,
  UPDATE_BASIC_DETAILS_INIT,
  UPDATE_BASIC_DETAILS_SUCCESS,
  UPDATE_BASIC_DETAILS_FAILED,
} from "../actionTypes/auth.actionTypes";
import Swal from "sweetalert2";
import { encryptData } from "../../utils/encryption";
import { successToast, errorToast } from "../../components/shared/Toasts";
import { toast } from "react-toastify";
// import { START_LOADER, STOP_LOADER } from "../actionTypes/loader.actionTypes";

var upload = async (dataurl, files) => {
  const response1 = await fetch(dataurl, {
    method: "PUT",
    body: files,
    headers: {
      "Content-Type": files?.type,
      "x-ms-blob-type": "BlockBlob",
      "x-ms-blob-content": files?.type,
    },
  });
  return response1;
};

function* handleSignupSubmit(action) {
  const client = yield getAuthorizedApi();
  try {
    const { data } = yield call(
      client.post,
      `${baseUrl}/User/Sign-up`,
      action.payload
    );
    if (data) {
        yield put({
          type: AUTH_SIGNUP_SUCCESS,
          payload: {
            entity: data?.data,
          },
        });
    } else {
      yield put({
        type: AUTH_SIGNUP_FAILED,
        payload: {
          error: true,
          message: data?.message || "Something went wrong!",
        },
      });
      errorToast(data?.message || "Something went wrong!");
    }
  } catch (error) {
    yield put({
      type: AUTH_SIGNUP_FAILED,
      payload: {
        error: true,
        message: error?.response?.data?.message || "Something went wrong!",
      },
    });

    Swal.fire({
      icon: "error",
      text: error.response.data.message || "Something went wrong!",
    });
    //errorToast(message || "Something went wrong!");
    // yield put({
    //   type: STOP_LOADER,
    // });
  }
}
function* handleSocialSignupSubmit(action) {
  // yield put({
  //   type: START_LOADER,
  // });
  const client = yield getAuthorizedApi();
  try {
    const { data } = yield call(
      client.post,
      `${baseUrl}/User/SocialMediaRegisteration`,
      action.payload
    );

    if (data) {
      //const encryptedToken = encryptData(data?.result?.token);
      const userId = data?.data?.user_Id;
      const encryptedToken = data?.data?.accessToken;
      const is_Completed = data?.data?.is_Completed;
      const userName = data?.data?.name;
      const profilePic = data?.data?.profile_Pic;
      const applyKart = {
        encryptedToken,
        userId,
        userName,
        profilePic,
      };
      localStorage.setItem("applyKart", JSON.stringify(applyKart));
      yield put({
        type: AUTH_LOGGEDIN_SUCCESS,
        payload: {
          encryptedToken: encryptedToken,
          entity: data,
          isCompleted: 0,
        },
      });
      // yield put({
      //   type: SOCIAL_AUTH_SIGNUP_SUCCESS,
      //   payload: {
      //     entity: data?.result,
      //   },
      // });
      // yield put({
      //   type: STOP_LOADER,
      // });
      // yield fetch("/api/saveToken", {
      //   method: "post",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ encryptedToken, userId }),
      // });
      Swal.fire({
        icon: "success",
        text: "Registration Successful",
      });
    } else {
      yield put({
        type: SOCIAL_AUTH_SIGNUP_FAILED,
        payload: {
          error: true,
          message: data?.message || "Something went wrong!",
        },
      });
      // yield put({
      //   type: STOP_LOADER,
      // });
      //errorToast(data?.message || "Something went wrong!");
      Swal.fire({
        icon: "error",
        text: data.message || "Something went wrong!",
      });
    }
  } catch (error) {
    const { message } = error.response.data;
    //errorToast(message || "Something went wrong!");
    // yield put({
    //   type: STOP_LOADER,
    // });
    Swal.fire({
      icon: "error",
      text: error.response.data.message || "Something went wrong!",
    });
  }
}

function* handleLoggedIn(action) {
  // yield put({
  //   type: START_LOADER,
  // });
  const client = yield getAuthorizedApi();
  try {
    const { data } = yield call(
      client.post,
      `${baseUrl}/User/Login`,
      action.payload
    );
    if (data) {
      //const encryptedToken = encryptData(data?.accessToken);
      const userId = data?.user_Id;
      const encryptedToken = data?.accessToken;
      const is_Completed = data?.is_Completed;
      const userName = data?.name;
      const profilePic = data?.profile_Pic;
      const firstName = data?.firstName;
      const lastName = data?.lastName;
      const countryCode = data?.countryCode;
      const applyKart = {
        encryptedToken,
        userId,
        userName,
        profilePic,
        firstName,
        lastName,
        countryCode
      };
      localStorage.setItem("applyKart", JSON.stringify(applyKart));
      
      yield put({
        type: AUTH_LOGGEDIN_SUCCESS,
        payload: {
          encryptedToken: encryptedToken,
          entity: data,
          isCompleted: 0,
        },
      });
      Swal.fire({
        icon: "success",
        text: "Logged in successfully",
      });
    } else {
      yield put({
        type: AUTH_LOGGEDIN_FAILED,
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
      Swal.fire({
        icon: "error",
        text: data.message || "Something went wrong!",
      });
    }
  } catch (error) {
    console.log(error.response);
    yield put({
      type: AUTH_LOGGEDIN_FAILED,
      payload: {
        error: true,
        message: error?.response?.data?.message || "Error Occured",
      },
    });
    Swal.fire({
      icon: "error",
      text: error.response.data.message || "Something went wrong!",
    });
  }
}
function* handleSocialLoggedIn(action) {
  const client = yield getAuthorizedApi();
  try {
    const { data } = yield call(
      client.post,
      `${baseUrl}/User/SocialMediaLogin`,
      action.payload
    );
    if (data) {
      console.log("data ==>>", data)
      const encryptedToken = data?.data?.accessToken;
      const userId = data?.data?.user_Id;
      const userName = data?.data?.name;
      const countryCode = data?.data?.countryCode;
      const applyKart = {
        encryptedToken,
        userId,
        userName,
        countryCode
      };

      console.log("apply kart ==>>", applyKart)
      localStorage.setItem("applyKart", JSON.stringify(applyKart));
      yield put({
        type: SOCIAL_AUTH_LOGGEDIN_SUCCESS,
        payload: {
          encryptedToken: encryptedToken,
          entity: data,
        },
      });
      Swal.fire({
        icon: "success",
        text: "Login Successful",
      });
    } else {
      yield put({
        type: SOCIAL_AUTH_LOGGEDIN_FAILED,
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
      Swal.fire({
        icon: "error",
        text: data.message || "Something went wrong!",
      });
    }
  } catch (error) {
    const { message } = error.response.data;
    Swal.fire({
      icon: "error",
      text: error.response.data.message || "Something went wrong!",
    });
  }
}

function* handleCheckContact(action) {
  const client = yield getAuthorizedApi();
  const { payload } = action;
  // yield put({
  //   type: START_LOADER,
  // });
  try {
    const { data } = yield call(
      client.post,
      `${baseUrl}/GenerateOtp`,
      payload.payload
    );
    if (data) {
      yield put({
        type: AUTH_CHECK_CONTACT_SUCCESS,
        payload: {
          message: data.message,
          loginType: payload.loginType,
          entity: data?.data,
        },
      });
      // Swal.fire({
      //   icon: "success",
      //   text: data?.message || "Otp sent successfully",
      // });
    }
  } catch (error) {
    console.log('Auth Saga error-->',error);
    const { message } = error.response.data;
    yield put({
      type: AUTH_CHECK_CONTACT_FAILED,
      payload: {
        error: true,
        message: "Something went wrong!",
      },
    });
    Swal.fire({
      icon: "error",
      text: "Invalid Phone Number",
    });
  }
}

function* handleSignout(action) {
  const applyKart = localStorage.getItem("applyKart");
  const { encryptedToken } = JSON.parse(applyKart);
  const client = yield getAuthorizedApi(encryptedToken);
  // yield put({
  //   type: START_LOADER,
  // });
  try {
    const { data } = yield call(
      client.post,
      `${baseUrl}/logout`,
      action.payload
    );

    if (data) {
      // const { data } = yield call(client.get, `api/clearToken`);
      localStorage.removeItem("applyKart");
      yield put({
        type: AUTH_SIGNOUT_SUCCESS,
        payload: {
          encryptedToken: "",
          entity: data,
        },
      });
      // successToast(data?.message || "Logout successfull");
      // yield put({
      //   type: STOP_LOADER,
      // });
    } else {
      yield put({
        type: AUTH_SIGNOUT_FAILED,
        payload: {
          message: data?.message || "Error Occured",
        },
      });
      // errorToast(data?.message || "Something went wrong!");
      // yield put({
      //   type: STOP_LOADER,
      // });
    }
  } catch (error) {
    const { message } = error.response.data;
    yield put({
      type: AUTH_SIGNOUT_FAILED,
      payload: {
        message: message || "Error Occured",
      },
    });
    errorToast(message || "Something went wrong!");
    yield put({
      type: STOP_LOADER,
    });
  }
}
function* handleVerifyContact(action) {
  const client = yield getAuthorizedApi();
  const { payload } = action;
  try {
    const { data } = yield call(
      client.post,
      `${baseUrl}/VerifyUserOtp`,
      payload.payload
    );
    if(data?.success){
      const userId = data?.user_Id;
      const encryptedToken = data?.accessToken;
      const is_Completed = data?.is_Completed;
      const userName = data?.name;
      const profilePic = data?.profile_Pic;
      const applyKart = {
        encryptedToken,
        userId,
        userName,
        profilePic,
      };
      localStorage.setItem("applyKart", JSON.stringify(applyKart));
      yield put({
        type: AUTH_LOGGEDIN_SUCCESS,
        payload: {
          encryptedToken: encryptedToken,
          entity: data,
          isCompleted: 0,
        },
      });
      Swal.fire({
        icon: "success",
        text: "OTP verified successfully",
      });
    }else{
      yield put({
        type: AUTH_VERIFY_CONTACT_FAILED,
        payload: {
          error: true,
          message: data?.message || "Something went wrong!",
        },
      });
      Swal.fire({
        icon: "error",
        text: data?.message || "Something went wrong!",
      });
    }
  } catch (error) {
    const { message } = error.response.data;
    yield put({
      type: AUTH_VERIFY_CONTACT_FAILED,
      payload: {
        error: true,
        message: message || "Something went wrong!",
      },
    });
    Swal.fire({
      icon: "error",
      text: data.message || "Something went wrong!",
    });
  }
}

function* handleForgotPassword(action) {
  const client = yield getAuthorizedApi();
  // yield put({
  //   type: START_LOADER,
  // });
  try {
    const { data } = yield call(
      client.post,
      `${baseUrl}/User/VerifyForgetPasswordOTP`,
      action.payload
    );
    yield put({
      type: AUTH_FORGOT_PASSWORD_SUCCESS,
      payload: {
        message: data.message,
      },
    });
    Swal.fire({
      icon: "success",
      text: data?.message || "OTP verified successfully",
    });
  } catch (error) {
    const { message } = error.response.data;
    yield put({
      type: AUTH_FORGOT_PASSWORD_FAILED,
      payload: {
        error: true,
        message: message || "Something went wrong!",
      },
    });
    Swal.fire({
      icon: "error",
      text: message || "Something went wrong!",
    });
  }
}

function* handleResetPassword(action) {
  const client = yield getAuthorizedApi();
  // yield put({
  //   type: START_LOADER,
  // });
  try {
    const { data } = yield call(
      client.put,
      `${baseUrl}/User/ResetPassword`,
      action.payload
    );
    yield put({
      type: AUTH_RESET_PASSWORD_SUCCESS,
      payload: {
        message: data.message,
      },
    });
    Swal.fire({
      icon: "success",
      text: data?.message || "successfully reset password",
    });
  } catch (error) {
    const { message } = error.response.data;
    yield put({
      type: AUTH_RESET_PASSWORD_FAILED,
      payload: {
        error: true,
        message: message || "Something went wrong!",
      },
    });
    // yield put({
    //   type: STOP_LOADER,
    // });
    Swal.fire({
      icon: "error",
      text: message || "Something went wrong!",
    });
  }
}
function* handleChangePassword(action) {
  const client = yield getAuthorizedApi();
  // yield put({
  //   type: START_LOADER,
  // });
  try {
    const { data } = yield call(
      client.put,
      `${baseUrl}/User/ChangePassword`,
      action.payload
    );
    yield put({
      type: CHANGE_PASSWORD_SUCCESS,
      payload: {
        message: data.message,
      },
    });
    Swal.fire({
      icon: "success",
      text: data?.message || "successfully reset password",
    });
  } catch (error) {
    const { message } = error.response.data;
    yield put({
      type: CHANGE_PASSWORD_FAILED,
      payload: {
        error: true,
        message: message || "Something went wrong!",
      },
    });
    // yield put({
    //   type: STOP_LOADER,
    // });
    Swal.fire({
      icon: "error",
      text: message || "Something went wrong!",
    });
  }
}
function* handleDeleteAccount(action) {
  const client = yield getAuthorizedApi(localStorage.getItem("token"));
  // yield put({
  //   type: START_LOADER,
  // });
  try {
    const { data } = yield call(client.delete, `${baseUrl}/DeleteAccount`);
    yield put({
      type: "DELETE_ACCOUNT_SUCCESS",
      payload: {
        message: "deleted",
      },
    });
    yield put({
      type: "AUTH_SIGNOUT_INIT",
      payload: {
        message: "deleted",
      },
    });
    Swal.fire({
      icon: "success",
      text: "Account deleted",
    });
  } catch (error) {
    const { message } = error.response.data;
    Swal.fire({
      icon: "error",
      text: message || "Something went wrong!",
    });
  }
}

function* handleContactUs(action) {
  const client = yield getNonAuthorizedApi();
  // yield put({
  //   type: START_LOADER,
  // });
  try {
    const { data } = yield call(
      client.post,
      `${baseUrl}/Contact`,
      action.payload
    );
    yield put({
      type: "CONTACT_US_SUCCESS",
    });
    Swal.fire({
      icon: "success",
      text: "Submitted Successfully",
    });
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      text: "Something went wrong!",
    });
  }
}

function* handleGetCurrentPlan(action) {
  const applyKart = localStorage.getItem("applyKart");
  const { encryptedToken } = JSON.parse(applyKart);
  const client = yield getAuthorizedApi(encryptedToken);
  // yield put({
  //   type: START_LOADER,
  // });
  try {
    const { data } = yield call(
      client.get,
      `${baseUrl}/CurrentPlan`
    );

    if (data) {
      yield put({
        type: GET_CURRENT_PLAN_SUCCESS,
        payload: data?.data
      });
    } else {
      yield put({
        type: GET_CURRENT_PLAN_FAILED,
        payload: {
          message: "Error Occured",
        },
      });
      errorToast(message || "Something went wrong!");
    }
  } catch (error) {
    const { message } = error.response.data;
    yield put({
      type: GET_CURRENT_PLAN_FAILED,
      payload: {
        message: message || "Error Occured",
      },
    });
    errorToast(message || "Something went wrong!");
  }
}

function* handleValidateSession(action) {
  const applyKart = localStorage.getItem("applyKart");
  const { encryptedToken } = JSON.parse(applyKart);
  const client = yield getAuthorizedApi(encryptedToken);
  try {
    const { data } = yield call(
      client.post,
      `${baseUrl}/stripe/verifysession `,
      action.payload
    );

    if (data) {
      yield put({
        type: VALIDATE_SESSION_SUCCESS,
        payload: data?.data
      });
      toast.success('Plan purchased');
    } else {
      yield put({
        type: VALIDATE_SESSION_FAILED,
        payload: {
          message: message || "Error Occured",
        },
      });
      errorToast(message || "Something went wrong!");
    }
  } catch (error) {
    const { message } = error.response.data;
    yield put({
      type: VALIDATE_SESSION_FAILED,
      payload: {
        message: message || "Error Occured",
      },
    });
    errorToast(message || "Something went wrong!");
  }
}

function* handleUpdateQR(action) {
  const applyKart = localStorage.getItem("applyKart");
  const { encryptedToken } = JSON.parse(applyKart);
  const client = yield getAuthorizedApi(encryptedToken);
  try {
    const { data } = yield call(
      client.post,
      `${baseUrl}/user-settings`,
      action.payload
    );

    if (data) {
      yield put({
        type: UPDATE_QR_TYPE_SUCCESS,
        payload: data?.data
      });
      toast.success('Qr Selected');
    } else {
      yield put({
        type: UPDATE_QR_TYPE_FAILED,
        payload: {
          message: message || "Error Occured",
        },
      });
      errorToast(message || "Something went wrong!");
    }
  } catch (error) {
    const { message } = error.response.data;
    yield put({
      type: UPDATE_QR_TYPE_FAILED,
      payload: {
        message: message || "Error Occured",
      },
    });
    errorToast(message || "Something went wrong!");
  }
}
function* updateBasicDetails(action) {
  const client = yield getAuthorizedApi();
  try {
    const { data } = yield call(
      client.put,
      `${baseUrl}/JobPosterBasic`,
      action.payload
    );
    if (data) {
        yield put({
          type: UPDATE_BASIC_DETAILS_SUCCESS,
        });
    } else {
      yield put({
        type: UPDATE_BASIC_DETAILS_FAILED,
        payload: {
          error: true,
          message: data?.message || "Something went wrong!",
        },
      });
      errorToast(data?.message || "Something went wrong!");
    }
  } catch (error) {
    yield put({
      type: UPDATE_BASIC_DETAILS_FAILED,
      payload: {
        error: true,
        message: error?.response?.data?.message || "Something went wrong!",
      },
    });

    Swal.fire({
      icon: "error",
      text: error.response.data.message || "Something went wrong!",
    });
    //errorToast(message || "Something went wrong!");
    // yield put({
    //   type: STOP_LOADER,
    // });
  }
}

function* authSaga() {
  yield takeLatest(AUTH_FORGOT_PASSWORD_INIT, handleForgotPassword);
  yield takeLatest(AUTH_RESET_PASSWORD_INIT, handleResetPassword);
  yield takeLatest(AUTH_VERIFY_CONTACT_INIT, handleVerifyContact);
  yield takeLatest(AUTH_CHECK_CONTACT_INIT, handleCheckContact);
  yield takeLatest(AUTH_LOGGEDIN_INIT, handleLoggedIn);
  yield takeLatest(AUTH_SIGNOUT_INIT, handleSignout);
  yield takeLatest(AUTH_SIGNUP_INIT, handleSignupSubmit);
  yield takeLatest(SOCIAL_AUTH_LOGGEDIN_INIT, handleSocialLoggedIn);
  yield takeLatest(SOCIAL_AUTH_SIGNUP_INIT, handleSocialSignupSubmit);
  yield takeLatest(CHANGE_PASSWORD_INIT, handleChangePassword);
  yield takeLatest("DELETE_ACCOUNT_INIT", handleDeleteAccount);
  yield takeLatest("CONTACT_US_INIT", handleContactUs);
  yield takeLatest(GET_CURRENT_PLAN_INIT, handleGetCurrentPlan);
  yield takeLatest(VALIDATE_SESSION_INIT, handleValidateSession);
  yield takeLatest(UPDATE_QR_TYPE_INIT, handleUpdateQR);
  yield takeLatest(UPDATE_BASIC_DETAILS_INIT, updateBasicDetails);
}

export default authSaga;

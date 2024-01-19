import { getAuthorizedApi, getNonAuthorizedApi } from "../../api/apiInstance";
import { baseUrl } from "../../api/constant";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  SAVE_VCARD_BASIC_DETAIL_SUCCESS,
  SAVE_VCARD_BASIC_DETAIL_FAILED,
  SAVE_VCARD_BASIC_DETAIL_INIT,
  SAVE_USER_SETTING_INIT,
  SAVE_USER_SETTING_SUCCESS,
  SAVE_USER_SETTING_FAILED,
} from "redux/actionTypes/vcard.actionTypes";
import Swal from "sweetalert2";

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
  // console.log(response1);
  return response1;
};

function* handleSaveVcardBasicDetails(action) {
  const applyKart = localStorage.getItem("applyKart");
  if (!applyKart) {
    return;
  }
  const { encryptedToken } = JSON.parse(applyKart);
  const client = yield getAuthorizedApi(encryptedToken);
  // yield put({
  //   type: START_LOADER,

  try {
    const file = action.payload.file;
    const image = action.payload.image;
    delete action.payload.file;
    delete action.payload.image;
    const { data } = yield call(
      client.post,
      `${baseUrl}/JobSeeker/VCard`,
      action.payload
    );

    if (data && image && typeof image == "object") {
      fetch(data.data?.profile_pic, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": "image/jpg",
          "x-ms-blob-type": "BlockBlob",
          "x-ms-blob-content": "image/jpg",
        },
      })
        .then((res) => console.log("response", res))
        .catch((e) => console.log("@@@error", e));
      yield put({
        type: SAVE_VCARD_BASIC_DETAIL_SUCCESS,
        payload: {
          entity: data,
        },
      });
      // successToast(data?.message || "Login successful");
      // yield put({
      //   type: STOP_LOADER,
      // });
    } else if (data) {
      yield put({
        type: SAVE_VCARD_BASIC_DETAIL_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: SAVE_VCARD_BASIC_DETAIL_FAILED,
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
      // yield put({
      //   type: STOP_LOADER,
      // });
      // errorToast(data?.message || "Something went wrong!");
    }
  } catch (error) {
    console.log(error);
    //const { message } = error.response.data;
    // errorToast(message || "Something went wrong!");
    // yield put({
    //   type: STOP_LOADER,
    // });
  }
}
function* handleSaveUserSetting(action) {
  const applyKart = localStorage.getItem("applyKart");
  if (!applyKart) {
    return;
  }
  const { encryptedToken } = JSON.parse(applyKart);
  const client = yield getAuthorizedApi(encryptedToken);
  // yield put({
  //   type: START_LOADER,
  try {
    const { data } = yield call(
      client.post,
      `${baseUrl}/user-settings`,
      action.payload
    );
    if (data) {
      yield put({
        type: SAVE_USER_SETTING_SUCCESS,
        payload: {
          entity: data,
        },
      });
      // successToast(data?.message || "Login successful");
      // yield put({
      //   type: STOP_LOADER,
      // });
    } else {
      yield put({
        type: SAVE_USER_SETTING_FAILED,
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
      // yield put({
      //   type: STOP_LOADER,
      // });
      errorToast(data?.message || "Something went wrong!");
    }
  } catch (error) {
    console.log(error);
    //const { message } = error.response.data;
    // errorToast(message || "Something went wrong!");
    // yield put({
    //   type: STOP_LOADER,
    // });
  }
}

function* getVcardInfo(action) {
  const client = yield getNonAuthorizedApi();
  // yield put({
  //   type: START_LOADER,
  try {
    const { data } = yield call(
      client.get,
      `${baseUrl}/JobSeekerWeb?user_id=${action.payload}`,
      action.payload
    );
    if (data) {
      yield put({
        type: "GET_VCARD_INFO_SUCCESS",
        payload: data,
      });
      // successToast(data?.message || "Login successful");
      // yield put({
      //   type: STOP_LOADER,
      // });
    } else {
      yield put({
        type: "GET_VCARD_INFO_FAILURE",
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
      // yield put({
      //   type: STOP_LOADER,
      // });
      // errorToast(data?.message || "Something went wrong!");
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: "GET_VCARD_INFO_FAILURE",
      payload: {
        error: true,
        message: data?.message || "Error Occured",
      },
    });
  }
}

function* uploadResume(action) {
  const applyKart = localStorage.getItem("applyKart");
  if (!applyKart) {
    return;
  }
  const { encryptedToken } = JSON.parse(applyKart);
  const client = yield getAuthorizedApi(encryptedToken);
  // yield put({
  //   type: START_LOADER,
  try {
    const { data } = yield call(
      client.post,
      `${baseUrl}/curriculumVitae`,
      action.payload
    );
    if (data) {
      yield put({
        type: "UPLOAD_CV_SUCCESS",
      });
      console.log(data);
      upload(data.data.curriculumVitae, action.payload.file);
      Swal.fire({
        icon: "success",
        title: "Resume uploaded",
      });
      // successToast(data?.message || "Login successful");
      // yield put({
      //   type: STOP_LOADER,
      // });
    } else {
      Swal.fire({
        icon: "error",
        title: data?.message || "Something went wrong",
      });
      yield put({
        type: "UPLOAD_CV_ERROR",
      });
      // yield put({
      //   type: STOP_LOADER,
      // });
    }
  } catch (error) {
    console.log(error);
    //const { message } = error.response.data;
    // errorToast(message || "Something went wrong!");
    // yield put({
    //   type: STOP_LOADER,
    // });
  }
}

function* vcardSaga() {
  yield takeLatest(SAVE_VCARD_BASIC_DETAIL_INIT, handleSaveVcardBasicDetails);
  yield takeLatest(SAVE_USER_SETTING_INIT, handleSaveUserSetting);
  yield takeLatest("GET_VCARD_INFO_INIT", getVcardInfo);
  yield takeLatest("UPLOAD_CV_INIT", uploadResume);
}

export default vcardSaga;

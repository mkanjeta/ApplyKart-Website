//job category
import { getAuthorizedApi } from "../../api/apiInstance";
import { baseUrl } from "../../api/constant";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_JOB_CATEGORY_LIST_FAILED,
  GET_JOB_CATEGORY_LIST_INIT,
  GET_JOB_CATEGORY_LIST_SUCCESS,
  GET_JOB_SUB_CATEGORY_LIST_FAILED,
  GET_JOB_SUB_CATEGORY_LIST_INIT,
  GET_JOB_SUB_CATEGORY_LIST_SUCCESS,
  SAVE_JOB_DETAIL_FAILED,
  SAVE_JOB_DETAIL_INIT,
  SAVE_JOB_DETAIL_SUCCESS,
  SAVE_JOB_PREFERENCES_FAILED,
  SAVE_JOB_PREFERENCES_INIT,
  SAVE_JOB_PREFERENCES_SUCCESS,
} from "redux/actionTypes/categoryTypes";

function* handleGetCategoryList(action) {
  const applyKart = localStorage.getItem("applyKart");
  if (!applyKart) {
    return;
  }
  const { encryptedToken } = JSON.parse(applyKart);
  const { userId } = JSON.parse(applyKart);
  const client = yield getAuthorizedApi(encryptedToken);
  // yield put({
  //   type: START_LOADER,
  // });
  try {
    const { data } = yield call(
      client.get,
      `${baseUrl}/categories?search=${
        action.payload ? action.payload.search : ""
      }`
    );
    if (data) {
      yield put({
        type: GET_JOB_CATEGORY_LIST_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: GET_JOB_CATEGORY_LIST_FAILED,
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
    }
  } catch (error) {
    const { message } = error.response.data;
    console.warn(error);
    errorToast(message || "Error Occured");
    // yield put({
    //   type: STOP_LOADER,
    // });
  }
}
function* handleGetSubCategoryList(action) {
  const applyKart = localStorage.getItem("applyKart");
  if (!applyKart) {
    return;
  }
  const { encryptedToken } = JSON.parse(applyKart);
  const { userId } = JSON.parse(applyKart);
  const client = yield getAuthorizedApi(encryptedToken);
  // yield put({
  //   type: START_LOADER,
  // });
  try {
    const { data } = yield call(
      client.get,
      `${baseUrl}/SubCategory?ParentCategoryid=${action.payload}`
    );
    if (data) {
      yield put({
        type: GET_JOB_SUB_CATEGORY_LIST_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: GET_JOB_SUB_CATEGORY_LIST_FAILED,
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
    }
  } catch (error) {
    const { message } = error.response.data;
    console.warn(error);
    errorToast(message || "Error Occured");
    // yield put({
    //   type: STOP_LOADER,
    // });
  }
}
function* handleSaveJobDetails(action) {
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
      client.put,
      `${baseUrl}/JobPreference`,
      action.payload
    );
    if (data) {
      yield put({
        type: SAVE_JOB_DETAIL_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: SAVE_JOB_DETAIL_FAILED,
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
function* handleSaveJobPreferences(action) {
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
      client.put,
      `${baseUrl}/Preference`,
      action.payload
    );

    if (data) {
      yield put({
        type: SAVE_JOB_PREFERENCES_SUCCESS,
        payload: {
          entity: data,
        },
      });
      yield put({
        type: SAVE_JOB_PREFERENCES_SUCCESS,
        payload: {
          entity: data,
          skills: action.payload.types,
        },
      });
    } else {
      yield put({
        type: SAVE_JOB_PREFERENCES_FAILED,
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

function* vcardSaga() {
  yield takeLatest(GET_JOB_CATEGORY_LIST_INIT, handleGetCategoryList);
  yield takeLatest(GET_JOB_SUB_CATEGORY_LIST_INIT, handleGetSubCategoryList);
  yield takeLatest(SAVE_JOB_DETAIL_INIT, handleSaveJobDetails);
  yield takeLatest(SAVE_JOB_PREFERENCES_INIT, handleSaveJobPreferences);
}

export default vcardSaga;

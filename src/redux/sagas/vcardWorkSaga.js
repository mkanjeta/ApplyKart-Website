import { getAuthorizedApi } from "../../api/apiInstance";
import { baseUrl } from "../../api/constant";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  CHANNEL_FOR_USER_FAILED,
  CHANNEL_FOR_USER_INIT,
  CHANNEL_FOR_USER_SUCCESS,
  DELETE_PORTFOLIO_DATA_FAILED,
  DELETE_PORTFOLIO_DATA_INIT,
  DELETE_PORTFOLIO_DATA_SUCCESS,
  DELETE_VIDEO_DATA_FAILED,
  DELETE_VIDEO_DATA_INIT,
  DELETE_VIDEO_DATA_SUCCESS,
  GET_CALENDER_DATA_FAILED,
  GET_CALENDER_DATA_INIT,
  GET_CALENDER_DATA_SUCCESS,
  GET_CHAT_LIST_FAILED,
  GET_CHAT_LIST_INIT,
  GET_CHAT_LIST_SUCCESS,
  GET_JOB_SEEKER_DETAIL_FAILED,
  GET_JOB_SEEKER_DETAIL_INIT,
  GET_JOB_SEEKER_DETAIL_SUCCESS,
  GET_JOB_TYPE_LISTS_FAILED,
  GET_JOB_TYPE_LISTS_INIT,
  GET_JOB_TYPE_LISTS_SUCCESS,
  GET_JOB_TYPE_LIST_INIT,
  GET_LANGUAGE_LIST_FAILED,
  GET_LANGUAGE_LIST_INIT,
  GET_LANGUAGE_LIST_SUCCESS,
  GET_MESSAGE_LIST_FAILED,
  GET_MESSAGE_LIST_INIT,
  GET_MESSAGE_LIST_SUCCESS,
  GET_PORTFOLIO_DATA_FAILED,
  GET_PORTFOLIO_DATA_INIT,
  GET_PORTFOLIO_DATA_SUCCESS,
  GET_REQUIREMENT_LIST_FAILED,
  GET_REQUIREMENT_LIST_INIT,
  GET_REQUIREMENT_LIST_SUCCESS,
  GET_UNIVERSITY_LIST_FAILED,
  GET_UNIVERSITY_LIST_INIT,
  GET_UNIVERSITY_LIST_SUCCESS,
  GET_UPLOAD_DATA_FAILED,
  GET_UPLOAD_DATA_INIT,
  GET_UPLOAD_DATA_SUCCESS,
  SAVE_PORTFOLIA_DATA_FAILED,
  SAVE_PORTFOLIA_DATA_INIT,
  SAVE_PORTFOLIA_DATA_SUCCESS,
  SAVE_VCARD_EDUCATION_DETAIL_FAILED,
  SAVE_VCARD_EDUCATION_DETAIL_INIT,
  SAVE_VCARD_EDUCATION_DETAIL_SUCCESS,
  SAVE_VCARD_SET_AVAILABILITY_FAILED,
  SAVE_VCARD_SET_AVAILABILITY_INIT,
  SAVE_VCARD_SET_AVAILABILITY_SUCCESS,
  SAVE_VCARD_SKILL_DETAIL_FAILED,
  SAVE_VCARD_SKILL_DETAIL_INIT,
  SAVE_VCARD_SKILL_DETAIL_SUCCESS,
  SAVE_VCARD_WORK_DETAIL_FAILED,
  SAVE_VCARD_WORK_DETAIL_INIT,
  SAVE_VCARD_WORK_DETAIL_SUCCESS,
  UPDATE_PORTFOLIA_DATA_FAILED,
  UPDATE_PORTFOLIA_DATA_INIT,
  UPDATE_PORTFOLIA_DATA_SUCCESS,
} from "redux/actionTypes/work.actionTypes";
import Swal from "sweetalert2";

function* handleSaveVcardWorkDetails(action) {
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
      `${baseUrl}/JobSeeker/ProfessionalDetails`,
      action.payload
    );
    if (data) {
      yield put({
        type: SAVE_VCARD_WORK_DETAIL_SUCCESS,
        payload: {
          entity: data,
        },
      });
      // yield fetch("/api/saveToken", {
      //   method: "post",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ encryptedToken, userId }),
      // });
      // successToast(data?.message || "Login successful");
      // yield put({
      //   type: STOP_LOADER,
      // });
    } else {
      yield put({
        type: SAVE_VCARD_WORK_DETAIL_FAILED,
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

function* handleGetSeekerDetails(action) {
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
      `${baseUrl}/jobseeker?user_id=${userId}`
    );
    if (data) {
      localStorage.setItem("jobSeekerDetails", data);
      yield put({
        type: GET_JOB_SEEKER_DETAIL_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: GET_JOB_SEEKER_DETAIL_FAILED,
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
    }
    // if (data) {
    //   yield put(callCompleted({ jobSeekerDetail: data }));
    //   // yield put({
    //   //   type: STOP_LOADER,
    //   // });
    // } else {
    //   const error = data?.message || "Error Occured";
    //   yield put(catchError({ error }));
    //   errorToast(error);
    //   // yield put({
    //   //   type: STOP_LOADER,
    //   // });
    // }
  } catch (error) {
    const { message } = error.response.data;
    console.warn(error);
    //errorToast(message || "Error Occured");
    // yield put({
    //   type: STOP_LOADER,
    // });
  }
}

function* handleSaveVcardEducationDetails(action) {
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
      `${baseUrl}/JobSeeker/EducatonalDetails`,
      action.payload
    );
    if (data) {
      yield put({
        type: SAVE_VCARD_EDUCATION_DETAIL_SUCCESS,
        payload: {
          entity: data,
        },
      });
      // yield fetch("/api/saveToken", {
      //   method: "post",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ encryptedToken, userId }),
      // });
      // successToast(data?.message || "Login successful");
      // yield put({
      //   type: STOP_LOADER,
      // });
    } else {
      yield put({
        type: SAVE_VCARD_EDUCATION_DETAIL_FAILED,
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
function* handleSaveSkillDetails(action) {
  const applyKart = localStorage.getItem("applyKart");
  if (!applyKart) {
    return;
  }
  const { encryptedToken } = JSON.parse(applyKart);
  const client = yield getAuthorizedApi(encryptedToken);

  let skillObj = action.payload.skills;

  delete action.payload.skills;
  // yield put({
  //   type: START_LOADER,
  try {
    const { data } = yield call(
      client.post,
      `${baseUrl}/JobSeeker/UserSkills`,
      action.payload
    );
    if (data) {
      yield put({
        type: SAVE_VCARD_SKILL_DETAIL_SUCCESS,
        payload: {
          entity: data,
          skills: skillObj,
        },
      });
    } else {
      yield put({
        type: SAVE_VCARD_SKILL_DETAIL_FAILED,
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
  }
}

function* handleGetUniversityList(action) {
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
    let search = action.payload ? action.payload : "";
    const { data } = yield call(
      client.get,
      `${baseUrl}/University?pageno=1&pagesize=20${
        search ? `&search=${search}` : ""
      }`
    );
    if (data) {
      yield put({
        type: GET_UNIVERSITY_LIST_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: GET_UNIVERSITY_LIST_FAILED,
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
function* handleLanguageList(action) {
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
    const { data } = yield call(client.get, `${baseUrl}/Languages`);
    if (data) {
      yield put({
        type: GET_LANGUAGE_LIST_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: GET_LANGUAGE_LIST_FAILED,
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

function* handleGetJobTypeList(action) {
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
    const { data } = yield call(client.get, `${baseUrl}/JobTypes`);
    if (data) {
      yield put({
        type: GET_JOB_TYPE_LISTS_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: GET_JOB_TYPE_LISTS_FAILED,
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

function* handleSetAvailablityDetails(action) {
  const req = {
    User_id: action.payload?.User_id,
    Available_Slot_From: action.payload?.Available_Slot_From,
    Availablity: JSON.stringify(action.payload?.Availablity),
  };
  const applyKart = localStorage.getItem("applyKart");
  if (!applyKart) {
    return;
  }
  const { encryptedToken } = JSON.parse(applyKart);
  const client = yield getAuthorizedApi(encryptedToken);
  // yield put({
  //   type: START_LOADER,
  try {
    const { data } = yield call(client.put, `${baseUrl}/Availability`, req);
    if (data) {
      yield put({
        type: SAVE_VCARD_SET_AVAILABILITY_SUCCESS,
        payload: {
          entity: data,
          avaData: action.payload?.Availablity,
        },
      });
    } else {
      yield put({
        type: SAVE_VCARD_SET_AVAILABILITY_FAILED,
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
  }
}
function* handleSavePortfolio(action) {
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
    delete action.payload.file;
    const { data } = yield call(
      client.post,
      `${baseUrl}/JobSeeker/portfolio`,
      action.payload
    );

    if (data) {
      fetch(data?.data?.image, {
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
        type: SAVE_PORTFOLIA_DATA_SUCCESS,
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
        type: SAVE_PORTFOLIA_DATA_FAILED,
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
function* handleGetPortfolio(action) {
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
      `${baseUrl}/JobSeeker/portfolio?userId=${userId}`
    );
    if (data) {
      yield put({
        type: GET_PORTFOLIO_DATA_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: GET_PORTFOLIO_DATA_FAILED,
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
    }
  } catch (error) {
    const { message } = error.response.data;
    console.warn(error);
    // errorToast(message || "Error Occured");
    // yield put({
    //   type: STOP_LOADER,
    // });
  }
}
function* handleRequirementList(action) {
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
    const { data } = yield call(client.get, `${baseUrl}/SpecialRequirements`);
    if (data) {
      yield put({
        type: GET_REQUIREMENT_LIST_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: GET_REQUIREMENT_LIST_FAILED,
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
function* handleDeletePortfolio(action) {
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
      client.delete,
      `${baseUrl}/JobSeeker/portfolio?PortfolioId=${action.payload.PortfolioId}&IsDeleted=1`
    );
    if (data) {
      yield put({
        type: DELETE_PORTFOLIO_DATA_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: DELETE_PORTFOLIO_DATA_FAILED,
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
function* handleUpdatePortfolio(action) {
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
    delete action.payload.file;
    const { data } = yield call(
      client.put,
      `${baseUrl}/JobSeeker/portfolio`,
      action.payload
    );

    if (data) {
      fetch(data?.image, {
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
        type: UPDATE_PORTFOLIA_DATA_SUCCESS,
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
        type: UPDATE_PORTFOLIA_DATA_FAILED,
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
function* handleUploadedData(action) {
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
    const { data } = yield call(client.get, `${baseUrl}/JobPoster`);
    if (data) {
      yield put({
        type: GET_UPLOAD_DATA_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: GET_UPLOAD_DATA_FAILED,
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
    }
  } catch (error) {
    const { message } = error.response.data;
    console.warn(error);
    // errorToast(message || "Error Occured");
    // yield put({
    //   type: STOP_LOADER,
    // });
  }
}
function* handleGetCalenderData(action) {
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
      `${baseUrl}/User/CalenderEvent?month=${action?.payload?.monthName}`
    );
    if (data) {
      yield put({
        type: GET_CALENDER_DATA_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: GET_CALENDER_DATA_FAILED,
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
    }
  } catch (error) {
    //console.log("@@error", error)
    const dataResponse = error.response?.data?.message;
    console.log("@@error", error.response?.data?.message);
    console.warn(error);
    yield put({
      type: GET_CALENDER_DATA_FAILED,
      payload: {
        entity: dataResponse,
      },
    });
  }
}
function* handleDeleteData(action) {
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
      client.put,
      `${baseUrl}/IntroVideo`,
      action.payload
    );
    if (data) {
      yield put({
        type: DELETE_VIDEO_DATA_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: DELETE_VIDEO_DATA_FAILED,
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
    }
  } catch (error) {
    //const { message } = error.response.data;
    console.log("@@error", error);
    console.warn(error);
    //errorToast(message || "Error Occured");
    // yield put({
    //   type: STOP_LOADER,
    // });
  }
}
function* handleCreateChannel(action) {
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
      client.post,
      `${baseUrl}/channel`,
      action.payload
    );
    if (data) {
      yield put({
        type: CHANNEL_FOR_USER_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: CHANNEL_FOR_USER_FAILED,
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
    }
  } catch (error) {
    console.log("@@error", error);
    console.warn(error);
  }
}
function* handleGetChat(action) {
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
    const { data } = yield call(client.get, `${baseUrl}/JobSeeker/Chats`);
    if (data) {
      yield put({
        type: GET_CHAT_LIST_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: GET_CHAT_LIST_FAILED,
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
    }
  } catch (error) {
    console.log("@@error", error);
    console.warn(error);
  }
}
function* handleGetMessage(action) {
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
      `${baseUrl}/MessageList?UserId=${userId}&Search=${action?.payload || ""}`
    );
    if (data) {
      yield put({
        type: GET_MESSAGE_LIST_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: GET_MESSAGE_LIST_FAILED,
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
    }
  } catch (error) {
    console.log("@@error", error);
    console.warn(error);
  }
}
function* handleCloseChat(action) {
  const applyKart = localStorage.getItem("applyKart");
  if (!applyKart) {
    return;
  }
  const { encryptedToken } = JSON.parse(applyKart);
  const client = yield getAuthorizedApi(encryptedToken);

  let body = {
    channelId: action.payload.channelId,
    actionType: "active",
    value: 0,
  };

  try {
    const { data } = yield call(client.put, `${baseUrl}/ChatSetting`, body);
    if (data) {
      yield put({
        type: "CLOSE_CHAT_SUCCESS",
        payload: {
          channelId: action.payload.channelId,
        },
      });
    } else {
      Swal.fire({
        icon: "error",
        title: data?.message,
      });
      yield put({
        type: "CLOSE_CHAT_SUCCESS",
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
    }
  } catch (error) {
    console.warn(error);
  }
}
function* handleDeleteChat(action) {
  const applyKart = localStorage.getItem("applyKart");
  if (!applyKart) {
    return;
  }
  const { encryptedToken } = JSON.parse(applyKart);
  const client = yield getAuthorizedApi(encryptedToken);

  try {
    const { data } = yield call(
      client.put,
      `${baseUrl}/DeletChat?InitiatorId=${action.payload.initiatorId}&ResponderId=${action.payload.responderId}`
    );
    if (data) {
      yield put({
        type: "DELETE_CHAT_SUCCESS",
        payload: {
          channelId: action.payload.channelId,
        },
      });
    } else {
      Swal.fire({
        icon: "error",
        title: data?.message,
      });
      yield put({
        type: "CLOSE_CHAT_ERROR",
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
    }
  } catch (error) {
    console.warn(error);
  }
}

function* handleSendEmail(action) {
  const applyKart = localStorage.getItem("applyKart");
  if (!applyKart) {
    return;
  }
  const { encryptedToken } = JSON.parse(applyKart);
  const client = yield getAuthorizedApi(encryptedToken);

  try {
    const { data } = yield call(client.put, `${baseUrl}/`);
    if (data) {
    } else {
    }
  } catch (error) {
    console.warn(error);
  }
}

function* vcardSaga() {
  yield takeLatest(SAVE_VCARD_WORK_DETAIL_INIT, handleSaveVcardWorkDetails);
  yield takeLatest(GET_JOB_SEEKER_DETAIL_INIT, handleGetSeekerDetails);
  yield takeLatest(GET_UNIVERSITY_LIST_INIT, handleGetUniversityList);
  yield takeLatest(
    SAVE_VCARD_EDUCATION_DETAIL_INIT,
    handleSaveVcardEducationDetails
  );
  yield takeLatest(
    SAVE_VCARD_SET_AVAILABILITY_INIT,
    handleSetAvailablityDetails
  );
  yield takeLatest(GET_JOB_TYPE_LISTS_INIT, handleGetJobTypeList);
  yield takeLatest(SAVE_VCARD_SKILL_DETAIL_INIT, handleSaveSkillDetails);
  yield takeLatest(SAVE_PORTFOLIA_DATA_INIT, handleSavePortfolio);
  yield takeLatest(GET_PORTFOLIO_DATA_INIT, handleGetPortfolio);
  yield takeLatest(DELETE_PORTFOLIO_DATA_INIT, handleDeletePortfolio);
  yield takeLatest(UPDATE_PORTFOLIA_DATA_INIT, handleUpdatePortfolio);
  yield takeLatest(GET_LANGUAGE_LIST_INIT, handleLanguageList);
  yield takeLatest(GET_REQUIREMENT_LIST_INIT, handleRequirementList);
  yield takeLatest(GET_UPLOAD_DATA_INIT, handleUploadedData);
  yield takeLatest(GET_CALENDER_DATA_INIT, handleGetCalenderData);
  yield takeLatest(DELETE_VIDEO_DATA_INIT, handleDeleteData);
  yield takeLatest(CHANNEL_FOR_USER_INIT, handleCreateChannel);
  yield takeLatest(GET_CHAT_LIST_INIT, handleGetChat);
  yield takeLatest(GET_MESSAGE_LIST_INIT, handleGetMessage);
  yield takeLatest("CLOSE_CHAT_INIT", handleCloseChat);
  yield takeLatest("DELETE_CHAT_INITIATE", handleDeleteChat);
  yield takeLatest("SEND_EMAIL_INIT", handleSendEmail);
}

export default vcardSaga;

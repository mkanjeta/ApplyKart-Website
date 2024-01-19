//job category
import { getAuthorizedApi, getNonAuthorizedApi } from "../../api/apiInstance";
import { baseUrl } from "../../api/constant";
import { call, put, takeLatest } from "redux-saga/effects";
import { Mixpanel } from "helper/MixPanel";
import {
  BASIC_DETAIL_JOBPOSTER_FAILED,
  BASIC_DETAIL_JOBPOSTER_INIT,
  BASIC_DETAIL_JOBPOSTER_SUCCESS,
  CANDIDATE_SHORTLIST_FAILED,
  CANDIDATE_SHORTLIST_INIT,
  CANDIDATE_SHORTLIST_SUCCESS,
  EDIT_JOBS_FAILED,
  EDIT_JOBS_INIT,
  EDIT_JOBS_SUCCESS,
  GET_APPLIED_JOB_FAILED,
  GET_APPLIED_JOB_INIT,
  GET_APPLIED_JOB_SUCCESS,
  GET_CANDIDATE_DETAIL_FAILED,
  GET_CANDIDATE_DETAIL_INIT,
  GET_CANDIDATE_DETAIL_SUCCESS,
  GET_CANDIDATE_LIST_INIT,
  GET_CANDIDATE_LIST_SUCCESS,
  GET_EDUCATION_LIST_FAILED,
  GET_EDUCATION_LIST_INIT,
  GET_EDUCATION_LIST_SUCCESS,
  GET_FAVORITE_FAILED,
  GET_FAVORITE_INIT,
  GET_FAVORITE_SUCCESS,
  GET_JOB_BROWSE_LIST_FAILED,
  GET_JOB_BROWSE_LIST_INIT,
  GET_JOB_BROWSE_LIST_SUCCESS,
  GET_JOB_DETAIL_FAILED,
  GET_JOB_DETAIL_INIT,
  GET_JOB_DETAIL_SUCCESS,
  GET_JOB_TYPE_LIST_FAILED,
  GET_JOB_TYPE_LIST_INIT,
  GET_JOB_TYPE_LIST_SUCCESS,
  GET_LIST_VISA_TYPE_FAILED,
  GET_LIST_VISA_TYPE_INIT,
  GET_LIST_VISA_TYPE_SUCCESS,
  GET_SKILLS_LIST_FAILED,
  GET_SKILLS_LIST_INIT,
  GET_SKILLS_LIST_SUCCESS,
  GET_SUBSCRIPTION_PLAN_FAILED,
  GET_SUBSCRIPTION_PLAN_INIT,
  GET_SUBSCRIPTION_PLAN_SUCCESS,
  POSTED_NEW_JOB_FAILED,
  POSTED_NEW_JOB_INIT,
  POSTED_NEW_JOB_SUCCESS,
  POST_APPLY_JOB_FAILED,
  POST_APPLY_JOB_INIT,
  POST_APPLY_JOB_SUCCESS,
  POST_FAVORITE_FAILED,
  POST_FAVORITE_INIT,
  POST_FAVORITE_SUCCESS,
  POST_POSTED_JOB_STATUS_FAILED,
  POST_POSTED_JOB_STATUS_INIT,
  POST_POSTED_JOB_STATUS_SUCCESS,
  REMOVE_JOBS_FAILED,
  REMOVE_JOBS_INIT,
  REMOVE_JOBS_SUCCESS,
  SCHEDULE_INTERVIEW_FAILED,
  SCHEDULE_INTERVIEW_INIT,
  SCHEDULE_INTERVIEW_SUCCESS,
  UPLOADED_DOCUMENT_FAILED,
  UPLOADED_DOCUMENT_INIT,
  UPLOADED_DOCUMENT_SUCCESS,
} from "redux/actionTypes/jobBrowseTypes";
import Swal from "sweetalert2";
// import { toast } from "react-toastify";

function* handleGetJobBrowseList(action) {
  const applyKart = localStorage.getItem("applyKart");
  const isCreatedJobHit = action?.payload?.isCreatedJob;
  const userId = JSON.parse(applyKart)?.userId;
  let loggedIn = 0;
  let pageNo = action.payload.pageNo ? action.payload.pageNo : 1;

  let client = null;

  if (!applyKart) {
    client = yield getNonAuthorizedApi();
  } else {
    const { encryptedToken } = JSON.parse(applyKart);
    client = yield getAuthorizedApi(encryptedToken);
    loggedIn = 1;
  }

  try {
    // console.log("action.payload ==>>", action.payload)
    let url = ``;
    // console.log("isCreatedJobHit ==>>", isCreatedJobHit)
    if (isCreatedJobHit) {
      url = `/jobseeker/jobs?pageNo=${pageNo}&pageSize=50&Search=${"postedjobs"}`;
    } else {
      url = `/jobseeker/jobs?pageNo=${pageNo}&pageSize=50`;
    }

    console.log(action?.payload)
    if (action.payload.search && action.payload.search != "undefined") {
      url = url + `&Search=${action.payload.search}`;
    }
    // if (action.payload && action.payload.WorkLocation) {
    //   url =
    //     url +
    //     `&Nearby=${action.payload.WorkLocation.split(",")[0]
    //     }&WorkLocation=${action.payload.WorkLocation.split(",")[0]}`;
    // }

    if (action.payload && action.payload.minSalary) {
      url = url + `&minSalary=${action.payload.minSalary}`;
    }

    if (action.payload && action.payload.maxSalary) {
      url = url + `&maxSalary=${action.payload.maxSalary}`;
    }
    if (action.payload && action.payload.Experience) {
      url = url + `&Experience=${action.payload.Experience}`;
    }
    if (action.payload && action.payload.jobTitle) {
      url = url + `&jobTitle=${action.payload.jobTitle}`;
    }
    if (action.payload && (action.payload.Experience == "" || action.payload.Experience == null)) {
      url = url + `&Experience=`
    }
    if (
      action.payload &&
      action.payload.jobType &&
      action.payload.jobType.length != 0
    ) {
      url = url + `&jobType=${action.payload.jobType.join(",")}`;
    }
    if (
      action.payload &&
      action.payload.category &&
      action.payload.category.length != 0
    ) {
      url = url + `&CategoryId=${action.payload.category.join(",")}`;
    }
    if (!loggedIn) {
      url = url + "&UserId=-1";
      if (action.payload && action.payload.WorkLocation) {
        url =
          url +
          `&Nearby=${action.payload.WorkLocation.split(",")[0]
          }&WorkLocation=${action.payload.WorkLocation.split(",")[0]}`;
      }
    }

    const { data } = yield call(
      client.get, `${baseUrl}${url}`);

    if (data) {
      yield put({
        type: GET_JOB_BROWSE_LIST_SUCCESS,
        payload: {
          entity: data,
          search: action.payload.search,
          pageNo: pageNo,
        },
      });
    } else {
      yield put({
        type: GET_JOB_BROWSE_LIST_FAILED,
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
    }
  } catch (error) {
    // const { message } = error.response.data;
    console.log("!!error", error);
    // errorToast(message || "Error Occured");
    // yield put({
    //   type: STOP_LOADER,
    // });
  }
}
function* handleGetVisaType(action) {
  //const { Experience, WorkLocation, minSalary, maxSalary, PerMonth } = action.payload
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
    const { data } = yield call(client.get, `${baseUrl}/VisaType`);
    if (data) {
      yield put({
        type: GET_LIST_VISA_TYPE_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: GET_LIST_VISA_TYPE_FAILED,
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
    }
  } catch (error) {
    // const { message } = error.response.data;
    console.log("!!error", error);
    // errorToast(message || "Error Occured");
    // yield put({
    //   type: STOP_LOADER,
    // });
  }
}
function* handleGetskillsList(action) {
  //const { Experience, WorkLocation, minSalary, maxSalary, PerMonth } = action.payload
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
    const { data } = yield call(client.get, `${baseUrl}/JobSeeker/skills`);
    if (data) {
      yield put({
        type: GET_SKILLS_LIST_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: GET_SKILLS_LIST_FAILED,
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
    }
  } catch (error) {
    console.log("!!error", error);
  }
}
function* handleGetEducationList(action) {
  //const { Experience, WorkLocation, minSalary, maxSalary, PerMonth } = action.payload
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
    const { data } = yield call(client.get, `${baseUrl}/Education`);
    if (data) {
      yield put({
        type: GET_EDUCATION_LIST_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: GET_EDUCATION_LIST_FAILED,
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
    }
  } catch (error) {
    console.log("!!error", error);
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
  try {
    const { data } = yield call(client.get, `${baseUrl}/JobTypes`);
    if (data) {
      yield put({
        type: GET_JOB_TYPE_LIST_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: GET_JOB_TYPE_LIST_FAILED,
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
    }
  } catch (error) {
    const { message } = error.response.data;
    console.warn(error);
  }
}
function* handleJobDetail(action) {
  const applyKart = localStorage.getItem("applyKart");
  let client = null;
  let url = ``;
  if (applyKart) {
    const { encryptedToken } = JSON.parse(applyKart);
    const { userId } = JSON.parse(applyKart);
    client = yield getAuthorizedApi(encryptedToken);
    url = `/JobSeeker/JobDetails`;
  } else {
    client = yield getNonAuthorizedApi();
    url = `/JobSeeker/JobDetailsWeb`;
  }
  try {
    const { data } = yield call(
      client.get,
      `${baseUrl}${url}?JobId=${action.payload}`
    );
    if (data) {
      yield put({
        type: GET_JOB_DETAIL_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: GET_JOB_DETAIL_FAILED,
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
    }
  } catch (error) {
    const { message } = error.response.data;
    console.warn(error);
    yield put({
      type: GET_JOB_DETAIL_FAILED,
      payload: {
        error: true,
        message: error?.response?.data?.message || "Error Occured",
      },
    });
  }
}
function* handleApplyJobs(action) {
  const applyKart = localStorage.getItem("applyKart");
  if (!applyKart) {
    yield put({
      type: POST_APPLY_JOB_FAILED,
      payload: {
        error: true,
        message: data?.message || "Error Occured",
      },
    });
    return;
  }
  const { encryptedToken } = JSON.parse(applyKart);
  const client = yield getAuthorizedApi(encryptedToken);
  try {
    const { data } = yield call(
      client.post,
      `${baseUrl}/JobSeeker/Apply-Job`,
      action.payload
    );
    if (data) {
      yield put({
        type: POST_APPLY_JOB_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: POST_APPLY_JOB_FAILED,
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
    }
  } catch (error) {
    yield put({
      type: POST_APPLY_JOB_FAILED,
      payload: {
        error: true,
        message: error.response.data.message || "Error Occured",
      },
    });
    const { message } = error.response.data;
    errorToast(message || "Something went wrong!");
  }
}
function* handlePostedStatusJobs(action) {
  const applyKart = localStorage.getItem("applyKart");
  if (!applyKart) {
    return;
  }
  const { encryptedToken } = JSON.parse(applyKart);
  const client = yield getAuthorizedApi(encryptedToken);
  try {
    const { data } = yield call(
      client.put,
      `${baseUrl}/ActiveOrDeactiveJob?JobId=${action.payload.job_Id}&IsActive=${action.payload.IsActive}`
    );
    if (data) {
      yield put({
        type: POST_POSTED_JOB_STATUS_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: POST_POSTED_JOB_STATUS_FAILED,
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
    }
  } catch (error) {
    const { message } = error.response.data;
    errorToast(message || "Something went wrong!");
  }
}
function* handleRemoveJobs(action) {
  const applyKart = localStorage.getItem("applyKart");
  if (!applyKart) {
    return;
  }
  const { encryptedToken } = JSON.parse(applyKart);
  const client = yield getAuthorizedApi(encryptedToken);
  try {
    const { data } = yield call(
      client.delete,
      `${baseUrl}/Job?JobId=${action?.payload?.job_Id}`
    );
    if (data) {
      yield put({
        type: REMOVE_JOBS_SUCCESS,
        payload: {
          entity: data,
          jobId: action?.payload?.job_Id,
        },
      });
    } else {
      yield put({
        type: REMOVE_JOBS_FAILED,
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
    }
  } catch (error) {
    const { message } = error.response.data;
    errorToast(message || "Something went wrong!");
  }
}
function* handleAppliedJobList(action) {
  const applyKart = localStorage.getItem("applyKart");
  if (!applyKart) {
    return;
  }
  const { encryptedToken } = JSON.parse(applyKart);
  const { userId } = JSON.parse(applyKart);
  const client = yield getAuthorizedApi(encryptedToken);
  try {
    const { data } = yield call(
      client.get,
      `${baseUrl}/JobSeeker/AppliedJobs?pageNo=1&pageSize=20`
    );
    if (data) {
      yield put({
        type: GET_APPLIED_JOB_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: GET_APPLIED_JOB_FAILED,
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
    }
  } catch (error) {
    const { message } = error.response.data;
    console.warn(error);
  }
}
function* handleCandidateList(action) {
  const applyKart = localStorage.getItem("applyKart");
  if (!applyKart) {
    return;
  }
  const { encryptedToken } = JSON.parse(applyKart);
  const { userId } = JSON.parse(applyKart);
  const client = yield getAuthorizedApi(encryptedToken);
  try {
    const { data } = yield call(
      client.get,
      `${baseUrl}/jobPoster/candidates?JobId=${action.payload.JobId}&pageSize=20&pageNo=1`
    );
    if (data) {
      yield put({
        type: GET_CANDIDATE_LIST_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: GET_CANDIDATE_LIST_FAILED,
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
function* handleCandidateDetail(action) {
  // const applyKart = localStorage.getItem("applyKart");
  // if (!applyKart) {
  //   return;
  // }
  // const { encryptedToken } = JSON.parse(applyKart);
  // const { userId } = JSON.parse(applyKart);
  // const client = yield getAuthorizedApi(encryptedToken);

  const applyKart = localStorage.getItem("applyKart");
  let loggedIn = 0;

  let client = null;

  if (!applyKart) {
    client = yield getNonAuthorizedApi();
  } else {
    const { encryptedToken } = JSON.parse(applyKart);
    client = yield getAuthorizedApi(encryptedToken);
    loggedIn = 1;
  }

  try {
    const { data } = yield call(
      client.get,
      `${baseUrl}/JobPoster/Candidate?userId=${action.payload.id}${action.payload?.jobId ? `&jobId=${action.payload.jobId}` : "&isWeb=1"
      }`
    );
    if (data) {
      yield put({
        type: GET_CANDIDATE_DETAIL_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: GET_CANDIDATE_DETAIL_FAILED,
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
function* handleCandidateShortlistStatus(action) {
  const applyKart = localStorage.getItem("applyKart");
  const jobId = localStorage.getItem("jobId");
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
      `${baseUrl}/JobPoster/ShortlistCandidate?JobId=${jobId}&userProfileId=${action.payload?.id}&status=${action.payload?.status}`
    );
    if (data && action.payload?.status == 2) {
      yield put({
        type: CANDIDATE_SHORTLIST_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else if (data && action.payload?.status == 3) {
      yield put({
        type: CANDIDATE_SHORTLIST_FAILED,
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: CANDIDATE_SHORTLIST_FAILED,
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
function* handleScheduleInterview(action) {
  //const { Experience, WorkLocation, minSalary, maxSalary, PerMonth } = action.payload
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
      `${baseUrl}/JobPoster/ScheduleInterview`,
      action.payload
    );
    if (data) {
      Swal.fire({
        icon: "success",
        title: "Interview scheduled successfully!",
      });
      yield put({
        type: SCHEDULE_INTERVIEW_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else {
      Swal.fire({
        icon: "error",
        title: data?.message || "Error Occured",
      });
      yield put({
        type: SCHEDULE_INTERVIEW_FAILED,
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
    }
  } catch (error) {
    // const { message } = error.response.data;
    console.log("!!error", error);
    Swal.fire({
      icon: "error",
      title: "Error Occured",
    });
    // errorToast(message || "Error Occured");
    // yield put({
    //   type: STOP_LOADER,
    // });
  }
}
function* handlePostedNewJob(action) {
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
      `${baseUrl}/JobPoster/PostJob`,
      action.payload
    );
    if (data) {
      Mixpanel.track("Job posted website");
      yield put({
        type: POSTED_NEW_JOB_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: POSTED_NEW_JOB_FAILED,
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
    }
  } catch (error) {
    // const { message } = error.response.data;
    console.log("!!error", error);
    yield put({
      type: POSTED_NEW_JOB_FAILED,
      payload: {
        error: true,
        message: error.response.data.message,
        status: error.response.data.httpStatus
      },
    });
    // errorToast(message || "Error Occured");
    // yield put({
    //   type: STOP_LOADER,
    // });
  }
}
function* handlePostedEditJob(action) {
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
      `${baseUrl}/JobPoster/JobDetails`,
      action.payload
    );
    if (data) {
      yield put({
        type: "POSTED_EDIT_JOB_SUCCESS",
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: "POSTED_EDIT_JOB_FAILED",
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
    }
  } catch (error) {
    // const { message } = error.response.data;
    console.log("!!error", error);
    yield put({
      type: POSTED_NEW_JOB_FAILED,
      payload: {
        error: true,
        message: "Error Occured",
      },
    });
    // errorToast(message || "Error Occured");
    // yield put({
    //   type: STOP_LOADER,
    // });
  }
}
function* handleJobDetails(action) {
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
      `${baseUrl}/JobSeeker/JobDetails?JobId=${action?.payload}`
    );
    if (data) {
      yield put({
        type: EDIT_JOBS_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: EDIT_JOBS_FAILED,
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
    }
  } catch (error) {
    // const { message } = error.response.data;
    console.log("!!error", error);
    // errorToast(message || "Error Occured");
    // yield put({
    //   type: STOP_LOADER,
    // });
  }
}

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

function* handleUploadedDocument(action) {
  const applyKart = localStorage.getItem("applyKart");
  if (!applyKart) {
    return;
  }
  const fileName = action.payload.profileFile;
  delete action.payload.profileFile;
  const file = { ...action.payload.images };
  delete action.payload.images;
  const { encryptedToken } = JSON.parse(applyKart);
  const { userId } = JSON.parse(applyKart);
  const client = yield getAuthorizedApi(encryptedToken);
  // yield put({
  //   type: START_LOADER,
  // });
  try {
    const { data } = yield call(
      client.put,
      `${baseUrl}/JobPoster`,
      action.payload
    );

    if (data) {
      if (typeof file?.abn_doc == "object") {
        upload(data.data.abn_Doc, file?.abn_doc);
      }
      if (typeof file?.acn_doc == "object") {
        upload(data?.data?.acn_Doc, file?.acn_doc);
      }
      if (typeof file?.aus_Driving_License_Front == "object") {
        upload(
          data?.data?.aus_Driving_License_Front,
          file?.aus_Driving_License_Front
        );
      }
      if (typeof file?.aus_Driving_License_Back == "object") {
        upload(
          data?.data?.aus_Driving_License_Back,
          file?.aus_Driving_License_Back
        );
      }
      if (typeof file?.medicard_Front == "object") {
        upload(data?.data?.medicard_Front, file?.medicard_Front);
      }
      if (typeof file?.gstDocImage == "object") {
        upload(data?.data?.gstDocImage, file?.gstDocImage);
      }

      yield put({
        type: UPLOADED_DOCUMENT_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: UPLOADED_DOCUMENT_FAILED,
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
    }
  } catch (error) {
    console.log("!!error", error);
  }
}
function* handleBasicJobposter(action) {
  const applyKart = localStorage.getItem("applyKart");
  if (!applyKart) {
    return;
  }
  const fileName = action?.payload?.proFile;
  delete action?.payload?.proFile;
  const { encryptedToken } = JSON.parse(applyKart);
  const { userId } = JSON.parse(applyKart);
  const client = yield getAuthorizedApi(encryptedToken);
  // yield put({
  //   type: START_LOADER,
  // });
  try {
    const { data } = yield call(
      client.put,
      `${baseUrl}/JobPosterBasic`,
      action.payload
    );
    if (data) {
      if (typeof fileName == "object") {
        upload(data?.data?.profile_pic, fileName);
      }

      yield put({
        type: BASIC_DETAIL_JOBPOSTER_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: BASIC_DETAIL_JOBPOSTER_FAILED,
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
    }
  } catch (error) {
    // const { message } = error.response.data;
    console.log("!!error", error);
    // errorToast(message || "Error Occured");
    // yield put({
    //   type: STOP_LOADER,
    // });
  }
}

function* handlePostFav(action) {
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
      `${baseUrl}/JobSeeker/Save-Job?JobId=${action?.jobObj.id}&isFav=${action?.jobObj.isFav}`
    );
    if (data) {
      yield put({
        type: "SET_JOB_FAV_UNFAV",
        payload: {
          entity: data,
          jobId: action?.jobObj.id,
        },
      });
      yield put({
        type: POST_FAVORITE_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: POST_FAVORITE_FAILED,
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
    }
  } catch (error) {
    // const { message } = error.response.data;
    console.log("!!error", error);
    yield put({
      type: POST_FAVORITE_FAILED,
      payload: {
        error: true,
        message: error?.response?.data?.message || "Error Occured",
      },
    });
    // errorToast(message || "Error Occured");
    // yield put({
    //   type: STOP_LOADER,
    // });
  }
}
function* handleGetFav(action) {
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
      `${baseUrl}/JobSeeker/SavedJobs?pageNo=1&pageSize=20`
    );
    if (data) {
      yield put({
        type: GET_FAVORITE_SUCCESS,
        payload: {
          entity: data,
        },
      });
    } else {
      yield put({
        type: GET_FAVORITE_FAILED,
        payload: {
          error: true,
          message: data?.message || "Error Occured",
        },
      });
    }
  } catch (error) {
    // const { message } = error.response.data;
    console.log("!!error", error);
    // errorToast(message || "Error Occured");
    // yield put({
    //   type: STOP_LOADER,
    // });
  }
}

function* handleReferAFriend(action) {
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
      `${baseUrl}/JobSeeker/Referral`,
      action.payload
    );
    if (data) {
      Mixpanel.track("Job referral website");
      yield put({
        type: "REFER_A_FRIEND_SUCCESS",
        payload: data.message,
      });
    } else {
      yield put({
        type: "REFER_A_FRIEND_ERROR",
      });
    }
  } catch (error) {
    // const { message } = error.response.data;
    console.log("!!error", error);
    yield put({
      type: "REFER_A_FRIEND_ERROR",
    });
    // errorToast(message || "Error Occured");
    // yield put({
    //   type: STOP_LOADER,
    // });
  }
}

function* handleRemoveSavedJobs(action) {
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
      `${baseUrl}/JobSeeker/Save-Job?JobId=${action.payload}&isFav=0`,
      action.payload
    );
    if (data) {
      Swal.fire({
        icon: "success",
        title: data.message,
      });
      yield put({
        type: "REMOVE_SAVED_JOB_SUCCESS",
        payload: action.payload,
      });
    } else {
      yield put({
        type: "REMOVE_SAVED_JOB_FAILURE",
      });
    }
  } catch (error) {
    // const { message } = error.response.data;
    console.log("!!error", error);
    yield put({
      type: "REMOVE_SAVED_JOB_FAILURE",
    });
    // errorToast(message || "Error Occured");
    // yield put({
    //   type: STOP_LOADER,
    // });
  }
}

function* handleGetNotifications(action) {
  const applyKart = localStorage.getItem("applyKart");
  if (!applyKart) {
    return;
  }
  const { encryptedToken } = JSON.parse(applyKart);
  const client = yield getAuthorizedApi(encryptedToken);
  // yield put({
  //   type: START_LOADER,
  // });
  try {
    const { data } = yield call(
      client.get,
      `${baseUrl}/jobseeker/notifications?pageNo=1&pageSize=10`
    );
    if (data) {
      yield put({
        type: "NOTIFICATION_SUCCESS",
        payload: [...data?.data?.notifications],
      });
    } else {
    }
  } catch (error) {
    console.log(error);
  }
}

function* handleIsNewFalse(action) {
  const applyKart = localStorage.getItem("applyKart");
  if (!applyKart) {
    return;
  }
  const { encryptedToken } = JSON.parse(applyKart);
  const client = yield getAuthorizedApi(encryptedToken);
  // yield put({
  //   type: START_LOADER,
  // });
  try {
    const { data } = yield call(
      client.put,
      `${baseUrl}/CandidateSettings?jobId=${action.payload.jobId}`
    );
  } catch (error) {
    console.log(error);
  }
}

function* getSubscriptionPlans(action) {
  const applyKart = localStorage.getItem("applyKart");
  if (!applyKart) {
    return;
  }
  const { encryptedToken } = JSON.parse(applyKart);
  const client = yield getAuthorizedApi(encryptedToken);
  // yield put({
  //   type: START_LOADER,
  // });
  try {
    const { data } = yield call(
      client.get,
      `${baseUrl}/plans`
    );
    if (data) {
      yield put({
        type: GET_SUBSCRIPTION_PLAN_SUCCESS,
        payload: data?.data?.plans
      });
    } else {
      yield put({
        type: GET_SUBSCRIPTION_PLAN_FAILED
      });
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: 'error',
      title: error?.message || 'Something went wrong'
    })
    yield put({
      type: GET_SUBSCRIPTION_PLAN_FAILED
    });
  }
}

function* jobBrowseSaga() {
  yield takeLatest(GET_JOB_BROWSE_LIST_INIT, handleGetJobBrowseList);
  yield takeLatest(GET_JOB_TYPE_LIST_INIT, handleGetJobTypeList);
  yield takeLatest(GET_JOB_DETAIL_INIT, handleJobDetail);
  yield takeLatest(POST_APPLY_JOB_INIT, handleApplyJobs);
  yield takeLatest(POST_POSTED_JOB_STATUS_INIT, handlePostedStatusJobs);
  yield takeLatest(REMOVE_JOBS_INIT, handleRemoveJobs);
  yield takeLatest(GET_APPLIED_JOB_INIT, handleAppliedJobList);
  yield takeLatest(GET_LIST_VISA_TYPE_INIT, handleGetVisaType);
  yield takeLatest(GET_EDUCATION_LIST_INIT, handleGetEducationList);
  yield takeLatest(GET_SKILLS_LIST_INIT, handleGetskillsList);
  yield takeLatest(GET_CANDIDATE_LIST_INIT, handleCandidateList);
  yield takeLatest(GET_CANDIDATE_DETAIL_INIT, handleCandidateDetail);
  yield takeLatest(CANDIDATE_SHORTLIST_INIT, handleCandidateShortlistStatus);
  yield takeLatest(SCHEDULE_INTERVIEW_INIT, handleScheduleInterview);
  yield takeLatest(POSTED_NEW_JOB_INIT, handlePostedNewJob);
  yield takeLatest("POSTED_EDIT_JOB_INIT", handlePostedEditJob);
  yield takeLatest(UPLOADED_DOCUMENT_INIT, handleUploadedDocument);
  yield takeLatest(POST_FAVORITE_INIT, handlePostFav);
  yield takeLatest(GET_FAVORITE_INIT, handleGetFav);
  yield takeLatest(BASIC_DETAIL_JOBPOSTER_INIT, handleBasicJobposter);
  yield takeLatest(EDIT_JOBS_INIT, handleJobDetails);
  yield takeLatest("REFER_A_FRIEND_INIT", handleReferAFriend);
  yield takeLatest("REMOVE_SAVED_JOB", handleRemoveSavedJobs);
  yield takeLatest("GET_NOTIFICATION_INIT", handleGetNotifications);
  yield takeLatest("SET_IS_NEW_FALSE", handleIsNewFalse);
  yield takeLatest(GET_SUBSCRIPTION_PLAN_INIT, getSubscriptionPlans);
}

export default jobBrowseSaga;

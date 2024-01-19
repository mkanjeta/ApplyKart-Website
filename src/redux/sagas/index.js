import { fork } from "@redux-saga/core/effects";
import authSaga from "./authSaga";
import vcardSaga from "./vcardSaga";
import vcardWorkSaga from "./vcardWorkSaga";
import categorySaga from "./categorySaga";
import jobBrowseSaga from "./jobBrowseSaga";
import timelineSaga from "./timeLineSaga";
import networkSaga from "./networkSaga";
import myProfileSaga from "./myProfileSaga";


export default function* rootSaga() {
  yield fork(authSaga);
  yield fork(vcardSaga);
  yield fork(vcardWorkSaga);
  yield fork(categorySaga);
  yield fork(jobBrowseSaga);
  yield fork(timelineSaga);
  yield fork(networkSaga);
  yield fork(myProfileSaga);
}

import { Fragment, Component, useEffect, useState } from "react";
import Header from "components/shared/header";
import Head from "next/head";
import { Container, Row } from "react-bootstrap";
import Router, { useRouter } from "next/router";
import { WeekSchedule, TimeSchedule, BASE_URL } from "constants/constants";
import Checkboxlist from "../selectAll/Checkboxlist";
import moment from "moment";
import { saveSetAvailabilityDetails } from "redux/actions/workActions";
import { useDispatch, useSelector } from "react-redux";
// import {
//   resetRedirect,
//   saveJobPreferences,
// } from "redux/actions/categoryActions";
// import { getJobSeekerDetail, getJobTypeLists } from "redux/actions/workActions";
import Loader from "components/shared/loader";
// import TimePicker from "react-time-picker/dist/entry.nostyle";
// import { bindActionCreators } from "redux";
// import { Flag } from "react-bootstrap-icons";

const SetAvailability = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [state, setState] = useState({
    isAllSelected: false,
    checkList: WeekSchedule,
    endTime: null,
    startTime: null,
    dataObj: {
      User_id: null,
      Available_Slot_From: moment().format("YYYY-MM-DD HH:mm:ss"),
      Availablity: {},
    },
    error: "",
  });

  const { jobSeekerDetails, jobTypeLists, loading, redirect } = useSelector(
    ({ vcardWorkReducer }) => vcardWorkReducer
  );

  // console.log(jobSeekerDetails);
  // console.log("state ==>>", state)

  const onClick = (event) => {
    // let flag = true;
    event.preventDefault();
   
    const userId = jobSeekerDetails?.user_Id;
    const availability = [];
    state?.checkList?.forEach((item, index) => {
      if(item?.checked) {
        availability.push(item?.value);
      }
    })

    const finalDataToSend = {
      User_id: userId,
      Available_Slot_From: state?.dataObj?.Available_Slot_From,
      Availablity: availability?.join(',')
    };

    // console.log("final data to send ==>>", finalDataToSend)
    dispatch(saveSetAvailabilityDetails(finalDataToSend));
  };

  useEffect(() => {
    if (redirect) {
      dispatch({ type: "SET_REDIRECT_FALSE" });
      router.push("/vcard/intro-video");
    }
  }, [redirect]);

  const onCheckBoxChange = (checkName, isChecked) => {
    let isAllChecked = checkName === "all" && isChecked;
    let isAllUnChecked = checkName === "all" && !isChecked;
    const checked = isChecked;
    const checkList = state.checkList.map((city, index) => {
      if (isAllChecked || city.value === checkName) {
        return Object.assign({}, city, {
          checked,
        });
      } else if (isAllUnChecked) {
        return Object.assign({}, city, {
          checked: false,
        });
      }
      // console.log(city);
      return city;
    });
    // console.log("checkList ==>>", checkList)
    let isAllSelected =
      checkList.findIndex((item) => item.checked === false) === -1 ||
      isAllChecked;
    // console.log("is all selected ==>>", isAllSelected)
    setState({
      ...state,
      checkList,
      isAllSelected,
    });
  };

  const onHandleChangeFor = (dayKey, stm, etm) => {
    // console.log(state.dataObj)
    // console.log(dayKey, stm, etm);
    let availablity = {
      ...state.dataObj?.Availablity,
      [dayKey]: {
        from:
          stm == "block" ? state.dataObj?.Availablity[dayKey]?.from || "" : stm,
        to: etm == "block" ? state.dataObj?.Availablity[dayKey]?.to || "" : etm,
      },
    };

    let arr = [...state?.checkList];

    for (let i = 0; i < arr.length; ++i) {
      if (arr[i].name == dayKey) {
        arr[i].from = stm == "block" ? arr[i].from : stm;
        arr[i].to = etm == "block" ? arr[i].to : etm;
      }
    }

    setState({
      ...state,
      checkList: [...arr],
      dataObj: {
        ...state.dataObj,
        Availablity: availablity,
      },
      error: "",
    });
  };

  useEffect(() => {
    // const userdata = localStorage.getItem("applyKart");
    if (jobSeekerDetails) {
      if (jobSeekerDetails?.avalablity) {
        let obj = jobSeekerDetails?.avalablity;
        const weekDays = [...state?.checkList];

        weekDays.forEach((item, index) => {
          if(obj?.includes(weekDays[index]['value'])) {
            weekDays[index]['checked'] = true
          }
        })

        setState({
          ...state,
          checkList: [...weekDays]
        });
      }
    } else {
      dispatch({ type: "GET_JOB_SEEKER_DETAIL_INIT" });
    }
  }, [jobSeekerDetails]);

  return (
    <Fragment>
      <Head>
        <title>ApplyKart</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header styleClass="style_two" logoUrl="/assets/images/white-logo.svg" />
      <section className="section padding-top-fixed">
        <div className="row p-5 vh-height">
          <Container>
            {loading && <Loader />}
            <Row>
              <div className="col-md-8">
                <div className="section-header">
                  <h3 className="title">Set Availability</h3>
                  <p className="text mb-0">
                    Please add your Availability here.
                  </p>
                </div>
              </div>
              <div className="col-md-4 text-start text-md-end">
                <button
                  className="btn btn-warning w-75 mb-4"
                  type="button"
                  onClick={() => {
                    router.push("/vcard/job-preference");
                  }}
                >
                  Back <i className="fal fa-long-arrow-left"></i>
                </button>

                <button
                  className="btn btn-warning w-75 mb-4"
                  type="button"
                  onClick={onClick}
                >
                  Next <i className="fal fa-long-arrow-right"></i>
                </button>
              </div>
              <div className="shadow_box setavailablity image_radio basic checkbox">
                <Row>
                  <div
                    // className={
                    //   state.isAllSelected === true
                    //     ? "col-lg-10 selectAll"
                    //     : "col-lg-10"
                    // }
                    className="col-lg-10"
                  >
                    {state?.error === "" ? null : (
                      <p className="text-danger w-100">{state?.error}</p>
                    )}
                    <Checkboxlist
                      options={state.checkList}
                      isCheckedAll={state.isAllSelected}
                      onCheck={onCheckBoxChange}
                      onSelect={onHandleChangeFor}
                    //onClick={this.handleSubmit()}
                    />
                  </div>
                </Row>
                {/* {state.isAllSelected === true ? (
                  <Row>
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="form-check">
                          <label className="form-check-label justify-content-start mb-2">
                            <div className="text">Monday To Sunday</div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </Row>
                ) : (
                  ""
                )} */}
              </div>
            </Row>
          </Container>
        </div>
      </section>
    </Fragment>
  );
};

export default SetAvailability;

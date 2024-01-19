import { Fragment, useContext, useEffect } from "react";
import Head from "next/head";
import { useState } from "react";
import { WeekSchedule, TimeSchedule, BASE_URL } from "constants/constants";
import moment from "moment";
import { Container, Row } from "react-bootstrap";
import CheckBoxList from "components/vCard/selectAll/Checkboxlist";
import { PostjobContext } from "../../post-job/postJobContext";
import { toggleHamburger } from "helper/helper";
import TimePicker from "react-time-picker/dist/entry.nostyle";
import { editAJob } from "redux/actions/jobBrowse";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const AvailabilityDetails = ({ handleSwitchComp, edit }) => {
  const [availabilities, setavailablities] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { redirect, jobDetail } = useSelector(
    ({ jobBrowseReducer }) => jobBrowseReducer
  );
  useEffect(() => {
    if (redirect) {
      dispatch({ type: "RESET_REDIRECT_FALSE" });
      router.push(`/jobs/details/${jobDetail.job_Id}`);
    }
  }, [redirect]);
  const [formsData, setFormsdata] = useState(null);
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
  const { formData, setFormData } = useContext(PostjobContext);

  // console.log(state)
  const handleFormSubmit = () => {
    let data = onClick();
    // console.log("data ==>>", data)
    setFormData((prev) => {
      return {
        ...prev,
        Availablity: data || "",
      };
    });
    if (data) {
      handleSwitchComp(5);
    }
  };
  useEffect(() => {
    // console.log("formData ==>>", formData)
    setFormsdata(formData);
    document.getElementById("scroll-helper").scrollIntoView();
    // console.log("##formData", formsData);
    if (formData && formData?.Availablity) {
      let obj = formData?.Availablity;
      const weekDays = [...state?.checkList];

      weekDays.forEach((item, index) => {
        if(obj?.includes(weekDays[index]['value'])) {
          weekDays[index]['checked'] = true
        }
      })

      // let objKeys = Object.keys(obj);
      // let arr = [];
      // const userdata = localStorage.getItem("applyKart");

      // for (let i = 0; i < objKeys.length; ++i) {
      //   if (obj[objKeys[i]]) {
      //     arr = [
      //       ...arr,
      //       {
      //         value: objKeys[i],
      //         name: objKeys[i],
      //         checked: true,
      //         from: obj[objKeys[i]].from,
      //         to: obj[objKeys[i]].to,
      //       },
      //     ];
      //   } else {
      //     arr = [
      //       ...arr,
      //       { value: objKeys[i], name: objKeys[i], checked: false },
      //     ];
      //   }
      // }
      // console.log("array", arr);

      // setState((prev) => {
      //   return {
      //     ...prev,
      //     checkList: [...arr],
      //     dataObj: {
      //       ...prev.dataObj,
      //       Availablity: formData?.Availablity,
      //       User_id: JSON.parse(userdata)?.userId,
      //     },
      //   };
      // });

      setState((prev) => {
        return {
          ...prev,
          checkList: weekDays
        }
      })

      // console.log("State updateddd");
    }
  }, [formData]);
  const onClick = () => {
    if (state.isAllSelected) {
      // let avData = {
      //   monday: { from: state?.startTime, to: state?.endTime, checked: true },
      //   tuesday: { from: state?.startTime, to: state?.endTime, checked: true },
      //   wednesday: {
      //     from: state?.startTime,
      //     to: state?.endTime,
      //     checked: true,
      //   },
      //   thursday: { from: state?.startTime, to: state?.endTime, checked: true },
      //   friday: { from: state?.startTime, to: state?.endTime, checked: true },
      //   saturday: { from: state?.startTime, to: state?.endTime, checked: true },
      //   sunday: { from: state?.startTime, to: state?.endTime, checked: true },
      // };

      setavailablities("monday,tuesday,wednesday,thursday,friday,saturday,sunday");
      return "monday,tuesday,wednesday,thursday,friday,saturday,sunday";
    } else {
      // if (
      //   state.dataObj?.Availablity["monday"]?.from &&
      //   state.dataObj?.Availablity["monday"]?.to
      // ) {
      //   if (
      //     Number(state.dataObj?.Availablity["monday"]?.from?.split(":")[0]) >
      //     Number(state.dataObj?.Availablity["monday"]?.to?.split(":")[0])
      //   ) {
      //     flag = false;
      //     setState({
      //       ...state,
      //       error: "Start time must be earlier than end time.",
      //     });
      //   } else if (
      //     Number(state.dataObj?.Availablity["tuesday"]?.from?.split(":")[0]) >
      //     Number(state.dataObj?.Availablity["tuesday"]?.to?.split(":")[0])
      //   ) {
      //     flag = false;
      //     setState({
      //       ...state,
      //       error: "Start time must be earlier than end time.",
      //     });
      //   } else if (
      //     Number(state.dataObj?.Availablity["wednesday"]?.from?.split(":")[0]) >
      //     Number(state.dataObj?.Availablity["wednesday"]?.to?.split(":")[0])
      //   ) {
      //     flag = false;
      //     setState({
      //       ...state,
      //       error: "Start time must be earlier than end time.",
      //     });
      //   } else if (
      //     Number(state.dataObj?.Availablity["thursday"]?.from?.split(":")[0]) >
      //     Number(state.dataObj?.Availablity["thursday"]?.to?.split(":")[0])
      //   ) {
      //     flag = false;
      //     setState({
      //       ...state,
      //       error: "Start time must be earlier than end time.",
      //     });
      //   } else if (
      //     Number(state.dataObj?.Availablity["friday"]?.from?.split(":")[0]) >
      //     Number(state.dataObj?.Availablity["friday"]?.to?.split(":")[0])
      //   ) {
      //     flag = false;
      //     setState({
      //       ...state,
      //       error: "Start time must be earlier than end time.",
      //     });
      //   } else if (
      //     Number(state.dataObj?.Availablity["saturday"]?.from?.split(":")[0]) >
      //     Number(state.dataObj?.Availablity["saturday"]?.to?.split(":")[0])
      //   ) {
      //     flag = false;
      //     setState({
      //       ...state,
      //       error: "Start time must be earlier than end time.",
      //     });
      //   } else if (
      //     Number(state.dataObj?.Availablity["sunday"]?.from?.split(":")[0]) >
      //     Number(state.dataObj?.Availablity["sunday"]?.to?.split(":")[0])
      //   ) {
      //     flag = false;
      //     setState({
      //       ...state,
      //       error: "Start time must be earlier than end time.",
      //     });
      //   }
      // }

      const availablityWeekDays = "";
      [...state.checkList].forEach((item, index) => {
        if (item?.checked) {
          availablityWeekDays = availablityWeekDays + item?.value + ","
        }
      })
      // console.log("availablityWeekDays ==>>", availablityWeekDays)

      setavailablities(availablityWeekDays);
      return availablityWeekDays;
    }
  };
  const onCheckBoxChange = (checkName, isChecked) => {
    // console.log("@@@checkedvalue", checkName, isChecked);

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
      return city;
    });
    // console.log("@@@checklist", checkList);

    let isAllSelected =
      checkList.findIndex((item) => item.checked === false) === -1 ||
      isAllChecked;
    setState({
      ...state,
      checkList,
      isAllSelected,
    });
  };

  const onHandleChangeFor = (dayKey, stm, etm) => {
    // console.log(dayKey, stm, etm);
    let availablity = {
      ...state.dataObj?.Availablity,
      [dayKey]: {
        from:
          stm == "block" ? state.dataObj?.Availablity[dayKey]?.from || "" : stm,
        to: etm == "block" ? state.dataObj?.Availablity[dayKey]?.to || "" : etm,
        checked: true,
      },
    };
    // console.log("@@availa", availablity);
    setState({
      ...state,
      dataObj: {
        ...state.dataObj,
        Availablity: availablity,
      },
      error: "",
    });
    // console.log("State in Parent", state);
  };

  let ava = {
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
    saturday: null,
    sunday: null,
  };

  const saveAndExit = () => {
    let data = onClick();
    // console.log("data ==>>", data)

    let obj = {
      job_id: jobDetail?.job_Id,
      Availablity: data
    };

    // console.log("obj ==>", obj)
    // return;
    dispatch({ type: "POSTED_EDIT_JOB_INIT" });
    dispatch(editAJob(obj));
  };

  return (
    <Fragment>
      <Head>
        <title>ApplyKart</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="main_wrapper" id="scroll-helper">
        {/* <SetAvailability /> */}
        <section className="section">
          <Container>
            <Row>
              <div className="col-md-8">
                <div className="section-header">
                  <h3 className="title">Availability</h3>
                </div>
              </div>
              <div className="col-md-4 text-start text-md-end"></div>
            </Row>
            <div className=" setavailablity image_radio basic checkbox">
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
                  <CheckBoxList
                    type="jobpost"
                    options={state.checkList}
                    isCheckedAll={state.isAllSelected}
                    onCheck={onCheckBoxChange}
                    onSelect={onHandleChangeFor}
                  />
                  {/* {state.isAllSelected === false && ( */}
                    <div className="col-md-12 text-center">
                      <div className="d-flex flex-wrap">
                        {edit && (
                          <button
                            type="submit"
                            className="btn btn-warning mb-3 me-5"
                            onClick={(e) => {
                              e.preventDefault();
                              saveAndExit();
                            }}
                          >
                            Save and Exit
                          </button>
                        )}
                        <button
                          type="submit"
                          className="btn btn-warning  mb-3 me-5"
                          onClick={(e) => {
                            e.preventDefault();
                            handleSwitchComp(3);
                          }}
                        >
                          <i className="fal fa-long-arrow-left me-2"></i> Back
                        </button>
                        <button
                          type="button"
                          onClick={handleFormSubmit}
                          className="btn btn-warning  mb-3 me-5"
                        >
                          Next<i className="fal fa-long-arrow-right"></i>
                        </button>
                      </div>
                    </div>
                  {/* )} */}
                </div>
              </Row>
              {/* {state.isAllSelected === true ? (
                <>
                  <Row>
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="form-check">
                          <label className="form-check-label justify-content-start mb-2">
                            <div className="text">Monday To Sunday</div>
                          </label>
                        </div>
                        <div className="row">
                          <div className="col-sm-6">
                            <TimePicker
                              className="form-control"
                              name="startTime"
                              onChange={(e) =>
                                setState({
                                  ...state,
                                  startTime: e,
                                })
                              }
                              required
                            />
                          </div>
                          <div className="col-sm-6">
                            <TimePicker
                              className="form-control"
                              name="endTime"
                              onChange={(e) =>
                                setState({
                                  ...state,
                                  endTime: e,
                                })
                              }
                              required
                              // value={option.checked ? option.from : ""}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap">
                      {edit && (
                        <button
                          type="submit"
                          className="btn btn-warning  mb-3 me-5"
                          onClick={(e) => {
                            e.preventDefault();
                            saveAndExit();
                          }}
                        >
                          Save and Exit
                        </button>
                      )}
                      <button
                        type="submit"
                        className="btn btn-warning mb-3 me-5"
                        onClick={(e) => {
                          e.preventDefault();
                          handleSwitchComp(3);
                        }}
                      >
                        <i className="fal fa-long-arrow-left me-2"></i> Back
                      </button>

                      <button
                        type="button"
                        onClick={handleFormSubmit}
                        className="btn btn-warning mb-3 me-5"
                      >
                        Next<i className="fal fa-long-arrow-right"></i>
                      </button>
                    </div>
                  </Row>
                </>
              ) : (
                ""
              )} */}
            </div>
          </Container>
        </section>
        <div
          className="sidebar-overlay"
          id="sidebar-overlay"
          onClick={toggleHamburger}
        />{" "}
      </main>
    </Fragment>
  );
};

export default AvailabilityDetails;

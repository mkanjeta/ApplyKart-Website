import { Fragment, useEffect, useMemo, useState } from "react";
import Sidebar from "components/shared/sidebar";
import Head from "next/head";
import { Button, Row, Table } from "react-bootstrap";
import TopBar from "components/shared/topbar";
import Calendar from "react-calendar";
import Router from "next/router";
import "react-calendar/dist/Calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { getCalenderData } from "redux/actions/workActions";
import moment from "moment";
import { CalendarDate } from "react-bootstrap-icons";
import { toggleHamburger } from "helper/helper";
import { useRouter } from "next/router";

const CalendarBox = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("applyKart")) {
      router?.push("/login");
    }
  }, []);

  const { calenderData, errorData } = useSelector(
    ({ vcardWorkReducer }) => vcardWorkReducer
  );

    // console.log(events)

  console.log("errorData", errorData);
  const history = Router;
  const [calenderDatas, setCalenderData] = useState(null);
  const [date, setDate] = useState(new Date());
  const [array, setArray] = useState(null);

  const [events, setEvents] = useState(() => []);

  useEffect(() => {
    let date = new Date();
    // console.log(date);
    setDate(date);
    const obj = {
      date1: moment(date).format("DD/MM/YYYY"),
      monthName: moment(date).format("MM"),
    };
    dispatch(getCalenderData(obj));
  }, []);

  useEffect(() => {
    if (calenderData && calenderData.lst_Calender_Events.length && date) {
      // console.log(new Date(date).toDateString());
      // console.log(new Date(calenderData.lst_Calender_Events[0].scheduledDate).toDateString())
      // console.log(calenderData.lst_Calender_Events);

      let evnts = calenderData.lst_Calender_Events.filter(
        (item) =>
          new Date(item.scheduledDate).toDateString() ==
          new Date(date).toDateString()
      );
      // console.log(evnts);
      setEvents(evnts);
    }
  }, [calenderData, date]);

  var date1 = moment(date).format("DD/MM/YY");

  // console.log("monthName", date, date1);
  const onClick = () => history.push("/jobs/details");
  const onChange = (date) => {
    // console.log(date);
    setDate(date);
    const obj = {
      date1: moment(date).format("DD/MM/YYYY"),
      monthName: moment(date).format("MM"),
    };
    dispatch(getCalenderData(obj));
  };

  useEffect(() => {
    if (calenderData && !errorData) {
      setCalenderData(calenderData);
    }
  }, [calenderData, errorData]);
  const dateArray = useMemo(() => {
    const arr = [];
    calenderData?.lst_Calender_Events?.forEach((element) =>
      arr.push(moment(element?.scheduledDate).format("DD/MM/YYYY"))
    );
    return arr;
    //setArray(arr);
  }, [calenderData]);
  useEffect(() => {
    // console.log("datalog", dateArray);
  }, [calenderData]);

  // console.log("##$$@@", calenderData);

  return (
    <Fragment>
      <Head>
        <title>ApplyKart</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="main_wrapper">
        <div className="left_side sidebar" id="left_side">
          <Sidebar />
        </div>
        <div className="right_side dashboard">
          {/* TopBar */}
          <TopBar />
          {/* TopBar */}
          <div className="row">
            <div className="col-xl-12">
              <div className="dashboard_title_bar">
                <h3 className="title">Calendar</h3>
              </div>
            </div>
          </div>
          {/* Content Box */}
          <Row>
            <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12">
              <div className="calendar-container">
                <Calendar
                  style={{ height: 500 }}
                  onClickMonth={onChange}
                  tileClassName={({ date, view }) => {
                    // console.log(moment(date).format("DD/MM/YYYY"), dateArray);
                    if (dateArray.includes(moment(date).format("DD/MM/YYYY"))) {
                      // console.log("matched...!");
                      return "highlight";
                    }
                  }}
                  className="calender-design"
                  onChange={onChange}
                  value={date}
                />
              </div>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-7 col-xs-12">
              {!errorData && events.length && events ? (
                <div className="card schedule">
                  <div className="card-data">
                    <div className="card-header bg-white">
                      <div className="title">
                        <p className="current-day">Today</p>
                        <p>{date.toDateString()}</p>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="open-chart">
                        <Row>
                          <div className="col-md-1 pd-r-0">
                            {/* <div className="time-box">
															<p>7 am</p>
														</div> */}
                          </div>
                          {events.length &&
                            events.map((item, i) => (
                              // var date1 = moment(item?.scheduledDate);
                              // var monthName = moment(item?.scheduledDate).format('MMMM');
                              // var year = date1.format('YYYY');

                              <div key={i} className="col-md-11">
                                <div className="chart-box">
                                  <div className="left-box">
                                    <p className="title">Interview Schedule</p>
                                    <span>{`${moment(
                                      item?.scheduledDate
                                    ).format("MMMM")} ${
                                      item?.scheduledDate
                                        .split("-")[2]
                                        .split("T")[0]
                                    }, ${moment(item?.scheduledDate).format(
                                      "YYYY"
                                    )}`}</span>
                                    <span>{` ${item?.eventDetails?.eventTime} - ${item?.eventDetails?.eventEndTime}`}</span>
                                    <p className="interviewer">
                                      Interview by{" "}
                                      {item?.interviewerUserName || ""}
                                    </p>
                                    {item?.platformLink && (
                                      <p>
                                        <Button>
                                          <a
                                            style={{ color: "white" }}
                                            href={item?.platformLink}
                                            target="_blank"
                                            rel="noreferrer"
                                          >
                                            Join
                                          </a>
                                        </Button>
                                      </p>
                                    )}
                                  </div>
                                  <div className="right-box">
                                    {/* <img src={'/assets/images/deloitte-logo.png'} alt="icon" /> */}
                                    <h3>{item?.interviewCompany}</h3>
                                    <p>{item?.interviewLocation || ""}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </Row>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ fontSize: "20px", textAlign: "center" }}>
                  No Record Found
                </div>
              )}
            </div>
          </Row>
          {/* Content Box */}
        </div>
        <div
          className="sidebar-overlay"
          id="sidebar-overlay"
          onClick={toggleHamburger}
        />{" "}
      </main>
    </Fragment>
  );
};

export default CalendarBox;

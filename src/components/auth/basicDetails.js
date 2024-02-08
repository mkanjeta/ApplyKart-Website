import Loader from "components/shared/loader";
import { Fragment, useEffect, useState } from "react";
import Header from "components/shared/header";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import moment from "moment";
import { useRouter } from "next/router";
import { SignupCheckContact, updateBasicDetails } from "redux/actions/authActions";



const initialValues = {
  full_name: "",
  last_name: "",
  dob: "",
};

const BasicDetailsSchema = Yup.object().shape({
  full_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  dob: Yup.date()
});

const BasicDetails = () => {
  const {
    loading,
    entity,
    signUpData,
    basicDetailSuccess,
    checkContactSuccess
  } = useSelector(({ AuthReducer }) => AuthReducer);
  const dispatch = useDispatch();
  const navigate = useRouter();

  // console.log('dob', signUpData);

  const handleSubmit = (values) => {
    // console.log(values);
    let obj = {
      "user_id": signUpData?.user_Id,
      "first_name": values?.full_name?.split(" ")[0],
      "last_name": values?.last_name || '',
      "dob": values?.dob
    }

    const localStorageData = localStorage.getItem("applyKart");
    if(localStorageData) {
      const localStorageJsonData = JSON.parse(localStorageData);
      localStorageJsonData['firstName'] = values?.full_name?.split(" ")[0];
      localStorageJsonData['lastName'] = values?.last_name || '';

      localStorage.setItem("applyKart", JSON.stringify(localStorageJsonData));
    }

    dispatch(updateBasicDetails(obj));
  }

  useEffect(() => {
    if (basicDetailSuccess) {
      //     dispatch({type: "AUTH_SIGNIN_RESET"});
      //     // navigate.push('/otp-verification');
      //    const requestPayloadForCheckContact = {
      //     "countryCode": signUpData?.countryCode,
      //     "phone_no": signUpData?.phone,
      //     "isLandline": signUpData?.isLandline,
      //     "email": signUpData?.email
      // };
      //     dispatch(SignupCheckContact(requestPayloadForCheckContact));
      dispatch({ type: "AUTH_SIGNIN_RESET" });
      navigate.push('/select-account');
    }
  }, [basicDetailSuccess]);

  // useEffect(() => {
  //   if(checkContactSuccess){
  //     dispatch({type: "AUTH_SIGNIN_RESET"});
  //     navigate.push('/select-account');
  //   }
  // }, [checkContactSuccess])

  return (
    <Fragment>
      <Head>
        <title>ApplyKart</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header styleClass="" logoUrl="" />
      <section className="section-padding">
        <Row className="">
          {loading && <Loader />}
          <div className=" col-md-7">
            <div className="block_box block-box-container">
              <div className="block_box_basic_bg">
                <div className="text_box">
                  <h4 className="title">
                    Are you a <b>business owner</b> or a <b>recruiter</b>{" "}
                    looking for staff?
                  </h4>
                  <p className="mb-0">
                    Create a business account in under 5 minutes and start
                    posting jobs for FREE! We've got you covered.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="form_box px-3">
              <div className="section-header">
                <h3 className="title">Basic Details</h3>
                <p className="text mb-0">
                  Please fill your basic details here
                </p>
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={BasicDetailsSchema}
                onSubmit={(values) => {
                  handleSubmit(values);
                }}
              >
                {(formik) => {
                  return (
                    <form>
                      <div className="form-group">
                        <input
                          type="name"
                          className="form-control"
                          name="full_name"
                          placeholder="First Name"
                          value={formik.values?.full_name}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "full_name",
                              e.target.value
                            );
                          }}
                          onBlur={formik.handleBlur}
                          required
                        />
                      </div>
                      {
                        formik?.errors?.full_name && <span style={{ color: 'red' }}>{formik?.errors?.full_name}</span>
                      }

                      <div className="form-group">
                        <input
                          type="name"
                          className="form-control"
                          name="last_name"
                          placeholder="Last Name"
                          value={formik.values?.last_name}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "last_name",
                              e.target.value
                            );
                          }}
                          onBlur={formik.handleBlur}
                          required
                        />
                      </div>
                      {
                        formik?.errors?.last_name && <span style={{ color: 'red' }}>{formik?.errors?.last_name}</span>
                      }
                      <span className="d-block fw-600 mb-2 mx-2">Date of Birth (optional)</span>
                      <div
                        className="input-group date_style"
                        style={{ cursor: "pointer" }}
                      >
                        
                        <input
                          className="form-control"
                          placeholder="Date of Birth (optional)"
                          type="date"
                          id="start"
                          max={moment(new Date()).format('YYYY-MM-DD')}
                          name="trip-start"
                          value={formik?.values?.dob || ''}
                          onChange={(e) => {
                            // console.log(e.target.value);
                            formik?.setFieldValue('dob', moment(e?.target?.value).format('YYYY-MM-DD'));
                          }}
                        ></input>
                        {/* <DatePicker
                          className="form-control"
                          placeholderText="Date of Birth (optional)"
                          selected={formik?.values?.dob ? moment(formik?.values?.dob).toDate() : ''} 
                          onChange={(e) => {
                            console.log(moment(e).format('YYYY-MM-DD'));
                            formik?.setFieldValue('dob', moment(e).format('YYYY-MM-DD'));
                          }}
                        /> */}

                        {/* <div className="input-group-append">
                          <button type="button" className="input-group-text">
                            <i className="fal fa-calendar-alt" />
                          </button>
                        </div> */}
                      </div>
                      <div className="form-group text-center mt-4">
                        <button
                          className="btn btn-warning w-50"
                          type="submit"
                          onClick={formik?.handleSubmit}
                        >
                          Next <i className="fal fa-long-arrow-right"></i>
                        </button>
                      </div>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </Row>
      </section>
    </Fragment>
  )
}

export default BasicDetails;
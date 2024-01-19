import { Fragment, useState, useEffect } from "react";
import Header from "components/shared/header";
import Head from "next/head";
import { Container, Modal, Row } from "react-bootstrap";
import { BASE_URL } from "constants/constants";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { RESET_NEXT_STEP } from "redux/actionTypes/auth.actionTypes";

const initialValues = {
  accountRadio: "",
};

const ChooseAccount = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const dispatch = useDispatch();

  const router = useRouter();
  const handleFormSubmit = (type, value) => {
    if (value === "candidateRadio") {
      router?.push("/vcard");
    } else if (value === "jobposterRadio") {
      router?.push("/timeline");
    }
  };
  useEffect(() => {
    dispatch({ type: RESET_NEXT_STEP });
  }, [])
  return (
    <Fragment>
      <Head>
        <title>ApplyKart</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header styleClass="" logoUrl="" showButton={false}/>
      <section className="section-padding">
        <Row className="">
          <div className="col-md-7">
            <div className="block_box block-box-container">
              <div className="block_box_account_bg">
                <div className="text_box">
                  <h4 className="title">
                    Hi mate! Are you looking for your next full-time work
                    opportunity or a one-time gig?
                  </h4>
                  <p className="mb-0">
                    Join ApplyKart today and start finding work.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="form_box px-3">
              <div className="section-header">
                <h3 className="title">Choose Account Type</h3>
                <p className="text mb-0">
                  Please select account type to log in the application
                </p>
              </div>
              <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                  handleFormSubmit(values);
                }}
              >
                {({ setFieldValue, handleSubmit, values }) => {
                  return (
                    <form>
                      <div
                        className="form-group"
                      >
                        <div className="form-check custom-radio">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="accountRadio"
                            id="candidateRadio"
                            value="candidateRadio"
                            onClick={(e) =>
                              handleFormSubmit("accountRadio", e.target.value)
                            }
                            defaultChecked
                          />
                          <label
                            className="form-check-label"
                            htmlFor="candidateRadio"
                            style={{ alignItems: 'center' }}
                          >
                            <span className="icon">
                              <img
                                src="/assets/images/icons/bag.svg"
                                alt="icon"
                              />
                            </span>
                            <div className="text">
                              <h6 className="title">Looking for a Job</h6>
                              {/* <p className="mb-0">
                                Start building your Professional Visiting Card
                                (V-Card)
                              </p> */}
                            </div>
                          </label>
                        </div>
                      </div>

                      <div className="form-group">
                        <div
                          className="form-check custom-radio"
                          // onClick={() => handleShow()}
                        >
                          <input
                            className="form-check-input"
                            type="radio"
                            name="accountRadio"
                            id="jobposterRadio"
                            value="jobposterRadio"
                            onClick={(e) =>
                              handleFormSubmit("accountRadio", e.target.value)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="jobposterRadio"
                            style={{ alignItems: 'center' }}
                          >
                            <span className="icon">
                              <img
                                src="/assets/images/icons/group-users.svg"
                                alt="icon"
                              />
                            </span>
                            <div className="text">
                              <h6 className="title">No, I’m just looking to Make the connections</h6>
                              {/* <p className="mb-0">
                                Proceed with Company Profile creation
                              </p> */}
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* <div className="form-group text-center mt-4">
                        <button
                          className="btn btn-warning w-50 mt-4"
                          type="submit"
                          onClick={handleSubmit}
                        >
                          Continue <i className="fal fa-long-arrow-right" />
                        </button>
                      </div> */}
                    </form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </Row>
      </section>
      <Modal
        size="sm"
        className="custom_modal"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title className="fw-600">You are Hiring for ?</Modal.Title>
          <button
            type="button"
            className="btn-close m-0"
            aria-label="Close"
            onClick={handleClose}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <form className="setavailablity image_radio basic checkbox">
            <div className="form-group">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="hiringFor"
                  id="typeOne"
                  value="typeOne"
                />
                <label
                  className="form-check-label justify-content-start mb-2 text-black fw-500"
                  htmlFor="typeOne"
                >
                  <span className="icon">
                    <img
                      src="/assets/images/icons/radio/inactive.png"
                      alt="icon"
                    />
                    <img
                      src="/assets/images/icons/radio/active.png"
                      alt="icon"
                    />
                  </span>
                  Hiring for my own company
                </label>
              </div>
            </div>
            <div className="form-group">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="hiringFor"
                  id="typeTwo"
                  value="typeTwo"
                />
                <label
                  className="form-check-label justify-content-start mb-2 text-black fw-500"
                  htmlFor="typeTwo"
                >
                  <span className="icon">
                    <img
                      src="/assets/images/icons/radio/inactive.png"
                      alt="icon"
                    />
                    <img
                      src="/assets/images/icons/radio/active.png"
                      alt="icon"
                    />
                  </span>
                  Hiring for my client
                </label>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            onClick={() => {
              onContinueClick();
              //router?.push("/login")
            }}
            className="btn btn-warning mx-auto w-75"
          >
            Continue <i className="fal fa-long-arrow-right"></i>
          </button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default ChooseAccount;

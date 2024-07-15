import { Fragment, useEffect, useRef } from "react";
import Header from "components/shared/header";
import Footer from "components/shared/footer";
import Head from "next/head";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Row, Dropdown, Alert, Modal, Col, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { contactUs } from "redux/actions/authActions";
import TimelineHeader from "components/shared/timelineHeader";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};
const contactUsSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name required")
    .max(20, "Max 20 characters")
    .matches(/^[A-Za-z' ]+$/, "Enter a valid name"),
  lastName: Yup.string()
    .required("Last name required")
    .max(20, "Max 20 characters")
    .matches(/^[A-Za-z' ]+$/, "Enter a valid name"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .min(8, "Enter a valid phone number")
    .max(15, "Max 15 digites allowed")
    .required("Phone number required"),
  message: Yup.string()
    .required("Message required")
    .max(2000, "Max 2000 characters"),
});

const ContactUs = () => {
  const formRef = useRef();
  const { contactUsSuccess } = useSelector(({ AuthReducer }) => AuthReducer);
  const dispatch = useDispatch();
  // console.log(contactUsSuccess);
  const handleSubmit = (values) => {
    // console.log(values);
    let obj = {
      name: `${values?.firstName} ${values?.lastName}`,
      email: values?.email,
      message: values?.message,
    };
    dispatch(contactUs(obj));
  };
  useEffect(() => {
    if (contactUsSuccess) {
      formRef.current.resetForm();
      dispatch({ type: "CONTACT_US_RESET" });
    }
  }, [contactUsSuccess]);
  return (
    <Fragment>
      {/* <Head>
        <title>ApplyKart</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head> */}
      {/* <Header
        styleClass=""
        logoUrl="assets/images/logo-white.png"
        hideButtons={1}
      /> */}
      <div className="main_wrapper wrapper_style_two">
        <TimelineHeader />

        <div className="contact-us-container">
          <div className="container">
            <div className="header-text">
              <h1 className="faq-ask-que mb-3">Contact us</h1>
              <p>Let us know how we can help and we'll be in touch shortly!</p>
            </div>

            <div className="contact-us-content">
              <Formik
                //initialValues={initialValues}
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={(values) => {
                  // console.log("@@values", values)
                  handleSubmit(values);
                }}
                innerRef={formRef}
                validationSchema={contactUsSchema}
              >
                {({
                  values,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  handleChange,
                  errors,
                }) => {
                  return (
                    <Form>
                      <Row>
                        <Col>
                          <Form.Group className="mb-4">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter First Name"
                              name="firstname"
                              maxLength={20}
                              value={values?.firstName}
                              onChange={(e) => {
                                setFieldValue("firstName", e.target.value);
                              }}
                            />
                            {errors?.firstName && (
                              <span style={{ color: "tomato" }}>
                                {errors?.firstName}
                              </span>
                            )}
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-4">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Last Name"
                              name="lastname"
                              maxLength={20}
                              value={values?.lastName}
                              onChange={(e) => {
                                setFieldValue("lastName", e.target.value);
                              }}
                            />
                            {errors?.lastName && (
                              <span style={{ color: "tomato" }}>
                                {errors?.lastName}
                              </span>
                            )}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="mb-4">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="Your Email Address"
                              name="email"
                              value={values?.email}
                              onChange={(e) => {
                                setFieldValue("email", e.target.value);
                              }}
                            />
                            {errors?.email && (
                              <span style={{ color: "tomato" }}>
                                {errors?.email}
                              </span>
                            )}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={4}>
                          <Form.Group className="mb-4">
                            <Form.Label>Phone Number</Form.Label>
                            <PhoneInput
                              country={"au"}
                              onlyCountries={["au", "in"]}
                              countryCodeEditable={false}
                              // name="phone"
                              placeholder="Enter contact number"
                              inputClass="form-control phnInput"
                              value={values?.phone}
                              onChange={(phone, code) => {
                                setFieldValue("phone", phone);
                              }}
                              // value={values.phone}
                              inputProps={{
                                name: "phone",
                              }}
                            />
                            {errors?.phone && (
                              <span style={{ color: "tomato" }}>
                                {errors?.phone}
                              </span>
                            )}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="mb-4">
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={8}
                              placeholder=""
                              name="phone"
                              value={values?.message}
                              onChange={(e) => {
                                setFieldValue("message", e.target.value);
                              }}
                            />
                            {errors?.message && (
                              <span style={{ color: "tomato" }}>
                                {errors?.message}
                              </span>
                            )}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <button
                            type="button"
                            className="btn btn-primary btn-submit"
                            onClick={handleSubmit}
                          >
                            Submit
                          </button>
                        </Col>
                      </Row>
                    </Form>
                  );
                }}
              </Formik>

              {/* <Row>
              <Col md={6}>
                <div className="contact-us-text">
                  <h5 className="left-title">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </h5>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting,
                  </p>
                  <div className="customer-support">
                    <h6>Customer Support</h6>
                    <a href="#" className="support-link">
                      <i className="fal fa-envelope"></i>
                      support@applykart.co.in
                    </a>
                  </div>
                </div>
              </Col>
              <Col md={5}>
                <div className="contact-form">
                  <h4>Report a problem/Need a assistance</h4>
                  <form>
                    <div className="form-group">
                      <label>Full Name</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input type="email" className="form-control" />
                    </div>
                    <div
                      className="form-group"
                      style={{ marginBottom: "40px" }}
                    >
                      <label>Message</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Write here..."
                      />
                    </div>
                    <button className="btn btn-warning d-block mx-auto">
                      Submit <i className="fal fa-long-arrow-right"></i>
                    </button>
                  </form>
                </div>
              </Col>
            </Row> */}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContactUs;

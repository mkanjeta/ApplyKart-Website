import TimelineHeader from "components/shared/timelineHeader";
import axios from "axios";
import ContactPageData from "components/pages/contact";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useState, useEffect, useRef } from "react";
import TableOfContents from "components/TableOfContents";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Row, Dropdown, Alert, Modal, Col, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { contactUs } from "redux/actions/authActions";

export default function BlogsView(props) {
  const db_url = "http://twiloapi.buraaq.in/api/v1";
  const [isLoading, setLoading] = useState(false);
  const [blogData, setBlogData] = useState(null);

  const router = useRouter();
  const { slugName } = router.query;
  const [name, setName] = useState(() => "");
  const [email, setEmail] = useState(() => "");
  const [phone, setPhone] = useState(() => "");
  const [error, setError] = useState(() => "");

  const referAFriendFunc = (e) => {
    e.preventDefault();
    if (!name || name.trim() == "") {
      setError("Enter name");
      return;
    }
    if (!phone || phone.trim() == "") {
      setError("Enter phone no.");
      return;
    }
    if (!email || email.trim() == "") {
      setError("Enter email");
      return;
    }
    // let obj = {
    //   job_id: jobDetail?.job_Id,
    //   email: email,
    //   name: name,
    //   contactNo: phone,
    // };
    // dispatch(referAFriend(obj));
    // setPhone("");
    // setEmail("");
    // setName("");
    // console.log("here");
  };

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${db_url}/blogs?slugName=${slugName}`
        );

        if (response.data.content) {
          setBlogData(response.data);
        } else {
          console.log(response);
        }
      } catch (error) {
        console.warn("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (slugName) {
      fetchData();
    }
  }, [slugName]);

  return (
    <Fragment>
      <div className="main_wrapper wrapper_style_two blogsingle">
        <TimelineHeader />
        <div className="terms-condition-container">
          <div className="container">
            <div className="content-wrap">
            {/* <h3 className="text-center faq-ask-que my-3">Blogs</h3>
            <p className="terms-condition-slogen text-center">
              Welcome to ApplyKart!
            </p> */}
            {isLoading ? (
              <h1>Loading</h1>
            ) : (
              <>
                {!isLoading && !blogData ? (
                  <>No Data Found</>
                ) : (
                  <>
                  <div className="left-sidebar">
                  <div className="mdx-sticky">
                      <TableOfContents />
                  </div>
                  </div>

                <div className="right-sidebar">
                <div className="writtenbyblog sidebar d-block">
                <p className="written text-center" style={{ marginBottom: "16px" }}>
                 Written By
                </p>
                <div className="userbox">
                  <div className="author_img">
                    <img src="/assets/images/lakshya.png" />
                    </div>
                  <p className="author_name">Lakshya Bhagnani</p>
                  <p className="author_details">
                  Lakshya is a passionate content writer with over 3 years of experience in the language proficiency tests domain. An avid learner, he stays ahead of the industry's trends ensuring his writing remains fresh and incorporates the latest updates. Lakshya is dedicated to helping readers achieve their language proficiency goals through his insightful content.
                  </p>
                </div>
              </div>

              <div className="referform sidebar d-block">
                <div className="desc_area">
                  <h5 className="refertitle text-center">Contact Us</h5>
                  {/* <p className="refertext">
                    Do you want a friend to apply for this job?
                  </p> */}
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
                      <Form.Group className="mb-4">
                        {/* <Form.Label>First Name</Form.Label> */}
                        <Form.Control
                          type="text"
                          placeholder="Enter First Name"
                          name="firstname"
                          maxLength={20}
                          value={values?.firstName}
                          onChange={(e) => setFieldValue("firstName", e.target.value)}
                        />
                        {errors?.firstName && (
                          <span style={{ color: "tomato" }}>{errors?.firstName}</span>
                        )}
                      </Form.Group>

                      <Form.Group className="mb-4">
                        {/* <Form.Label>Last Name</Form.Label> */}
                        <Form.Control
                          type="text"
                          placeholder="Enter Last Name"
                          name="lastname"
                          maxLength={20}
                          value={values?.lastName}
                          onChange={(e) => setFieldValue("lastName", e.target.value)}
                        />
                        {errors?.lastName && (
                          <span style={{ color: "tomato" }}>{errors?.lastName}</span>
                        )}
                      </Form.Group>

                      <Form.Group className="mb-4">
                        {/* <Form.Label>Email Address</Form.Label> */}
                        <Form.Control
                          type="email"
                          placeholder="Your Email Address"
                          name="email"
                          value={values?.email}
                          onChange={(e) => setFieldValue("email", e.target.value)}
                        />
                        {errors?.email && (
                          <span style={{ color: "tomato" }}>{errors?.email}</span>
                        )}
                      </Form.Group>

                  <Form.Group className="mb-4">
                    {/* <Form.Label>Phone Number</Form.Label> */}
                    <PhoneInput
                      country={"au"}
                      onlyCountries={["au", "in"]}
                      countryCodeEditable={false}
                      placeholder="Enter contact number"
                      inputClass="form-control phnInput"
                      value={values?.phone}
                      onChange={(phone, code) => setFieldValue("phone", phone)}
                      inputProps={{ name: "phone" }}
                    />
                    {errors?.phone && (
                      <span style={{ color: "tomato" }}>{errors?.phone}</span>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-4">
                    {/* <Form.Label>Message</Form.Label> */}
                    <Form.Control
                      as="textarea"
                      rows={6}
                      placeholder="Enter a Message"
                      name="message"
                      value={values?.message}
                      onChange={(e) => setFieldValue("message", e.target.value)}
                    />
                    {errors?.message && (
                      <span style={{ color: "tomato" }}>{errors?.message}</span>
                    )}
                  </Form.Group>

                  <div className="d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-primary btn-submit"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </Form>
                  );
                }}
              </Formik>

             
            </div>         

        
              </div>
                </div>

              <div className="content-area toccontent">
                        <h1>{blogData?.title}</h1>
                        <img className="w-100" src={blogData?.image} 
                         onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "";
                        }}
                      />
              <div className="blogcontent" id="html-canvas"
                  dangerouslySetInnerHTML={{ __html: blogData?.content }}>
              </div>
              </div>

                </>


      

             




                )}
              </>
            )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

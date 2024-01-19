import { Fragment, useEffect, useInsertionEffect, useState } from "react";
import Header from "components/shared/header";
import Head from "next/head";
import { Container, Row, Modal, Button } from "react-bootstrap";
import Router, { useRouter } from "next/router";
import { BASE_URL } from "constants/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  getJobCategory,
  getJobsubCategory,
  saveJobDetails,
} from "redux/actions/categoryActions";
import { Formik } from "formik";
import { useDebounce } from "use-debounce";
import Loader from "components/shared/loader";
import { Toast } from "react-bootstrap";
import Swal from "sweetalert2";
// const initialValues = {

// };

const SelectJobType = () => {
  //const history = Router;
  //const onClick = () => history.push("/vcard/job-preference");
  const { jobCategory, jobSubCategory, loading, redirect } = useSelector(
    ({ categoryReducer }) => categoryReducer
  );

  const { jobSeekerDetails, loading: loading1 } = useSelector(
    ({ vcardWorkReducer }) => vcardWorkReducer
  );

  const router = useRouter();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [values, setValues] = useState("");
  const [category, setCategory] = useState(() => jobCategory?.jobCategories);
  const [subCategory, setSubCategory] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [seekerId, setSeekerId] = useState(null);
  const [searchtext, setSearchText] = useState(null);
  const [categoryType, setCategoryType] = useState("");
  const [value] = useDebounce(searchtext, 1000);
  const [id, setId] = useState(() => "");
  // console.log("values ==>>", values)

  useEffect(() => {
    if (jobSeekerDetails) {
      setCategoryName(jobSeekerDetails?.prefered_job_category);
    } else {
      dispatch({ type: "GET_JOB_SEEKER_DETAIL_INIT" });
    }
  }, [jobSeekerDetails]);

  const handleClose = () => {
    setShow(false);
    setSubCategory([]);
  };
  const handleShow = (id, name, subCategory) => {
    setId(id);
    localStorage.setItem("cat_id", id);
    // console.log(name);
    setCategoryName(name);
    let categoryTemp = categoryType;
    categoryTemp = (categoryType ? categoryType + "," : "") + name;
    setCategoryType(categoryTemp);
    setShow(true);
    if (values?.split(",")?.length >= 3) {
      subCategory.forEach((item, index) => {
        subCategory[index]['disable'] = true
      })
    } else {
      subCategory.forEach((item, index) => {
        subCategory[index]['disable'] = false
      })
    }
    // console.log(subCategory)
    setSubCategory(subCategory);
    dispatch(getJobsubCategory(id));
  };

  //console.log("@@@jobCategory", jobCategory, jobSubCategory);

  useEffect(() => {
    const obj = {
      search: value ? value : "",
    };
    dispatch(getJobCategory(obj));
  }, [value]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const applyKart = localStorage.getItem("applyKart");
      const { userId } = JSON.parse(applyKart);
      setSeekerId(userId);
    }
  }, []);

  const handleInputChange = (e) => {
    // console.log("target ==>>", e)
    const { name, value, id, checked } = e.target;
    if (checked) {
      setValues((prevName) => (prevName ? prevName + ',' : '') + name);
    } else {
      let tempVal = values;
      let tempValArr = tempVal?.split(",");
      console.log(tempValArr)
      tempValArr?.splice(tempValArr?.indexOf(name), 1);
      console.log(tempValArr)
      tempVal = tempValArr.join(",");
      setValues(tempVal);
    }
  };

  useEffect(() => {
    if (values) {
      // console.log("values ==>>", values)
      const tempSubCat = [...subCategory];
      if (values?.split(",")?.length >= 3) {
        tempSubCat?.forEach((item, index) => {
          if (values?.split(",")?.indexOf(tempSubCat[index]['job_Subcategory']) > -1) {
            tempSubCat[index]['disable'] = false
          } else {
            tempSubCat[index]['disable'] = true
          }
        })
        // console.log("tempSubCat ==>>", tempSubCat)
        setSubCategory(tempSubCat)
      } else {
        tempSubCat?.forEach((item, index) => {
          tempSubCat[index]['disable'] = false
        })
        setSubCategory(tempSubCat)
      }
    }
  }, [values])

  const handleSubmit = () => {
    // if (!categoryName || categoryName.trim() == "") {
    //   Swal.fire({
    //     icon: "error",
    //     text: "Select a category",
    //   });
    //   return;
    // }
    // const obj = {
    //   User_Id: seekerId,
    //   Prefered_Job_Subcategory: values,
    //   Prefered_Job_Category: categoryName,
    //   category_id: id,
    // };
    // // console.log(obj)
    // dispatch(saveJobDetails(obj));
    setShow(false);
  };

  useEffect(() => {
    if (redirect) {
      dispatch({ type: "RESET_REDIRECT_CATEGORY" });
      router.push("/vcard/job-preference");
    }
  }, [redirect]);
  useEffect(() => {
    if (jobCategory !== null) {
      setCategory(jobCategory?.jobCategories);
    }
  }, [jobCategory]);

  const handleNext = () => {
    if (!categoryName || categoryName.trim() == "") {
      Swal.fire({
        icon: "error",
        text: "Select a category",
      });
      return;
    }

    const obj = {
      User_Id: seekerId,
      Prefered_Job_Subcategory: values,
      Prefered_Job_Category: categoryType,
    };
    dispatch(saveJobDetails(obj));
    // router.push("/vcard/job-preference")
  };

  // const handleSubcategoryCheck = (e) => {
  //   const {name, value, id} = e.target;
  //   console.log(name, value, id)
  //   const seperatedSubCategories = values?.split(",");
  //   console.log("seperatedSubCategories ==>>", seperatedSubCategories)

  // }

  return (
    <Fragment>
      <Head>
        <title>ApplyKart</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header styleClass="style_two" logoUrl="/assets/images/logo-white.png" />
      <section className="section padding-top-fixed">
        {(loading || loading1) && <Loader />}

        <Container>
          <Row>
            <div className="col-md-8">
              <div className="section-header">
                <h3 className="title">Select Job Type</h3>
                <p className="text mb-0">
                  Select the type of job you're looking for
                </p>
              </div>
            </div>
            <div className="col-md-4 text-start text-md-end">
              <button
                className="btn btn-warning w-75 mb-4"
                type="button"
                onClick={() => {
                  router.push("/vcard/skills");
                }}
              >
                Back <i className="fal fa-long-arrow-left"></i>
              </button>

              <button
                className="btn btn-warning w-75 mb-4"
                type="button"
                onClick={() => {
                  handleNext();
                }}
              >
                Next <i className="fal fa-long-arrow-right"></i>
              </button>
            </div>
          </Row>
          <Row>
            <div className="col-md-5">
              <form>
                <div className="form-group">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search job type"
                    value={searchtext}
                    onChange={(e) => setSearchText(e.target.value)}
                    required
                  />
                </div>
              </form>
            </div>
          </Row>
          <Row className="g-3 mb-3">
            {/* Item */}
            {category?.map((item, i) => (
              <div
                key={i}
                className={`jobType col-lg-2 col-md-3 col-sm-4 col-6 ${categoryName == item?.job_Category ? "job-type-selected" : ""
                  }`}
                onClick={() =>
                  handleShow(
                    item?.job_Category_id,
                    item?.job_Category,
                    item?.subcategories?.subcategoryList
                  )
                }
              >
                <img
                  src={
                    item?.image ? item?.image : "/assets/images/jobcat/1.png"
                  }
                  className="image-fit"
                  alt="img"
                />
                <label className="title">{item?.job_Category}</label>
              </div>
            ))}
          </Row>
        </Container>
      </section>
      <Modal className="custom_modal job_type_modal" centered show={show} onHide={handleClose}>
        <Modal.Body>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={handleClose}
          ></button>
          <div className="job_category">
            <div className="image">
              <img
                src={"/assets/images/jobcat/2.png"}
                className="image-fit"
                alt="img"
              />
            </div>
            <div className="text">
              <h5 className="title mb-0">{categoryName}</h5>
            </div>
          </div>
          <div className="row image_radio basic checkbox jobtype_subcategory_container">
            {/* Item */}
            {subCategory?.map((item, i) => (
              <div className="col-sm-4 col-6" key={i}>
                {/* <Formik
                    initialValues={initialValues}
                    //validationSchema={createNewPasswordSchema}
                    onSubmit={(values) => {
                      console.log("@@@values",values)
                      handleSubmit(values);
                    }}
                  > 	{(formik) => {
                    return ( */}
                <div
                  className="form-group"
                  key={`index${item?.job_Subcategory_Id}`}
                >
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name={item?.job_Subcategory}
                      id={`index${item?.job_Subcategory_Id}`}
                      value={item?.job_Subcategory}
                      onChange={handleInputChange}
                      disabled={item?.disable}
                    // checked={handleSubcategoryCheck}
                    //onChange={(e) => formik.setFieldValue('jobCategory', e.target.value)}
                    // defaultChecked
                    />
                    <label
                      className="form-check-label check-label"
                      htmlFor={`index${item?.job_Subcategory_Id}`}
                    >
                      <span className="icon">
                        <img
                          src={"/assets/images/icons/checkbox/inactive.svg"}
                          alt="icon"
                        />
                        <img
                          src={"/assets/images/icons/checkbox/active.svg"}
                          alt="icon"
                        />
                      </span>
                      <div className="text">{item?.job_Subcategory}</div>
                    </label>
                  </div>
                </div>

                {/* )
                  }}
                  </Formik> */}
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-warning w-50 d-block mx-auto"
            type="button"
            onClick={handleSubmit}
          >
            Continue <i className="fal fa-long-arrow-right"></i>
          </button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default SelectJobType;

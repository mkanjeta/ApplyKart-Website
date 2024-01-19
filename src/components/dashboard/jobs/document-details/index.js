import { Fragment } from "react";
import Sidebar from "components/shared/sidebar";
import Head from "next/head";
import { container, Row, Modal } from "react-bootstrap";
import TopBar from "components/shared/topbar";
import Router, { useRouter } from "next/router";
import { useState } from "react";
// For map
import dynamic from "next/dynamic";
import { uploadDocuments } from "redux/actions/jobBrowse";
import { useDispatch } from "react-redux";
import { showErrorMessage } from "constants/ShowError";
import { toggleHamburger } from "helper/helper";

const DocumentDetails = () => {
  const dispatch = useDispatch();
  const [docs, setDocs] = useState(null);
  const history = Router;
  const onClick = () => history.push("/jobs/details");

  // modal design data
  const router = useRouter();
  const [modalShow, setModalShow] = useState(false);
  const [numABN, setNumABN] = useState(null);
  const [numACN, setNumACN] = useState(null);
  const [imageABN, setImageABN] = useState(null);
  const [imageACN, setImageACN] = useState(null);
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [showImage, setImageShow] = useState(false);
  const [imageShowACN, setImageShowACN] = useState(false);
  const [frontImageShow, setFrontImageShow] = useState(false);
  const [backImageShow, setBackImageShow] = useState(false);
  const [medicareShow, setMedicareShow] = useState(false);
  const [medicare, setMedicare] = useState(null);
  const [ACNImage, setACNImage] = useState(null);
  const [ABNImage, setABNImage] = useState(null);
  const [front, setFront] = useState(null);
  const [back, setBack] = useState(null);
  const [medico, setMedico] = useState(null);
  const [error, setError] = useState(() => "");
  const [errorNumABN, setErrorNumABN] = useState(() => "");
  const [errorNumACN, setErrorNumACN] = useState(() => "");
  const modalClose = () => setModalShow(false);
  const modalOpen = () => {
    setModalShow(true);
  };
  const uploadFile = (file, type) => {
    if (!file) return;
    if (type == "ABNImage") {
      setABNImage(file);
      setImageABN(URL.createObjectURL(file));
      setImageShow(true);
    } else if (type == "ACNImage") {
      setACNImage(file);
      setImageACN(URL.createObjectURL(file));
      setImageShowACN(true);
    } else if (type == "frontImage") {
      setFront(file);
      setFrontImage(URL.createObjectURL(file));
      setFrontImageShow(true);
    } else if (type == "backImage") {
      setBack(file);
      setBackImage(URL.createObjectURL(file));
      setBackImageShow(true);
    } else if (type == "medicare") {
      setMedico(file);
      setMedicare(URL.createObjectURL(file));
      setMedicareShow(true);
    }
  };
  const handleSubmit = () => {
    if (!docs || docs == "") {
      showErrorMessage("docs are required", setError);
      return;
    }
    if (!numABN || numABN == "") {
      showErrorMessage("ABN number is required", setErrorNumABN);
      return;
    }
    if (!numACN || numACN == "") {
      showErrorMessage("ACN number is required", setErrorNumACN);
      return;
    }
    if (numABN && numACN && frontImage && backImage && medicare) {
      modalOpen();
    } else {
      modalOpen();
    }
  };
  const handleFinalSubmit = () => {
    const obj = {
      user_id: 14,
      company: "Tech Ahead",
      owner: "Vikas",
      website: "tech-ahead.com",
      location: "delhi",
      abn: numABN,
      abn_doc: typeof ABNImage == "object" ? ABNImage?.name : null,
      acn: numACN,
      acn_doc: typeof ACNImage ? ACNImage?.name : null,
      aus_Driving_License_Front: typeof front ? front?.name : null,
      aus_Driving_License_Back: typeof back ? back?.name : null,
      medicard_Front: typeof medico ? medico?.name : null,
      images: {
        abn_doc: ABNImage,
        acn_doc: ACNImage,
        aus_Driving_License_Front: front,
        aus_Driving_License_Back: back,
        medicard_Front: medico,
      },
    };
    if (numABN && numACN && frontImage && backImage && medicare) {
      dispatch(uploadDocuments(obj));
      modalClose();
      router?.push("/dashboard");
    }
  };

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
            <div className="col-xl-6 col-md-6 col-lg-6 col-xs-12">
              <div className="dashboard_title_bar">
                <h3 className="title">Upload Documents</h3>
              </div>
              {/* Job Box */}
              <form className="formpostjob" action="">
                <Row>
                  <div className="d-flex space-between">
                    <div className="form-group checkbox">
                      <label className="label">
                        <input
                          type="radio"
                          name="role"
                          value="individual"
                          onChange={(e) => {
                            setDocs(e.target.value);
                          }}
                          checked={docs == "individual" && "checked"}
                        />
                        individual
                      </label>
                    </div>

                    <div className="form-group checkbox">
                      <label className="label">
                        <input
                          type="radio"
                          name="role"
                          value="agency"
                          onChange={(e) => {
                            setDocs(e.target.value);
                          }}
                          checked={docs == "agency" && "checked"}
                        />
                        Agency
                      </label>
                    </div>
                    {error ? (
                      <div style={{ color: "tomato" }}>{error}</div>
                    ) : null}
                  </div>
                </Row>
                <Row>
                  <div className="col-md-12 col-lg-12 col-xs-12">
                    <div className="form-group">
                      <label className="label">ABN Number</label>
                      <input
                        type="text"
                        name="abndoc"
                        value={numABN}
                        onChange={(e) => setNumABN(e.target.value)}
                        className="form-control uppercase"
                        placeholder="123456789"
                        minLength="8"
                        maxLength="20"
                      />
                    </div>
                    {errorNumABN ? (
                      <div style={{ color: "tomato" }}>{errorNumABN}</div>
                    ) : null}
                  </div>
                </Row>
                <Row className="mt-2">
                  <div className="d-flex space-between center-items">
                    <div>
                      <label className="label">ABN Document</label>
                    </div>
                    <div>
                      <input
                        type="file"
                        name="image"
                        className="fileupload hidden-data"
                        onChange={(e) =>
                          // getVideoDuration(e.target.files, setFieldValue);
                          uploadFile(e.target.files[0], "ABNImage")
                        }
                        //value=''
                        id="file-uploadone"
                      />
                      {/* <label htmlFor='file-uploadone' className='files-upload-data d-none'>
                                                        <img 
                                                        src='../assets/images/icons/camera.png'
                                                        className="img-fluid"
                                                        alt="Logo"
                                                    /> Attach Image</label>
                                                    <div className='uploaded-img'>
                                                        <i className='fas fa-times-circle'></i>
                                                    <img 
                                                        src='../assets/images/jobcat/abn-document.png'
                                                        className="img-fluid"
                                                        alt="data"
                                                    />
                                                    </div> */}
                      {showImage ? (
                        <>
                          <i
                            className="fas fa-times-circle"
                            onClick={() => setImageShow()}
                          ></i>
                          <label
                            htmlFor="file-uploadone"
                            className="files-upload-data "
                          >
                            <div className="uploaded-img">
                              <img
                                src={
                                  imageABN ||
                                  "../assets/images/jobcat/abn-document.png"
                                }
                                className="img-fluid"
                                alt="data"
                              />
                            </div>{" "}
                          </label>
                        </>
                      ) : (
                        <label
                          htmlFor="file-uploadone"
                          className="files-upload-data "
                        >
                          <img
                            src="../assets/images/icons/camera.png"
                            className="img-fluid"
                            alt="Logo"
                          />{" "}
                          Attach Image
                        </label>
                      )}
                    </div>
                  </div>
                </Row>
                <hr />

                <Row>
                  <div className="col-md-12 col-lg-12 col-xs-12">
                    <div className="form-group">
                      <label className="label">ACN Number</label>
                      <input
                        type="text"
                        name="acndoc"
                        value={numACN}
                        onChange={(e) => setNumACN(e.target.value)}
                        className="form-control uppercase"
                        placeholder="123456789"
                        minLength="8"
                        maxLength="20"
                      />
                    </div>
                    {errorNumACN ? (
                      <div style={{ color: "tomato" }}>{errorNumACN}</div>
                    ) : null}
                  </div>
                </Row>
                <Row className="mt-2">
                  <div className="d-flex space-between center-items">
                    <div>
                      <label className="label">ACN Document</label>
                    </div>
                    <div>
                      <input
                        type="file"
                        name="image"
                        className="fileupload hidden-data"
                        onChange={(e) => {
                          // getVideoDuration(e.target.files, setFieldValue);
                          uploadFile(e.target.files[0], "ACNImage");
                        }}
                        id="file-uploadtwo"
                      />
                      {imageShowACN ? (
                        <>
                          <i
                            className="fas fa-times-circle"
                            onClick={() => setImageShowACN(false)}
                          ></i>
                          <label
                            htmlFor="file-uploadtwo"
                            className="files-upload-data "
                          >
                            <div className="uploaded-img">
                              <img
                                src={
                                  imageACN ||
                                  "../assets/images/jobcat/abn-document.png"
                                }
                                className="img-fluid"
                                alt="data"
                              />
                            </div>{" "}
                          </label>
                        </>
                      ) : (
                        <label
                          htmlFor="file-uploadtwo"
                          className="files-upload-data "
                        >
                          <img
                            src="../assets/images/icons/camera.png"
                            className="img-fluid"
                            alt="Logo"
                          />{" "}
                          Attach Image
                        </label>
                      )}
                      {/* <label htmlFor='file-uploadtwo' className='files-upload-data '>
                                                <img
                                                    src='../assets/images/icons/camera.png'
                                                    className="img-fluid"
                                                    alt="Logo"
                                                /> Attach Image</label>
                                            <div className='uploaded-img d-none'>
                                                <i className='fas fa-times-circle'></i>
                                                <img
                                                    src={imageACN}
                                                    className="img-fluid"
                                                    alt="data"
                                                />
                                            </div> */}
                    </div>
                  </div>
                </Row>
                <hr />
                <Row className="mt-2">
                  <label className="label">Australian Driving License</label>
                  <div className="d-flex space-between center-items">
                    <div>
                      <label className="label">Front</label>
                    </div>
                    <div>
                      <input
                        type="file"
                        name="image"
                        className="fileupload hidden-data"
                        onChange={(e) => {
                          // getVideoDuration(e.target.files, setFieldValue);
                          uploadFile(e.target.files[0], "frontImage");
                        }}
                        id="file-upload-front"
                      />
                      {frontImageShow ? (
                        <>
                          <i
                            className="fas fa-times-circle"
                            onClick={() => setFrontImageShow(false)}
                          ></i>
                          <label
                            htmlFor="file-upload-front"
                            className="files-upload-data "
                          >
                            <div className="uploaded-img">
                              <img
                                src={
                                  frontImage ||
                                  "../assets/images/jobcat/licence.jpg"
                                }
                                className="img-fluid"
                                alt="data"
                              />
                            </div>{" "}
                          </label>
                        </>
                      ) : (
                        <label
                          htmlFor="file-upload-front"
                          className="files-upload-data "
                        >
                          <img
                            src="../assets/images/icons/camera.png"
                            className="img-fluid"
                            alt="Logo"
                          />{" "}
                          Attach Image
                        </label>
                      )}
                      {/* <label htmlFor='file-upload-front' className='files-upload-data d-none'>
                                                <img
                                                    src='../assets/images/icons/camera.png'
                                                    className="img-fluid"
                                                    alt="Logo"
                                                /> Attach Image</label>
                                            <div className='uploaded-img '>
                                                <i className='fas fa-times-circle'></i>
                                                <img
                                                    src='../assets/images/jobcat/licence.jpg'
                                                    className="img-fluid"
                                                    alt="data"
                                                />
                                            </div> */}
                    </div>
                  </div>
                  <div className="d-flex space-between center-items mt-3">
                    <div>
                      <label className="label">Back</label>
                    </div>
                    <div>
                      <input
                        type="file"
                        name="image"
                        className="fileupload hidden-data"
                        onChange={(e) => {
                          // getVideoDuration(e.target.files, setFieldValue);
                          uploadFile(e.target.files[0], "backImage");
                        }}
                        id="file-upload-back"
                      />
                      {backImageShow ? (
                        <>
                          <i
                            className="fas fa-times-circle"
                            onClick={() => setBackImageShow(false)}
                          ></i>
                          <label
                            htmlFor="file-upload-back"
                            className="files-upload-data "
                          >
                            <div className="uploaded-img">
                              <img
                                src={
                                  backImage ||
                                  "../assets/images/jobcat/licence.jpg"
                                }
                                className="img-fluid"
                                alt="data"
                              />
                            </div>{" "}
                          </label>
                        </>
                      ) : (
                        <label
                          htmlFor="file-upload-back"
                          className="files-upload-data "
                        >
                          <img
                            src="../assets/images/icons/camera.png"
                            className="img-fluid"
                            alt="Logo"
                          />{" "}
                          Attach Image
                        </label>
                      )}
                    </div>
                  </div>
                </Row>
                <hr />

                <Row className="mt-2">
                  <label className="label">Australian Driving License</label>
                  <div className="d-flex space-between center-items">
                    <div>
                      <label className="label">Front</label>
                    </div>
                    <div>
                      <input
                        type="file"
                        name="image"
                        className="fileupload hidden-data"
                        onChange={(e) => {
                          // getVideoDuration(e.target.files, setFieldValue);
                          uploadFile(e.target.files[0], "medicare");
                        }}
                        id="file-upload-medicare"
                      />
                      {medicareShow ? (
                        <>
                          <i
                            className="fas fa-times-circle"
                            onClick={() => setMedicareShow(false)}
                          ></i>
                          <label
                            htmlFor="file-upload-medicare"
                            className="files-upload-data "
                          >
                            <div className="uploaded-img">
                              <img
                                src={
                                  medicare ||
                                  "../assets/images/jobcat/licence.jpg"
                                }
                                className="img-fluid"
                                alt="data"
                              />
                            </div>{" "}
                          </label>
                        </>
                      ) : (
                        <label
                          htmlFor="file-upload-medicare"
                          className="files-upload-data "
                        >
                          <img
                            src="../assets/images/icons/camera.png"
                            className="img-fluid"
                            alt="Logo"
                          />{" "}
                          Attach Image
                        </label>
                      )}
                      {/* <label htmlFor='file-upload-medicare' className='files-upload-data d-none'>
                                                <img
                                                    src='../assets/images/icons/camera.png'
                                                    className="img-fluid"
                                                    alt="Logo"
                                                /> Attach Image</label>
                                            <div className='uploaded-img '>
                                                <i className='fas fa-times-circle'></i>
                                                <img
                                                    src='../assets/images/jobcat/licence.jpg'
                                                    className="img-fluid"
                                                    alt="data"
                                                />
                                            </div> */}
                    </div>
                  </div>
                </Row>
                <div className="text-center mt-5 mb-5">
                  <button
                    type="button"
                    className="btn btn-warning mx-auto w-50"
                    onClick={handleSubmit}
                  >
                    Submit <i className="fal fa-long-arrow-right"></i>
                  </button>
                </div>
              </form>
              {/* Job Box */}
            </div>
          </div>
        </div>
        <div
          className="sidebar-overlay"
          id="sidebar-overlay"
          onClick={toggleHamburger}
        />{" "}
      </main>

      {/* Modal for the ACN/ABN */}

      <Modal
        size="md"
        className="custom_modal"
        centered
        show={modalShow}
        onHide={modalClose}
      >
        <Modal.Header className="justify-center">
          <Modal.Title className="fw-600 text-center">
            {numABN && numACN && frontImage && backImage && medicare
              ? "Admin Approval Pending "
              : "ACN/ABN Updation"}
          </Modal.Title>
          <button
            type="button"
            className="btn-close m-0"
            aria-label="Close"
            onClick={modalClose}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <div className="text-data-modal text-center">
            <label className="form-check-label justify-content-start mb-2 text-black fw-500">
              <span className="m-3">
                {numABN && numACN && frontImage && backImage && medicare
                  ? "Enable notification for a job that you have posted and also that your job will be posted once our team has verified your posting!"
                  : "Mentioning your ABN/ACN will increase the chances of job applicants applying for jobs by 30% and let them post directly to your jobs!"}
              </span>
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            className="btn btn-warning mx-auto w-75"
            onClick={handleFinalSubmit}
          >
            Update <i className="fal fa-long-arrow-right"></i>
          </button>
        </Modal.Footer>
      </Modal>
      {/* <Modal size="md" className="custom_modal" centered show={modalShowData} onHide={modalCloseData}>
                <Modal.Header className='justify-center'>
                    <Modal.Title className='fw-600 text-center'>ACN/ABN Updation</Modal.Title>
                    <button
                        type="button"
                        className="btn-close m-0"
                        aria-label="Close"
                        onClick={modalCloseData}
                    ></button>
                </Modal.Header>
                <Modal.Body>
                    <div className='text-data-modal text-center'>
                        <label className="form-check-label justify-content-start mb-2 text-black fw-500">

                            <span className='m-3'>Mentioning your ABN/ACN will increase the chances of job applicants applying for jobs by 30% and let them post directly to your jobs!</span>
                        </label>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className='btn btn-warning mx-auto w-75'>Update <i className="fal fa-long-arrow-right"></i></button>
                </Modal.Footer>
            </Modal> */}
    </Fragment>
  );
};

export default DocumentDetails;

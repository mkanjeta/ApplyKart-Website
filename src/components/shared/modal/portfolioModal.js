import FileUpload from "components/fileUploader";
import { BASE_URL } from "constants/constants";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getJobSeekerDetail,
  getPortfolioData,
  postPortfoliaData,
  updatePortfolioData,
} from "redux/actions/workActions";

const Portfolio = ({ showModal, onClose, portfolioModal }) => {
  // console.log();
  const { portfolioUpdated } = useSelector(
    ({ vcardWorkReducer }) => vcardWorkReducer
  );
  // console.log("PortfolioModal", portfolioModal);
  const dispatch = useDispatch();
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [imageUrlData, setImageUrlData] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [imageShow, setImageShow] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [seekerId, setSeekerId] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const applyKart = localStorage.getItem("applyKart");
      if (applyKart) {
        const { userId } = JSON.parse(applyKart);
        setSeekerId(userId);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (portfolioModal?.type == "edit") {
      setTitle(portfolioModal?.portfolio?.title);
      setDescription(portfolioModal?.portfolio?.description);
      setImageUrlData(portfolioModal?.portfolio?.image);
    }
    //setImageShow(true)
  }, [portfolioModal]);

  const handleSave = () => {
    const obj1 = {
      user_id: seekerId,
      title: title,
      description: description,
      image: fileName.name || imageUrlData,
      file: fileName,
    };
    if (portfolioModal?.type == "edit") {
      const obj = {
        portfolio_id: portfolioModal?.id,
        title: title,
        description: description,
        image: fileName.name || imageUrlData,
        file: fileName,
      };
      dispatch(updatePortfolioData(obj));
    } else if (portfolioModal?.type == "create") {
      dispatch(postPortfoliaData(obj1));

      setTimeout(() => {
        dispatch(getPortfolioData());
      }, 1000);
    }
    onClose();
  };

  const handleImageData = (file) => {
    setFileName(file);
    setImageFile(URL.createObjectURL(file));
    setImageShow(true);
  };
  const removeImage = (e) => {
    e.stopPropagation();
    setImageShow(false);
  };
  useEffect(() => {
    // console.log("imageShow", imageShow);
  });

  return (
    <>
      <Modal
        className="custom_modal"
        centered
        show={showModal}
        onHide={onClose}
      >
        <Modal.Body>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={onClose}
          ></button>
          <div className="job_category justify-content-center">
            <div className="text text-center">
              <h5 className="title mb-0">My Portfolio</h5>
            </div>
          </div>
          <form>
            <div className="form-group">
              <label className="text-black fw-bold mb-2">Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
              />
            </div>
            <div className="form-group">
              <label className="text-black fw-bold mb-2">Description</label>
              <input
                type="text"
                name="description"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write here..."
                required
              />
            </div>
            <div className="form-group image_choose">
              <label className="text-black fw-bold mb-0">Add Image</label>
              {/* { !imageShow ?
                                <label className="image_area input" htmlFor="updateImage" >
                                    <img src={"/assets/images/icons/camera.png"} />
                                    Attach Image
                                    <FileUpload fileData={"image"} dataId={"updateImage"} handleImageData={handleImageData} />
                                    
                                </label>
                                :
                                <label className="image_area image" htmlFor="addimage">
                                    <button type="button" className="remove" onClick={(e) => removeImage(e)}>x</button>
                                    <img src={imageFile || imageUrlData || "/assets/images/video_thumb.png"} />
                                </label>
                            } */}
              {!imageShow ? (
                <label className="image_area input" htmlFor="updateImage">
                  <img src={"/assets/images/icons/camera.png"} />
                  Attach Image
                  <FileUpload
                    fileData={"image"}
                    dataId={"updateImage"}
                    handleImageData={handleImageData}
                  />
                  {/* <input type="file" id="addimage" name="image" onChange={handleFileChange} required /> */}
                </label>
              ) : (
                <label className="image_area image" htmlFor="addimage">
                  <button
                    type="button"
                    className="remove"
                    onClick={(e) => removeImage(e)}
                  >
                    x
                  </button>
                  <img
                    src={
                      imageFile ||
                      imageUrlData ||
                      "/assets/images/video_thumb.png"
                    }
                  />
                </label>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-warning w-50 d-block mx-auto"
            type="button"
            onClick={handleSave}
          >
            Save <i className="fal fa-long-arrow-right"></i>
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Portfolio;

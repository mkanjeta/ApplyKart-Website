import { useEffect, useState } from "react";
import { Container, Dropdown, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { reportContent } from "redux/actions/timelineActions";

const ReportPost = ({contentId, reportType}) => {

    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const { reportSuccess, loading } = useSelector(({ timelineReducer }) => timelineReducer);

    const [id, setId] = useState(null);
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleClose = () => {
        setShow(false);
    }

    useEffect(() => {
        if(reportSuccess){
            dispatch({type: 'RESET_REPORT_CONTENT'});
            setShow(false)
        }
    }, [reportSuccess])
    

    const options = [
        {
            id: 1,
            label: 'Inappropriate Content'
        },
        {
            id: 2,
            label: 'Abusive Content'
        },
        {
            id: 3,
            label: 'Spam'
        },
        {
            id: 4,
            label: 'Others'
        },

];

const handleSubmit = () => {
    setError('');

    if(!id){
        setError('select a issue');
        return;
    } else if (id == 4 && !description){
        setError('please write your issue')
        return;
    }

    let obj = {
        "Id": contentId,
        "issueId": id,    
        "reportTypeId": reportType
    };
    dispatch(reportContent(obj));
}

    return (
        <>
       <Dropdown.Item onClick={(e) => setShow(true)}>Report</Dropdown.Item>
        <Modal
        size="md"
        className="custom_modal"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title className="fw-600">Why are you reporting?</Modal.Title>
          <button
            type="button"
            className="btn-close m-0"
            aria-label="Close"
            onClick={handleClose}
          ></button>
        </Modal.Header>
        {/* {console.log(id)} */}
        <Modal.Body>
          <form className="setavailablity image_radio basic checkbox p-4">
            {
                options?.map((item, index) => (
                    <div className="form-group" key={index}>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name={`hiringFor${item?.id}`}
                          id={`typeOne${index}`}
                          onChange={(e) => {
                              setId(item?.id);
                          }}
                          checked={item?.id == id ? true : false}
                          style={{display: 'block'}}
                        />
                        <label
                          className="form-check-label justify-content-start mb-2 text-black fw-500"
                          htmlFor={`typeOne${index}`}
                        >                        
                          {item?.label}
                        </label>
                      </div>
                  </div>
                ))
            }
            {
                id == 4 ?
                <>
                <textarea rows={4} value={description}
                onChange={(e) => {setDescription(e?.target?.value)}}
                ></textarea>
                </>
                :
                <></>
            }
            {error && <span style={{color: 'red'}}>{error}</span>}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-warning mx-auto w-75"
            disabled={loading}
          >
          {loading ? 'please wait....' : 'Report'}
          </button>
        </Modal.Footer>
      </Modal>
        </>
    )
}

export default ReportPost;
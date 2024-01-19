import React, {useState} from 'react'
// import { Dropdown, NavLink } from "react-bootstrap";
// import { Watch } from "react-loader-spinner";
import { Container, Modal, Row } from "react-bootstrap";
import {
  getMessageList,
  deleteAChat,
} from "redux/actions/workActions";
import { useDispatch } from 'react-redux';

const ChatUsers = ({
  messageListData,
  details,
  selectedChatChannel,
  setSelectedChatChannel
}) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [deleteItem, setDelItem] = useState(null);
  const [disable, setDisable] = useState(false);
  // let userTypeId = localStorage.getItem("userTypeId");
  // const [messages, addMessage] = useState([]);
  console.log(messageListData)
  // console.log(messages)
  // console.log(selectedChatChannel)

  const deleteChat = async (item) => {
    // console.log(item);
    let obj = {
      initiatorId: item.initiator_id,
      responderId: item.responder_id,
      channelId: item.channelId,
    };

    dispatch(deleteAChat(obj));
    dispatch(getMessageList());
    setDelItem(null);
    setDisable(true);

    setTimeout(() => {
      setShow(false);
      setDisable(false);
    },1500);
  };

  const handleItemSelect = (item) => {
    // console.log(item)
    setSelectedChatChannel(item)
  }

  return (
    <>
      <div className="ch_users">
        <ul className="user_list">
          {
            messageListData?.messages?.length > 0 && messageListData?.messages?.map((item) => {
              return (
                <>
                  <li className={`item ${(selectedChatChannel?.channelId == item?.channelId) ? "item-selected" : ""}`} onClick={() => handleItemSelect(item)}>
                    <div className='d-flex w-100 p-2'>
                      {/* <div className='d-flex u_list'> */}
                      <div className="image">
                        <img
                          src={
                            item?.profile_pic ||
                            details?.user?.profile_pic ||
                            "/assets/images/posted_user.png"
                          }
                          alt="img"
                          className="image-fit"
                        />
                      </div>
                      {/* </div> */}

                      <div className="text_bo">
                        <h6 className="name mb-0 text-capitalize" style={{ lineHeight: "45px" }}>
                          {item?.first_Name
                            ? `${item?.first_Name} ${item?.last_Name}`
                            : "" || details?.user?.first_Name
                              ? `${details?.user?.first_Name} ${details?.user?.last_Name}`
                              : "Vernon Bradley"}
                        </h6>
                      </div>
                    </div>
                    <div className='user-list-dropdown mx-3'>
                      {/* <Dropdown align="end">
                        <Dropdown.Toggle id="dropdown-autoclose-true" as={NavLink}>
                          <span />
                          <span />
                          <span />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => deleteChat(item)} href="#">
                            Delete
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="#"
                            onClick={() => {
                              setChatStatus(
                                details?.channel || latestChatdata?.channelId
                              );
                            }}
                          >
                            Close
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown> */}
                      <i className="fa fa-trash" aria-hidden="true" onClick={() => {
                        setShow(true);
                        setDelItem(item);
                      }} style={{ cursor: "pointer" }}></i>
                    </div>
                  </li>
                </>
              )
            })
          }
        </ul>
      </div>
      <Modal
        size="sm-4"
        className="custom_modal"
        centered
        show={show}
        // onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title className="fw-300">Are you sure you want to delete this chat user ?</Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>
          <form className="setavailablity image_radio basic checkbox">
           
           
          </form>
        </Modal.Body> */}
        <Modal.Footer>
            <button
              type="button"
              onClick={() => setShow(false)}
              className="btn btn-danger mx-auto w-25 mt-4"
            >
              Cancel <i className="fal fa-incorrect"></i>
            </button>
            <button
              type="submit"
              onClick={() => deleteChat(deleteItem)}
              className="btn btn-warning mx-auto w-25 mt-4"
              disabled={disable}
            >
              Continue <i className="fal fa-long-arrow-right"></i>
            </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ChatUsers;

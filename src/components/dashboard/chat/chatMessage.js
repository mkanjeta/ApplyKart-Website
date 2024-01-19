import { usePubNub } from "pubnub-react";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Dropdown, DropdownButton, NavLink } from "react-bootstrap";
import {
  getRecentMessages,
  sendMessage,
  getAllChatWithMessage,
  subscribeToChannel,
  addUUIDPubnub,
} from "components/pubnub";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessageList,
  closeAChat,
  deleteAChat,
} from "redux/actions/workActions";

const ChatMessage = ({ details, latestChatdata, chatMeta, setChatMeta }) => {
  console.log("Details", details);

  console.log("Chat Meta-->", chatMeta);

  const dispatch = useDispatch();
  const { messageListData } = useSelector(
    ({ vcardWorkReducer }) => vcardWorkReducer
  );
  const [input, setInput] = useState("");
  const pubnub = usePubNub();
  const [channels] = useState(["awesome-channel"]);
  const [messages, addMessage] = useState([]);
  const [seekerId, setSeekerId] = useState("");
  const [chatlistData, setChatlistData] = useState(null);

  console.log("messages ==>>", messages);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const applyKart = localStorage.getItem("applyKart");
      const { userId } = JSON.parse(applyKart);
      setSeekerId(userId);
    }
  }, []);
  useEffect(() => {
    dispatch(getMessageList());
  }, [details]);
  const chatListArray = useMemo(() => {
    const arr = [];
    messageListData?.messages?.forEach((element) =>
      arr.push(element?.channelId)
    );
    return arr;
  }, [messageListData]);

  const sentData = () => {
    console.log("input", input);
    addUUIDPubnub(
      pubnub,
      seekerId?.toString() || latestChatdata?.responder_id.toString()
    );
    subscribeToChannel(pubnub, chatListArray);
    sendMessage(
      pubnub,
      input,
      latestChatdata?.channelId || details?.user?.channelId
    );
    let arrayNew = messages;
    let obj;
    obj = {
      channel: latestChatdata?.channelId || details?.user?.channelId,
      message: input,
      messageType: null,
      uuid: seekerId.toString() || latestChatdata?.responder_id.toString(),
    };
    arrayNew?.push(obj);
    addMessage(arrayNew);
    dispatch(getMessageList());
    setTimeout(() => { }, 4000);
    setInput("");
  };
  useEffect(() => {
    //alert("hii")
    console.log("!!!!details", details);
    console.log(details?.user?.channelId, latestChatdata?.channelId);
    getRecentMessages(
      pubnub,
      [latestChatdata?.channelId || details?.user?.channelId],
      true,
      25
    )
      .then((res) => {
        console.log("@@@@res", res);
        addMessage(
          res.channels[latestChatdata?.channelId || details?.user?.channelId]
        );
        // alert('hello')
        setTimeout(() => {
          console.log("get Recenet Message Poster", messages);
        }, 5000);
      })
      .catch((error) => {
        console.log(error);
      });
    // pubnub.addListener({ message: handleMessage });
    // pubnub.subscribe({ channels });
  }, [details?.user?.channelId, latestChatdata?.channelId]);

  useEffect(() => {
    console.log(
      "!!!seekerId",
      seekerId,
      latestChatdata?.responder_id.toString()
    );
    if (
      (((latestChatdata?.channelId || details?.user?.channelId) && seekerId) ||
        latestChatdata?.responder_id.toString()) &&
      pubnub
    ) {
      console.log("!!!seekerId1", seekerId);
      addUUIDPubnub(
        pubnub,
        seekerId?.toString() || latestChatdata?.responder_id.toString()
      );

      const listener = {
        // <-- extract the listener

        message: (messages) => {
          if (messages) {
            setTimeout(() => {
              //getRecentMessages();
              getRecentMessages(
                pubnub,
                [latestChatdata?.channelId || details?.user?.channelId],
                true,
                25
              )
                .then((res) => {
                  console.log("@@@@res", res);
                  addMessage(
                    res.channels[
                    latestChatdata?.channelId || details?.user?.channelId
                    ]
                  );
                  // alert('hello')
                  setTimeout(() => {
                    console.log("get Recenet Message Poster", messages);
                  }, 5000);
                })
                .catch((error) => {
                  console.log(error);
                });
            }, 1000);
          }
        },
      };

      pubnub.addListener(listener); // <-- pass the listener here

      pubnub.subscribe({
        channels: [latestChatdata?.channelId || details?.user?.channelId],
      });
      getRecentMessages();

      return function cleanup() {
        pubnub.removeListener(listener); // <-- pass the same listener here

        pubnub.unsubscribeAll();
      };
    }
  }, [
    details?.user?.channelId,
    latestChatdata?.channelId,
    latestChatdata?.responder_id,
    pubnub,
  ]);

  const setChatStatus = (channelId) => {
    dispatch(closeAChat({ channelId: channelId }));
    let obj = { ...chatMeta };
    obj.isActive = 0;
    setChatMeta(obj);
  };

  const deleteChat = () => {
    console.log(chatMeta);

    let obj = {
      initiatorId: chatMeta.initiator_id,
      responderId: chatMeta.responder_id,
      channelId: chatMeta.channelId,
    };

    dispatch(deleteAChat(obj));
  };

  return (
    <div className="h-100">
      <div className="chat_area">
        <div className="ch_header">
          <ul className="user_list">
            <li className="item">
              <div className="image">
                <img
                  src={
                    latestChatdata?.profile_pic ||
                    details?.user?.profile_pic ||
                    "/assets/images/posted_user.png"
                  }
                  alt="img"
                  className="image-fit"
                />
              </div>
              <div className="text_box">
                <h6 className="name mb-0">
                  {latestChatdata?.first_Name
                    ? `${latestChatdata?.first_Name} ${latestChatdata?.last_Name}`
                    : "" || details?.user?.first_Name
                      ? `${details?.user?.first_Name} ${details?.user?.last_Name}`
                      : "Vernon Bradley"}
                </h6>
              </div>
            </li>
          </ul>

          <Dropdown align="end">
            <Dropdown.Toggle id="dropdown-autoclose-true" as={NavLink}>
              <span />
              <span />
              <span />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={deleteChat} href="#">
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
          </Dropdown>
        </div>
        {/* Chat */}
        <div className="message_area">
          {messages?.map((item, i) => (
            <div
              key={i}
              className={item?.uuid == seekerId ? "sender-chat" : "user-chat"}
            >
              <div className="chat-text-box pd-5">
                {item?.uuid == seekerId ? (
                  ""
                ) : (
                  <div className="image">
                    <img
                      src={
                        latestChatdata?.profile_pic ||
                        details?.user?.profile_pic ||
                        "/assets/images/posted_user.png"
                      }
                      alt="img"
                      className="image-fit"
                    />
                  </div>
                )}
                <div className={"text_box"}>
                  <p>{item?.message || ""}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Chat */}
        <div className="ch_footer">
          {chatMeta && chatMeta.isActive ? (
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Type Here..."
                value={input}
                onKeyPress={(e) => {
                  if (e.key !== "Enter") return;
                  sentData(input);
                }}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                onClick={() => sentData(input)}
                className="input-group-append"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          ) : (
            <span>Chat Closed</span>
          )}
        </div>
      </div>
    </div>
  );
};
export default ChatMessage;
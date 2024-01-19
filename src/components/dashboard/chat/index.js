// 'use client';
import { Fragment, useEffect, useMemo, useState } from "react";
import Sidebar from "components/shared/sidebar";
import Head from "next/head";
import TopBar from "components/shared/topbar";
// import Filter from "components/shared/filter";
// import { BASE_URL } from "constants/constants";
import Router from "next/router";
// import { Button, Dropdown, DropdownButton, NavLink } from "react-bootstrap";
import { usePubNub } from "pubnub-react";
// import ChatMessage from "./chatMessage";
import { useDispatch, useSelector } from "react-redux";
import { getChatList, getMessageList } from "redux/actions/workActions";
import moment from "moment";
import { toggleHamburger } from "helper/helper";
import { useRouter } from "next/router";
import ChatUsers from "./ChatUsers";
import {
  getRecentMessages,
  sendMessage,
  getAllChatWithMessage,
  subscribeToChannel,
  addUUIDPubnub,
} from "components/pubnub";

const Chatbox = () => {
  // const history = Router;
  const router = useRouter();
  const pubnub = usePubNub();
  const dispatch = useDispatch();
  // const onClick = () => history.push("/jobs/details");
  const [seekerId, setSeekerId] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [details, setDetails] = useState("");
  // const [chatlistData, setChatlistData] = useState(null);
  // const [recentTime, setRecentTime] = useState(null);
  const [itemData, setItemData] = useState([]);
  const [userSelectedMessages, setUserSelectMessage] = useState([]);
  const [selectedChatChannel, setSelectedChatChannel] = useState({});
  const { messageListData, selectedUserChat } = useSelector(
    ({ vcardWorkReducer }) => vcardWorkReducer
  );
  const [chatMeta, setChatMeta] = useState(null);

  console.log(selectedChatChannel)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const applyKart = localStorage.getItem("applyKart");
      if (applyKart) {
        const { userId } = JSON.parse(applyKart);
        setSeekerId(userId);
      } else {
        router?.push("/login");
      }

      // document?.getElementById("message_area")?.scrollIntoView({behavior: "smooth", block:"start"});
      // .scrollIntoView({behavior: "smooth", block:"end"})
      // document?.getElementById("message_area")?.scrollTo(0, -5000)
    }
  }, []);
  useEffect(() => {
    dispatch(getChatList());
    dispatch(getMessageList());
  }, []);
  const chatListArray = useMemo(() => {
    const arr = [];
    messageListData?.messages?.forEach((element) =>
      arr.push(element?.channelId)
    );
    return arr;
  }, [messageListData, userSelectedMessages]);


  // console.log("chatListArray ==>>", chatListArray)

  useEffect(() => {
    if (messageListData) {
      setChatMeta(
        messageListData.messages[messageListData.messages.length - 1]
      );
      getMessages();
      setSelectedChatChannel(messageListData.messages[0]);
    }
  }, [messageListData]);

  const getMessages = () => {
    getAllChatWithMessage(pubnub, chatListArray, 1).then(async (res) => {
      // console.log("res ==>>", res);
      if (res && chatListArray) {
        let messages = Object.values(res?.channels);
        if (messages?.length > 0) {
          messages = messages?.map((msg) => {
            let item = msg[0];
            let userData = messageListData?.messages.filter(
              (val, index) => val.channelId == item.channel
            )[0];
            item.user = {
              first_Name: userData?.first_Name,
              last_Name: userData?.last_Name,
              message: item?.message,
              time: moment(item?.timetoken / 1000, "x").format("LT"),
              profile_pic: userData?.profile_pic,
              channelId: userData?.channelId,
            };
            return item;
          });
          const messageFilter = messages.filter(
            (val) => val?.user?.first_Name !== null
          );
          let sortedChats = messageFilter
            .sort(function (a, b) {
              return a.timetoken - b.timetoken;
            })
            .reverse();
          setItemData(sortedChats);
        } else {
          setItemData(null);
        }
      }
    });
  };

  // const latestChatdata = useMemo(() => {
  //   if (!details?.user?.message) {
  //     const data =
  //       messageListData?.messages[messageListData?.messages?.length - 1];
  //     return data;
  //   }
  // }, [messageListData?.messages, details, userSelectedMessages]);

  // const handleChat = (detail) => {
  //   setDetails(detail);
  //   let meta = messageListData.messages.find(
  //     (item) => detail.channel == item.channelId
  //   );
  //   setChatMeta(meta);
  // };

  // console.log("item data ==>>", itemData);

  // console.log("userSelectedMessages ==>>", userSelectedMessages)

  const sentData = () => {
    // console.log("input", input);
    addUUIDPubnub(
      pubnub,
      seekerId?.toString() || selectedChatChannel?.responder_id.toString()
    );
    subscribeToChannel(pubnub, chatListArray);
    sendMessage(
      pubnub,
      input,
      selectedChatChannel?.channelId || details?.user?.channelId
    );
    let arrayNew = messages;
    let obj;
    obj = {
      channel: selectedChatChannel?.channelId || details?.user?.channelId,
      message: input,
      messageType: null,
      uuid: seekerId.toString() || selectedChatChannel?.responder_id.toString(),
    };
    arrayNew?.push(obj);
    // addMessage(arrayNew);
    dispatch(getMessageList());
    setTimeout(() => { }, 4000);
    setInput("");
  };

  useEffect(() => {
    dispatch({ type: "SELECT_USER_CHAT", payload: [] })
    getRecentMessages(
      pubnub,
      [selectedChatChannel?.channelId || details?.user?.channelId],
      true,
      25
    )
      .then((res) => {
        // console.log("@@@@res", res);
        // console.log(Object.keys(res))
        if (Object.keys(res).length > 0) {
          // console.log("res ==>>", res)
          dispatch({ type: "SELECT_USER_CHAT", payload: res.channels[selectedChatChannel?.channelId || details?.user?.channelId] })
          setTimeout(() => {
            console.log("get Recenet Message Poster", messages);
          }, 5000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [details?.user?.channelId, selectedChatChannel?.channelId]);

  useEffect(() => {
    // console.log(
    //   "!!!seekerId",
    //   seekerId,
    //   latestChatdata?.responder_id.toString()
    // );
    // console.log("hello")
    if (
      (((selectedChatChannel?.channelId || details?.user?.channelId) && seekerId)) &&
      pubnub.addListener
    ) {
      console.log("!!!seekerId1", seekerId);
      addUUIDPubnub(
        pubnub,
        seekerId?.toString() || selectedChatChannel?.responder_id?.toString()
      );

      const listener = {
        // <-- extract the listener

        message: (messages) => {
          if (messages) {
            setTimeout(() => {
              //getRecentMessages();
              getRecentMessages(
                pubnub,
                [selectedChatChannel?.channelId || details?.user?.channelId],
                true,
                25
              )
                .then((res) => {
                  // console.log("@@@@res", res);
                  // console.log(Object.keys(res))
                  if (Object.keys(res).length > 0) {
                    // console.log("res ==>>", res)
                    dispatch({ type: "SELECT_USER_CHAT", payload: res.channels[selectedChatChannel?.channelId || details?.user?.channelId] })
                    setTimeout(() => {
                      console.log("get Recenet Message Poster", messages);
                    }, 5000);
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            }, 1000);
          }
        },
      };

      pubnub?.addListener(listener); // <-- pass the listener here

      pubnub?.subscribe({
        channels: [selectedChatChannel?.channelId || details?.user?.channelId],
      });
      getRecentMessages();

      return function cleanup() {
        pubnub?.removeListener(listener); // <-- pass the same listener here

        pubnub?.unsubscribeAll();
      };
    }
  }, [
    details?.user?.channelId,
    selectedChatChannel?.channelId,
    pubnub
  ]);

  console.log("selectedUserChat ==>>", selectedUserChat)

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
            <div className="col-xl-12">
              <div className="dashboard_title_bar">
                <h3 className="title">Message</h3>
              </div>
            </div>
          </div>
          {/* Content Box */}
          {messageListData?.messages.length > 0 ? (
            <div className="row chat_box g-0">

              <div className="col-xl-4 col-md-7 col-sm-12 user_list_container">
                <ChatUsers
                  messageListData={messageListData}
                  details={details}
                  seekerId={seekerId}
                  setSelectedChatChannel={setSelectedChatChannel}
                  selectedChatChannel={selectedChatChannel}
                />
                {/* <ChatMessage
                  details={details}
                  latestChatdata={latestChatdata}
                  chatMeta={chatMeta}
                  setChatMeta={setChatMeta}
                /> */}
              </div>

              <div className="col-xl-8 col-md-5 col-sm-12 user_area_container">
                <div className="user_area" id="user_area">
                  {/* <form>
                    <div className="input-group mb-xl-20">
                      <span className="input-group-prepend">
                        <i className="bi-search" />
                      </span>
                      <input
                        type="text"
                        className="form-control rounded-3"
                        placeholder="Search message or user"
                        required
                      />
                    </div>
                  </form> */}
                  {/* <ul className="user_list"> */}
                  <div className="message_area" id="message_area">
                    {
                      selectedUserChat?.map((item, i) => {
                        return (
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
                                      selectedChatChannel?.profile_pic ||
                                      "/assets/images/default-user.png"
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
                        )
                      })
                    }
                  </div>

                  {
                    (selectedUserChat?.length > 1) || (selectedUserChat?.length == 0) || 
                    (selectedUserChat?.length == 1 && selectedUserChat[0]["uuid"] != seekerId) ? (
                      <div className="send_btn_container">
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
                      <div className="text-center my-2">Please wait for responder reply.</div>
                    )
                  }
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-5 pb-5">no chat data</div>
          )}
          {/* Content Box */}
        </div>
        <div
          className="sidebar-overlay"
          id="sidebar-overlay"
          onClick={toggleHamburger}
        />{" "}
      </main>
    </Fragment>
  );
};

export default Chatbox;
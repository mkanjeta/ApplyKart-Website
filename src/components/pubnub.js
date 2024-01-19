import { async } from "@babel/runtime/regenerator";
import { pubNubPublishKey, pubNubSubscribeKey } from "constants/constants";
import PubNub from "pubnub";

// Add UUID to pubnub
export const addUUIDPubnub = (pubnub, id) => {
  if (pubnub && typeof pubnub?.setUUID == "function") {
    pubnub?.setUUID(id);
  } else {
    pubnub = new PubNub({
      subscribeKey: pubNubSubscribeKey,
      publishKey: pubNubPublishKey,
      uuid: id,
      autoNetworkDetection: true, // enable for non-browser environment automatic reconnection
      restore: true,
    });
  }
};

// set user meta data
export const setChatUserMetaData = (pubnub, userData) => {
  pubnub.objects.setUUIDMetadata({
    data: {},
  });
};

// subscribe to chat channels
export const subscribeToChannel = (pubnub, channels) => {
  console.log("channels ==>>", channels)
  pubnub?.subscribe({ channels: channels });
};

// Get Chat List with 1 message

export const getAllChatWithMessage = async (
  pubnub,
  channels,
  count,
  prevMsgToken,
  lastDeleteTokenTime
) => {
  if (channels?.length > 0) {
    let obj = {
      channels: channels,
      count: count,
    };
    if (prevMsgToken) {
      obj.start = prevMsgToken;
    }
    if (lastDeleteTokenTime) {
      obj.end = lastDeleteTokenTime;
    }
    return pubnub?.fetchMessages(obj);
  }
};

// Get messages for chat room
export const getRecentMessages = async (
  pubnub,
  channels,
  includeMessageActions,
  count,
  prevMsgToken,
  lastDeleteTokenTime
) => {
  if (channels?.length > 0) {
    let obj = {
      channels: channels,
      count: count,
      includeMessageActions: includeMessageActions,
    };
    if (prevMsgToken) {
      obj.start = prevMsgToken;
    }
    if (lastDeleteTokenTime) {
      obj.end = lastDeleteTokenTime;
    }
    // console.log(obj);

    return pubnub?.fetchMessages(obj);
  }
};

// Get unread message counts
export const getUnreadMessageCounts = async (
  pubnub,
  channels,
  channelTimetokens
) => {
  return pubnub.messageCounts({
    channels: channels,
    channelTimetokens: channelTimetokens,
  });
};

// remove chat listeners
export const removeChatListeners = async (pubnub) => {
  await pubnub.removeListener({
    message: function (p) {},
  });
};

// send message to a channel
export const sendMessage = async (pubnub, publishMessage, channelName) => {
  if (publishMessage) {
    let messageSize = calculatePayloadSize(channelName, publishMessage);
    if (messageSize < 32768) {
      pubnub
        .publish({
          channel: channelName,
          message: publishMessage,
          messageType: 0,
        })
        .then((res) => {
          // console.log("message Response", res)
        })
        .catch((err) => console.log("chat error ==>>", err));
    } else {
      Toast.show({
        text1: "Messsage too log...",
      });
    }
  }
};
// calculate payload size of a message
const calculatePayloadSize = (channel, message) => {
  return encodeURIComponent(channel + JSON.stringify(message)).length + 100;
};
// Set membership data
// used to set last read time token
// Set user membership data
export const setMemberShipData = async (
  pubnub,
  channel,
  lastTimeToken,
  lastDeleteTokenTime
) => {
  try {
    if (channel) {
      let obj = {
        channels: [
          {
            id: channel,
            custom: {
              lastReadTimetoken: lastTimeToken,
              lastDeleteTokenTime: !lastDeleteTokenTime
                ? new Date().getTime() * 10000
                : lastDeleteTokenTime,
            },
          },
        ],
      };

      pubnub.objects.setMemberships(obj);
    }
  } catch (error) {
    console.log(error);
  }
};

// Get membership data
// used to get last read time token
export const getMemberShipData = async (pubnub, uuid) => {
  try {
    let data = await pubnub.objects.getMemberships({
      uuid: uuid,
      include: {
        customFields: true,
        channelFields: true,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteChatMessages = async (pubnub, channel, timeToken) => {
  await pubnub.objects.setMemberships({
    channels: [
      {
        id: channel,
        custom: {
          lastReadTimetoken: timeToken,
          lastDeleteTokenTime: timeToken,
        },
      },
    ],
  });
};

export const generatePayload = async (messageObj) => {
  if (token == null) {
    token = "noToken";
  }
  let messagePayload = {
    message: messageObj.message,
    senderName: messageObj.senderName,
    senderId: messageObj.senderId,
    channelName: messageObj.channelName,
    timeToken: new Date().getTime(),
    pn_debug: true,
  };
  return messagePayload;
};

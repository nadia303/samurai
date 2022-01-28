const SEND_MESSAGE = "SEND_MESSAGE";

let initialSt = {
  messagesData: [
    { id: 1, message: "Hello!" },
    { id: 2, message: "How are you today?" },
    { id: 3, message: "Whats your problem?" },
  ],

  dialogsData: [
    { id: 1, name: "Anna" },
    { id: 2, name: "Sophie" },
    { id: 3, name: "Dima" },
    { id: 4, name: "Andrew" },
    { id: 5, name: "Roxy" },
    { id: 6, name: "Alla" },
  ],
  // newMessageBody: "",
};

const dialogsReducer = (state = initialSt, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      let body = action.newMessageBody;
      return {
        ...state,
        messagesData: [...state.messagesData, { id: 6, message: body }],
      };

    default:
      return state;
  }
};

export default dialogsReducer;

export const sendMessageCreator = (newMessageBody) => {
  return {
    type: SEND_MESSAGE,
    newMessageBody,
  };
};

import * as actionTypes from "../constants/chatConstants";

const CHAT_INITIAL_STATE = {
  chatRooms: {},
};

export const adminChatReducer = (state = CHAT_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_CHATROOMS:
      // return {
      //     ...state,
      //     chatRooms: { "to do:": "chatrooms for admin", [action.payload.user]: action.payload.message },
      // }
      let currentState = { ...state };
      // setiap user dapat memiliki banyak chat
      if (state.chatRooms[action.payload.user]) {
        currentState.chatRooms[action.payload.user].push({
          client: action.payload.message,
        });
        return {
          ...state,
          chatRooms: { ...currentState.chatRooms },
        };
      } else {
        return {
          ...state,
          chatRooms: {
            ...currentState.chatRooms,
            [action.payload.user]: [{ client: action.payload.message }],
          },
        };
      }
    default:
      return state;
  }
};
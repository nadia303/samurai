import { usersAPI } from "../api/api";
import { profileAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";

let initialState = {
  postsData: [
    { id: 1, message: "Hi!", likesCount: 12 },
    { id: 2, message: "How are you today?", likesCount: 1 },
    { id: 3, message: "This is my first post", likesCount: 22 },
    { id: 4, message: "What is the weather today?", likesCount: 52 },
  ],
  profile: null,
  status: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 10,
      };
      return {
        ...state,
        postsData: [...state.postsData, newPost],
        newPostText: "",
      };
    case SET_STATUS:
      return { ...state, status: action.status };

    case DELETE_POST:
      return {
        ...state,
        postsData: state.postsData.filter((p) => p.id != action.id),
      };

    case SET_USER_PROFILE:
      return { ...state, profile: action.profile };

    default:
      return state;
  }
};

export default profileReducer;

export const addPostActionCreator = (newPostText) => {
  return {
    type: ADD_POST,
    newPostText,
  };
};

// export const updateNewPostTextActionCreator = (text) => {
//   return { type: UPDATE_POST, newText: text };
// };

export const setUserProfile = (profile) => {
  return { type: SET_USER_PROFILE, profile };
};

export const setStatus = (status) => {
  return { type: SET_STATUS, status };
};

export const deletePost = (id) => {
  return { type: DELETE_POST, id };
};

export const getUserProfile = (userId) => {
  return (dispatch) => {
    usersAPI.getProfile(userId).then((response) => {
      dispatch(setUserProfile(response.data));
    });
  };
};

export const getStatus = (userId) => {
  // debugger;
  return (dispatch) => {
    profileAPI.getStatus(userId).then((response) => {
      dispatch(setStatus(response.data));
    });
  };
};

export const updateStatus = (status) => {
  // debugger;
  return (dispatch) => {
    profileAPI.updateStatus(status).then((response) => {
      // debugger;
      if (response.data.resultCode === 0) {
        // debugger;
        dispatch(setStatus(response.data));
      }
    });
  };
};

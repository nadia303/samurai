import { usersAPI } from "../api/api";
const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROCESS = "TOGGLE_IS_FOLLOWING_PROCESS";

let initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 2,
  isFetching: true,
  followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((el) => {
          if (el.id === action.userId) {
            return { ...el, followed: true };
          }
          return el;
        }),
      };

    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((el) => {
          if (el.id === action.userId) {
            return { ...el, followed: false };
          }
          return el;
        }),
      };

    case SET_USERS:
      return { ...state, users: action.users };

    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };

    case SET_TOTAL_USERS_COUNT:
      return { ...state, totalUsersCount: action.totalCount };

    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };

    case TOGGLE_IS_FOLLOWING_PROCESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };

    default:
      return state;
  }
};

export default usersReducer;

export const followSuccess = (userId) => {
  return {
    type: FOLLOW,
    userId,
  };
};

export const unfollowSuccess = (userId) => {
  return { type: UNFOLLOW, userId };
};

export const setUsers = (users) => {
  return { type: SET_USERS, users };
};

export const setCurrentPage = (currentPage) => {
  return { type: SET_CURRENT_PAGE, currentPage };
};

export const setTotalUsersCount = (totalCount) => {
  return { type: SET_TOTAL_USERS_COUNT, totalCount };
};

export const toggleIsFetching = (isFetching) => {
  return { type: TOGGLE_IS_FETCHING, isFetching };
};

export const toggleFollowingProcess = (isFetching, userId) => {
  return { type: TOGGLE_IS_FOLLOWING_PROCESS, isFetching, userId };
};

export const getUsersThunkCreator = (currentPage, pageSize) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
  };
};

export const getUsersThunkCreatorTwo = (currentPage, pageSize) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage));
    usersAPI.getUsers(currentPage, pageSize).then((data) => {
      dispatch(toggleIsFetching(false));
      dispatch(setUsers(data.items));
    });
  };
};

export const follow = (userId) => {
  return (dispatch) => {
    dispatch(toggleFollowingProcess(true, userId));
    usersAPI.follow(userId).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(followSuccess(userId));
      }
      dispatch(toggleFollowingProcess(false, userId));
    });
  };
};

export const unfollow = (userId) => {
  return (dispatch) => {
    dispatch(toggleFollowingProcess(true, userId));
    usersAPI.unfollow(userId).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(unfollowSuccess(userId));
      }
      dispatch(toggleFollowingProcess(false, userId));
    });
  };
};

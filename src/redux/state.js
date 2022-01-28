import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
  _state: {
    profilePage: {
      postsData: [
        { id: 1, message: "Hi!", likesCount: 12 },
        { id: 2, message: "How are you today?", likesCount: 1 },
        { id: 3, message: "This is my first post", likesCount: 22 },
        { id: 4, message: "What is the weather today?", likesCount: 52 },
      ],
      newPostText: "Type here",
    },
    messagesPage: {
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
      newMessageBody: "",
    },
    sidebar: {},
  },
  getState() {
    return this._state;
  },

  rerenderAllTree() {
    console.log("State is changed");
  },

  subscribe(observer) {
    this.rerenderAllTree = observer;
  },

  dispatch(action) {
    // debugger;
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.messagesPage = dialogsReducer(this._state.messagesPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);
    this.rerenderAllTree(this._state);
  },
};

export default store;

window.store = store;

import { deletePost } from "./profile-reducer";
import profileReducer, { addPostActionCreator } from "./profile-reducer";

let state = {
  postsData: [
    { id: 1, message: "Hi!", likesCount: 12 },
    { id: 2, message: "How are you today?", likesCount: 1 },
    { id: 3, message: "This is my first post", likesCount: 22 },
    { id: 4, message: "What is the weather today?", likesCount: 52 },
  ],
};

test("length of posts should be incremented", () => {
  //1.test data
  let action = addPostActionCreator("it-kamasutra.com");
  let state = {
    postsData: [
      { id: 1, message: "Hi!", likesCount: 12 },
      { id: 2, message: "How are you today?", likesCount: 1 },
      { id: 3, message: "This is my first post", likesCount: 22 },
      { id: 4, message: "What is the weather today?", likesCount: 52 },
    ],
  };
  //2. action
  let newState = profileReducer(state, action);
  //3.expectation
  expect(newState.postsData.length).toBe(5);
});

test("message of new post shoul be correct", () => {
  //1.test data
  let action = addPostActionCreator("it-kamasutra.com");

  //2. action
  let newState = profileReducer(state, action);
  //3.expectation
  expect(newState.postsData[4].message).toBe("it-kamasutra.com");
});

test("after deleting post the length of the posts should be decremented", () => {
  //1.test data
  let action = deletePost(1);

  //2. action
  let newState = profileReducer(state, action);
  //3.expectation
  expect(newState.postsData.length).toBe(3);
});

test("after deleting post the length of the posts shouldn't be decremented if id is incorrect", () => {
  //1.test data
  let action = deletePost(10);

  //2. action
  let newState = profileReducer(state, action);
  //3.expectation
  expect(newState.postsData.length).toBe(4);
});

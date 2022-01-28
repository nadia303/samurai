import React from "react";
import classes from "./MyPosts.module.css";
import MyPost from "./Post/MyPost";
import { Field, reduxForm } from "redux-form";
import {
  maxLengthCreator,
  required,
} from "../../../utils/validators/validators";
import { Element } from "../../common/FormsControls/FormsControls";

const Textarea = Element("textarea");

const maxLength10 = maxLengthCreator(10);

let AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        name="newPostText"
        component={Textarea}
        placeholder={"Post message"}
        validate={[required, maxLength10]}
      />
      <button>Add post</button>
    </form>
  );
};

AddNewPostForm = reduxForm({ form: "ProfileAddNewPostForm" })(AddNewPostForm);

const MyPosts = React.memo((props) => {
  console.log("Render posts");
  let postElements = props.postsData.map((element) => {
    return (
      <MyPost
        message={element.message}
        like={element.likesCount}
        key={element.id}
      />
    );
  });

  let onAddPost = (values) => {
    props.addPost(values.newPostText);
  };

  return (
    <div>
      <h3>my posts</h3>
      <AddNewPostForm onSubmit={onAddPost} />
      <div>new posts</div>
      <div>{postElements}</div>
    </div>
  );
});

// const AddNewPostForm= reduxForm(form: a)

export default MyPosts;

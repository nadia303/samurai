import React from "react";
import classes from "./MyPost.module.css";

const MyPost = (props) => {
  // debugger;
  return (
    <div className={classes.post}>
      <img src="https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340"></img>
      <p>{props.message}</p>
      <div>
        <span>{props.like}</span>
      </div>
    </div>
  );
};

export default MyPost;

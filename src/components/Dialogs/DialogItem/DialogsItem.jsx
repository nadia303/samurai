import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./../Dialogs.module.css";

const DialogItem = (props) => {
  // debugger;
  // let newText = React.createRef();
  // let addText = () => {
  //   let text = newText.current.value;
  //   console.log(text);
  //   alert(text);
  // };

  return (
    <div>
      {/* <textarea ref={newText}></textarea>
      <button onClick={addText}></button> */}
      <div className={styles.dialog}>
        <NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
      </div>
    </div>
  );
};

export default DialogItem;

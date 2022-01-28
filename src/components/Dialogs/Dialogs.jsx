import React from "react";
import styles from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import { sendMessageCreator } from "../../redux/dialogs-reducer";
import { updateNewMessageBodyCreator } from "../../redux/dialogs-reducer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../utils/validators/validators";
import { Element } from "../common/FormsControls/FormsControls";
const maxLength50 = maxLengthCreator(50);
const Textarea = Element("textarea");

const Dialogs = (props) => {
  let newMessage = props.newMessage;
  let dialogsElements = props.dialogsData.map((element) => {
    return <DialogItem name={element.name} key={element.id} />;
  });

  let messagesElements = props.messagesElements.map((element) => {
    return <Message message={element.message} key={element.id} />;
  });

  let addNewMessage = (values) => {
    props.sendMessage(values.newMessageBody);
  };

  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>{dialogsElements}</div>
      <div className={styles.messages}>
        <div>{messagesElements}</div>
        <div></div>
      </div>
      <AddMessageFormRedux onSubmit={addNewMessage} />
    </div>
  );
};

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        component={Textarea}
        validate={[required, maxLength50]}
        name="newMessageBody"
        placeholder="Enter your message"
      />
      <div>
        <button>Send</button>
      </div>
    </form>
  );
};

const AddMessageFormRedux = reduxForm({ form: "dialogAddMessageForm" })(
  AddMessageForm
);
export default Dialogs;

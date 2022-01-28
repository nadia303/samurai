import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import styles from "./ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {
  if (!props.profile) {
    // return <Preloader />;
    return <div>No values here</div>;
  }
  // debugger;
  return (
    <div>
      <div className={styles.descriptionInfo}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp4hTNASR11JtNsMZ8T5Pm-LQJovuLMPJVBA&usqp=CAU" />
      </div>
      <div>
        <img src={props.profile.photos.large}></img>
        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
      </div>
    </div>
  );
};

export default ProfileInfo;

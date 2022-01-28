import styles from "./users.module.css";
import * as axios from "axios";
import userPhoto from "./../../assets/images/profilePic.png";
const Users = (props) => {
  // debugger;
  if (props.users.length === 0) {
    axios
      .get("https://social-network.samuraijs.com/api/1.0/users")
      .then((response) => {
        // debugger;
        props.setUsers(response.data.items);
      });
    // props.setUsers([
    //   {
    //     id: 1,
    //     followed: true,
    //     fullName: "Dmitriy",
    //     photoUrl:
    //       "https://storage.ws.pho.to/s2/c89a75636028c8c12c32673b92c474162f5bba13_m.jpg",
    //     status: "I am the boss here",
    //     location: { country: "Belarus", city: "Minsk" },
    //   },
    //   {
    //     id: 2,
    //     followed: true,
    //     fullName: "Ivan",
    //     photoUrl:
    //       "https://storage.ws.pho.to/s2/c89a75636028c8c12c32673b92c474162f5bba13_m.jpg",
    //     status: "The best one",
    //     location: { country: "USA", city: "Washington" },
    //   },
    //   {
    //     id: 3,
    //     followed: false,
    //     fullName: "Anna",
    //     photoUrl:
    //       "https://storage.ws.pho.to/s2/c89a75636028c8c12c32673b92c474162f5bba13_m.jpg",
    //     status: "And they lived happily ever after",
    //     location: { country: "Ukraine", city: "Kyiv" },
    //   },
    //   {
    //     id: 4,
    //     followed: false,
    //     fullName: "Elithabeth",
    //     photoUrl:
    //       "https://storage.ws.pho.to/s2/c89a75636028c8c12c32673b92c474162f5bba13_m.jpg",
    //     status: "Simply",
    //     location: { country: "UK", city: "London" },
    //   },
    // ]);
  }

  let users = props.users.map((user) => {
    return (
      <div key={user.id}>
        <span>
          <div>
            <img
              src={user.photos.small != null ? user.photos.smal : userPhoto}
              className={styles.photo}
            />
          </div>
          <div>
            {user.followed ? (
              <button onClick={() => props.unfollow(user.id)}>Unfollow</button>
            ) : (
              <button onClick={() => props.follow(user.id)}>Follow</button>
            )}
          </div>
        </span>
        <span>
          <span>
            <div>{user.name}</div>
            <div>{user.status}</div>
          </span>
          <span>
            <div>{"user.location.country"}</div>
            <div>{"user.location.city"}</div>
          </span>
        </span>
      </div>
    );
  });
  return <div>{users}</div>;
};

export default Users;

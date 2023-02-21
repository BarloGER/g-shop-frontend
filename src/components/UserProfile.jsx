import Loading from "./Loading";
import { deleteUser } from "../utils/auth";

// This component is used to display the user's profile if the user is logged in

const UserProfile = ({ user, loadingAuthRequest, isAuthenticated }) => {
  const token = localStorage.getItem("token");
  const deleteAccount = () => {
    deleteUser(token);
    localStorage.removeItem("token");
  };

  const logOut = () => {
    localStorage.removeItem("token");
  };

  return user ? (
    <div>
      <h1>
        Willkommen zurück, {user.firstname} {user.lastname}
      </h1>
      <button onClick={logOut}>Logout</button>
      <button onClick={deleteAccount}>Account löschen</button>
    </div>
  ) : (
    <Loading />
  );
};
export default UserProfile;

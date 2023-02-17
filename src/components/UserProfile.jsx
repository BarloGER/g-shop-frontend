import Loading from "./Loading";

// This component is used to display the user's profile if the user is logged in

const UserProfile = ({ user }) => {
  return user ? (
    <div>
      <h1>
        Willkommen zurück, {user.firstname} {user.lastname}
      </h1>
    </div>
  ) : (
    <Loading />
  );
};
export default UserProfile;

import Loading from "./Loading";

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

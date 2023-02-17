import { Outlet } from "react-router-dom";
import Header from "./Header";

// This component is used to wrap the app's routes and display the header

const Layout = ({
  isAuthenticated,
  setToken,
  loadingAuthRequest,
  setLoadingAuthRequest,
  logOut,
}) => {
  return (
    <>
      <header>
        <Header
          isAuthenticated={isAuthenticated}
          setToken={setToken}
          loadingAuthRequest={loadingAuthRequest}
          setLoadingAuthRequest={setLoadingAuthRequest}
          logOut={logOut}
        />
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;

import { Outlet } from "react-router-dom";
import Header from "./Header";

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

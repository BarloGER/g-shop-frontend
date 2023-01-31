import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from "./components/UserProfile";
import NotFound from "./components/NotFound";
import { getUser } from "./utils/auth";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingAuthRequest, setLoadingAuthRequest] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      try {
        setLoadingAuthRequest(true);
        const { data, error } = await getUser(token);
        if (error) throw error;
        setUser(data);
        setIsAuthenticated(true);
        setLoadingAuthRequest(false);
      } catch (error) {
        localStorage.removeItem("token");
        setToken(null);
        setLoadingAuthRequest(false);
        console.log(error);
      }
    };
    token && validateToken();
  }, [token]);

  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <Layout
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            setToken={setToken}
            loadingAuthRequest={loadingAuthRequest}
            setLoadingAuthRequest={setLoadingAuthRequest}
            logOut={logOut}
            user={user}
          />
        }
      >
        <Route index element={<Home />} />

        <Route
          path="/signup"
          element={
            <SignUp
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
              setToken={setToken}
              loadingAuthRequest={loadingAuthRequest}
              setLoadingAuthRequest={setLoadingAuthRequest}
            />
          }
        />
        <Route
          path="auth"
          element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
        >
          <Route index element={<UserProfile user={user} />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;

// Import necessary dependencies
import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

// Import necessary functions
import { getUser } from "./utils/auth";

// Import used components
import Layout from "./components/Layout";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from "./components/UserProfile";
import NotFound from "./components/NotFound";

// This is the main component of the app

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingAuthRequest, setLoadingAuthRequest] = useState(false);

  // This effect checks if the user is authenticated and sets the user state accordingly
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

  // This function is used to log the user out
  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // This function is used to log the user in
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
        {/* This route is used to display the home page */}
        <Route index element={<Home />} />

        {/* This route is used to display the sign-up page */}
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

        {/* This route is used to display the user's profile page, if the user is logged in*/}
        <Route
          path="auth/me"
          element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
        >
          <Route index element={<UserProfile user={user} />} />
        </Route>

        {/* This route is used to display a 404 page */}
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;

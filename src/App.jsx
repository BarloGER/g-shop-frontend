import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./components/Home";
import SignUp from "./components/SignUp";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;

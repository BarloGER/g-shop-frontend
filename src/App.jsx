import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import Home from "./components/Home";
import Test from "./components/Test";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Outlet />}>
        <Route index element={<Home />} />
        <Route path="/test" element={<Test />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

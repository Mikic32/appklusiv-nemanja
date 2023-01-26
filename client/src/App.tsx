import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";

const router = createBrowserRouter([
  { path: "/register", element: <Register /> },
  { path: "/home", element: <Home /> },
  { path: "*", element: <Navigate to="/register" replace={true} /> },
]);

const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;

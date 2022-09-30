import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Board from "./pages/Board";
import Error from "./components/Error";

const router = createBrowserRouter([
  {
    element: <Home />,
    path: "/",
    errorElement: <Error />,
  },
  {
    element: <About />,
    path: "/about",
    errorElement: <Error />,
  },
  {
    element: <Profile />,
    path: "/profile",
    errorElement: <Error />,
  },
  {
    element: <Board />,
    path: "/board/:board_uuid",
    errorElement: <Error />,
  },
]);

export default router;

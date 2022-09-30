import { createBrowserRouter } from "react-router-dom";
import pagesIndex from "./pages/index.js";
import componentsIndex from "./components/index.js";
let { Home, Board, Profile, About, Auth } = pagesIndex;
let { Error } = componentsIndex;

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
    element: <Auth />,
    path: "/auth",
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

import { Routes, Route } from "react-router-dom";
import supabase from "../supabaseClient";
import Home from "../pages/Home";
import CreateBoard from "../pages/CreateBoard";
import About from "../pages/About";
import Profile from "../pages/Profile";
import Signout from "./Signout";
import Boards from "../pages/Boards";
import Board from "../pages/Board";
import { useContext } from "react";
import { UserContext } from "../context/user";

function Router({ session, signout }) {
  const user = useContext(UserContext);

  if (user) {
    return (
      <Routes>
        <Route path="/" element={<Home session={session} />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/boards" element={<Boards />} />
        <Route exact path="/board/:board_id" element={<Board />} />
        <Route exact path="/createboard" element={<CreateBoard />} />
        <Route exact path="/signout" element={<Signout signout={signout} />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
      </Routes>
    );
  }
}

export default Router;

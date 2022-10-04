import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Router from "./components/Router";
import supabase from "./supabaseClient";
import { UserContext } from "./context/user";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(supabase.auth.user());

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(user);
    });
  }, []);

  const signout = () => {
    supabase.auth.signOut();
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(null);
    });
  };

  console.log("User: ", user);

  return (
    <UserContext.Provider value={user}>
      <div className="App">
        <Router signout={signout} session={supabase.auth.user()} />
        <Navbar user={supabase.auth.user()} />
      </div>
    </UserContext.Provider>
  );
}

export default App;

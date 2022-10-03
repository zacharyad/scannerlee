import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import supabase from '../supabaseClient';
function Navbar() {
  const [user, setUser] = useState({})

  useEffect(() => {
    
    setUser(supabase.auth.user())
    console.log("Loaded Navbar", user)
  }, [])

  if(user){
    return (
      <nav>
        <Link to="/">Home | </Link>
        <Link to="/about">About</Link>
      </nav>
    )
  } else {
    return (
      <nav>
        <p>{user.username}:</p>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/about">About</Link>
        <Link to="/createBoard">Profile</Link>
        <Link to="/profile">Profile</Link>
      </nav>
  );
  }

    
  }
  
  export default Navbar;
  
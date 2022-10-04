import { useContext, useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import '../App.css'
import supabase from '../supabaseClient';
import React from 'react'
import {UserContext} from '../context/user'

function Navbar() {
  const user = React.useContext(UserContext)

  if(!user){
    return (
      <nav>
        <Link to="/">Home | </Link>
        <Link to="/about">About | </Link>
      </nav>
    )
  } else {
    return (
      <nav>
        <Link to="/">Home | </Link>
        <Link to="/about">About | </Link>
        <Link to="/createBoard">Purchase | </Link>
        <Link to="/boards">Your Boards | </Link>
        <Link to="/signout">Sign out | </Link>
      </nav>
  );
  }

    
  }
  
  export default Navbar;
  
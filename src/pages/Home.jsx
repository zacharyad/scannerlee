import {useEffect, useState} from 'react'
import supabase from '../supabaseClient';
import Profile from './Profile'
import Auth from './Auth'
import Navbar from '../components/Navbar';

function Home() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

    return (
      <div>
        <p>This is the Home of the app.</p>
        {
          !session ? <Auth /> : <Profile key={session.user.id} session={session} /> 
        }
      </div>
    );
  }
  
  export default Home;
  
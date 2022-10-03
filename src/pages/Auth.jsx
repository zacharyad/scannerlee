import {useState} from 'react'
import supabase from "../supabaseClient"

function Auth() {
    let [isLoading, setLoading] = useState(false); 
    let [email, setEmail] = useState("");

    const onChange = (e) => {
        setEmail(e.target.value)
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            setLoading(true);
            const {error} = await supabase.auth.signIn({email})
            if(error){
                throw new Error("Could not sign in using this email");
            }

        } catch(err){
            console.log(err)
            alert("Error: ", err)
        } finally {
            setLoading(false)
        }

    }

    return (
      <>
      <h1>Login</h1>
      <p>Sign in with a magic link to you email.</p>
      {
        isLoading ?
        <p>Sending Link to email...</p> :
        <form onSubmit={handleLogin}>
            <label htmlFor="email">Email: </label>
            <input onChange={onChange} type="email" name="email" placeholder="your@email.com" id="email" value={email} />
            <button>Send Magic Link</button>
        </form>
      }

          
      </>
    );
  }
  
  export default Auth;
  
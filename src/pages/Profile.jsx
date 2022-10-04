import {useState, useEffect} from 'react'
import supabase from '../supabaseClient';
import Avatar from "../components/Avatar"

function Profile({session}) {
    let initData = {avatar_url: "", username: ""}
    let [username, setUsername] = useState("");
    let [avatar_url, setAvatarUrl] = useState("");
    let [isLoading, setLoading] = useState(false)

    useEffect(() => {
        getProfile()

    }, [session])

    const getProfile = async () => {
        try{
            setLoading(true);
            const user = supabase.auth.user()


            let {data, error, status} = await supabase
            .from('profiles')
            .select(`username, avatar_url`)
            .eq('id', user.id)
            .single()

            if(data){
                let {username, avatar_url} = data
                setAvatarUrl(avatar_url)
                setUsername(username)
            } else {
                throw new Error("Something when wrong while getting your profile data.")
            }


        } catch(err){
            console.log(err)
            //alert("issue changing profile data")
        } finally{
            setLoading(false)
        }
    }

    const updateProfile = async (e) => {
        e.preventDefault()
        try{
            setLoading(true);
            const user = supabase.auth.user()
            const updates = {
                id: user.id,
                updated_at: new Date(),
                username,
                avatar_url
            }

            console.log("IN UPDATE PROFILE: ", updates)

            let {error} = await supabase
            .from("profiles")
            .upsert(updates, {returning: 'minimal'})
            
            if(error){
                throw new Error("Something when wrong while getting your profile data.")
            }

        } catch(err){
            console.log(err)
            console.log("error: ", err)
            //alert("issue changing profile data")
        } finally{
            console.log("EHHHH")
            setLoading(false)
        }
    }

    const onChange = (e) => {
            setUsername(e.target.value);
    }
    return (
      <div>
          <h1>User Profile: </h1>
          {
            isLoading ? 
            <p>Saving...</p> :
            <>
            <Avatar url={avatar_url} size={150} onUpload={(url) => {
                 setAvatarUrl(url);
            }} />
            <form onSubmit={updateProfile}>
                <input value={username} onChange={onChange} type="text" name="username" id="username" placeholder="UserName1991" />
                <button>Make Changes to Profile.</button>
            </form>
            <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
            </>
          }

      </div>
    );
  }
  
  export default Profile;
  
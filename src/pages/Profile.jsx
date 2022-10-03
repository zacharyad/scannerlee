import {useState, useEffect} from 'react'
import supabase from '../supabaseClient';
import Avatar from "../components/Avatar"

function Profile({session}) {
    let initData = {avatar_url: "", username: ""}
    let [profileData, setProfileData] = useState(initData);
    let [isLoading, setLoading] = useState(false)

    useEffect(() => {
        getProfile()

    }, [session])

    const getProfile = async () => {
        try{
            setLoading(true);
            const user = supabase.auth.user()

            console.log("User From GetProfile:", user)


            let {data, error, status} = await supabase
            .from('profiles')
            .select(`username, avatar_url`)
            .eq('id', user.id)
            .single()

            if(data){
                console.log("Data", data)
                setProfileData({...profileData, ...data})
                console.log(profileData)
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
                ...profileData
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
        if(Object.keys(profileData).includes(e.target.name)){
            setProfileData({
                ...profileData,
                [e.target.name]: e.target.value
            })
        }
    }

    return (
      <div>
          <h1>User Profile: </h1>
          {
            isLoading ? 
            <p>Saving...</p> :
            <>
            <Avatar url={profileData.avatar_url} size={150} onUpload={(url) => {
                setProfileData({avatar_url: url})
            }} />
            <form onSubmit={updateProfile}>
                <input value={profileData.username} onChange={onChange} type="text" name="username" id="username" placeholder="UserName1991" />
                <button>Make Changes to Profile.</button>
            </form>
            <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
            </>
          }

      </div>
    );
  }
  
  export default Profile;
  
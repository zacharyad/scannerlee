import {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import {UserContext} from '../context/user'
import supabase from "../supabaseClient";

function CreateBoard({user_id}) {
    const user = useContext(UserContext)
    const [msg, setMsg] = useState("");
    const goToBoards = useNavigate()

    const createBoard = async (e) => {
      console.log("Inside the create board func: ", user)
        e.preventDefault()

        const newBoard = {
            user_id: user.id,
            msg,
            created_at: new Date()
        }

        const { data, error } = await supabase
        .from('boards')
        .insert(newBoard)

        console.log("Data back = ", data[0].id)

        //console.log("boardData on Submit: ", newBoard)
        goToBoards(`/board/${data[0].id}`);
    }

    const onChange = (e) => {

      
      setMsg(e.target.value)

      console.log(msg)
    }

    console.log("User from create3 borads: ", user)

    return (
      <form onSubmit={createBoard}>
        <label htmlFor="mdg">Message:</label>
        <input onChange={onChange} value={msg} type="text" name="msg" id="msg" />
        <button>Create QR code</button>
      </form>
    );
  }
  
  export default CreateBoard;
  
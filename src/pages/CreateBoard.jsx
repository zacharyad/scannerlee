import {useState, useEffect} from 'react'
import supabase from "../supabaseClient";

function CreateBoard({user_id}) {
    const initBoardFormData = {msg: "", user_id}
    const [boardData, setBoardData] = useState(initBoardFormData);

    const createBoard = async (e) => {
        e.preventDefault()

        const {user_id, msg} = boardData;
        const newBoard = {
            user_id,
            msg,
            created_at: new Date()
        }

        // const { data, error } = await supabase
        // .from('boards')
        // .insert([
        //     newBoard
        // ])

        console.log("boardData on Submit: ", boardData)
    }

    const onChange = (e) => {

      
      setBoardData({
        ...boardData,
        [e.target.name]: e.target.value
      })

      console.log(boardData)
    }

    return (
      <form onSubmit={createBoard}>
        <label htmlFor="mdg">Message:</label>
        <input onChange={onChange} value={boardData.msg} type="text" name="msg" id="msg" />
        <button>Create QR code</button>
      </form>
    );
  }
  
  export default CreateBoard;
  
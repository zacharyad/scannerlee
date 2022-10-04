import {useState, useEffect, useContext} from 'react'
import {Link} from "react-router-dom"
import { UserContext } from '../context/user';
import supabase from "../supabaseClient";

function Boards() {
    const [boards, setBoards] = useState([])
    const [isLoading, setLoading] = useState(false)
    const user = useContext(UserContext)

    useEffect(() => {
        getAllBoards(user)
        console.log("just tried to fetch", user, boards)
    }, [user])

    const deleteBoard = async (id) => {
        try {
            const { data, error } = await supabase
            .from('boards')
            .delete()
            .eq('id', id)

            if(error) throw new Error("Issue deleting board")

            let filteredBoards = boards.filter((board) => board.id != data[0].id)
            console.log("filtered boards after delete: ", filteredBoards)
            setBoards(filteredBoards)

        } catch(err){

        }
    }


    const getAllBoards = async (user) => {
        console.log("in getAll Boards, ", user)
        if(!user) return
        try {
            setLoading(true);

            let { data, error } = await supabase
            .from('boards')
            .select("*")
            .eq("user_id", user.id)

            if(error) throw new Error("Issue getting all this users boards.", error)
            else {
                setBoards(data)
            }
        } catch (err){
            console.log("ERROR: ", err)
        } finally {
            setLoading(false)
        }
    }

    console.log(boards)



    if(isLoading) return <p>LOADING...</p>

    else return (
      <div>
          <p>All of the board links will show here.</p>
          {
            !boards.length ? <p>Sorry you don't have any boards yet</p> : 
            boards.map(({msg, id}) => {
                return (
                    <div key={id}>
                        <Link to={`/board/${id}`}>{msg}</Link>
                        <button onClick={() => deleteBoard(id)}>X</button>
                    </div>
                )
            })
          }
      </div>
    );
  }
  
  export default Boards;
  
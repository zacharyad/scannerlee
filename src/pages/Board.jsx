import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import supabase from "../supabaseClient";

function Board(props) {
  const [boardData, setBoardData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const {board_id} = useParams()

  useEffect(() => {
    fetchMessage();

  }, [])

  const fetchMessage = async () => {
    try {
      setLoading(true);

    let { data: board, error } = await supabase
      .from('boards')
      .select('*')
      .eq("id", board_id)

    if(error) throw new Error("Issue fetching this particular board.")

    setBoardData(board[0])

    } catch(err){
      console.log("Error: ", err)
    } finally {
      setLoading(false)
    }
  }

  console.log("BoardData: ", boardData)

  if(isLoading) return <p>Loading...</p>


  return (
      <div>
        {
          !boardData ? <p>Sorry somthing went wrong.</p> :
          <p>{boardData.msg}</p>
        }
      </div>
    );
  }
  
  export default Board;
  
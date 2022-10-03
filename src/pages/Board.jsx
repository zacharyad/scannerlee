import supabase from "../supabaseClient";

function Board() {
  console.log("From board: ",supabase.auth.user())
    return (
      <div>
          <p>This is the Board of the app.</p>
      </div>
    );
  }
  
  export default Board;
  
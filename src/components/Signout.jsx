import {useEffect} from "react";
import { Navigate } from "react-router-dom";

const Signout = ({signout}) => {
    useEffect(() => {
        signout()
    }, []);


   return <Navigate to="/" replace={true} /> ;
  };

  export default Signout

  
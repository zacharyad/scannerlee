import {useRouteError} from 'react-router-dom'

function Error(props) {
    const {status, statusText} = useRouteError();

    switch(status){
        case 404:
            return (
                <div>
                    <p>ERROR PAGE</p>
                    <p>{`${status}: ${statusText}!`}</p>
                </div>
              )
        break;
        default:
            return (
                <div>
                    <p>ERROR PAGE</p>
                    <p>NO ONE KNOWS HOW THIS WAS MESSED UP BUT YOU AND GOD.</p>
                </div>
            )
        break;
    }
  }
  
  export default Error;
  
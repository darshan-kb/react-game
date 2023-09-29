import { useState } from "react";
import { useEffect } from "react";
import Wheel from "./Wheel";
import styles from "../css/Wheel.module.css"
import Board from "./Board";
import Countdown from "./Countdown";
import Balance from "./Balance"




const Game = () =>{
    const[result, setResult] = useState(0);

    const token = sessionStorage.getItem('id_token');
    const headers = new Headers();
            headers.set('Content-type','application/json');
            headers.set('Authorization', `Bearer ${token}`);


    var requestOptions = {
    method: 'GET',
    mode: 'cors',
    headers: headers,
    };


    useEffect(()=>{
        let sse = new EventSource("http://localhost:9090/sse");
        sse.onmessage = (response) => {
            let resp = JSON.parse(response.data);
            if(resp.payloadName==="result"){
                let result = parseInt(resp.payloadValue);
                setResult(result)
            }
         }
    })

    return (
        
        <div style={{}}>
            <div className="LeftSection" style={{display:"block", height:"50%", width:"100%"}}>
                <Balance></Balance>
                <Countdown></Countdown>
                <Wheel num={result}></Wheel>
            </div>
                <Board></Board>
        </div>
      );
}

export default Game;
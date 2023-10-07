import { useState } from "react";
import { useEffect } from "react";
import Wheel from "./Wheel";
import styles from "../css/Wheel.module.css"
import Board from "./Board";
import Countdown from "./Countdown";
import Balance from "./Balance"
import Navbar from "./Navbar";




const Game = () =>{
    const[result, setResult] = useState(0);
    const [balance, setBalance] = new useState(0);
    const token = sessionStorage.getItem('id_token');
    const headers = new Headers();
    headers.set('Content-type','application/json');
    headers.set('Authorization', `Bearer ${token}`);
    // useEffect(()=>{
    //     var requestOptions = {
    //     method: 'GET',
    //     mode: 'cors',
    //     headers: headers
    //     };
    //     fetch("http://localhost:9090/account/balance", requestOptions)
    //         .then(response => response.text())
    //         .then(result => setBalance(JSON.parse(result)))
    //         .catch(error => console.log('error', error));
    // },[])
    const updateBalance = (value) => {
        setBalance(value);
    };

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
                // console.log("here");
                let result = parseInt(resp.payloadValue);
                setResult(result)
            }
         }
    },[result])

    return (
        
        <div className="game" style={{width:"100%", height:"100%", position:"absolute"}}>
            <Navbar balance={balance}></Navbar>
            <div className="LeftSection" style={{display:"block", height:"50%", width:"100%"}}>
                {/* <Balance></Balance> */}
                <Countdown></Countdown>
                <Wheel num={result}></Wheel>
            </div>
                <Board updateBalance={updateBalance}></Board>
        </div>
      );
}

export default Game;
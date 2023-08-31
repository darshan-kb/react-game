import { useState } from "react";
import { useEffect } from "react";
import Wheel from "./Wheel";
import styles from "../css/Wheel.module.css"
import Board from "./Board";



function Countdown(){
    const token = sessionStorage.getItem('id_token');
    const headers = new Headers();
            headers.set('Content-type','application/json');
            headers.set('Authorization', `Bearer ${token}`);


    var requestOptions = {
    method: 'GET',
    mode: 'cors',
    headers: headers,
    };

    const[countdown, setCountdown] = useState("0:0");
    useEffect(()=>{
        setInterval(()=>{
            fetch("http://localhost:9090/countdown", requestOptions)
            .then(response => response.text())
            .then(result => {
                let res = parseInt(JSON.parse(result).varcount);
                if(res<0){
                    setCountdown("0:0");
                }
                else{
                    let min = Math.floor(res/60);
                    let sec = res%60;
                    setCountdown(min+":"+sec);
                }
                })
            .catch(error => console.log('error', error));
        },1000);
    })
    
    return (
        <div style={{color:"white", fontSize:"3vw", fontWeight:"bold"}}>
            {countdown}
        </div>
    );
}

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
        setInterval(()=>{
            fetch("http://localhost:9090/countdown", requestOptions)
            .then(response => response.text())
            .then(result => {
                let res = JSON.parse(result).varcount;
                if(res === 0){
                    fetch("http://localhost:9090/result", requestOptions)
                        .then(response => response.text())
                        .then(result => {
                            let res = JSON.parse(result);
                            console.log("Here"+res);
                            setResult(res);
                        })
                        .catch(error => console.log('error', error));
                     }
                })
            .catch(error => console.log('error', error));
        },1000);
    })

    return (
        
        <div style={{}}>
            <div className="LeftSection" style={{display:"block", height:"50%", width:"100%"}}>
                <Countdown ></Countdown>
                <Wheel num={result}></Wheel>
            </div>
                <Board></Board>
        </div>
      );
}

export default Game;
import { useState } from "react";
import { useEffect } from "react";

const Countdown = ()=> {

    useEffect(()=>{
        let sse = new EventSource("http://localhost:9090/sse");
        sse.onmessage = (response) => {
            let resp = JSON.parse(response.data);
            let div = document.getElementById("countdowndiv");          
            if(resp.payloadName==="count"){
                let res = parseInt(resp.payloadValue);
                if(res<0){
                    div.innerHTML="0:0";
                }
                else{
                    let min = Math.floor(res/60);
                    let sec = res%60;
                    div.innerHTML=min+":"+sec;
                }
            } 
        }
    })
    
    return (
        <div id={"countdowndiv"} style={{color:"white", fontSize:"3vw", fontWeight:"bold"}}>
            
        </div>
    );
}

export default Countdown;
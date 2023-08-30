import { useState } from "react";
import TicketModel from "../classes/ticket";
import TicketRecordModel from "../classes/bet";
import { useEffect } from "react";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import Wheel from "./Wheel";
import styles from "../css/Wheel.module.css"
import Board from "./Board";

let betCategory="";
let currentIndex=0;

function Square({ labelVal, value, handleClick }) {
    //console.log(labelVal);
    return (
        <>
        <div className="option_button" style={{float:"left"}}>
        <button style={{width:'4vw',height:'4vw',float:"none", fontSize:"2vw"}} className="square" onClick={handleClick}>{value}</button>
        <div className="label_text" style={{width:'5vw',height:'2vw',float:"none", fontSize:"1.5vw"}}>
            {labelVal!=0 && <p style={{width:"1vw", color:"white", marginLeft:"1vw"}}>{labelVal}</p>}
            
        </div>
        </div>
        </>
    );
}



function CornerButton({CornerVal, value, fourBoxHandler}){

    return (
            <div style={{width:'2vw',height:'2vw', fontSize:"2vw", float:"left"}}>
                <button style={{height:"2vw",marginLeft:"1vw",width:'2vw'}} onClick={fourBoxHandler}>{CornerVal!=0 && CornerVal}</button>
            </div>
    );
}

function SplitButton({SplitVal, value, twoBoxHandler}){
    return (<div style={{width:'3vw',height:'2vw', fontSize:"2vw", float:"left"}}>
            <button style={{width:'3vw',height:'1.5vw', fontSize:"2vw", float:"none", marginLeft:"1vw"}} className={value} onClick={twoBoxHandler}></button>
        </div>);
}

// function countd(){
//     const token = sessionStorage.getItem('id_token');
//     const headers = new Headers();
//             headers.set('Content-type','application/json');
//             headers.set('Authorization', `Bearer ${token}`);
//     var requestOptions = {
//         method: 'GET',
//         mode: 'cors',
//         headers: headers,
//         };
    
//             fetch("http://localhost:9090/countdown", requestOptions)
//             .then(response => response.text())
//             .then(result => {
//                 let res = JSON.parse(result).varcount;
//                 console.log(res);
//                 setCountdown(res);
                
//                 })
//             .catch(error => console.log('error', error));
        
// }



function Countdown({countdown}){
    
    return (
        <div>
            {countdown}
        </div>
    );
}

const Game = () =>{
    const[valuearr, setValuearr] = useState(Array(37).fill(0));
    const[statearr, setStatearr] = useState(Array(37).fill(0));

    const[cornerValue, setCornerValue] = useState(Array(24).fill(0));
    const[CornerState, setCornerState] = useState(Array(24).fill(0));


    const[countdown, setCountdown] = useState("Hello");
    const[result, setResult] = useState(0);
    const[inUse, setInUse] = useState(false);
    // const[betCategory, setBetCategory] = useState("");
    // const[currentIndex, setCurrentIndex] = useState(0);
    

    const betCategories = ["single_element","four_square_elements","two_vertical_elements"];

    
    

    const token = sessionStorage.getItem('id_token');
    const headers = new Headers();
            headers.set('Content-type','application/json');
            headers.set('Authorization', `Bearer ${token}`);


    var requestOptions = {
    method: 'GET',
    mode: 'cors',
    headers: headers,
    };

    // setInterval(()=>{
        //countd();
    //     console.log(countdown);
    // },1000)
    // useEffect(()=>{
    // setInterval(()=>{
    //             fetch("http://localhost:9090/countdown", requestOptions)
    //             .then(response => response.text())
    //             .then(result => {
    //                 let res = JSON.parse(result).varcount;
    //                 //setCountdown(res);
    //                 console.log(res);
    //                 if(res === 0){
    //                     fetch("http://localhost:9090/result", requestOptions)
    //                         .then(response => response.text())
    //                         .then(result => {
    //                             let res = JSON.parse(result);
    //                             console.log("Here"+res);
    //                             setResult(res);
    //                 })
    //             .catch(error => console.log('error', error));
    //                 }
    //         },1000)
    //     },[]);
    useEffect(()=>{
        setInterval(()=>{
            fetch("http://localhost:9090/countdown", requestOptions)
            .then(response => response.text())
            .then(result => {
                let res = JSON.parse(result).varcount;
                //setCountdown(res);
                console.log(res);
                if(res === 0){
                    fetch("http://localhost:9090/result", requestOptions)
                        .then(response => response.text())
                        .then(result => {
                            let res = JSON.parse(result);
                            console.log("Here"+res);
                            //Wheel(res);
                            setResult(res);
                        })
                        .catch(error => console.log('error', error));
                     }
                })
            .catch(error => console.log('error', error));
        },1000);
    },[])

    


    const values = [5,10,20,50,100,200,500,1000];
    let squares = [];
    for(let i=1;i<=3;i++){
        let d1 = [];
        for(let j=0;j<=11;j++){
            d1[j] = j*3+i;
        }
        squares[i-1]=d1;
    }


    function sqHandleClick(index){

        if(betCategory!="" && betCategory!=betCategories[0]){
            alert("Please clear first");
            return;
        }

        setInUse(true);
        betCategory=betCategories[0];

        index-=1;
        let tmpValArr = valuearr.slice();
        let tmpStateArr = statearr.slice();
        tmpStateArr[index] = tmpStateArr[index]%values.length;
        tmpValArr[index] = values[tmpStateArr[index]++];
        setStatearr(tmpStateArr);
        setValuearr(tmpValArr);
    }

    function twoBoxHandler(index){

        //console.log(betCategory+" "+currentIndex);

        if(betCategory===""){
            console.log("Here");
            betCategory = betCategories[2];
            currentIndex = index;
        }
        if((betCategory!==betCategories[2] || currentIndex!==index)){
            alert("Please clear first");
            return;
        }

        // setInUse(true);
        // setBetCategory(betCategories[2]);
        // setCurrentIndex(index);
        
        if(index>=25){
            index = ((index*3)-71)/2;
        }
        else{
            index = ((index*3)-1)/2;
        }
        console.log(index);
        let tmpValArr = valuearr.slice();
        let tmpStateArr = statearr.slice();

        tmpStateArr[index] = tmpStateArr[index]%values.length;
        tmpValArr[index] = values[tmpStateArr[index]++];

        tmpStateArr[index+1] = tmpStateArr[index+1]%values.length;
        tmpValArr[index+1] = values[tmpStateArr[index+1]++];

        setStatearr(tmpStateArr);
        setValuearr(tmpValArr);
    }

    function fourBoxHandler(index){

        // if(betCategory===""){
            
        //     betCategory = betCategories[1];
        //     currentIndex = index;
        // }
        // if((betCategory!==betCategories[1] || currentIndex!==index)){
        //     alert("Please clear first");
        //     return;
        // }

        // if(index%2!=0){
        //     twoBoxHandler(index);
        // }
        // if(index>=25){
        //     index = index*(3/2)-37;
        // }
        // else{
        //     index = index*(3/2)-2;
        // }

        //console.log(index);

        let tmpValArr = cornerValue.slice();
        let tmpStateArr = CornerState.slice();
        tmpStateArr[index] = tmpStateArr[index]%values.length;
        tmpValArr[index] = values[tmpStateArr[index]++];

        setCornerState(tmpStateArr);
        setCornerValue(tmpValArr);
    }

    let horizontalButtonsArray =[];
    let count=1;
    for(let i=1;i<=2;i++){
        let horizontalArray=[];
        for(let j=0;j<12;j++){
            horizontalArray[j]=count++;
        }
        //count++;
        horizontalButtonsArray[i-1]=horizontalArray;
    }
        
    function AddValues(){
        let bets=[];
        for(let i=0;i<36;i++){
            if(valuearr[i]===0)
                continue;
            const b = new TicketRecordModel(i,valuearr[i]);
            bets.push(b);
        }
        const tickets = new TicketModel(bets);
        console.log(JSON.stringify(tickets));
        //useEffect(() => {
            const token = sessionStorage.getItem('id_token');
            const headers = new Headers();
            headers.set('Content-type','application/json');
            headers.set('Authorization', `Bearer ${token}`);
    
            const url = 'http://localhost:9090/api/ticket/saveticket';
            
            console.log(url);
            fetch(url,{
                method: 'POST',
                mode: 'cors',
                headers,
                body: JSON.stringify(tickets)
            }).then(async (demoData) => {
                const demo = await demoData.text();
                console.log(demo);
            }).catch((err)=>{
                console.log(err);
            });

            
        //},[])
    }

    function clearValues(){
        setInUse(false);
        betCategory="";
        currentIndex=0;
        setStatearr(Array(37).fill(0));
        setValuearr(Array(37).fill(0));
        setCornerState(Array(24).fill(0));
        setCornerValue(Array(24).fill(0));
    }

    return (
        
        <div style={{}}>
            <div className="LeftSection" style={{display:"block", height:"50%", width:"100%"}}>
                <Countdown countdown={countdown}></Countdown>
                {/* <div className="countdown" style={{float:"left", height:"1vw", width:"50vw"}}>
                    {countdown}
                </div> */}
                <Wheel num={result}></Wheel>
            </div>

            {/* <div style={{float:"none"}}> */}
                <Board></Board>
            {/* </div> */}
        </div>
        

        
        
      );
}

export default Game;
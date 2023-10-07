import { Link } from 'react-router-dom';
import { React, useEffect, useState } from 'react';
import Balance from './Balance';
import {demo} from "../links/demo"

const Navbar = ({balance}) => {

    let [flag, setFlag] = useState(sessionStorage.getItem('id_token') ==null ? false : true);
    const [demoStr, setDemoStr] = useState('');
    const token = sessionStorage.getItem('id_token');
       // console.log(token);
        const headers = new Headers();
        headers.set('Content-type','plain/text');
        headers.set('Authorization', `Bearer ${token}`);
    useEffect(() => {
        

        const url = demo();
        console.log(url);
        fetch(url,{
            method: 'GET',
            mode: 'cors',
            headers
        }).then(async (demoData) => {
            const demo = await demoData.text();
            console.log(demo);
            setDemoStr(demo);
        }).catch((err)=>{
            console.log(err);
        });
    },[])

    // useEffect(() =>{
    //     setFlag(sessionStorage.getItem('id_token') ==null ? false : true);
    // },[flag])
    
    const logout = () =>{
        //console.log("Hello");
        sessionStorage.clear();
        sessionStorage.removeItem('id_token')
        //console.log();
        window.location.href = "/";
        setFlag(false);
    }

    return (
        <nav className="navbar">
          <h1>Roulette Game</h1>
          <div className="links">
            <div style={{float:"left"}}><p>{demoStr}</p></div>
            
            <div style={{float:"left"}}><a href="/" >Home</a></div>
            {
              flag===false && <div style={{float:"left"}}><a href="/login" onClick={() => setFlag(true)}>Login</a></div>
            }
            {
                flag===true && <div style={{float:"left"}}><a href="/game">Game </a></div>
            }
            {
                flag===true && <div style={{float:"left"}}><a href="/claims">Claims </a></div>
            }
            {
              // flag===true && <Balance balance={balance}></Balance>
              flag===true && <div style={{float:"left", marginLeft:"16px"}}>Balance : {balance}</div>
            }
            {
                
              flag===true && <div style={{float:"left", marginLeft:"16px"}}><button onClick={logout}>Logout</button></div>
            }
            
          </div>
          
        </nav>
      );
    
  }
   
  export default Navbar;
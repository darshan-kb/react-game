import { Link } from 'react-router-dom';
import { React, useEffect, useState } from 'react';

const Navbar = (props) => {

    let [flag, setFlag] = useState(sessionStorage.getItem('id_token') ==null ? false : true);

    // useEffect(() =>{
    //     setFlag(sessionStorage.getItem('id_token') ==null ? false : true);
    // },[flag])
    
    const logout = () =>{
        console.log("Hello");
        sessionStorage.clear();
        console.log(sessionStorage.removeItem('id_token'));
        window.location.href = "/";
        setFlag(false);
    }

    return (
        <nav className="navbar">
          <h1>Poker Game</h1>
          <div className="links">
            <p>{props.username}</p>
            <a href="/">Home</a>
            {
              flag===false && <a href="/login" onClick={() => setFlag(true)}>Login</a>
            }
            {
                flag===true && (<a href="/game">Game </a>)
            }
            {
                
              flag===true && (<button onClick={logout}>Logout</button>)
            }
            
          </div>
          
        </nav>
      );
    
  }
   
  export default Navbar;
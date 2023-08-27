import { Link } from 'react-router-dom';
import { React } from 'react';

const Navbar = () => {

    // const verifier = generateCodeVerifier();
    // sessionStorage.setItem('codeVerifier', verifier);
    // console.log("verifier "+verifier);
    // const codeChallenge = generateCodeChallenge();
    // sessionStorage.setItem('codeChallenge', codeChallenge);
    // console.log("code challenge "+codeChallenge);
    return (
      <nav className="navbar">
        <h1>Poker Game</h1>
        <div className="links">
          <a href="/">Home</a>
          <a href="/login">Login</a>
          
        </div>
        
      </nav>
    );
  }
   
  export default Navbar;
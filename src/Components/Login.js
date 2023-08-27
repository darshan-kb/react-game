import { React } from 'react';
import {Link} from 'react-router-dom';
import { generateCodeVerifier, generateCodeChallenge } from '../pkce/pkce';
const Login = () => {
    const verifier = generateCodeVerifier();
    sessionStorage.setItem('codeVerifier', verifier);
    console.log("verifier "+verifier);
    const codeChallenge = generateCodeChallenge();
    sessionStorage.setItem('codeChallenge', codeChallenge);
    console.log("code challenge "+codeChallenge);
    return (
        <>
            
            <Link to={'/redirect'}>Login</Link>
        </>
    );
}

export default Login;
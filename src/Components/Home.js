import { useEffect, useState } from "react";
import {demo} from "../links/demo"
import Navbar from "./Navbar";
const Home =() =>{
    const [balance, setBalance] = new useState(0);
    const token = sessionStorage.getItem('id_token');
        const headers = new Headers();
        headers.set('Content-type','plain/text');
        headers.set('Authorization', `Bearer ${token}`);
    useEffect(()=>{
        var requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: headers
          };
        fetch("http://localhost:9090/account/balance", requestOptions)
            .then(response => response.text())
            .then(result => setBalance(JSON.parse(result)))
            .catch(error => console.log('error', error));
    },[])
    return <>
    <Navbar balance={balance}/>
    <div>
        <h1>Home</h1>
    </div>
    </>
}

export default Home;
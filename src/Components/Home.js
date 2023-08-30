import { useEffect, useState } from "react";
import {demo} from "../links/demo"
import Navbar from "./Navbar";
const Home =() =>{
    const [demoStr, setDemoStr] = useState('');
    useEffect(() => {
        const token = sessionStorage.getItem('id_token');
        console.log(token);
        const headers = new Headers();
        headers.set('Content-type','plain/text');
        headers.set('Authorization', `Bearer ${token}`);

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
    return <>
    <Navbar username={demoStr}/>
    <div>
        <h1>Home</h1>
    </div>
    <div>
        <p>{demoStr}</p>
    </div>
    </>
}

export default Home;
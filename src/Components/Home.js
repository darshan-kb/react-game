import { useEffect, useState } from "react";
import {demo} from "../links/demo"
const Home =() =>{
    const [demoStr, setDemoStr] = useState('default');
    useEffect(() => {
        const token = sessionStorage.getItem('id_token');
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
        });
    },[])
    return <>
    <div>
        <h1>Home</h1>
    </div>
    <div>
        <p>{demoStr}</p>
    </div>
    </>
}

export default Home;
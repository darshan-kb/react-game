import { useEffect, useState } from "react";

const Balance = (balance) =>{
    // const [balance, setBalance] = useState(0);
    // const token = sessionStorage.getItem('id_token');
    // const headers = new Headers();
    // headers.set('Content-type','application/json');
    // headers.set('Authorization', `Bearer ${token}`);
    // useEffect(()=>{
    //   var requestOptions = {
    //     method: 'GET',
    //     mode: 'cors',
    //     headers: headers
    //   };
    // fetch("http://localhost:9090/account/balance", requestOptions)
    //     .then(response => response.text())
    //     .then(result => {
    //       setBalance(JSON.parse(result));
    //     })
    //     .catch(error => console.log('error', error));
    // },[balance])
        

    return <>
    <div style={{float:"left", marginLeft:"16px"}}>Balance : {balance}</div>
    </>
}

export default Balance;
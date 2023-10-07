import { useEffect, useState } from "react";

function SingleClaim({claimId, gameId, ticketId, betName, betAmount, claimAmount, redeem}){
    
    //claim =claim.claim;
    //console.log(redeem);
    return <tr>
        <td style={{ color:"white", width:"100px"}}>{gameId}</td>
        <td style={{ color:"white", width:"100px"}}>{ticketId}</td>
        <td style={{ color:"white", width:"100px"}}>{claimId}</td>
        <td style={{ color:"white", width:"100px"}}>{betName}</td>
        <td style={{ color:"white", width:"100px"}}>{betAmount}</td>
        <td style={{ color:"white", width:"120px"}}>{claimAmount}</td>
        <td style={{ color:"white", width:"120px"}}><button style={{ width:"100px", height:"25px"}} onClick={redeem}> Claim </button></td>
    </tr>
    
}
const Claim = () =>{
    const [claims, setClaims] = new useState([]);
    let token = sessionStorage.getItem('id_token');
        let headers = new Headers();
        headers.set('Content-type','application/json');
        headers.set('Authorization', `Bearer ${token}`);
    function redeemClaim(claimId){
        console.log(claimId);
        var requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: headers,
            body: JSON.stringify({"claimId":claimId})
          };
        fetch("http://127.0.0.1:9090/api/claims", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
            })
            .catch(error => console.log('error', error));
    }
    useEffect(()=>{
        var requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: headers
          };
        fetch("http://127.0.0.1:9090/api/claims", requestOptions)
            .then(response => response.text())
            .then(result => {
                //console.log(result);
                let res = JSON.parse(result);
                setClaims(res);
            })
            .catch(error => console.log('error', error));
   },[])

   return(
        <>
        <table>
            <thead>
            <tr>
                <th style={{ color:"white", width:"100px"}}>Game Id</th>
                <th style={{ color:"white", width:"100px"}}>Ticket Id</th>
                <th style={{ color:"white", width:"100px"}}>Claim Id</th>
                <th style={{ color:"white", width:"100px"}}>Bet Name</th>
                <th style={{ color:"white", width:"100px"}}>Bet Amount</th>
                <th style={{ color:"white", width:"120px"}}>Claim Amount</th>
                <th style={{ color:"white", width:"120px"}}>Claim</th>
            </tr>
        
        {
            claims.map((claim)=>{
                //console.log(claim.claimId);
                return <SingleClaim key={claim.claimId} claimId={claim.claimId} gameId={claim.gameId} ticketId={claim.ticketId} betName={claim.betName} betAmount={claim.betAmount} claimAmount={claim.claimAmount} redeem={()=>redeemClaim(claim.claimId)}></SingleClaim>
            })
        }
        </thead>
        </table>
        </>
   );
}
export default Claim;
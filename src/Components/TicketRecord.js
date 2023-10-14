import 'bootstrap/dist/css/bootstrap.css';
const TicketRecord = ({loading, tickets}) => {
    if(loading){
        return <h2>Loading....</h2>
    }
    console.log(tickets);
    return <>
    <div style={{marginTop:"5%", marginLeft:"20%"}}>
    <table>
        <thead>
        <tr>
                    <th style={{ color:"black", width:"100px"}}>Ticket Id</th>
                    <th style={{ color:"black", width:"100px"}}>Timestamp</th>
                    <th style={{ color:"black", width:"100px"}}>Bet Id</th>
                    <th style={{ color:"black", width:"100px"}}>Bet Name</th>
                    <th style={{ color:"black", width:"100px"}}>Bet Amount</th>
                    <th style={{ color:"black", width:"120px"}}>Amount Won</th>
        </tr>
            {tickets.map(ticket=>(
                <tr key={ticket.betId+"1"}>
                    <td  style={{ color:"black", width:"100px"}}> {ticket.ticketId} </td>
                    <td  style={{ color:"black", width:"250px"}}> {ticket.timestamp} </td>
                    <td style={{ color:"black", width:"100px"}}> {ticket.betId} </td>
                    <td style={{ color:"black", width:"100px"}}> {ticket.betName} </td>
                    <td style={{ color:"black", width:"100px"}}> {ticket.betAmount} </td>
                    <td style={{ color:"black", width:"100px"}}> {ticket.amountWon} </td>
                </tr>
            ))}
        </thead>
    </table>
    </div>
    </>
    
}

export default TicketRecord;
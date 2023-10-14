import { useEffect, useState } from "react";
import CPagination from "./CPagination";
import TicketRecord from "./TicketRecord";
import Navbar from "./Navbar";
const TicketReport = () =>{

    const[totalPages, setTotalPages] = useState(0);
    const[currentPage, setCurrentPage] = useState(0);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = new useState(0);
    const token = sessionStorage.getItem('id_token');
    const headers = new Headers();
    headers.set('Content-type','application/json');
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
    useEffect(()=>{
        var requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: headers
          };
        fetch("http://127.0.0.1:9090/report/ticket/pages", requestOptions)
            .then(response => response.text())
            .then(result => setTotalPages(JSON.parse(result)))
            .catch(error => console.log('error', error));
    },[])
    useEffect(()=>{
        var requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: headers
          };
          const fetchTickets = async () =>{
            fetch("http://127.0.0.1:9090/report/ticket/"+currentPage, requestOptions)
            .then(response => response.text())
            .then(result => {
                setLoading(true);
                let t = JSON.parse(result)
                setTickets(t)
                // tickets.map((tick)=>{
                //     console.log(tick);
                // })
                setLoading(false);
            })
            .catch(error => console.log('error', error));
          }

          fetchTickets();
            
    },[currentPage])

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    return (
        <>
        <Navbar balance={balance} theme={"black"}></Navbar>
        <div className='container mt-5'>
            <TicketRecord loading={loading} tickets={tickets}></TicketRecord>
            <CPagination totalPages={totalPages} paginate={paginate}></CPagination>
        </div>
        </>
        
    )
}

export default TicketReport;
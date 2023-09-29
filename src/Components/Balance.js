
const Balance = () =>{
    const token = sessionStorage.getItem('id_token');
    const headers = new Headers();
    headers.set('Content-type','application/json');
    headers.set('Authorization', `Bearer ${token}`);

        var requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: headers
          };
        fetch("http://localhost:9090/account/balance", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    
}

export default Balance;
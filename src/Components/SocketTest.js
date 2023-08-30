//import {Client} from '@stomp/stompjs'
import React, { useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

//import { Client } from 'stompjs'

const SocketTest = () =>{
    // const client = new Client({
    //     brokerURL: 'ws://localhost:8080/gs-guide-websocket/',
    //     onConnect: () => {
    //         client.subscribe('/topic/greetings', message => console.log("Received "+message.body));
    //         client.publish({
    //             destination: "/app/hello",
    //             body: "First message"
    //         });
            
    //     },
        
    // });
    // client.activate();
    // const client = new Client({
    //     brokerURL: 'ws://localhost:8080/gs-guide-websocket'
    // })
    const socket = new SockJS('http://localhost:8080/ws');
    // socket.onerror = (error) => {
    //     console.error('WebSocket error:', error);
    //   };
      socket.onopen = () =>{console.log('open')};
    let stompClient = Stomp.over(socket);
    stompClient.connect({},() =>{
        console.log("connected");
        stompClient.subscribe('/topic/greetings', (greeting) => {
            const message = JSON.parse(greeting.body);
            console.log(`Received: ${message.content}`);
        });
    });
    //stompClient.send('/app/hello', {}, JSON.stringify({ 'name': 'John' }));
    return (<h1>Hello from socket</h1>);
}

export default SocketTest;
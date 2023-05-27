import React, { Fragment, createElement } from "react";
import {io} from 'socket.io-client';
import{Axios} from 'axios';
function Chat(){
  let conInit=io('http://localhost:3000/');
console.log(conInit.connected)
    conInit.emit("welcomeMessage","Welcome to mind-sam. What can I assist you with?"); 
    conInit.on("welcomeMessage",function(eventStatus){
      console.log("Welcome to the chat!")
      var textEl=document.getElementById("text");
var textBox=document.createElement("p");
textBox.textContent=eventStatus;
textEl?.appendChild(textBox);
    });
  
    return(
   <Fragment>
    <ul id="text"></ul>
 <form>
   <input type="text"/> 
 </form>
 <h1>Mind Sam</h1>
</Fragment>

    );

    
  
}

export default Chat
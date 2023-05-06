import React, { Fragment, createElement } from "react";
import {io} from 'socket.io-client';
import{Axios} from 'axios';
function Chat(){
  let conInit=io('http://localhost:3000/');

    conInit.emit("welcomeMessage","Welcome to mind-sam. What can I assist you with?"); 
    conInit.on("welcomeMessage",function(eventStatus){
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
    
   

       
    </Fragment>

    );

    
  
}

export default Chat
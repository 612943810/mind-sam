import React, { Fragment, createElement,useEffect } from "react";
import {io} from 'socket.io-client';
import axios from 'axios';
function Chat(){
  useEffect(()=>{
    axios.get("http://localhost:3000/").then((response)=>{
      console.log(response.data)
    })
  })
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
  conInit.on("connection",(status)=>{
    console.log(status)
  })
    return(
   <Fragment>

 <form>
   <input type="text" placeholder="Please type something to the bot." style={{width:400,height:50}} /> 
 </form>
</Fragment>

    );

    
  
}

export default Chat
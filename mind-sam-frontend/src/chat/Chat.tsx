import React, { Fragment, createElement,useEffect, useState } from "react";
import {io} from 'socket.io-client';
import axios from 'axios';
import './Chat.css';
function Chat(){
  let [chat,setChat]=useState(''); 
 let conInit=io('http://localhost:3000/');  
  let submitChat=(submitVal:any)=>{
submitVal.preventDefault();
if(chat=="1"){
var textEl=document.getElementById("chatText");
var menuButton=document.createElement("button");
menuButton.textContent="Entertainment";
 textEl?.appendChild(menuButton);
conInit.emit("showMenu",menuButton);
}
};
  useEffect(()=>{
return()=>{
 axios.get("http://localhost:3000/").then((response)=>{
     console.log(response.data)
    })
    console.log(`Data: ${chat}`)

    
    conInit.on("welcomeMessage",(socketConnect)=>{
  var textEl=document.getElementById("chatText");
  var textBox=document.createElement("p");
  textBox.textContent=socketConnect;
  textEl?.appendChild(textBox);

  conInit.on("messageDisplay",(clientLis)=>{
    console.log(clientLis);
    var textEl=document.getElementById("chatText");
  var textBox=document.createElement("p");
  textBox.style.backgroundColor='#15b097ff';
 textBox.style.borderRadius='30%';
 textBox.style.padding="1%";
  textBox.style.overflow="hidden";
  textBox.textContent=clientLis;
  textEl?.appendChild(textBox);
  });


});


}

}
  

  ,[]);



    return(
   <Fragment>
  <div id="chatText"></div>
 <form onSubmit={submitChat}>

   <input type="text" placeholder="Please type something to the bot."  className='chatText'  value={chat} onChange={(formVal)=>setChat(formVal.target.value)}/> 
   <button type="submit" className="chatButton">Send</button>
 </form> 

</Fragment>

    );

    
  
}

export default Chat
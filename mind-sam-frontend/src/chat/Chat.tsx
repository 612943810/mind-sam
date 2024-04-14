import React, { ClassAttributes, Fragment, RefAttributes, createElement,useEffect, useState } from "react";
import {io} from 'socket.io-client';
import axios from 'axios';
import './Chat.css';
import Navigation from "../navigation/Navigation";
import Button from "../Button/Button";
function Chat(){
  let [chat,setChat]=useState(''); 
 let conInit=io('http://localhost:3001/');  
  let submitChat=(submitVal:any)=>{
submitVal.preventDefault();
if(chat=="1"){
var textEl=document.getElementById("chatText");
var menuButton=document.createElement("button")
menuButton.textContent="News";
menuButton.addEventListener('click',()=>{
  window.open("https://www.cbc.ca/news");
});
textEl?.appendChild(menuButton);
conInit.emit("showMenu",menuButton);
}else if(chat=="2"){
  var textEl=document.getElementById("chatText");
  var menuButton=document.createElement("button")
  menuButton.textContent="Guide for Business Owners";
  menuButton.addEventListener('click',()=>{
    window.open("https://www.businessnewsdaily.com/4686-how-to-start-a-business.html");
  });
  textEl?.appendChild(menuButton);
 }
};
  useEffect(()=>{
return()=>{
 axios.get("http://localhost:3001/").then((response)=>{
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
  textBox.textContent=clientLis;
  textBox.className="chatText";
  textEl?.appendChild(textBox);

  });


});


}

}
  

  ,[]);



    return(
   <Fragment>
    {/* <div className="grid"> */}
         <div className="navigation">
    
  {/* <Navigation/>    */}
    {/* </div>
  <div id="chatText" className="chatText">

  </div>  
 
 <form onSubmit={submitChat} className="chatForm">

   <input type="text" placeholder="Please type something to the bot."  className='chatInput'  value={chat} onChange={(formVal)=>setChat(formVal.target.value)}/> 
  <div className="chatButton">
  <Button text="Send"   backgroundColor='#084b83ff' color='#fbc3bcff' />
  </div> */}
 <Button text="Chat"backgroundColor='#084b83ff' color='#fbc3bcff'/>
 {/* </form>  */}
    </div>
 

</Fragment>

    );

    
  
}

export default Chat
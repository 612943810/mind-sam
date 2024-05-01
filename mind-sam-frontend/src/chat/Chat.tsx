import React, { ClassAttributes, Fragment, RefAttributes, createElement,useEffect, useState } from "react";
import {io} from 'socket.io-client';
import axios from 'axios';
import './Chat.css';
import Navigation from "../navigation/Navigation";
import Button from "../Button/Button";
function Chat(){
    
const [isOpen, setIsOpen] = useState(false);
const [messages, setMessages] = useState([]);
const [newMessage, setNewMessage] = useState('');
  let [chat,setChat]=useState(''); 
 let conInit=io('http://localhost:3001/'); 
 const toggleChat = () => {
  setIsOpen(!isOpen);
};
const toggleChatOn = () => {
  setIsOpen(true);
};

 
const submitChat = (submitVal:any) => {
  submitVal.preventDefault();
  if(chat=="1"){
  var textEl=document.getElementById("chatMessages");
  var menuButton=document.createElement("button")
  menuButton.textContent="News";
  menuButton.addEventListener('click',()=>{
    window.open("https://www.cbc.ca/news");
  });
  textEl?.appendChild(menuButton);
  conInit.emit("showMenu",menuButton);
  }else if(chat=="2"){
    var textEl=document.getElementById("chatMessages");
    var menuButton=document.createElement("button")
    menuButton.textContent="Guide for Business Owners";
    menuButton.addEventListener('click',()=>{
      window.open("https://www.businessnewsdaily.com/4686-how-to-start-a-business.html");
    });
    textEl?.appendChild(menuButton);
   }
  setNewMessage('');
}; 


useEffect(()=>{
  return()=>{
   axios.get("http://localhost:3001/").then((response)=>{
     console.log(response.data)
    })
    console.log(`Data: ${chat}`)

    
    conInit.on("welcomeMessage",(socketConnect)=>{
  var textEl=document.getElementById("chatMessages");
  var textBox=document.createElement("p");
  textBox.textContent=socketConnect;
  textEl?.appendChild(textBox);

  conInit.on("messageDisplay",(clientLis)=>{
    console.log(clientLis);
    var textEl=document.getElementById("chatMessages");
  var textBox=document.createElement("p");
  textBox.style.padding="1%";
   textBox.style.overflow="hidden"
  textBox.textContent=clientLis;
  textBox.className="chatMessages";
  textEl?.appendChild(textBox);

  });


}); 
  }

  },[]);
return (
  <Fragment>
<button className="closeButton" onClick={toggleChatOn}> Chat </button>
<form onSubmit={submitChat}>
  <div className={`chatPopup ${isOpen ? 'open' : ''}`}> 
     
      <div className="chatHeader">
        <h3>Chat</h3>
        <button className="closeBtn" onClick={toggleChat}>Close</button>
      
      </div>

     <div id="chatMessages">
   
    </div>
    <div className="chatInput">
      <input
        type="text"
        placeholder="Type your message..."
        value={chat}
        onChange={(formVal)=>setChat(formVal.target.value)}
      />
    
    <button type="submit" >Chat</button> 
    </div>
   
  </div> 
  
</form>
      

</Fragment>
);  
}  

export default Chat
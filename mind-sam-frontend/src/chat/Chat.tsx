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

const toggleChat = () => {
  setIsOpen(!isOpen);
};
const toggleChatOn = () => {
  setIsOpen(true);
};
  let [chat,setChat]=useState(''); 
 let conInit=io('http://localhost:3001/');  
const handleSendMessage = (submitVal:any) => {
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
    var textEl=document.getElementById("chatMessages");
    var menuButton=document.createElement("button")
    menuButton.textContent="Guide for Business Owners";
    menuButton.addEventListener('click',()=>{
      window.open("https://www.businessnewsdaily.com/4686-how-to-start-a-business.html");
    });
    textEl?.appendChild(menuButton);
   }
  setNewMessage('');
}; let chatDialog=()=>{
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
  textBox.textContent=clientLis;
  textBox.className="chatMessages";
  textEl?.appendChild(textBox);

  });


});

  }
useEffect(()=>{
 
  });
return (
  <Fragment>
<button className="closeButton" onClick={toggleChatOn}> Chat </button>
<form onSubmit={chatDialog}>
  <div className={`chatPopup ${isOpen ? 'open' : ''}`}> 
     
      <div className="chatHeader">
        <h3>Chat</h3>
        <button className="closeBtn" onClick={toggleChat}>Close</button>
      
      </div>

    <div className="chatMessages">
      {messages.map((message, index) => (
        <div key={index} className="message">{message}</div>
      ))}
    </div>
    <div className="chatInput">
      <input
        type="text"
        placeholder="Type your message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  </div>
</form>
      

</Fragment>
);  
}  

export default Chat
import React, { Fragment, useEffect, useState } from "react";
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import Navigation from "../navigation/Navigation";
import Button from "../Button/Button";

function Chat(){
    
const [isOpen, setIsOpen] = useState(false);
const [messages, setMessages] = useState([]);
const [newMessage, setNewMessage] = useState('');
  let [chat,setChat]=useState(''); 
  let conInit:Socket;
useEffect(()=>{
   conInit=io('http://localhost:3001/');   
    conInit.on("welcomeMessage",(socketConnect)=>{
  var textEl=document.getElementById("chatMessages");
  var textBox=document.createElement("p");
  textBox.textContent=socketConnect;
  textEl?.appendChild(textBox);
    })
  conInit.on("messageDisplay",(clientLis)=>{
    console.log(clientLis);
    var textEl=document.getElementById("chatMessages");
  var textBox=document.createElement("p");
  textBox.style.padding="1%";
   textBox.style.overflow="hidden"
  textBox.textContent=clientLis;
  textBox.className="chatMessages";
  textEl?.appendChild(textBox);
  })

return () => {
  conInit.disconnect();
};
  },[]); 
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



  // return()=>{
  //  axios.get("http://localhost:3001/").then((response)=>{
  //    console.log(response.data)
  //   })
  //   console.log(`Data: ${chat}`)

    


  // }



  return (
    <Fragment>
      <button className="fixed bottom-6 right-6 bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg" onClick={toggleChatOn}>Chat</button>
      <form onSubmit={submitChat}>
        <div className={`fixed bottom-6 right-6 w-80 bg-white rounded-lg shadow-lg ${isOpen ? 'block' : 'hidden'}`}>
          <div className="p-3 bg-indigo-600 text-white rounded-t-lg flex justify-between items-center">
            <h3 className="text-lg font-semibold">Chat</h3>
            <button className="text-sm" onClick={toggleChat}>Close</button>
          </div>
          <div id="chatMessages" className="p-3 h-48 overflow-y-auto text-sm text-gray-800">
          </div>
          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={chat}
              onChange={(formVal) => setChat(formVal.target.value)}
              className="flex-1 border rounded px-2 py-1"
            />
            <button type="submit" className="bg-indigo-600 text-white px-3 py-1 rounded">Submit</button>
          </div>
        </div>
      </form>
    </Fragment>
  );
}  

export default Chat
import React, { useState } from "react";
import { BsRobot } from "react-icons/bs";
import { RiUserSearchLine } from "react-icons/ri";
import './Chatbot.css';
import Navbar from './Navbar';


const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm Lessa, your personal AI assistant. How can I help you manage your tasks today?", sender: "bot" },
    { text: "I need to add a new task", sender: "user" },
    { text: "Great! What is the task?", sender: "bot" },
    { text: "Complete the project report", sender: "user" },
    { text: "Task added: 'Complete the project report.' Do you want to set a deadline for this task?", sender: "bot" },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="chat-container">
        <div className="chat-header">
          <h1>
            <BsRobot className="chat-icon" /> Lessa Chat Bot
          </h1>
        </div>
        <div className="chat-body">
          {messages.map((message, index) => (
            <div key={index} className={`chat-message ${message.sender}`}>
              <div className={`message-bubble ${message.sender}`}>
                {message.sender === "bot" ? (
                  <BsRobot className="message-icon bot" />
                ) : (
                  <RiUserSearchLine className="message-icon user" />
                )}
                {message.text}
              </div>
            </div>
          ))} 
        </div>
        <div className="chat-input-container"> 
          <input
            type="text"
            className="chat-input"
            placeholder="Type your message for Lessa chatbot here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="send-button" onClick={handleSend}>
            ➤
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatBot;

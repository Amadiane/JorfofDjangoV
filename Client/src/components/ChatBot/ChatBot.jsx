import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

const ChatBot = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isChatBotVisible, setIsChatBotVisible] = useState(false);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTop = scrollViewRef.current.scrollHeight;
    }
  };

  const sendMessage = async () => {
    if (userInput.trim()) {
      const newMessage = { text: userInput, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setUserInput("");

      try {
        const response = await fetch("https://chatbot02.tamtechsolution.com/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userInput }),
        });

        const data = await response.json();
        const botMessage = { text: data.response, sender: "bot" };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        alert("Erreur lors de l'envoi du message.");
      }
    }
  };

  // Animation de la tête qui bouge de gauche à droite
  const headAnimation = {
    animation: "headMove 1s infinite linear"
  };

  return (
    <div className="fixed bottom-5 right-5">
      {!isChatBotVisible && (
        <button onClick={() => setIsChatBotVisible(true)} className="">
          <img 
            src="/src/assets/avatar2.png" 
            alt="Chatbot" 
            className="w-15 h-16" 
            style={headAnimation} 
          />
        </button>
      )}

      {isChatBotVisible && (
        <div className="w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
            <span>Chatbot</span>
            <button onClick={() => setIsChatBotVisible(false)}>
              <FaTimes />
            </button>
          </div>
          <div ref={scrollViewRef} className="flex-1 overflow-y-auto p-3">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 p-2 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white ml-auto" : "bg-gray-200 text-black mr-auto"}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="p-3 flex gap-2 border-t">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Écrivez un message..."
              className="flex-1 p-2 border rounded-lg"
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage} className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
              <IoMdSend size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Injection du style global pour l'animation
const style = document.createElement("style");
style.innerHTML = `
  @keyframes headMove {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(5deg); }
    50% { transform: rotate(0deg); }
    75% { transform: rotate(-5deg); }
    100% { transform: rotate(0deg); }
  }
`;
document.head.appendChild(style);

export default ChatBot;

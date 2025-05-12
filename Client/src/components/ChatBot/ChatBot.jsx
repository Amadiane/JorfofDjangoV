import React, { useEffect, useRef } from "react";
import avatarImage from '../../assets/avatar2.png';  // Correctement importé
 // Correctement importé

const ChatBot = () => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.src = "/chatbot.html"; // chatbot.html doit être dans /public
    }
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {/* Affichage de l'image avatar */}
      <img src={avatarImage} alt="Avatar" className="w-16 h-16 border-2 border-red-500" />
      
      {/* Section du chatbot */}
      <div style={{ width: "100%", height: "500px", border: "1px solid #ccc", borderRadius: "8px", overflow: "hidden" }}>
        <iframe
          ref={iframeRef}
          title="ChatBot"
          width="100%"
          height="100%"
          style={{ border: "none" }}
        />
      </div>
    </div>
  );
};

export default ChatBot;

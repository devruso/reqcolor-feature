import React, { useState, useEffect } from "react";
import { withTaskContext } from "@twilio/flex-ui";
import { calculateElapsedTime, checkMessageTime } from "../../utils";
import moment from "moment";
import "./index.css";

const TaskItemData = (props) => {
  const [backgroundColor, setBackgroundColor] = useState("white");
  
  // Access to higher divs
  const child = document.querySelector(".timeComponentContainerSla");
  if(child){
    parent = child.parentNode;
    const grandParent = parent.parentNode;
    const grandGrandParent = grandParent.parentNode;
    grandGrandParent.classList.add("grandGrandParent");
  }

  useEffect(() => {  
    
    // Sets the background color of the task based on the time elapsed

    // checks messages periodically
        const checkMessageTime = async (props, grandGrandParent ,setBackgroundColor) => {
  
          const conversationSid = props.task.attributes.conversationSid;
          const conversation = await props.manager.conversationsClient.getConversationBySid(conversationSid);
          
    
    
    
          const calculateElapsedTime = (startDate, endDate) => {
            const diff = endDate - startDate;
            return Math.floor(diff / 60000); 
          };
    
          
          const messages = await conversation.getMessages();    
          if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            const currentTime = new Date();
            const messageTime = new Date(lastMessage.dateCreated);
            const elapsedTime = calculateElapsedTime(messageTime, currentTime);
    
            if (props.manager.user.identity === lastMessage.author) {
              setBackgroundColor("white");
            } else {
              if (elapsedTime >= 8) {
                setBackgroundColor("red"); 
              } else if (elapsedTime >= 4) {
                setBackgroundColor("yellow"); 
              } else {
                setBackgroundColor("green"); 
              }
            }
          }
          grandGrandParent.style.backgroundColor = backgroundColor;
    
        };

        
        const interval = setInterval(() => {
          checkMessageTime(props,grandGrandParent, setBackgroundColor);
        }, 30000); // 30 sec

    // Clears the interval when the component is destroyed
    return () => {
      clearInterval(interval);
    };

  }, [props.task]);

  return (
    <div className="timeComponentContainerSla" >
      <div className="timerSla">
        
      </div>
    </div>
  );
};

export default withTaskContext(TaskItemData);

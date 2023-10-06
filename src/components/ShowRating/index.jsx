import React, { useState, useEffect } from "react";
import { withTaskContext } from "@twilio/flex-ui";
import { calculateElapsedTime } from "../../utils";
import "./index.css";

const TaskItemData = (props) => {

  const [backgroundColor, setBackgroundColor] = useState("#e1e3ea");
  const child = document.querySelector(".timeComponentContainerSla");
  let parent, grandParent, grandGrandParent;

  useEffect(() => {  

    // Sets the background color of the task based on the time elapsed
      const updateBackgroundColor = async () => {
        
        const conversationSid = props.task.attributes.conversationSid;
        const conversation = await props.manager.conversationsClient.getConversationBySid(conversationSid);
        const messages = await conversation.getMessages();

        // Need to check if it was initiaded by a 'customer' or 'admin'
        const taskCreator = props.task._task.attributes.initiatedBy;

          // need to check if it makes sense to use the last message or the first message
        const lastMessage = messages.items[messages.items.length - 1];
        const lastMessageTime = new Date(lastMessage.timestamp);
        const elapsedTime = calculateElapsedTime(lastMessageTime);

          if (props.manager.user.identity === lastMessage.author || taskCreator != 'customer') {
            setBackgroundColor("#e1e3ea");
          } else {
            if (elapsedTime >= 8) {
              setBackgroundColor("#ee7f83"); 
            } else if (elapsedTime >= 4) {
              setBackgroundColor("#def733");
            } else {
              setBackgroundColor("#0efc6e");
            }
          }
      };

      // Checks if the backgroundColor needs to be updated periodically
      const interval = setInterval(updateBackgroundColor, 1000);

      // Clear interval on unmount
      return () => {
        clearInterval(interval);
      };

  }, [props.task,backgroundColor]);

   // Access to higher divs
   if(child){
   parent = child.parentNode;
   grandParent = parent.parentNode;
   if(parent && grandParent){
     grandGrandParent = grandParent.parentNode;
     
     grandGrandParent.classList.add("grandGrandParent")
     grandGrandParent.style.backgroundColor = backgroundColor;
   }
 }

  return (
    <div className="timeComponentContainerSla" >
      <div className="timerSla">
        
      </div>
    </div>
  );
};

export default withTaskContext(TaskItemData);

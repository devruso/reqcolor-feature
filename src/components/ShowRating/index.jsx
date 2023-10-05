import React, { useState, useEffect } from "react";
import { withTaskContext } from "@twilio/flex-ui";
import "./index.css";

const TaskItemData = (props) => {

  useEffect(async() => {
    let conversationSid = props.task.attributes.conversationSid
    let conversation =  await props.manager.conversationsClient.getConversationBySid(conversationSid)
    let {items} = await conversation.getMessages()

    let message = items.find(e => e.index === conversation.lastMessage.index)

    if(props.manager.user.identity === message.author){ // it was the attendant who sent the last message
      // CHANGE TO DEFAULT COLOR
      
    }else{// it was the customer
      // outside the TIME TO RESPONSE THE CUSTOMER
    }
    
  }, [props.task]);

  return (
    <div className="timeComponentContainerSla">
      <div className="timerSla">
        <h1>Olaaaa</h1>
      </div>
    </div>
  );
};

export default withTaskContext(TaskItemData);

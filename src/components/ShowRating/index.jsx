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
    grandGrandParent.style.backgroundColor = "white";
  }

  useEffect(() => {  
    
    // Sets the background color of the task based on the time elapsed


        // Checks messages each minute


  }, [props.task]);

  return (
    <div className="timeComponentContainerSla" >
      <div className="timerSla">
        
      </div>
    </div>
  );
};

export default withTaskContext(TaskItemData);

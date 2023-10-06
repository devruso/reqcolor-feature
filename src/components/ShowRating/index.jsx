import React, { useState, useEffect } from "react";
import { withTaskContext } from "@twilio/flex-ui";
import { updateBackgroundColor } from "../../utils";
import "./index.css";

const TaskItemData = (props) => {

  const [backgroundColor, setBackgroundColor] = useState("#e1e3ea");
  const child = document.querySelector(".timeComponentContainerSla");
  const taskCreator = props.task._task.attributes.initiatedBy;
  let parent, grandParent, grandGrandParent;

  useEffect(() => {  
    // Sets the background color of the task based on the interval
    updateBackgroundColor(props, taskCreator , setBackgroundColor)

    // Checks if the backgroundColor needs to be updated periodically, it is necessary to pass arguments the necessary arguments
    const interval = setInterval(() => {
      updateBackgroundColor(props, taskCreator, setBackgroundColor);
    }, 1000);      
        
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

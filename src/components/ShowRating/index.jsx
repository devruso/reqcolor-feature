import React, { useState, useEffect } from "react";
import { withTaskContext } from "@twilio/flex-ui";
import { calculateElapsedTime } from "../../utils";
import "./index.css";

const TaskItemData = (props) => {

  const [backgroundColor, setBackgroundColor] = useState("#e1e3ea");
  const child = document.querySelector(".timeComponentContainerSla");
  let parent, grandParent, grandGrandParent;

  useEffect(() => {  



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

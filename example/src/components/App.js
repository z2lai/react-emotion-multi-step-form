import React, { useState } from "react";

import '../App.css';
import SubscriptionForm from "./SubscriptionForm";
import Drawer from "./Drawer";



const App = props => {
const [isDrawerOut, setIsDrawerOut] = useState(false);
console.log(isDrawerOut);

  return (
    <div className="App">
      <SubscriptionForm 
        isDrawerOut={isDrawerOut} 
        setIsDrawerOut={() => setIsDrawerOut(!isDrawerOut)} 
      />
      <Drawer isDrawerOut={isDrawerOut} />
    </div>
  );
}

export default App;

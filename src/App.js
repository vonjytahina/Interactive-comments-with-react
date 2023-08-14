import React, {useState } from "react";
import Comments from "./comments/Comments";

function App() {
  const [showVignet, setShowVignet] = useState(false)
  const handleVignet = (val) => {
    setShowVignet(val)
  }
  return (
    <>
    <div className="container">
      <div className="app">
        <Comments handleVignet={(val) => handleVignet(val)}/>          
      </div>
    </div>
    <div class="attribution">
    Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
    Coded by <a href="https://www.frontendmentor.io/profile/vonjytahina" target="_blank">Vonjy Tahina CHAN</a>.
  </div>
    {showVignet && <div class="vignet"></div>}
    
    </>
  );
}

export default App;

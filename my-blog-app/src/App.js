import "./App.css";
import { RouterPrincipal } from "./routers/RouterPrincipal";

import { UserContext } from "./context/UserContext";
import { useEffect, useState } from "react";
function App() {
 
  const [showSignIn, setShowSignIn] = useState({
    nameUser: "",
    curp:'',
    status: false,
  });



  useEffect(() => {
  }, []);

  return (
    <div className="w-full grid grid-cols-1 justify-center">
      <div className="">
        <UserContext.Provider value={{ showSignIn, setShowSignIn }}>
          <RouterPrincipal />
        </UserContext.Provider>
      </div>
      <div></div>
    </div>
  );
}

export default App;

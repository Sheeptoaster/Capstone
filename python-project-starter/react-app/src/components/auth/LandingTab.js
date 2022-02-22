import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function LandingTab() {
   const [tab, setTab] = useState(0);

   let page
   if(tab === 1) {
      page = <SignUpForm setTab={setTab}/>
   } else {
      page = <LoginForm setTab={setTab}/>
   }
   return (
      <>
         {page}
      </>
   );
}

export default LandingTab;

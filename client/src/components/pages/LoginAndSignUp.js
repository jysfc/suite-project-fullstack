import React from "react";
import AppTemplate from "../ui/AppTemplate";
import SignUp from "../ui/SignUp";
import LogIn from "../ui/LogIn";

export default function LoginAndSignUp() {
   return (
      <AppTemplate>
         <div className="row">
            {/* <!--COL LEFT--> */}
            {/* <!--new member--> */}
            <SignUp />

            {/* <!--COL RIGHT--> */}
            {/* <!-- return card --> */}
            <LogIn />
         </div>
      </AppTemplate>
   );
}

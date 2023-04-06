import React from "react";
import styles from "./account.module.css";
import {MdOutlineMail, MdLock, MdVisibility, MdVisibilityOff} from 'react-icons/md'
import { useState } from "react";

interface Props{
  userStatus: string;
}


export const ManageAccount:React.FC<Props> = ({userStatus}) => {
    const [pswrdVisibility, setPswrdVisibility] = useState("password");

 
 function loginBtnClicked(){
  console.log("login clicked");
 }

 function wantToLoginBtnClicked(){
    console.log("want to log in clicked");
   }

 function signUpBtnClicked(){
    console.log("sign up clicked");
   }

   function wantToSignUpBtnClicked(){
    console.log("want tp sign up clicked");
   }



 function togglePassword()
 {
 const visibility = pswrdVisibility === 'password' ? 'text' : 'password';
  setPswrdVisibility( visibility);
 }
 
  if(userStatus=="wantToLogin")
  return (
    <>
    <div className={styles.accountWrapper}>
      <h1>Login</h1>
      <div className={styles.accountForm}>
      <div className={styles.inputWrapper}>
        <MdOutlineMail size={20} className={styles.icon}/>
          <input placeholder="E-Mail"
              name="email"
              type="text"
            />          
          </div>
          <div className={styles.inputWrapper}>
          <MdLock size={20} className={styles.icon}/>
      
            <input
            placeholder="Password"
              name="password"
              type={pswrdVisibility}
            />
           {(pswrdVisibility=="password")?<MdVisibilityOff size={20} className={styles.icon} onClick={togglePassword}/>:<MdVisibility size={20} className={styles.icon} onClick={togglePassword}/>} 
          </div>
          </div>
          <label id="errorMsg"></label>
          <div  className={styles.accountBtnContainer}>
            <button className={styles.accountBtn} onClick={loginBtnClicked}>Login</button>
        
            <p className={styles.accountText}>Don&apos;t have an account? <label className={styles.signUpBtn} onClick={wantToSignUpBtnClicked}>Sign up here!</label> </p>
         </div> 
   </div>
    </>
  );
  else if (userStatus=="wantToSignUp")
  {
    return (
        <>
        <div className={styles.accountWrapper}>
          <h1>Sign Up</h1>
          <div className={styles.accountForm}>
          <div className={styles.inputWrapper}>
            <MdOutlineMail size={20} className={styles.icon}/>
              <input placeholder="E-Mail"
                  name="email"
                  type="text"
                />          
              </div>
              <div className={styles.inputWrapper}>
              <MdLock size={20} className={styles.icon}/>
          
                <input
                placeholder="Password"
                  name="password"
                  type={pswrdVisibility}
                />
               {(pswrdVisibility=="password")?<MdVisibilityOff size={20} className={styles.icon} onClick={togglePassword}/>:<MdVisibility size={20} className={styles.icon} onClick={togglePassword}/>} 
              </div>
              </div>
              <label id="errorMsg"></label>
              <div  className={styles.accountBtnContainer}>
                <button className={styles.accountBtn} onClick={signUpBtnClicked}>Sign Up</button>
            
                <p className={styles.accountText}>Already have an account? <label className={styles.signUpBtn} onClick={wantToLoginBtnClicked}>Login here!</label> </p>
             </div> 
       </div>
        </>)
  }
else return;
};

import React from "react";
import styles from "./account.module.css";
import {MdOutlineMail, MdLock, MdVisibility, MdVisibilityOff} from 'react-icons/md'
import { useState } from "react";
import { login } from "../../services/LoginService";
import { register } from "../../services/RegisterService";


interface Props{
  userStatus: string;
  onClick:(buttonType: string) => void
}


export const ManageAccount:React.FC<Props> = ({userStatus, onClick}) => {
    const [pswrdVisibility, setPswrdVisibility] = useState("password");

 
 function loginBtnClicked(){
  const email= document.querySelector<HTMLInputElement>('#email').value
  const password=document.querySelector<HTMLInputElement>('#password').value
  login(email, password)
  .then (response => {
    const token  =  response.token;
    localStorage.setItem("token", token);
}).catch(err => console.log(err));
};


 function signUpBtnClicked(){
  const email= document.querySelector<HTMLInputElement>('#email').value
  const password=document.querySelector<HTMLInputElement>('#password').value
  register(email, password)  
}


 function togglePassword()
 {
  const visibility = pswrdVisibility === 'password' ? 'text' : 'password';
  setPswrdVisibility( visibility);
 }

  if (userStatus=="wantToLogin")
  return (
    <>
    <div className={styles.accountWrapper} id="accountWrapper">
      <div className="closeBtn" onClick={(e) => onClick("closeBtn")}>X</div>
      <h1>Login</h1>
      <div className={styles.accountForm}>
      <div className={styles.inputWrapper}>
        <MdOutlineMail size={20} className={styles.icon}/>
          <input placeholder="E-Mail"
              name="email"
              type="text"
              id="email"
            />          
          </div>
          <div className={styles.inputWrapper}>
          <MdLock size={20} className={styles.icon}/>
      
            <input
            placeholder="Password"
              name="password"
              type={pswrdVisibility}
              id="password"
            />
           {(pswrdVisibility=="password")?<MdVisibilityOff size={20} className={styles.icon} onClick={togglePassword}/>:<MdVisibility size={20} className={styles.icon} onClick={togglePassword}/>} 
          </div>
          </div>
          <label id="errorMsg"></label>
          <div  className={styles.accountBtnContainer}>
            <button className={styles.accountBtn} onClick={loginBtnClicked}>Login</button>
        
            <p className={styles.accountText}>Don&apos;t have an account? <label className={styles.signUpBtn} onClick={(e) => onClick("wantToSignUpBtn")}>Sign up here!</label> </p>
         </div> 
   </div>
    </>
  );

  else if (userStatus=="wantToSignUp")
  {
    return (
        <>
      
        <div className={styles.accountWrapper} id="accountWrapper">
           <div className="closeBtn" onClick={(e) => onClick("closeBtn")}>X</div> <h1>Sign Up</h1>
          <div className={styles.accountForm}>
          <div className={styles.inputWrapper}>
            <MdOutlineMail size={20} className={styles.icon}/>
              <input placeholder="E-Mail"
                  name="email"
                  type="text"
                  id="email"
                />          
              </div>
              <div className={styles.inputWrapper}>
              <MdLock size={20} className={styles.icon}/>
          
                <input
                placeholder="Password"
                  name="password"
                  type={pswrdVisibility}
                  id="password"
                />
               {(pswrdVisibility=="password")?<MdVisibilityOff size={20} className={styles.icon} onClick={togglePassword}/>:<MdVisibility size={20} className={styles.icon} onClick={togglePassword}/>} 
              </div>
              </div>
              <label id="errorMsg"></label>
              <div  className={styles.accountBtnContainer}>
                <button className={styles.accountBtn} onClick={signUpBtnClicked}>Sign Up</button>
                <p className={styles.accountText}>Already have an account? <label className={styles.signUpBtn} onClick={(e) => onClick("wantToLoginBtn")}>Login here!</label> </p>
             </div> 
       </div>
        </>)
  }
  //else is either login or not login
else return;
};

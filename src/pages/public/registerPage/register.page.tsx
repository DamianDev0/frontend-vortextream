import smallLogo from "../../../assets/img/smallLogo.png"; {/* Logotipo of VorteXtream  */}
import { useState } from "react";
import LoginComponent from "./LoginForm.component";
import "./styles/index.css";
import RegisterComponent from "./registerForm.component"; 
import { useAuth } from "../../../auth/auth.provider";
import { Navigate } from "react-router-dom";
import "./styles/style.circle.css"

// interface RegisterPageProps{
//   state: React.Dispatch<SetStateAction<boolean>>
// }

interface IRegisterProps {
  isRegister?: boolean
}

export default function RegisterPage({ isRegister } : IRegisterProps) {
  const [isLogin, setIsLogin] = useState(!isRegister); {/*State we will you use for know if to show Login or register, value default: login*/ }

  const auth = useAuth()
  
  if(auth.isAuthenticated){
    return <Navigate  to={'/'} />
  }

  const putRegister = (e: React.FormEvent<HTMLButtonElement>) => { 
    e.preventDefault();
    setIsLogin(!isLogin);
  };

  const RenderForm = isLogin ? LoginComponent : RegisterComponent; {/*Variable for the logic when using login or register */}

  return (
    <div className="registerPage-containet">
      <div className="form-container">

        {/*if show login the username wil form-modal, if not, username wil form-modal-transalate */}
        <div
          className={`form-modal ${ 
            isLogin ? "form-modal" : "form-modal-translate"
          }`}
        >
          <RenderForm onChange={setIsLogin}  /> {/*Render login for default*/}
        </div>

        <div className={`container-circle ${isLogin ? "form-modal" : "form-modal-translate"}`}>
          <div className="circle">
            <div className={`semicircle ${isLogin ? "modal-div" : "register-div"}`}></div>
          </div>
        </div>

        <div className={`modal-div ${isLogin ? "modal-div" : "register-div"}`}> {/*if show login the username wil modal-div, if not, username wil register-div */}
          <img src={smallLogo} className="logo" />
          <h1>
            {isLogin ? "Don't have an account?" : "Already have an account?"} {/*if user is in login, we say 'Don't have an account? register' if not we sat 'Already have an account? login'*/}
          </h1>
          <button className="button-modal" onClick={putRegister}>  {/*if user click here, put register*/ }
            {isLogin ? "Register!" : "Login!"} {/*complements the sentence on the line 33 */}
          </button>
        </div>
      </div>
    </div>
  );
}

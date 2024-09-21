import LoginButtonComponent from "../loginButton/loginButton.component";
import SignUpButtonComponent from "../SignUpButton/signUpButton.component";
import Logo from "../../../assets/img/Logo.png";
import "./styles/styleHeader.css";
import ExplorerButtonComponent from "../explorerButton/explorerButton.component";
import { useAuth } from "../../../auth/auth.provider";
import UserConfigComponent from "../userConfig/userConfig.component";
import { useLocation } from "react-router-dom";

const HeaderComponent = () => {
  const auth = useAuth();
  const location = useLocation();
  const pathname = location.pathname
  const isWatchStream = location.pathname.startsWith("/watchstream")
  console.log(pathname);
  
  const RenderForm2 = auth.isAuthenticated ? UserConfigComponent : LoginButtonComponent;

  return (
    <header className={isWatchStream ? "header-watch-stream" : 'header'}>
      <div className="container-explorer">
        <div className="container-logo">
          <img src={Logo} alt="LogoImg" className="logo" />
        </div>
        <ExplorerButtonComponent />
      </div>

      <div className="container-search">
        {auth.isAuthenticated === false &&( 
          <SignUpButtonComponent  />
        )}
        <RenderForm2 className="container-menuUser-landing" />
      </div>
    </header>
  );
};

export default HeaderComponent;

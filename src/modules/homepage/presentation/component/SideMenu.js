import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../../assets/images";
import { navlinks } from "../../../../config/constants/nav_links";
import { useWalletContext } from "../../../auth/provider/WalletContext";
import { Icon } from "../widgets/Icon";

export const SideMenu = () =>{

    const navigate = useNavigate();
    const [activeIcon, setIsActive] = useState("Dashboard");
    const { disconnect,address } = useWalletContext();

    const iconClickFn = (name) => {
      setIsActive(name);
    }

    const disconnectWallet = () => {
        navigate("/");
        setIsActive("Dashboard");
        disconnect();
    }
 
    return (
      <div className="side-menu">
        <div className="user-menus">
          {navlinks.map((link,index) => (
            (address || link.name === 'Dashboard')
                ? <Link to={link.link} key={link.name}><Icon name={link.name} onClickFn={iconClickFn} isActive={activeIcon} imgURL={link.imgURL}/></Link>
                : <div key={index}/>
          ))}
        </div>
        <div className="logout-btn">
            {address ? (
            <Icon key={logout} name="logout-btn" imgURL={logout} onClickFn={disconnectWallet} />
            ) : (
            <></>
            )}
        </div>
      </div>
    );
}
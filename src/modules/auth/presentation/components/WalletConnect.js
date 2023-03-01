import { useNavigate } from "react-router-dom";
import { useWalletContext } from "../../provider/WalletContext";
import { CustomButton } from "../widgets/CustomButton";

export const WalletConnect = () => {
    const { connect, address, disconnect } = useWalletContext();
    const navigate = useNavigate();
    return (
        <div className="user-links row justify-center">
            <CustomButton 
                title={(address)? "Wallet Connected": "Connect to Wallet"}
                icon={(address)? "fa-check" : "fa-wallet"}
                onClickFn={
                    (address) ? ()=>{
                        disconnect();
                        navigate("/");
                    } : connect
                }
            />
            <div className="user-icon">
                <img src={`https://avatars.dicebear.com/api/micah/${address}.svg?size=32`} alt="avatar"></img>
            </div>
        </div>
    );
}
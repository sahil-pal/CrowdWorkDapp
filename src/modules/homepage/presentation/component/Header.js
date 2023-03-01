import { Link } from "react-router-dom";
import { WalletConnect } from "../../../auth/presentation/components/WalletConnect";

export const Header = () => {
    return (
        <header>
            <div className="container">
                <div className="row space-between">
                    <div className="app-logo">
                        <h1> <Link to={"/"}>CrowdWork</Link> </h1>
                        <a href="https://www.dojima.network/home" target="_blank" rel="noreferrer">
                            <span className="row justify-center">by Dojima-Network</span>
                        </a>
                    </div>
                    <div className="search-bar">
                        <form>
                            <input type="text" placeholder="Search for compaigns"/>
                        </form>
                        <button type="submit" className="submit-btn"><i className="fa-sharp fa-solid fa-magnifying-glass"></i></button>
                    </div>
                    <WalletConnect/>
                </div>
            </div>
        </header>
    );
}
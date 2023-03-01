import { dojimaIcon } from "../../../../assets/images"

export const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="row justify-center">
                    <h4>
                        Made with <i className="fa fa-heart pulse"/> by Sahil Pal using Dojima-Network
                    </h4>
                    <img src={dojimaIcon} alt="dojima-icon"/>
                </div>
            </div>
        </footer>
    )
}
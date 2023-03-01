import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { campaignImages } from "../../../../assets/images";
import { DisplayConverters } from "../../../../shared/services/DisplayConverter";
import { LoaderWidget } from "../../../../shared/widgets/Loader";
import { useWalletContext } from "../../../auth/provider/WalletContext";
import { CampaignModel } from "../../domain/model/campaign_model";
import { CrowdFundingContractOperations } from "../../domain/repo/contract_operations";

export const CampaignDetails = () =>{
    const {campaignID} = useParams();
    const [campaign,setCampaign] = useState({donators:[],donations:[],withdrawls:[]});
    const {address} = useWalletContext();
    const donationAmountRef = useRef();
    const [ isLoading, setIsLoading] = useState(false);
    const [loadingTitle,setLoadingTitle] = useState("Loading Campaign Details");
    const [verifyLink,setVerifyLink] = useState("");

    const donateToCampaignFn = async () =>{
        setLoadingTitle("Transaction & NFT Minitng under Process")
        try{
            setIsLoading(true);
            const link = await CrowdFundingContractOperations.donateToCampaign(campaignID,address,donationAmountRef.current.value,campaign.nft);
            setVerifyLink(link);
            setTimeout(()=>{
                setVerifyLink("");
            },10000);
        }catch(e){
            alert(`Transaction Failed`);
        }
        finally{
            setIsLoading(false);
        }
    }

    useEffect(() =>{
        setIsLoading(true);
        const result = CrowdFundingContractOperations.getAllCampaigns();
        result.then((res)=>{
            for(let cindex in res){
                let c = res[cindex];
                if(cindex === campaignID){
                    let currCampaign = new CampaignModel(
                        c.name,c.owner,c.title,c.description,parseInt(c.target),parseInt(c.startline),parseInt(c.deadline),
                        c.image,c.nft,c.donators,c.donations,c.withdrawls,c.amountCollected
                    );
                    setIsLoading(false);
                    setCampaign(currCampaign);
                }
            }
        }).catch()
    },[campaignID]);

    return (
       <div className="campaign-details">
            {
            (isLoading)
            ?
            <LoaderWidget title={loadingTitle}/>
            :
            <>
                <h2>{campaign.title} Campaign Details</h2>
                <div className="row space-between campaign-header">
                    <img src={campaign.image} alt={campaign.title} />
                    <div className="stats-area">
                        <div className="stats-box">
                            {
                                (DisplayConverters.daysLeft(campaign.deadline) > 0)
                                ?
                                <>
                                    <h3>{DisplayConverters.daysLeft(campaign.deadline)}</h3>
                                </>
                                :
                                <h3>Campaign Closed !</h3>
                            }
                            <p>Days Left</p>
                        </div>
                        <div className="stats-box">
                            <h3>{DisplayConverters.convertToDisplayAmount(campaign.amountCollected,2)}</h3>
                            <p >Raised Of {campaign.target} DOJ</p>
                        </div>
                        <div className="stats-box">
                            <h3>{(campaign.donations.length === undefined)?0:campaign.donations.length}</h3>
                            <p>Total Backers</p>
                        </div>
                    </div>
                </div>
                <div className="progress-bar">
                        <div className="progress" 
                            style={
                                {
                                    width: `${DisplayConverters.calculateBarPercentage(
                                    campaign.target,
                                    DisplayConverters.convertToDisplayAmount(campaign.amountCollected)
                                    )}%`,
                                    maxWidth : "100%",
                                    backgroundColor : "#FFFFFF"
                                }
                            }
                        >
                        </div>
                </div>
                <div className="row space-between">
                    <div className="campaign-info">
                        <div className="user-details">
                            <h3 className="content-green">CREATOR</h3>
                            <div className="row">
                                <img src={`https://avatars.dicebear.com/api/micah/${campaign.address}.svg?size=32`} style={{fontSize:"16px"}} alt="avatar"/>
                                <div className="col">
                                    <h4>{campaign.name}</h4>
                                    <h5>{campaign.address}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="camp-desc">
                            <h3 className="content-green">STORY</h3>
                            <p>{campaign.description}</p>
                        </div>
                        <div className="donation-list">
                            <h3 className="content-green">RECENT DONATORS</h3>
                            {   
                                (campaign.donators.length > 0)
                                ?
                                campaign.donators.map((element,index)=>{
                                    return (
                                    <div className="donation-list-box" key={index}>
                                        <p>{element}</p>
                                        <p className="content-green">{DisplayConverters.convertToDisplayAmount(campaign.donations[index],8)} DOJ</p>
                                    </div>
                                )
                                })
                                : <h4>No Donators Till Now !</h4>
                            }
                        </div>
                    </div>
                    <div className="side-box">
                        <h3 className="content-green text-center">FUND THE CAMPAIGN</h3>
                        <div className="donation-box col">
                            <input ref={donationAmountRef} type="number" placeholder="Enter DOJ to be Donated"/>
                            <button onClick={donateToCampaignFn}> Donate To Campaign </button>
                            {
                                (verifyLink)?<button className="verify-btn"><a href={verifyLink} target="_blank" rel="noreferrer">Verify MINTED NFT Here !</a></button>:<></>
                            }
                        </div>
                        <h3 className="content-green text-center">REWARDED NFT IMAGE</h3>
                        <div className="nft-box col">
                            <img src={`${campaignImages[campaignID]}`} alt="nft"/>
                        </div>
                    </div>
                </div>
                </>
            }
       </div>
    );
}
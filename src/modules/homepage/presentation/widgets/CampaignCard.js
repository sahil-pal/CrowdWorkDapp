import { Link } from "react-router-dom";
import { DisplayConverters } from "../../../../shared/services/DisplayConverter";

export const CampaignCard = ({campaign,campaignID}) =>{
    
    return (
        <div className="campaign-card">
            <div className="campaign-img">
                <img src={campaign.image} alt={`campaign.name`}/>
            </div>
            <Link to={`/campaign-details/${campaignID}`}>
                <div className="campaign-details">
                    <div className="campaign-title">
                        <h4 className="heading-green">{campaign.title}</h4>
                    </div>
                    <div className="campaign-desc">
                        <p className="content-gray">{campaign.description.substring(0,100)}...</p>
                    </div>
                    <div className="row space-between">
                        <div className="fund-details">
                            <h5>{DisplayConverters.convertToDisplayAmount(campaign.amountCollected,4)}</h5>
                            <p className="content-gray">Out of {campaign.target} Amount Raised</p>
                        </div>
                        <div className="time-details">
                            {
                                (DisplayConverters.daysLeft(campaign.deadline) > 0)
                                ?
                                <>
                                    <h5>{DisplayConverters.daysLeft(campaign.deadline)}</h5>
                                    <p className="content-gray">Days Left to End</p>
                                </>
                                :
                                <h5>Campaign Closed !</h5>
                            }
                        </div>
                    </div>
                    <div className="user-avatar row align-item-center">
                        <img src={`https://avatars.dicebear.com/api/micah/${campaign.address}.svg?size=32`} alt="avatar"/>
                        <h5><span className="content-gray">By</span> {campaign.name}</h5>
                    </div>
                </div>
            </Link>
        </div>
    );
}
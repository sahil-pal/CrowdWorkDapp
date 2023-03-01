import { CrowdFundingContractOperations } from "../../domain/repo/contract_operations";
import { useEffect,useState } from "react";
import {CampaignModel} from '../../domain/model/campaign_model';
import { CampaignCard } from "../widgets/CampaignCard";
import { LoaderWidget } from "../../../../shared/widgets/Loader";

export const AllCampaigns = () =>{
    
    const [campaigns, setCampaigns] = useState([]);
    const [ isLoading, setIsLoading] = useState(false);

    
    useEffect(() =>{
        setIsLoading(true);
        const result = CrowdFundingContractOperations.getAllCampaigns();
        let temp = [];
        result.then((res)=>{
            for(let cindex in res){
                let c = res[cindex];
                let campaign = new CampaignModel(
                    c.name,c.owner,c.title,c.description,parseInt(c.target),parseInt(c.startline),parseInt(c.deadline),
                    c.image,c.nft,c.donators,c.donations,c.withdrawls,c.amountCollected
                )
                temp.push(campaign);
            }
            CrowdFundingContractOperations.listOfAllCampaigns = temp;
            setIsLoading(false);
            setCampaigns(temp);
        }).catch()
    },[]);
    
    return (
        <div>
            <h2>View All Campaigns ( {campaigns.length} )</h2>
            {
                (isLoading)
                ?
                <LoaderWidget title="Loading Campaigns"/>
                :
                <div className="all-campaigns">
                {
                    (campaigns.length > 0)
                    ?
                    campaigns.map((i,index)=>{
                        return (
                            <CampaignCard key={index} campaignID={index} campaign={i}/>
                        );
                    })
                    :
                    <></>
                    
                }
                </div>
            }
        </div>
    );
}
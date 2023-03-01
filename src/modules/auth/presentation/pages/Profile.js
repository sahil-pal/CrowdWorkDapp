import { CrowdFundingContractOperations } from "../../../homepage/domain/repo/contract_operations";
import { useState,useEffect } from "react";
import { useWalletContext } from "../../provider/WalletContext";
import { LoaderWidget } from "../../../../shared/widgets/Loader";
import { CampaignCard } from "../../../homepage/presentation/widgets/CampaignCard";

export const UserProfile = () =>{
    
    const [ campaigns, setCampaigns] = useState([]);
    const [ isLoading, setIsLoading] = useState(false);
    const [ userName, setUserName ] = useState("User");
    const { address} = useWalletContext();
    
    useEffect(() =>{
        setIsLoading(true);
        const result = CrowdFundingContractOperations.listOfAllCampaigns;
        let temp = result.filter((res,index)=> {
            if(res.address === address){
                res.campaignID = index;
                return res;
            }
        });
        if(temp.length > 0){
            setUserName(temp[0].name);
        }
        setIsLoading(false);
        setCampaigns(temp);
    },[address]);


    return (
        <div>
            <div className="row space-between">
                <h2>View Your Campaigns ( {campaigns.length} )</h2>
                <h2>Hi, {userName} </h2>
            </div>
            {
                (isLoading)
                ?
                <LoaderWidget/>
                :
                <div className="all-campaigns">
                {
                    (campaigns.length > 0)
                    ?
                    campaigns.map((i,index)=>{
                        return (
                            <CampaignCard key={index} campaignID={i.campaignID} campaign={i}/>
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
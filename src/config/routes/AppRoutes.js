import { useRoutes } from "react-router-dom";
import { UserProfile } from "../../modules/auth/presentation/pages/Profile";
import { AllCampaigns } from "../../modules/homepage/presentation/pages/AllCompaigns";
import { CampaignDetails } from "../../modules/homepage/presentation/pages/CampaignDetails";
import { CreateCampaign } from "../../modules/homepage/presentation/pages/CreateCompaign";
import { FaqSection } from "../../modules/homepage/presentation/pages/Faqs";

export const AppRoutes = () => {
    const allRoutes = useRoutes([
        {
            path : '/',
            element : <AllCampaigns/>
        },
        {
            path : '/create-campaign',
            element : <CreateCampaign/>
        },
        {
            path : '/profile',
            element : <UserProfile/>
        },
        {
            path : '/faq',
            element : <FaqSection/>
        },
        {
            path : '/campaign-details/:campaignID',
            element: <CampaignDetails/>
        }
    ]);
    return allRoutes;
}
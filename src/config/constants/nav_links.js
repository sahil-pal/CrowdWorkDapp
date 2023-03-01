import { 
    dashboard,createCampaign,profile,faq
} from '../../assets/images/index.js';

export const navlinks = [
    {
      name: "Dashboard",
      imgURL: dashboard,
      link: "/",
    },
    {
      name: "Campaign",
      imgURL: createCampaign,
      link: "/create-campaign",
    },
    {
      name: "Profile",
      imgURL: profile,
      link: "/profile",
    },
    {
      name: "FAQs",
      imgURL: faq,
      link: "/faq",
    },
];
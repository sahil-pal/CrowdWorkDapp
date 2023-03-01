export class CampaignModel{

    constructor(name,address,title,description,target,startline,deadline,image,nft,
        donators,donations,withdrawls,amountCollected){
            this.name = name;
            this.address = address;
            this.title = title;
            this.description = description;
            this.target = target;
            this.startline = startline;
            this.deadline = deadline;
            this.amountCollected = amountCollected;
            this.image = image;
            this.nft = nft;
            this.donators = donators;
            this.donations = donations;
            this.withdrawls = withdrawls;
    }
}
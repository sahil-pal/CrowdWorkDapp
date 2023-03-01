import { FormField } from "../widgets/FormField";
import { useState } from "react";
import { ToastMessageService } from "../../../../shared/services/Toast";
import {useWalletContext} from "../../../auth/provider/WalletContext";
import { ToastContainer } from "react-toastify";
import { serializeError } from "eth-rpc-errors";
import { LoaderWidget } from "../../../../shared/widgets/Loader";
import { CrowdFundingContractOperations } from "../../domain/repo/contract_operations";
import { CampaignModel } from "../../domain/model/campaign_model";
import { DisplayConverters } from "../../../../shared/services/DisplayConverter";

export const CreateCampaign = () =>{
    
    const {address} = useWalletContext();
    const [ isLoading, setIsLoading] = useState(false);
    const [verifyLink,setVerifyLink] = useState("");

    const [formInput, setFormData] = useState({
        ownerAddress : address,
        creatorsName: "",
        title: "",
        description: "",
        targetAmount: "",
        category: "",
        startAt: "",
        endAt: "",
        imageURL: "",
        nftURL: "",
    });
    
    const handleFormFieldChange = (fieldName, e) => {
        setFormData({ ...formInput, [fieldName]: e.target.value });
    };

    const phraseError = (error) => {
        const serializedError = serializeError(error);
        const jsonError = { serializedError };
        const lines = jsonError.serializedError.message.split("\n");
        console.log(lines.at(-1));
        const e = JSON.parse(lines.at(-1)).reason;
        return e;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (address === undefined) {
          ToastMessageService.errorNotification("Please connect to your Metamask Wallet");
        }else if (formInput.targetAmount === 0) {
            ToastMessageService.errorNotification("Target Amount must be greater than 0");
        }else {
            try {
                setIsLoading(true);
                let campaign = new CampaignModel(
                    formInput.creatorsName,
                    address,
                    formInput.title,
                    formInput.description,
                    formInput.targetAmount,
                    DisplayConverters.convertFromDateToTimeStamp(formInput.startAt),
                    DisplayConverters.convertFromDateToTimeStamp(formInput.endAt),
                    formInput.imageURL,
                    formInput.nftURL
                );
                const verifyLink = await CrowdFundingContractOperations.createCampaignFn(campaign);
                console.log(verifyLink);
                setVerifyLink(verifyLink);
                setFormData({});
                setIsLoading(false);
                ToastMessageService.successNotification("Transaction Successfull");
                setTimeout(()=>{
                    setVerifyLink();
                },5000);
            } catch (error) {
                setIsLoading(false);
                const e = phraseError(error);
                ToastMessageService.errorNotification(e);
            }
        }
    };

    return (
        <div className="create-campaign">
            <div className="row justify-center">
                <h2 className="page-heading">Start A New Campaign</h2>
            </div>
            {
            (isLoading)
                ?
                <LoaderWidget title="Transaction is in Progress"/>
                :
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <FormField title="Your Name *" placeholder="John Doe" inputType="text" value={formInput.creatorsName} handleChangeFn={(e) => handleFormFieldChange("creatorsName", e)} />
                        <FormField title="Campaign Title *" placeholder="Write a title" inputType="text" value={formInput.title} handleChangeFn={(e) => handleFormFieldChange("title", e)} />
                    </div>
                    <FormField title="Story" placeholder="Write your story *" inputType="textarea" value={formInput.description} handleChangeFn={(e) => handleFormFieldChange("description", e)} />
                    <div className="row">
                        <FormField title="Campaign Goal Amount *" placeholder="DOJ 500" inputType="number" value={formInput.targetAmount} handleChangeFn={(e) => handleFormFieldChange("targetAmount", e)} />
                        <FormField title="Category *" placeholder="Education" inputType="text" value={formInput.category} handleChangeFn={(e) => handleFormFieldChange("category", e)} />
                    </div>
                    <div className="row">
                        <FormField title="Start Date *" placeholder="Enter Start Date" inputType="date" value={formInput.startAt} handleChangeFn={(e) => handleFormFieldChange("startAt", e)} />
                        <FormField title="End Date *" placeholder="Enter End Date" inputType="date" value={formInput.endAt} handleChangeFn={(e) => handleFormFieldChange("endAt", e)} />
                    </div>
                    <FormField title="Campaign Image *" placeholder="Enter the Image URL for your campaign" inputType="text" value={formInput.imageURL} handleChangeFn={(e) => handleFormFieldChange("imageURL", e)} />
                    <FormField title="Reward NFT *" placeholder="Enter Reward NFT Image URL here" inputType="text" value={formInput.nftURL} handleChangeFn={(e) => handleFormFieldChange("nftURL", e)} />
                    <div className="row justify-center">
                        {
                            (verifyLink)
                            ? <button><a href={verifyLink} target="_blank" rel="noreferrer">Verify Transaction Here !</a></button>
                            : <button type="submit">Create A New Campaign</button>
                        }
                    </div>
                    {
                        (verifyLink)
                        ?
                        <ToastContainer autoClose={5000}/>
                        :
                        <div></div>
                    }
                </form>
            }
        </div>
    );
}

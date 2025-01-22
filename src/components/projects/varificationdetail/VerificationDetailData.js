import { faDiscord, faMedium, faTelegram, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");
const { default: Link } = require("next/link");

// social links
export const renderSocialLinks = (project) => {
    const socialLinks = [
        { link: project?.websiteLink, icon: faGlobe },
        { link: project?.twitterLink, icon: faXTwitter },
        { link: project?.telegramLink, icon: faTelegram },
        { link: project?.mediumLink, icon: faMedium },
        { link: project?.discordLink, icon: faDiscord },
    ];

    return socialLinks.map(
        ({ link, icon }, idx) =>
            link &&
            link !== "N/A" &&
            link.trim() !== "" && ( // Added check for empty string
                <Link key={idx} href={link} className="theme-color" target="_blank">
                    <FontAwesomeIcon icon={icon} />
                </Link>
            )
    );
};



//kyc info
export const renderKYCInfo = (project) => {
    if (project.auditDate) {
        return (
            <p>
                <span className="font-medium text-white">Audit date:</span>&nbsp;
                <span className="theme-color font-medium">
                    {format(new Date(project.auditDate), "MMMM do yyyy")}
                </span>
            </p>
        );
    } else if (project.kycStatus === "Approved") {
        return (
            <p>
                <span className="font-medium text-white">KYC date:</span> &nbsp;
                <span className="theme-color ">
                    {format(new Date(project.kycDate), "MMMM do yyyy")}
                </span>
            </p>
        );
    }

    return null;
};
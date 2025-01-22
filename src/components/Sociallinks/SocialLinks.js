import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram, faDiscord, faXTwitter } from "@fortawesome/free-brands-svg-icons";

const SocialLinks = ({ verifiy }) => {
    const socials = [];

    if (verifiy?.telegramHandle?.trim() !== "N/A") {
        let telegramLink = verifiy?.telegram?.startsWith("https://")
            ? verifiy.telegram
            : `https://${verifiy.telegram}`;
        if (telegramLink?.includes("t.me/") && !telegramLink.includes("@")) {
            const parts = telegramLink.split("t.me/");
            telegramLink = `${parts[0]}t.me/@${parts[1]}`;
        }
        socials.push(
            <Link href={telegramLink} key="telegram" target="_blank" rel="noopener noreferrer" className="theme-color">
                <FontAwesomeIcon className="!text-sm" icon={faTelegram} />
            </Link>
        );
    }

    if (verifiy?.discord && verifiy?.discordHandle) {
        socials.push(
            <Link href={verifiy.discord} key="discord" target="_blank" rel="noopener noreferrer" className="theme-color">
                <FontAwesomeIcon className="text-xl" icon={faDiscord} />
            </Link>
        );
    }

    if (verifiy?.twitterLink) {
        socials.push(
            <Link href={verifiy.twitterLink} key="twitter" target="_blank" rel="noopener noreferrer" className="theme-color">
                <FontAwesomeIcon className="text-xl" icon={faXTwitter} />
            </Link>
        );
    }

    return (
        <>
            {socials.length > 0
                ? socials.map((social, idx) => (
                    <span key={idx}>
                        {social}
                        {idx < socials.length - 1 && " | "}
                    </span>
                ))
                : "No socials available"}
        </>
    );
};

export default SocialLinks;

import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTelegram,
  faDiscord,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

const SocialLinks = ({ verifiy }) => {
  const socials = [];

  // Telegram
  if (verifiy?.telegram?.trim() && verifiy?.telegramHandle?.trim() !== "N/A") {
    // Handle Telegram link generation dynamically
    let telegramLink = verifiy.telegram.startsWith("https://")
      ? verifiy.telegram
      : `https://${verifiy.telegram}`;

    socials.push(
      <Link
        href={telegramLink}
        key="telegram"
        target="_blank"
        rel="noopener noreferrer"
        className="theme-color"
        aria-label="Telegram"
      >
        <FontAwesomeIcon className="!text-xl" icon={faTelegram} />
      </Link>
    );
  }

  // Discord
  if (verifiy?.discord?.trim() && verifiy?.discordHandle?.trim()) {
    socials.push(
      <Link
        href={verifiy.discord}
        key="discord"
        target="_blank"
        rel="noopener noreferrer"
        className="theme-color"
        aria-label="Discord"
      >
        <FontAwesomeIcon className="text-xl" icon={faDiscord} />
      </Link>
    );
  }

  // Twitter
  if (verifiy?.twitterLink?.trim()) {
    socials.push(
      <Link
        href={verifiy.twitterLink}
        key="twitter"
        target="_blank"
        rel="noopener noreferrer"
        className="theme-color"
        aria-label="Twitter"
      >
        <FontAwesomeIcon className="text-xl" icon={faXTwitter} />
      </Link>
    );
  }
  //reender component
  return (
    <div>
      {socials.length > 0 ? (
        socials.map((social, idx) => (
          <span key={idx}>
            {social}
            {idx < socials.length - 1 && " | "}
          </span>
        ))
      ) : (
        <p className="text-sm">No socials available</p>
      )}
    </div>
  );
};

export default SocialLinks;

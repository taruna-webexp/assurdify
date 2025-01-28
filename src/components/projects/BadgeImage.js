export const BadgeImage = ({ kycStatus, auditStatus }) => {
  const getImageSource = () => {
    if (kycStatus === "Approved") {
      return "/assets/verified-beg.png";
    }
    if (auditStatus === "NotDetected" && kycStatus === "Rejected") {
      return "/assets/rejected-image.png";
    }
    if (auditStatus === "Completed" && kycStatus === "Rejected") {
      return "/assets/verified-beg.png";
    }
    return null;
  };

  const imgSrc = getImageSource();
  if (!imgSrc) return null; // No image to render

  return (
    <img
      src={imgSrc}
      onError={(e) => (e.target.src = "/assets/no-image-available.png")}
      className={imgSrc.includes("rejected") ? "max-w-16 absolute" : ""}
      alt={imgSrc.includes("verified") ? "Verified Badge" : "Rejected Badge"}
    />
  );
};

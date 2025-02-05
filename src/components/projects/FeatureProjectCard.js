import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const FeatureProjectCard = ({ project }) => {
  const {
    projectName,
    seoSlug,
    description,
    kycStatus,
    auditStatus,
    kycDate,
    verifiedMembers,
    images,
    lowerCaseTickerName,
  } = project;
  const descriptionText =
    description?.length > 260
      ? `${description.substring(0, 260)}...`
      : description;

  return (
    <Grid item xs={12} sm={6} md={6} className="featured-collunm ">
      <Link href={`/project/${seoSlug}`} title={seoSlug}>
        <Card className="theme-border-light gradient-bg-sharp-feature  !rounded-lg ">
          <div className="flex justify-between p-3 ">
            <div className="flex items-center gap-1.5">
              <Image
                alt="project image"
                width={100}
                height={100}
                src={images?.[0]?.url}
                priority
                className="w-10 rounded-full  border-2"
              />
              <div>
                <h6 className="text-white font-extrabold projectName">
                  {projectName}
                </h6>
                <span className="grey-color text-xs block">
                  {lowerCaseTickerName?.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {kycStatus === "Approved" ? (
                <Image
                  width={25}
                  height={25}
                  src="/assets/verified-beg.png"
                  alt="Verified Badge"
                  priority
                />
              ) : auditStatus === "NotDetected" && kycStatus === "Rejected" ? (
                <Image
                  width={100}
                  height={100}
                  src="/assets/rejected-image.png"
                  alt="Rejected Badge"
                  priority
                />
              ) : null}
              <span className="font-bold text-white">
                {verifiedMembers?.length || ""}
              </span>
            </div>
          </div>
          <CardContent className="!px-3 !pb-3 !pt-0">
            <Typography variant="body2" className="text-white">
              {descriptionText}
            </Typography>
          </CardContent>
          <CardActions className="!p-3 light-purple flex justify-between">
            <Typography variant="body2" className="text-white !font-medium">
              {kycDate}
            </Typography>
            <Typography
              variant="body2"
              className={`!font-semibold ${auditStatus === "Completed" ? "text-green" : "text-red-600"}`}
            >
              {auditStatus === "Completed" ? "Audited" : "Not Audited"}
            </Typography>
          </CardActions>
        </Card>
      </Link>
    </Grid>
  );
};

export default FeatureProjectCard;

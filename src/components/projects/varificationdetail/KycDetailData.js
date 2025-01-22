import { Typography } from "@mui/material";

//handle render controlover
export const renderControlOver = (controlOver) =>
    controlOver?.length > 0 ? (
        controlOver.map((item, idx) => (
            <span
                key={idx}
                className="px-2 py-1 text-white rounded light-purple text-sm"
            >
                {item}
            </span>
        ))
    ) : (
        <span className="px-2 py-1 text-white rounded light-purple text-sm">
            No Access
        </span>
    );



//verified text handler
export const renderVerifiedText = (project) => {
    const count = project?.verifiyMembersList?.length || 0;
    const text = count === 1 ? "Team Member Verified" : "Team Members Verified";
    return (
        <Typography component="span" className="text-white">
            <strong className="theme-color text-sm font-extrabold">{count}</strong>{" "}
            {text}
        </Typography>
    );
};
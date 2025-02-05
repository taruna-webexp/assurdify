import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CertificateModal({ img, open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  const processKycUrl = (url) => {
    let processedUrl = url;
    if (url?.includes("github.com")) {
      processedUrl = url
        .replace("github.com", "raw.githubusercontent.com")
        .replace("/blob/", "/");
    }
    return processedUrl;
  };

  const kycUrl = processKycUrl(img);

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="xl"
        className="certificate-modal"
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 10,
            top: 10,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Image
            width={1000}
            height={1000}
            src={kycUrl}
            style={{ width: "100%", height: "100%" }}
            alt="KYC Certificate"
            priority
          />
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}

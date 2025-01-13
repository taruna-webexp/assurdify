import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function CertificateModal({ img }) {
    console.log("kycCertificate", img);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // Function to process the KYC URL
    const processKycUrl = (url) => {
        let processedUrl = url;
        if (url?.includes('github.com')) {
            processedUrl = url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
        }
        return processedUrl;
    };

    const kycUrl = processKycUrl(img);
    console.log("kycUrl", kycUrl);

    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen}>
                Certificate
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth // Makes the dialog take the full width of the container
                maxWidth="xl" // Sets the maximum width of the dialog to extra-large
            >
                <IconButton
                    aria-label="close"
                    className='kyc-certificate-cross-icon'

                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 10,
                        top: 10,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <img src={kycUrl} style={{ width: '100%', height: "100%" }} alt="KYC Certificate" />
                </DialogContent>
            </BootstrapDialog>
        </React.Fragment>
    );
}

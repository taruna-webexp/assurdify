import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function CountryTier() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <InfoIcon onMouseOver={handleOpen} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Button className='contry-tier-close-btn' onClick={handleClose}>
                        < CloseIcon />
                    </Button>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Assure Defi country tier rankings are as follows:
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Tier 1: Strong law enforcement with resources and capabilities to effectively legislate & pursue crypto-related cybercrime.
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Tier 2: Moderately effective law enforcement, lacking some resources & capabilities to effectively pursue crypto-related cybercrime.
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Tier 3: Law enforcement & legislative resources severely lacking. In most cases would prove ineffective at pursuing crypto-related cybercrime.
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

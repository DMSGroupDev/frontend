import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import MyTheme from '../../components/common/MyTheme.js';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MyNotifyAlert(props) {
    const [open, setOpen] = React.useState(false);
    if (!open && props.showAlert)
        setOpen(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const message = props.alertInfo;
    const type = props.alertType;

    if (message) {  
        switch (type) {
            case 'error':
                return (
                    <Stack spacing={2} sx={{ width: '100%' }}>
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }} style={{ backgroundColor: MyTheme.palette.error.light, color: 'black', fontSize: '1.1em' }}>
                                {message}
                            </Alert>
                        </Snackbar>
                    </Stack>
                );
            case 'warning':
                return (
                    <Stack spacing={2} sx={{ width: '100%' }}>
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} >
                            <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }} style={{ backgroundColor: MyTheme.palette.warning.light, color: 'black', fontSize: '1.1em' }}>
                                {message}
                            </Alert>
                        </Snackbar>
                    </Stack>
                );
            case 'success':
                return (
                    <Stack spacing={2} sx={{ width: '100%' }}>
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }} style={{ backgroundColor: MyTheme.palette.success.light, color: 'black', fontSize: '1.1em' }}>
                                {message}
                            </Alert>
                        </Snackbar>
                    </Stack>
                );
            default:
                return (
                    <Stack spacing={2} sx={{ width: '100%' }}>
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                            <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }} style={{ backgroundColor: MyTheme.palette.info.light, color: 'black', fontSize: '1.1em' }}>
                                {message}
                            </Alert>
                        </Snackbar>
                    </Stack>
                );
        }
    }
    else return null;
}
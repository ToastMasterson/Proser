import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import MuiAlert from '@material-ui/lab/Alert'
import CloseIcon from '@material-ui/icons/Close'

export const Alert = ({ open, handleClose, isSuccess, message }) => {

    return (
        <Snackbar
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose} >
            <MuiAlert variant='filled' severity={isSuccess ? 'success' : 'error'}>
                {message}
                <IconButton size="small" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </MuiAlert>
        </Snackbar>
    )
}
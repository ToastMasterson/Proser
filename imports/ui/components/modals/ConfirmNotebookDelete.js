import React from 'react'

import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'

import { modalStyles } from '../../stylesheets/modal'

const ConfirmNotebookDelete = ({show, handleModalClose, notebookId, handleDeleteNotebook}) => {
    const classes = modalStyles()

    return ( 
        <Modal
            open={show}
            onClose={handleModalClose}
            BackdropComponent={Backdrop}
            BackdropProps={{timeout: 500}}
            className={classes.modal}>
            <Fade in={show}>
                <div className={classes.modalPaper}>
                    <Typography variant='h5' gutterBottom>
                        Confirm Deletion
                    </Typography>
                    <Typography variant='body1' gutterBottom>
                        Once you delete this note it cannot be recovered.
                    </Typography>
                    <div className={classes.deleteButtons}>
                        <Button variant='contained' onClick={handleModalClose}>
                            Cancel
                        </Button>
                        <Button variant='contained' style={{ backgroundColor: '#d32f2f' }} onClick={() => handleDeleteNotebook(notebookId)}>
                            Delete Note
                        </Button>
                    </div>
                </div>
            </Fade>
        </Modal>
   )
}

export default ConfirmNotebookDelete
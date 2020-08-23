import React from 'react'

import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'

import { modalStyles } from '../../stylesheets/modal'

const EmptyTrash = ({show, handleModalClose, handleEmptyTrash}) => {
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
                        Empty Trash
                    </Typography>
                    <Typography variant='body1' gutterBottom>
                        This will forever erase these notes.
                    </Typography>
                    <div className={classes.deleteButtons}>
                        <Button variant='contained' onClick={handleModalClose}>
                            Cancel
                        </Button>
                        <Button variant='contained' style={{ backgroundColor: '#d32f2f' }} onClick={handleEmptyTrash}>
                            Empty Trash
                        </Button>
                    </div>
                </div>
            </Fade>
        </Modal>
   )
}

export default EmptyTrash
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const PaletteMetaForm = (props) => {
    const { formInfo, colors, handleChange, savePalette } = props;
    const history = useHistory();

    const [open, setOpen] = React.useState(false);
    const handleSubmit = () => {

        let newName = formInfo.newPaletteName;
        const newPalette = {
            paletteName: newName,
            id: newName.toLowerCase().replace(/ /g, '-'),
            colors: colors

        };

        savePalette(newPalette);
        history.push("/");

    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        ValidatorForm.addValidationRule('isColorNameUnique', (value) => {

            return colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        });
    })

    return (
        <div>
            <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Open form dialog
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We
                            will send updates occasionally.
                        </DialogContentText>
                        <ValidatorForm className='palette__form-nav' onSubmit={handleSubmit}>
                            <div className='palette__form-input'>
                                <TextValidator name="newPaletteName" label="palette name" value={formInfo.newPaletteName} onChange={handleChange} />

                            </div>
                            <Button variant="contained" color="primary" type='submit' >save palette</Button>

                        </ValidatorForm>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Subscribe</Button>
                    </DialogActions>
                </Dialog>
            </div>


        </div>
    )
}

export default PaletteMetaForm;
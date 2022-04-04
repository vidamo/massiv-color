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
                <Button variant="contained" onClick={handleClickOpen}>
                   save
                </Button>
                <Dialog open={open} onClose={handleClose}>

                    <DialogTitle>Choose a Palettename</DialogTitle>
                    <ValidatorForm className='palette__form-nav' onSubmit={handleSubmit}>

                        <DialogContent>

                            <DialogContentText>    Please Enter a Name for your palette,Make sure is unique</DialogContentText>
                            <div className='palette__form-input'>
                                <TextValidator
                                    name="newPaletteName"
                                    label="palette name"
                                    value={formInfo.newPaletteName}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />

                            </div>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button variant="contained" color="primary" type='submit' >save palette</Button>
                            </DialogActions>

                        </DialogContent>

                    </ValidatorForm>

                </Dialog>
            </div>


        </div>
    )
}

export default PaletteMetaForm;
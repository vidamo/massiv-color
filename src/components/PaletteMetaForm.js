import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css'



const PaletteMetaForm = (props) => {
    const { formInfo, colors, handleChange } = props;
    const history = useHistory();

    const [open, setOpen] = React.useState(false);
    const [stage, setStage] = useState("form")
    const handleSubmit = (newPalette) => {

        newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-')
        newPalette.colors = colors
        props.savePalette(newPalette);
        history.push("/");


    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const showEmojiPicker = () => {
        setStage("emoji");
    }
    const mSavePalette = (emoji) => {

        const newPalette = {
            paletteName: formInfo.newPaletteName,
            emoji: emoji.native
        };
        handleSubmit(newPalette);


    }

    useEffect(() => {
        ValidatorForm.addValidationRule('isColorNameUnique', (value) => {

            return colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        });
    })

    return (

        <div>
            <div className="palette__navbar-right">
                <Link to='/' className='palette___save-palette'>
                    <Button variant='contained' color='secondary'>Go Back</Button>
                </Link>

                <Button variant="contained" onClick={handleClickOpen}>
                    save
                </Button>
            </div>
            <Dialog
                open={stage === "emoji"}
            >
                <DialogTitle>Choose a Emoji</DialogTitle>

                <Picker
                    onSelect={mSavePalette}
                    title="Pick a Palette Emoji..."
                />

            </Dialog>


            <Dialog
                open={open}
                onClose={handleClose}>

                <DialogTitle>Choose a Palettename</DialogTitle>
                <ValidatorForm className='palette__form-nav' onSubmit={showEmojiPicker}>

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



    )
}

export default PaletteMetaForm;
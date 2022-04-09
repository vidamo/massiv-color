
import React, { useState } from "react";
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@mui/material/Button';





const ColorPickerForm = (props) => {
    const { formInfo,handleChange,paletteIsFull,addNewColor,currentColor,updateCurrentColor } = props;
    // const [colors, setColors] = useState(props.palettes[0].colors);
    const [colors, setColors] = useState(props.palettes.length!==0 && props.palettes[0]?.colors);

    


    
  

    return (
        <div className="palette__side-color-picker">
            <ChromePicker color={currentColor} onChangeComplete={updateCurrentColor} />
            <ValidatorForm onSubmit={addNewColor}>
                <TextValidator
                className="palette__color-input"
                    value={formInfo.newColorName}
                    name="newColorName"
                    placeholder="Color Name"
                    onChange={handleChange}
                    validators={['required', 'isColorNameUnique']}
                    errorMessages={['this field is required', 'color name must be unique!']}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={paletteIsFull}
                    style={{ backgroundColor: paletteIsFull ? "gray" : currentColor }} >
                    {paletteIsFull ? "Palette Full" : "Add Color"}

                </Button>

            </ValidatorForm>
        </div>

    )
}

export default ColorPickerForm;




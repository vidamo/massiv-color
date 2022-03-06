import React, { useState } from 'react';
import Slider from 'rc-slider';
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import 'rc-slider/assets/index.css';


const Navbar = (props) => {
    const [open, setOpen] = useState(false);
    const [format, setFormat] = useState("hex");
    const closeSnackbar = () => {
        setOpen(false);

    }
    const changeFormat = (val) => {
        setFormat(val);
        setOpen(true);
        props.handleChange(val);



    }

    return (
        <header className='palette__navbar'>
            <div>
                <div className='palette__navbar-logo'>
                    <Link to="/">
                        colorpicker
                    </Link>

                </div>

                {props.showingAllColors && (
                    <div className='palette__slider'>
                        <div className='palette__slider-title'>Level:{props.level}</div>
                        <Slider
                            defaultValue={props.level}
                            min={100}
                            max={900}
                            step={100}
                            onAfterChange={props.changeLevel}
                        />
                    </div>
                )}





            </div>
            <div>
                <Select className='palette__select' value={format} onChange={(e) => changeFormat(e.target.value)}>
                    <MenuItem value='hex'>HEX-#fffff</MenuItem>
                    <MenuItem value='rgb'>RGB-rgb(255,255,255)</MenuItem>
                    <MenuItem value='rgba'>RGBA-rgba(255,255,255,.1)</MenuItem>
                </Select>

            </div>
            {/* snackbar */}
            {/* snack-bar */}
            <Snackbar anchororigin={{
                vertical: "left",
                horizontal: "bottom",

            }}
                open={open}
                autoHideDuration={3000}
                message={<span id='message-id'>Format Changed to {format.toUpperCase()}!</span>}
                contentProps={{ "aria-describedby": "message-id" }}
                onClose={closeSnackbar}
                action={[
                    <IconButton
                        onClick={closeSnackbar}
                        color="inherit"
                        key='close'
                        aria-label='close'
                    >
                        <CloseIcon />
                    </IconButton>
                ]}

            />

        </header>
    )
}


export default Navbar;
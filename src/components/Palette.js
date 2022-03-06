import React, { useState } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import '../palette.scss';
import { palette } from '@mui/system';
import PaletteFooter from './PaletteFooter';



const Palette = (props) => {
    const [level, setLevel] = useState("500");
    const [format, setFormat] = useState("hex");

    const changeLevel = (level) => {
        setLevel(level);
    }
    const changeFormat = val => {

        setFormat(val);


    };


    const colorBoxes = props.palette.colors[level].map(color => {
        // console.log(format)

        return [
            <ColorBox
                key={color.id}
                background={color[format]}
                name={color.name}
                id={color.id}
                paletteId={props.palette.id}
                showLink={true}


            />

        ]

    })


    return (
        <div className='palette'>
            <Navbar level={level}
                changeLevel={changeLevel}
                handleChange={changeFormat}
                format={format}
                showingAllColors={true}

            />

            <div className='palette__colors'>
                {colorBoxes}

            </div>
            <PaletteFooter
                emoji={props.palette.emoji}
                paletteName={props.palette.paletteName}
            />



        </div>
    )
}


export default Palette;
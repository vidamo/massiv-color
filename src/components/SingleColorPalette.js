import React, { useState } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import '../palette.scss';
import { Link } from 'react-router-dom';

const SingleColorPalette = (props) => {
    const [format, setFormat] = useState("hex");

    const changeFormat = (val) => {
        setFormat(val)

    }
    const getShades = (palette, colorToFilterBy) => {
        let shades = [];
        let allColors = palette.colors;
        for (let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            )
        }
        return shades.slice(1);
    }
    const [shades, setShades] = useState(getShades(props.palette, props.colorId));
    const ColorBoxes = shades.map((shade) => (
        <ColorBox
            name={shade.name}
            key={shade.name}
            background={shade[format]}
            showLink={false}
        />
    ));



    return (
        <div className='palette palette__SingleColorPalette'>
            <Navbar
                handleChange={changeFormat}
                showingAllColors={false}
            />

            <div className='palette__colors '>
                {ColorBoxes}
                <div className='palette__color-box go-back '>
                    <Link className='palette__back-button'>GO Back</Link>
                </div>
            </div>
            <PaletteFooter emoji={props.palette.emoji}
                paletteName={props.palette.paletteName} />
        </div>
    )
}

export default SingleColorPalette;
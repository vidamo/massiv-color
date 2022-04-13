import React from 'react';

const PaletteFooter = (props) => {
    const { emoji, paletteName } = props;

    return (
        <footer className='palette__footer'>
            <span>
                {emoji}
            </span>
            <em>{paletteName}</em>


        </footer>
    )

}

export default PaletteFooter
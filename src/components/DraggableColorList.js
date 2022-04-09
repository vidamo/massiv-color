
import React, { useState } from "react";
import { SortableContainer } from "react-sortable-hoc";
import DragableColor from "./DragableColor";

const DraggableColorList = SortableContainer(({ removeColor, palettes }) => {
    const [colors, setColors] = useState(palettes.length !== 0 && palettes[0]?.colors);
    console.log('aaaa',palettes);

    return (
        <div className='newpalette-contain'>
            {colors.map((color, i) => (
                <DragableColor
                    key={color}
                    palettes={palettes}

                    handleClick={() => removeColor(color.name)}
                    color={color.color}
                    name={color.name}
                    index={i}
                />
            ))}
        </div>
    );

})

export default DraggableColorList;
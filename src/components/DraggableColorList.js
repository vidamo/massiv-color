
import React, { useState } from "react";
import { SortableContainer } from "react-sortable-hoc";
import DragableColor from "./DragableColor";

const DraggableColorList = SortableContainer(({ removeColor, palettes,colors }) => {
    // const [colors, setColors] = useState(palettes.length !== 0 && palettes[0]?.colors);

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
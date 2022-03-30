
import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import DragableColor from "./DragableColor";

const DraggableColorList = SortableContainer(({ colors, removeColor }) => {
    return (
        <div className='newpalette-contain'>
            {colors.map((color,i) => (
                <DragableColor
                    key={color}
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
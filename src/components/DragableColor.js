import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles={
    root:{
        height:"100px",
        width:"100px",
        width: props => props.copied ? "100%" : "20%",
        height: props => props.copied ? "100%" : props.showLink ? "25%" : "56%",
        margin: " 0 auto",
        display: "inline-flex",
        aligniItems: "center",
        justifyContent: "center",
        textAlign: "center",
        cursor: "pointer",
        position: "relative",
        transition: "0.3s",
    }
}

const DragableColor = (props) => {
    return (
        <div className={props.classes.root} style={{ backgroundColor: props.color }}>
            {props.name}
        </div>
    )

}

export default withStyles(styles) (DragableColor);
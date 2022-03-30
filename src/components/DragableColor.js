import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { SortableElement } from 'react-sortable-hoc';


const styles = {
    root: {
        height: "100px",
        width: "100px",
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
        "&:hover svg": {
            color: "white",
            transform:"scale(1.5)"
        }
    },
    boxContent: {
        position: "absolute",
        width: "100%",
        left: "0",
        bottom: "0",
        padding: "10px",
        color: "rgba(0,0,0,.5)",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
        display: "flex",
        justifyContent: "space-between",

    },
    deleteIcon: {
        transition: "all 0.3s ease-in-out"
    }
}

const DragableColor = SortableElement((props) => {
    const { classes ,name,color,handleClick} = props;
    return (
        <div className={classes.root} style={{ backgroundColor: color }}>
            <div className={classes.boxContent}>
                <span> {name}  </span>
                <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />

            </div>



        </div>
    )

})

export default withStyles(styles)(DragableColor);
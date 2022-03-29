import React from 'react';
import { withStyles } from '@material-ui/core/styles';


const styles = {

    root: {
        backgroundColor: "#fff",
        borderRadius: "5px",
        padding: ".5rem",
        position: "relative",
        overflow: "hidden",
        border: "1px solid #BDBDBD",
        display:"flex",
        flexDirection:"column",
        "&:hover": {
            cursor: "pointer"
        }
    },
    colors: {
        backgroundColor: "#dae1e4",
        height: "150px",
        width: "100%",
        borderRadius:"2px",
        overflow:"hidden"

    },
    title: {
        fontSize: ".9rem",
        display: "flex",
        justifyContent:"center",
        margin: "0",
        color: "#263238",
        paddingTop: "0.5rem",
        fontSize: ".9rem",
        position: "relative",
        fontWeight:"500",
        transition:".3s",
        "&:hover":{
          color:"#880E4F"  
        },



    },
    miniColor: {
        width: "20%",
        height: "25%",
        position: "absolute",
        display: "inline-block",
        margin: "0 auto",
        position: "relative",
        marginBottom:"-4px"
    }
}
const MiniPalette = (props) => {
    const { classes, paletteName, colors } = props;

    const miniColorBoxes = colors.map(color => (
        <span
            className={classes.miniColor}
            style={{ backgroundColor: color.color }}
            key={color.name}>

        </span>

    ))



    return (
        <div className={classes.root} onClick={props.handleClick}>
            <div className={classes.colors}> {miniColorBoxes}  </div>
            <div className={classes.title}>{paletteName}</div>
        </div >
    )

}
export default withStyles(styles)(MiniPalette);
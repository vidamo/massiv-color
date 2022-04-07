import React from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        backgroundColor: "#FCE4EC",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        height: "100%",

    },
    container: {
        width: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: "wrap"
    },
    nav: {
        width: "100%",
        marginBottom: "10px",
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between",
        "& h1": {
            fontSize: "1.5rem",
            color: "#263238"
        }
    },
    palettes: {
        boxSizing: "border-box",
        display: "grid",
        gridTemplateColumns: "repeat(3,30%)",
        width: "100%",
        gridGap: "5%"
    }

}

const PaletteList = (props) => {
    const { classes } = props;

    const goToPalette = (id) => {
        props.history.push(`/palette/${id}`);
    }

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <div className={`{classes.nav} palette__palette-list-nav`}>
                    <h1>React Colors!</h1>
                    <Link to="/palette/new">Create Palette</Link>
                </div>
                <div className={`${classes.palettes} palette__palette-list`}>
                    {props.palettes.map(palette => (
                        <MiniPalette 
                         handleDelete={props.deletePalette}
                          {...palette} handleClick={()=>goToPalette(palette.id)}
                          key={palette.id}
                          id={palette.id}
                           />

                    ))
                    }
                </div>

            </div>

        </div>
    )

}
export default withStyles(styles)(PaletteList);
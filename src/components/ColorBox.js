import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    colorBox: {
      
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
        "&:hover button": {
            opacity: "1",
        }


    },
    copyText: {
        color: props => chroma(props.background).luminance() >= 0.6 ? "rgba(0,0,0,.5)" : "white"
    },
    colorName: {
        color: props => chroma(props.background).luminance() <= 0.08 ? "white" : "black"
    },
    seeMore: {
        color: props => chroma(props.background).luminance() >= 0.6 ? "rgba(0,0,0,.5)" : "white",
        background: "rgba(255, 255, 255, 0.3)",
        textTransform: "uppercase",
        fontSize: "14px",
        height: "25px",
        lineHeight: "25px",
        padding: "0 15px"

    },
    copyButton: {
        color: props => chroma(props.background).luminance() <= 0.6 ? "white" : "rgba(0,0,0,.6)",
        width: "100px",
        height: " 30px",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        outline: "none",
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        border: "none",
        fontSize: "13px",
        textTransform: "uppercase",
        lineHeight: "30px",
        opacity: "0"
    },
    copyOverlay:{
        opacity: "0",
        zIndex: "0",
        width: "100%",
        height: "100%",
        transition: "0.3s",
        position: "absolute",
        top: "0",
        left: "0",
        display: "flex",
        // alignItems: "center",
        justifyContent: "center",
    }
}
const ColorBox = (props) => {
    const [copied, setCopied] = useState(false);
    const handlecopy = () => {
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);


    }
    const { name, background, paletteId, id, showLink, classes } = props;
    const isDark = chroma(background).luminance() <= 0.08;
    const isLight = chroma(background).luminance() >= 0.6

    return (
        <CopyToClipboard text={background}>
            <div style={{ background: background }} className={` palette__color-box ${classes.colorBox}`} onClick={handlecopy}>
                <div className={`palette__copy-overlay ${copied && 'show'}`} style={{ background: background }}>
                    <div className='palette__copy-overlay-msg'>
                        <h1 className={isLight && "dark-text"}>copied!</h1>
                        <span className={classes.copyText}>{background}</span>

                    </div>

                </div>
                <button className={classes.copyButton}>copy</button>
                <div className='palette__color-box-footer'>
                    <em className={classes.colorName}>{name}</em>
                  {showLink &&(
                    <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
                            <span className={classes.seeMore}>more</span>
                        </Link>
                  )}
                        
                   


                </div>


            </div>

        </CopyToClipboard >

    )
}


export default withStyles(styles)(ColorBox);
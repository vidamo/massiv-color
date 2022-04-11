import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import bg from '../bg.svg';
import blue from '@mui/material/colors/blue';
import red from '@mui/material/colors/red';

import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

const styles = {
    root: {
        backgroundColor: "#fff",
        backgroundImage: `url(${bg})`,
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
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
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
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deletingId, setDeletingId] = useState("");
    const goToPalette = (id) => {
        props.history.push(`/palette/${id}`);
    }
    const openDialog = (id) => {

        setOpenDeleteDialog(true);
        setDeletingId(id);
    }
    const closeDialog = () => {

        setOpenDeleteDialog(false);
        setDeletingId("");
    }
    const handleDelete = () => {
        props.deletePalette(deletingId);
        closeDialog();

    }
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <div className={`{classes.nav} palette__palette-list-nav`}>
                    <h1>React Colors!</h1>
                    <Link to="/palette/new">Create Palette</Link>
                </div>

                <TransitionGroup className={`${classes.palettes} palette__palette-list`}>
                    {props.palettes.map(palette => (
                        <CSSTransition
                            key={palette.id}
                            timeout={500}
                            classNames="fade"
                        >
                            <MiniPalette
                                // handleDelete={props.deletePalette}
                                openDialog={openDialog}
                                handleDelete={openDialog}
                                {...palette} handleClick={() => goToPalette(palette.id)}
                                key={palette.id}
                                id={palette.id}
                            />
                        </CSSTransition>


                    ))
                    }
                </TransitionGroup>

                <Dialog open={openDeleteDialog} aria-labelledby="delete-dialog-title" onClose={closeDialog}>
                    <DialogTitle id='delete-dialog-title'>
                        Delete This Palette
                    </DialogTitle>
                    <List>
                        <ListItem button onClick={handleDelete}>
                            <ListItemAvatar>
                                <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                                    <CheckIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Delete" />
                        </ListItem>
                        <ListItem button onClick={closeDialog}>
                            <ListItemAvatar>
                                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                                    <CloseIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Cancel" />
                        </ListItem>

                    </List>

                </Dialog>

            </div>


        </div>
    )

}
export default withStyles(styles)(PaletteList);
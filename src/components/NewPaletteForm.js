import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ColorPickerForm from './ColorPickerForm';
import { Drawer } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from '@mui/material/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import '../palette.scss';

const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,

    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));




const NewPaletteForm = (props) => {
  const defaultProps = {
    maxColors: 20
  }
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [currentColor, setCurrentColor] = useState("teal");
  const [colors, setColors] = useState(props.palettes[0].colors);
  const paletteIsFull = colors.length >= defaultProps.maxColors;


  const [formInfo, setFormInfo] = useState(
    {
      newColorName: "",
      newPaletteName: ""
    }
  )
  const addNewColor = () => {

        const newColor = {
            color: currentColor,
            name: formInfo.newColorName,
        };
        setColors([...colors, newColor]);
    };
  
  const removeColor = (colorName) => {
    setColors(colors.filter(color => color.name !== colorName))

  }
  const onSortEnd = (e) => {
    var newTodos = arrayMove(colors, e.oldIndex, e.newIndex)
    setColors(newTodos)
  };
  const clearColors = () => {
    setColors([]);
  }
  const addRandomColor = () => {
    const allColors = props.palettes.map(p => p.colors).flat();
    var rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    setColors([...colors, randomColor]);

  }

  const handleSubmit = () => {

    let newName = formInfo.newPaletteName;
    const newPalette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, '-'),
      colors: colors

    };

    props.savePalette(newPalette);
    props.history.push("/");

  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const updateCurrentColor = (newColor) => {

    setCurrentColor(newColor.hex)
}



  const handleChange = (e) => {

    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value
    }

    )
  }
 
  // const savePalette = () => {
  //   const newPalette={paletteName:"new test palette",colors:colors}
  //   props.savePalette(colors);
  // }
  useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => {

      return colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    });
  })


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar color="default" position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
          <ValidatorForm onSubmit={handleSubmit}>
            <TextValidator name="newPaletteName" label="palette name" value={formInfo.newPaletteName} onChange={handleChange} />
            <Button variant="contained" color="primary" type='submit'>save palette</Button>
            <Link to='/'>
              <Button variant='contained' color='secondary'>Go Back</Button>
            </Link>

          </ValidatorForm>

        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>

        </DrawerHeader>
        <Divider />
        <Typography variant="h2">
          Design your Palette

        </Typography>

        <Button variant="contained" color="secondary" onClick={clearColors}> clear palette </Button>
        <Button variant="contained" color="primary" onClick={addRandomColor} disabled={paletteIsFull} > Random color  </Button>

        <ColorPickerForm
          formInfo={formInfo}
          colors={colors}
          palettes={props.palettes}
          handleChange={handleChange}
          addNewColor={addNewColor}
          currentColor={currentColor}
          updateCurrentColor={updateCurrentColor }
        />

      </Drawer>
      <Main open={open} >
        <DrawerHeader />

        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          axis='xy'
          onSortEnd={onSortEnd}
          paletteIsFull={paletteIsFull}
        />

      </Main>
    </Box >
  )
}


export default NewPaletteForm;
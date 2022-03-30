import React, { useState, useEffect } from 'react';
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
import { ChromePicker } from 'react-color';
import Button from '@mui/material/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import DragableColor from './DragableColor';
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
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [currentColor, setCurrentColor] = useState("teal");
  const [colors, setColors] = useState([]);

  const [formInfo, setFormInfo] = useState(
    {
      newColorName: "",
      newPaletteName: ""
    }
  )

  const removeColor = (colorName) => {
    setColors(colors.filter(color => color.name !== colorName))

  }


  const handleSubmit = () => {
    console.log('sss')

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
  const addNewColor = () => {

    const newColor = {
      color: currentColor,
      name: formInfo.newColorName,
    };
    setColors([...colors, newColor]);
  };

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

        <Button variant="contained" color="secondary"> clear palette </Button>
        <Button variant="contained" color="primary"> Random color  </Button>

        <ChromePicker color={currentColor} onChangeComplete={updateCurrentColor} />
        <ValidatorForm onSubmit={addNewColor}>
          <TextValidator
            value={formInfo.newColorName}
            name="newColorName"
            onChange={handleChange}
            validators={['required', 'isColorNameUnique']}
            errorMessages={['this field is required', 'color name must be unique!']}
          />

          <Button type="submit" variant="contained" color="primary" style={{ backgroundColor: currentColor }} >Add Color</Button>

        </ValidatorForm>

      </Drawer>
      <Main open={open} >
        <DrawerHeader />
        <div className='newpalette-contain'>
          {colors.map(color => (
            <DragableColor key={color.name} handleClick={() => removeColor(color.name)} color={color.color} name={color.name} />
          ))}
        </div>


      </Main>
    </Box>
  )
}


export default NewPaletteForm;
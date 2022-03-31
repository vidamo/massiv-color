import "./App.css";
// Routes instead of Switch
import { Route, Switch } from "react-router-dom";
import Palette from "./components/Palette";
import SingleColorPalette from "./components/SingleColorPalette";
import PaletteList from "./components/PaletteList";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";
import NewPaletteForm from './components/NewPaletteForm';
import { useState } from "react";

function App(props) {
  const [palettes, setPalettes] = useState(seedColors);

  const findPalette = (id) => {

    return palettes.find(function (palette) {
      if (palette.id === id) return palette;
    });
  };
  const savePalette = (newPalette) => {
    setPalettes([...palettes, newPalette]);
  }


  return (
    <div className="App">
      <Switch>
        <Route path="/palette/new" render={(routeProps) => <NewPaletteForm palettes={palettes} savePalette={savePalette} {...routeProps} />} />
        <Route exact path='/' render={(routeProps) => <PaletteList palettes={palettes}{...routeProps} />} />
        <Route
          exact
          path='/palette/:id'
          render={routeProps => (
            <Palette palette={generatePalette(findPalette(routeProps.match.params.id))

            } />
          )}
        />
        <Route
          path="/palette/:paletteId/:colorId"
          render={(routeProps) =>
            <SingleColorPalette
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(findPalette(routeProps.match.params.paletteId))

              }
            />}
          exact
        />
      </Switch>
    </div>
  );
}

export default App;

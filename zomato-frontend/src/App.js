import React, { useState, useEffect } from 'react';
import { NavBar, Main, SideBar } from './components/layout/';
import { ThemeProvider } from './themes';

const THEMES = require('./themes/themes.json'); 

function App() {
  const [ city, setCity ] = useState({
      "name": "Trivandrum",
      "id": 11290
  });
  const [ theme, setTheme ] = useState("light");
  const [ themeData, setThemeData ] = useState({});
  const [ restaurant, setRestaurant ] = useState({});

  useEffect(() => {
    setThemeData(THEMES[theme]);
  }, [theme]);

  return (
    <div 
      className="App"
      style={{
        background: themeData['primary-bg'],
        color: themeData['primary-fg']
      }}
    >
      <ThemeProvider value={themeData}>
        <NavBar 
          onSelect={setCity} 
          currTheme={theme}
          setTheme={setTheme} 
        />
        <Main 
          city={city}
          setRestaurant={setRestaurant}
        />
        <SideBar 
          restaurant={restaurant}
          setRestaurant={setRestaurant} 
        />
      </ThemeProvider>
    </div>
  );
}

export default App;

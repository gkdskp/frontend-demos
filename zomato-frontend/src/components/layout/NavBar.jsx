// import React, { useState, useEffect } from "react";
// import "./NavBar.css";

// function NavBar(props) {
//   const [cities, setCities] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);

//   const loadCities = (event) => {
// 	  const selectedCity = cities.find(city => 
// 		city.name === event.target.value
//     );
    
//     setLoading(true);

// 		if(selectedCity) {
//       props.onSelect(selectedCity);
//       setSearch(selectedCity.name);
//       setLoading(false);
// 		} else {

//       clearTimeout(window.timer);
//       setSearch(event.target.value);
// 	    window.timer = setTimeout(loadData, 1000);
//     }

//   } 

//   const loadData = () => {
//     setCities([]);
// 	  //Fetching the city list
// 	  const apiUrl = "https://developers.zomato.com/api/v2.1/cities?q=" + search;
// 	fetch(apiUrl, {
//       headers: {
//         "Content-Type": "application/json",
//         "user-key": "3eb58604156a83e4cd688c6778e7d259",
//       },
//     }).then((response) => {
//       if (response.status === 200) {
//         response
//           .json()
//           .then((response) => {
//             setCities(response.location_suggestions)
//           });
//           setLoading(false);
//       } else {
//         console.log("Couldnt connect to Zomato");
//       }
//   });
// }

//   const printHello = () => {
// 	  console.log("OK");
//   }
 
//   return (
//     <div className="nav-container">
//       <h1 className="logo">
//         find<span className="sep">food</span>
//       </h1>

//       <div className="search-wrapper">
//       <i className={loading? "fa fa-circle-notch fa-spin" :"fa fa-search"}></i>
//       <input
//         className="search"
// 		placeholder="Search for cities"
// 		value={search}
// 		onChange={loadCities}
// 		id="city-input"
//         list="city-list"
//         autoComplete="off"
//       />
//       </div>
     
//       {cities && (
//         <datalist id="city-list">
//           {cities.map((city) => (
//             <option value={city.name} key={city.id} />
//           ))}
//         </datalist>
//       )}

//       <div></div>
//     </div>
//   );
// }

// export default NavBar;
import React, { useState, useEffect, useContext } from 'react';
import './NavBar.css';
import ThemeContext from '../../themes';

const { API_URL, API_KEY } = require('../../config.json');

function NavBar({ onSelect, currTheme, setTheme }) {
  let queryStr;

  const theme = useContext(ThemeContext);

  const [ cities, setCities ] = useState([]);
  const [ search, setSearch ] = useState("Trivandrum");
  const [ loading, setLoading ] = useState(false);
  const [ iconHovered, setIconHovered ] = useState(false);

  const toggleHovered = () => setIconHovered(!iconHovered);

  const fetchCities = async () => {
    setCities([]);
    console.log("Load start for " + queryStr)
    const endPoint = `cities?q=${queryStr}`;
    const response = await fetch(API_URL + endPoint, {
      headers: {
        "Content-Type": "application/json",
        "user-key": API_KEY
      }
    });

    setLoading(false);
    if(response.status !== 200) {
      // TODO: Show Error Message
      console.error("Could not connect to Zomato API");
      return;
    }

    const json = await response.json();
    console.log("Load end for " + search)
    console.log(json);
    setCities(json.location_suggestions);
  }

  const handleChange = event => {
    clearTimeout(window.timer);
    if(cities.find(city => city.name === search)) {
      return;
    }
    setLoading(true);
    setSearch(event.target.value);
    queryStr = event.target.value;
    window.timer = setTimeout(fetchCities, 300);
  }

  useEffect(() => {
    let city;

    if(city = cities.find(city => city.name === search)) {
      onSelect(city);
      clearTimeout(window.timer);
      setCities([]);
    }
  }, [cities]);

  return (
    <div className="nav-container" style={{backgroundColor: theme['nav-bg']}}>
      <h1 className="logo" style={{color: theme['nav-color']}}>
        find<span style={{color: theme['primary-color']}}>food</span>
      </h1>

      <div className="search-wrapper" style={{
            border: `2px solid ${theme['nav-color']}`}}>
        <i 
          className={`fa ${loading? "fa-circle-notch fa-spin": "fa-search"}`} 
          onMouseOver={() => {}}
          style={{ color: theme['nav-color']}}
        />
        <input
          className="search"
          placeholder="Search for cities"
          value={search}
          onChange={handleChange}
          id="city-input"
          list="city-list"
          autoComplete="off"
          style={{ 
            color: theme['nav-color']
          }}
        />
      </div>

      {cities && (
        <datalist id="city-list">
          {cities.map(city => <option value={city.name} key={city.id}/>)}
        </datalist>
      )}

      <div className="theme-icon" style={{ color: theme['nav-color'] }}>
        <i
          onMouseOver={toggleHovered}
          onMouseLeave={toggleHovered} 
          className={`fa ${iconHovered && "fa-spin"} ${currTheme == 'light'? 'fa-moon': 'fa-sun'}`}
          onClick={() => {
            let theme = "light";
            if(currTheme == "light")
              theme = "dark";

            setTheme(theme);
          }}
        ></i>
      </div>
    </div>
  );
}

export default NavBar;
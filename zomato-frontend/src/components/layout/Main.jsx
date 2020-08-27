import React, { useState, useEffect } from 'react';
import HotelList from '../composed/HotelList';
import './Main.css';

const { API_URL, API_KEY } = require('../../config.json');

function Main({ city, setRestaurant }) {
  const [ hotels, setHotels ] = useState([]);
  const [ numOfResults, setNumOfResults ] = useState(0);
  const [ start, setStart ] = useState(0);
  const [ isLoading, setIsLoading ] = useState(false);

  const fetchHotels = async reset => {
    const endPoint = `search?entity_type=city&entity_id=${city.id}&start=${start}`;
    const response = await fetch(API_URL + endPoint, {
      headers: {
        "Content-Type": "application/json",
        "user-key": API_KEY
      }
    });

    if(response.status !== 200) {
      // TODO: Show Error Message
      console.error("Could not connect to Zomato API");
      return;
    }

    const json = await response.json();

    setNumOfResults(json.results_found);
    if(! reset) {
      setHotels(hotels.concat(json.restaurants));
      return;
    }

    setHotels(json.restaurants);
  }

  useEffect(() => {
    setIsLoading(true);
    setHotels([]);
    fetchHotels(true).then(() => setIsLoading(false));
  }, [city]);

  useEffect(() => {
    setIsLoading(true);
    fetchHotels().then(() => setIsLoading(false));
  }, [start]);

  return(
    <div className="main-body">
      <HotelList 
        initialHotels={hotels} 
        results_found={numOfResults}
        setRestaurant={setRestaurant} 
      />
      <button 
        className="load"
        onClick={() => setStart(start+20)}
      >
        {!isLoading
          ? <><i className="fa fa-arrow-down" /> Load More</>
          : <><i className="fa fa-circle-notch fa-spin" /> Loading</>
        }
      </button>
    </div>
  );
}

export default Main;
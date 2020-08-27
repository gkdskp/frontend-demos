import React, { useState, useEffect } from 'react';
import './HotelList.css';

import Caption from '../basic/Caption';
import HotelCard from '../basic/HotelCard';

const SORT_OPTIONS = ["name", "price", "rating"];
const FILTERS = {
  has_table_booking: "Table Booking",
  has_online_delivery: "Online Delivery",
  is_delivering_now: "Delivering Now",
  is_table_reservation_supported: "Reservation"
}

function HotelList({ initialHotels, results_found, setRestaurant }) {
  const [ hotels, setHotels ] = useState([]);
  const [ sortBy, setSortBy ] = useState(null);
  const [ isAsc, setIsAsc ] = useState(false);
  const [ filters, setFilters ] = useState([]);

  const sortHotels = filteredHotels => {
    setIsAsc(false);
    const hotelList = filteredHotels || [...hotels];

    switch(SORT_OPTIONS[sortBy]) {
      case "name":
        hotelList.sort((a, b) => 
          a.restaurant.name > b.restaurant.name ? 1: -1
        );
        break;

      case "price":
        hotelList.sort((a, b) => 
          a.restaurant.price_range - b.restaurant.price_range
        );
        break;

      case "rating":
        hotelList.sort((a, b) => 
          a.restaurant.user_rating.aggregate_rating -
          b.restaurant.user_rating.aggregate_rating
        );
        break;
    }

    setHotels(hotelList);
  }

  const filterHotels = () => {
    let filteredList = [...initialHotels];

    filters.forEach(filter => {
      filteredList = filteredList.filter(elem => elem.restaurant[filter]);
    });

    sortHotels(filteredList);
  }
  
  const toggleFilter = filter => {
    let newFilters = [...filters];

    if(filters.includes(filter)) {
      newFilters = newFilters.filter(elem => elem !== filter);
      setFilters(newFilters);
      return;
    }

    newFilters.push(filter);
    setFilters(newFilters);
  }

  const handleSort = index => {
    if(sortBy === index) {
      setHotels([...hotels].reverse());
      setIsAsc(!isAsc);
      return;
    }

    setSortBy(index);
  }

  // The original hotels list is not touched as we may
  // need it when the page is filtered or sorted
  useEffect(() => {
    filterHotels(initialHotels);
  }, [initialHotels]);

  useEffect(() => sortHotels(), [sortBy]);  

  useEffect(() => filterHotels(), [filters]);

  return (
    <div className="list-body">
      <div className="list-control">
        <Caption className="left">
          {hotels.length} Results Shown ({results_found} Found)
        </Caption>

        <Caption className="right">
          Filter:&nbsp;
          {Object.keys(FILTERS).map(key => (
            <React.Fragment key={key}>
              <button onClick={() => toggleFilter(key)}>
                {FILTERS[key]}
                {filters.includes(key) && <i className="fa fa-times" />}
              </button>
              &nbsp;/&nbsp; 
            </React.Fragment>
          ))}
        </Caption>

        <Caption className="center">
          Sort by:&nbsp;
          {SORT_OPTIONS.map((option, index) => (
            <React.Fragment key={index}>
              <button 
                onClick={() => handleSort(index)} 
                style={{textTransform: "capitalize"}}
              >
                {option}
                {sortBy === index && <i className={`fa fa-arrow-${isAsc? 'down': 'up'}`} />}
              </button>
              &nbsp;/&nbsp;
            </React.Fragment>
          ))}
        </Caption>
      </div>

      <div className="items-wrapper">
        {hotels.map((hotel, index) => (
          <HotelCard 
            hotel={hotel} 
            key={index} 
            onClick={() => setRestaurant(hotel)}
          />
        ))}
      </div>
    </div>
  );
}

export default HotelList;
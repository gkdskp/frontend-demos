import React, { useContext, useState, useEffect } from 'react';
import './SideBar.css';
import ThemeContext from '../../themes';
import Caption from '../basic/Caption';

const { API_URL, API_KEY } = require('../../config.json');

function SideBar({ restaurant, setRestaurant }) {
	const theme = useContext(ThemeContext);
	const [ visible, setVisible ] = useState(false);
	const [ loading, setLoading ] = useState(true);
	const [ dishes, setDishes ] = useState([]);

	const fetchMenu = async () => {
		const endPoint = `dailymenu?res_id=${restaurant?.id}`;
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
		  try {
			  setDishes(json.daily_menus[0].daily_menu.dishes);
		  } catch(err) {
			  console.log("No menus provided");
		  }
	}
	
	useEffect(() => {
		if(! restaurant)
			return;

		setVisible(true);
		setLoading(true);
		setDishes([]);
		fetchMenu();
	}, [restaurant]);
	
	restaurant = restaurant?.restaurant;
	console.log(restaurant);

	const INFO_ROWS = {
		"fa-dollar": `${restaurant?.currency} ${restaurant?.average_cost_for_two} (for two)`,
		"fa-clock": restaurant?.timings,
		"fa-map-marker": restaurant?.location.address,
		"fa-map": restaurant?.location.locality,
		"fa-phone-alt": restaurant?.phone_numbers
	}

	return (
		<div 
			className="sideBar"
			style={{
				right: `${visible? "0px": "-600px"}`,
				backgroundColor: theme['side-bg']
			}}
		>
			<h1>
				<i className="fa fa-times" onClick={() => {
					setRestaurant({});
					setVisible(false);
				}} />
				{restaurant?.name}
			</h1>

			<div
				className="img" 
				style={{
					backgroundImage: `url('${restaurant?.featured_image || restaurant?.thumb || "https://via.placeholder.com/350"}')`,
					backgroundSize: "cover",
					width: "350px",
					height: "350px"
				}} 
			/>

			<Caption className="caption">
				{restaurant?.cuisines}
			</Caption>
			
			<h3>Info</h3>
			<div className="info">
				{Object.keys(INFO_ROWS).map(key => (
					<span className="info-row">
						<span className="icon"><i className={`fa ${key}`} /></span>
						<span className="value">{INFO_ROWS[key]}</span>
					</span>
				))}
			</div>

			<h3>Menu</h3>
			<div className="dishes">
				{loading
					? <div className="loading" style={{color: "green"}} >
						<i 
							className="fa fa-circle-notch fa-spin"
						/> Fetching Menu
					</div>
					: (! dishes.length) 
						? <p className="alert" style={{color: theme['alert-color']}}>
							The restaurant hasn't provided an online menu
						</p>
						: dishes.map(dish => (
							<div className="dish-row">
								<span className="dish-name">{dish.dish.name}</span>
								<span className="dish-price">{dish.dish.price}</span>
							</div>
						))
				}
			</div>
		</div>
	)
}

export default SideBar;
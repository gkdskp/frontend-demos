import React, { useContext, useState } from 'react';
import './HotelCard.css';
import Caption from '../basic/Caption';
import ThemeContext from '../../themes';

const PRICE_BG_LIST = ["#c0392b", "#e67e22", "#f1c40f", "#2ecc71"];

function HotelCard(props) {
	const theme = useContext(ThemeContext);
	const [ hover, setHover ] = useState(false);

	const backgroundImg = props.hotel.restaurant.thumb || props.hotel.restaurant.featured_image || "https://via.placeholder.com/300";
	const priceBg = PRICE_BG_LIST[4 - props.hotel.restaurant.price_range] || "gray";

	return (
		<div 
			className="item-wrapper"
			onMouseOver={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			style={{
				border: hover? theme['card-hover-border']: theme['card-border'],
			}}
			onClick={props.onClick}
		>
			<div className="list-item">
			<div className="img" style={{ backgroundImage: "url(' " + backgroundImg + "')", backgroundSize: "cover"}} />
			<h2>{props.hotel.restaurant.name}</h2>
			<div className="center">
			<Caption color={theme['primary-caption']}>{props.hotel.restaurant.cuisines}</Caption>
			</div>
			<div className="center">
			{props.hotel.restaurant.user_rating && 
			<span className="stars" style={{color: "#" + props.hotel.restaurant.user_rating.rating_color}}>
				<i className="fa fa-star">
				</i>
				{props.hotel.restaurant.user_rating.aggregate_rating}
			</span> }
			<span className="price-range" style={{ color: priceBg}}>
				<i className="fa">{props.hotel.restaurant.currency}</i>
				{props.hotel.restaurant.price_range}x
			</span>
			</div>
			


		
{/* 				

	{
		props.hotel.restaurant.location &&
	
			<div className="address">
				{props.hotel.restaurant.location.address}<br/>
				{props.hotel.restaurant.location.locality}<br/>
<i className="fa fa-phone-alt" />{props.hotel.restaurant.phone_numbers}
			</div>

} */}

		</div>
		</div>
	);
		
}

export default HotelCard;
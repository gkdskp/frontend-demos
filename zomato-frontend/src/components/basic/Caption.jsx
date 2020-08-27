import React, { useContext } from 'react';
import './Caption.css';
import ThemeContext from '../../themes';

function Caption(props) {
	const theme = useContext(ThemeContext);

	return (
		<span 
			className={"caption-text " + props.className} 
			style={{ color: props.color || theme['secondary-caption']}}
		>
			{props.children}
		</span>
	);
}

export default Caption;
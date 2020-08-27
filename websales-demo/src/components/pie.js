import React, { useRef, useEffect } from 'react';

const FILL_STYLES = [
	'violet',
	'yellow',
	'green'
]

function Pie({ dataset }) {
	if(!dataset) {
		
	}

	const dataset_total = Object.values(dataset).reduce((s, elem) =>
	s+elem);

	const pieCanvas = useRef(null);

	const draw = (ctx, width, height) => {
		let start_angle = 0;
		let end_angle = 0;

		Object.keys(dataset).forEach((key, index) => {
			end_angle = start_angle+ (dataset[key]/dataset_total)*2*Math.PI;

			if(end_angle > 2*Math.PI)
				end_angle = 2*Math.PI;

			ctx.beginPath();
			ctx.fillStyle = FILL_STYLES[index];
			ctx.moveTo(width/2, height/2);
			ctx.arc(width/2, height/2, height/2, start_angle, end_angle);
			start_angle = end_angle;
			ctx.fill();
			ctx.closePath();
		});

		ctx.beginPath();
		ctx.fillStyle = 'white';
		ctx.arc(width/2, height/2, (height/4), 0, 2*Math.PI);
		ctx.fill();

		ctx.fillStyle = 'black';
		ctx.fillText("Hello", (width), 10)
	}

	useEffect(() => {
		const canvas = pieCanvas.current;
		const ctx = canvas.getContext('2d');

		canvas.style.width ='100%';
  canvas.style.height='100%';
  // ...then set the internal size to match
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

		const width = canvas.width;
		const height = canvas.height;

		draw(ctx, width, height);
	}, [draw]);

	return (
		<canvas ref={pieCanvas}>

		</canvas>
	)
}

export default Pie;
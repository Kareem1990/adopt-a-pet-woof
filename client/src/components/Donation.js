import React, { useState } from 'react';
import '../App'
// import { Puppy } from './Puppy';
import './Donation.css';
import StripeContainer from './StripeContainer';

function Donation() {
	const [showItem, setShowItem] = useState(false);
	return (
		<div className='App'>
			<h1>Donate Now</h1>
			{showItem ? (
				<StripeContainer />
			) : (
				<>
					<h3>$10.00</h3>
					{/* <img src={puppy} alt='Puppy' /> */}
					<button onClick={() => setShowItem(true)}>Donate Now</button>
				</>
			)}
		</div>
	);
}


export default Donation;




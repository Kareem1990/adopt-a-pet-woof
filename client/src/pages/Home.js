import React from 'react';
// import '/Users/kareemmagdy/Desktop/adopt-a-pet/client/src/index.js';
import HeroSection from '../components/HeroSection.js';
import Details from '../components/Details.js';
import ReachOut from '../components/ReachOut.js';
import Donation from '../components/Donation.js';



function Home ()  {
return (
    <>
    <HeroSection />
    <Donation/>
    <Details/>
    <ReachOut/>
    </>
);    
    
}


export default Home;
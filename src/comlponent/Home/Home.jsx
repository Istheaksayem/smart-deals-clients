import React from 'react';
import HeroSection from '../HeroSection/HeroSection';
import LatestProduct from '../LatestProduct/LatestProduct';

const LatestProductPromise =fetch('http://localhost:3000/latest-products').then(res =>res.json())

const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <LatestProduct LatestProductPromise={LatestProductPromise}></LatestProduct>
        </div>
    );
};

export default Home;
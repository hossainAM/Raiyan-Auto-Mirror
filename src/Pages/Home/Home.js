import React from 'react';
import Banner from './Banner';
import BusinessSummary from './BusinessSummary';
import Items from './Items';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Items></Items>
            <BusinessSummary></BusinessSummary>
        </div>
    );
};

export default Home;
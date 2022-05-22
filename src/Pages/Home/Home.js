import React from 'react';
import Footer from '../../Shared/Footer';
import Banner from './Banner';
import BusinessSummary from './BusinessSummary';
import Items from './Items';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Items></Items>
            <BusinessSummary></BusinessSummary>
            <Footer></Footer>
        </div>
    );
};

export default Home;
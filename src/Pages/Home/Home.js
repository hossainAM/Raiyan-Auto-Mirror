import React from 'react';
import Footer from '../../Shared/Footer';
import Banner from './Banner';
import BusinessSummary from './BusinessSummary';
import ContactUs from './ContactUs';
import Items from './Items';
import MiddleBanner from './MiddleBanner';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Items></Items>
            <MiddleBanner></MiddleBanner>
            <BusinessSummary></BusinessSummary>
            <ContactUs></ContactUs>
            <Footer></Footer>
        </div>
    );
};

export default Home;
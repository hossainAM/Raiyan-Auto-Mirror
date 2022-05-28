import React from 'react';
import AboutMe from './AboutMe';
import PortfolioBanner from './PortfolioBanner';
import Projects from './Projects';
import Technology from './Technology';
import Footer from '../../Shared/Footer'
import ContactMe from './ContactMe';

const MyPortfolio = () => {
    return (
        <>      
            <PortfolioBanner></PortfolioBanner> 
            <AboutMe></AboutMe>
            <Technology></Technology>
            <Projects></Projects>
            <ContactMe></ContactMe>
            <Footer></Footer>
        </>
    );
};

export default MyPortfolio;

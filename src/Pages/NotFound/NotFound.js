import React from 'react';
import image from '../../assets/404.png'
import Footer from '../../Shared/Footer'

const NotFound = () => {
    return (
        <>
        <div className='flex justify-center mt-8'>
            <img src={image} alt="image" />
        </div>
        <Footer></Footer>
        </>
    );
};

export default NotFound;
import React from 'react';
import image from '../../assets/404.png'

const NotFound = () => {
    return (
        <div className='flex justify-center mt-8'>
            <img src={image} alt="image" />
        </div>
    );
};

export default NotFound;
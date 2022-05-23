import React from 'react';

const MiddleBanner = () => {
    return (
        <div className='relative mt-20'>
            <div className='w-full h-screen bg-no-repeat bg-cover md:bg-fixed' 
            style = {
                {
                    backgroundImage: "url('https://i.ibb.co/S5TRYPW/banner-2.png')"
                }
            }>
                
            </div>
            < div className = 'absolute text-center top-1/3 sm:left-1/2 left-1/4 space-y-4' >
                <a className='md:text-7xl text-4xl text-white uppercase underline cursor-pointer'>Visit Our Industry</a>
            </div>
        </div>
    );
};

export default MiddleBanner;
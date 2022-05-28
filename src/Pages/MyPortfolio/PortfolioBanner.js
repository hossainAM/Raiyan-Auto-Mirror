import React from 'react';
import banner from '../../assets/Amir pic.jpg'

const PortfolioBanner = () => {
    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img className='rounded-full' src={banner} />
                <div className='mx-auto space-y-5'>
                    <h3 className="text-2xl text-neutral font-bold">Hey</h3>
                    <h1 className="text-5xl text-neutral font-bold uppercase">I am Amir</h1>
                    <h4 className="text-xl text-neutral font-bold uppercase">Full Stack Web Developer</h4>
                    <div className="flex flex-wrap">
                        <button type="button" className="btn btn-primary mr-4 uppercase">hire me</button>
                        <button type="button" className="btn btn-secondary uppercase">Get cv</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioBanner;
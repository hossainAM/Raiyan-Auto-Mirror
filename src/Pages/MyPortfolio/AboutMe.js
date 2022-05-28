import React from 'react';
import image from '../../assets/0M1A3321.png'

const AboutMe = () => {
    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <img className='rounded-full w-1/3 h-1/3' src={image} />
                <div className='space-x-8'>
                    <h1 className="text-5xl font-bold uppercase pl-8 tracking-widest">let me</h1>
                    <h1 className="text-5xl font-bold uppercase tracking-widest">introduce</h1>
                    <h1 className="text-5xl font-bold uppercase tracking-widest">myself</h1>
                    <p className="py-6">Hi, this is Amir Hossain. I have been graduated from University of Dhaka in Nutrition and Food Science and completed Masters from the same university. By profession I am a public health nutrition specialist. But I have a deep interest in web development, programming and data science.</p>
                    <p className="py-6">Following my interest, I got enrolled in Complete Web Development course offered by Programming Hero. From zero level of knowledge about web development and programming, this course lifted me at a certain level from where I can move forward to fulfill my dream to become hero in this arena.</p>
                    <button className="btn btn-primary uppercase">download cv</button>
                </div>
            </div>
        </div>
    );
};

export default AboutMe;
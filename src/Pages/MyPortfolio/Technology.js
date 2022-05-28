import React from 'react';

const Technology = () => {
    return (
        <div className='h-screen mt-20 flex flex-col justify-center'>
            <h1 className='text-5xl font-bold uppercase mb-12 tracking-wider text-center'>List of Technologies and skills</h1>
            <ul className="steps steps-vertical mx-auto">
                <li className="step step-primary">HTML</li>
                <li className="step step-primary">Vanilla CSS</li>
                <li className="step">Boststrap</li>
                <li className="step">Tailwind</li>
                <li className="step">Vanilla Javascript</li>
                <li className="step">React JS</li>
                <li className="step">Node JS</li>
                <li className="step">Express JS</li>
                <li className="step">Mongo DB</li>
            </ul>
        </div>
    );
};

export default Technology;
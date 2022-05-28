import React from 'react';
import image1 from '../../../src/assets/pic-1.png'
import image2 from '../../../src/assets/3.png'
import image3 from '../../../src/assets/5.png'


const Projects = () => {
    return (
        <section className='mt-24 px-12'>
            <h1 className='text-5xl font-bold mb-12 tracking-wider text-center'>RECENTLY COMPLETED PROJECTS</h1>
            <div className='grid grid-cols-1 gap-5 sm:grid-cols-3 space-y-5'>
                <div className="card w-92 glass">
                    <figure><img src={image1} alt="car!"/></figure>
                    <div className="card-body">
                        <h2 className="card-title">Raiyan Auto Warehouse</h2>
                        <p>Your choice for used car dealership</p>
                        <div className="card-actions justify-end">
                        <a href="https://raiyan-auto-warehouse.web.app/" target="_blank" className="btn btn-link btn-primary">Explore now!</a>
                        </div>
                    </div>
                </div>
                <div className="card w-92 glass">
                    <figure><img src={image2} alt="car!"/></figure>
                    <div className="card-body">
                        <h2 className="card-title">Nutrition By Ameera</h2>
                        <p>Change the way you think about food</p>
                        <div className="card-actions justify-end">
                        <a href="https://nutrition-by-ameera.firebaseapp.com/" target="_blank" className="btn btn-link btn-secondary">Explore now!</a>
                        </div>
                    </div>
                </div>
                <div className="card w-92 glass">
                    <figure><img src={image3} alt="car!"/></figure>
                    <div className="card-body">
                        <h2 className="card-title">Health Simple</h2>
                        <p>Boost your health and energy</p>
                        <div className="card-actions justify-end">
                        <a href="https://health-simple-286bf2.netlify.app/" target="_blank" className="btn btn-link btn-accent">Explore now!</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;

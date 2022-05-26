import React, { useEffect, useState } from 'react';
// import { useQuery } from 'react-query';
// import Loader from '../../Shared/Loader/Loader';
import Review from './Review'

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('https://desolate-harbor-05396.herokuapp.com/review')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setReviews(data);
        })
    }, [])
    
    // const {
    //     data: reviews,
    //     isLoading,
    // } = useQuery('reviews', () => fetch('https://desolate-harbor-05396.herokuapp.com/review').then(res => res.json()));

    // if(isLoading) {
    //     return <Loader></Loader>
    // }

    return (
        <section className='mb-20'>
            <h2 className='text-3xl text-center text-primary font-bold uppercase my-12'>What Our Customer Say About Us</h2>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 px-12 justify-center'>
                {
                    reviews.map(review => <Review key={review._id} review={review}></Review>)
                }
            </div>
        </section>
    );
};

export default Reviews;
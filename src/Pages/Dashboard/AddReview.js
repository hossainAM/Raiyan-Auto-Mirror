import React, { useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import auth from '../../firebase.init';
import { FaStar } from 'react-icons/fa'
import './StarRating.css'

const AddReview = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [user] = useAuthState(auth);
    const descRef = useRef();

    const handleReview = (e) => {
        e.preventDefault();
        const comment = descRef.current.value;

        const addReview = {
            name: user.displayName,
            email: user.email,
            rating, 
            comment
        }

         //post review to server 
        const url = `https://pacific-springs-08376.herokuapp.com/review`
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(addReview)
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId){
                toast.success('Review added successfully');
            }
            else{
                toast.error('Failed to add review')
            }
        });

        //Clear input filed
        descRef.current.value='';
    }

    return (
        <>
        <h2 className='text-xl text-secondary font-bold mb-4'>Add a Review</h2>
        <div class="card lg:max-w-lg bg-base-100 shadow-xl">
            <div class="card-body">
                <div className='flex space-x-4 '>
                    <div class="avatar placeholder">
                        <div class="bg-neutral-focus text-neutral-content rounded-full w-12">
                            <span>MX</span>
                        </div>
                    </div> 
                    <h2 class="card-title">{user.displayName}</h2>
                </div>
                <form onSubmit={handleReview} action="#">
                    <div className='flex mb-4'>
                    {[...Array(5)].map((star, i) => {
                        const ratingValue = i + 1;
                        return (
                            <label>
                                <input type="radio" name="rating" value={ratingValue} onClick={() => setRating(ratingValue)}/>
                                <FaStar 
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(null)}
                                    className='star' 
                                    color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} 
                                    size={50}
                                />
                            </label>
                        )
                    })}
                </div>
                    <textarea ref={descRef} className='textarea textarea-bordered w-full' name="comment" cols="30" rows="5" placeholder='Comment'></textarea>
                    <button className='button block mx-auto mt-4'>Submit</button>
                </form>
            </div>
        </div>
        </>
    );
};

export default AddReview;
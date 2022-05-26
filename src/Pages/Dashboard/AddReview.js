import React, { useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import auth from '../../firebase.init';

const AddReview = () => {
    const [user] = useAuthState(auth);
    const ratingRef = useRef();
    const descRef = useRef();

    const handleReview = (e) => {
        e.preventDefault();
        const rating = ratingRef.current.value;
        const comment = descRef.current.value;

        const addReview = {
            name: user.displayName,
            email: user.email,
            rating, 
            comment
        }

         //post new product to server 
        const url = `http://localhost:5000/review`
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
                toast.success('Product added successfully');
            }
            else{
                toast.error('Failed to add product')
            }
        });

        //Clear input filed
        ratingRef.current.value='';
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
                    <input ref={ratingRef} type="text" className='input' placeholder='Rating' />
                    <textarea ref={descRef} className='textarea textarea-bordered w-full' name="comment" cols="30" rows="5" placeholder='Comment'></textarea>
                    <button className='button block mx-auto mt-4'>Submit</button>
                </form>
            </div>
        </div>
        </>
    );
};

export default AddReview;
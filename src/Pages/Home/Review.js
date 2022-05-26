import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const Review = ({review}) => {
    // console.log(review)
    const { rating, comment} = review;
    const [user] = useAuthState(auth);

    return (
            <div class="h-full text-center">
                <div class="avatar placeholder mb-6">
                    <div class="bg-neutral-focus text-neutral-content rounded-full w-12">
                        <span>MX</span>
                    </div>
                </div>
                <p>Rating: {rating}</p>
                <p class="leading-relaxed">Comment: {comment}</p>
                <span class="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4"></span>
            </div>
    );
};

export default Review;
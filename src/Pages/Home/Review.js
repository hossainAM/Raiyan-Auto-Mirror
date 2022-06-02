import React from 'react';

const Review = ({review}) => {
    const { rating, comment} = review;

    return (
            <div className="h-full text-center">
                <div className="avatar placeholder mb-6">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                        <span>MX</span>
                    </div>
                </div>
                <p>Rating: {rating}</p>
                <p className="leading-relaxed">Comment: {comment}</p>
                <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4"></span>
            </div>
    );
};

export default Review;
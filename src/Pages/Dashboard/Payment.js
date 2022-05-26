import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loader from '../../Shared/Loader/Loader';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51L0wt9GzDoW5ZSXLjedMT3jbQIwKYsc4I5AlhmtAEJIzTRuiZccr5EYgnPlyEFx0n3i5hFq4QBXnsW43WYXTstbj00LuJWi7Ez');

const Payment = () => {
    const {id} = useParams();

    const {
        data: order,
        isLoading
    } = useQuery(['order', id], () => fetch(`http://localhost:5000/order/${id}`, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if(isLoading){
        return <Loader></Loader>
    }

    return (
        <div>
            <div class="card w-50 max-w-md bg-base-100 shadow-xl my-16">
                <div class="card-body">
                    <h2 className='text-accent font-bold' >Hello, {order.name}</h2>
                    <h2 class="card-title">Your order information for {order.product}</h2>
                    <p>Product Name: <span className='text-primary'>{order.product}</span> <br></br> quantity: <span className='text-secondary'>{order.quantity}</span></p>
                    <p>Please pay $<span className='text-neutral font-bold'>{order.price}</span></p>
                </div>
            </div>
            <div class="card  w-50 max-w-md shadow-2xl bg-base-100">
                <div class="card-body">
                      <Elements stripe={stripePromise}>
                         <CheckoutForm order={order}/>
                      </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;
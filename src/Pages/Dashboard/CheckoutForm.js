import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({order}) => {
    const {_id, name, email, price} = order;
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        fetch('https://desolate-harbor-05396.herokuapp.com/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret);
                }
            });

    }, [price])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if(card === null) {
            return;
        }

        //defining payment method and pass card information
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        //checking error
            // console.log(error)
            setCardError(error?.message || '');
            setSuccess('');
            setProcessing(true);

        //confirmed card payment
        const {
            paymentIntent,
            error: intentError
        } = await stripe.confirmCardPayment(
            clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email,
                    },
                },
            },
        );

        if(intentError){
            setCardError(intentError?.message)
            setProcessing(false);
        }
        else{
            setCardError('');
            setTransactionId(paymentIntent.id);
            setSuccess('Congratulations!! your payment is successful');

            //send updated payment info to server
            const payment = {
                order: _id,
                transactionId: paymentIntent.id
            }
            fetch(`https://desolate-harbor-05396.herokuapp.com/order/${_id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
            .then(res => res.json())
            .then(data => {
                setProcessing(false);
                console.log(data);
            })
        }
    }

    return (
       <>
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                style: {
                    base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                        color: '#aab7c4',
                    },
                    },
                    invalid: {
                    color: '#9e2146',
                    },
                },
                }}
            />
            <button type="submit" className='btn btn-success btn-sm mt-4' disabled={!stripe || !clientSecret || success}>
                Pay
            </button>
        </form>
        {
            cardError && <p className='text-red-500'>{cardError}</p>
        }
        {
            success && <div className='text-green-500'>
                <p>{success}</p>
                <p>Your Transaction Id: <span className='text-orange-500 font-bold'>{transactionId}</span></p>
            </div>
        }
       </>
    );
};

export default CheckoutForm;
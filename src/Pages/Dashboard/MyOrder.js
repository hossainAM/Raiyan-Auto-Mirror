import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const MyOrder = () => {
    const [orders, setOrders] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        if(user) {
            fetch(`http://localhost:5000/order?email=${user.email}`, {
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setOrders(data);
            })
        }
    }, [user]);

    return (
        <div>
            <h2 className='text-xl text-secondary font-bold my-4'>My Orders</h2>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Payment</th>
                        <th>Cancel Order</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, index) => <tr key={index}>
                                <th>{index  + 1}</th>
                                <td>{order.name}</td>
                                <td>{order.email}</td>
                                <td>{order.product}</td>
                                <td>{order.quantity}</td>
                                <td>{order.price}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrder;
import { signOut } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import { Link } from 'react-router-dom'

const MyOrder = () => {
    const [orders, setOrders] = useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if(user) {
            const url = `http://localhost:5000/order?email=${user.email}`;
            fetch(url, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            .then(res => {
                if(res.status === 401 || res.status === 403) {
                    localStorage.removeItem('accessToken');
                    signOut(auth);
                    navigate('/');
                }
                return res.json();
            })
            .then(data => {
                setOrders(data);
            });
        }
    }, [user, navigate]);

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
                                <td>
                                    {(order.price && !order.paid) && <Link to={`/dashboard/payment/${order._id}`}><button className="btn btn-xs btn-primary">Pay</button></Link>}
                                    {(order.price && order.paid) && <div>
                                            <p><span className="text-primary">Paid</span></p>
                                            <p><span className="text-secondary">{order.transactionId}</span></p>
                                        </div>}
                                </td>
                                <td>{!order.paid && <button className="btn btn-xs btn-secondary">Cancel</button>}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrder;

// (order.price && order.paid) && <link to={``}>
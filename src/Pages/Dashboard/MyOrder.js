import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import CancelOrderModal from './CancelOrderModal';
import OrderRow from './OrderRow';

const MyOrder = () => {
    const [orders, setOrders] = useState([]);
    const [orderCancelModal, setOrderCancelModal] = useState(null);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if(user) {
            const url = `https://desolate-harbor-05396.herokuapp.com/order?email=${user.email}`;
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
    }, [user, navigate, orders]);

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
                            
                            orders.map((order, index) => <OrderRow key={order._id} index={index} order={order} setOrderCancelModal={setOrderCancelModal}></OrderRow>)
                        }
                    </tbody>
                </table>
            </div>
            {
                orderCancelModal && <CancelOrderModal orderCancelModal={orderCancelModal} setOrderCancelModal={setOrderCancelModal}></CancelOrderModal>
            }
        </div>
    );
};

export default MyOrder;


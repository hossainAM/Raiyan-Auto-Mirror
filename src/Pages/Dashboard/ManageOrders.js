import React from 'react';
import { useQuery } from 'react-query';
import Loader from '../../Shared/Loader/Loader'
import ManageOrderRow from './ManageOrderRow';

const ManageOrders = () => {
    const {
        data: orders, isLoading
    } = useQuery('order', () => fetch('https://desolate-harbor-05396.herokuapp.com/order', {
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
            <h2 className='text-xl text-secondary font-bold my-4'>Manage Orders</h2>
            <div className="overflow-x-auto w-screen lg:w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Product_Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Payment Status</th>
                        <th>Cancel</th>
                    </tr>
                    </thead>
                    <tbody>
                       {
                           orders.map((order, index) => <ManageOrderRow index={index} key={order._id} order={order}></ManageOrderRow>)
                       }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageOrders;
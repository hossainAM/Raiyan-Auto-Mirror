import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loader from '../../Shared/Loader/Loader'
import ProductInfo from './ProductInfo';
import RemoveModal from './RemoveModal';

const ManageProducts = () => {
    const [removeModal, setRemoveModal] = useState(null);
    const {
        data: products,
        isLoading,
        refetch,
    } = useQuery('product', () => fetch('https://desolate-harbor-05396.herokuapp.com/item').then(res => res.json()));

    if(isLoading){
        return <Loader></Loader>
    }
    
    return (
        <div>
            <h2 className='text-xl text-secondary font-bold my-4'>Manage Products</h2>
            <div class="overflow-x-auto">
                <table class="table table-zebra w-full">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Min Order Quantity</th>
                        <th>Available Quantity</th>
                        {/* <th>Unit Price</th> */}
                        <th>Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        products.map((product, index) => <ProductInfo key={product._id} index={index} product={product} refetch={refetch} setRemoveModal={setRemoveModal}></ProductInfo>)
                    }
                    </tbody>
                </table>
            </div>
            {
                removeModal && <RemoveModal removeModal={removeModal} refetch={refetch} setRemoveModal={setRemoveModal}></RemoveModal>
            }
        </div>
    );
};

export default ManageProducts;
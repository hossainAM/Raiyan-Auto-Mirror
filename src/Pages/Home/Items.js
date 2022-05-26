import React from 'react';
import { useQuery } from 'react-query';
import Loader from '../../Shared/Loader/Loader'
import Item from './Item';

const Items = () => {
    const {
        data: items,
        isLoading,
    } = useQuery('mirrors', () => fetch('https://desolate-harbor-05396.herokuapp.com/item').then(res => res.json()));

    if(isLoading) {
        return <Loader></Loader>
    }
    return (
        <div>
            <h2 className='text-3xl text-center text-primary font-bold uppercase my-20'>Featured Products</h2>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 px-12'>
                {
                    items.slice(0, 6).map(item => <Item key={item._id} item={item}></Item>)
                }
            </div>
        </div>
    );
};

export default Items;

// Math.max(items.length - 6, 0)

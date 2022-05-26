import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init'
import toast from 'react-hot-toast';

const ItemDetails = () => {
    const {id} = useParams();
    const [item, setItem] = useState({});
    const [user] = useAuthState(auth);

    useEffect(() => {
        const url = `https://desolate-harbor-05396.herokuapp.com/item/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => setItem(data))
    }, [id]); 

    //place order
    const handleOrderSubmit = e => {
        e.preventDefault();
        //send order data to server
        const order = {
            name: user.displayName,
            email: user.email,
            address: e.target.address.value,
            phone: e.target.phone.value,
            product: item.name,
            price: item.UnitPrice,
            quantity: e.target.itemQuantity.value,
        }

        fetch('https://desolate-harbor-05396.herokuapp.com/order', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            if(data.success) {
                toast.success('Order placed successfully!')
            }
            else{
                toast.error('Please place your order correctly')
            }
        });
    }

    //Increase order quantity


    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 p-12'>
            {/* item Details */}
            <div className="card card-compact lg:max-w-lg bg-base-100 shadow-xl">
                <figure><img src={item.image} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{item.name}</h2>
                    <p>{item.description}</p>
                    <p><small>Unit Price: BDT </small><small>{item.UnitPrice}</small></p>
                    <p><small>Minimum Order Quantity: </small><small>{item.minimumOrderQuantity}</small></p>
                    <p><small>Available Quantity: </small><small>{item.AvailableQuantity}</small></p>
                </div>
            </div>
            {/* Purchase order */}
            <div>
              <h2 className='text-3xl text-primary font-bold text-center mb-5'>Place Your Order Here</h2>
              <form onSubmit={handleOrderSubmit}>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-100 mb-3' type="text" name="name" value={user.displayName} placeholder='Name' required readOnly disabled/>
                <br/>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-100 mb-3' type="email" name="email" value={user.email} placeholder='Email' required readOnly disabled />
                <br/>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-100 mb-3' type="text" name="address" placeholder='Address' autoComplete='off'/>
                <br/>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-100 mb-3' type="text" name="phone" placeholder='Phone' autoComplete='off'/>
                <br/>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-100 mb-3' type="text" name="itemName" value={item.name} placeholder='Product Name' readOnly/>
                <br/>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-100 mb-3' type="number" name="price" value={item.UnitPrice} placeholder='Unit Price' readOnly/>
                <br/>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-100 mb-3' type="number" name="itemQuantity" placeholder={item.minimumOrderQuantity}/>
                <br/>
                <div className='flex justify-center'>
                    <input className='btn btn-primary py-2 w-100 mt-3 mr-4' type="submit" value="Place Order"/>
                </div>
            </form>
                <div className='flex justify-center'>
                    <input className='btn btn-secondary py-2 w-100 mt-3 mr-4' type="submit" value="Increase"/>
                    <input className='btn btn-accent py-2 w-100 mt-3' type="submit" value="Decrease"/>
                </div>
            </div>
        </div>
    );
};

export default ItemDetails;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ItemDetails = () => {
    const {id} = useParams();
    const [item, setItem] = useState({});

    useEffect(() => {
        const url = `http://localhost:5000/item/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => setItem(data))
    }, [id]); 

    // const handleFormSubmit = e => {
    //     e.preventDefault();
    // }

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
                <h2>Place Order</h2>
              {/* <form onSubmit={handleFormSubmit}>
                <input className='w-100 mb-2' type="text" name="name" value={user.displayName} placeholder='Name' required readOnly disabled/>
                <br/>
                <input className='w-100 mb-2' type="email" name="email" value={user.email} placeholder='Email' required readOnly disabled />
                <br/>
                <input className='w-100 mb-2' type="text" name="address" placeholder='Address' autoComplete='off'/>
                <br/>
                <input className='w-100 mb-2' type="text" name="phone" placeholder='Phone' autoComplete='off'/>
                <br/>
                <input className='w-100 mb-2' type="text" name="service" value={service.name} placeholder='Service Name' readOnly/>
                <br/>
                <input className='btn btn-primary py-2 w-25 d-block mx-auto' type="submit" value="Place Order"/>
            </form> */}
            </div>
        </div>
    );
};

export default ItemDetails;
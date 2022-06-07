import React from 'react';
import { useNavigate } from 'react-router-dom';

const Item = ({item}) => {
    const {_id, img, name, description, minimumOrderQuantity, AvailableQuantity, price}= item;
     const navigate = useNavigate();

     const handleItemDetail = id => {
         navigate(`/purchase/${id}`);
     }
    return (
       <div className="card card-compact lg:max-w-lg bg-base-100 shadow-xl">
            <figure><img src={img} alt="product" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>
                <p><small>Unit Price: BDT </small><small>{price}</small></p>
                <p><small>Minimum Order Quantity: </small><small>{minimumOrderQuantity}</small></p>
                <p><small>Available Quantity: </small><small>{AvailableQuantity}</small></p>
                <div className="card-actions justify-end pt-4">
                <button onClick={() => handleItemDetail(_id)} className="btn btn-primary text-white">Purchase</button>
                </div>
            </div>
        </div>
    );
};

export default Item;
import React, { useRef } from 'react';

const AddProduct = () => {
       const nameRef = useRef();
       const descRef = useRef();
       const priceRef = useRef();
       const orderRef = useRef();
       const quantityRef = useRef();
       const imgRef = useRef();

    const handleAddProduct = (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const description = descRef.current.value;
        const price = priceRef.current.value;
        const minimumOrderQuantity = orderRef.current.value;
        const AvailableQuantity = quantityRef.current.value;
        const image = imgRef.current.value;

        const newProduct = {
            name, description, price, minimumOrderQuantity, AvailableQuantity, image,
        }

        //post new product to server 
        const url = `http://localhost:5000/item`
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
        .then(res => res.json())
        .then(data => console.log(data));
    }

    return (
        <div>
            <h2 classNameName='text-secondary text-xl font-bold'>Add a Product</h2>
            <form onSubmit={handleAddProduct}>
                <input ref={nameRef} type="text" placeholder="Product Name" className="input input-bordered w-full max-w-xs" name="product" autoComplete='off' required />
                <br/>
                <textarea ref={descRef} type="text" placeholder="Description" className=" textarea textarea-bordered w-full max-w-xs" name="description" required></textarea>
                <br/>
                <input ref={priceRef} type="number" placeholder="Unit Price" className="input input-bordered w-full max-w-xs" name="price" required />
                <br/>
                <input ref={orderRef} type="number" placeholder="Minimum Order Quantity" className="input input-bordered w-full max-w-xs" name="minOrderQuantity" required />
                <br/>
                <input ref={quantityRef} type="number" placeholder="Available Quantity" className="input input-bordered w-full max-w-xs" name="availableQuantity" required />
                <br/>
                <input ref={imgRef} type="text" placeholder="Image URL" className="input input-bordered w-full max-w-xs" name="image" required />
                <br/>
                <input className='btn btn-secondary py-2 w-100 mt-3 mr-4' type="submit" value="Add Product"/>
            </form>
        </div>
    );
};

export default AddProduct;
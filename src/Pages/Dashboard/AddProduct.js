import React, { useRef } from 'react';
import toast from 'react-hot-toast';

const AddProduct = () => {
       const nameRef = useRef();
       const descRef = useRef();
       const priceRef = useRef();
       const orderRef = useRef();
       const quantityRef = useRef();
       const imgRef = useRef();

       const imageStorageKey = '755356de0bb69c7e52c3efd877fa9a1b';
       
    const handleAddProduct = (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const description = descRef.current.value;
        const price = priceRef.current.value;
        const minimumOrderQuantity = orderRef.current.value;
        const AvailableQuantity = quantityRef.current.value;
        const image = imgRef.current.files[0];
        console.log(image)

        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;

        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                const img= data.data.url;
                 const newProduct = {
                     name,
                     description,
                     price,
                     minimumOrderQuantity,
                     AvailableQuantity,
                     img,
                 }
        //post new product to server 
        fetch('http://localhost:5000/item', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(newProduct)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.insertedId){
                toast.success('Product added successfully');
            }
            else{
                toast.error('Failed to add product')
            }
          });
        }
    })
        //Clear input filed
        nameRef.current.value='';
        descRef.current.value='';
        priceRef.current.value='';
        orderRef.current.value='';
        quantityRef.current.value='';
    }

    return (
        <div>
            <h2 className='text-secondary text-xl font-bold'>Add a Product</h2>
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
                <input ref={imgRef} type="file" placeholder="Image" className="input input-bordered w-full max-w-xs" name="files" required />
                <br/>
                <input className='btn btn-secondary py-2 w-100 mt-3 mr-4' type="submit" value="Add Product"/>
            </form>
        </div>
    );
};

export default AddProduct;
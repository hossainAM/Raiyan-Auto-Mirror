import React from 'react';

const ManageOrderRow = ({order, index}) => {
    const {_id, name, email, product, quantity, price} = order;

    const handlePaymentStatus = () => {
        fetch(`https://pacific-springs-08376.herokuapp.com/order/${_id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            });
    }

    return (
       <tr>
            <th>{index + 1}</th>
            <td>{_id}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{product}</td>
            <td>{quantity}</td>
            <td>{price}</td>
            <td>
                {!order.paid && <button className="btn btn-xs btn-accent">Unpaid</button>}
                {(order.paid) && <button onClick={handlePaymentStatus} className="btn btn-xs btn-neutral">Pending</button>}
                {/* {(order.paid && order.status) && <p><span className="text-accent font-bold">Shipped</span></p>} */}
            </td>
            <td>
                {!order.paid && <button className="btn btn-xs btn-accent">Cancel</button>}
            </td>
        </tr>
    );
};

export default ManageOrderRow;
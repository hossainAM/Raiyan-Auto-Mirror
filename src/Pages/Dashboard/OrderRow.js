import React from 'react';
import { Link } from 'react-router-dom';

const OrderRow = ({order, index, setOrderCancelModal}) => {
    const {_id, name, email, product, quantity, price} = order;
    return (
        <tr>
            <th>{index + 1}</th>
            <td>{name}</td>
            <td>{email}</td>
            <td>{product}</td>
            <td>{quantity}</td>
            <td>{price}</td>
            <td>
                {(order.price && !order.paid) && <Link to={`/dashboard/payment/${_id}`}><button className="btn btn-xs btn-primary">Pay</button></Link>}
                {(order.price && order.paid) && <div>
                        <p><span className="text-primary">Paid</span></p>
                        <p><span className="text-secondary">{order.transactionId}</span></p>
                    </div>}
            </td>
            <td>
                {!order.paid && <label onClick={setOrderCancelModal(order)} for="cancel-confirm-modal" className="btn btn-xs btn-secondary">Cancel</label>}
            </td>
        </tr>
    );
};

export default OrderRow;
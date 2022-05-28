import React from 'react';

const ProductInfo = ({product, index, setRemoveModal}) => {
    const {name, minimumOrderQuantity, AvailableQuantity, price} = product;

    return (
       <tr>
            <th>{index + 1}</th>
            <td>{name}</td>
            <td>{minimumOrderQuantity}</td>
            <td>{AvailableQuantity}</td>
            <td>{price}</td>
            <td>
                <label onClick={setRemoveModal(product)} for="remove-confirm-modal" className="btn btn-link">Remove</label>
            </td>
        </tr>
    );
};

export default ProductInfo;

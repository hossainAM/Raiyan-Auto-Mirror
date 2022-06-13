import React from 'react';
import toast from 'react-hot-toast';

const CancelOrderModal = ({orderCancelModal, setOrderCancelModal }) => {
    const {_id, product} = orderCancelModal;
    const handleCancel = () => {
           fetch(`https://pacific-springs-08376.herokuapp.com/order/${_id}`, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount) {
                console.log(data)
                toast.success('Product removed successfully');
                setOrderCancelModal(null);
            }
        })
    }
    return (
       <div>
            <input type="checkbox" id="cancel-confirm-modal" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
            <div class="modal-box">
                <h3 class="font-bold text-lg text-red-500">Do you want to cancel the order of {product} with Id: {_id}</h3>
                <p class="py-4">You can not retrieve it once cancelled!</p>
                <div class="modal-action">
                    <button onClick={() => handleCancel()} className="btn btn-sm btn-error">Remove</button>
                    <label for="cancel-confirm-modal" className="btn btn-sm btn-secondary">Cancel</label>
                </div>
            </div>
            </div>
        </div>
    );
};

export default CancelOrderModal;
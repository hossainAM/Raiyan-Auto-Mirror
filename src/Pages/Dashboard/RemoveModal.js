import React from 'react';
import toast from 'react-hot-toast';

const RemoveModal = ({removeModal, refetch, setRemoveModal}) => {
    const {_id, name} = removeModal;
    const handleRemove = () => {
        fetch(`http://localhost:5000/item/${_id}`, {
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
                setRemoveModal(null);
                refetch();
            }
        })
    }
    return (
        <div>
            <input type="checkbox" id="remove-confirm-modal" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
            <div class="modal-box">
                <h3 class="font-bold text-lg text-red-500">Do you want to remove product: {name}, product_id: {_id}!</h3>
                <p class="py-4">You can not retrieve it once removed!</p>
                <div class="modal-action">
                    <button onClick={() => handleRemove()} className="btn btn-sm btn-error">Remove</button>
                    <label for="remove-confirm-modal" className="btn btn-sm btn-secondary">Cancel</label>
                </div>
            </div>
            </div>
        </div>
    );
};

export default RemoveModal;
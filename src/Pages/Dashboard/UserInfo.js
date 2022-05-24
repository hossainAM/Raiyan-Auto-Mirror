import React from 'react';
import toast from 'react-hot-toast';

const UserInfo = ({user, index, refetch}) => {
    const {email, role} = user;

    const handleAdmin = () => {
        const url = `http://localhost:5000/user/admin/${email}`
        fetch(url, {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            refetch();
            toast('Made an admin successfully');
        })
    }

    return (
        <tr>
            <th>{index + 1}</th>
            <td>Name</td>
            <td>{email}</td>
            <td>{role !== 'admin' && <button onClick={handleAdmin} className="btn btn-sm btn-neutral">Make Admin</button>}</td>
        </tr>
    );
};

export default UserInfo;
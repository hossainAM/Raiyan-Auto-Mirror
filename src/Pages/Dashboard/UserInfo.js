import { signOut } from 'firebase/auth';
import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const UserInfo = ({user, index, refetch}) => {
    const {email, role} = user;
    const navigate = useNavigate();

    const handleAdmin = () => {
        const url = `https://pacific-springs-08376.herokuapp.com/user/admin/${email}`
        fetch(url, {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => {
            if(res.status === 403){
                toast.error('Failed to make an admin');
                localStorage.removeItem('accessToken');
                signOut(auth);
                navigate('/');
            }
            return res.json()
        })
        .then(data => {
            if(data.modifiedCount > 0) {
                 refetch();
                 toast.success('Made an admin successfully');
            }
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
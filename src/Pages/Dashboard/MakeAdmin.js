import React from 'react';
import { useQuery } from 'react-query';
import Loader from '../../Shared/Loader/Loader';

const MakeAdmin = () => {
      const {
        data: users,
        isLoading,
        refetch,
    } = useQuery('users', () => fetch('http://localhost:5000/user', {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if(isLoading) {
        return <Loader></Loader>
    }
    return (
        <div>
            <h2>Make an Admin: {users.length}</h2>
        </div>
    );
};

export default MakeAdmin;